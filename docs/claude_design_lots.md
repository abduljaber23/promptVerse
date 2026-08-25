# PromptVerse — Briefs par lot pour Claude Design

> **Mode d'emploi** : chaque lot ci-dessous est un bloc autonome à copier-coller intégralement
> dans une conversation Claude Design. Le préambule (contexte + design system) est répété dans
> chaque lot : ne le retire pas, c'est lui qui garantit la cohérence entre les canvas.
>
> **Ordre** : fais le lot 1 en premier et valide-le. Il fige les tokens, la typo et la Card
> Prompt qui se répètent partout. Les lots 2 à 5 s'appuient dessus.
>
> Détail fonctionnel complet de chaque écran : `docs/frontend_pages_spec.md`.

---

## LOT 1 — Zone publique (3 artboards) · À FAIRE EN PREMIER

```
Crée un canvas de 3 artboards desktop (1440 px de large) pour PromptVerse.

## Contexte produit
PromptVerse est une marketplace française de prompts IA. Des créateurs publient et vendent des
prompts optimisés pour ChatGPT, Midjourney, DALL-E, Claude et Stable Diffusion. Les acheteurs
paient par carte via Stripe et débloquent alors le texte exact du prompt.

Règle métier centrale à traduire visuellement : le texte brut du prompt est MASQUÉ tant que
l'utilisateur ne l'a pas acheté. Seuls la description, un exemple de résultat et des images de
démonstration sont publics. Ce « verrou » est le motif visuel signature du produit.

## Langue et formats
Interface entièrement en français. Prix au format français : symbole après le nombre, virgule
décimale, espace comme séparateur de milliers — « 3,99 € », « 1 204,00 € ». Jamais de dollars.
Dates au format 04/08/2026.

## Design system
Dark mode uniquement, aucune variante claire.
- Fond principal : #090D16
- Surfaces et cartes : #121827, bordure 1px #1F293D, rayon 12px
- Accent primaire (boutons, éléments actifs) : dégradé 135° de #7C3AED vers #2563EB, avec un
  halo diffus
- Vert de succès et prix : #10B981
- Ambre (avertissement, étoiles) : #F59E0B
- Rouge (danger, erreur) : #EF4444
- Texte principal : #F9FAFB — Texte secondaire : #9CA3AF
- Typo interface : Inter, titres en gras
- Typo pour tout texte de prompt ou de code : JetBrains Mono
Style général : marketplace premium moderne, proche de Vercel ou PromptBase. Espacements
généreux, glassmorphism léger sur les surfaces superposées.

## Composant central à définir une fois et réutiliser partout : la Card Prompt
Image de couverture 16:9 ; badge outil IA avec icône en haut à gauche de l'image ; icône cœur
en haut à droite de l'image ; titre sur 2 lignes maximum ; ligne avec petit avatar rond du
vendeur et son pseudo « @arch_ai » ; note en étoiles « 4,9 (120) » ; ligne du bas avec le prix
en vert à GAUCHE et un petit bouton dégradé « Ajouter au panier » à DROITE, sur la même ligne.

## Artboards à produire

### Artboard 1 — Accueil
Barre de navigation : logo PromptVerse à gauche ; liens « Catalogue », « Catégories »,
« Outils IA » ; champ de recherche au centre avec loupe et placeholder « Rechercher un
prompt » ; à droite une icône cœur, une icône panier avec pastille violette « 3 », un bouton
contour « Vendre un prompt » et un bouton dégradé « Se connecter ».

Hero avec un large halo dégradé violet-bleu : petite pastille « Plus de 10 000 prompts
premium » ; titre sur deux lignes « Les meilleurs prompts IA » puis « pour booster votre
productivité », la seconde ligne en dégradé violet-bleu ; sous-titre « Découvrez, achetez et
vendez des prompts de qualité pour ChatGPT, Midjourney, DALL-E et bien plus. » ; grande barre
de recherche arrondie avec loupe, placeholder « Rechercher un prompt (ex : SEO, logo 3D...) »
et bouton dégradé « Explorer » intégré à droite.

Rangée de pastilles de filtre rapide avec logos : ChatGPT, Midjourney, DALL-E 3, Claude,
Stable Diffusion.

Section « Prompts tendances », sous-titre « Les prompts les plus populaires cette semaine »,
lien « Voir tout » aligné à droite. Grille de 8 Card Prompt en 4 colonnes sur 2 rangées.

Section « Parcourir par catégorie » : grille de 6 tuiles avec icône colorée, nom et compteur —
Marketing (2,4k prompts), Code (1,8k), Art (5,1k), Rédaction (3,2k), Business (1,5k),
Vidéo (800+).

Bandeau vendeur sur fond dégradé violet : à gauche le titre « Transformez votre prompt
engineering en revenus passifs. », un paragraphe « Rejoignez des milliers de créateurs qui
monétisent leur savoir-faire. Ouvrez votre boutique en quelques minutes. » et un bouton
dégradé « Commencer à vendre » ; à droite trois lignes numérotées « 1 Publiez — Mettez en
ligne vos prompts testés », « 2 Vendez — Touchez des acheteurs qualifiés », « 3 Encaissez —
Recevez vos versements directement ».

Pied de page : logo, « © 2026 PromptVerse. Tous droits réservés. » et 3 colonnes de liens —
« Plateforme » (Catalogue, Catégories, Outils IA), « Légal » (Conditions d'utilisation,
Politique de confidentialité, Mentions légales), « Communauté » (Contacter le support,
Discord).

### Artboard 2 — Catalogue
Même barre de navigation, avec un avatar utilisateur à la place de « Se connecter ».

Deux colonnes. Barre latérale gauche de 280 px, collante, titrée « Filtres », avec des groupes
séparés par de fins traits : champ « Mot-clé » ; groupe « Catégories » avec cases à cocher
Marketing, Code & Dev, Art & Design, Rédaction, Business, Vidéo ; groupe « Outil IA » avec
boutons radio Tous, ChatGPT, Midjourney, DALL-E 3, Claude, Stable Diffusion ; groupe « Prix »
avec un curseur double et deux champs « Min » et « Max » suffixés « € » ; groupe « Note
minimum » avec des rangées d'étoiles cliquables ; bouton fantôme « Réinitialiser les filtres ».

Zone de résultats : ligne d'en-tête avec « 128 prompts trouvés » en gras à gauche, et à droite
un menu déroulant « Trier par : Les plus populaires » plus un sélecteur grille/liste. En
dessous, grille de 9 Card Prompt en 3 colonnes. Pagination numérotée centrée en bas avec
« Précédent » et « Suivant ».

### Artboard 3 — Fiche prompt — ARTBOARD LE PLUS IMPORTANT
Même barre de navigation. Fil d'ariane « Accueil / Marketing / Rédacteur expert SEO » suivi de
deux badges : « Marketing » et « ChatGPT » avec son icône.

Deux colonnes, 65 % / 35 %.

Colonne gauche : grand titre « Rédacteur expert SEO pour articles de blog 2026 » ; ligne
vendeur avec avatar rond, « @AlexCreator », note « 4,9 » et « 54 ventes » ; galerie avec une
grande image 16:9 et une rangée de 4 miniatures cliquables ; section « Description » avec deux
paragraphes ; section « Exemple de résultat obtenu » présentant une carte bordée contenant du
texte en police monospace sur un fond légèrement plus sombre.

Puis l'élément clé : section « Le prompt exact » contenant une carte VERROUILLÉE — texte
monospace flouté, gros cadenas centré par-dessus, message « Contenu verrouillé — achetez ce
prompt pour débloquer le texte exact. » et bouton dégradé « Débloquer le prompt ».

Section « Avis » : à gauche la note moyenne « 4,9 » en très grand avec 5 étoiles et « 54
avis » ; à droite un histogramme de 5 barres horizontales de 5 à 1. En dessous, 3 cartes d'avis
avec avatar, pseudo, étoiles, date et commentaire.

Colonne droite : carte d'achat collante avec une fine bordure dégradée, contenant le prix
« 4,99 € » en très grand vert, un bouton dégradé pleine largeur « Ajouter au panier », un
bouton contour pleine largeur « Acheter maintenant », un bouton contour « Ajouter aux
favoris » avec icône cœur, un trait de séparation, puis trois lignes de réassurance avec
icônes : « Accès immédiat au prompt », « Paiement sécurisé par Stripe », « Compatible
ChatGPT ».
```

