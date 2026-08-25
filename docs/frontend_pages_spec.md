# PromptVerse — Contexte projet & Spécification des écrans (pour maquettage)

> Document de référence à fournir à un outil de maquettage (Figma AI, v0, Claude Design…).
> Date : 22/08/2026 — Basé sur `docs/projet.md`, `docs/maquettes_ux_ui.md` et le code de `apps/api`.

---

## 1. Contexte produit

**PromptVerse** est une **marketplace de prompts IA** : les créateurs publient et vendent des prompts optimisés (ChatGPT, Midjourney, DALL·E, Claude, Stable Diffusion), les acheteurs les achètent via Stripe et débloquent le texte exact du prompt.

**Modèle économique** : achat à l'unité, panier, Stripe Checkout. Le vendeur cumule un solde et demande un virement via Stripe Connect Express.

**Proposition de valeur** :
- Acheteur → gagner du temps avec des instructions pré-testées, prévisualisées (image + exemple de résultat).
- Vendeur → monétiser son savoir-faire en prompt engineering.

**Règle métier centrale** : le champ `promptContent` (texte brut du prompt) est **masqué** partout tant que l'utilisateur n'a pas une commande `PAID` contenant ce prompt. Seuls `description`, `previewResult` et les `previewImages` sont publics. Cette mécanique de « verrou » doit être **visuellement forte** dans les maquettes.

---

## 2. Stack & contraintes techniques

| Couche | Technologie |
|---|---|
| Front | React 19 + Vite + TypeScript + Tailwind CSS v4 + Axios |
| Back | NestJS + TypeORM + MySQL, API versionnée (`/api/v1/...`) |
| Auth | JWT natif (pas de Passport/OAuth), bcrypt, throttling |
| Cache | Redis (catalogue, TTL 5 min) |
| Fichiers | MinIO / S3 (avatars, cover, preview images) |
| Paiement | Stripe Checkout + Webhook + Stripe Connect Express |
| Mail | Mailpit en dev (vérification email, reset password) |
| Infra | Docker Compose (API, Web, MySQL, Redis, MinIO, Mailpit, Nginx) |

**Contraintes UI** : responsive mobile-first, **Dark Mode uniquement**, accessibilité (contrastes AA, navigation clavier, focus visibles).

---

## 3. Direction artistique (Design System)

Esthétique **Dark Premium** type Instant Gaming / Vercel / PromptBase, avec dégradés néon et glassmorphism léger.

### Tokens couleurs
| Rôle | Valeur |
|---|---|
| Background principal | `#090D16` |
| Surface / Cards | `#121827` |
| Bordure subtile | `#1F293D` |
| Accent primaire (CTA) | `linear-gradient(135deg, #7C3AED, #2563EB)` |
| Accent secondaire (prix, succès) | `#10B981` |
| Texte principal | `#F9FAFB` |
| Texte secondaire | `#9CA3AF` |
| Danger / erreur | `#EF4444` |
| Warning / en attente | `#F59E0B` |

### Typographie
- **UI** : Inter ou Outfit (600/700 pour les titres, 400/500 pour le corps)
- **Code / texte de prompt** : Fira Code ou JetBrains Mono

### Éléments récurrents
- **Card Prompt** : cover 16:9, badge outil IA (icône + nom), titre 2 lignes max, avatar + pseudo vendeur, ⭐ note moyenne + nb d'avis, prix en vert, bouton « Ajouter au panier », icône cœur (favori) en overlay haut-droite.
- **Badges de statut** : `PUBLISHED` / `ARCHIVED`, `PENDING` / `PAID` / `REFUNDED` / `FAILED`, `PENDING` / `PROCESSING` / `PROCESSED` / `FAILED`, rôle `USER` / `ADMIN` / `SUPER_ADMIN`, compte `PENDING` / `ACTIVE` / `BANNED`.
- **Bloc verrouillé** : zone floutée/hachurée avec cadenas + CTA d'achat.
- **États obligatoires à maquetter pour chaque liste** : chargement (skeleton), vide (illustration + CTA), erreur (message + réessayer).

---

## 4. Rôles & navigation

| Rôle | Accès |
|---|---|
| Visiteur | Accueil, catalogue, fiche prompt, profils publics, auth, panier local |
| USER (connecté) | Tout le visiteur + dashboard, achats, ventes, favoris, avis, gains |
| ADMIN / SUPER_ADMIN | Tout + back-office `/admin` |

