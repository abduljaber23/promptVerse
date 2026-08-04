## MODIFIED Requirements

### Requirement: User Profile Management
The system SHALL allow viewing and updating user profiles, including avatars, bios, and social links. Access MUST be authenticated.

#### Scenario: Update Profile Authenticated
- **GIVEN** an existing user record and a valid JWT token
- **WHEN** calling `PATCH /users/profile` with valid avatar, bio, and social links
- **THEN** the `UserProfile` and associated `SocialLink` records MUST be updated in the database for the currently authenticated user.
