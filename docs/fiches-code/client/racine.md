# Fiches de code — client/src (racine)

## App.tsx

Rôle : composant racine, rend uniquement `AppRoutes`.

## main.tsx

Rôle : point d'entrée React. Monte l'app dans `#root`, configure `QueryClient` (React Query, retry 1, pas de refetch au focus, staleTime 30s), enveloppe l'app dans `BrowserRouter` et `QueryClientProvider`, monte `AuthBootstrap` (initialise la session utilisateur) et `Toaster` (notifications globales), active React Query Devtools en dev.

## routes.tsx

Rôle : déclare toutes les routes de l'application avec `react-router-dom`.

Structure : `RootLayout` (navbar/footer) englobe les pages publiques (accueil, catalogue, détail prompt) et les routes protégées (`ProtectedRoute` : dashboard, succès d'achat) dont une partie encore restreinte aux admins (`AdminRoute` : gestion users/catégories/outils IA). Les pages d'auth (login/register/forgot-password) sont sous `GuestRoute` (plein écran, sans navbar). Reset password et verify email sont des routes publiques indépendantes avec paramètres d'URL.

## index.css

Rôle : point d'entrée Tailwind v4 + plugin daisyUI (thèmes dark par défaut / light). Définit les jetons de marque (couleur primaire, couleur de succès pour les prix, rayons de bordure) appliqués aux deux thèmes, la police globale (Inter), et une scrollbar fine adaptée au thème sombre.
