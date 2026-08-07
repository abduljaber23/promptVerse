# 🎓 Oral CDA — Module Auth (Authentification & Sécurité - Guide Exhaustif Complété)

> **Fichiers sources associés :**
> - 📄 [auth.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.service.ts)
> - 📄 [auth.controller.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.controller.ts)
> - 📄 [auth.module.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.module.ts)
> - 📄 [auth.guard.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/common/guards/auth.guard.ts)
> - 📄 [auth-roles.guard.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/common/guards/auth-roles.guard.ts)
> - 📄 [bcrypt.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/bcrypt.service.ts)

---

## 📌 1. Rôle & Inscription (`register`)

### Q1 : Quel est le rôle global de votre module `AuthModule` ?
* **Explication simple :** Il gère la sécurité des comptes : inscription, connexion, mot de passe oublié et validation des e-mails par lien sécurisé.
* **Dans votre code :** `AuthModule` importe `UsersModule` pour la BDD, `MailModule` pour les e-mails et `JwtModule` pour les jetons.
* **🗣️ À dire à l'oral :** *"Le module Auth centralise l'authentification et la sécurité. Pour respecter le principe de responsabilité unique (SRP), `AuthService` orchestre la logique métier tandis que la persistance est déléguée à `UsersService` et l'envoi de mail à `MailService`."*

---

