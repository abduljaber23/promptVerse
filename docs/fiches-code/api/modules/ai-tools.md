# Fiches de code — api/src/modules/ai-tools

## ai-tools.controller.ts

Rôle : endpoints publics de consultation des outils IA (`/api/v1/ai-tools`). Expose `GET` (liste) et `GET :slug` (détail), tous deux `@Public()`.

## ai-tools.module.ts

Rôle : enregistre l'entité `AiTool` dans TypeORM, déclare le controller et exporte `AiToolsService` (réutilisé par le module admin).

## ai-tools.service.ts

Rôle : CRUD complet avec soft delete.
- `create` : normalise le nom, génère un slug (`slugify`), refuse un doublon (409 différent si l'outil existe déjà vs s'il est archivé)
- `findAll`/`findAllArchived`/`findById`/`findBySlug`/`findOneBySlug` (404 si absent)
- `update` : revalide l'unicité nom/slug en excluant l'élément courant
- `remove`/`restore` : soft delete et restauration TypeORM (`softRemove`/`recover`)

## dto/create-ai-tool.dto.ts, update-ai-tool.dto.ts

Rôle : DTO de création (nom requis) et de mise à jour (`PartialType`, tous les champs optionnels).

## entities/ai-tool.entity.ts

Rôle : entité `ai_tools` (nom et slug uniques, icône, soft delete), reliée en `OneToMany` aux prompts qui l'utilisent.
