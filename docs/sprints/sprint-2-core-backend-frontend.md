# 🏃 Sprint 2 — Core Backend NestJS & Authentification JWT

## 📌 Présentation du Sprint
- **Projet** : **PromptVerse**
- **Modalité** : **Projet Solo CDA**
- **Durée** : 6 Jours

---

## 🎯 Objectifs du Sprint
Initialiser l'environnement de développement et construire la première version exploitable de l'API REST NestJS.

1. **Configuration Dev Local** : Démarrage des conteneurs via `docker-compose.yml` (MySQL 8, Redis, MinIO, Mailpit).
2. **Entités TypeORM** : Mappings objet-relationnel pour `User`, `UserProfile`, `SocialLink`, `Prompt`, `Category`, `AiTool`.
3. **Authentification JWT Natif** : Inscription avec hachage bcrypt, login retournant un accessToken JWT, verification email et reset password.

---

## 📋 Tâches & Proposals OpenSpec
- Proposal associées : `PROP-01` (`01-core-entities-database`) et `PROP-02` (`02-custom-jwt-auth-users`).

### Checklist d'Exécution :
- [ ] Démarrer les services locaux avec `docker-compose up -d`
- [ ] Créer la structure `apps/api` (NestJS)
- [ ] Implémenter le module `AuthModule` et `UsersModule`
- [ ] Développer `bcrypt` hashing + `AuthGuard` natif NestJS
- [ ] Développer le décorateur `@CurrentUser()` et le guard `RolesGuard`

---

## 🎓 Compétences CDA Validées
- **C1** : Développer les composants d'accès aux données avec un ORM (TypeORM).
- **C1** : Développer la partie backend d'une application web (NestJS API REST).
