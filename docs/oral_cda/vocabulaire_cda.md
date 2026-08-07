# 📖 Dictionnaire du Vocabulaire CDA — 30 Termes Indispensables (PromptVerse)

Ce document répertorie **les 30 mots et concepts techniques indispensables** de votre projet **PromptVerse**, avec pour chacun une **définition simple, directe et facile à retenir**.

---

### 1. Injection de Dépendances (Dependency Injection / IoC)
* **Définition simple :** Attendre qu'un outil vous soit fourni automatiquement dans le constructeur au lieu de le fabriquer vous-même avec `new`.
* **Dans votre code :** NestJS injecte automatiquement `UsersService`, `BcryptService` et `MailService` dans `AuthService`.

---

### 2. Principe de Responsabilité Unique (SRP - Single Responsibility Principle)
* **Définition simple :** Chaque fichier ou classe doit faire une seule chose et la faire bien.
* **Dans votre code :** `AuthService` gère la sécurité, `MailService` les e-mails, et `StorageService` le stockage S3.

---

### 3. Découplage (Loose Coupling)
* **Définition simple :** Rendre les parties du code indépendantes les unes des autres pour pouvoir en remplacer une sans tout casser.
* **Dans votre code :** Si vous remplacez `bcrypt` par `argon2`, vous modifiez seulement `BcryptService`, pas `AuthService`.

---

### 4. DTO (Data Transfer Object)
* **Définition simple :** Un objet modèle qui définit et valide les données envoyées par l'utilisateur lors d'une requête HTTP.
* **Dans votre code :** `RegisterDto` vérifie que l'email est valide (`@IsEmail`) et que le mot de passe fait au moins 6 caractères (`@MinLength(6)`).

---

### 5. Hachage Unidirectionnel (Hashing)
* **Définition simple :** Transformer un mot de passe en une empreinte de caractères irréversible. On ne peut jamais revenir au mot de passe d'origine.
* **Dans votre code :** `bcrypt.hash(password, 10)` transforme `"SecurePassword123"` en un hash illisible.

---

### 6. Sel et Facteur de Coût (Salt Rounds)
* **Définition simple :** Le "sel" est une donnée aléatoire ajoutée au mot de passe, et le "facteur de coût" est le nombre de fois où l'on répète le hachage pour ralentir les hackers.
* **Dans votre code :** Le `10` dans `bcrypt.hash(password, 10)` effectue 1024 tours de calcul pour bloquer la force brute.

---

### 7. CSPRNG (Générateur d'Aléatoire Cryptographique)
* **Définition simple :** Un outil qui génère du vrai hasard impossible à deviner par un ordinateur ou un attaquant.
* **Dans votre code :** `randomBytes(32)` génère les tokens de vérification et de reset mot de passe.

---

### 8. Token à Usage Unique (Single-use Token)
* **Définition simple :** Un jeton secret jetable qui ne peut servir qu'une seule fois.
* **Dans votre code :** Dès que l'email est validé, `verificationToken` repasse à `null` pour empêcher toute réutilisation.

---

### 9. Sanitization (Nettoyage de Données)
* **Définition simple :** Nettoyer les données saisies par l'utilisateur (retirer les espaces, passer en minuscules) avant de les traiter.
* **Dans votre code :** `email.toLowerCase().trim()` nettoie l'adresse email lors de l'inscription et du login.

---

### 10. ORM (Object-Relational Mapping) & Repository
* **Définition simple :** Un outil qui permet de manipuler les tables de la base de données directement sous forme d'objets TypeScript sans écrire de SQL brut.
* **Dans votre code :** TypeORM et `this.usersRepository.findOne()` ou `save()`.

---

### 11. UUID v4 (Identifiant Unique Universel)
* **Définition simple :** Un identifiant unique de 36 caractères imprédictible (ex: `550e8400-e29b-41d4-a716-446655440000`) qui remplace les IDs classiques `1, 2, 3...`.
* **Dans votre code :** `@PrimaryGeneratedColumn('uuid')` sur l'entité `User`.

---

### 12. Soft Delete (Suppression Douce)
* **Définition simple :** Masquer un utilisateur en enregistrant la date de suppression au lieu d'effacer définitivement la ligne dans la base de données.
* **Dans votre code :** `@DeleteDateColumn()` remplit le champ `deletedAt`.

---

### 13. Suppression en Cascade (`ON DELETE CASCADE`)
* **Définition simple :** Supprimer automatiquement les données liées (ex: le profil) si l'élément parent (l'utilisateur) est supprimé.
* **Dans votre code :** La relation `@OneToOne` entre `User` et `UserProfile`.

---

### 14. Intégrité Référentielle
* **Définition simple :** S'assurer que les liens entre les tables restent cohérents et qu'il n'y a pas de données "orphelines" dans la base.
* **Dans votre code :** Les clés étrangères (`user_id` et `profile_id`) dans MySQL.

---

### 15. Idempotence
* **Définition simple :** Une fonction est idempotente si l'exécuter plusieurs fois de suite donne exactement le même résultat sans provoquer d'erreur.
* **Dans votre code :** Si on clique 2 fois sur le lien de confirmation d'email, la 2ème fois indique simplement *"Email déjà vérifié"*.

