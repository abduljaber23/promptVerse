# Fiches de code — api/src (racine)

## app.module.ts

Rôle : module racine NestJS, point d'assemblage de toute l'application.

Configure et expose :
- `ConfigModule` (variables d'environnement, validées par `envValidationSchema`)
- `JwtModule` (secret et durée de vie du token lus depuis la config)
- `TypeOrmModule` (connexion MySQL via `dataSourceOptions`)
- `ThrottlerModule` (3 paliers de rate limiting : short/medium/long)
- l'import de tous les modules métier (Users, Auth, Mail, Storage, AiTools, Categories, Prompts, Admin, Purchases, Health)
- 3 providers globaux : interceptor de sérialisation des classes, `AuthGuard` et `CustomThrottlerGuard` comme guards `APP_GUARD` (appliqués à toutes les routes par défaut)

Dépendances : tous les modules du dossier `modules/`, `common/config/env.validation.ts`, `database/data-source.ts`, `common/guards/*`.

## main.ts

Rôle : point d'entrée de l'application, bootstrap du serveur NestJS.

Fait :
- crée l'app avec `rawBody: true` (nécessaire pour vérifier la signature du webhook Stripe dans `purchases.controller.ts`)
- active `helmet` (sécurité des en-têtes HTTP) et `cookie-parser`
- lit la config (URL, port, préfixe API, environnement, CORS) via `ConfigService`
- active le versioning d'API par URI et la validation globale des DTO (`ValidationPipe`)
- configure Swagger (docs API) si activé par variable d'environnement
- démarre le serveur sur `0.0.0.0:PORT`

Dépendances : `AppModule`, `@nestjs/swagger`, `helmet`, `cookie-parser`.
