# Fiches de code — client/src/components/home et components/layout

## home/Hero.tsx

Rôle : bandeau d'accueil (titre, accroche, barre de recherche qui navigue vers `/prompts?q=...`).

## home/CategoryStrip.tsx, AiToolStrip.tsx

Rôle : rangée de badges cliquables listant catégories / outils IA (skeleton de chargement, rien affiché si liste vide), chaque badge navigue vers le catalogue filtré.

## layout/RootLayout.tsx

Rôle : layout global des pages publiques : `ScrollToTop` + `Navbar` + `<Outlet />` + `Footer`.

## layout/Navbar.tsx

Rôle : barre de navigation principale. Recherche, bascule de thème clair/sombre (`useUiStore`), menu mobile, et menu utilisateur (avatar, liens dashboard/paramètres/admin si `isAdmin`, déconnexion) ou boutons connexion/inscription si non connecté.

## layout/Footer.tsx

Rôle : pied de page, colonnes de liens adaptées selon l'authentification (compte invité vs connecté).

## layout/DashboardLayout.tsx

Rôle : layout du dashboard utilisateur, navigation latérale (vue d'ensemble, vendre un prompt, mes achats, paramètres) + `<Outlet />`.

## layout/AdminLayout.tsx

Rôle : layout de l'espace admin, onglets (utilisateurs, catégories, outils IA) + `<Outlet />`.

## layout/Container.tsx

Rôle : composant de mise en page générique, centre le contenu avec une largeur max configurable (`narrow`/`default`/`wide`).

## layout/Logo.tsx

Rôle : logo "PromptVerse" cliquable vers l'accueil.

## layout/ScrollToTop.tsx

Rôle : remonte la page en haut à chaque changement de route (ne rend rien).
