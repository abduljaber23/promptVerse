# Fiches de code — api/src/database

## data-source.ts

Rôle : configuration TypeORM (`DataSourceOptions`) partagée entre l'application NestJS et la CLI de migrations. Type MySQL, timezone UTC (`Z`), lit les identifiants de connexion depuis les variables d'environnement, pointe vers les entités et migrations compilées (`dist/`).

Dépendances : `typeorm`, `dotenv` ; utilisé par `app.module.ts` (`TypeOrmModule.forRoot`) et par la commande CLI `typeorm migration:run`.

## migrations/1785957492238-users-entities.ts

Rôle : première migration, crée les tables `users`, `user_profiles`, `social_links` et leurs clés étrangères (profil et réseaux sociaux en CASCADE, supprimés avec l'utilisateur).

## migrations/1786310926521-ai-tools-entitie.ts

Rôle : crée la table `ai_tools` (nom, slug, icône), avec unicité sur `name` et `slug`.

## migrations/1786314023782-categories-entitie.ts

Rôle : crée la table `categories`, même structure que `ai_tools`.

## migrations/1786318727869-prompts-entities.ts

Rôle : crée les tables `prompts` et `preview_images`. Relie un prompt à son vendeur (`sellerId`), sa catégorie et son outil IA en `RESTRICT` (interdit de supprimer une catégorie/outil/utilisateur tant que des prompts y sont liés), et ses images de preview en `CASCADE` (supprimées avec le prompt).

## migrations/1789130533107-purchases-entities.ts

Rôle : crée la table `purchases` (achats), liée à l'acheteur et au prompt en `RESTRICT`, avec les identifiants Stripe (session de checkout, payment intent) et un statut (PENDING/COMPLETED/FAILED).
