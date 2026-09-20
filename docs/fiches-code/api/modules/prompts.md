# Fiches de code — api/src/modules/prompts

## prompts.controller.ts

Rôle : endpoints des prompts (`/api/v1/prompts`).

Expose : `GET` (liste paginée, publique), `GET me` (mes prompts, authentifié), `POST` (création avec upload `coverImage` + jusqu'à 10 `previewImages` via `FileFieldsInterceptor`), `GET :slug` (`@OptionalAuth()`, contenu payant masqué ou non selon l'acheteur), `GET category/:slug`, `GET ai-tool/:slug`.

## prompts.module.ts

Rôle : enregistre `Prompt` et `Purchase` dans TypeORM, configure Multer pour router `coverImage` vers `prompt-covers/` et `previewImages` vers `prompt-previews/` (8 Mo max, images uniquement), importe `UsersModule`/`CategoriesModule`/`AiToolsModule`/`StorageModule`.

## prompts.service.ts

Rôle : cœur métier du catalogue de prompts.
- `LIST_SELECT` : projection qui exclut volontairement `promptContent` des vues liste (contenu payant jamais exposé en liste)
- `findOneBySlug` : masque `promptContent` sauf pour le vendeur, un prompt gratuit, ou un acheteur ayant un achat `COMPLETED` (`hasCompletedPurchase`)
- `findAllByCategory`/`findAllByAiTool` : filtrent sur les prompts publiés
- `create` : vérifie catégorie/outil IA, génère un slug unique (titre + suffixe aléatoire), construit les clés de fichiers déjà écrits par Multer, et supprime les fichiers uploadés si la création en base échoue (rollback manuel)
- `findByIdForPurchase`, `incrementSalesCount` : utilisés par `PurchasesService`

## prompts.service.spec.ts

Rôle : tests unitaires Jest de `findOneBySlug`, vérifie précisément le masquage/dévoilement du contenu payant (anonyme, connecté non-acheteur, vendeur, acheteur avec achat validé, prompt gratuit).

## dto/create-prompt.dto.ts

Rôle : DTO de création (titre, contenu, prix borné 0-99.99 avec 2 décimales, UUID catégorie/outil IA, fichiers image en multipart).

## entities/prompt.entity.ts

Rôle : entité `prompts`. Relations `ManyToOne` en `RESTRICT` vers vendeur/catégorie/outil IA (empêchent leur suppression tant qu'un prompt existe), `OneToMany` en `CASCADE` vers ses images de preview.

## entities/preview-image.entity.ts

Rôle : entité `preview_images` (URL, ordre d'affichage), supprimée en cascade avec son prompt.
