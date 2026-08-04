## ADDED Requirements

### Requirement: Database Initialization
The system SHALL start a MySQL 8.0 database and connect the NestJS application to it.

#### Scenario: App Startup
- **GIVEN** a valid `docker-compose.yml` and NestJS TypeORM configuration
- **WHEN** the NestJS app starts
- **THEN** TypeORM MUST connect to the MySQL database and synchronize the schemas for `User`, `UserProfile`, and `SocialLink`.
