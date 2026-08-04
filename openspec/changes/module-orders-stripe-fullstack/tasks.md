## 1. Backend Cart & Orders

- [ ] 1.1 Create `Order`, `OrderItem`, and `CartItem` TypeORM entities.
- [ ] 1.2 Implement `CartModule` (`GET`, `POST`, `DELETE` endpoints for cart items).
- [ ] 1.3 Ensure `UNIQUE(user_id, prompt_id)` constraint is enforced on `CartItem`.

## 2. Backend Stripe Integration

- [ ] 2.1 Install `stripe` SDK.
- [ ] 2.2 Implement `POST /orders/checkout` to build line items and return a Stripe Session URL.
- [ ] 2.3 Implement `POST /stripe/webhook` with raw body parsing to validate signatures.
- [ ] 2.4 Add logic to update `Order` status to `PAID` on webhook success.
- [ ] 2.5 Create a protected endpoint `GET /orders/my-prompts` to fetch purchased content (unmasked).

## 3. Frontend Cart UI

- [ ] 3.1 Create React `CartContext` to manage local state and sync with the API.
- [ ] 3.2 Build the Cart Sidebar or dedicated Cart Page UI.
- [ ] 3.3 Add "Add to Cart" buttons to the Prompt Details page.

## 4. Frontend Checkout UI

- [ ] 4.1 Implement Checkout button that redirects to the Stripe URL returned by the API.
- [ ] 4.2 Build `CheckoutSuccess` and `CheckoutCancel` React routing pages.
- [ ] 4.3 Build "My Library" dashboard view to display and read purchased prompts.
