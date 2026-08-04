## 1. Backend Authentication Setup

- [ ] 1.1 Install dependencies: `bcrypt`, `@types/bcrypt`, `@nestjs/jwt`.
- [ ] 1.2 Create `AuthModule`, `AuthService`, and `AuthController`.
- [ ] 1.3 Implement `register` method (hash password, save user).
- [ ] 1.4 Implement `login` method (verify password, sign JWT).

## 2. Backend Security & Guards

- [ ] 2.1 Implement `AuthGuard` using `JwtService`.
- [ ] 2.2 Implement `RolesGuard` and `@Roles()` decorator.
- [ ] 2.3 Implement `@CurrentUser()` decorator.
- [ ] 2.4 Secure `UsersController` endpoints with `AuthGuard`.

## 3. Frontend Authentication UI

- [ ] 3.1 Create React UI components for Login and Register pages.
- [ ] 3.2 Implement form validation and API integration.

## 4. Frontend State & Routing

- [ ] 4.1 Implement `AuthContext` to manage global user state and token storage.
- [ ] 4.2 Configure global Axios interceptor to attach the `Authorization` header.
- [ ] 4.3 Create a `ProtectedRoute` component to restrict access to authenticated views (e.g., Dashboard, Settings).
