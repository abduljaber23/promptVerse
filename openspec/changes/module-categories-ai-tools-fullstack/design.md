## Context

The PromptVerse catalog is structured around two main axes: the type of task (Categories like Marketing, Coding) and the AI engine used (AI Tools like ChatGPT, Midjourney). These are static or semi-static nomenclatures managed by admins, but publicly readable by all users.

## Goals / Non-Goals

**Goals:**
- Provide read-only API access to categories and AI tools.
- Display these nomenclatures dynamically in the React frontend.

**Non-Goals:**
- Admin CRUD interface for managing categories and AI tools (deferred or out of scope for the MVP).

## Decisions

1. **Caching**: We will not implement Redis caching *yet* for these endpoints to keep this module simple, but it is planned for a future optimization phase.
2. **Data Structure**: `AiTool` needs an `iconUrl` field to display beautiful logos on the frontend. `Category` needs a `slug` for SEO-friendly URLs.

## Risks / Trade-offs

- **Risk**: Empty nomenclatures on startup.
  - *Mitigation*: We will provide a TypeORM seeder or a raw SQL script to populate the database with initial categories and tools during initialization.
