# Fiches de code — client/src/common

## api/client.ts

Rôle : instance axios partagée (`withCredentials: true`, indispensable car l'API pose un cookie httpOnly). Intercepteur de réponse : sur une 401, réinitialise le store d'auth pour rediriger vers login (l'erreur reste propagée). Expose aussi `API_BASE_URL` (pour construire des URLs de fichiers).

## api/auth.api.ts, users.api.ts, catalog.api.ts, prompts.api.ts, purchases.api.ts, admin.api.ts

Rôle : une fonction par endpoint de l'API NestJS, regroupées par domaine (chaque fichier = un module backend). `prompts.api.ts` et `users.api.ts` construisent un `FormData` pour les uploads (création de prompt, avatar). Toutes typées avec les interfaces de `common/types/index.ts`.

## constants/query-keys.ts

Rôle : dictionnaire centralisé des clés React Query (une seule source de vérité pour l'invalidation du cache après une mutation).

## constants/roles.ts

Rôle : `UserRole`, `UserStatus`, `PromptStatus` en objets `as const` (les enums TypeScript sont interdits par la config `erasableSyntaxOnly` du projet), plus `ADMIN_ROLES`.

## lib/api-error.ts

Rôle : traduit les codes d'erreur métier renvoyés par l'API (les mêmes que `common/errors/error-codes.ts` côté backend) en messages français lisibles pour l'utilisateur (`getApiErrorMessage`), avec repli sur `error.message` ou un message générique.

## lib/assets.ts

Rôle : `resolveAssetUrl`, transforme une clé de stockage (`avatars/xxx.png`) en URL complète vers `GET /uploads/:folder/:filename` (le `StorageController` de l'API).

## lib/cn.ts

Rôle : wrapper mince autour de `clsx` pour concaténer des classes Tailwind conditionnelles.

## lib/format.ts

Rôle : formatage d'affichage : prix en euros (`formatPrice`, `formatPromptPrice` avec "Gratuit" à 0), date en français, note sur 5 (`formatRating`, "Nouveau" si aucune note), nombres compacts (`formatCount`, 1200 → "1,2 k"), initiales d'un nom.

## store/auth.store.ts

Rôle : store Zustand exposant la session courante (`user`, `status`, `isAdmin`) de façon globale et synchrone (routes, navbar, intercepteur axios). Écrit uniquement par `AuthContext.tsx`.

## store/toast.store.ts

Rôle : store Zustand des notifications transitoires (toasts), avec durée de vie par variante et retrait automatique. Expose un helper impératif `toast.{info,success,warning,error}()` utilisable hors composant React.

## store/ui.store.ts

Rôle : store Zustand persisté (`localStorage`) pour le thème (dark/light) et l'état du menu mobile. Applique le thème sur `<html data-theme>` dès le chargement du module, avant le premier rendu React.

## types/index.ts

Rôle : toutes les interfaces TypeScript partagées côté client (utilisateur, catalogue, prompt, achat, payloads de formulaires), reflétant fidèlement les réponses de l'API (y compris les champs conditionnels comme `promptContent`, absent en liste et nullable en détail).
