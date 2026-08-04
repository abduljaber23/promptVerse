# 📚 Documentation Officielle — PromptVerse (CDA Solo)

Bienvenue dans la documentation officielle du projet chef-d'œuvre **PromptVerse** (Marketplace de Prompts IA), réalisée dans le cadre du diplôme **CDA** (*Concepteur Développeur d'Applications* - RNCP 37873).

---

## 🗂️ Sommaire & Arborescence Documentaire

### 📜 1. Spécifications & Cadrage
- 📄 [docs/cahier_des_charges.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/cahier_des_charges.md) — *Cahier des charges exhaustif (Contexte, 3 Rôles USER/ADMIN/SUPER_ADMIN, User Stories, RGPD, Sécurité).*
- 📄 [docs/maquettes_ux_ui.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/maquettes_ux_ui.md) — *Design System Dark Mode, Sitemap et Wireframes des 5 écrans principaux.*
- 📄 [docs/openspec.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/openspec.md) — *Guide Fission-AI OpenSpec (`@fission-ai/openspec`) et suivi des 8 proposals.*
- 📄 [docs/trello_backlog.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/trello_backlog.md) — *Backlog Agile Trello découpé par Sprints (Cards, Checklists, Gherkin & DoD).*

---

### 📐 2. Modélisation UML ([docs/uml/](file:///c:/FormationCDA/projet_final/PromptVerse/docs/uml/))
- 📄 [use-cases.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/uml/use-cases.md) — *Diagramme de cas d'utilisation UML (3 Rôles + Visiteur).*
- 📄 [class-diagram.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/uml/class-diagram.md) — *Diagramme de classes TypeORM & Enums.*
- 📄 [sequence-auth.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/uml/sequence-auth.md) — *Diagramme de séquence Authentification JWT (sans Passport, sans OAuth).*
- 📄 [sequence-prompt-purchase.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/uml/sequence-prompt-purchase.md) — *Diagramme de séquence Achat Stripe Checkout & Webhook.*
- 📄 [sequence-prompt-creation.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/uml/sequence-prompt-creation.md) — *Diagramme de séquence Publication Directe sans modération.*
- 📄 [component-architecture.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/uml/component-architecture.md) — *Diagramme d'architecture applicative & Ingress Nginx.*

---

### 🗄️ 3. Modélisation Merise & Base de Données ([docs/merise/](file:///c:/FormationCDA/projet_final/PromptVerse/docs/merise/))
- 📄 [mcd.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/merise/mcd.md) — *Modèle Conceptuel des Données (Entités, Associations 1:1, 1:N).*
- 📄 [mld.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/merise/mld.md) — *Modèle Logique des Données (Structure des tables et Clés Étrangères).*
- 📄 [mpd.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/merise/mpd.md) — *Script SQL DDL complet pour MySQL 8.0 (avec UUID, contraintes UNIQUE et Index).*
- 📄 [dictionnaire-de-donnees.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/merise/dictionnaire-de-donnees.md) — *Dictionnaire de données exhaustif.*

---

### 🏃 4. Découpage en Sprints CDA ([docs/sprints/](file:///c:/FormationCDA/projet_final/PromptVerse/docs/sprints/))
- 📄 [sprint-0-cadrage-initialisation.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/sprints/sprint-0-cadrage-initialisation.md) — *Cadrage & Initialisation du Projet PromptVerse.*
- 📄 [sprint-1-conception-architecture.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/sprints/sprint-1-conception-architecture.md) — *Conception UML, Modélisation Merise & Wireframes UX/UI.*
- 📄 [sprint-2-core-backend-frontend.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/sprints/sprint-2-core-backend-frontend.md) — *Core Backend NestJS & Authentification JWT.*
- 📄 [sprint-3-securite-qualite-tests.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/sprints/sprint-3-securite-qualite-tests.md) — *CRUD Prompts & Sécurisation de l'API.*
- 📄 [sprint-4-performance-fonctions-avancees.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/sprints/sprint-4-performance-fonctions-avancees.md) — *Intégration Stripe, Cache Redis & Stockage S3/MinIO.*
- 📄 [sprint-5-industrialisation-ci-cd-docker.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/sprints/sprint-5-industrialisation-ci-cd-docker.md) — *Frontend React (TypeScript) & Conteneurisation Docker.*
- 📄 [sprint-6-mise-en-production-fiabilisation.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/sprints/sprint-6-mise-en-production-fiabilisation.md) — *Reverse Proxy Nginx, Backup BDD & Pipeline CI/CD.*
- 📄 [sprint-7-finalisation-livraison.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/sprints/sprint-7-finalisation-livraison.md) — *Finalisation, Dossier de Projet & Soutenance CDA.*
