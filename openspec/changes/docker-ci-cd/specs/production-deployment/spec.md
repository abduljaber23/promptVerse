## ADDED Requirements

### Requirement: Containerization
The system SHALL be fully runnable via Docker Compose.

#### Scenario: Production Build
- **GIVEN** the full source code
- **WHEN** running `docker-compose -f docker-compose.prod.yml up`
- **THEN** the API, Web Frontend, and MySQL Database MUST start and communicate successfully.
