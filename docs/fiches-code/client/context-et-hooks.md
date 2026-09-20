# Fiches de code — client/src/context et hooks

## context/AuthContext.tsx

Rôle : gestion de la session utilisateur côté client.

- `AuthBootstrap` : composant monté une seule fois à la racine (dans `main.tsx`), ne rend rien. Appelle `GET /users/me` (source de vérité de l'utilisateur) puis, si connecté, `GET /admin/users/count` comme "sonde de rôle" (200 = admin, 403 = simple user, car `/users/me` ne renvoie pas le rôle). Synchronise le résultat vers le store Zustand `useAuthStore`.
- `useAuth()` : hook de lecture/action de la session (user, statut, isAdmin, `login`/`register`/`logout`/`refetchUser`), lit l'état depuis le store Zustand et invalide les queries React Query concernées après login/logout.

Dépendances : `common/api/{auth,users,admin}.api.ts`, `common/store/auth.store.ts`, React Query.

## hooks/useAdmin.ts

Rôle : hooks React Query pour l'espace admin. Users (`useAdminUsers`, `useMakeRole`), catégories et outils IA (`useAdminCategories`/`useCategoryMutations`, `useAdminAiTools`/`useAiToolMutations`) : chaque mutation (create/update/remove/restore) invalide les listes actives et archivées correspondantes après succès.

## hooks/useAuthFlows.ts

Rôle : hooks pour les écrans d'auth secondaires : `useForgotPassword`, `useResetPassword` (mutations), `useValidateResetLink`/`useVerifyEmail` (queries activées seulement si `userId`+`token` sont présents dans l'URL).

## hooks/useCatalog.ts

Rôle : hooks de lecture du catalogue (catégories, outils IA), avec un `staleTime` long (10 min, données peu volatiles). `useCatalogMaps` construit des `Map` id → entité pour retrouver rapidement le nom d'une catégorie/outil à partir d'un prompt.

## hooks/useDebouncedValue.ts

Rôle : hook générique qui retarde la mise à jour d'une valeur (300 ms par défaut), utilisé pour les champs de recherche.

## hooks/useDocumentTitle.ts

Rôle : hook qui met à jour `document.title` pendant le montage d'un composant et restaure le titre précédent au démontage.

## hooks/useProfile.ts

Rôle : mutations du profil utilisateur (`useUpdateProfile`, `useUploadAvatar`, `useDeleteAvatar`, `useDeleteAccount`), chacune met à jour le cache React Query de `users/me` directement avec la réponse plutôt que de refetch.

## hooks/usePrompts.ts

Rôle : hooks de lecture/écriture des prompts : liste paginée (`usePromptList`, garde les données précédentes pendant le chargement), détail par slug, par catégorie, par outil IA, mes prompts, création (`useCreatePrompt`, invalide toutes les queries prompts après succès).

## hooks/usePurchases.ts

Rôle : `useMyPurchases`, `useCreateCheckoutSession` (démarre un paiement Stripe), `usePurchaseBySessionId` qui repolle toutes les 2 secondes tant que l'achat reste `PENDING` (en attente de la confirmation du webhook Stripe côté serveur), et s'arrête dès que le statut change.
