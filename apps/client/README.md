# PromptVerse — Frontend

Client React de la marketplace de prompts IA, branché sur l'API NestJS (`apps/api`).

## Stack

| Rôle | Outil |
|---|---|
| Build / dev | Vite 8 + React 19 + TypeScript |
| Styles | Tailwind CSS v4 + **daisyUI 5** (thème `dark` personnalisé) |
| Data / cache | TanStack Query v5 + Axios (cookie httpOnly, `withCredentials`) |
| Formulaires | React Hook Form + Zod (`@hookform/resolvers`) |
| Routing | React Router v7 (`react-router-dom`) |
| Icônes | lucide-react |

## Démarrage

```bash
cp .env.example .env      # ajuster si besoin
npm install
npm run dev               # http://localhost:5173
```

L'API doit tourner sur `http://localhost:3000` (voir `docker-compose.yml` à la racine :
MySQL + Redis + SeaweedFS + Mailpit sont requis, et les migrations TypeORM doivent être jouées).

### Variables d'environnement

| Clé | Description |
|---|---|
| `VITE_API_URL` | URL de l'API avec préfixe + version (`.../api/v1`) |
| `VITE_ASSETS_URL` | URL publique du bucket S3/SeaweedFS servant les covers & previews des prompts |

## Structure

```
src/
├── common/          # code non-React : client axios, appels API, types, helpers, constantes
│   ├── api/         #   client.ts + <domaine>.api.ts (auth, users, prompts, catalog, admin)
│   ├── constants/   #   roles, query-keys
│   ├── lib/         #   api-error (dictionnaire FR), format, assets, cn
│   └── types/       #   interfaces alignées sur les entités du back
├── context/         # AuthContext (session via /users/me + sonde de rôle admin)
├── hooks/           # hooks TanStack Query par domaine (usePrompts, useCatalog, useAdmin…)
├── components/
│   ├── ui/          # primitives daisyUI (Alert, FormField, Pagination, Thumbnail…)
│   ├── layout/      # Navbar, Footer, RootLayout, DashboardLayout, AdminLayout
│   ├── auth/        # ProtectedRoute, AdminRoute, AuthLayout
│   ├── prompt/      # PromptCard, PromptGrid, skeletons
│   ├── home/        # Hero, CategoryStrip, AiToolStrip
│   └── admin/       # CatalogManager (CRUD catégories / outils IA)
├── pages/           # une page par écran (+ sous-dossiers auth/ dashboard/ admin/)
└── routes.tsx       # table de routage
```

## Écrans

- **Public** : accueil, catalogue (filtres catégorie / outil IA / recherche + pagination),
  fiche prompt (galerie, exemple de résultat, contenu verrouillé), 404.
- **Auth** : connexion, inscription, mot de passe oublié, réinitialisation, vérification e-mail.
- **Espace membre** (`/dashboard`) : vue d'ensemble + mes prompts, publier un prompt
  (upload cover + previews), paramètres (profil, avatar, suppression de compte).
- **Admin** (`/admin`, rôle ADMIN/SUPER_ADMIN) : utilisateurs (+ changement de rôle),
  catégories, outils IA.

## Notes d'intégration API

- L'authentification repose sur un **cookie httpOnly `access_token`** : aucun token n'est
  manipulé en JS, `axios` est configuré avec `withCredentials`.
- `GET /users/me` ne renvoie pas le rôle → le rôle admin est déduit en sondant
  `GET /admin/users/count` (200 = admin, 403 = non).
- `GET /prompts` renvoie un tableau sans total : la pagination avance tant qu'une page
  pleine est renvoyée.
- Le **paiement Stripe n'existe pas encore côté API** : le bouton « Acheter » est désactivé
  et le `promptContent` est masqué visuellement sur la fiche.
- Les images de prompts sont servies par le bucket (`VITE_ASSETS_URL`) ; en cas d'échec
  de chargement, un placeholder dégradé s'affiche (`<Thumbnail>`).

## Scripts

```bash
npm run dev       # serveur de dev
npm run build     # tsc -b && vite build
npm run lint      # oxlint
npm run preview   # prévisualisation du build
```
