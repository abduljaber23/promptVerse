# 🏃 Sprint 6 — Reverse Proxy Nginx, Backup BDD & Pipeline CI/CD

## 📌 Présentation du Sprint
- **Projet** : **PromptVerse**
- **Modalité** : **Projet Solo CDA**
- **Durée** : 5 Jours

---

## 🎯 Objectifs du Sprint
Finaliser la couche d'infrastructure, automatiser la sauvegarde de la base de données et mettre en place l'intégration continue.

1. **Reverse Proxy Nginx** : Routage des requêtes web (`/` vers React) et API (`/api` vers NestJS) sur les ports 80/443 avec SSL/TLS.
2. **Sauvegarde Base de Données** : Écriture et automatisation d'un script Bash/PowerShell pour la création de backups MySQL (`mysqldump`).
3. **Pipeline CI/CD GitHub Actions** : Automatisation du linting, des builds et des tests à chaque push Git.

---

## 📋 Tâches & Livrables du Sprint
- Proposal associée : `PROP-08` (`08-dockerization-ci-cd-nginx`).

### Checklist d'Exécution :
- [ ] Configurer `nginx.conf` pour le reverse proxy et le HTTPS
- [ ] Écrire le script de sauvegarde MySQL automatisé (dump `.sql` horodaté)
- [ ] Créer le fichier d'action GitHub `.github/workflows/ci.yml`
- [ ] Vérifier l'exécution verte du pipeline CI/CD

---

## 🎓 Compétences CDA Validées
- **C2** : Déployer et sécuriser une application web en environnement de production (Nginx).
- **C2** : Mettre en œuvre une stratégie de sauvegarde et de restauration de la base de données.
- **C2** : Automatiser l'intégration continue (CI/CD).
