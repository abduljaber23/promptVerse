# Fiches de code — api/src/modules/stripe

## stripe.module.ts

Rôle : expose `StripeService` aux autres modules (notamment `purchases`).

## stripe.service.ts

Rôle : wrapper autour du SDK Stripe, instancié avec la clé secrète de la config.

Expose :
- `createCheckoutSession` : crée une session de paiement Stripe Checkout
- `constructWebhookEvent` : vérifie la signature d'un webhook Stripe à partir du corps brut de la requête (`rawBody`, voir `main.ts`) et du secret webhook

Dépendances : `stripe` (SDK officiel), `ConfigService`.
