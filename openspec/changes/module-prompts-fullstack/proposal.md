## Why

Implement the core marketplace feature: the Prompts catalog. This allows sellers to publish their prompts and buyers to browse the catalog and view prompt details.

## What Changes

- **Backend**: Create `Prompt` and `PreviewImage` entities.
- **Backend**: Implement `PromptsModule`.
- **Backend**: Endpoints for direct publishing (`POST /prompts`).
- **Backend**: Endpoints for reading the catalog (`GET /prompts`, `GET /prompts/:slug`).
- **Backend**: Logic to mask `promptContent` for unauthorized users.
- **Frontend**: Build the React Catalog Page with filters and pagination.
- **Frontend**: Build the React Prompt Details Page (Product Page).
- **Frontend**: Build the "Publish a Prompt" form in the User Dashboard.

## Capabilities

### New Capabilities
- `prompt-publishing`: Creating and publishing new prompts to the marketplace.
- `prompt-catalog`: Browsing, searching, and viewing the marketplace catalog.
- `content-masking`: Hiding sensitive prompt content from users who haven't purchased it.

### Modified Capabilities
None.

## Impact

- **Backend**: Core product data model introduced.
- **Frontend**: Core user flow introduced (Browsing catalog -> Viewing details).
