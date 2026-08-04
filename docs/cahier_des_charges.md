# 📜 Cahier des Charges — PromptVerse (Version Simplifiée)

## 1. Contexte & Présentation du Projet
**PromptVerse** est une plateforme web type marketplace simplifiée et efficace spécialisée dans l'achat et la vente de **prompts optimisés pour les intelligences artificielles** (ChatGPT, Midjourney, DALL-E, Stable Diffusion, Claude, etc.).

Chaque utilisateur inscrit (rôle `USER`) peut à la fois **acheter** des prompts pour ses besoins et **vendre** ses propres créations de prompts.

---

## 2. Stack Technique Validée

| Composant | Technologie retenue |
|---|---|
| **Architecture** | Web Multicouche Répartie (API REST + Frontend SPA) |
| **Backend** | NestJS (TypeScript), TypeORM |
| **Authentification** | **JWT natif NestJS + bcrypt** (Sans Passport, sans OAuth) |
| **Base de Données** | MySQL 8.0 (Relationnelle) |
| **Cache & Performance** | Redis (Cache catalogue & sessions) |
| **Stockage Fichiers** | S3 / MinIO (Stockage des images de preview) |
| **Paiements** | Stripe Checkout (Achats) + Stripe Connect (Reversements) |
| **Mails** | Nodemailer / Mailpit (Dev) / Brevo (Prod) |
| **Frontend** | React (TypeScript) + Vite |
| **DevOps & Infra** | Docker, Docker Compose, Nginx, GitHub Actions |

---

## 3. Matrice des Rôles Simplifiée (3 Rôles Uniquement)

| Rôle | Description | Droits & Actions |
|---|---|---|
| **Visiteur** | Non connecté | Parcourir le catalogue, rechercher par catégorie / outil IA, voir previews, s'inscrire / se connecter. |
| **USER** | Utilisateur (Acheteur + Vendeur) | **Acheter** des prompts via Stripe, télécharger le texte des prompts achetés, laisser des avis, **Créer & Publier directement** ses propres prompts, suivre son solde et demander des versements Stripe Connect. |
| **ADMIN** | Administrateur Gestionnaire | Masquer / Archiver un prompt inapproprié, modérer les avis, gérer les comptes utilisateurs (bannir / débannir). |
| **SUPER_ADMIN** | Administrateur Suprême | Droits totaux : promotion d'administrateurs, accès aux métriques financières globales, configuration système. |

---

## 4. Spécifications Fonctionnelles Détaillées & User Stories

### Module 1 : Authentification & Compte Utilisateur
- **US-01 : Inscription & Vérification Email**
  - Inscription par email/mot de passe avec génération d'un `verificationToken`.
  - Attribution automatique du rôle `USER`.
- **US-02 : Connexion JWT Natif & Réinitialisation**
  - Connexion locale retournant un accessToken JWT.
  - Demande de réinitialisation avec `resetPasswordToken` et date d'expiration.

### Module 2 : Gestion des Prompts (Publication Directe & Achat)
- **US-03 : Publication Directe par tout utilisateur (`USER`)**
  - Tout `USER` peut créer un prompt qui est mis en ligne **immédiatement** (statut `PUBLISHED`).
- **US-04 : Consultation, Panier & Achat Stripe**
  - Tout `USER` ou Visiteur peut parcourir le catalogue filtré par Outil IA et Catégorie.
  - Seul un `USER` connecté peut acheter via Stripe Checkout.

### Module 3 : Administration & Gestion (`ADMIN` & `SUPER_ADMIN`)
- **US-05 : Gestion du Contenu (`ADMIN` & `SUPER_ADMIN`)**
  - Archiver ou supprimer un prompt inapproprié (`ARCHIVED`).
- **US-06 : Administration Globale (`SUPER_ADMIN`)**
  - Promotion d'utilisateurs au rang d'Admin, gestion complète de la plateforme.
