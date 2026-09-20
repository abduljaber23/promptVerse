# Fiches de code — api/src/modules/admin

## admin.module.ts

Rôle : regroupe les endpoints réservés aux admins. Importe `CategoriesModule` et `AiToolsModule` pour réutiliser leurs services, enregistre `User` dans TypeORM, déclare 3 controllers et le service `AdminUsersService`.

## controllers/admin-users.controller.ts

Rôle : gestion des utilisateurs côté admin (`/api/v1/admin/users`), protégé par `AuthRolesGuard` + `@Roles(ADMIN, SUPER_ADMIN)`.

Expose : `GET` (liste), `GET count`, `PATCH :userId/make-role` (réservé au `SUPER_ADMIN` via un `@Roles` plus restrictif sur cette seule route).

## controllers/admin-categories.controller.ts / admin-ai-tools.controller.ts

Rôle : CRUD admin pour les catégories et les outils IA (`/api/v1/admin/categories`, `/api/v1/admin/ai-tools`), même protection par rôle. Déléguent tout à `CategoriesService`/`AiToolsService` : liste des éléments archivés, création, restauration, mise à jour, suppression (douce).

## dto/update-role.dto.ts

Rôle : DTO validé par `@IsEnum(UserRoles)` pour le changement de rôle d'un utilisateur.

## services/admin-users.service.ts

Rôle : logique d'administration des utilisateurs : liste, comptage, et `makeRole` (normalise la casse du rôle reçu, vérifie qu'il existe dans l'enum `UserRoles`, sinon 400 ; 404 si l'utilisateur n'existe pas).

## services/admin-users.service.spec.ts

Rôle : tests unitaires Jest de `makeRole` avec un repository TypeORM mocké : utilisateur introuvable (404), rôle invalide (400), rôle valide normalisé et sauvegardé.
