# PromptVerse — Script oral 1 : Infrastructure

À lire/adapter à l'oral. Version parlée de `presentation-1-infra.md`.

---

Je vais présenter la partie infrastructure du projet, c'est-à-dire tout ce qui permet de faire tourner et de livrer l'application.

Toute l'application est containerisée avec Docker. On a plusieurs conteneurs qui communiquent entre eux : un pour le backend NestJS, un pour le frontend React, et un pour la base de données MySQL.

En développement, on a un environnement complet lancé avec `docker compose up`, avec en plus un faux serveur SMTP local qui nous permet de voir les emails envoyés sans jamais en envoyer de vrais pendant qu'on développe.

Quand le conteneur de l'API démarre, il ne se lance pas tout de suite : un script d'entrypoint attend d'abord que la base de données soit disponible, puis joue automatiquement les migrations de la base avant de démarrer l'application NestJS. Ça évite d'avoir à jouer les migrations à la main à chaque mise à jour.

Pour les fichiers uploadés — les avatars et les images de prompts — on a fait le choix de les stocker directement sur le disque du serveur, dans un volume Docker qui survit aux redémarrages, plutôt que d'utiliser un service de stockage externe type S3. C'est un choix assumé de simplicité pour la taille du projet.

En production, l'architecture change un peu : on n'a plus de build d'image sur le serveur, les images Docker sont déjà construites en amont par la CI et juste récupérées. Devant l'API et le frontend, on a un nginx qui fait reverse proxy et qui gère aussi le HTTPS, avec des certificats Let's Encrypt renouvelés automatiquement. Ce nginx applique aussi de la limitation de débit par IP : les routes d'authentification sont particulièrement protégées contre le brute-force, avec une limite plus stricte que le reste de l'API.

Enfin, pour le déploiement, on a mis en place un pipeline CI/CD avec GitHub Actions. À chaque push sur la branche de déploiement : les tests backend et frontend tournent en premier — si ça casse, rien n'est déployé. Si les tests passent, les images Docker sont construites et poussées sur Docker Hub. Et enfin, une étape se connecte en SSH au serveur, récupère les nouvelles images et relance les conteneurs concernés, sans intervention manuelle.

Le point que je retiens le plus de cette partie, c'est l'ordre de démarrage : la base doit être prête avant les migrations, les migrations avant l'API, et pour le certificat HTTPS il a fallu d'abord démarrer nginx en HTTP simple avant de pouvoir générer le certificat — un problème classique de "œuf et la poule" au premier déploiement.
