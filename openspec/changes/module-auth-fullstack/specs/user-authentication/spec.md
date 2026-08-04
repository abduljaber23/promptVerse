## ADDED Requirements

### Requirement: User Registration
The system SHALL allow new users to register and store their credentials securely.

#### Scenario: Register a New User
- **GIVEN** valid registration data (email, username, password)
- **WHEN** calling `POST /auth/register`
- **THEN** the password MUST be hashed with bcrypt, the user is saved with role `USER`, and the system returns the user data (excluding password) with HTTP 201 Created.

### Requirement: User Login
The system SHALL authenticate users and issue a JWT token.

#### Scenario: Login with Valid Credentials
- **GIVEN** registered user credentials (email, password)
- **WHEN** calling `POST /auth/login`
- **THEN** the system returns a signed JWT access token containing the user's ID and role.
