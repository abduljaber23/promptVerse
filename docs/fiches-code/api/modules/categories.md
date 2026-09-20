# Fiches de code — api/src/modules/categories

## categories.controller.ts

Rôle : endpoints publics de consultation des catégories (`/api/v1/categories`). Expose `GET` (liste) et `GET :slug` (détail), tous deux `@Public()`.

## categories.module.ts

Rôle : enregistre l'entité `Category` dans TypeORM, déclare le controller et exporte `CategoriesService` (réutilisé par le module admin).

## categories.service.ts

Rôle : CRUD complet avec soft delete, logique identique à `AiToolsService` : création avec slug généré et contrôle d'unicité (nom/slug), distinction doublon actif vs archivé, mise à jour, suppression douce et restauration.

## dto/create-category.dto.ts, update-category.dto.ts

Rôle : DTO de création (nom requis) et de mise à jour (`PartialType`, champs optionnels).

## entities/category.entity.ts

Rôle : entité `categories` (nom et slug uniques, icône, soft delete), reliée en `OneToMany` aux prompts de cette catégorie.
