# Fiches de code — api/src/modules/auth

## auth.controller.ts

Rôle : endpoints d'authentification (`/api/v1/auth`).

Expose : `POST register`, `POST login` (pose le cookie `access_token` httpOnly), `POST logout` (efface le cookie), `GET verify-email/:id/:token`, `POST forgot-password`, `GET reset-password/:id/:token`, `POST reset-password`. Toutes publiques (`@Public()`) sauf logout, avec un rate limiting renforcé (`@Throttle`) sur register/login pour freiner le brute force.

Dépendances : `AuthService`, les DTO du dossier, `@nestjs/throttler`, `common/decorators/public.decorator.ts`.

## auth.module.ts

Rôle : assemble le module auth. Configure `JwtModule` (secret et expiration depuis la config), importe `UsersModule` et `MailModule`, déclare `AuthController` et les providers `AuthService`/`BcryptService`.

## auth.service.ts

Rôle : toute la logique métier de l'authentification.
- `register` : vérifie l'unicité email/username, hash le mot de passe, crée l'utilisateur avec un token de vérification (valable 15 min), envoie l'email de vérification.
- `login` : vérifie email/mot de passe, bloque si l'email n'est pas vérifié (renvoie un nouveau token si besoin), sinon signe un JWT (`sub`, `role`).
- `verifyEmail`, `sendResetPasswordLink`, `getResetPasswordLink`, `resetPassword` : cycle complet de vérification d'email et de réinitialisation de mot de passe par token à durée de vie limitée.

Dépendances : `UsersService`, `BcryptService`, `MailService`, `JwtService`, `ConfigService`, `common/errors/error-codes.ts`.

## bcrypt.service.ts

Rôle : petit wrapper autour de `bcrypt` (`hash`, `compare`) pour le hashage des mots de passe (10 rounds de sel).

## dto/forgot-password.dto.ts, login.dto.ts, register.dto.ts, reset-password.dto.ts

Rôle : DTO validés par `class-validator` pour chaque endpoint (email, mot de passe, username, tokens), avec exemples Swagger via `@ApiProperty`.
