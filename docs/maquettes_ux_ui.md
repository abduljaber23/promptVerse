# 🎨 Spécifications UX/UI & Wireframes — PromptVerse

## 1. Direction Artistique & Design System

PromptVerse adopte une esthétique **Dark Mode Premium** (style Instant Gaming / Vercel / PromptBase) avec des touches de dégradés néon (Violet / Cyan) et des effets de transparence (Glassmorphism).

### Palette de Couleurs (Tokens CSS)
- **Background Principal** : `#090D16` (Deep Dark Blue)
- **Background Surface / Cards** : `#121827` avec bordures subtiles `#1F293D`
- **Couleur Accent Primaire** : `linear-gradient(135deg, #7C3AED, #2563EB)` (Electric Violet / Blue)
- **Couleur Accent Secondaire** : `#10B981` (Emerald Green - pour les prix et statuts validés)
- **Texte Principal** : `#F9FAFB` (Pure White)
- **Texte Secondaire** : `#9CA3AF` (Muted Gray)

### Typographie
- **Police Principale** : Inter / Outfit (Google Fonts)
- **Police Code (Prompt Text)** : Fira Code / JetBrains Mono

---

## 2. Arborescence du Site (Sitemap)

```mermaid
graph TD
    Home["🏠 Page d'Accueil (/)"] --> Catalog["🔍 Catalogue (/prompts)"]
    Home --> Detail["📄 Fiche Prompt (/prompts/:slug)"]
    Home --> Auth["🔑 Connexion / Inscription (/login, /register)"]
    
    Catalog --> Detail
    Detail --> Cart["🛒 Panier & Stripe (/cart)"]
    
    Auth --> Dashboard["👤 Espace USER (/dashboard)"]
    Dashboard --> Purchases["📥 Mes Prompts Achetés (/dashboard/purchases)"]
    Dashboard --> MyPrompts["✍️ Mes Prompts en Vente (/dashboard/prompts)"]
    Dashboard --> CreatePrompt["➕ Vendre un Prompt (/prompts/create)"]
    Dashboard --> Payouts["💰 Mes Gains & Stripe Connect (/dashboard/payouts)"]
    
    Auth --> Admin["🛡️ Back-office Admin (/admin)"]
```

---

## 3. Wireframes Textuels & Écrans Principaux

### 🖥️ Écran 1 : Page d'Accueil (`/`)
```text
+-----------------------------------------------------------------------------------+
|  [LOGO PromptVerse]   Catalogue  Vendre  |   [🔍 Rechercher...]   (0)🛒  [Se Connecter] |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|    🚀 LES MEILLEURS PROMPTS IA POUR BOOSTERE VOTRE PRODUCTIVITÉ                  |
|    Achetez et vendez des prompts optimisés pour ChatGPT, Midjourney & Claude.     |
|                                                                                   |
|    [ 🔍 Rechercher un prompt (ex: SEO, Logo 3D...) ] [ Bouton Explorer ]           |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|  FILTRAGE RAPIDE PAR OUTIL IA :                                                   |
|  [🤖 ChatGPT]  [🎨 Midjourney]  [🖼️ DALL-E 3]  [🧠 Claude 3]  [⚡ Stable Diffusion] |
+-----------------------------------------------------------------------------------+
|  🔥 PROMPTS TENDANCES (POPULAIRES)                                               |
|  +-------------------+  +-------------------+  +-------------------+              |
|  | [Image Preview]   |  | [Image Preview]   |  | [Image Preview]   |              |
|  | 🤖 ChatGPT        |  | 🎨 Midjourney     |  | 🧠 Claude 3       |              |
|  | Expert SEO 2026   |  | Logos 3D Néon     |  | Copywriting Mail  |              |
|  | ⭐ 4.9 (120)      |  | ⭐ 5.0 (85)       |  | ⭐ 4.8 (42)       |              |
|  | 4.99 €  [Ajouter] |  | 6.99 €  [Ajouter] |  | 3.49 €  [Ajouter] |              |
|  +-------------------+  +-------------------+  +-------------------+              |
+-----------------------------------------------------------------------------------+
```

---

### 🖥️ Écran 2 : Catalogue & Recherche (`/prompts`)
```text
+-----------------------------------------------------------------------------------+
|  FILTRES (Sidebar Gauche)         |  GRILLE DE RÉSULTATS (Catalogue)               |
|                                   |                                               |
|  Catégories :                     |  Trier par : [ Les plus populaires v ]        |
|  [x] Marketing                    |                                               |
|  [ ] Code & Dev                   |  12 Prompts trouvés                           |
|  [ ] Art & Design                 |                                               |
|                                   |  +-------------------+  +-------------------+ |
|  Outil IA :                       |  | [Image Preview]   |  | [Image Preview]   | |
|  (o) Tous  ( ) ChatGPT            |  | 🤖 ChatGPT        |  | 🎨 Midjourney     | |
|  ( ) Midjourney                   |  | Title Prompt A    |  | Title Prompt B    | |
|                                   |  | ⭐ 4.9 (24)       |  | ⭐ 4.7 (10)       | |
|  Prix :                           |  | 5.00 €  [Ajouter] |  | 3.99 €  [Ajouter] | |
|  [ Min: 0 € ] - [ Max: 50 € ]     |  +-------------------+  +-------------------+ |
+-----------------------------------------------------------------------------------+
```

