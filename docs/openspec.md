# ⚡ Fission-AI OpenSpec — Framework & Workflow PromptVerse

Ce document détaille la démarche officielle **Fission-AI OpenSpec** (`@fission-ai/openspec`) pour la gestion des évolutions et des spécifications guidées par les artefacts.

---

## 🛠️ 1. Installation & Initialisation

```bash
# Installation globale de l'outil CLI Fission-AI OpenSpec
npm install -g @fission-ai/openspec@latest

# Se placer à la racine du projet PromptVerse
cd c:\FormationCDA\projet_final\PromptVerse

# Initialiser OpenSpec dans le repository
openspec init
```

---

## 🔄 2. Le Workflow Artefact OpenSpec (`/opsx`)

Pour chaque fonctionnalité, OpenSpec génère un dossier de changement dans `openspec/changes/<change-name>/` avec la structure d'artefacts suivante :

```text
openspec/changes/<change-name>/
  ├── proposal.md      # Pourquoi et quoi : contexte et périmètre
  ├── specs/           # Exigences fonctionnelles et scénarios
  │   └── requirements.md
  ├── design.md        # Approche technique, architecture et API
  └── tasks.md         # Checklist des tâches d'implémentation
```

### 💬 Slash Commands d'Exécution

```bash
# 1. Explorer et analyser avant de créer (pas d'écriture de code)
/opsx:explore "Comment intégrer Stripe Checkout proprement ?"

# 2. Générer le dossier de spécification d'un changement
/opsx:propose 01-core-entities-database
/opsx:propose 02-custom-jwt-auth-users
/opsx:propose 03-prompts-catalog-direct-publishing
/opsx:propose 04-stripe-checkout-purchases
/opsx:propose 05-stripe-connect-payouts
/opsx:propose 06-redis-caching-minio-storage
/opsx:propose 07-frontend-react-ui-design
/opsx:propose 08-dockerization-ci-cd-nginx

# 3. Appliquer les tâches d'implémentation du changement en cours
/opsx:apply

# 4. Archiver le changement une fois validé
/opsx:archive
```

---

## 📋 3. Structure des Proposals OpenSpec PromptVerse

### 🔹 Change 01 : `01-core-entities-database`
- **`proposal.md`** : Initialiser la couche de données TypeORM et MySQL 8.0 pour PromptVerse.
- **`specs/requirements.md`** : Création des entités `User`, `Prompt`, `Category`, `AiTool`, `Order`, `OrderItem`, `Review`, `Wishlist`, `Payout`, `PreviewImage`.
- **`design.md`** : Mappings TypeORM, UUIDs, contraintes de clés étrangères et index MySQL.
- **`tasks.md`** :
  - [ ] 1.1 Configurer `TypeOrmModule` dans NestJS.
  - [ ] 1.2 Créer les entités et énumérations.
  - [ ] 1.3 Générer la migration initiale.

---

### 🔹 Change 02 : `02-custom-jwt-auth-users`
- **`proposal.md`** : Authentification locale sécurisée par JWT natif sans Passport ni OAuth.
- **`specs/requirements.md`** : Inscription avec hachage bcrypt, login retournant un accessToken, verification mail et reset password tokens.
- **`design.md`** : `AuthService`, `AuthGuard` natif, décorateur `@CurrentUser()`, `UserRoles` (`USER`, `ADMIN`, `SUPER_ADMIN`).
- **`tasks.md`** :
  - [ ] 2.1 Implémenter le hachage `bcrypt` et `JwtService`.
  - [ ] 2.2 Créer les routes `POST /auth/register` et `POST /auth/login`.
  - [ ] 2.3 Développer l'`AuthGuard` et le `RolesGuard`.

---

### 🔹 Change 03 : `03-prompts-catalog-direct-publishing`
- **`proposal.md`** : Publication directe sans modération préalable (`PUBLISHED`) et recherche catalogue.
- **`specs/requirements.md`** : Tout `USER` peut publier un prompt immédiatement en ligne. Masquage de `promptContent` pour les non-acheteurs.
- **`design.md`** : `PromptsService`, `CategoriesService`, `AiToolsService`, requêtes de recherche filtrées.
- **`tasks.md`** :
  - [ ] 3.1 Créer la route `POST /prompts` avec statut `PUBLISHED`.
  - [ ] 3.2 Implémenter la recherche et les filtres `GET /prompts`.
  - [ ] 3.3 Masquer `promptContent` dans le DTO de réponse publique.

---

### 🔹 Change 04 : `04-stripe-checkout-purchases`
- **`proposal.md`** : Traitement des achats de prompts via Stripe Checkout.
- **`specs/requirements.md`** : Génération d'une session de paiement Stripe et validation automatique par Webhook `checkout.session.completed`.
- **`design.md`** : `StripeService`, `WebhookController`, mise à jour du statut de commande à `PAID`.
- **`tasks.md`** :
  - [ ] 4.1 Intégrer la SDK Stripe Node.js.
  - [ ] 4.2 Créer la route `POST /orders/checkout`.
  - [ ] 4.3 Développer le gestionnaire de Webhook Stripe.

---

### 🔹 Change 05 : `05-stripe-connect-payouts`
- **`proposal.md`** : Reversements financiers pour les vendeurs via Stripe Connect.
- **`specs/requirements.md`** : Onboarding Express Stripe Connect et demande de virement du solde (`balance`).
- **`design.md`** : `PayoutsService`, Stripe Connect Transfers API.
- **`tasks.md`** :
  - [ ] 5.1 Route d'onboarding Stripe Connect pour `USER`.
  - [ ] 5.2 Développer la création de `Payout` et le transfert Stripe.

---

### 🔹 Change 06 : `06-redis-caching-minio-storage`
- **`proposal.md`** : Optimisation des performances avec Redis et gestion des images avec MinIO (S3).
- **`specs/requirements.md`** : Cache Redis 5 min sur le catalogue et stockage S3 des `PreviewImage`.
- **`design.md`** : `RedisCacheModule`, AWS S3 Client Service.
- **`tasks.md`** :
  - [ ] 6.1 Interceptor Redis sur `GET /prompts`.
  - [ ] 6.2 Invalidation du cache lors d'une publication.
  - [ ] 6.3 Route `POST /media/upload` avec envoi sur MinIO.

---

### 🔹 Change 07 : `07-frontend-react-ui-design`
- **`proposal.md`** : Application web SPA React (TypeScript + Vite) Dark Mode.
- **`specs/requirements.md`** : Interface fluide pour la navigation catalogue, l'achat Stripe et la publication de prompt.
- **`design.md`** : React Router, Tailwind CSS, AuthContext, Axios API Client.
- **`tasks.md`** :
  - [ ] 7.1 Mettre en place le Layout et le Theme Dark.
  - [ ] 7.2 Développer les pages Landing, Catalogue et Fiche Produit.
  - [ ] 7.3 Développer le Dashboard `USER` (prompts achetés + virement).

---

### 🔹 Change 08 : `08-dockerization-ci-cd-nginx`
- **`proposal.md`** : Industrialisation, conteneurisation et déploiement.
- **`specs/requirements.md`** : Docker Compose multi-services (API, Web, MySQL, Redis, MinIO, Nginx) et pipeline CI/CD.
- **`design.md`** : Multi-stage Dockerfiles, reverse proxy Nginx, GitHub Actions workflow.
- **`tasks.md`** :
  - [ ] 8.1 Écrire `Dockerfile` NestJS & React.
  - [ ] 8.2 Finaliser `docker-compose.yml` et `nginx.conf`.
  - [ ] 8.3 Écrire le script de backup MySQL automatisé.
