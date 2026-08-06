# 🎓 Oral CDA — Module Users (Gestion des Utilisateurs & Entités)

> **Fichiers sources associés :**
> - 📄 [users.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/users/users.service.ts)
> - 📄 [user.entity.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/users/entities/user.entity.ts)
> - 📄 [user-profile.entity.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/users/entities/user-profile.entity.ts)
> - 📄 [social-link.entity.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/users/entities/social-link.entity.ts)
> - 📄 [user.enum.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/common/enums/user.enum.ts)

---

### Q1 : Comment sont modélisées vos entités d'utilisateurs ?
* **Explication simple :** La donnée est séparée en 3 tables : `User` (compte et sécurité), `UserProfile` (avatar et bio) et `SocialLink` (réseaux sociaux).
* **Dans votre code :** Relation `OneToOne` entre `User` et `UserProfile`, et `OneToMany` entre `UserProfile` et `SocialLink`.
* **🗣️ À dire à l'oral :** *"J'ai découpé les entités pour respecter la normalisation BDD. `User` et `UserProfile` sont reliés en `OneToOne` avec cascade de suppression, et `UserProfile` possède plusieurs `SocialLink` en `OneToMany` pour gérer les réseaux sociaux de manière dynamique."*

---

### Q2 : Pourquoi utiliser des UUIDs au lieu des IDs auto-incrémentés (`1, 2, 3...`) ?
* **Explication simple :** Un ID auto-incrémenté permet à n'importe qui de deviner facilement le nombre d'utilisateurs et de les scraper (`/users/1`, `/users/2`). Un UUID de 36 caractères est impossible à deviner.
* **Dans votre code :** `@PrimaryGeneratedColumn('uuid')` sur l'entité `User`.
* **🗣️ À dire à l'oral :** *"Les UUIDs v4 apportent une sécurité contre l'attaque par énumération d'identifiants et permettent la génération d'identifiants uniques côté application sans dépendre de l'auto-incrément BDD."*

---

### Q3 : À quoi sert le décorateur `@Exclude()` sur le champ `password` ?
* **Explication simple :** Il masque automatiquement le mot de passe haché pour qu'il ne soit jamais envoyé dans les réponses de l'API REST.
* **Dans votre code :** `@Exclude()` sur `password` dans [user.entity.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/users/entities/user.entity.ts).
* **🗣️ À dire à l'oral :** *"J'utilise `@Exclude()` de `class-transformer` combiné au sérialiseur NestJS pour empêcher toute fuite accidentelle du hash de mot de passe dans les réponses JSON transmises au frontend."*

---

### Q4 : Quelle est la différence entre `findById(id)` et `currentUser(id)` dans `UsersService` ?
* **Explication simple :** `findById()` cherche l'utilisateur et renvoie `null` s'il n'existe pas. `currentUser()` fait la recherche et lève automatiquement une erreur 404 (`USER_NOT_FOUND`) si l'utilisateur est introuvable.
* **Dans votre code :** [users.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/users/users.service.ts#L15-L44)
* **🗣️ À dire à l'oral :** *"`findById()` est une méthode de recherche passive qui retourne `User | null`. `currentUser()` est une méthode sécurisée qui applique une garde et lève immédiatement une `NotFoundException` si le compte n'existe pas."*

---

### Q5 : À quoi servent les Enums (`UserRoles`, `UserStatus`, `SocialPlatform`) ?
* **Explication simple :** Ils verrouillent la liste des valeurs autorisées pour qu'on ne puisse pas insérer de rôles ou statuts invalides dans la base de données.
* **Dans votre code :** [user.enum.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/common/enums/user.enum.ts) avec `UserRoles` (`USER`, `ADMIN`, `SUPER_ADMIN`).
* **🗣️ À dire à l'oral :** *"Les Enums TypeScript synchronisés avec les colonnes `ENUM` de MySQL garantissent l'intégrité des données à la fois au niveau applicatif et au niveau de la base de données."*

---

### Q6 : Qu'est-ce que le Soft Delete et comment est-il configuré ?
* **Explication simple :** C'est le fait de marquer un compte comme supprimé avec la date du jour au lieu de l'effacer définitivement de la base de données.
* **Dans votre code :** `@DeleteDateColumn()` dans `User`.
* **🗣️ À dire à l'oral :** *"Grâce au Soft Delete de TypeORM (`@DeleteDateColumn()`), la suppression d'un compte remplit le champ `deletedAt` sans effacer la ligne SQL, ce qui préserve l'historique comptable et la traçabilité."*
