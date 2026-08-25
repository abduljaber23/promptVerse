# PromptVerse — Prompts prêts à coller dans Google Stitch (interface en français)

> **Mode d'emploi** : un prompt = une génération = un écran. Colle un bloc entier (le bloc STYLE
> est inclus dans chaque prompt, ne l'enlève pas). Ensuite, itère dans le chat Stitch.
>
> **Pourquoi les consignes sont en anglais** : Stitch suit beaucoup mieux les instructions de
> mise en page en anglais. Tous les textes affichés dans la maquette sont en français, entre
> guillemets, avec la consigne `Do not translate the quoted labels`. Ne traduis pas les
> consignes — traduis seulement les libellés si tu veux les changer.
>
> **Format monétaire** : convention française, symbole après le nombre et virgule décimale
> (`3,99 €`). C'est rappelé dans chaque bloc STYLE.
>
> **Ordre conseillé** : S01 (Accueil) → S03 (Fiche prompt, l'écran métier clé) → S02 → le reste.

---

## Bloc STYLE (déjà inclus dans chaque prompt)

```
LANGUAGE: every visible text in the interface must be in FRENCH. Use exactly the quoted
French labels given above. Do not translate them to English.

Dark mode only. Background #090D16, cards and surfaces #121827 with 1px borders #1F293D
and 12px rounded corners. Primary buttons use a violet-to-blue gradient (#7C3AED to #2563EB)
with a soft glow. Prices and success states in emerald green #10B981, always formatted the
French way with the euro symbol AFTER the number and a comma decimal separator (3,99 €),
never dollars. Primary text #F9FAFB, secondary text #9CA3AF. Font: Inter, bold headings.
Monospace font (JetBrains Mono) for any prompt/code text. Modern premium marketplace look,
similar to Vercel or PromptBase. Generous spacing, subtle glassmorphism on overlays.
```

---

## S01 · Accueil (web desktop)

```
Design a desktop web homepage for "PromptVerse", a French marketplace where people buy and
sell AI prompts for ChatGPT, Midjourney, DALL-E and Claude.

Top navigation bar: logo "PromptVerse" on the left, then nav links "Catalogue", "Catégories",
"Outils IA", then a search input in the center with a magnifier icon and the placeholder
"Rechercher un prompt", then on the right a heart icon, a cart icon with a small violet badge
showing "3", an outlined button "Vendre un prompt", and a gradient button "Se connecter".

Hero section with a large violet-to-blue radial glow: a small pill badge "Plus de 10 000
prompts premium", a big headline on two lines "Les meilleurs prompts IA" then "pour booster
votre productivité" with the second line in a violet-to-blue gradient, a subtitle "Découvrez,
achetez et vendez des prompts de qualité pour ChatGPT, Midjourney, DALL-E et bien plus.", and
a large rounded search bar with a magnifier icon, the placeholder "Rechercher un prompt
(ex : SEO, logo 3D...)" and a gradient button "Explorer" inside it on the right.

Below the hero, a horizontal row of pill-shaped filter chips with small logos: "ChatGPT",
"Midjourney", "DALL-E 3", "Claude", "Stable Diffusion".

Section titled "Prompts tendances" with the subtitle "Les prompts les plus populaires cette
semaine" on the left and a link "Voir tout" on the right. Below, a 4-column grid of 8 product
cards on 2 rows. Each card has: a 16:9 cover image, a small AI tool badge with icon in the
top-left of the image, a heart icon in the top-right corner of the image, a two-line title in
French, a row with a small round seller avatar and "@arch_ai", a star rating "4,9 (120)", and
a bottom row with the price in green ("3,99 €") on the LEFT and a small gradient button
"Ajouter au panier" with a cart icon on the RIGHT, both on the same line.

Section "Parcourir par catégorie" with a 6-column grid of small tiles, each with a colored
icon, a category name and a prompt count: "Marketing / 2,4k prompts", "Code / 1,8k prompts",
"Art / 5,1k prompts", "Rédaction / 3,2k prompts", "Business / 1,5k prompts", "Vidéo /
800+ prompts".

A "Devenez vendeur" banner with a violet gradient background: on the left the headline
"Transformez votre prompt engineering en revenus passifs.", a paragraph "Rejoignez des
milliers de créateurs qui monétisent leur savoir-faire. Ouvrez votre boutique en quelques
minutes." and a gradient button "Commencer à vendre"; on the right three numbered rows
"1 Publiez / Mettez en ligne vos prompts testés", "2 Vendez / Touchez des acheteurs qualifiés",
"3 Encaissez / Recevez vos versements directement".

Footer with the logo, the line "© 2026 PromptVerse. Tous droits réservés." and 3 link columns:
"Plateforme" (Catalogue, Catégories, Outils IA), "Légal" (Conditions d'utilisation, Politique
de confidentialité, Mentions légales), "Communauté" (Contacter le support, Discord).

LANGUAGE: every visible text in the interface must be in FRENCH. Use exactly the quoted French
labels given above. Do not translate them to English.

Dark mode only. Background #090D16, cards and surfaces #121827 with 1px borders #1F293D and
12px rounded corners. Primary buttons use a violet-to-blue gradient (#7C3AED to #2563EB) with
a soft glow. Prices in emerald green #10B981, always formatted the French way with the euro
symbol AFTER the number and a comma decimal separator (3,99 €), never dollars. Primary text
#F9FAFB, secondary text #9CA3AF. Font: Inter, bold headings. Modern premium marketplace look
similar to Vercel or PromptBase.
```

---

## S02 · Catalogue (web desktop)

```
Design a desktop web catalog page for "PromptVerse", a French AI prompt marketplace.

Same top navigation bar as the homepage (logo, "Catalogue", "Catégories", "Outils IA", search
input with placeholder "Rechercher un prompt", heart icon, cart icon with a badge, outlined
button "Vendre un prompt", user avatar).

Two-column layout. Left sidebar, 280px wide, sticky, titled "Filtres", containing filter
groups separated by thin dividers: a search input with placeholder "Mot-clé"; a group
"Catégories" with checkboxes "Marketing", "Code & Dev", "Art & Design", "Rédaction",
"Business", "Vidéo"; a group "Outil IA" with radio buttons "Tous", "ChatGPT", "Midjourney",
"DALL-E 3", "Claude", "Stable Diffusion"; a group "Prix" with a range slider and two number
inputs labelled "Min" and "Max" with a € suffix; a group "Note minimum" with clickable star
rows; and a ghost button "Réinitialiser les filtres".

Right content area: a header row with "128 prompts trouvés" in bold on the left and, on the
right, a dropdown "Trier par : Les plus populaires" plus a small grid/list view toggle. Below
it, a 3-column grid of 9 product cards. Each card has a 16:9 cover image, an AI tool badge in
the top-left of the image, a heart icon in the top-right, a two-line French title, a seller
avatar with "@copy_ninja", a star rating "4,8 (85)", and a bottom row with a green price
"5,50 €" on the left and a small gradient button "Ajouter au panier" on the right.
At the bottom, a centered numbered pagination with the labels "Précédent" and "Suivant".

LANGUAGE: every visible text in the interface must be in FRENCH. Use exactly the quoted French
labels given above. Do not translate them to English.

Dark mode only. Background #090D16, cards and surfaces #121827 with 1px borders #1F293D and
12px rounded corners. Primary buttons use a violet-to-blue gradient (#7C3AED to #2563EB).
Prices in emerald green #10B981, formatted the French way with the euro symbol AFTER the
number and a comma decimal separator (5,50 €), never dollars. Primary text #F9FAFB, secondary
text #9CA3AF. Font: Inter. Modern premium marketplace look similar to Vercel or PromptBase.
```

---

## S03 · Fiche prompt (web desktop) — écran clé

```
Design a desktop web product detail page for a single AI prompt on "PromptVerse", a French AI
prompt marketplace.

Top navigation bar as before. Below it a breadcrumb "Accueil / Marketing / Rédacteur expert
SEO" with two badges: a category badge "Marketing" and an AI tool badge "ChatGPT" with its icon.

Two-column layout, 65% / 35%.

Left column: a large H1 "Rédacteur expert SEO pour articles de blog 2026"; a seller row with a
round avatar, "@AlexCreator", a star rating "4,9" and the text "54 ventes"; an image gallery
with one large 16:9 preview image and a row of 4 small clickable thumbnails below it; a
section "Description" with two paragraphs of French text; a section titled "Exemple de
résultat obtenu" showing a bordered card with monospace French text on a slightly darker
background.

Then the most important element: a section titled "Le prompt exact" showing a LOCKED card. The
card contains blurred monospace text, a large padlock icon centered on top of it, the message
"Contenu verrouillé — achetez ce prompt pour débloquer le texte exact." and a gradient button
"Débloquer le prompt".

Below, a section "Avis" : on the left a big average score "4,9" with 5 stars and the text
"54 avis", on the right a histogram of 5 horizontal bars labelled 5 to 1. Then a list of 3
review cards, each with avatar, username, star row, date and a French comment.

Right column: a sticky purchase card with a thin gradient border. It contains the price
"4,99 €" in large emerald green text, a full-width gradient button "Ajouter au panier", a
full-width outlined button "Acheter maintenant", an outlined button "Ajouter aux favoris" with
a heart icon, a thin divider, and three small reassurance rows with icons: "Accès immédiat au
prompt", "Paiement sécurisé par Stripe", "Compatible ChatGPT".

LANGUAGE: every visible text in the interface must be in FRENCH. Use exactly the quoted French
labels given above. Do not translate them to English.

Dark mode only. Background #090D16, cards and surfaces #121827 with 1px borders #1F293D and
12px rounded corners. Primary buttons use a violet-to-blue gradient (#7C3AED to #2563EB).
Prices in emerald green #10B981, formatted the French way with the euro symbol AFTER the
number and a comma decimal separator (4,99 €), never dollars. Primary text #F9FAFB, secondary
text #9CA3AF. Font: Inter, JetBrains Mono for the prompt and result text. Modern premium
marketplace look.
```

---

## S04 · Connexion (web desktop)

```
Design a desktop web sign-in page for "PromptVerse", a French AI prompt marketplace.

Split screen. Left half: a centered card, 420px wide, with a subtle glassmorphism effect,
floating on the dark background. The card contains the "PromptVerse" logo, an H1 "Bon retour
parmi vous", a subtitle "Connectez-vous pour accéder à vos prompts", an input labelled
"Adresse email" with a mail icon, an input labelled "Mot de passe" with a lock icon and an eye
toggle on the right, a row with a checkbox "Se souvenir de moi" on the left and a link "Mot de
passe oublié ?" on the right, a full-width gradient button "Se connecter", and at the bottom
the line "Pas encore de compte ? Créer un compte" with "Créer un compte" as a violet link.

Right half: a decorative panel filled with a violet-to-blue gradient mesh glow, showing 3
floating prompt cards at slight angles with a blur, and a short French testimonial quote
overlay signed "— Marie L., créatrice".

LANGUAGE: every visible text in the interface must be in FRENCH. Use exactly the quoted French
labels given above. Do not translate them to English.

Dark mode only. Background #090D16, card surface #121827 with 1px border #1F293D and 16px
rounded corners. The primary button uses a violet-to-blue gradient (#7C3AED to #2563EB) with a
soft glow. Primary text #F9FAFB, secondary text #9CA3AF. Font: Inter, bold heading. Modern
premium look similar to Vercel.
```

---

## S05 · Inscription (web desktop)

```
Design a desktop web sign-up page for "PromptVerse", a French AI prompt marketplace.

Same split-screen layout as the sign-in page. Left half: a centered 420px card with
glassmorphism containing the "PromptVerse" logo, an H1 "Créer votre compte", a subtitle
"Achetez et vendez des prompts IA", an input "Nom d'utilisateur" with a user icon, an input
"Adresse email" with a mail icon, an input "Mot de passe" with a lock icon and an eye toggle,
a thin horizontal password-strength meter with 4 segments where 3 are filled in green and the
label "Fort", an input "Confirmer le mot de passe", a checkbox row "J'accepte les conditions
d'utilisation et la politique de confidentialité", a full-width gradient button "Créer mon
compte", and at the bottom "Vous avez déjà un compte ? Se connecter".

Right half: a decorative panel with a violet-to-blue gradient mesh glow and three benefit rows
with green check icons: "Accès instantané à vos prompts achetés", "Vendez vos propres prompts",
"Versements sécurisés via Stripe".

LANGUAGE: every visible text in the interface must be in FRENCH. Use exactly the quoted French
labels given above. Do not translate them to English.

Dark mode only. Background #090D16, card surface #121827 with 1px border #1F293D and 16px
rounded corners. Gradient primary button (#7C3AED to #2563EB), green #10B981 for the strength
meter and check icons. Primary text #F9FAFB, secondary text #9CA3AF. Font: Inter.
```

---

## S06 · Panier (web desktop)

```
Design a desktop web shopping cart page for "PromptVerse", a French AI prompt marketplace.

Top navigation bar as before. An H1 "Votre panier" with the subtitle "3 prompts".

Two-column layout, 65% / 35%.

Left column: a vertical list of 3 cart line items, each a horizontal card containing a 120px
wide 16:9 thumbnail on the left, then the French prompt title in bold, an AI tool badge with
icon below it, a small seller row "par @AlexCreator", and on the right side the price in
emerald green ("4,99 €") plus a small trash icon button. Below the list, a ghost link
"Continuer mes achats" with a left arrow.

Right column: a sticky order summary card headed "Récapitulatif", with a row "Sous-total
15,97 €", a thin divider, a bold row "Total 15,97 €" with the total in large emerald green, a
full-width gradient button "Payer avec Stripe" with a lock icon, and below it a small centered
line "Paiement sécurisé par Stripe" with card brand logos, plus a small row "Accès immédiat
après paiement" with a lightning icon.

LANGUAGE: every visible text in the interface must be in FRENCH. Use exactly the quoted French
labels given above. Do not translate them to English.

Dark mode only. Background #090D16, cards #121827 with 1px borders #1F293D and 12px rounded
corners. Gradient primary button (#7C3AED to #2563EB). Prices in emerald green #10B981,
formatted the French way with the euro symbol AFTER the number and a comma decimal separator
(15,97 €), never dollars. Primary text #F9FAFB, secondary text #9CA3AF. Font: Inter.
```

---

## S07 · Paiement réussi (web desktop)

```
Design a desktop web payment success page for "PromptVerse", a French AI prompt marketplace.

Minimal top navigation bar with just the logo and a user avatar.

Centered content, max width 720px. At the top, a large circular emerald green badge with a
white check mark inside, surrounded by a soft green glow. Below it an H1 "Paiement confirmé",
then a subtitle "Vos prompts sont débloqués et disponibles dès maintenant".

Below, a card titled "Vos nouveaux prompts" containing 2 horizontal rows, each with a small
16:9 thumbnail, the French prompt title, an AI tool badge, and on the right a small outlined
button "Voir le prompt".

Below the card, a summary line "Commande n° PV-2026-0042 — 15,97 € payés", then a full-width
gradient button "Accéder à ma bibliothèque" and a ghost button "Retour au catalogue".

At the bottom, a small muted line "Un reçu vous a été envoyé par email."

LANGUAGE: every visible text in the interface must be in FRENCH. Use exactly the quoted French
labels given above. Do not translate them to English.

Dark mode only. Background #090D16, cards #121827 with 1px borders #1F293D and 12px rounded
corners. Gradient primary button (#7C3AED to #2563EB). Success green #10B981, amounts
formatted the French way with the euro symbol AFTER the number and a comma decimal separator
(15,97 €), never dollars. Primary text #F9FAFB, secondary text #9CA3AF. Font: Inter.
```

---

## S08 · Dashboard — vue d'ensemble (web desktop)

```
Design a desktop web dashboard overview page for "PromptVerse", a French AI prompt
marketplace, seen by a user who both buys and sells prompts.

Layout: a fixed 260px left sidebar plus a main content area.

Sidebar: the "PromptVerse" logo at the top, then a vertical navigation menu with an icon and a
French label per row: "Vue d'ensemble" (active, highlighted with a violet gradient background
and a left accent bar), "Ma bibliothèque", "Commandes", "Mes prompts", "Mes ventes", "Gains",
"Favoris", "Avis", "Profil", "Paramètres". At the bottom, a user block with avatar, the name
"Alex Martin", and a logout icon with the label "Déconnexion".

Main area: a top bar with an H1 "Bon retour, Alex", a search input and a bell icon on the
right. Then a row of 4 KPI cards, each with a small colored icon, a label, a large number and
a small green percentage change: "Prompts achetés — 12", "Prompts publiés — 8", "Ventes
totales — 54", "Solde disponible — 145,50 €" (this last value in emerald green).

Below, a two-column row: on the left a large card titled "Ventes des 30 derniers jours"
containing an area line chart with a violet-to-blue gradient fill under the curve; on the
right a card titled "Activité récente" with a vertical list of 5 rows, each with a small icon,
a French text such as "Nouvelle vente — Rédacteur expert SEO" or "Nouvel avis 5 étoiles", and
a relative timestamp such as "il y a 2 h".

At the bottom, an alert banner with an amber left border and a warning icon: "Terminez la
configuration de Stripe Connect pour recevoir vos versements." with a small button
"Configurer" on the right.

LANGUAGE: every visible text in the interface must be in FRENCH. Use exactly the quoted French
labels given above. Do not translate them to English.

Dark mode only. Background #090D16, cards #121827 with 1px borders #1F293D and 12px rounded
corners. Gradient accents (#7C3AED to #2563EB). Green #10B981 for money values, formatted the
French way with the euro symbol AFTER the number and a comma decimal separator (145,50 €),
never dollars. Amber #F59E0B for the alert. Primary text #F9FAFB, secondary text #9CA3AF.
Font: Inter. Clean modern SaaS dashboard look.
```

---

## S09 · Ma bibliothèque — prompts achetés (web desktop)

```
Design a desktop web "Ma bibliothèque" page inside the "PromptVerse" dashboard, listing the AI
prompts a French user has purchased.

Same 260px left sidebar as the dashboard ("Vue d'ensemble", "Ma bibliothèque" highlighted as
active, "Commandes", "Mes prompts", "Mes ventes", "Gains", "Favoris", "Avis", "Profil",
"Paramètres"), with the logo on top and a user block at the bottom.

Main area: an H1 "Ma bibliothèque" with the subtitle "12 prompts achetés". Below it a toolbar
with a search input with the placeholder "Rechercher dans mes prompts" on the left and a
dropdown "Tous les outils IA" on the right.

Then a vertical list of 5 horizontal cards. Each card contains: a 160px wide 16:9 thumbnail on
the left; in the middle the French prompt title in bold, an AI tool badge with icon, a line
"par @AlexCreator", and a muted line "Acheté le 04/08/2026"; on the right a vertical stack of
three buttons: a gradient button "Afficher le prompt" with an eye icon, an outlined button
"Laisser un avis" with a star icon, and a ghost button "Voir la fiche". One of the cards
instead shows a row of 5 filled amber stars with the label "Vous avez noté 5/5" in place of
the review button.

LANGUAGE: every visible text in the interface must be in FRENCH. Use exactly the quoted French
labels given above. Do not translate them to English.

Dark mode only. Background #090D16, cards #121827 with 1px borders #1F293D and 12px rounded
corners. Gradient primary buttons (#7C3AED to #2563EB). Star icons in amber. Primary text
#F9FAFB, secondary text #9CA3AF. Font: Inter.
```

---

## S10 · Publier un prompt (web desktop)

```
Design a desktop web "Publier un prompt" form page inside the "PromptVerse" dashboard, where a
French seller creates a new AI prompt listing.

Same 260px left sidebar as the dashboard, with "Mes prompts" highlighted as active.

Main area: an H1 "Publier un nouveau prompt". Below it a horizontal 3-step progress stepper:
"1 Informations" (active, violet), "2 Contenu", "3 Visuels", connected by a thin line.

Two-column layout, 60% / 40%.

Left column, the form: a text input labelled "Titre du prompt" with the placeholder
"ex : Générateur de fiches produits"; a two-column row with a select "Catégorie" and a select
"Outil IA" showing a small icon; a number input "Prix" with a € suffix; a large textarea
"Description publique" with a character counter "0 / 1000"; then a section header "Contenu
confidentiel" with a small amber info banner "Ce texte reste masqué tant qu'un client n'a pas
acheté votre prompt."; a tall monospace textarea labelled "Texte brut du prompt"; a textarea
labelled "Exemple de résultat"; then a drag-and-drop upload zone with a dashed border and a
cloud icon with the text "Glissez-déposez votre image de couverture" and a link "ou
parcourir", and below it, under the label "Images de démonstration", a row of 3 small square
image thumbnails with delete crosses plus an empty "+" tile.

Right column: a sticky panel titled "Aperçu en direct" showing exactly how the prompt card
will look in the catalogue: cover image, AI tool badge, title, seller avatar and username,
star rating and green price "4,99 €".

At the bottom of the form, a right-aligned button row: a ghost button "Annuler" and a gradient
button "Publier mon prompt".

LANGUAGE: every visible text in the interface must be in FRENCH. Use exactly the quoted French
labels given above. Do not translate them to English.

Dark mode only. Background #090D16, cards #121827 with 1px borders #1F293D and 12px rounded
corners. Gradient primary button and active stepper (#7C3AED to #2563EB). Amber #F59E0B for
the info banner. Green #10B981 for the price, formatted the French way with the euro symbol
AFTER the number and a comma decimal separator (4,99 €), never dollars. Primary text #F9FAFB,
secondary text #9CA3AF. Font: Inter, JetBrains Mono for the raw prompt textarea.
```

---

## S11 · Gains & versements Stripe Connect (web desktop)

```
Design a desktop web "Gains" page inside the "PromptVerse" dashboard, where a French seller
sees their balance and requests payouts.

Same 260px left sidebar as the dashboard, with "Gains" highlighted as active.

Main area: an H1 "Gains et versements".

At the top, a wide hero card with a subtle green glow: a small label "Solde disponible", the
amount "145,50 €" in very large emerald green bold text, a muted line "Mis à jour à
l'instant", and on the right a large gradient button "Demander un versement".

Below, a row of 3 smaller stat cards: "Revenus totaux — 1 204,00 €", "Ce mois-ci — 320,50 €",
"Versements en attente — 1".

Below that, a card titled "Stripe Connect" showing a verified state: the Stripe logo, a green
pill badge "Vérifié", the text "Compte bancaire se terminant par ****4242", and a ghost button
"Gérer sur Stripe".

At the bottom, a card titled "Historique des versements" containing a table with the columns
"Date de demande", "Montant", "Statut", "Date de traitement", and 4 rows. The "Statut" column
uses colored pill badges: one green "Traité", one blue "En cours", one amber "En attente", one
red "Échoué".

LANGUAGE: every visible text in the interface must be in FRENCH. Use exactly the quoted French
labels given above. Do not translate them to English.

Dark mode only. Background #090D16, cards #121827 with 1px borders #1F293D and 12px rounded
corners. Gradient primary button (#7C3AED to #2563EB). Money and success in emerald green
#10B981, all amounts formatted the French way with the euro symbol AFTER the number, a comma
decimal separator and a space as thousands separator (1 204,00 €), never dollars. Amber
#F59E0B and red #EF4444 for the other statuses. Primary text #F9FAFB, secondary text #9CA3AF.
Font: Inter. Clean modern SaaS dashboard look.
```

---

## S12 · Admin — gestion des utilisateurs (web desktop)

```
Design a desktop web admin back-office page for "PromptVerse", a French AI prompt marketplace,
used to manage users.

Layout: a fixed 260px left sidebar with a darker, more sober style than the user dashboard.
The sidebar shows the "PromptVerse" logo with a small red tag "ADMIN" next to it, then
navigation rows: "Statistiques", "Utilisateurs" (active, highlighted), "Modération des
prompts", "Catégories", "Outils IA", "Commandes", "Versements". At the bottom, an admin user
block and a link "Retour au site".

Main area: a top bar with an H1 "Gestion des utilisateurs" and a red-violet role badge
"SUPER_ADMIN" on the right. Below, a row of 4 compact stat cards: "Utilisateurs totaux —
1 240", "Actifs — 1 180", "En attente — 48", "Bannis — 12".

Then a toolbar: a search input with the placeholder "Rechercher par nom d'utilisateur ou
email" on the left, and on the right two dropdowns "Tous les rôles" and "Tous les statuts",
plus a ghost button "Exporter".

Then a wide data table with a header row and 8 data rows. Column headers: a checkbox,
"Utilisateur", "Rôle", "Statut", "Inscription", "Dernière connexion", "Prompts", "Solde",
"Actions". The "Utilisateur" cell shows a small round avatar plus the username stacked over
the email in muted text. The "Rôle" cell uses pill badges: grey "USER", violet "ADMIN", red
"SUPER_ADMIN". The "Statut" cell uses pill badges: green "Actif", amber "En attente", red
"Banni". The "Solde" cell shows amounts in green such as "145,50 €". The "Actions" cell shows
a three-dot icon button. Alternate rows have a very slightly lighter background.

At the bottom of the table, a row showing "8 utilisateurs sur 1 240" on the left and numbered
pagination with "Précédent" and "Suivant" on the right.

LANGUAGE: every visible text in the interface must be in FRENCH. Use exactly the quoted French
labels given above. Do not translate them to English.

Dark mode only. Background #090D16, cards and table surface #121827 with 1px borders #1F293D
and 12px rounded corners. Accent gradient (#7C3AED to #2563EB), green #10B981 with balances
formatted the French way with the euro symbol AFTER the number and a comma decimal separator
(145,50 €) never dollars, amber #F59E0B, red #EF4444 for badges. Primary text #F9FAFB,
secondary text #9CA3AF. Font: Inter. Clean modern admin panel look.
```

---

## Corriger une maquette déjà générée en anglais

Si tu as déjà généré un écran en anglais, ne recommence pas de zéro — colle ceci dans le chat
Stitch de cette maquette :

```
Keep the exact same layout, spacing, colors and components. Translate every visible text of
the interface into French. Use these exact labels: "Catalogue", "Catégories", "Outils IA",
"Vendre un prompt", "Se connecter", "Rechercher un prompt", "Explorer", "Prompts tendances",
"Voir tout", "Ajouter au panier", "Parcourir par catégorie", "Marketing", "Code", "Art",
"Rédaction", "Business", "Vidéo", "Commencer à vendre", "Publiez", "Vendez", "Encaissez",
"Plateforme", "Légal", "Communauté", "Conditions d'utilisation", "Politique de
confidentialité", "Mentions légales", "Contacter le support", "© 2026 PromptVerse. Tous droits
réservés."

Also change every price from dollars to euros formatted the French way, with the euro symbol
AFTER the number and a comma as decimal separator: "3,99 €" instead of "$3.99".
```

---

## Déclinaisons mobile

Reste dans la même conversation Stitch que l'écran desktop et colle :

```
Now show this same screen as a mobile app screen, 375px wide. Keep the exact same colors,
fonts, components and French labels. Collapse the left sidebar into a bottom tab bar with
icons, move the filters into a bottom sheet opened by a button labelled "Filtres", and stack
the grid into a single column.
```

À décliner en priorité pour : S01 Accueil, S02 Catalogue, S03 Fiche prompt, S06 Panier,
S04 Connexion, S09 Ma bibliothèque, S10 Publier un prompt.

---

## Écrans restants (à générer sur le même modèle)

Catégories, Catégorie détail, Outils IA, Outil IA détail, Profil créateur public, Paiement
annulé, Pages légales, 404, Vérification email, Mot de passe oublié, Réinitialisation,
Commandes, Mes prompts en vente, Modifier un prompt, Mes ventes, Favoris, Mes avis, Profil,
Paramètres, Admin statistiques, Admin modération prompts, Admin catégories, Admin outils IA,
Admin commandes, Admin versements.

Voir `docs/frontend_pages_spec.md` pour le détail de chacun.
