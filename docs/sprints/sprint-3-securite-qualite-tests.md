# 🏃 Sprint 3 — CRUD Prompts & Sécurisation de l'API

## 📌 Présentation du Sprint
- **Projet** : **PromptVerse**
- **Modalité** : **Projet Solo CDA**
- **Durée** : 6 Jours

---

## 🎯 Objectifs du Sprint
Développer le cœur de métier de la marketplace : la publication directe et la recherche de prompts, tout en renforçant la sécurité et les tests automatisés.

1. **CRUD Prompts (Publication Directe)** : Création par tout `USER` avec statut `PUBLISHED` immédiat.
2. **Consultation & Recherche** : API de recherche paginée avec filtres par catégorie et outil IA.
3. **Sécurisation & Qualité** : Masquage du champ `promptContent` pour les non-acheteurs, Throttler rate-limiting et tests unitaires Jest.

---

## 📋 Tâches & Proposals OpenSpec
- Proposal associée : `PROP-03` (`03-prompts-catalog-direct-publishing`).

### Checklist d'Exécution :
- [ ] Route `POST /prompts` (création & publication immédiate)
- [ ] Route `GET /prompts` (catalogue filtrable par `categoryId`, `aiToolId`, prix, mot-clé)
- [ ] Route `GET /prompts/:slug` (fiche publique avec masquage de `promptContent`)
- [ ] Configurer `Helmet` et NestJS `ThrottlerModule` (Rate-limiting)
- [ ] Rédiger la suite de tests unitaires Jest pour `PromptsService`

---

## 🎓 Compétences CDA Validées
- **C1** : Développer une application sécurisée contre les failles OWASP Top 10.
- **C1** : Écrire des tests unitaires et d'intégration automatisés.
