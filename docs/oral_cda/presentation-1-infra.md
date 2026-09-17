# PromptVerse — Présentation 1 : Infrastructure

Projet réalisé à 3 : Abduljaber, Amine et Anis, dans le cadre du diplôme CDA.
Cette partie couvre tout ce qui fait tourner et livre l'application (Docker, CI/CD, déploiement, réseau).

## Vue d'ensemble

L'application est découpée en plusieurs conteneurs Docker qui communiquent entre eux sur un réseau dédié (`promptverse_network`) :

- **api** : backend NestJS
- **client** : frontend React, servi par un nginx interne (build Vite)
- **database** : MySQL 8.4
- **redis** : présent dans la stack, healthcheck actif, mais pas encore réellement exploité par le code (piste d'évolution : cache, sessions, files d'attente de mails)
- **mailpit** (dev uniquement) : faux serveur SMTP avec interface web pour voir les mails envoyés sans vrai envoi
- **nginx** (prod uniquement) : reverse proxy d'edge, HTTPS

## Démarrage et migrations

- `api` attend que `database` et `redis` soient "healthy" (healthchecks Docker Compose) avant de démarrer.
- Au démarrage du conteneur `api`, `docker-entrypoint.sh` :
  1. attend que le port MySQL réponde,
  2. joue les migrations TypeORM (`typeorm migration:run`),
  3. démarre l'application NestJS.
- Ça évite d'avoir à jouer les migrations à la main à chaque déploiement.

## Stockage des fichiers

- Les fichiers uploadés (avatars, images de prompts) sont écrits directement sur le disque du conteneur `api` par Multer, dans `/app/uploads`.
- Ce dossier est un **volume Docker** (`uploads_data`) pour survivre aux redémarrages/mises à jour du conteneur.
- Un `StorageController` sert ces fichiers en lecture (`GET /api/v1/uploads/:folder/:filename`).
- Choix assumé : pas de service de stockage objet externe (S3/MinIO) pour rester simple sur un seul VPS.

## Environnement de développement (`docker-compose.yml`)

- `docker compose up --build` lance toute la stack en local.
- Ports exposés directement sur la machine (API sur 3000, client sur 8080, MySQL, Redis, Mailpit UI sur 8025...).
- Mailpit remplace un vrai serveur SMTP pendant le développement.

## Environnement de production (`docker-compose.prod.yml`)

- Pas de `build:` : les images (`promptverse-backend`, `promptverse-frontend`) sont déjà construites par la CI et juste "pull" depuis Docker Hub.
- Un nginx d'edge fait office de reverse proxy unique devant `api` et `client` :
  - `/api/` → conteneur `api`
  - tout le reste → conteneur `client`
- HTTPS géré par Let's Encrypt / Certbot, installé **directement sur l'hôte** (pas en conteneur) :
  - certificats montés en lecture seule dans nginx (`/etc/letsencrypt`)
  - dossier `/var/www/certbot` monté pour le renouvellement automatique (challenge ACME en mode webroot)
- Sécurité au niveau nginx :
  - limitation de débit par IP (`limit_req`) : zone stricte sur `/api/v1/auth/` (5 req/s) pour freiner le brute-force, zone plus large sur le reste de l'API (20 req/s)
  - en-têtes de sécurité (CSP, HSTS, X-Frame-Options, etc.)
  - taille max des requêtes adaptée par route (2 Mo par défaut, 100 Mo sur `/api/` pour supporter l'upload d'images de prompts)

## CI/CD (GitHub Actions)

Pipeline déclenché sur push vers la branche `deploy` :

1. **Tests** : lint + tests unitaires + build de test, en parallèle pour le backend (avec une vraie base MySQL de test) et le frontend.
2. **Build & Push** : si les tests passent, build des images Docker (backend et frontend) et push vers Docker Hub, taguées `latest` + hash du commit.
3. **Déploiement** : connexion SSH au VPS, copie du `docker-compose.prod.yml` et de la config nginx, puis :
   - `docker compose pull` (récupère les nouvelles images)
   - `docker compose up -d` (redémarre les conteneurs qui ont changé)
   - `docker image prune` (nettoie les anciennes images)

## Points à retenir pour l'oral

- Un seul VPS, tout est containerisé.
- Pas de stockage objet externe : disque local + volume Docker, choix simple assumé pour la taille du projet.
- Certbot tourne en natif sur l'hôte, pas en conteneur — c'est une source d'erreur classique à bien expliquer si on te pose la question (ordre de bootstrap : d'abord nginx en HTTP, puis génération du certificat, puis passage en HTTPS).
- Redis est dans la stack mais pas encore utilisé fonctionnellement — à dire honnêtement si la question arrive.
