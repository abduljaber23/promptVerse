## 1. Backend Entities & Modules

- [ ] 1.1 Create `Prompt` entity with relations to `User` (seller), `Category`, and `AiTool`.
- [ ] 1.2 Create `PreviewImage` entity with relation to `Prompt`.
- [ ] 1.3 Generate `PromptsModule`, `PromptsService`, `PromptsController`.

## 2. Backend Endpoints

- [ ] 2.1 Implement `POST /prompts` (Secured by `AuthGuard` & `RolesGuard(USER)`).
- [ ] 2.2 Implement `GET /prompts` with search, filter, and pagination logic.
- [ ] 2.3 Implement `GET /prompts/:slug`.
- [ ] 2.4 Implement content masking: Ensure `promptContent` is stripped from public `GET` responses.

## 3. Frontend Publishing

- [ ] 3.1 Create "Publish New Prompt" React form (Dashboard).
- [ ] 3.2 Implement image upload preview logic in the form.
- [ ] 3.3 Integrate form submission with `POST /prompts` API.

## 4. Frontend Catalog & Details

- [ ] 4.1 Create Catalog Page UI (Grid of Prompt cards).
- [ ] 4.2 Implement filters (by category, AI tool) and search bar.
- [ ] 4.3 Create Prompt Details Page UI showcasing images, description, price, and author.
