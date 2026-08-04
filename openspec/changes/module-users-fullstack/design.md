## Context

We are initiating the PromptVerse full-stack application. We need to set up the database infrastructure, the backend API with NestJS and TypeORM, and the frontend SPA with React and Vite. The first domain module to implement is the Users module, focusing on profiles and social links. Authentication will be handled separately in the next change.

## Goals / Non-Goals

**Goals:**
- Set up MySQL database via Docker Compose.
- Initialize `apps/api` (NestJS) and configure TypeORM.
- Initialize `apps/web` (React/Vite/Tailwind).
- Implement the `UsersModule` to handle `User`, `UserProfile`, and `SocialLink` entities.
- Build the basic React layout and Profile editing view.

**Non-Goals:**
- Implementing the authentication system (JWT, Login, Register).
- Deploying the application to production.

## Decisions

1. **Database Infrastructure**: Use `docker-compose.yml` to spin up a local MySQL 8.0 instance.
   - *Rationale*: Ensures consistency across development environments and avoids local installation issues.
2. **Backend Framework**: NestJS.
   - *Rationale*: Provides a robust, modular, and testable architecture required for the CDA certification.
3. **Frontend Framework**: React with Vite and Tailwind CSS.
   - *Rationale*: Vite offers fast HMR, and Tailwind enables rapid UI development for the Dark Mode design system.
4. **Data Modeling**: Separate `UserProfile` and `SocialLink` from the `User` entity.
   - *Rationale*: Normalizes the database, keeping auth credentials (`User`) strictly separated from public metadata.

## Risks / Trade-offs

- **Risk**: Developing profile endpoints before AuthGuard is ready means endpoints are temporarily unprotected.
  - *Mitigation*: We will mock the `user_id` context in `UsersController` for testing, and explicitly secure the endpoints with `AuthGuard` in the upcoming `module-auth-fullstack` change.
