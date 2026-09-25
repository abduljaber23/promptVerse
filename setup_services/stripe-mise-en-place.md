# Mise en place de Stripe — étape par étape

Paiement **unique par prompt** avec **Stripe Checkout** (page de paiement hébergée par Stripe).
Pas de Stripe Connect : l'argent arrive sur le compte de la plateforme, et le solde du vendeur (`users.balance`) est crédité en base.

---

## Étape 1 — Créer le compte Stripe et récupérer les clés

1. Créer un compte sur [dashboard.stripe.com](https://dashboard.stripe.com) et rester en **mode test**.
2. Récupérer la **clé secrète** (`sk_test_...`) dans *Développeurs → Clés API*.
3. Les ajouter au `.env` :

```env
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx   # obtenu à l'étape 7
CLIENT_URL=http://localhost:8080  # pour les URLs de retour
```

4. Les valider au démarrage dans `apps/api/src/common/config/env.validation.ts` (Joi) : l'API refuse de démarrer si une clé manque.

```ts
STRIPE_SECRET_KEY: Joi.string().pattern(/^sk_/).required(),
STRIPE_WEBHOOK_SECRET: Joi.string().required(),
```

---

## Étape 2 — Installer le SDK

```bash
cd apps/api
npm install stripe
```

---

## Étape 3 — Créer un module `StripeModule`

`apps/api/src/modules/stripe/` : un petit service qui encapsule le client Stripe, pour ne pas appeler le SDK partout.

- `stripe.service.ts` :
  - crée le client avec `STRIPE_SECRET_KEY` ;
  - `createCheckoutSession(params)` → crée une session de paiement ;
  - `constructWebhookEvent(payload, signature)` → vérifie la signature d'un webhook avec `STRIPE_WEBHOOK_SECRET`.
- `stripe.module.ts` : exporte `StripeService` pour que d'autres modules l'utilisent.

---

## Étape 4 — Créer l'entité `Purchase` (table `purchases`)

`apps/api/src/modules/purchases/entities/purchase.entity.ts` :

| Colonne | Rôle |
|---|---|
| `buyerId`, `promptId`, `sellerId` | qui achète quoi à qui |
| `amount` | prix **copié** au moment de l'achat (ne change pas si le vendeur modifie le prix) |
| `stripeCheckoutSessionId` (unique) | lien entre notre achat et la session Stripe |
| `stripePaymentIntentId` | référence du paiement Stripe, rempli une fois payé |
| `status` | `PENDING` → `COMPLETED` ou `FAILED` |

Puis générer et lancer la migration (`1789130533107-purchases-entities.ts`).

---

## Étape 5 — Route de création de la session : `POST /api/v1/purchases/checkout-session`

Dans `PurchasesService.createCheckoutSession(buyerId, promptId)` :

1. Récupérer le prompt (doit exister et être publié).
2. Vérifications :
   - prompt gratuit → refus (`PROMPT_IS_FREE`) ;
   - l'acheteur est le vendeur → refus (`CANNOT_PURCHASE_OWN_PROMPT`) ;
   - déjà acheté → refus (`PROMPT_ALREADY_PURCHASED`).
3. Créer un `Purchase` en `PENDING` (ou réutiliser celui qui existe déjà si l'utilisateur avait abandonné).
4. Créer la session Stripe :

```ts
mode: 'payment',
line_items: [{
  quantity: 1,
  price_data: {
    currency: 'eur',
    unit_amount: eurosToCents(prompt.price), // Stripe veut des centimes
    product_data: { name: prompt.title },
  },
}],
success_url: `${clientUrl}/purchases/success?session_id={CHECKOUT_SESSION_ID}`,
cancel_url:  `${clientUrl}/prompts/${prompt.slug}`,
metadata: { buyerId, promptId, purchaseId },
```

5. Enregistrer `session.id` dans `purchase.stripeCheckoutSessionId`.
6. Renvoyer `{ url: session.url }` au front.

---

## Étape 6 — Garder le corps brut de la requête (pour le webhook)

Stripe signe le corps **exact** de la requête. Si NestJS le parse en JSON puis le re-sérialise, la signature ne correspond plus.
Dans `apps/api/src/main.ts` :

```ts
const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  rawBody: true, // expose req.rawBody (Buffer)
});
```

---

## Étape 7 — Route webhook : `POST /api/v1/purchases/webhook`

C'est **Stripe** qui appelle cette route pour dire « le paiement est fait ». On ne fait jamais confiance au retour du navigateur.

Dans `purchases.controller.ts` :
- `@Public()` : Stripe n'a pas notre cookie JWT → la sécurité vient de la **signature** ;
- `@SkipThrottle()` : Stripe ne doit jamais recevoir de 429 ;
- lit `req.rawBody` + l'en-tête `stripe-signature`, renvoie toujours `200 { received: true }`.

Dans `PurchasesService.handleWebhookEvent()` :
1. `constructWebhookEvent()` → si signature invalide : `400`.
2. Selon le type d'événement :
   - `checkout.session.completed` → `completePurchase()` :
     - retrouve le `Purchase` par `stripeCheckoutSessionId` ;
     - **idempotence** : s'il est déjà `COMPLETED`, on s'arrête (Stripe peut renvoyer le même événement) ;
     - passe en `COMPLETED`, enregistre le `payment_intent` ;
     - incrémente `salesCount` du prompt ;
     - crédite le `balance` du vendeur.
   - `checkout.session.expired` → `failPurchase()` : `PENDING` → `FAILED`.
   - autres types : ignorés (mais 200 quand même).

**Obtenir le `STRIPE_WEBHOOK_SECRET` :**
- En local, avec la Stripe CLI :
  ```bash
  stripe login
  stripe listen --forward-to localhost:3000/api/v1/purchases/webhook
  # affiche un whsec_... à mettre dans .env
  ```
- En prod : *Dashboard → Développeurs → Webhooks → Ajouter un endpoint* sur
  `https://promptverse.biz/api/v1/purchases/webhook`, avec les événements
  `checkout.session.completed` et `checkout.session.expired`, puis copier le `whsec_...` dans le `.env` du serveur.

---

## Étape 8 — Débloquer le contenu du prompt après achat

Dans `PromptsService.findOneBySlug()` (route `GET /prompts/:slug` avec `@OptionalAuth()` : accessible connecté ou non) :

```ts
const canViewFullContent = isOwner || isFree || hasPurchased;
return {
  ...prompt,
  promptContent: canViewFullContent ? prompt.promptContent : null,
  isPurchasedByCurrentUser: hasPurchased,
};
```

- `hasPurchased` = existe-t-il un `Purchase` `COMPLETED` pour cet utilisateur et ce prompt.
- Les routes de liste (catalogue) n'envoient **jamais** `promptContent` (`LIST_SELECT`).

---

## Étape 9 — Routes de lecture pour le front

- `GET /purchases/mine` → mes achats `COMPLETED` (page « Mes achats »).
- `GET /purchases/by-session/:sessionId` → l'achat lié à une session (page de succès), filtré par `buyerId`.

---

## Étape 10 — Front React

1. **API** — `apps/client/src/common/api/purchases.api.ts` : `createCheckoutSession`, `listMine`, `getBySessionId`.
2. **Hooks TanStack Query** — `apps/client/src/hooks/usePurchases.ts` :
   - `useCreateCheckoutSession()` (mutation) ;
   - `useMyPurchases()` ;
   - `usePurchaseBySessionId()` : **re-interroge toutes les 2 s** tant que le statut est `PENDING` (le webhook peut arriver quelques secondes après la redirection).
3. **Bouton « Acheter »** — `PromptDetailPage.tsx` :
   - non connecté → redirection vers `/login` ;
   - sinon appelle la mutation puis `window.location.href = url` (redirection vers Stripe) ;
   - si l'utilisateur a accès (propriétaire / gratuit / acheté), le contenu est affiché au lieu du bouton.
4. **Page de retour** — `PurchaseSuccessPage.tsx` (route `/purchases/success?session_id=...`) :
   - `PENDING` → « Traitement du paiement… » (timeout de 15 s avec bouton « Vérifier à nouveau ») ;
   - `COMPLETED` → « Paiement confirmé ! » + lien vers le prompt ;
   - `FAILED` → message d'erreur + retour au prompt.
5. **Page « Mes achats »** — `pages/dashboard/MyPurchasesPage.tsx`.

---

## Étape 11 — Tester

1. Lancer l'app + `stripe listen --forward-to ...` (étape 7).
2. Acheter un prompt payant avec la carte de test **`4242 4242 4242 4242`**, date future, CVC quelconque.
3. Vérifier : redirection vers la page de succès → statut `COMPLETED` en base → contenu du prompt visible → `salesCount` et `balance` du vendeur incrémentés.
4. Tests unitaires : `apps/api/src/modules/purchases/purchases.service.spec.ts`.

---

## Résumé du flux

```
Acheteur clique "Acheter"
  → POST /purchases/checkout-session   (Purchase PENDING créé)
  → redirection vers la page Stripe
  → paiement par carte
  → Stripe redirige vers /purchases/success?session_id=...   (le front poll)
  → Stripe appelle POST /purchases/webhook (signé)
      → Purchase COMPLETED, salesCount +1, balance vendeur +montant
  → le front voit COMPLETED → contenu du prompt débloqué
```
