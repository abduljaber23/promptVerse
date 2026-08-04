## ADDED Requirements

### Requirement: Nomenclature Access
The system SHALL provide public endpoints to retrieve the list of active categories and AI tools.

#### Scenario: Fetch Categories
- **GIVEN** categories exist in the database
- **WHEN** calling `GET /categories`
- **THEN** the system MUST return a list of categories (id, name, slug).

#### Scenario: Fetch AI Tools
- **GIVEN** AI tools exist in the database
- **WHEN** calling `GET /ai-tools`
- **THEN** the system MUST return a list of AI tools (id, name, slug, iconUrl).
