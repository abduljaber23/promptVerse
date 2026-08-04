## Why

Implement the nomenclature data models (Categories and AI Tools) necessary to categorize prompts in the marketplace, and display them on the frontend to allow users to navigate and filter the catalog.

## What Changes

- **Backend**: Create `Category` and `AiTool` entities.
- **Backend**: Create `CategoriesModule` and `AiToolsModule`.
- **Backend**: Implement `GET /categories` and `GET /ai-tools` public endpoints.
- **Frontend**: Create UI sections for "Browse by Category" and "Browse by AI Tool".
- **Frontend**: Integrate API calls to dynamically render nomenclature in the Navigation Menu and Home Page.

## Capabilities

### New Capabilities
- `nomenclature-management`: Read-only access to Categories and AI Tools for structuring the prompt catalog.

### Modified Capabilities
None.

## Impact

- **Backend**: Adds nomenclature tables and public API endpoints.
- **Frontend**: Populates layout menus and home page with dynamic data.
