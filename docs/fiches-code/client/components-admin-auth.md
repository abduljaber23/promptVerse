# Fiches de code — client/src/components/admin et components/auth

## admin/CatalogManager.tsx

Rôle : composant générique réutilisé pour gérer catégories et outils IA (interface identique côté admin). Reçoit en props les queries (`active`, `archived`) et mutations (`create`, `update`, `remove`, `restore`) déjà préparées par les hooks appelants. Formulaire d'ajout, tableau des éléments actifs avec édition inline et suppression (via `ConfirmDialog`), liste des archivés avec bouton de restauration. Toute erreur passe par `toast.error(getApiErrorMessage(...))`.

## auth/AdminRoute.tsx

Rôle : garde de route pour les pages admin. Affiche un loader pendant la vérification de session/rôle, redirige vers `/login` si non connecté, affiche un message d'accès refusé si connecté mais non admin, sinon rend `<Outlet />`.

## auth/GuestRoute.tsx

Rôle : garde de route inverse, réservée aux visiteurs non connectés (login, register). Redirige vers `/dashboard` si déjà authentifié.

## auth/ProtectedRoute.tsx

Rôle : garde de route pour les pages nécessitant une connexion. Redirige vers `/login` en conservant l'URL d'origine dans le state de navigation (pour y revenir après connexion).

## auth/AuthLayout.tsx

Rôle : layout visuel partagé par les pages d'authentification (logo, titre, sous-titre, contenu, pied de page optionnel), pas une garde de route.