**Navbar (globale)** : logo · Catalogue · Catégories (dropdown) · Outils IA (dropdown) · barre de recherche · icône favoris · icône panier avec compteur · bouton « Vendre un prompt » · avatar/menu utilisateur (ou « Se connecter »).

**Footer** : liens produit, catégories populaires, légal (CGU, confidentialité, mentions), réseaux sociaux.

---

## 5. Sitemap

```
PUBLIC
  /                            Accueil
  /prompts                     Catalogue + filtres + recherche
  /prompts/:slug               Fiche prompt
  /categories                  Toutes les catégories
  /categories/:slug            Catalogue filtré par catégorie
  /ai-tools                    Tous les outils IA
  /ai-tools/:slug              Catalogue filtré par outil IA
  /u/:username                 Profil créateur public
  /cart                        Panier
  /checkout/success            Retour Stripe OK
  /checkout/cancel             Retour Stripe annulé
  /legal/terms | /legal/privacy | /legal/mentions
  *                            404

AUTH
  /login                       Connexion
  /register                    Inscription
  /verify-email/:id/:token     Résultat vérification email
  /forgot-password             Demande de réinitialisation
  /reset-password/:id/:token   Nouveau mot de passe

DASHBOARD (USER, protégé)
  /dashboard                   Vue d'ensemble
  /dashboard/purchases         Ma bibliothèque (prompts achetés)
  /dashboard/orders            Historique des commandes
  /dashboard/prompts           Mes prompts en vente
  /dashboard/prompts/create    Publier un prompt
  /dashboard/prompts/:id/edit  Modifier un prompt
  /dashboard/sales             Mes ventes
  /dashboard/payouts           Gains & versements Stripe Connect
  /dashboard/wishlist          Mes favoris
  /dashboard/reviews           Mes avis
  /dashboard/profile           Profil public (avatar, bio, réseaux)
  /dashboard/settings          Compte (email, mot de passe, suppression)

ADMIN (protégé ADMIN/SUPER_ADMIN)
  /admin                       Statistiques plateforme
  /admin/users                 Gestion utilisateurs
  /admin/prompts               Modération des prompts
  /admin/categories            CRUD catégories
  /admin/ai-tools              CRUD outils IA
  /admin/orders                Commandes
  /admin/payouts               Demandes de versement
```

---

## 6. Spécification écran par écran

### — ZONE PUBLIQUE —

#### P01 · Accueil `/`
**But** : convertir le visiteur (découverte + recherche).
**Blocs** :
1. Hero : titre accrocheur, sous-titre, grosse barre de recherche, CTA « Explorer le catalogue » + « Vendre un prompt ». Fond dégradé violet/bleu avec glow.
2. Filtres rapides par outil IA : rangée de pills avec icônes (ChatGPT, Midjourney, DALL·E 3, Claude, Stable Diffusion).
3. « Prompts tendances » : grille de 4 à 8 Card Prompt (tri par `salesCount`).
4. « Nouveautés » : carrousel horizontal.
5. Catégories : grille de tuiles avec icône + nom + nombre de prompts.
6. Bandeau « Devenez vendeur » : 3 étapes (Publiez → Vendez → Encaissez) + CTA.
7. Réassurance : accès instantané, paiement sécurisé Stripe, prompts testés.

#### P02 · Catalogue `/prompts`
**Layout** : sidebar filtres à gauche (drawer sur mobile) + grille à droite.
**Sidebar** : recherche texte, checkboxes catégories, radios outil IA, slider/inputs fourchette de prix, note minimum (étoiles), bouton « Réinitialiser ».
**Zone résultats** : compteur « N prompts trouvés », select de tri (Populaires / Récents / Prix ↑ / Prix ↓ / Mieux notés), toggle grille/liste, grille responsive (4/3/2/1 colonnes), pagination (ou infinite scroll).
**États** : skeleton cards, aucun résultat (« Aucun prompt ne correspond » + reset filtres).

#### P03 · Fiche prompt `/prompts/:slug`
**Colonne gauche (contenu)** :
- Fil d'ariane + badges catégorie & outil IA.
- Titre H1, ligne auteur (avatar, @pseudo cliquable, note vendeur, nb ventes), ⭐ note moyenne + nb d'avis, compteur de vues.
- **Galerie** `previewImages` : image principale + miniatures cliquables, lightbox.
- **Description** publique.
- **Exemple de résultat** (`previewResult`) : bloc monospace encadré, étiqueté « Résultat obtenu avec ce prompt ».
- **Bloc verrouillé** `promptContent` : texte flouté + cadenas + « Achetez pour débloquer le texte exact ». → Si acheté : bloc déverrouillé avec bouton « Copier le prompt ».
- **Avis** : résumé (note moyenne, histogramme 1–5 étoiles) + liste des avis (avatar, pseudo, étoiles, date, commentaire) + pagination.
- « Prompts similaires » en bas.

