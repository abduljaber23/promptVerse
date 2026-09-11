# 🎓 Oral CDA — Module Paiement (Stripe Checkout)

> **Fichiers de référence du module :**
> - 📄 [purchases.service.ts](../../apps/api/src/modules/purchases/purchases.service.ts)
> - 📄 [purchases.controller.ts](../../apps/api/src/modules/purchases/purchases.controller.ts)
> - 📄 [purchase.entity.ts](../../apps/api/src/modules/purchases/entities/purchase.entity.ts)
> - 📄 [stripe.service.ts](../../apps/api/src/modules/stripe/stripe.service.ts)
> - 📄 [prompts.service.ts](../../apps/api/src/modules/prompts/prompts.service.ts) (verrouillage du contenu)
> - 📄 [auth.guard.ts](../../apps/api/src/common/guards/auth.guard.ts) (`@OptionalAuth()`)
> - 📄 [PromptDetailPage.tsx](../../apps/client/src/pages/PromptDetailPage.tsx) (bouton "Acheter" côté client)

---

### Q1 : Pourquoi avoir choisi Stripe Checkout Session plutôt que Stripe Elements ?

* **Explication simple :** Checkout Session redirige l'acheteur vers une page de paiement **hébergée par Stripe** (formulaire de carte inclus), au lieu d'intégrer un formulaire de carte directement dans l'app. Stripe gère seul la conformité PCI-DSS, la 3D Secure, et les moyens de paiement locaux — je n'ai jamais accès aux données de carte.
* **Dans votre code :** `PurchasesService.createCheckoutSession()` appelle `stripeService.createCheckoutSession({ mode: 'payment', line_items: [...], success_url, cancel_url })`, puis renvoie juste `{ url }` au frontend qui fait `window.location.href = url`.
* **🗣️ À dire à l'oral :** *"J'ai opté pour Stripe Checkout plutôt que Stripe Elements pour livrer un paiement fonctionnel et sécurisé sans avoir à gérer moi-même la conformité PCI-DSS : Stripe héberge la totalité du formulaire de carte, mon backend ne fait que créer la session et attendre la confirmation par webhook."*

---

### Q2 : Comment le prix est-il transmis à Stripe, sachant que l'API attend des centimes ?

* **Explication simple :** Le prix est stocké en base en euros (`decimal(10,2)`, ex. `"9.99"`), mais l'API Stripe attend un entier en centimes (`999`). Une conversion est donc indispensable avant chaque appel.
* **Dans votre code :** `PurchasesService.eurosToCents(price)` fait `Math.round(parseFloat(price) * 100)`, centralisé en une seule méthode statique pour éviter toute divergence d'arrondi entre deux appels.
* **🗣️ À dire à l'oral :** *"Stripe manipule des montants en centimes pour éviter les erreurs de virgule flottante sur l'argent. J'ai isolé cette conversion euros→centimes dans une seule fonction utilitaire, appelée au moment de construire la session de paiement."*

---

### Q3 : Quelle faille de sécurité avez-vous trouvée et corrigée en construisant cette fonctionnalité ?

* **Explication simple :** Avant ce chantier, `GET /prompts/:slug` — une route **publique**, accessible sans être connecté — renvoyait le prompt entier, y compris `promptContent` (le texte exact vendu). N'importe qui pouvait donc lire gratuitement le contenu payant de n'importe quel prompt.
* **Dans votre code :** `PromptsService.findOneBySlug()` renvoie maintenant `{ ...prompt, promptContent: isOwner || hasPurchased ? prompt.promptContent : null, isPurchasedByCurrentUser }`. Les vues liste (`findAll`, `findAllByCategory`, `findAllByAiTool`) excluent carrément la colonne via un `select: LIST_SELECT` au niveau de la requête SQL — le champ ne sort jamais de la base pour ces routes.
* **🗣️ À dire à l'oral :** *"En implémentant le paiement, j'ai découvert que le contenu payant fuitait déjà en clair sur les routes publiques. J'ai corrigé ça à deux niveaux : les listes n'incluent plus jamais `promptContent` dans la requête SQL elle-même, et la fiche détail ne le renvoie qu'au propriétaire du prompt ou à un acheteur ayant un achat confirmé."*

---

### Q4 : Comment savoir si le visiteur est connecté sur une route publique, sans casser l'accès anonyme ?

* **Explication simple :** Le garde d'authentification global (`AuthGuard`) ne connaissait que deux modes : `@Public()` (aucune vérification) ou protégé (401 si pas de cookie). Ni l'un ni l'autre ne convient pour `GET /prompts/:slug` : elle doit rester accessible à tous, mais doit quand même savoir "qui" demande pour décider d'afficher le contenu.
* **Dans votre code :** Nouveau décorateur `@OptionalAuth()` : si le cookie est absent ou invalide, `AuthGuard` laisse passer la requête sans lever d'exception (`request.user` reste `undefined`) ; s'il est valide, il le décode normalement, exactement comme une route protégée classique.
* **🗣️ À dire à l'oral :** *"J'ai ajouté un troisième mode d'authentification, intermédiaire entre public et protégé : `@OptionalAuth()`. Il tente de décoder le cookie s'il existe, mais ne bloque jamais la requête s'il est absent — indispensable pour qu'une même route publique adapte sa réponse selon qu'un acheteur est connecté ou non."*

---

### Q5 : Comment le webhook Stripe est-il sécurisé — n'importe qui pourrait appeler cette route et se déclarer "payé" ?

