## Context

The core value of PromptVerse is the ability to discover and purchase AI prompts. We need to implement the backend logic to handle prompts and their preview images, and build the React frontend for the catalog and publishing form.

## Goals / Non-Goals

**Goals:**
- Implement `PromptsModule`.
- Implement `GET` (public with masking) and `POST` (authenticated) endpoints.
- Build the React Catalog UI.
- Build the React Prompt Details UI.

**Non-Goals:**
- Purchasing prompts (Stripe). This is handled in `module-orders-stripe-fullstack`.

## Decisions

1. **Content Masking**: For public `GET` requests, the API will explicitly `delete prompt.promptContent` before returning the JSON response.
   - *Rationale*: Crucial security measure to prevent unauthorized access to the paid product. The full content will only be sent via a dedicated protected endpoint in the Orders module after purchase verification.
2. **Image Storage**: We will initially save `PreviewImage` records with mock URLs or local paths, preparing the field structure for MinIO/S3 integration later.
   - *Rationale*: Avoids blocking the UI development.

## Risks / Trade-offs

- **Risk**: Returning large amounts of data in the catalog.
  - *Mitigation*: We must implement pagination (`limit`/`offset` or `page`) on the `GET /prompts` endpoint from the start.