**Colonne droite (sticky, bloc achat)** :
- Prix en gros, vert.
- « Ajouter au panier » (primaire) + « Acheter maintenant » (secondaire).
- Bouton cœur « Ajouter aux favoris ».
- Encarts réassurance : accès immédiat, paiement Stripe, compatible <outil IA>.
- Si déjà acheté → bandeau vert « Vous possédez ce prompt » + « Voir dans ma bibliothèque ».
- Si l'utilisateur est l'auteur → « Modifier mon prompt ».

#### P04 · Catégories `/categories` et `/categories/:slug`
Grille de cartes catégorie (icône, nom, nb de prompts). La page `:slug` réutilise le layout du catalogue avec un en-tête de catégorie (bannière, icône, nom, description) et le filtre pré-appliqué.

#### P05 · Outils IA `/ai-tools` et `/ai-tools/:slug`
Idem P04 avec les logos d'outils IA.

#### P06 · Profil créateur public `/u/:username`
En-tête : bannière, avatar, pseudo, bio, liens réseaux sociaux (icônes Website/Twitter/Instagram/GitHub/LinkedIn/YouTube/TikTok/Discord), date d'inscription.
Statistiques : nb de prompts publiés, ventes totales, note moyenne.
Grille des prompts publiés par ce créateur (+ tri).

