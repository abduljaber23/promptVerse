## Why

Implement the shopping cart and checkout process to allow users to purchase prompts, generating revenue for sellers. This integrates Stripe Checkout for processing payments.

## What Changes

- **Backend**: Create `Order`, `OrderItem`, and `CartItem` entities.
- **Backend**: Implement `OrdersModule` and `CartModule`.
- **Backend**: Integrate Stripe SDK to create Checkout Sessions (`POST /orders/checkout`).
- **Backend**: Implement Stripe Webhook (`POST /stripe/webhook`) to handle `checkout.session.completed` events and mark orders as `PAID`.
- **Frontend**: Create React Cart Context and UI.
- **Frontend**: Create Checkout Success/Cancel landing pages.

## Capabilities

### New Capabilities
- `shopping-cart`: Ability for users to add prompts to a shopping cart.
- `payment-processing`: Processing payments via Stripe Checkout and unlocking content upon webhook success.

### Modified Capabilities
- `content-masking`: Modification of the Prompt retrieval logic to return the full `promptContent` if the authenticated user has a `PAID` order containing the `prompt_id`.

## Impact

- **Backend**: Adds transactional tables and webhook handlers.
- **Frontend**: Adds cart state management and checkout redirection flows.