### Q2 : Comment se déroule la méthode `register()` lors d'une inscription ?
* **Explication simple :** On nettoie l'email et le pseudo, on vérifie en BDD qu'ils sont libres, on hache le mot de passe, on sauvegarde l'utilisateur avec un token de 15 min et on envoie l'e-mail de confirmation.
* **Dans votre code :** `register()` dans [auth.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.service.ts#L31-L66).
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

## ✉️ 2. Validation par Email (`verifyEmail`)

### Q5 : Comment fonctionne la méthode `verifyEmail()` ?
* **Explication simple :** On cherche l'utilisateur. S'il n'existe pas, erreur 404. S'il est déjà vérifié, on renvoie une confirmation immédiate. On vérifie que le token correspond et n'a pas dépassé 15 min, puis on valide l'email et on efface le token.
* **Dans votre code :** `verifyEmail()` dans [auth.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.service.ts#L124-L154).
* **🗣️ À dire à l'oral :** *"La méthode valide le token de confirmation. Si les contrôles réussissent, `isEmailVerified` passe à vrai et le token est réinitialisé à `null` pour le rendre à usage unique (single-use token) et empêcher les attaques par rejeu."*

---

### Q6 : Pourquoi stocker le token en base plutôt qu'utiliser un JWT ?
* **Explication simple :** Un token en base de données peut être annulé (passé à `null`) immédiatement après utilisation. Un JWT dans un mail reste valide tant qu'il n'est pas expiré.
* **Dans votre code :** `user.verificationToken = null;` dans `verifyEmail()`.
* **🗣️ À dire à l'oral :** *"Un token en BDD est stateful et révocable immédiatement à la première utilisation, ce qui garantit une sécurité optimale contre la réutilisation du lien."*

---

## 🔑 3. Connexion, Cookie HTTP-Only & Déconnexion (`login` & `logout`)

### Q7 : Comment se déroule la connexion (`login`) et pourquoi renvoyer le même message si l'email ou le mot de passe est faux ?
* **Explication simple :** On cherche l'utilisateur par email. S'il n'existe pas ou si le mot de passe est faux, on renvoie exactement le même message *"Identifiants invalides"*. Si tout est bon, on met à jour la date de dernière connexion et on génère le token JWT.
* **Dans votre code :** `login()` dans [auth.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.service.ts#L68-L122).
* **🗣️ À dire à l'oral :** *"Pour éviter l'énumération de comptes par un attaquant, je lève la même exception `UnauthorizedException` (`INVALID_CREDENTIALS` / HTTP 401) que ce soit l'email ou le mot de passe qui soit incorrect. Si l'email n'est pas encore confirmé, la connexion est bloquée avec une `ForbiddenException` (HTTP 403)."*

---

### Q8 : Pourquoi stocker le JWT dans un Cookie HTTP-Only (`res.cookie`) lors du Login ?
* **Explication simple :** Stocker le token dans un cookie `httpOnly: true` empêche les scripts JavaScript malveillants d'y accéder (protection contre les failles XSS), contrairement au `localStorage`.
* **Dans votre code :** `res.cookie('access_token', accessToken, { httpOnly: true, secure: ..., sameSite: 'lax' })` dans [auth.controller.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.controller.ts#L62-L67).
* **🗣️ À dire à l'oral :** *"Plutôt que d'exposer le JWT dans le corps de réponse JSON ou de le stocker dans le `localStorage` du navigateur, je le transmets dans un cookie sécurisé `httpOnly: true` avec la directive `sameSite: 'lax'`. Cela protège le jeton de session contre le vol d'identité par attaque XSS."*

---

### Q9 : Comment fonctionne la méthode `generateAccessToken()` ?
* **Explication simple :** Elle génère le jeton JWT contenant l'ID de l'utilisateur (`sub`) et son rôle (`role`) en le signant avec la clé secrète `JWT_SECRET`.
* **Dans votre code :** `private generateAccessToken(payload: jwtPayloadType): Promise<string>` dans [auth.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.service.ts#L239-L241).
* **🗣️ À dire à l'oral :** *"Cette méthode utilise `jwtService.signAsync()` pour créer un token JWT signé contenant les claims `sub` (UUID utilisateur) et `role` (USER/ADMIN), expirant selon la durée configurée dans les variables d'environnement."*

---

### Q10 : Comment fonctionne la déconnexion (`logout`) ?
* **Explication simple :** On efface le cookie `access_token` du navigateur du client.
* **Dans votre code :** `res.clearCookie('access_token', { httpOnly: true, ... })` dans [auth.controller.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.controller.ts#L78-L82).
* **🗣️ À dire à l'oral :** *"La déconnexion est gérée en nettoyant le cookie sécurisé `access_token` côté client avec `res.clearCookie()`, détruisant ainsi la session du navigateur."*

---

## 🔒 4. Mot de Passe Oublié & Réinitialisation (`forgot-password` & `reset-password`)

### Q11 : Comment fonctionne la demande de réinitialisation de mot de passe (`sendResetPasswordLink`) ?
* **Explication simple :** L'utilisateur donne son email. S'il existe, on génère un token aléatoire de 32 octets valable 15 min, on le sauvegarde en BDD et on lui envoie un mail avec le lien vers la page React de réinitialisation.
* **Dans votre code :** `sendResetPasswordLink()` dans [auth.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.service.ts#L156-L173).
* **🗣️ À dire à l'oral :** *"La méthode `sendResetPasswordLink()` génère un token d'expiration de 15 minutes (`resetPasswordToken`), le persiste en BDD et déclenche l'envoi d'un mail contenant le lien sécurisé orienté vers le Frontend (`CLIENT_URL/reset-password/:userId/:token`)."*

---

### Q12 : Comment fonctionne la méthode `getResetPasswordLink()` ?
* **Explication simple :** Quand l'utilisateur arrive sur la page web, cette méthode vérifie que le lien dans le mail est toujours valide (utilisateur existe, token identique et non expiré) avant d'afficher le formulaire.
* **Dans votre code :** `getResetPasswordLink()` dans [auth.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.service.ts#L175-L198).
* **🗣️ À dire à l'oral :** *"Elle applique une garde de validation avant d'afficher le formulaire : elle vérifie l'existence de l'utilisateur, la présence du token en BDD, la correspondance stricte et le respect de la date d'expiration."*

---

### Q13 : Que se passe-t-il exactement lors de l'exécution de `resetPassword()` ?
* **Explication simple :** 
  1. On contrôle à nouveau l'utilisateur et la validité du token.
  2. On hache le nouveau mot de passe avec Bcrypt.
  3. On enregistre le nouveau mot de passe en BDD.
  4. On réinitialise `resetPasswordToken` et `resetPasswordTokenExpiresAt` à `null`.
* **Dans votre code :** `resetPassword()` dans [auth.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.service.ts#L200-L230).
* **🗣️ À dire à l'oral :** *"Le nouveau mot de passe est haché via `BcryptService.hash()`. Une fois l'entité mise à jour, les champs `resetPasswordToken` et `resetPasswordTokenExpiresAt` sont remis à `null` pour garantir que le jeton est détruit et à usage unique."*

---

## 🛡️ 5. Guards & Décorateurs (`AuthGuard`, `@Public`, `@Roles`, `@Throttle`)

### Q14 : Comment fonctionne le Guard d'authentification global (`AuthGuard`) et le décorateur `@Public()` ?
* **Explication simple :** `AuthGuard` s'exécute sur toutes les routes. Il vérifie si la route a le décorateur `@Public()`. Si oui, il laisse passer. Si non, il vérifie le cookie JWT `access_token` et attache les données utilisateur à la requête.
* **Dans votre code :** [auth.guard.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/common/guards/auth.guard.ts).
* **🗣️ À dire à l'oral :** *"Grâce à `Reflector`, `AuthGuard` vérifie si la métadonnée `IS_PUBLIC_KEY` est présente. Si la route est publique, l'accès est immédiat. Sinon, il vérifie le cookie JWT `access_token` avec `jwtService.verifyAsync()` et injecte le payload dans `request[CURRENT_USER_KEY]`."*

---

### Q15 : Comment fonctionne le Guard de rôles (`AuthRolesGuard`) ?
* **Explication simple :** Il lit les rôles autorisés définis par `@Roles(UserRoles.ADMIN)` et vérifie si l'utilisateur connecté possède le rôle requis.
* **Dans votre code :** [auth-roles.guard.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/common/guards/auth-roles.guard.ts).
* **🗣️ À dire à l'oral :** *"`AuthRolesGuard` utilise `Reflector` pour récupérer le tableau de rôles autorisés configuré par `@Roles()`. Il compare ensuite le rôle contenu dans le payload JWT de l'utilisateur et lève une `ForbiddenException` (403 `ACCESS_DENIED`) en cas de privilèges insuffisants."*

---

### Q16 : Pourquoi avez-vous ajouté le décorateur `@Throttle()` sur `/register` et `/login` ?
* **Explication simple :** Pour empêcher un bot ou un hacker de tester des milliers de mots de passe par seconde (attaque par force brute).
* **Dans votre code :** `@Throttle(...)` au-dessus de `register()` et `login()` dans [auth.controller.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/auth/auth.controller.ts#L29-L53).
* **🗣️ À dire à l'oral :** *"J'ai configuré le Rate-Limiting NestJS avec `@Throttle()` pour protéger les routes sensibles contre le spam et les attaques par force brute. Si un client dépasse les quotas (ex: 5 essais de login par minute), la requête est bloquée temporairement avec un HTTP 429 Too Many Requests."*
