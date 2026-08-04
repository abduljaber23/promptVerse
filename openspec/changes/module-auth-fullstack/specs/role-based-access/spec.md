## ADDED Requirements

### Requirement: Route Protection
The system SHALL protect endpoints based on user roles.

#### Scenario: Access Protected Route
- **GIVEN** a protected endpoint requiring `USER` role
- **WHEN** a request is made with a valid JWT containing the `USER` role
- **THEN** access is granted.

#### Scenario: Deny Unauthorized Access
- **GIVEN** a protected endpoint
- **WHEN** a request is made without a valid JWT
- **THEN** the system returns HTTP 401 Unauthorized.
