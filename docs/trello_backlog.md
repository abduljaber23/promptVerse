# 📇 Backlog Agile Trello — PromptVerse (Sprints 0 à 7)

Ce document rassemble tous les **tickets Trello** organisés par Sprint pour piloter le projet **PromptVerse** conformément aux exigences du diplôme **CDA**.

---

## 🏃 SPRINT 0 : Cadrage & Spécifications Initiale
*Durée : 4 jours | Objectif : Poser le cadre fonctionnel, la stack et la documentation Spec-Driven.*

### 🎫 CARD-0.1 : Rédaction du Cahier des Charges
- **Colonne Trello** : `Terminé`
- **Étiquettes** : 🟦 `Documentation` 🟩 `CDA`
- **Description** : Définir le périmètre fonctionnel, la stack technique et la matrice des 3 rôles (`USER`, `ADMIN`, `SUPER_ADMIN`).
- **User Story (Gherkin)** :
  - `GIVEN` le projet PromptVerse à lancer.
  - `WHEN` l'analyse des besoins est formalisée.
  - `THEN` les 3 rôles et les règles de gestion sont documentés sans ambiguïté.
- **Checklist** :
  - [x] Spécifier l'authentification JWT natif (sans Passport, sans OAuth)
  - [x] Valider le mode de publication directe (`PUBLISHED`) sans modération
  - [x] Rédiger le fichier [docs/cahier_des_charges.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/cahier_des_charges.md)
- **DoD** : Document validé et archivé.

