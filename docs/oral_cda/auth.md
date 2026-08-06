# 🎓 Oral CDA — Module Auth (Authentification & Sécurité)

> **Fichiers sources associés :**
> - 📄 [auth.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.service.ts)
> - 📄 [auth.controller.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.controller.ts)
> - 📄 [auth.module.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.module.ts)
> - 📄 [bcrypt.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/bcrypt.service.ts)
> - 📄 [register.dto.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/dto/register.dto.ts)

---

### Q1 : Quel est le rôle global de votre module `AuthModule` ?
* **Explication simple :** Il gère la sécurité des comptes : inscription des utilisateurs, hachage des mots de passe et validation des e-mails par lien sécurisé.
* **Dans votre code :** `AuthModule` importe `UsersModule` pour la BDD, `MailModule` pour les e-mails et `JwtModule` pour les jetons.
* **🗣️ À dire à l'oral :** *"Le module Auth centralise l'authentification et la sécurité. Pour respecter le principe de responsabilité unique (SRP), `AuthService` orchestre la logique métier tandis que la persistance est déléguée à `UsersService` et l'envoi de mail à `MailService`."*

---

### Q2 : Comment se déroule la méthode `register()` lors d'une inscription ?
* **Explication simple :** 
  1. On nettoie l'email et le pseudo.
  2. On vérifie en BDD si l'email ou le pseudo existe déjà.
  3. On hache le mot de passe avec Bcrypt.
  4. On sauvegarde l'utilisateur avec un token secret de 32 octets valable 15 min.
  5. On envoie l'e-mail de confirmation avec le lien.
* **Dans votre code :** [auth.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.service.ts#L26-L61)
* **🗣️ À dire à l'oral :** *"La méthode `register()` effectue une sanitization des données (`toLowerCase().trim()`), applique des gardes d'unicité avec levée de `ConflictException` (HTTP 409), hache le mot de passe via `BcryptService` et génère un token aléatoire sécurisé avant de déclencher l'envoi du mail."*

---

### Q3 : Pourquoi faites-vous `email.toLowerCase().trim()` et `username.trim()` ?
* **Explication simple :** Un email est identique qu'il soit écrit en majuscules ou minuscules. On le passe en minuscules et on enlève les espaces accidentels. Pour le pseudo, on enlève les espaces mais on garde la casse pour l'affichage (ex: `JohnDoe`).
* **Dans votre code :** `const emailLowercase = email.toLowerCase().trim();` dans `register()`.
* **🗣️ À dire à l'oral :** *"C'est une étape de sanitization. L'email est insensible à la casse par nature, donc le passer en minuscules évite les doublons. Pour le username, on préserve la casse d'affichage tout en supprimant les espaces parasites."*

---

### Q4 : Pourquoi avoir créé un `BcryptService` séparé ?
* **Explication simple :** Pour isoler la librairie `bcrypt`. Si demain on change d'outil de hachage, on modifie seulement `BcryptService` sans toucher à `AuthService`.
* **Dans votre code :** [bcrypt.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/bcrypt.service.ts) avec `bcrypt.hash(password, 10)`.
* **🗣️ À dire à l'oral :** *"J'ai créé `BcryptService` pour abstraire la dépendance externe. Cela garantit un faible couplage et facilite l'écriture de tests unitaires avec des mocks. J'ai choisi un facteur de coût de 10 ($2^{10}$ itérations) pour résister à la force brute sans dégrader l'expérience utilisateur."*

---

### Q5 : Comment fonctionne la méthode `verifyEmail()` ?
* **Explication simple :** 
  1. On cherche l'utilisateur. S'il n'existe pas, erreur 404.
  2. S'il est déjà vérifié, on renvoie une confirmation immédiate (idempotence).
  3. On vérifie que le token correspond et qu'il n'a pas dépassé la date d'expiration de 15 min.
  4. On passe `isEmailVerified = true` et on remet le token à `null`.
* **Dans votre code :** [auth.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.service.ts#L63-L93)
* **🗣️ À dire à l'oral :** *"La méthode valide le token de confirmation. Si les contrôles réussissent, `isEmailVerified` passe à vrai et le token est réinitialisé à `null` pour le rendre à usage unique (single-use token) et empêcher les attaques par rejeu."*

---

### Q6 : Pourquoi stocker le token en base plutôt qu'utiliser un JWT ?
* **Explication simple :** Un token en base de données peut être annulé (passé à `null`) immédiatement après utilisation. Un JWT dans un mail reste valide tant qu'il n'est pas expiré.
* **Dans votre code :** `user.verificationToken = null;` dans `verifyEmail()`.
* **🗣️ À dire à l'oral :** *"Un token en BDD est stateful et révocable immédiatement à la première utilisation, ce qui garantit une sécurité optimale contre la réutilisation du lien."*

---

### Q7 : Quels sont les codes HTTP utilisés et pourquoi ?
* **Explication simple :** 
  - **201 Created** : Inscription réussie.
  - **409 Conflict** : Email ou pseudo déjà pris.
  - **400 Bad Request** : Lien invalide ou token expiré.
  - **404 Not Found** : Utilisateur non trouvé.
* **Dans votre code :** `@HttpCode(HttpStatus.CREATED)` dans `AuthController` et `ConflictException`, `BadRequestException`, `NotFoundException`.
* **🗣️ À dire à l'oral :** *"Je respecte la norme RESTful HTTP en mappant les erreurs métier avec des exceptions NestJS spécifiques qui renvoient les bons codes de statut HTTP au client."*
