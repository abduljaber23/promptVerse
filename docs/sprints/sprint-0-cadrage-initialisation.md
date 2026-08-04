# 🏃 Sprint 0 — Cadrage & Initialisation du Projet PromptVerse

## 📌 Présentation du Sprint
- **Projet** : **PromptVerse** — Marketplace de Prompts IA (ChatGPT, Midjourney, DALL-E, Claude, etc.)
- **Diplôme** : Title Professionnel **CDA** (*Concepteur Développeur d'Applications* - RNCP 37873)
- **Modalité** : **Projet Solo**
- **Durée** : 4 Jours

---

## 🎯 Objectifs du Sprint
Ce sprint a pour objectif de poser les fondations fonctionnelles, techniques et organisationnelles du chef-d'œuvre **PromptVerse** selon la méthodologie **Spec-Driven Development**.

1. **Définition du Besoin Métier** : Clarifier la valeur ajoutée de la marketplace pour les acheteurs et les vendeurs de prompts.
2. **Choix de la Stack Technique** : Validée et adaptée au développement full stack multicouche.
3. **Cadrage des Rôles & Droits** : Structuration en 3 rôles (`USER`, `ADMIN`, `SUPER_ADMIN`).
4. **Organisation Agile** : Initialisation du repository Git et structuration des proposals OpenSpec.

---

## 🛠️ Stack Technique Retenue
- **Backend** : NestJS (TypeScript), TypeORM
- **Authentification** : Custom JWT + bcrypt (Natif NestJS, sans Passport, sans OAuth)
- **Base de Données** : MySQL 8.0
- **Cache & Performance** : Redis
- **Stockage Fichiers** : MinIO / S3
- **Paiements** : Stripe Checkout & Stripe Connect
- **Frontend** : React (TypeScript) + Vite + Tailwind CSS
- **Infra & DevOps** : Docker, Docker Compose, Nginx, GitHub Actions

---

## 📋 Tâches & Livrables du Sprint

### 1. Cahier des Charges & Analyse
- [x] Rédaction du Cahier des Charges dans [docs/cahier_des_charges.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/cahier_des_charges.md)
- [x] Spécification des User Stories avec critères d'acceptation Gherkin (*Given-When-Then*)
- [x] Validation de la publication directe des prompts (`PUBLISHED`)

### 2. Organisation & Tooling
- [x] Initialisation du repository Git
- [x] Rédaction du guide OpenSpec dans [docs/openspec.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/openspec.md)
- [x] Structuration du Backlog Trello dans [docs/trello_backlog.md](file:///c:/FormationCDA/projet_final/PromptVerse/docs/trello_backlog.md)

---

## 🎓 Compétences CDA Validées
- **C1** : Analyser les besoins et figer les spécifications fonctionnelles.
- **C2** : Définir l'architecture technique d'une application multicouche répartie.