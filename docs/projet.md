# PromptVerse — Marketplace de Prompts IA

## Présentation du projet

### Contexte
**PromptVerse** est une plateforme web moderne (marketplace) spécialisée dans l'achat et la vente de prompts optimisés pour les intelligences artificielles (ChatGPT, Midjourney, DALL-E, Claude, Stable Diffusion, etc.). Elle permet aux créateurs de rentabiliser leur savoir-faire en prompt engineering et aux acheteurs de gagner du temps en accédant à des instructions pré-testées et performantes.

### Objectifs
- Permettre aux utilisateurs de créer un compte et de se connecter de façon sécurisée (JWT natif).
- Permettre aux utilisateurs de créer, publier et vendre leurs propres prompts.
- Permettre aux utilisateurs de rechercher, filtrer et acheter des prompts via Stripe Checkout.
- Permettre aux acheteurs d'accéder au texte masqué du prompt (`promptContent`) après validation du paiement.
- Permettre aux acheteurs de noter et laisser un avis sur les prompts achetés.
- Permettre aux vendeurs de suivre leurs gains et d'effectuer des demandes de virement via Stripe Connect.
- Permettre aux administrateurs de gérer les utilisateurs et de modérer le contenu du site.

---

## Fonctionnalités

### Authentification
- Inscription par email et mot de passe (hachage bcrypt)
- Connexion sécurisée retournant un token JWT (sans Passport, sans OAuth)
- Vérification de l'email via token unique
- Déconnexion
- Réinitialisation du mot de passe en cas d'oubli

### Profil Utilisateur & Réseaux Sociaux
- Espace profil séparé (`UserProfile`) avec avatar et biographie
- Liens de réseaux sociaux dynamiques (`SocialLink` : Twitter/X, Instagram, GitHub, LinkedIn, Website, etc.)
- Consultation des profils créateurs publics

### Prompts & Catalogue
- Création et publication directe de prompts (`PUBLISHED`)
- Consultation de la galerie d'images de démonstration (`PreviewImage`)
- Aperçu du résultat texte gratuit (`previewResult`)
- Masquage sécurisé des instructions brutes (`promptContent`)
- Recherche par mot-clé et filtrage par catégorie (Marketing, Code, Art...) et outil IA (ChatGPT, Midjourney...)

### Panier & Paiement Stripe
- Ajout et suppression de prompts au panier
- Génération automatique de sessions de paiement Stripe Checkout
- Validation automatique des commandes via Webhook Stripe (`checkout.session.completed`)
- Accès instantané aux prompts achetés dans l'espace utilisateur

### Avis & Notes
- Notation de 1 à 5 étoiles et commentaire textuel sur un prompt acheté
- Calcul automatique de la note moyenne (`averageRating`)
- Contrainte d'unicité (1 seul avis par utilisateur et par prompt)

### Favoris (Wishlist)
- Ajout et retrait de prompts dans la liste de favoris
- Consultation rapide de ses prompts sauvegardés

### Ventes & Payouts (Stripe Connect)
- Tableau de bord des ventes et solde disponible
- Onboarding des vendeurs sur Stripe Connect Express
- Demande de versement (`Payout`) des gains vers le compte bancaire du vendeur

### Modération & Administration
- Consultation des statistiques globales de la plateforme (Administrateur)
- Masquage / Archivage d'un prompt inapproprié
- Gestion des utilisateurs (activation / bannissement de comptes)

---

## Exigences Non Fonctionnelles

### Sécurité
- Mots de passe hachés avec `bcrypt` (cost factor 10)
- Protection contre les attaques XSS et injections SQL (TypeORM avec requêtes préparées)
- En-têtes HTTP sécurisés via `Helmet`
- Limiteur de débit (Rate-limiting NestJS Throttler) sur l'authentification

### Performance
- Temps de réponse du catalogue `< 150ms` grâce à la mise en cache Redis (TTL 5 minutes)
- Invalidation automatique du cache Redis lors de la publication d'un prompt

### Accessibilité & UX
- Interface web moderne responsive en Dark Mode (React TypeScript + Tailwind CSS)
- Support des cartes visuelles avec miniature (`coverImage`)

### Disponibilité & DevOps
- Conteneurisation multi-services avec Docker Compose (API NestJS, Web React, MySQL, Redis, MinIO, Mailpit, Nginx)
- Sauvegarde régulière de la base de données MySQL via script de dump automatisé

---

## Critères de validation
Le projet sera considéré comme réussi si les critères suivants sont remplis :
- Les utilisateurs peuvent créer un compte, vérifier leur email et se connecter avec succès.
- Les utilisateurs peuvent publier directement un prompt en fixant son prix.
- Les utilisateurs peuvent ajouter des prompts au panier et payer via Stripe Checkout avec succès.
- Le webhook Stripe valide la commande et débloque le texte `promptContent` pour l'acheteur.
- Les vendeurs peuvent lier leur compte Stripe Connect et demander un virement de leurs gains.
- L'application s'exécute sans erreur au sein de l'environnement conteneurisé Docker.

