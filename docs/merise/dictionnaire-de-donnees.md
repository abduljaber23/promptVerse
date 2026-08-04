# 🗄️ Dictionnaire de Données Exhaustif (Optimisé)

## 📊 Table `USERS` (Authentification & Sécurité)

| Code Champ | Libellé Métier | Type SQL | Nul ? | Contrainte / Règle de gestion |
|---|---|---|---|---|
| `id` | Identifiant unique UUID | `VARCHAR(36)` | Non | Clé Primaire (PK) |
| `email` | Adresse email | `VARCHAR(255)` | Non | Unique, format email valide, Index |
| `password` | Hash bcrypt du mot de passe | `VARCHAR(255)` | Non | Haché avec `bcrypt` (cost factor 10) |
| `username` | Nom d'utilisateur / Pseudo | `VARCHAR(100)` | Non | Unique, Index |
| `role` | Rôle de l'utilisateur | `ENUM('USER', 'ADMIN', 'SUPER_ADMIN')` | Non | Défaut : `USER` |
| `status` | État du compte | `ENUM('PENDING', 'ACTIVE', 'BANNED')` | Non | Défaut : `PENDING` |
| `balance` | Solde accumulé (Ventes) | `DECIMAL(10, 2)` | Non | Défaut : `0.00` |
| `is_email_verified` | Statut de vérification email | `BOOLEAN` | Non | Défaut : `FALSE` |
| `email_verified_at` | Date de confirmation email | `DATETIME` | Oui | Renseigné après clic lien |
| `verification_token` | Token unique de validation email | `VARCHAR(255)` | Oui | Généré à l'inscription |
| `verification_token_expires_at` | Expiration token validation | `DATETIME` | Oui | Expiration 24h |
| `reset_password_token` | Token réinitialisation mot de passe | `VARCHAR(255)` | Oui | Généré à la demande reset |
| `reset_password_token_expires_at` | Expiration token reset | `DATETIME` | Oui | Expiration 1h |
| `stripe_customer_id` | Identifiant client Stripe Checkout | `VARCHAR(255)` | Oui | Pour les achats |
| `stripe_account_id` | Identifiant Stripe Connect | `VARCHAR(255)` | Oui | Pour recevoir les versements |
| `stripe_onboarding_complete` | Statut onboarding Connect | `BOOLEAN` | Non | Défaut : `FALSE` |
| `last_login_at` | Horodatage dernière connexion | `DATETIME` | Oui | Mis à jour à chaque login |
| `deleted_at` | Date de suppression (Soft Delete) | `DATETIME` | Oui | Permet le Soft Delete |
| `created_at` | Date de création du compte | `DATETIME` | Non | `CURRENT_TIMESTAMP` |
| `updated_at` | Date de dernière modification | `DATETIME` | Non | `CURRENT_TIMESTAMP` |

---

## 📊 Table `PROMPTS` (Catalogue & Produits)

| Code Champ | Libellé Métier | Type SQL | Nul ? | Contrainte / Règle de gestion |
|---|---|---|---|---|
| `id` | Identifiant unique UUID | `VARCHAR(36)` | Non | Clé Primaire (PK) |
| `title` | Titre du prompt | `VARCHAR(255)` | Non | Titre commercial |
| `slug` | Slug d'URL | `VARCHAR(255)` | Non | Unique, Index |
| `description` | Description fonctionnelle | `TEXT` | Non | Visible publiquement |
| `prompt_content` | Texte brut du prompt (confidentiel) | `TEXT` | Non | Accessible après achat `PAID` |
| `preview_result` | Exemple de résultat produit | `TEXT` | Non | Visible publiquement |
| `cover_image` | Image de couverture / miniature | `VARCHAR(500)` | Oui | Pour les cartes du catalogue |
| `price` | Prix de vente (€) | `DECIMAL(10, 2)` | Non | Prix fixé par le vendeur |
| `sales_count` | Nombre de ventes réalisées | `INT` | Non | Défaut `0`, Index |
| `views_count` | Nombre de vues de la fiche | `INT` | Non | Défaut `0` |
| `favorites_count` | Nombre d'ajouts en favoris | `INT` | Non | Défaut `0` |
| `average_rating` | Note moyenne | `DECIMAL(2, 1)` | Non | De 1.0 à 5.0 (Défaut `0.0`) |
| `is_featured` | Mis en avant sur la home | `BOOLEAN` | Non | Défaut `FALSE` |
| `status` | État d'affichage | `ENUM('PUBLISHED', 'ARCHIVED')` | Non | Défaut `PUBLISHED`, Index |
| `published_at` | Date exacte de publication | `DATETIME` | Oui | Renseigné à la mise en ligne |
| `user_id` | Vendeur propriétaire | `VARCHAR(36)` | Non | Clé Étrangère vers `users(id)` |
| `category_id` | Catégorie thématique | `VARCHAR(36)` | Non | Clé Étrangère vers `categories(id)` |
| `ai_tool_id` | Outil IA compatible | `VARCHAR(36)` | Non | Clé Étrangère vers `ai_tools(id)` |