### 🎫 CARD-0.2 : Modélisation UML & Merise
- **Colonne Trello** : `Terminé`
- **Étiquettes** : 🟨 `UML` 🟪 `BDD`
- **Description** : Produire tous les diagrammes techniques obligatoires pour la soutenance CDA.
- **Checklist** :
  - [x] Diagramme de cas d'utilisation UML [docs/uml/use-cases.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/uml/use-cases.md)
  - [x] Diagramme de classes UML [docs/uml/class-diagram.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/uml/class-diagram.md)
  - [x] Diagrammes de séquence UML [docs/uml/](file:///c:/FormationCDA/projet_final/PromptVerse/docs/uml/)
  - [x] Modèle Merise MCD / MLD / MPD [docs/merise/](file:///c:/FormationCDA/projet_final/PromptVerse/docs/merise/)
  - [x] Dictionnaire de données [docs/merise/dictionnaire-de-donnees.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/merise/dictionnaire-de-donnees.md)
- **DoD** : Diagrammes Mermaid 100% valides sans erreur de syntaxe.

---

## 🏃 SPRINT 1 : Spécifications UI/UX & Initialisation Environment
*Durée : 4 jours | Objectif : Maquettage des écrans et environnement Docker dev.*

### 🎫 CARD-1.1 : Spécifications UX/UI & Wireframes
- **Colonne Trello** : `Terminé`
- **Étiquettes** : 🎨 `UX/UI` 🟦 `Design System`
- **Description** : Créer la charte graphique Dark Mode et les wireframes des 5 écrans principaux.
- **Checklist** :
  - [x] Tokens CSS (Couleurs, Typographie Inter)
  - [x] Sitemap du site
  - [x] Wireframes Landing, Catalogue, Fiche Produit, Dashboard, Formulaire de vente dans [docs/maquettes_ux_ui.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/maquettes_ux_ui.md)
- **DoD** : Document UX/UI validé.

### 🎫 CARD-1.2 : Configuration `docker-compose.yml` Local
- **Colonne Trello** : `À Faire`
- **Étiquettes** : 🛠️ `DevOps` 🟩 `Docker`
- **Description** : Mettre en place les conteneurs MySQL 8, Redis, Mailpit et MinIO.
- **Checklist** :
  - [x] Fichier [docker-compose.yml](file:///c:/FormationCDA/projet_final/PromptVerse/docker-compose.yml) rédigé
  - [ ] Lancer `docker-compose up -d` et vérifier les ports (3306, 6379, 8025, 9000/9001)

---

## 🏃 SPRINT 2 : Core Backend & Entités Base de Données
*Durée : 6 jours | Objectif : Socle API NestJS, TypeORM et Authentification JWT.*

### 🎫 CARD-2.1 : Entités TypeORM & Migrations
- **Colonne Trello** : `À Faire`
- **Étiquettes** : 🟧 `Backend` 🟪 `TypeORM`
- **Description** : Déclarer les entités TypeORM `User`, `Prompt`, `Category`, `AiTool`, `Order`, `OrderItem`, `Review`, `Wishlist`, `Payout`, `PreviewImage`.
- **User Story (Gherkin)** :
  - `GIVEN` l'API NestJS démarrée avec TypeORM.
  - `WHEN` la synchronisation ou les migrations s'exécutent.
  - `THEN` les tables MySQL sont générées conformément au dictionnaire de données.
- **DoD** : Base MySQL instanciée sans erreur de relation.

### 🎫 CARD-2.2 : Authentification JWT Natif & bcrypt
- **Colonne Trello** : `À Faire`
- **Étiquettes** : 🟧 `Backend` 🔒 `Sécurité`
- **Description** : Implémenter l'inscription, la connexion et les Guards d'autorisation (sans Passport, sans OAuth).
- **Checklist** :
  - [ ] Service de hachage bcrypt (cost factor 10)
  - [ ] Route `POST /auth/register` (création compte `USER`)
  - [ ] Route `POST /auth/login` (génération JWT signed)
  - [ ] Guard `AuthGuard` natif et Décorateur `@CurrentUser()`
  - [ ] Guard `RolesGuard` pour filtrer les rôles (`USER`, `ADMIN`, `SUPER_ADMIN`)
- **DoD** : Tests unitaires Jest passants sur `AuthService`.

---

## 🏃 SPRINT 3 : Catalogue & Publication Directe
*Durée : 6 jours | Objectif : Création et recherche de prompts.*

### 🎫 CARD-3.1 : API CRUD Prompts (Publication Directe)
- **Colonne Trello** : `À Faire`
- **Étiquettes** : 🟧 `Backend` ✍️ `Prompts`
- **Description** : Permettre à tout utilisateur connecté (`USER`) de publier un prompt en ligne.
- **User Story (Gherkin)** :
  - `GIVEN` un `USER` authentifié via token JWT.
  - `WHEN` il soumet `POST /prompts` avec les données requises.
  - `THEN` le prompt est inséré avec le statut `PUBLISHED` et est immédiatement accessible dans le catalogue.
- **DoD** : Route fonctionnelle et testée.

### 🎫 CARD-3.2 : Recherche & Filtrage Catalogue
- **Colonne Trello** : `À Faire`
- **Étiquettes** : 🟧 `Backend` 🔍 `Recherche`
- **Description** : Implémenter la recherche par mots-clés et le filtrage par `Category` et `AiTool`.
- **DoD** : Requête de recherche paginée retournant les prompts `PUBLISHED`.

---

## 🏃 SPRINT 4 : Intégration Paiement Stripe (Checkout & Connect)
*Durée : 7 jours | Objectif : Achats sécurisés et reversements vendeurs.*

### 🎫 CARD-4.1 : Session Stripe Checkout & Webhook
- **Colonne Trello** : `À Faire`
- **Étiquettes** : 💳 `Stripe` 🟧 `Backend`
- **Description** : Créer la session de paiement Stripe Checkout et valider les commandes payées.
- **User Story (Gherkin)** :
  - `GIVEN` un panier avec un prompt.
  - `WHEN` l'acheteur initie `POST /orders/checkout`.
  - `THEN` l'API génère l'URL Stripe Checkout.
  - `WHEN` Stripe envoie le webhook `checkout.session.completed`.
  - `THEN` la commande passe à `PAID` et l'accès au `promptContent` est débloqué.
- **DoD** : Webhook Stripe testé en dev via CLI Stripe.

### 🎫 CARD-4.2 : Versements Stripe Connect (Payouts)
- **Colonne Trello** : `À Faire`
- **Étiquettes** : 💳 `Stripe Connect` 🟧 `Backend`
- **Description** : Gérer la connexion des comptes bancaires des vendeurs et les virements de leur solde `balance`.

---

## 🏃 SPRINT 5 : Performance & Stockage Fichiers (Redis & MinIO S3)
*Durée : 5 jours | Objectif : Optimisation du catalogue et stockage des images.*

### 🎫 CARD-5.1 : Mise en Cache Redis du Catalogue
- **Colonne Trello** : `À Faire`
- **Étiquettes** : ⚡ `Redis` 🚀 `Performance`
- **Description** : Mettre en cache la liste des prompts du catalogue pendant 5 minutes.
- **DoD** : Temps de réponse `< 50ms` sur les requêtes mises en cache.

### 🎫 CARD-5.2 : Upload d'Images S3 / MinIO
- **Colonne Trello** : `À Faire`
- **Étiquettes** : 📁 `MinIO / S3` 🟧 `Backend`
- **Description** : Upload des images d'illustration `PreviewImage` vers le bucket S3 local MinIO.

---

## 🏃 SPRINT 6 : Frontend React TypeScript (Vite)
*Durée : 7 jours | Objectif : Interface utilisateur SPA complète.*

### 🎫 CARD-6.1 : Intégration UI & Router React
- **Colonne Trello** : `À Faire`
- **Étiquettes** : 💻 `Frontend` ⚛️ `React`
- **Checklist** :
  - [ ] Intégration du thème Dark Tailwind CSS
  - [ ] Configuration de React Router
  - [ ] `AuthContext` (Gestion du token JWT en mémoire/localStorage)

### 🎫 CARD-6.2 : Développement des Pages
- **Colonne Trello** : `À Faire`
- **Étiquettes** : 💻 `Frontend` ⚛️ `React`
- **Checklist** :
  - [ ] Landing Page & Barre de recherche
  - [ ] Catalogue avec filtres dynamiques
  - [ ] Fiche Produit & Redirection Stripe Checkout
  - [ ] Espace `USER` (Onglet Mes Achats & Accès aux Prompts)
  - [ ] Formulaire de publication de prompt

---

## 🏃 SPRINT 7 : DevOps, Docker & Livrables CDA
*Durée : 6 jours | Objectif : Conteneurisation, CI/CD, Script Backup DB et préparation Oral CDA.*

### 🎫 CARD-7.1 : Dockerization & Proxy Nginx
- **Colonne Trello** : `À Faire`
- **Étiquettes** : 🛠️ `DevOps` 🟩 `Docker`
- **Checklist** :
  - [ ] Multi-stage `Dockerfile` pour NestJS et React
  - [ ] Orchestration complète dans `docker-compose.yml`
  - [ ] Configuration Nginx Reverse Proxy (Port 80/443)
  - [ ] Script de sauvegarde automatisé MySQL (dump `.sql`)

### 🎫 CARD-7.2 : Pipeline CI/CD GitHub Actions
- **Colonne Trello** : `À Faire`
- **Étiquettes** : 🛠️ `DevOps` 🤖 `CI/CD`
- **Checklist** :
  - [ ] Workflow GitHub Actions (`.github/workflows/ci.yml`)
  - [ ] Étape Linter, Build TypeScript et Tests Jest

### 🎫 CARD-7.3 : Préparation du Mémoire & Soutenance CDA
- **Colonne Trello** : `À Faire`
- **Étiquettes** : 🟩 `CDA` 📜 `Certification`
- **Checklist** :
  - [ ] Rédaction du Dossier de Projet / Dossier Professionnel (DP)
  - [ ] Création des diapositives de présentation
  - [ ] Répétition du scénario de démo en direct