* **Explication simple :** `POST /purchases/webhook` est forcément publique (Stripe n'a pas notre cookie de session), donc la sécurité ne repose pas sur l'authentification mais sur la **signature cryptographique** du corps de la requête, calculée par Stripe avec un secret partagé (`STRIPE_WEBHOOK_SECRET`) que seul Stripe et mon serveur connaissent.
* **Dans votre code :** `main.ts` démarre Nest avec `{ rawBody: true }` pour conserver le `Buffer` brut de la requête (`req.rawBody`) — la signature de Stripe est calculée sur les octets exacts envoyés, pas sur du JSON re-sérialisé. `StripeService.constructWebhookEvent()` appelle `stripe.webhooks.constructEvent(rawBody, signature, secret)`, qui lève une erreur si la signature ne correspond pas.
* **🗣️ À dire à l'oral :** *"Le webhook est une route publique par nature, mais chaque appel est vérifié via la signature HMAC que Stripe calcule sur le corps brut de la requête. J'ai dû activer `rawBody: true` au démarrage de Nest pour garder ce Buffer intact, sinon le parsing JSON automatique aurait invalidé la vérification de signature."*

---

### Q6 : Stripe peut renvoyer plusieurs fois le même événement (retries) — comment évitez-vous de créditer deux fois le vendeur ?

* **Explication simple :** Stripe garantit une livraison "au moins une fois", pas "exactement une fois" — le même événement `checkout.session.completed` peut donc arriver deux fois. Sans protection, le solde du vendeur serait crédité en double.
* **Dans votre code :** `PurchasesService.completePurchase()` vérifie l'état actuel de la ligne `Purchase` en base avant d'agir : si elle est déjà `COMPLETED`, la méthode s'arrête immédiatement (`no-op`) sans re-créditer le solde ni ré-incrémenter `salesCount`.
* **🗣️ À dire à l'oral :** *"L'idempotence repose sur l'état stocké en base plutôt que sur un registre d'identifiants d'événements déjà vus : si l'achat est déjà marqué `COMPLETED`, tout traitement supplémentaire du même webhook est ignoré. C'est plus simple à maintenir et ça couvre nativement les retries de Stripe."*

---

### Q7 : Comment le vendeur récupère-t-il l'argent de ses ventes ?

* **Explication simple :** Pour cette version, il n'y a pas de vrai virement bancaire automatique (pas de Stripe Connect) : chaque vente confirmée crédite un simple compteur interne, `user.balance`, pour la totalité du prix (0% de commission plateforme). Le retrait réel serait géré manuellement dans une itération future.
* **Dans votre code :** Dans `completePurchase()`, `seller.balance = Number(seller.balance) + Number(purchase.amount)` puis `usersService.save(seller)`. Le champ `balance` est exposé au vendeur lui-même via `GET /users/me` (`UsersService.safeUserResponse()`).
* **🗣️ À dire à l'oral :** *"J'ai volontairement limité le scope à un solde interne plutôt que d'intégrer Stripe Connect : Connect demande un onboarding complet du vendeur (KYC, compte bancaire vérifié par Stripe) qui sort du périmètre raisonnable pour cette version. Les colonnes `stripeAccountId`/`stripeOnboardingComplete` existent déjà en base pour préparer cette évolution."*

---

### Q8 : Que se passe-t-il quand un vendeur publie un prompt à 0 € ?

* **Explication simple :** Un prompt gratuit ne doit jamais passer par Stripe — ni Checkout Session, ni webhook. Il est marqué **"Gratuit"** et son contenu est débloqué directement à la lecture, pour tout le monde, sans achat ni même être connecté.
* **Dans votre code :** `PromptsService.isFree(price)` (`Number.parseFloat(price) === 0`) est utilisée dans `findOneBySlug()` pour inclure `isFree` dans la condition `canViewFullContent`, en plus de `isOwner`/`hasPurchased`. En garde-fou côté serveur, `PurchasesService.createCheckoutSession()` rejette explicitement (`ErrorCodes.PROMPT_IS_FREE`) toute tentative de créer une session Stripe pour un prompt gratuit. Côté frontend, `formatPromptPrice()` affiche "Gratuit" au lieu de "0,00 €", et le bouton "Acheter" de `PromptDetailPage` est remplacé par un badge "Prompt gratuit — débloqué".
* **🗣️ À dire à l'oral :** *"J'ai traité le prix à 0 comme un cas à part entière plutôt qu'un simple achat à prix nul : le contenu est débloqué directement côté lecture, sans jamais solliciter Stripe. Le backend refuse même explicitement de créer une session de paiement pour un prompt gratuit, en défense en profondeur si le frontend l'appelait par erreur."*

---

### Q9 : Comment avez-vous testé cette logique sans faire de vrais paiements à chaque fois ?

* **Explication simple :** Deux niveaux de test : des tests unitaires Jest qui mockent le repository et les services externes (Stripe, base de données), et une vérification manuelle de bout en bout avec le **Stripe CLI** (`stripe listen`) qui forwarde les vrais événements Stripe vers l'API en local, avec des cartes de test (`4242 4242 4242 4242`).
* **Dans votre code :** [purchases.service.spec.ts](../../apps/api/src/modules/purchases/purchases.service.spec.ts) (rejet auto-achat, rejet doublon, réutilisation d'une tentative `PENDING`, idempotence du webhook, signature invalide) et [prompts.service.spec.ts](../../apps/api/src/modules/prompts/prompts.service.spec.ts) (verrouillage du contenu selon le statut de l'utilisateur).
* **🗣️ À dire à l'oral :** *"J'ai écrit des tests unitaires ciblés sur les points à risque — l'idempotence du webhook et le verrouillage du contenu — avec des repositories mockés à la main, sans base de données réelle. Pour le parcours complet, j'ai utilisé le Stripe CLI en local pour recevoir de vrais webhooks de test avant tout déploiement."*
