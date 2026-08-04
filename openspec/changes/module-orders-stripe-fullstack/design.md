## Context

Handling payments securely is the cornerstone of the marketplace. We will use Stripe Checkout to outsource PCI compliance and payment UI, and rely on Stripe Webhooks to asynchronously fulfill orders on the backend.

## Goals / Non-Goals

**Goals:**
- Implement a robust Cart system (stored in DB or local storage).
- Generate Stripe Checkout sessions.
- Securely handle Stripe Webhooks to mark orders as PAID.
- Unlock `promptContent` for buyers.

**Non-Goals:**
- Subscription models (only one-time payments).
- Handling seller payouts (this is deferred to `module-payouts-fullstack`).

## Decisions

1. **Cart Storage**: `CartItem` will be persisted in the MySQL database to ensure cross-device consistency for logged-in users.
2. **Order Fulfillment**: Synchronous checkout responses will NOT mark the order as PAID. Only the asynchronous Stripe Webhook (`checkout.session.completed`) will update the order status.
   - *Rationale*: Protects against users spoofing the success URL to gain access without actually paying.
3. **Data Immutability**: `OrderItem` will copy `promptTitle`, `priceAtPurchase`, and `sellerId` from the Prompt entity at the time of checkout.
   - *Rationale*: If a seller deletes or modifies a prompt later, the buyer's invoice and access history remain intact.

## Risks / Trade-offs

- **Risk**: Webhook signature validation failing in development.
  - *Mitigation*: We will document how to use the Stripe CLI to forward webhooks to `localhost:3000` during development.