---

### 🖥️ Écran 3 : Fiche Produit Prompt (`/prompts/:slug`)
```text
+-----------------------------------------------------------------------------------+
|  [<- Retour Catalogue]  Catégorie : Marketing / Outil : ChatGPT                   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  Titre : Expert Redacteur SEO pour Articles de Blog 2026                          |
|  Par : @AlexCreator ⭐ 4.9 (54 ventes)                                             |
|                                                                                   |
|  +----------------------------------+  +---------------------------------------+  |
|  | GALERIE PREVIEW (PreviewImage)   |  | BLOC ACHAT (Stripe)                   |  |
|  | +------------------------------+ |  |                                       |  |
|  | |                              | |  | Prix : 4.99 €                         |  |
|  | | [ Image d'exemple ]          | |  |                                       |  |
|  | |                              | |  | [ 🛒 Ajouter au Panier ]              |  |
|  | +------------------------------+ |  | [ ⚡ Acheter Maintenant (Stripe) ]   |  |
|  |   (o) Image 1  ( ) Image 2      |  |                                       |  |
|  +----------------------------------+  | 🔒 Garantie Accès Immédiat au Prompt   |  |
|                                        +---------------------------------------+  |
|  DESCRIPTION DU PROMPT :                                                          |
|  Ce prompt génère un article structuré de 1500 mots prêt pour le Web...           |
|                                                                                   |
|  EXEMPLE DE RÉSULTAT OBTENU (previewResult) :                                      |
|  +-----------------------------------------------------------------------------+  |
|  | "Voici l'introduction d'exemple générée par ChatGPT avec ce prompt..."       |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  🔒 LE PROMPT EXACT (promptContent) :                                             |
|  +-----------------------------------------------------------------------------+  |
|  | 🔒 CONTENU MASQUÉ — Achetez ce prompt pour débloquer le texte exact.          |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

### 🖥️ Écran 4 : Espace Utilisateur (`USER`) (`/dashboard`)
```text
+-----------------------------------------------------------------------------------+
|  MON ESPACE USER  |  [Mes Achats]  [Mes Ventes]  [+ Publier un Prompt]  [Gains]   |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  📥 MES PROMPTS ACHETÉS                                                           |
|  +-----------------------------------------------------------------------------+  |
|  | Prompt : Expert Redacteur SEO (Acheté le 04/08/2026)                          |  |
|  | [ 👁️ Afficher le Prompt Content (Copier le texte) ] [ 🌟 Laisser un avis ]    |  |
|  +-----------------------------------------------------------------------------+  |
|                                                                                   |
|  💰 MES GAINS & VERSEMENTS STRIPE CONNECT                                         |
|  Solde disponible : 145.50 €                                                      |
|  [ 💳 Demander un Versement sur mon compte bancaire ]                            |  |
+-----------------------------------------------------------------------------------+
```

---

### 🖥️ Écran 5 : Formulaire de Création / Vente (`/prompts/create`)
```text
+-----------------------------------------------------------------------------------+
|  ➕ PUBLIER UN NOUVEAU PROMPT                                                     |
+-----------------------------------------------------------------------------------+
|  Titre du Prompt :       [ ex: Générateur de Fiches Produits ]                   |
|  Catégorie :             [ Sélectionner une catégorie v ]                         |
|  Outil IA Compatible :   [ Sélectionner l'outil IA v ]                            |
|  Prix (€) :              [ 4.99 ] €                                               |
|                                                                                   |
|  Description Publique :                                                           |
|  [ Expliquez le fonctionnement de votre prompt...                           ]     |
|                                                                                   |
|  Texte Brut du Prompt (Confidentiel - promptContent) :                            |
|  [ Saisissez ici les instructions exactes que l'acheteur copiera...         ]     |
|                                                                                   |
|  Exemple de Résultat Texte (previewResult) :                                      |
|  [ Exemple de texte obtenu avec ce prompt...                                ]     |
|                                                                                   |
|  Images de Démonstration (PreviewImage) :                                         |
|  [ 📁 Glisser-déposer vos images d'illustration (.jpg, .png) ]                    |
|                                                                                   |
|  [ 🚀 PUBLIER MON PROMPT EN LIGNE (PUBLISHED) ]                                   |
+-----------------------------------------------------------------------------------+
```
