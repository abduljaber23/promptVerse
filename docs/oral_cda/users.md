# 🎓 Oral CDA — Module Users (Gestion des Utilisateurs, Profil & Entités - Guide Exhaustif)

> **Fichiers sources associés :**
> - 📄 [users.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/users/users.service.ts)
> - 📄 [users.controller.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/users/users.controller.ts)
> - 📄 [user.entity.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/users/entities/user.entity.ts)
> - 📄 [user-profile.entity.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/users/entities/user-profile.entity.ts)
> - 📄 [social-link.entity.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/users/entities/social-link.entity.ts)
> - 📄 [user.enum.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/common/enums/user.enum.ts)

---

## 📌 1. Méthodes du Service (`UsersService`) & Contrôleur (`UsersController`)

### Q1 : Comment fonctionne la route `/users/me` et le décorateur `@CurrentUser()` ?
* **Explication simple :** L'utilisateur connecté appelle `/users/me`. Le guard global `AuthGuard` décode son cookie JWT et attache son identifiant. Le décorateur `@CurrentUser()` extrait l'ID (`payload.sub`) et `currentUser(id)` renvoie ses données.
* **Dans votre code :** `me(@CurrentUser() payload)` dans [users.controller.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/users/users.controller.ts#L17-L20).
* **🗣️ À dire à l'oral :** *"La route `/users/me` récupère le profil de l'utilisateur connecté. Grâce au guard global `AuthGuard` et au décorateur personnalisé `@CurrentUser()`, j'extrais l'ID contenu dans le payload du token JWT (`payload.sub`) et je le passe à `currentUser()`."*

---

### Q2 : Quelle est la différence entre `findById()` et `currentUser()` ?
* **Explication simple :** `findById()` cherche l'utilisateur et renvoie `null` s'il n'existe pas. `currentUser()` applique un contrôle de sécurité et lève directement une erreur 404 (`USER_NOT_FOUND`) s'il est introuvable.
* **Dans votre code :** `currentUser(id)` dans [users.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/users/users.service.ts#L36-L43).
* **🗣️ À dire à l'oral :** *"`findById()` est une méthode de recherche passive qui retourne `User | null`. `currentUser()` est une méthode sécurisée qui applique une garde et lève une `NotFoundException` si le compte n'existe pas."*

---

### Q3 : Comment fonctionne la méthode `updateLastLogin(id)` ?
* **Explication simple :** Lors de chaque connexion réussie, cette méthode met à jour la date de dernière connexion (`lastLoginAt`) dans la base de données.
* **Dans votre code :** `updateLastLogin(id)` dans [users.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/users/users.service.ts#L45-L49).
* **🗣️ À dire à l'oral :** *"La méthode `updateLastLogin()` exécute un `UPDATE` direct et ciblé sur la colonne `lastLoginAt` lors du login pour des raisons d'auditabilité sans recharger toute l'entité."*

---

### Q4 : À quoi sert le décorateur `@ApiSecurity('access_token')` sur le contrôleur ?
* **Explication simple :** Il informe la documentation Swagger interactive que ce contrôleur nécessite l'authentification par le cookie / jeton `access_token`.
* **Dans votre code :** `@ApiSecurity('access_token')` au-dessus de `UsersController` dans [users.controller.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/users/users.controller.ts#L7).
* **🗣️ À dire à l'oral :** *"Ce décorateur documente la sécurité de l'API dans Swagger UI. Il indique aux développeurs frontend que l'accès à ce contrôleur requiert la présence du cookie de session d'authentification."*

---

## 🗄️ 2. Entités TypeORM & Modélisation

### Q5 : Comment sont modélisées vos entités d'utilisateurs ?
* **Explication simple :** La donnée est séparée en 3 tables : `User` (compte et sécurité), `UserProfile` (avatar et bio) et `SocialLink` (réseaux sociaux).
* **Dans votre code :** Relation `OneToOne` entre `User` et `UserProfile`, et `OneToMany` entre `UserProfile` et `SocialLink`.
* **🗣️ À dire à l'oral :** *"J'ai découpé les entités pour respecter la normalisation BDD. `User` et `UserProfile` sont reliés en `OneToOne` avec cascade de suppression, et `UserProfile` possède plusieurs `SocialLink` en `OneToMany`."*

---

### Q6 : Pourquoi utiliser des UUIDs au lieu d'IDs auto-incrémentés (`1, 2, 3...`) ?
* **Explication simple :** Un ID auto-incrémenté permet à n'importe qui de deviner facilement le nombre d'utilisateurs (`/users/1`, `/users/2`). Un UUID de 36 caractères est impossible à deviner.
* **Dans votre code :** `@PrimaryGeneratedColumn('uuid')` sur l'entité `User`.
* **🗣️ À dire à l'oral :** *"Les UUIDs v4 apportent une sécurité contre l'attaque par énumération d'identifiants et permettent la génération d'identifiants uniques côté application sans dépendre de l'auto-incrément BDD."*

---

### Q7 : À quoi sert le décorateur `@Exclude()` et comment s'associe-t-il avec `ClassSerializerInterceptor` ?
* **Explication simple :** `@Exclude()` masque le mot de passe haché. Et parce que `ClassSerializerInterceptor` est configuré globalement dans `AppModule`, ce masquage s'applique automatiquement sur toute l'API.
* **Dans votre code :** `@Exclude()` dans `User` et `APP_INTERCEPTOR` dans [app.module.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/app.module.ts#L63-L65).
* **🗣️ À dire à l'oral :** *"J'utilise `@Exclude()` de `class-transformer` combiné à l'intercepteur global `ClassSerializerInterceptor` (`APP_INTERCEPTOR`) pour empêcher automatiquement toute fuite du hash de mot de passe dans les réponses JSON de l'API."*

---

### Q8 : À quoi servent `@CreateDateColumn()` et `@UpdateDateColumn()` ?
* **Explication simple :** Ils enregistrent automatiquement la date de création lors de l'insertion et mettent à jour la date de modification à chaque enregistrement.
* **Dans votre code :** Dans `User` et `UserProfile`.
* **🗣️ À dire à l'oral :** *"Ce sont des décorateurs automatisés de TypeORM qui gèrent le versioning temporel des entités pour des raisons de traçabilité."*

---

### Q9 : Qu'est-ce que le Soft Delete et comment est-il configuré ?
* **Explication simple :** C'est le fait de marquer un compte comme supprimé avec la date du jour au lieu de l'effacer définitivement de la base de données.
* **Dans votre code :** `@DeleteDateColumn()` dans `User`.
* **🗣️ À dire à l'oral :** *"Grâce au Soft Delete de TypeORM (`@DeleteDateColumn()`), la suppression d'un compte remplit le champ `deletedAt` sans effacer la ligne SQL, ce qui préserve l'historique comptable et la traçabilité."*
