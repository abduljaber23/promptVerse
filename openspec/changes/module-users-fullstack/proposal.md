## Why

This change initializes the full-stack foundation (NestJS + React) and implements the core `UsersModule`. This establishes the core data models for users, their public profiles, and social links, along with the foundational API structure and the initial React SPA setup. This is the prerequisite for all subsequent modules (Auth, Prompts, etc.).

## What Changes

- Initialize `docker-compose.yml` with a MySQL 8.0 service.
- Initialize the NestJS backend application (`apps/api`).
- Initialize the React Vite frontend application (`apps/web`) with Tailwind CSS configured for Dark Mode.
- Integrate TypeORM in the backend.
- Create TypeORM entities: `User`, `UserProfile`, and `SocialLink`.
- Create `UsersModule`, `UsersService`, and `UsersController` in the backend.
- Expose backend endpoints to fetch and update user profile data.
- Build the core frontend layout shell (Navbar, Footer, Main Container).
- Build the frontend User Profile View/Edit page.

## Capabilities

### New Capabilities
- `database-initialization`: Setup of the MySQL database and TypeORM connection.
- `user-profile-management`: The ability to view and edit user profile information (avatar, bio, social links) across the backend API and frontend UI.

### Modified Capabilities
None (Initial capabilities).

## Impact

- **Infrastructure**: Adds `docker-compose.yml` for local development.
- **Backend**: Creates the base NestJS structure and `UsersModule`.
- **Frontend**: Creates the base React SPA structure and layout.
- **Database**: Creates the `users`, `user_profiles`, and `social_links` tables.
