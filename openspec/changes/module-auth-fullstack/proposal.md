## Why

Implement native JWT authentication and Role-Based Access Control (RBAC) securely in the API and connect the React frontend (AuthContext, Login/Register UI). This ensures that only authenticated users can access protected routes and perform actions like purchasing or publishing prompts.

## What Changes

- **Backend**: Implement `AuthModule` handling registration (`/register`) and login (`/login`).
- **Backend**: Integrate `bcrypt` for secure password hashing.
- **Backend**: Integrate `@nestjs/jwt` for stateless token generation.
- **Backend**: Implement `AuthGuard` (validates JWT) and `RolesGuard` (validates RBAC).
- **Backend**: Create `@CurrentUser()` and `@Roles()` decorators.
- **Frontend**: Create React UI for Register and Login pages.
- **Frontend**: Implement `AuthContext` to manage user session and JWT storage (e.g., in localStorage).
- **Frontend**: Configure Axios interceptor to attach `Authorization: Bearer <token>` to all API requests.
- **Frontend**: Implement `ProtectedRoute` wrapper for authenticated React views.

## Capabilities

### New Capabilities
- `user-authentication`: Registration, login, and JWT token issuance.
- `role-based-access`: Securing endpoints based on USER, ADMIN, and SUPER_ADMIN roles.

### Modified Capabilities
- `user-profile-management`: Securing the profile update endpoint using the newly created `AuthGuard`.

## Impact

- **Backend**: Secures all previously open API routes. Modifies `UsersController` to require authentication.
- **Frontend**: Adds authentication state management and protected routing.
