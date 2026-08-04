## ADDED Requirements

### Requirement: Payment Processing
The system SHALL integrate with Stripe to process payments and handle fulfillment asynchronously.

#### Scenario: Checkout Session Creation
- **GIVEN** an authenticated user with items in their cart
- **WHEN** calling `POST /orders/checkout`
- **THEN** the system MUST create an `Order` with status `PENDING`, create `OrderItem` records, clear the user's cart, and return a Stripe Checkout URL.

#### Scenario: Webhook Fulfillment
- **GIVEN** a pending order
- **WHEN** the system receives a valid `checkout.session.completed` Stripe webhook
- **THEN** the system MUST find the corresponding `Order` and update its status to `PAID`.

### Requirement: Content Unlocking
The system SHALL grant access to `promptContent` for purchased items.

#### Scenario: Fetch Purchased Prompt
- **GIVEN** a user who has a `PAID` order for Prompt X
- **WHEN** the user calls a protected endpoint (e.g., `GET /orders/my-prompts/:slug`)
- **THEN** the system MUST return the full Prompt details, including the unmasked `promptContent`.
