## 1. Backend Initialization

- [ ] 1.1 Create `docker-compose.yml` with MySQL 8.0 service.
- [ ] 1.2 Initialize NestJS application in `apps/api`.
- [ ] 1.3 Install TypeORM and MySQL driver dependencies.
- [ ] 1.4 Configure `TypeOrmModule` connection in `AppModule`.

## 2. Backend Users Module

- [ ] 2.1 Create `User`, `UserProfile`, and `SocialLink` TypeORM entities.
- [ ] 2.2 Generate `UsersModule`, `UsersService`, and `UsersController`.
- [ ] 2.3 Implement `GET /users/profile` and `PATCH /users/profile` endpoints.
- [ ] 2.4 Verify database synchronization and foreign key constraints.

## 3. Frontend Initialization

- [ ] 3.1 Initialize React SPA in `apps/web` using Vite and TypeScript.
- [ ] 3.2 Install and configure Tailwind CSS (Dark Mode).
- [ ] 3.3 Set up React Router and basic layout structure (Navbar, Footer, Main container).

## 4. Frontend Profile Integration

- [ ] 4.1 Create User Profile View page.
- [ ] 4.2 Create User Profile Edit form.
- [ ] 4.3 Integrate Axios to fetch and update profile data from the NestJS API.