---

## LOT 2 — Authentification (5 artboards)

```
Crée un canvas de 5 artboards desktop (1440 px de large) pour PromptVerse, marketplace
française de prompts IA. Ce sont les écrans d'authentification.

## Langue et formats
Interface entièrement en français.

## Design system
Dark mode uniquement, aucune variante claire.
- Fond principal : #090D16
- Surfaces et cartes : #121827, bordure 1px #1F293D, rayon 16px pour les cartes d'auth
- Accent primaire : dégradé 135° de #7C3AED vers #2563EB, avec un halo diffus
- Vert de succès : #10B981 — Ambre : #F59E0B — Rouge d'erreur : #EF4444
- Texte principal : #F9FAFB — Texte secondaire : #9CA3AF
- Typo : Inter, titres en gras
Style : premium moderne façon Vercel, glassmorphism léger sur les cartes.

## Gabarit commun aux 5 artboards
Écran divisé en deux moitiés. À gauche, une carte centrée de 420 px de large en glassmorphism,
posée sur le fond sombre. À droite, un panneau décoratif rempli d'un dégradé maillé
violet-bleu. Garde exactement le même gabarit sur les 5 artboards, seul le contenu change.

## Artboards à produire

### Artboard 1 — Connexion
Carte : logo PromptVerse, titre « Bon retour parmi vous », sous-titre « Connectez-vous pour
accéder à vos prompts », champ « Adresse email » avec icône enveloppe, champ « Mot de passe »
avec icône cadenas et bouton œil à droite, ligne avec case « Se souvenir de moi » à gauche et
lien « Mot de passe oublié ? » à droite, bouton dégradé pleine largeur « Se connecter », puis
en bas « Pas encore de compte ? Créer un compte » avec le lien en violet.
Panneau droit : 3 Card Prompt flottantes légèrement inclinées et floutées, plus une citation
de témoignage signée « — Marie L., créatrice ».

### Artboard 2 — Inscription
Carte : logo, titre « Créer votre compte », sous-titre « Achetez et vendez des prompts IA »,
champ « Nom d'utilisateur » avec icône personne, champ « Adresse email », champ « Mot de
passe » avec bouton œil, une jauge horizontale de robustesse en 4 segments dont 3 remplis en
vert avec le libellé « Fort », champ « Confirmer le mot de passe », case à cocher « J'accepte
les conditions d'utilisation et la politique de confidentialité », bouton dégradé pleine
largeur « Créer mon compte », puis « Vous avez déjà un compte ? Se connecter ».
Panneau droit : trois lignes d'avantages avec coches vertes — « Accès instantané à vos prompts
achetés », « Vendez vos propres prompts », « Versements sécurisés via Stripe ».

### Artboard 3 — Vérification d'email envoyée
Carte : grande icône enveloppe entourée d'un halo violet, titre « Vérifiez votre boîte mail »,
texte « Nous avons envoyé un lien de vérification à alex@exemple.fr. Cliquez dessus pour
activer votre compte. », bouton contour pleine largeur « Renvoyer l'email », et une ligne
discrète « Vous n'avez rien reçu ? Pensez à vérifier vos spams. »

### Artboard 4 — Mot de passe oublié
Carte : titre « Mot de passe oublié ?», sous-titre « Saisissez votre adresse email, nous vous
enverrons un lien de réinitialisation. », champ « Adresse email », bouton dégradé pleine
largeur « Envoyer le lien », et un lien retour « ← Retour à la connexion ».

### Artboard 5 — Nouveau mot de passe
Carte : titre « Choisissez un nouveau mot de passe », champ « Nouveau mot de passe » avec
bouton œil, jauge de robustesse à 4 segments dont 3 verts avec le libellé « Fort », champ
« Confirmer le mot de passe », une liste de 3 règles avec coches vertes — « 8 caractères
minimum », « Une majuscule et un chiffre », « Un caractère spécial » — et un bouton dégradé
pleine largeur « Réinitialiser mon mot de passe ».
```

