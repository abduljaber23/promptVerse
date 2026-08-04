# 🏃 Sprint 4 — Intégration Stripe, Cache Redis & Stockage S3/MinIO

## 📌 Présentation du Sprint
- **Projet** : **PromptVerse**
- **Modalité** : **Projet Solo CDA**
- **Durée** : 7 Jours

---

## 🎯 Objectifs du Sprint
Mettre en œuvre les fonctionnalités complexes de monétisation, de mise en cache et de gestion des médias.

1. **Paiements Stripe Checkout** : Création de la session d'achat et Webhook asynchrone pour passer la commande à `PAID` et débloquer `promptContent`.
2. **Reversements Stripe Connect** : Onboarding des vendeurs et création de versements (`Payouts`).
3. **Optimisation Redis** : Cache des routes catalogue pendant 5 minutes.
4. **Stockage S3 / MinIO** : Upload des images de démonstration `PreviewImage`.

---

## 📋 Tâches & Proposals OpenSpec
- Proposals associées : `PROP-04` (`04-stripe-checkout-purchases`), `PROP-05` (`05-stripe-connect-payouts`), `PROP-06` (`06-redis-caching-minio-storage`).

### Checklist d'Exécution :
- [ ] Route `POST /orders/checkout` (Session Stripe Checkout)
- [ ] Controller Webhook Stripe (`checkout.session.completed`)
- [ ] Module `PayoutsModule` pour Stripe Connect
- [ ] Interceptor de cache Redis sur `GET /prompts`
- [ ] Service `StorageService` pour l'upload d'images vers MinIO

---

## 🎓 Compétences CDA Validées
- **C1** : Intégrer des services tiers d'API REST (Stripe SDK, AWS S3 SDK).
- **C2** : Optimiser les performances de données avec une solution NoSQL / In-Memory (Redis).
