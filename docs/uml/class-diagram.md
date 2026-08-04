# 📐 Diagramme de Classes UML (Domain & Entities TypeORM - Optimisé)

## 📊 Diagramme Mermaid — Classes UML

```mermaid
classDiagram
    class User {
        -string id
        -string email
        -string password
        -string username
        -UserRoles role
        -UserStatus status
        -decimal balance
        -boolean isEmailVerified
        -Date emailVerifiedAt
        -string verificationToken
        -Date verificationTokenExpiresAt
        -string resetPasswordToken
        -Date resetPasswordTokenExpiresAt
        -string stripeCustomerId
        -string stripeAccountId
        -boolean stripeOnboardingComplete
        -Date lastLoginAt
        -Date deletedAt
        -Date createdAt
        -Date updatedAt
    }

    class UserProfile {
        -string id
        -string avatar
        -string bio
        -Date updatedAt
    }

    class SocialLink {
        -string id
        -SocialPlatform platform
        -string url
    }

    class Prompt {
        -string id
        -string title
        -string slug
        -string description
        -string promptContent
        -string previewResult
        -string coverImage
        -decimal price
        -int salesCount
        -int viewsCount
        -int favoritesCount
        -decimal averageRating
        -boolean isFeatured
        -PromptStatus status
        -Date publishedAt
        -Date createdAt
        -Date updatedAt
    }

    class AiTool {
        -string id
        -string name
        -string slug
        -string iconUrl
    }

    class Category {
        -string id
        -string name
        -string slug
        -string iconUrl
    }

    class PreviewImage {
        -string id
        -string url
        -int sortOrder
    }

    class Order {
        -string id
        -decimal totalAmount
        -OrderStatus status
        -string stripeSessionId
        -string stripePaymentIntentId
        -Date paidAt
        -Date createdAt
    }

    class OrderItem {
        -string id
        -string promptTitle
        -string sellerId
        -decimal priceAtPurchase
    }

    class CartItem {
        -string id
        -Date addedAt
    }

    class Review {
        -string id
        -int rating
        -string comment
        -Date createdAt
    }

    class Wishlist {
        -string id
        -Date addedAt
    }

    class Payout {
        -string id
        -decimal amount
        -PayoutStatus status
        -string stripeTransferId
        -Date requestedAt
        -Date processedAt
    }

    User "1" -- "1" UserProfile : possede
    UserProfile "1" --> "0..*" SocialLink : contient
    User "1" --> "0..*" Prompt : cree_ou_vends
    User "1" --> "0..*" Order : achete
    User "1" --> "0..*" Review : redige
    User "1" --> "0..*" CartItem : possede
    User "1" --> "0..*" Wishlist : enregistre
    User "1" --> "0..*" Payout : demande

    Prompt "1" --> "0..*" OrderItem : vendu_via
    Prompt "1" --> "0..*" Review : recoit
    Prompt "1" --> "0..*" PreviewImage : contient
    Prompt "0..*" --> "1" AiTool : concu_pour
    Prompt "0..*" --> "1" Category : appartient_a

    Order "1" --> "1..*" OrderItem : contient
    CartItem "0..*" --> "1" Prompt : cible
    Wishlist "0..*" --> "1" Prompt : concerne
```

---

## 🏷️ Énumérations Métier

```typescript
export enum UserRoles {
  USER = 'USER',          // Achète ET Vend des prompts
  ADMIN = 'ADMIN',        // Gestion du site
  SUPER_ADMIN = 'SUPER_ADMIN', // Droits totaux
}

export enum UserStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
}

export enum SocialPlatform {
  WEBSITE = 'WEBSITE',
  TWITTER = 'TWITTER',
  INSTAGRAM = 'INSTAGRAM',
  GITHUB = 'GITHUB',
  LINKEDIN = 'LINKEDIN',
  YOUTUBE = 'YOUTUBE',
  TIKTOK = 'TIKTOK',
  DISCORD = 'DISCORD',
}

export enum PromptStatus {
  PUBLISHED = 'PUBLISHED', // En ligne immédiatement à la création
  ARCHIVED = 'ARCHIVED',   // Masqué par le vendeur ou l'admin
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
}

export enum PayoutStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED',
}
```