---

## Tables de la Base de Données

### Users (Authentification & Compte)
- ID (UUID / Primary Key)
- Email (Unique)
- Password (Hash bcrypt)
- Username (Unique)
- Role (Enum: USER, ADMIN, SUPER_ADMIN)
- Status (Enum: PENDING, ACTIVE, BANNED)
- Balance (Decimal 10,2)
- IsEmailVerified (Boolean)
- EmailVerifiedAt (DateTime)
- VerificationToken (String)
- VerificationTokenExpiresAt (DateTime)
- ResetPasswordToken (String)
- ResetPasswordTokenExpiresAt (DateTime)
- StripeCustomerId (String)
- StripeAccountId (String)
- StripeOnboardingComplete (Boolean)
- LastLoginAt (DateTime)
- Created_at
- Updated_at
- Deleted_at

### UserProfiles (Profil & Bio - Relation 1:1 avec Users)
- ID (UUID / Primary Key)
- User_ID (Foreign Key UNIQUE)
- Avatar (String)
- Bio (Text)
- Updated_at

### SocialLinks (Réseaux Sociaux - Relation 1:N avec UserProfiles)
- ID (UUID / Primary Key)
- Profile_ID (Foreign Key)
- Platform (Enum: WEBSITE, TWITTER, INSTAGRAM, GITHUB, LINKEDIN, YOUTUBE, TIKTOK, DISCORD)
- URL (String)

### Prompts (Produits du Catalogue)
- ID (UUID / Primary Key)
- Title (String)
- Slug (Unique)
- Description (Text)
- PromptContent (Text - Confidentiel)
- PreviewResult (Text - Démonstration)
- CoverImage (String)
- Price (Decimal 10,2)
- SalesCount (Int)
- ViewsCount (Int)
- FavoritesCount (Int)
- AverageRating (Decimal 2,1)
- IsFeatured (Boolean)
- Status (Enum: PUBLISHED, ARCHIVED)
- User_ID (Foreign Key - Vendeur)
- Category_ID (Foreign Key)
- AiTool_ID (Foreign Key)
- Published_at
- Created_at
- Updated_at

### PreviewImages (Galerie d'Images de Démonstration)
- ID (UUID / Primary Key)
- Prompt_ID (Foreign Key)
- URL (String)
- SortOrder (Int)

### AiTools (ChatGPT, Midjourney, Claude...)
- ID (UUID / Primary Key)
- Name (Unique)
- Slug (Unique)
- IconUrl (String)

### Categories (Marketing, Code, Art...)
- ID (UUID / Primary Key)
- Name (Unique)
- Slug (Unique)
- IconUrl (String)

### Orders (Commandes d'Achat)
- ID (UUID / Primary Key)
- User_ID (Foreign Key - Acheteur)
- TotalAmount (Decimal 10,2)
- Status (Enum: PENDING, PAID, REFUNDED, FAILED)
- StripeSessionId (String)
- StripePaymentIntentId (String)
- Paid_at
- Created_at

### OrderItems (Lignes de Commande Historisées)
- ID (UUID / Primary Key)
- Order_ID (Foreign Key)
- Prompt_ID (Foreign Key)
- PromptTitle (String - Historisé)
- Seller_ID (UUID - Historisé)
- PriceAtPurchase (Decimal 10,2)

### CartItems (Panier Utilisateur - Unique: User_ID + Prompt_ID)
- ID (UUID / Primary Key)
- User_ID (Foreign Key)
- Prompt_ID (Foreign Key)
- Added_at

### WishlistItems (Favoris - Unique: User_ID + Prompt_ID)
- ID (UUID / Primary Key)
- User_ID (Foreign Key)
- Prompt_ID (Foreign Key)
- Added_at

### Reviews (Notes & Avis - Unique: User_ID + Prompt_ID)
- ID (UUID / Primary Key)
- User_ID (Foreign Key)
- Prompt_ID (Foreign Key)
- Rating (Int: 1 à 5)
- Comment (Text)
- Created_at

### Payouts (Demandes de Virement Stripe Connect)
- ID (UUID / Primary Key)
- User_ID (Foreign Key - Vendeur)
- Amount (Decimal 10,2)
- Status (Enum: PENDING, PROCESSING, PROCESSED, FAILED)
- StripeTransferId (String)
- Requested_at
- Processed_at

---

## Améliorations Futures
- Recommandations de prompts personnalisées par IA
- Système de coupons de réduction et codes promo
- Système de notifications en temps réel (WebSockets / Push)
- Export des données personnelles (Conformité RGPD)
- Support multilingue de la marketplace