---

## LOT 3 — Tunnel d'achat (3 artboards)

```
Crée un canvas de 3 artboards desktop (1440 px de large) pour PromptVerse, marketplace
française de prompts IA. C'est le tunnel d'achat.

## Langue et formats
Interface entièrement en français. Prix au format français : symbole après le nombre, virgule
décimale — « 4,99 € », « 15,97 € ». Jamais de dollars.

## Design system
Dark mode uniquement, aucune variante claire.
- Fond principal : #090D16
- Surfaces et cartes : #121827, bordure 1px #1F293D, rayon 12px
- Accent primaire : dégradé 135° de #7C3AED vers #2563EB avec halo diffus
- Vert de succès et prix : #10B981 — Texte principal : #F9FAFB — Secondaire : #9CA3AF
- Typo : Inter, titres en gras
Style : marketplace premium moderne façon Vercel.

Barre de navigation commune : logo PromptVerse, liens « Catalogue », « Catégories »,
« Outils IA », champ de recherche, icône cœur, icône panier avec pastille, bouton contour
« Vendre un prompt », avatar utilisateur.

## Artboards à produire

### Artboard 1 — Panier
Titre « Votre panier », sous-titre « 3 prompts ». Deux colonnes, 65 % / 35 %.
Colonne gauche : liste verticale de 3 lignes, chacune étant une carte horizontale avec une
miniature 16:9 de 120 px à gauche, puis le titre du prompt en gras, un badge outil IA avec
icône, une petite ligne « par @AlexCreator », et à droite le prix en vert « 4,99 € » et un
petit bouton corbeille. Sous la liste, un lien fantôme « ← Continuer mes achats ».
Colonne droite : carte de récapitulatif collante titrée « Récapitulatif », ligne « Sous-total
15,97 € », trait de séparation, ligne « Total 15,97 € » avec le total en grand vert, bouton
dégradé pleine largeur « Payer avec Stripe » avec icône cadenas, puis une ligne centrée
« Paiement sécurisé par Stripe » avec les logos de cartes, et une ligne « Accès immédiat après
paiement » avec icône éclair.

### Artboard 2 — Paiement confirmé
Barre de navigation réduite : logo et avatar seulement. Contenu centré, largeur max 720 px.
En haut, une grande pastille circulaire verte avec une coche blanche, entourée d'un halo vert.
Titre « Paiement confirmé », sous-titre « Vos prompts sont débloqués et disponibles dès
maintenant ». Carte « Vos nouveaux prompts » contenant 2 lignes horizontales avec miniature
16:9, titre du prompt, badge outil IA et petit bouton contour « Voir le prompt » à droite.
Sous la carte, la ligne « Commande n° PV-2026-0042 — 15,97 € payés », un bouton dégradé pleine
largeur « Accéder à ma bibliothèque » et un bouton fantôme « Retour au catalogue ». Tout en
bas, une ligne discrète « Un reçu vous a été envoyé par email. »

### Artboard 3 — Paiement annulé
Même gabarit centré. En haut, une pastille circulaire grise neutre avec une icône croix.
Titre « Paiement annulé », sous-titre « Aucun montant n'a été débité. Votre panier a été
conservé. » Carte listant les 3 prompts encore au panier avec le total « 15,97 € ». Bouton
dégradé pleine largeur « Retourner au panier » et bouton fantôme « Continuer mes achats ».
Ligne discrète en bas : « Un problème avec le paiement ? Contacter le support. »
```

