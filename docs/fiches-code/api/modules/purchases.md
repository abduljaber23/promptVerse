# Fiches de code — api/src/modules/purchases

## purchases.controller.ts

Rôle : endpoints d'achat (`/api/v1/purchases`).

Expose : `POST checkout-session` (crée une session Stripe pour un prompt), `POST webhook` (`@Public()`, `@SkipThrottle()` : reçoit les événements Stripe, vérifiés par signature du corps brut plutôt que par cookie), `GET mine` (mes achats complétés), `GET by-session/:sessionId`.

## purchases.module.ts

Rôle : enregistre `Purchase` dans TypeORM, importe `PromptsModule`, `UsersModule`, `StripeModule`.

## purchases.service.ts

Rôle : logique d'achat et de paiement.
- `createCheckoutSession` : refuse un prompt gratuit, l'achat de son propre prompt, ou un prompt déjà acheté ; réutilise une ligne `PENDING` existante plutôt que d'en recréer une à chaque clic ; crée la session Stripe Checkout (montant en centimes) puis enregistre son id
- `handleWebhookEvent` : vérifie la signature Stripe, route `checkout.session.completed` vers `completePurchase` et `checkout.session.expired` vers `failPurchase`, ignore les autres types sans erreur (répond 200 pour que Stripe arrête de retenter)
- `completePurchase` : idempotent (ignore si déjà `COMPLETED`, protège contre les doublons d'événements Stripe), passe l'achat à `COMPLETED`, incrémente les ventes du prompt, crédite le solde du vendeur
- `findMyPurchases`, `findBySessionId`

## purchases.service.spec.ts

Rôle : tests unitaires Jest couvrant les refus (prompt gratuit, propre prompt, déjà acheté), la réutilisation d'un achat `PENDING`, la validation de signature du webhook, et surtout l'idempotence de `completePurchase` (un deuxième événement identique ne recrédite pas deux fois le vendeur).

## dto/create-checkout-session.dto.ts

Rôle : DTO minimal, l'UUID du prompt à acheter.

## entities/purchase.entity.ts

Rôle : entité `purchases`. Copie `sellerId` et `amount` au moment de l'achat (indépendants d'une modification ultérieure du prompt), relations vers acheteur et prompt en `RESTRICT`, `stripeCheckoutSessionId` unique.
