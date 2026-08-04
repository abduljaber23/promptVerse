# 📐 Diagramme de Séquence UML — Achat via Stripe Checkout

## 🎯 Périmètre du Flux
Détail du parcours d'achat d'un prompt : sélection du prompt, création de la session Stripe Checkout sur le backend NestJS, redirection vers la page de paiement sécurisée Stripe, puis réception asynchrone du webhook Stripe confirmant le paiement et débloquant l'accès au prompt.

---

## 📊 Diagramme Mermaid — Séquence Achat

```mermaid
sequenceDiagram
    autonumber
    actor Acheteur as Acheteur - React App
    participant OrdersController as OrdersController
    participant StripeService as StripeService
    participant StripeAPI as Stripe Checkout API
    participant WebhookController as WebhookController
    participant OrdersRepository as OrdersRepository
    participant DB as Database - MySQL

    Note over Acheteur, DB: 1. Initialisation de la commande (POST /orders/checkout)
    Acheteur->>OrdersController: POST /orders/checkout { promptIds }
    OrdersController->>OrdersRepository: createOrder({ buyerId, status: PENDING })
    OrdersRepository->>DB: INSERT INTO order ...
    DB-->>OrdersRepository: Order Object (ID: 101)

    OrdersController->>StripeService: createCheckoutSession(order)
    StripeService->>StripeAPI: POST /v1/checkout/sessions
    StripeAPI-->>StripeService: Session Object { id, url }
    StripeService-->>OrdersController: Session URL & ID
    OrdersController-->>Acheteur: 201 Created { checkoutUrl }

    Note over Acheteur, StripeAPI: 2. Paiement par carte sur Stripe Checkout
    Acheteur->>StripeAPI: Redirection -> Saisie Carte + Validation
    StripeAPI-->>Acheteur: Redirection vers SuccessUrl

    Note over StripeAPI, DB: 3. Traitement Asynchrone du Webhook Stripe
    StripeAPI->>WebhookController: POST /stripe/webhook (checkout.session.completed)
    WebhookController->>StripeService: verifyWebhookSignature(payload, signature)
    StripeService-->>WebhookController: Event Verified

    WebhookController->>OrdersRepository: findOneWithItems(orderId: 101)
    OrdersRepository->>DB: SELECT * FROM order WHERE id = 101
    DB-->>OrdersRepository: Order record
    
    WebhookController->>OrdersRepository: update(orderId: 101, { status: PAID })
    OrdersRepository->>DB: UPDATE order SET status = PAID WHERE id = 101
    DB-->>OrdersRepository: Success

    Note over Acheteur, DB: 4. Consultation du prompt débloqué
    Acheteur->>OrdersController: GET /prompts/12/content
    OrdersController->>DB: CHECK ORDER STATUS = PAID
    DB-->>OrdersController: TRUE
    OrdersController-->>Acheteur: 200 OK { promptContent }
```