---

## LOT 4 — Espace utilisateur (5 artboards)

```
Crée un canvas de 5 artboards desktop (1440 px de large) pour PromptVerse, marketplace
française de prompts IA. C'est l'espace utilisateur connecté, qui achète et vend des prompts.

## Langue et formats
Interface entièrement en français. Prix et montants au format français : symbole après le
nombre, virgule décimale, espace comme séparateur de milliers — « 145,50 € », « 1 204,00 € ».
Jamais de dollars. Dates au format 04/08/2026.

## Design system
Dark mode uniquement, aucune variante claire.
- Fond principal : #090D16
- Surfaces et cartes : #121827, bordure 1px #1F293D, rayon 12px
- Accent primaire : dégradé 135° de #7C3AED vers #2563EB
- Vert des montants et succès : #10B981 — Ambre : #F59E0B — Rouge : #EF4444
- Texte principal : #F9FAFB — Texte secondaire : #9CA3AF
- Typo : Inter — JetBrains Mono pour tout texte de prompt
Style : tableau de bord SaaS moderne et épuré.

## Gabarit commun aux 5 artboards
Barre latérale gauche fixe de 260 px, identique sur les 5 artboards : logo PromptVerse en
haut, puis un menu vertical avec une icône et un libellé par ligne — « Vue d'ensemble »,
« Ma bibliothèque », « Commandes », « Mes prompts », « Mes ventes », « Gains », « Favoris »,
« Avis », « Profil », « Paramètres ». La ligne active est surlignée d'un fond dégradé violet
avec une barre d'accent à gauche. En bas de la barre latérale, un bloc utilisateur avec
avatar, le nom « Alex Martin » et une icône de déconnexion.

## Artboards à produire

### Artboard 1 — Vue d'ensemble (ligne active : Vue d'ensemble)
Barre du haut avec le titre « Bon retour, Alex », un champ de recherche et une icône cloche.
Rangée de 4 cartes d'indicateurs, chacune avec une petite icône colorée, un libellé, un grand
nombre et une variation en vert : « Prompts achetés — 12 », « Prompts publiés — 8 », « Ventes
totales — 54 », « Solde disponible — 145,50 € » (cette dernière valeur en vert).
En dessous, deux colonnes : à gauche une grande carte « Ventes des 30 derniers jours »
contenant une courbe d'aire avec un remplissage dégradé violet-bleu sous la courbe ; à droite
une carte « Activité récente » listant 5 lignes avec petite icône, texte du type « Nouvelle
vente — Rédacteur expert SEO » ou « Nouvel avis 5 étoiles », et horodatage relatif « il y a
2 h ».
Tout en bas, un bandeau d'alerte à bordure gauche ambre avec icône d'avertissement :
« Terminez la configuration de Stripe Connect pour recevoir vos versements. » et un bouton
« Configurer » à droite.

### Artboard 2 — Ma bibliothèque (ligne active : Ma bibliothèque)
Titre « Ma bibliothèque », sous-titre « 12 prompts achetés ». Barre d'outils avec un champ de
recherche « Rechercher dans mes prompts » à gauche et un menu déroulant « Tous les outils IA »
à droite.
Liste verticale de 5 cartes horizontales. Chacune contient une miniature 16:9 de 160 px à
gauche ; au centre le titre du prompt en gras, un badge outil IA, une ligne « par
@AlexCreator » et une ligne discrète « Acheté le 04/08/2026 » ; à droite une pile verticale de
trois boutons — un bouton dégradé « Afficher le prompt » avec icône œil, un bouton contour
« Laisser un avis » avec icône étoile, et un bouton fantôme « Voir la fiche ». Sur l'une des
cartes, remplace le bouton d'avis par une rangée de 5 étoiles ambre pleines et le libellé
« Vous avez noté 5/5 ».

### Artboard 3 — Publier un prompt (ligne active : Mes prompts)
Titre « Publier un nouveau prompt ». En dessous, un indicateur d'étapes horizontal en trois
temps reliés par un fin trait : « 1 Informations » (actif, violet), « 2 Contenu »,
« 3 Visuels ».
Deux colonnes, 60 % / 40 %.
Colonne gauche, le formulaire : champ « Titre du prompt » avec placeholder « ex : Générateur
de fiches produits » ; ligne à deux colonnes avec une liste « Catégorie » et une liste « Outil
IA » affichant une icône ; champ numérique « Prix » suffixé « € » ; grande zone de texte
« Description publique » avec compteur « 0 / 1000 » ; puis un intertitre « Contenu
confidentiel » suivi d'un petit bandeau ambre « Ce texte reste masqué tant qu'un client n'a
pas acheté votre prompt. » ; une haute zone de texte en police monospace intitulée « Texte
brut du prompt » ; une zone de texte « Exemple de résultat » ; puis une zone de dépôt à
bordure pointillée avec icône nuage, le texte « Glissez-déposez votre image de couverture » et
un lien « ou parcourir » ; enfin, sous le libellé « Images de démonstration », une rangée de 3
vignettes carrées avec croix de suppression et une tuile vide « + ».
Colonne droite : panneau collant « Aperçu en direct » montrant la Card Prompt telle qu'elle
apparaîtra dans le catalogue — image de couverture, badge outil IA, titre, avatar et pseudo du
vendeur, étoiles et prix vert « 4,99 € ».
En bas du formulaire, une rangée de boutons alignée à droite : bouton fantôme « Annuler » et
bouton dégradé « Publier mon prompt ».

### Artboard 4 — Gains et versements (ligne active : Gains)
Titre « Gains et versements ».
En haut, une large carte avec un léger halo vert : petit libellé « Solde disponible », le
montant « 145,50 € » en très grand vert gras, une ligne discrète « Mis à jour à l'instant », et
à droite un grand bouton dégradé « Demander un versement ».
En dessous, une rangée de 3 cartes de statistiques : « Revenus totaux — 1 204,00 € », « Ce
mois-ci — 320,50 € », « Versements en attente — 1 ».
Puis une carte « Stripe Connect » en état vérifié : logo Stripe, pastille verte « Vérifié »,
le texte « Compte bancaire se terminant par ****4242 » et un bouton fantôme « Gérer sur
Stripe ».
En bas, une carte « Historique des versements » contenant un tableau aux colonnes « Date de
demande », « Montant », « Statut », « Date de traitement », avec 4 lignes. La colonne
« Statut » utilise des pastilles colorées : une verte « Traité », une bleue « En cours », une
ambre « En attente », une rouge « Échoué ».

### Artboard 5 — Profil (ligne active : Profil)
Titre « Mon profil public », sous-titre « Ces informations sont visibles par tous les
visiteurs. »
Deux colonnes, 60 % / 40 %.
Colonne gauche : bloc avatar avec un aperçu circulaire de 96 px, un bouton contour « Changer
l'avatar » et un lien rouge discret « Supprimer » ; champ « Nom d'utilisateur » ; zone de
texte « Biographie » avec compteur « 0 / 500 » ; puis un intertitre « Réseaux sociaux » suivi
d'une liste dynamique de 3 lignes, chaque ligne combinant une liste déroulante de plateforme
(Site web, Twitter/X, Instagram, GitHub, LinkedIn, YouTube, TikTok, Discord), un champ URL et
un bouton corbeille ; sous la liste, un bouton fantôme « + Ajouter un lien ».
Colonne droite : panneau collant « Aperçu public » montrant le rendu du profil — bannière
dégradée, avatar, pseudo, biographie, rangée d'icônes de réseaux sociaux, et trois
statistiques « 8 prompts », « 54 ventes », « 4,9 ★ ».
En bas du formulaire, une rangée de boutons alignée à droite : bouton fantôme « Voir mon
profil public » et bouton dégradé « Enregistrer les modifications ».
```

