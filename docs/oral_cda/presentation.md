# PromptVerse — Présentation du site

Projet réalisé à 3 : **Abduljaber, Amine et Anis**, dans le cadre du diplôme CDA.

## C'est quoi

**PromptVerse** est une marketplace où des créateurs vendent des prompts IA (pour ChatGPT, Midjourney, Claude, etc.) et où des acheteurs les achètent en ligne.

## Fonctionnalités

### Compte / Utilisateur
- Inscription et connexion (JWT, mot de passe hashé en bcrypt)
- Vérification de l'email, réinitialisation de mot de passe
- Profil (avatar, bio, liens réseaux sociaux)

### Catalogue / Prompts
- Recherche et filtre par catégorie et par outil IA (ChatGPT, Midjourney...)
- Fiche prompt avec aperçu gratuit (résultat de démo, images) et prix
- Contenu réel du prompt masqué tant qu'il n'est pas acheté
- Création et publication de ses propres prompts à vendre

### Achat
- Paiement via Stripe Checkout
- Le webhook Stripe valide la commande côté serveur et débloque le prompt
- Historique "Mes achats"

### Admin
- Gestion des utilisateurs (activer / bannir)
- Gestion des catégories et des outils IA

## Stack technique

**Backend**
- NestJS (TypeScript) + TypeORM + MySQL
- JWT maison (pas de Passport, pas d'OAuth)
- Stripe (Checkout + webhook)
- Stockage des fichiers en local (Multer)

**Frontend**
- React 19 + TypeScript
- TanStack Query (état serveur) / Zustand (état client)
  - Pourquoi : sans eux on gère le cache, le chargement et les erreurs à la main, ce qui donne du code répétitif et source de bugs. Les deux règlent ça avec très peu de boilerplate, contrairement à des solutions plus lourdes comme Redux — le choix le plus simple et le plus standard pour le besoin.
- Tailwind CSS + daisyUI

**Infra**
- Docker Compose (API, Web, MySQL, Nginx)
- Déployé sur un VPS avec Nginx + Certbot (HTTPS)
