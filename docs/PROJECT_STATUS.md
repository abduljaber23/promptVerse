# État du projet PromptVerse — au 20/08/2026

> Résumé généré pour reprendre le projet après une pause. Dernier commit : `8288a57` le **11/08/2026**. Développement démarré le 04/08/2026.

## Vue d'ensemble

PromptVerse est une marketplace de prompts IA (projet chef-d'œuvre CDA). Stack : **NestJS + TypeORM + MySQL** côté API, **React + Vite + Tailwind** côté client, spécifié via **OpenSpec** (8 "changes"/modules proposés dans `openspec/changes/`).

⚠️ Les fichiers `openspec/changes/*/tasks.md` sont restés à `[ ]` (non cochés) alors que du code existe déjà pour plusieurs modules — ces checklists ne reflètent pas l'avancement réel. Le résumé ci-dessous se base sur le code présent dans `apps/api/src` et l'historique git.

## ✅ Ce qui est fait (Backend — `apps/api`)

Modules implémentés dans `apps/api/src/modules/` :

- **auth** — inscription, vérification email, login/logout, reset password, JWT, throttling, decorators `@Public`
- **users** — profil (lecture/màj/suppression), avatar (upload/suppression via Storage), bio
- **storage** — intégration S3/MinIO (upload, delete, retrieval)
- **categories** — CRUD complet + migration
- **ai-tools** — CRUD complet + DTOs
- **prompts** — entités `Prompt` + `PreviewImage`, relations avec User/Category/AiTool, upload d'images, création/lecture
- **admin** — contrôleurs CRUD pour Users, AiTools, Categories (gestion des rôles via `UpdateRoleDto`)
- **mail** — service d'envoi (templates ejs), utilisé par auth
- **health** — endpoint de health check
- **cache** — Redis intégré (CacheModule + interceptor)

Infra :
- `docker-compose` avec MySQL, Redis, MinIO, Mailpit
- 4 migrations TypeORM (users, ai-tools, categories, prompts)
- Validation d'env avec Joi
- Versioning des contrôleurs mis en place

## 🚧 Checklist — ce qui reste à faire

### 0. Petits trous dans le backend existant (`prompts`)
- [ ] Sécuriser `POST /prompts` avec `AuthGuard` + `RolesGuard(USER)` (actuellement pas de guard visible sur le controller)
- [ ] Masquage du contenu payant : ne pas renvoyer `promptContent` complet sur les endpoints publics (`GET /prompts`, `GET /prompts/:slug`) tant que l'achat n'est pas fait
- [ ] Recherche/filtre par mot-clé sur `GET /prompts` (la pagination existe, pas la recherche texte)
- [ ] Script de seed pour catégories / AI tools (aucun seeder trouvé dans le repo)

### 1. Backend — Orders & Stripe (`module-orders-stripe-fullstack`) — rien codé
- [ ] Entités `Order`, `OrderItem`, `CartItem` (avec contrainte `UNIQUE(user_id, prompt_id)` sur `CartItem`)
- [ ] `CartModule` (`GET`/`POST`/`DELETE` sur le panier)
- [ ] Installer le SDK `stripe`
- [ ] `POST /orders/checkout` → créer une session Stripe Checkout
- [ ] `POST /stripe/webhook` (raw body + validation de signature)
- [ ] Passer `Order.status` à `PAID` au succès du webhook
- [ ] `GET /orders/my-prompts` → contenu acheté (non masqué)

### 2. Backend — Payouts (`module-payouts-fullstack`) — rien codé
- [ ] Entité `Payout`
- [ ] `PayoutsModule`
- [ ] Stripe Connect : génération des liens d'onboarding vendeur
- [ ] `POST /payouts/request` (demande de retrait)

### 3. Backend — Reviews & Wishlist (`module-reviews-wishlist-fullstack`) — rien codé
- [ ] Entités `Review`, `WishlistItem` (`UNIQUE(user_id, prompt_id)`)
- [ ] `WishlistModule` (`GET /wishlist`, `POST /wishlist/toggle`)
- [ ] `ReviewsModule` (`POST /reviews`)
- [ ] Vérifier que l'utilisateur a bien un `Order` `PAID` avant d'autoriser un avis
- [ ] Recalcul de `Prompt.averageRating` à chaque nouvel avis

### 4. Frontend (`apps/client`) — quasiment vide (seulement le squelette Vite)

**Socle**
- [ ] Init React Router + layout de base (Navbar, Footer, container)
- [ ] Tailwind en dark mode (déjà en dépendance, pas encore configuré/utilisé)
- [ ] `AuthContext` (état user global + stockage du token)
- [ ] Intercepteur Axios global (header `Authorization`)
- [ ] `ProtectedRoute` pour les vues authentifiées

**Auth**
- [ ] Pages Login / Register + validation de formulaire

**Profil**
- [ ] Page Vue profil
- [ ] Formulaire d'édition profil (+ avatar)

**Catégories / AI Tools**
- [ ] Cards catégories, icônes AI tools
- [ ] Intégration dans le menu de navigation
- [ ] Sections page d'accueil (catégories/outils populaires)

**Prompts**
- [ ] Formulaire "Publier un prompt" (dashboard) + preview d'images
- [ ] Page Catalogue (grille de cards) + filtres + recherche
- [ ] Page Détail d'un prompt (images, description, prix, auteur)

**Panier / Checkout** *(dépend du backend Orders § 1)*
- [ ] `CartContext` + bouton "Ajouter au panier"
- [ ] UI panier (sidebar ou page dédiée)
- [ ] Bouton checkout → redirection Stripe
- [ ] Pages `CheckoutSuccess` / `CheckoutCancel`
- [ ] Dashboard "Ma bibliothèque" (prompts achetés)

**Reviews / Wishlist** *(dépend du backend § 3)*
- [ ] Bouton "cœur" sur les cards / page détail
- [ ] Vue "Mes favoris"
- [ ] Formulaire/modal "Laisser un avis" (si prompt acheté)
- [ ] Affichage des étoiles de note moyenne

**Payouts** *(dépend du backend § 2)*
- [ ] Dashboard "Mes gains"
- [ ] Bouton onboarding Stripe Connect
- [ ] Affichage solde / ventes totales
- [ ] Bouton "Demander un retrait"

**Admin**
- [ ] Espace admin (gestion users/categories/ai-tools déjà dispo côté API)

### 5. Tests
- [ ] Tests backend (peu/pas de tests visibles dans `apps/api/test`)
- [ ] Tests frontend (inexistants, rien n'est encore construit)

### 6. CI/CD & Docker prod (`docker-ci-cd`) — rien codé
- [ ] `apps/api/Dockerfile`
- [ ] `apps/web/Dockerfile` (multi-stage : build Node → Nginx alpine)
- [ ] `docker-compose.prod.yml` (API + Web + DB)
- [ ] `.github/workflows/ci.yml`
- [ ] Lint/Prettier dans la pipeline
- [ ] Tests unitaires dans la pipeline
- [ ] Build des images Docker dans la pipeline

## Prochaines étapes suggérées

1. Terminer le backend **Orders/Stripe** (bloque la logique d'achat, cœur du produit)
2. Démarrer le **frontend** — au minimum auth + catalogue + profil, pour avoir une démo fonctionnelle de bout en bout
3. **Reviews/Wishlist** et **Payouts** ensuite (moins critiques pour un MVP)
4. **Docker CI/CD** pour la mise en production, en fin de parcours

## Repères utiles

- Specs/propositions détaillées : `openspec/changes/<module>/proposal.md` + `design.md` + `specs/`
- Documentation projet (cahier des charges, UML, Merise, sprints) : `docs/`
- Sprints prévus : `docs/sprints/sprint-0` à `sprint-7` (cadrage → soutenance)
