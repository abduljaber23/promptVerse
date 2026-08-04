# 📐 Diagramme de Séquence UML — Publication Directe d'un Prompt

## 🎯 Périmètre du Flux
Ce diagramme détaille la création et la publication immédiate d'un prompt par un utilisateur (`USER`), l'invalidation du cache Redis, et sa disponibilité instantanée dans le catalogue public.

---

## 📊 Diagramme Mermaid — Séquence Publication Directe

```mermaid
sequenceDiagram
    autonumber
    actor UserRole as USER - React App
    participant PromptsController as PromptsController
    participant PromptsService as PromptsService
    participant RedisCache as Redis Cache
    participant DB as Database - MySQL

    Note over UserRole, DB: 1. Création & Publication Directe d'un Prompt
    UserRole->>PromptsController: POST /prompts { title, description, promptContent, price, categoryId, aiToolId }
    PromptsController->>PromptsService: createPrompt(dto, userId)
    PromptsService->>DB: INSERT INTO prompt (status = PUBLISHED)
    DB-->>PromptsService: Prompt Entity (ID: 55, Status: PUBLISHED)
    
    PromptsService->>RedisCache: DEL catalog:prompts:* (Invalidation du cache)
    RedisCache-->>PromptsService: Cache Cleared

    PromptsService-->>PromptsController: Created Prompt (PUBLISHED)
    PromptsController-->>UserRole: 201 Created { id: 55, status: PUBLISHED, message: Prompt publié en ligne }
```
