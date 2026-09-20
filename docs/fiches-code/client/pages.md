# Fiches de code — client/src/pages

## HomePage.tsx

Rôle : page d'accueil. Hero + bande de catégories + bande d'outils IA + grille des 8 prompts les plus récents (`usePromptList(1, 8)`).

## CatalogPage.tsx

Rôle : page catalogue avec filtres (recherche texte débouncée, catégorie, outil IA) synchronisés dans l'URL (`useSearchParams`). L'API n'acceptant qu'un seul filtre serveur à la fois, la page choisit la requête serveur dominante (catégorie ou outil IA) puis affine le second filtre côté client (`useMemo`). Pagination précédent/suivant.

## PromptDetailPage.tsx

Rôle : page de détail d'un prompt. Galerie d'images (cover + previews), affichage conditionnel du contenu payant (`promptContent`) selon `hasAccess` (propriétaire, gratuit, ou déjà acheté), bouton d'achat qui crée une session Stripe Checkout puis redirige (`window.location.href = url`). Gère le 404 spécifiquement (prompt introuvable ou dépublié).

## PurchaseSuccessPage.tsx

Rôle : page de retour après paiement Stripe (`?session_id=...`). Repolle l'achat (`usePurchaseBySessionId`) tant qu'il reste `PENDING` (le webhook Stripe n'a pas encore confirmé), avec un message "ça prend plus de temps que prévu" après 15 secondes et un bouton pour revérifier manuellement. Affiche succès, échec, ou confirmation avec lien vers le prompt.

## NotFoundPage.tsx

Rôle : page 404 générique, lien de retour à l'accueil.

## auth/LoginPage.tsx

Rôle : formulaire de connexion (validation Zod + react-hook-form), redirige vers la page d'origine (`location.state.from`) ou `/dashboard` après connexion.

## auth/RegisterPage.tsx

Rôle : formulaire d'inscription (username, email, mot de passe + confirmation, acceptation des conditions), affiche le message de succès de l'API (email de vérification envoyé) à la place du formulaire une fois soumis.

## auth/ForgotPasswordPage.tsx

Rôle : formulaire de demande de réinitialisation de mot de passe (email), affiche le message neutre renvoyé par l'API (ne révèle pas si l'email existe).

## auth/ResetPasswordPage.tsx

Rôle : lit `id`/`token` depuis l'URL, valide le lien (`useValidateResetLink`) avant d'afficher le formulaire de nouveau mot de passe ; affiche une erreur si le lien est invalide/expiré.

## auth/VerifyEmailPage.tsx

Rôle : lit `id`/`token` depuis l'URL, appelle automatiquement la vérification d'email au montage et affiche le résultat (succès ou erreur).

## admin/AdminUsersPage.tsx

Rôle : tableau des utilisateurs (statut, email vérifié, date d'inscription) avec un sélecteur de rôle par ligne (`useMakeRole`), note que le changement de rôle est réservé au super-admin côté API.

## admin/AdminCategoriesPage.tsx, AdminAiToolsPage.tsx

Rôle : pages fines qui branchent les hooks (`useAdminCategories`/`useCategoryMutations` ou équivalent outils IA) sur le composant générique `CatalogManager`.

## dashboard/DashboardPage.tsx

Rôle : vue d'ensemble du vendeur : statistiques (prompts publiés, ventes cumulées, solde, email vérifié), grille de ses prompts, tableau détaillé des ventes par prompt.

## dashboard/CreatePromptPage.tsx

Rôle : formulaire de publication d'un prompt (titre, catégorie, outil IA, prix borné, contenu exact confidentiel, exemple de résultat optionnel, image de couverture, jusqu'à 10 images de démonstration). Envoie tout en `FormData` via `useCreatePrompt`, redirige vers la page du prompt créé.

## dashboard/MyPurchasesPage.tsx

Rôle : tableau des achats de l'utilisateur (prompt, prix payé, date), état vide avec lien vers le catalogue.

## dashboard/SettingsPage.tsx

Rôle : page de paramètres du compte : changement d'avatar (upload/suppression), formulaire de profil (username, email, bio) pré-rempli et désactivé tant qu'il n'est pas modifié (`isDirty`), et zone de suppression de compte avec confirmation (`ConfirmDialog`).
