## ADDED Requirements

### Requirement: User Profile Management
The system SHALL allow viewing and updating user profiles, including avatars, bios, and social links.

#### Scenario: View Profile
- **GIVEN** an existing user record with a profile
- **WHEN** calling `GET /users/profile`
- **THEN** the system MUST return the `UserProfile` and associated `SocialLink` records.

#### Scenario: Update Profile
- **GIVEN** an existing user record
- **WHEN** calling `PATCH /users/profile` with valid avatar, bio, and social links
- **THEN** the `UserProfile` and associated `SocialLink` records MUST be updated in the database.
