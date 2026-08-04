## ADDED Requirements

### Requirement: Direct Prompt Publishing
The system SHALL allow authenticated users to publish prompts directly.

#### Scenario: User Publishes a Prompt
- **GIVEN** an authenticated user
- **WHEN** calling `POST /prompts` with valid prompt data (title, description, price, content, categoryId, aiToolId)
- **THEN** the prompt MUST be created with status `PUBLISHED` and associated with the user as the seller.

### Requirement: Content Masking
The system SHALL NOT expose the `promptContent` to unauthorized users in public catalog endpoints.

#### Scenario: Fetch Public Catalog
- **GIVEN** a published prompt with sensitive `promptContent`
- **WHEN** calling `GET /prompts` or `GET /prompts/:slug` without authorization
- **THEN** the response MUST contain the prompt metadata (title, price, description) but the `promptContent` field MUST be null, omitted, or masked.
