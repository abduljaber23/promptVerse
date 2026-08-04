## Context

Authentication is critical for the PromptVerse marketplace. To reduce dependencies and simplify the architecture as per the project requirements, we are using native NestJS JWT authentication with bcrypt, avoiding external libraries like Passport or OAuth providers.

## Goals / Non-Goals

**Goals:**
- Secure the API using JWT.
- Hash passwords securely using bcrypt.
- Implement RBAC (Role-Based Access Control).
- Build the frontend authentication flow (Login/Register).

**Non-Goals:**
- OAuth or Social Login (Google, GitHub, etc.).
- Complex password reset flows via email (focus on core auth first).

## Decisions

1. **Hashing Algorithm**: `bcrypt`.
   - *Rationale*: Industry standard. We will use a cost factor (salt rounds) of 10 to balance security and performance.
2. **Token Management**: `@nestjs/jwt` generating signed tokens.
   - *Rationale*: Stateless authentication is scalable. The token payload will contain the user's UUID, email, and role.
3. **Frontend State**: React Context API (`AuthContext`).
   - *Rationale*: Sufficient for managing global authentication state in this SPA without introducing Redux.

## Risks / Trade-offs

- **Risk**: Storing JWT in `localStorage` exposes it to XSS attacks.
  - *Mitigation*: We will ensure React handles inputs safely (which it does by default against XSS) and implement Helmet in NestJS for basic HTTP security headers.
