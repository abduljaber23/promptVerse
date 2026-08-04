## ADDED Requirements

### Requirement: Purchasing Validation for Reviews
The system SHALL only allow users to review a prompt if they have successfully purchased it.

#### Scenario: Post Review
- **GIVEN** an authenticated user who has a `PAID` order for Prompt X
- **WHEN** calling `POST /reviews` with a rating (1-5) and comment
- **THEN** the system MUST save the review and update the prompt's `averageRating`.

#### Scenario: Prevent Unauthorized Review
- **GIVEN** an authenticated user who has NOT purchased Prompt X
- **WHEN** calling `POST /reviews`
- **THEN** the system MUST return HTTP 403 Forbidden.

### Requirement: Wishlist Management
The system SHALL allow users to manage a personal list of favorite prompts.

#### Scenario: Toggle Wishlist
- **GIVEN** an authenticated user
- **WHEN** calling `POST /wishlist` for a prompt
- **THEN** the system MUST add it to the wishlist (if not present) or remove it (if already present), and update the prompt's `favoritesCount`.