---

## LOT 5 — Back-office administrateur (3 artboards)

```
Crée un canvas de 3 artboards desktop (1440 px de large) pour PromptVerse, marketplace
française de prompts IA. C'est le back-office réservé aux administrateurs.

## Langue et formats
Interface entièrement en français. Montants au format français : symbole après le nombre,
virgule décimale, espace comme séparateur de milliers — « 145,50 € », « 12 480,00 € ». Jamais
de dollars. Dates au format 04/08/2026.

## Design system
Dark mode uniquement, aucune variante claire.
- Fond principal : #090D16
- Surfaces, cartes et tableaux : #121827, bordure 1px #1F293D, rayon 12px
- Accent : dégradé 135° de #7C3AED vers #2563EB
- Vert : #10B981 — Ambre : #F59E0B — Rouge : #EF4444
- Texte principal : #F9FAFB — Texte secondaire : #9CA3AF
- Typo : Inter
Style : panneau d'administration moderne et épuré, volontairement plus sobre et plus dense que
l'espace utilisateur.

## Gabarit commun aux 3 artboards
Barre latérale gauche fixe de 260 px, au style plus sombre et plus sobre que celle de l'espace
utilisateur. En haut, le logo PromptVerse suivi d'une petite étiquette rouge « ADMIN ». Puis le
menu : « Statistiques », « Utilisateurs », « Modération des prompts », « Catégories »,
« Outils IA », « Commandes », « Versements ». En bas, un bloc administrateur et un lien
« ← Retour au site ». Barre du haut avec le titre de la page à gauche et une pastille de rôle
rouge-violet « SUPER_ADMIN » à droite.

## Artboards à produire

### Artboard 1 — Statistiques (ligne active : Statistiques)
Titre « Statistiques de la plateforme ».
Rangée de 5 cartes d'indicateurs avec icône, libellé et grand nombre : « Utilisateurs — 1 240 »,
« Prompts publiés — 3 812 », « Commandes payées — 5 604 », « Chiffre d'affaires — 12 480,00 € »
(en vert), « Versements en attente — 7 » (en ambre).
En dessous, deux colonnes : à gauche une grande carte « Chiffre d'affaires par mois » avec un
histogramme à barres dégradées violet-bleu ; à droite une carte « Inscriptions par jour » avec
une courbe d'aire.
Puis une nouvelle rangée de deux cartes : « Top 5 catégories » sous forme de liste avec barres
de progression horizontales, et « Top 5 vendeurs » sous forme de liste avec avatar, pseudo et
montant en vert.
Tout en bas, une carte « Dernières actions » listant 5 lignes horodatées.

### Artboard 2 — Gestion des utilisateurs (ligne active : Utilisateurs)
Titre « Gestion des utilisateurs ».
Rangée de 4 cartes compactes : « Utilisateurs totaux — 1 240 », « Actifs — 1 180 », « En
attente — 48 », « Bannis — 12 ».
Barre d'outils : champ de recherche « Rechercher par nom d'utilisateur ou email » à gauche ; à
droite deux listes déroulantes « Tous les rôles » et « Tous les statuts », et un bouton
fantôme « Exporter ».
Large tableau de données avec en-tête et 8 lignes. Colonnes : case à cocher, « Utilisateur »,
« Rôle », « Statut », « Inscription », « Dernière connexion », « Prompts », « Solde »,
« Actions ». La cellule « Utilisateur » montre un petit avatar rond et le pseudo empilé
au-dessus de l'email en texte atténué. La colonne « Rôle » utilise des pastilles : grise
« USER », violette « ADMIN », rouge « SUPER_ADMIN ». La colonne « Statut » utilise des
pastilles : verte « Actif », ambre « En attente », rouge « Banni ». La colonne « Solde »
affiche des montants en vert comme « 145,50 € ». La colonne « Actions » affiche un bouton à
trois points. Les lignes alternent avec un fond très légèrement plus clair.
En bas du tableau, « 8 utilisateurs sur 1 240 » à gauche et une pagination numérotée avec
« Précédent » et « Suivant » à droite.

### Artboard 3 — Modération des prompts (ligne active : Modération des prompts)
Titre « Modération des prompts ». Deux onglets au-dessus du tableau : « Publiés » (actif) et
« Archivés », avec un compteur entre parenthèses sur chacun.
Barre d'outils : champ « Rechercher un prompt » à gauche ; à droite deux listes déroulantes
« Toutes les catégories » et « Tous les outils IA ».
Large tableau avec en-tête et 8 lignes. Colonnes : case à cocher, « Prompt » (miniature 16:9
de 64 px suivie du titre en gras au-dessus du slug en texte atténué), « Vendeur » (avatar +
pseudo), « Catégorie » (pastille), « Outil IA » (pastille avec icône), « Prix » (en vert),
« Ventes », « Statut » (pastille verte « Publié » ou grise « Archivé »), « Publié le », et
« Actions » avec trois petits boutons icônes — œil pour prévisualiser, archive pour masquer,
trois points pour le reste.
Sur le côté droit de l'artboard, superpose un panneau latéral de prévisualisation ouvert,
occupant 480 px, avec un fond assombri sur le reste de la page. Le panneau contient : titre
« Aperçu du prompt », une croix de fermeture, l'image de couverture, le titre, le vendeur, la
description, l'exemple de résultat, puis une section « Contenu confidentiel » affichant cette
fois le texte brut EN CLAIR dans une carte monospace avec une bordure ambre et l'étiquette
« Visible uniquement par les administrateurs ». En bas du panneau, un bouton rouge « Archiver
ce prompt » et un bouton fantôme « Fermer ».
```

---

## Après les 5 lots

Écrans restants à traiter sur le même modèle, en réutilisant le préambule du lot le plus
proche :

- **Public** : Catégories, Catégorie détail, Outils IA, Outil IA détail, Profil créateur
  public, Pages légales, 404
- **Utilisateur** : Commandes, Mes prompts en vente, Modifier un prompt, Mes ventes, Favoris,
  Mes avis, Paramètres
- **Admin** : Catégories, Outils IA, Commandes, Versements

Détail fonctionnel de chacun : `docs/frontend_pages_spec.md`, section 6.

## Déclinaison mobile

Dans la même conversation Claude Design, une fois un canvas validé :

```
Ajoute au canvas les versions mobiles (375 px de large) des artboards 1, 2 et 3. Garde
exactement les mêmes couleurs, typographies, composants et libellés français. Transforme la
barre latérale en barre d'onglets basse avec icônes, place les filtres dans une feuille
inférieure ouverte par un bouton « Filtres », et passe les grilles en une seule colonne.
```

À faire en priorité pour le lot 1 (Accueil, Catalogue, Fiche prompt) et le panier du lot 3.