#### P07 · Panier `/cart`
Liste des lignes (miniature, titre, badge outil IA, vendeur, prix, bouton supprimer). Colonne récapitulative sticky : sous-total, total, bouton « Payer avec Stripe », mention paiement sécurisé.
**État vide** : illustration + « Votre panier est vide » + CTA catalogue.
*(Note : un prompt déjà acheté ne peut pas être ré-ajouté → message d'info.)*

#### P08 · Retour paiement `/checkout/success` et `/checkout/cancel`
- **Succès** : grosse coche verte animée, « Paiement confirmé », récapitulatif des prompts débloqués, CTA « Accéder à ma bibliothèque ». Prévoir un état intermédiaire « Validation du paiement en cours… » (le webhook Stripe est asynchrone).
- **Annulé** : icône neutre, « Paiement annulé », panier conservé, CTA « Retour au panier ».

#### P09 · Pages légales `/legal/*`
Gabarit texte simple : titre, sommaire latéral, contenu long. (CGU/CGV, Politique de confidentialité RGPD, Mentions légales.)

#### P10 · 404
Illustration, message, barre de recherche, CTA accueil/catalogue.

---

### — AUTHENTIFICATION —

Gabarit commun : écran centré, carte glassmorphism sur fond dégradé, logo en haut. (Optionnel : split-screen avec visuel à droite.)

#### A01 · Connexion `/login`
Champs email + mot de passe (toggle visibilité), lien « Mot de passe oublié ? », bouton « Se connecter », lien vers l'inscription. États : erreur d'identifiants, compte non vérifié (avec « Renvoyer l'email »), compte banni, chargement.

#### A02 · Inscription `/register`
Champs pseudo, email, mot de passe + confirmation, indicateur de robustesse, case CGU. Après succès → écran « Vérifiez votre boîte mail » (icône enveloppe, email affiché, bouton renvoyer).

#### A03 · Vérification email `/verify-email/:id/:token`
Trois états à maquetter : en cours (spinner), succès (coche + CTA connexion), lien invalide/expiré (croix + CTA renvoyer).

#### A04 · Mot de passe oublié `/forgot-password`
Champ email + bouton d'envoi + écran de confirmation neutre.

#### A05 · Réinitialisation `/reset-password/:id/:token`
Nouveau mot de passe + confirmation + jauge de robustesse. États succès et lien expiré.

---

### — ESPACE UTILISATEUR (protégé) —

**Gabarit dashboard** : sidebar verticale gauche persistante (Vue d'ensemble, Ma bibliothèque, Commandes, Mes prompts, Mes ventes, Gains, Favoris, Avis, Profil, Paramètres) + zone de contenu. Sur mobile : barre d'onglets ou menu burger.

#### D01 · Vue d'ensemble `/dashboard`
En-tête de bienvenue avec avatar. 4 cartes KPI : prompts achetés · prompts publiés · ventes totales · solde disponible. Graphique des ventes (30 derniers jours). Bloc « Activité récente » (dernières ventes, derniers avis reçus). Bandeau d'alerte si Stripe Connect non finalisé.

#### D02 · Ma bibliothèque `/dashboard/purchases`
Liste/grille des prompts achetés : miniature, titre, outil IA, vendeur, date d'achat.
Actions par ligne : « Afficher le prompt » (ouvre un panneau/modal avec le `promptContent` en monospace + bouton **Copier**), « Laisser un avis » (ou note déjà donnée), « Voir la fiche ».
Barre de recherche interne + filtre par outil IA. État vide : « Aucun prompt acheté » + CTA catalogue.

#### D03 · Commandes `/dashboard/orders`
Tableau : n° de commande, date, nb d'articles, montant total, badge de statut (PENDING/PAID/REFUNDED/FAILED), lien détail. Vue détail : lignes de commande historisées (titre, prix payé), total, référence Stripe, bouton facture.

#### D04 · Mes prompts en vente `/dashboard/prompts`
Tableau ou grille : miniature, titre, statut (PUBLISHED/ARCHIVED), prix, ventes, vues, favoris, note moyenne, date de publication. Actions : modifier, archiver/restaurer, voir la fiche publique. CTA « + Publier un prompt ». État vide incitatif.

#### D05 · Publier un prompt `/dashboard/prompts/create`
Formulaire long, idéalement en **stepper 3 étapes** avec aperçu live de la Card à droite :
1. **Informations** — titre, catégorie (select), outil IA (select), prix (€), description publique (textarea/markdown).
2. **Contenu** — `promptContent` (textarea monospace, avertissement « confidentiel, visible uniquement après achat »), `previewResult` (exemple de résultat).
3. **Visuels** — upload de la cover (16:9, drag & drop, recadrage) + galerie `previewImages` (multi-upload, réordonnancement drag & drop, suppression).
Barre d'actions : « Publier » (primaire). États : erreurs de validation par champ, upload en cours (progression), succès (toast + redirection).

#### D06 · Modifier un prompt `/dashboard/prompts/:id/edit`
Même formulaire pré-rempli, en une seule page. Ajout : bouton « Archiver » (destructif, avec modal de confirmation) et bandeau « X ventes réalisées ».

#### D07 · Mes ventes `/dashboard/sales`
Tableau des ventes : date, prompt vendu, acheteur (pseudo), montant, commission plateforme, net vendeur. Filtres par période. Cartes de synthèse : CA total, ventes du mois, panier moyen. Graphique.

#### D08 · Gains & versements `/dashboard/payouts`
- Bloc principal : **solde disponible** en très grand (vert) + « Demander un versement » (ouvre une modal : montant, rappel du compte bancaire, confirmation).
- Bloc **Stripe Connect** : trois états à maquetter — non connecté (CTA « Configurer mes paiements »), onboarding incomplet (badge orange + « Continuer »), vérifié (badge vert + coordonnées masquées).
- Historique des versements : tableau (date de demande, montant, statut PENDING/PROCESSING/PROCESSED/FAILED, date de traitement).

#### D09 · Favoris `/dashboard/wishlist`
Grille de Card Prompt avec cœur plein, bouton « Retirer », « Ajouter au panier ». État vide + CTA.

#### D10 · Mes avis `/dashboard/reviews`
Deux onglets : **Avis donnés** (prompt, étoiles, commentaire, date, modifier/supprimer) et **Avis reçus** (sur mes prompts). Bloc « À noter » listant les achats sans avis.

#### D11 · Profil `/dashboard/profile`
Formulaire : upload/recadrage d'avatar (aperçu circulaire + suppression), pseudo, bio (textarea + compteur), **liste dynamique de liens sociaux** (select plateforme + champ URL + bouton supprimer + « Ajouter un lien »). Aperçu du rendu public à droite. Bouton « Enregistrer » + « Voir mon profil public ».

#### D12 · Paramètres `/dashboard/settings`
Sections empilées : changement d'email (avec re-vérification), changement de mot de passe (ancien + nouveau + confirmation), préférences de notification, et **zone dangereuse** en rouge : suppression du compte (modal de confirmation par saisie du pseudo).

---

### — BACK-OFFICE ADMIN (protégé) —

**Gabarit admin** : sidebar distincte (accent plus sobre/rouge-violet pour différencier de l'espace user) + topbar avec badge de rôle.

#### B01 · Statistiques `/admin`
Cartes KPI : utilisateurs totaux / actifs / bannis, prompts publiés / archivés, commandes payées, CA plateforme, versements en attente. Graphiques : inscriptions par jour, CA par mois, top 5 catégories, top 5 vendeurs. Fil des dernières actions.

#### B02 · Utilisateurs `/admin/users`
Tableau paginé : avatar + pseudo, email, badge rôle, badge statut, date d'inscription, dernière connexion, nb de prompts, solde. Recherche + filtres (rôle, statut). Actions par ligne : voir le détail, **changer le rôle** (modal select USER/ADMIN/SUPER_ADMIN), **bannir/réactiver** (modal de confirmation avec motif). Vue détail utilisateur en drawer latéral.

#### B03 · Modération des prompts `/admin/prompts`
Tableau : miniature, titre, vendeur, catégorie, outil IA, prix, statut, date. Filtres + recherche. Actions : prévisualiser (drawer avec tout le contenu, `promptContent` inclus), **archiver** (masquer, avec motif), restaurer. Onglet « Archivés ».

#### B04 · Catégories `/admin/categories`
Tableau : icône, nom, slug, nb de prompts, date. CRUD complet : modal de création/édition (nom, slug auto-généré, upload d'icône), suppression avec confirmation, onglet « Archivées » + bouton restaurer.

#### B05 · Outils IA `/admin/ai-tools`
Identique à B04 (nom, slug, icône), onglet « Archivés » + restauration.

#### B06 · Commandes `/admin/orders`
Tableau : n°, acheteur, montant, statut, date de paiement, référence Stripe. Filtres statut/période. Vue détail avec lignes de commande.

#### B07 · Versements `/admin/payouts`
File des demandes : vendeur, montant, statut, date de demande. Actions : marquer en cours / traité / échoué, lien vers le transfert Stripe. Compteur des demandes en attente.

---

## 7. Composants transverses à maquetter

| Composant | Description |
|---|---|
| Navbar | 3 variantes : visiteur, utilisateur connecté, admin |
| Menu utilisateur | Dropdown avatar : Dashboard, Mes prompts, Favoris, Paramètres, Déconnexion |
| Footer | Version complète |
| Card Prompt | États : normal, hover, favori actif, déjà acheté, archivé |
| Panier mini (drawer) | Ouvert depuis l'icône panier |
| Modal « Laisser un avis » | Sélecteur 5 étoiles + textarea + envoi |
| Modal « Afficher le prompt » | Contenu monospace + bouton Copier + toast « Copié ! » |
| Modal de confirmation | Générique (archiver, supprimer, bannir) |
| Toasts | Succès / erreur / info |
| Barre de recherche avec suggestions | Dropdown de résultats instantanés |
| Pagination | Numérotée + « Charger plus » |
| Skeletons | Card, tableau, fiche produit |
| États vides | Panier, favoris, bibliothèque, résultats de recherche |
| Étoiles de notation | Affichage (lecture seule) + saisie interactive |
| Uploader d'images | Drag & drop, aperçu, progression, erreur de format/poids |
| Badges | Statut, rôle, catégorie, outil IA |

---

## 8. Breakpoints

| Écran | Largeur | Grille catalogue |
|---|---|---|
| Mobile | 375 px | 1 colonne, filtres en drawer, sidebar dashboard en burger |
| Tablette | 768 px | 2 colonnes |
| Desktop | 1280 px | 3 colonnes |
| Large | 1440 px+ | 4 colonnes, conteneur max 1280–1440 px |

**Priorité de maquettage** : maquetter en **desktop 1440** d'abord, puis décliner en **mobile 375** au minimum pour P01, P02, P03, P07, A01, D02, D05.

---

## 9. Récapitulatif — 40 écrans

**Public (13)** : Accueil · Catalogue · Fiche prompt · Catégories · Catégorie détail · Outils IA · Outil IA détail · Profil créateur · Panier · Checkout succès · Checkout annulé · Légal · 404
**Auth (5)** : Connexion · Inscription · Vérification email · Mot de passe oublié · Réinitialisation
**Dashboard (12)** : Vue d'ensemble · Bibliothèque · Commandes · Mes prompts · Publier · Modifier · Mes ventes · Gains & payouts · Favoris · Mes avis · Profil · Paramètres
**Admin (7)** : Statistiques · Utilisateurs · Modération prompts · Catégories · Outils IA · Commandes · Versements

**MVP prioritaire (à maquetter en premier — 12 écrans)** :
Accueil, Catalogue, Fiche prompt, Connexion, Inscription, Panier, Checkout succès, Dashboard vue d'ensemble, Ma bibliothèque, Publier un prompt, Profil, Admin utilisateurs.
