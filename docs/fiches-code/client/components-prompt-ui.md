# Fiches de code — client/src/components/prompt et components/ui

## prompt/PromptCard.tsx

Rôle : carte d'un prompt dans une grille (image, badge outil IA, badge "à la une", titre, catégorie, note, prix formaté). Lien vers la page de détail.

## prompt/PromptCardSkeleton.tsx

Rôle : squelette de chargement d'une carte (`PromptCardSkeleton`) et d'une grille entière (`PromptGridSkeleton`).

## prompt/PromptGrid.tsx

Rôle : grille de prompts responsive. Gère les 3 états (chargement → skeleton, vide → `EmptyState`, rempli → `PromptCard` par prompt), résout les noms de catégorie/outil IA via `useCatalogMaps`.

## ui/Alert.tsx

Rôle : bandeau d'alerte à 4 variantes (info/success/warning/error), icône + texte.

## ui/ConfirmDialog.tsx

Rôle : boîte de dialogue de confirmation générique (`<dialog>` natif), utilisée avant une action destructive (ex : archiver une catégorie).

## ui/EmptyState.tsx

Rôle : état vide générique (icône, titre, description, action optionnelle), réutilisé partout où une liste peut être vide.

## ui/FormField.tsx

Rôle : wrapper de champ de formulaire (label, astérisque si requis, message d'erreur ou indice).

## ui/Pagination.tsx

Rôle : pagination simple précédent/suivant (pas de numéros de page), masquée s'il n'y a qu'une page.

## ui/RatingStars.tsx

Rôle : affichage compact d'une note (étoile + valeur formatée + nombre d'avis), grisée si aucune note.

## ui/Spinner.tsx

Rôle : indicateur de chargement (`Spinner`) et variante pleine page centrée (`PageLoader`, utilisé par les gardes de route).

## ui/Thumbnail.tsx

Rôle : image avec repli automatique sur un placeholder (icône + dégradé) si l'URL est absente ou en erreur de chargement.

## ui/Toaster.tsx

Rôle : pile de notifications globale (montée une fois à la racine), lit `useToastStore`, un bouton de fermeture par toast.

## ui/UserAvatar.tsx

Rôle : avatar utilisateur avec repli sur les initiales si pas d'image ou erreur de chargement.
