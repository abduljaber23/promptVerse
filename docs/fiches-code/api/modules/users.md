# Fiches de code — api/src/modules/users

## users.controller.ts

Rôle : endpoints du profil de l'utilisateur connecté (`/api/v1/users`).

Expose : `GET me`, `PATCH me`, `DELETE me` (suppression douce), `POST avatar` (upload via `FileInterceptor`, multipart/form-data), `DELETE avatar`. Toutes protégées par l'auth (pas de `@Public()`), utilisateur identifié via `@CurrentUser()`.

Dépendances : `UsersService`, `common/decorators/current-user.decorator.ts`, `dto/avatar-upload.dto.ts`, `dto/update-user.dto.ts`.

## users.module.ts

Rôle : assemble le module. Enregistre l'entité `User` dans TypeORM, importe `MailModule`/`StorageModule`, et configure `MulterModule` pour l'upload d'avatar : stockage disque dans `uploads/avatars`, nom de fichier en UUID, filtre les fichiers non-image, limite à 5 Mo.

## users.service.ts

Rôle : logique métier des utilisateurs.
- recherche par id/email/username (avec relation `profile`)
- `create`, `update` (gère le changement d'email avec re-vérification, le changement de username avec contrôle d'unicité, la bio du profil)
- `delete` (soft delete)
- `setProfileAvatar`/`removeProfileAvatar` (délèguent la suppression du fichier physique à `StorageService`)
- `safeUserResponse` : sérialise l'utilisateur sans exposer les champs sensibles (tokens, mot de passe déjà exclu par l'entité)

Dépendances : `Repository<User>` (TypeORM), `StorageService`, `MailService`, `ConfigService`.

## dto/avatar-upload.dto.ts, create-user.dto.ts, update-user.dto.ts

Rôle : DTO Swagger/validation pour l'upload d'avatar (fichier binaire), la création interne d'un utilisateur (utilisée par `AuthService.register`) et la mise à jour du profil (champs optionnels : username, email, bio).

## entities/user.entity.ts

Rôle : entité TypeORM `users`. Champs : identité (email, username uniques, mot de passe exclu de la sérialisation via `@Exclude()`), solde (`balance`), rôle et statut (enums), cycle de vérification d'email et de reset de mot de passe (tokens + expirations), identifiants Stripe (`stripeCustomerId`, `stripeAccountId`), soft delete (`deletedAt`). Relations : un profil (`OneToOne`), plusieurs prompts vendus (`OneToMany`).

## entities/user-profile.entity.ts

Rôle : entité `user_profiles` (avatar, bio), liée en `OneToOne` à `User` (CASCADE) et en `OneToMany` à ses réseaux sociaux.

## entities/social-link.entity.ts

Rôle : entité `social_links` (plateforme + URL) rattachée à un profil, supprimée en cascade avec lui.
