# Fiches de code — api/src/common

## config/env.validation.ts

Rôle : schéma Joi qui valide toutes les variables d'environnement au démarrage (serveur, base de données, JWT, URLs, Stripe, SMTP, Swagger). Utilisé par `ConfigModule.forRoot()` dans `app.module.ts` ; l'app refuse de démarrer si une variable requise manque ou est mal formée.

## constants/constants.ts

Rôle : constantes partagées (clé de stockage de l'utilisateur courant sur la requête, clés de métadonnées `isPublic`/`isOptionalAuth`, dossier d'upload des avatars). Utilisées par les decorators et les guards.

## decorators/current-user.decorator.ts

Rôle : decorator de paramètre `@CurrentUser()` qui extrait le payload JWT (posé par `AuthGuard`) de la requête pour l'injecter directement dans un controller.

## decorators/optional-auth.decorator.ts

Rôle : decorator `@OptionalAuth()`, marque une route publique où `AuthGuard` tente quand même de décoder le cookie s'il existe (sans lever d'erreur s'il est absent ou invalide). Sert par exemple à savoir si le visiteur d'une page publique est l'acheteur d'un contenu payant.

## decorators/optional-current-user.decorator.ts

Rôle : équivalent de `@CurrentUser()` mais typé `| undefined`, à utiliser avec `@OptionalAuth()` sur les routes où l'utilisateur peut ne pas être connecté.

## decorators/public.decorator.ts

Rôle : decorator `@Public()`, exempte une route de `AuthGuard` (aucune vérification de token).

## decorators/roles.decorator.ts

Rôle : decorator `@Roles(...)`, pose la métadonnée des rôles autorisés sur une route, lue ensuite par `AuthRolesGuard`.

## enums/prompt.enum.ts, purchase.enum.ts, storage-folder.enum.ts, user.enum.ts

Rôle : enums et types partagés dans tout le projet.
- `PromptStatus` (PUBLISHED/ARCHIVED)
- `PurchaseStatus` (PENDING/COMPLETED/FAILED)
- `StorageFolder` (avatars, icons, prompt-covers, prompt-previews)
- `UserStatus`, `UserRoles` (USER/ADMIN/SUPER_ADMIN), `SocialPlatform`, et les types `jwtPayloadType` / `AccessTokenType` utilisés par l'auth JWT.

## errors/error-codes.ts

Rôle : dictionnaire centralisé de tous les codes d'erreur métier de l'API (auth, users, storage, mail, ai-tools, categories, prompts, purchases), renvoyés dans le corps des exceptions HTTP pour que le frontend affiche un message précis.

## guards/auth-roles.guard.ts

Rôle : guard qui vérifie que l'utilisateur courant a un des rôles requis par `@Roles(...)` sur la route ; laisse passer si aucun rôle n'est exigé, sinon lève une 403 (`ACCESS_DENIED`) si le rôle ne correspond pas.

## guards/auth.guard.ts

Rôle : guard global (posé sur toute l'app via `APP_GUARD`) qui vérifie le cookie `access_token`, le décode avec `JwtService`, et pose l'utilisateur sur la requête. Respecte `@Public()` (aucune vérification) et `@OptionalAuth()` (pas d'erreur si le token est absent/invalide).

## guards/custom-throttler.guard.ts

Rôle : extension du `ThrottlerGuard` de NestJS qui suit le quota de requêtes par utilisateur connecté (via son id) plutôt que seulement par IP, avec un fallback IP + user-agent pour les visiteurs anonymes.

## interfaces/IExtendRequest.ts

Rôle : type `ExtendedRequest`, étend la `Request` d'Express pour typer le champ où l'utilisateur courant est stocké après authentification.