---

### 16. Principe Fail-Fast
* **Définition simple :** Arrêter immédiatement la fonction dès qu'une condition échoue pour économiser du temps et de la mémoire.
* **Dans votre code :** Si l'email existe déjà, on lève une `ConflictException` avant de lancer le hachage `bcrypt`.

---

### 17. Codes de Statut HTTP RESTful
* **201 Created :** Ressource créée avec succès (ex: Inscription réussie).
* **400 Bad Request :** Données invalides ou token expiré.
* **401 Unauthorized :** Identifiants incorrects ou token JWT manquant/invalide.
* **403 Forbidden :** Accès interdit (email non vérifié ou rôle insuffisant).
* **404 Not Found :** Ressource introuvable (ex: Utilisateur non trouvé).
* **409 Conflict :** Conflit de donnée (ex: Email déjà utilisé).
* **429 Too Many Requests :** Trop de requêtes envoyées (Rate Limiting).
* **500 Internal Error :** Erreur technique du serveur (ex: Serveur mail en panne).

---

### 18. Cookie HTTP-Only (`httpOnly: true`)
* **Définition simple :** Un cookie de navigateur inaccessible par le code JavaScript, ce qui le protège contre le vol par des pirates.
* **Dans votre code :** `res.cookie('access_token', accessToken, { httpOnly: true, sameSite: 'lax' })` dans le login.

---

### 19. Anti-XSS (Cross-Site Scripting)
* **Définition simple :** La protection contre l'injection de scripts malveillants dans le navigateur de l'utilisateur.
* **Dans votre code :** Utilisation des cookies HTTP-Only au lieu du `localStorage` pour le token JWT.

---

### 20. ConfigService & 12-Factor App
* **Définition simple :** Séparer le code de la configuration en lisant toutes les URLs et clés secrètes depuis le fichier `.env`.
* **Dans votre code :** `this.config.getOrThrow('APP_URL')`.

---

### 21. Reflector (Métadonnées NestJS)
* **Définition simple :** L'outil de NestJS qui permet de lire les informations cachées apportées par des décorateurs personnalisés (comme `@Public()` ou `@Roles()`).
* **Dans votre code :** `this.reflector.getAllAndOverride(IS_PUBLIC_KEY, ...)` dans `AuthGuard`.

---

### 22. Décorateur Personnalisé (Custom Decorator)
* **Définition simple :** Une annotation créée sur-mesure pour simplifier l'extraction de données ou ajouter des règles sur une route.
* **Dans votre code :** `@CurrentUser()` pour extraire l'utilisateur connecté et `@Public()` pour rendre une route accessible sans connexion.

---

### 23. Swagger & OpenAPI (`@ApiProperty` & `@ApiSecurity`)
* **Définition simple :** Un outil qui génère automatiquement une documentation web interactive pour tester l'API.
* **Dans votre code :** Accessible sur `http://localhost:3000/api/docs`.

---

### 24. Throttling / Rate Limiting (`@Throttle`)
* **Définition simple :** Limiter le nombre de requêtes qu'un utilisateur ou un bot peut faire dans un temps donné pour éviter le surmenage du serveur.
* **Dans votre code :** `@Throttle()` sur `/register` et `/login` dans `AuthController`.

---

### 25. Moteur de Templates Handlebars (`.hbs`)
* **Définition simple :** Un outil qui permet de fabriquer des pages HTML (comme des e-mails) en y injectant dynamiquement des données TypeScript.
* **Dans votre code :** `template: 'verify-email'` dans `MailService`.

---

### 26. Joi Schema Validation
* **Définition simple :** Un outil de contrôle qui vérifie au démarrage de l'application que toutes les variables du fichier `.env` sont bien présentes et valides.
* **Dans votre code :** `envValidationSchema` dans `common/config/env.validation.ts`.

---

### 27. ClassSerializerInterceptor
* **Définition simple :** Un filtre NestJS global qui transforme les objets retournés par l'API en appliquant les règles d'exclusion de champs.
* **Dans votre code :** `APP_INTERCEPTOR` dans `app.module.ts` pour appliquer `@Exclude()` sur le mot de passe.

---

### 28. MinIO & Mode Path-Style (`forcePathStyle: true`)
* **Définition simple :** Un serveur de stockage de fichiers S3 compatible utilisé en local. `forcePathStyle: true` adapte les URLs du SDK AWS pour MinIO.
* **Dans votre code :** `forcePathStyle: true` dans `StorageService`.

---

### 29. Logger (Journalisation par Contexte)
* **Définition simple :** Un outil d'enregistrement des messages et des erreurs du serveur à la place de `console.log`.
* **Dans votre code :** `private readonly logger = new Logger(MailService.name)`.

---

### 30. Message Queue (File d'Attente - BullMQ / Redis)
* **Définition simple :** Une liste d'attente qui stocke des tâches lourdes (comme l'envoi d'emails) pour les exécuter en arrière-plan sans bloquer le serveur.
* **Dans votre projet :** L'évolution recommandée pour la production.
