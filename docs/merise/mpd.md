# 🗄️ Modèle Physique des Données (MPD - Script SQL DDL MySQL 8.0 Optimisé)

## 💻 Script DDL de Création de la Base de Données

```sql
-- Structure de la base de données pour PromptVerse (MySQL 8.0)
CREATE DATABASE IF NOT EXISTS promptverse CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE promptverse;

-- Table : USERS (Authentification & Compte)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('USER', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'USER',
    status ENUM('PENDING', 'ACTIVE', 'BANNED') NOT NULL DEFAULT 'PENDING',
    balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    email_verified_at DATETIME NULL,
    verification_token VARCHAR(255) NULL,
    verification_token_expires_at DATETIME NULL,
    reset_password_token VARCHAR(255) NULL,
    reset_password_token_expires_at DATETIME NULL,
    stripe_customer_id VARCHAR(255) NULL,
    stripe_account_id VARCHAR(255) NULL,
    stripe_onboarding_complete BOOLEAN NOT NULL DEFAULT FALSE,
    last_login_at DATETIME NULL,
    deleted_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email),
    INDEX idx_users_username (username),
    INDEX idx_users_role (role),
    INDEX idx_users_status (status)
) ENGINE=InnoDB;

-- Table : USER_PROFILES (Métadonnées de profil - Relation 1:1)
CREATE TABLE IF NOT EXISTS user_profiles (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL UNIQUE,
    avatar VARCHAR(500) NULL,
    bio TEXT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_profiles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table : SOCIAL_LINKS (Réseaux Sociaux Dynamiques - Relation 1:N)
CREATE TABLE IF NOT EXISTS social_links (
    id VARCHAR(36) PRIMARY KEY,
    profile_id VARCHAR(36) NOT NULL,
    platform ENUM('WEBSITE', 'TWITTER', 'INSTAGRAM', 'GITHUB', 'LINKEDIN', 'YOUTUBE', 'TIKTOK', 'DISCORD') NOT NULL,
    url VARCHAR(500) NOT NULL,
    CONSTRAINT fk_social_profile FOREIGN KEY (profile_id) REFERENCES user_profiles(id) ON DELETE CASCADE,
    INDEX idx_social_profile (profile_id)
) ENGINE=InnoDB;

-- Table : AI_TOOLS
CREATE TABLE IF NOT EXISTS ai_tools (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon_url VARCHAR(500) NULL,
    INDEX idx_ai_tools_slug (slug)
) ENGINE=InnoDB;

-- Table : CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon_url VARCHAR(500) NULL,
    INDEX idx_categories_slug (slug)
) ENGINE=InnoDB;

-- Table : PROMPTS (Catalogue & Produits)
CREATE TABLE IF NOT EXISTS prompts (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    prompt_content TEXT NOT NULL,
    preview_result TEXT NOT NULL,
    cover_image VARCHAR(500) NULL,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    sales_count INT NOT NULL DEFAULT 0,
    views_count INT NOT NULL DEFAULT 0,
    favorites_count INT NOT NULL DEFAULT 0,
    average_rating DECIMAL(2, 1) NOT NULL DEFAULT 0.0,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    status ENUM('PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'PUBLISHED',
    user_id VARCHAR(36) NOT NULL,
    category_id VARCHAR(36) NOT NULL,
    ai_tool_id VARCHAR(36) NOT NULL,
    published_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_prompts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_prompts_category FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT fk_prompts_aitool FOREIGN KEY (ai_tool_id) REFERENCES ai_tools(id),
    INDEX idx_prompts_slug (slug),
    INDEX idx_prompts_status (status),
    INDEX idx_prompts_created_at (created_at),
    INDEX idx_prompts_sales (sales_count),
    INDEX idx_prompts_user (user_id)
) ENGINE=InnoDB;

-- Table : PREVIEW_IMAGES
CREATE TABLE IF NOT EXISTS preview_images (
    id VARCHAR(36) PRIMARY KEY,
    url VARCHAR(500) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    prompt_id VARCHAR(36) NOT NULL,
    CONSTRAINT fk_preview_prompt FOREIGN KEY (prompt_id) REFERENCES prompts(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Table : ORDERS
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('PENDING', 'PAID', 'REFUNDED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    stripe_session_id VARCHAR(255) NULL,
    stripe_payment_intent_id VARCHAR(255) NULL,
    paid_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_orders_user (user_id),
    INDEX idx_orders_status (status)
) ENGINE=InnoDB;

-- Table : ORDER_ITEMS (avec Historisation du Prompt au moment de l'achat)
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL,
    prompt_id VARCHAR(36) NOT NULL,
    prompt_title VARCHAR(255) NOT NULL,
    seller_id VARCHAR(36) NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_prompt FOREIGN KEY (prompt_id) REFERENCES prompts(id)
) ENGINE=InnoDB;

-- Table : CART_ITEMS (avec Contrainte d'Unicité UNIQUE(user_id, prompt_id))
CREATE TABLE IF NOT EXISTS cart_items (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    prompt_id VARCHAR(36) NOT NULL,
    added_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_prompt FOREIGN KEY (prompt_id) REFERENCES prompts(id) ON DELETE CASCADE,
    CONSTRAINT unq_user_prompt_cart UNIQUE (user_id, prompt_id)
) ENGINE=InnoDB;

-- Table : WISHLIST_ITEMS (avec Contrainte d'Unicité UNIQUE(user_id, prompt_id))
CREATE TABLE IF NOT EXISTS wishlist_items (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    prompt_id VARCHAR(36) NOT NULL,
    added_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_wishlist_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_wishlist_prompt FOREIGN KEY (prompt_id) REFERENCES prompts(id) ON DELETE CASCADE,
    CONSTRAINT unq_user_prompt_wishlist UNIQUE (user_id, prompt_id)
) ENGINE=InnoDB;

-- Table : REVIEWS (avec Contrainte d'Unicité UNIQUE(user_id, prompt_id))
CREATE TABLE IF NOT EXISTS reviews (
    id VARCHAR(36) PRIMARY KEY,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NULL,
    user_id VARCHAR(36) NOT NULL,
    prompt_id VARCHAR(36) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_reviews_prompt FOREIGN KEY (prompt_id) REFERENCES prompts(id) ON DELETE CASCADE,
    CONSTRAINT unq_user_prompt_review UNIQUE (user_id, prompt_id)
) ENGINE=InnoDB;
```
