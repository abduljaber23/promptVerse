# 📖 Dictionnaire du Vocabulaire CDA — Définitions Simples & Claires

Ce document répertorie tous les mots techniques indispensables de votre projet **PromptVerse**, avec pour chacun une **définition simple, directe et facile à retenir**.

---

### 1. Injection de Dépendances (Dependency Injection / IoC)
* **Définition simple :** C'est le fait d'attendre qu'un outil vous soit donné automatiquement dans le constructeur au lieu de le fabriquer vous-même avec `new`.
* **Dans votre code :** NestJS injecte automatiquement `UsersService`, `BcryptService` et `MailService` dans `AuthService`.

---

### 2. Principe de Responsabilité Unique (SRP - Single Responsibility Principle)
* **Définition simple :** Chaque fichier ou classe doit faire une seule chose et la faire bien.
* **Dans votre code :** `AuthService` gère la logique d'accès, `MailService` gère les e-mails, et `BcryptService` gère le hachage.

---

### 3. Découplage (Loose Coupling)
* **Définition simple :** Rendre les parties du code indépendantes les unes des autres pour pouvoir en remplacer une sans tout casser.
* **Dans votre code :** Si vous remplacez `bcrypt` par une autre librairie, vous modifiez seulement `BcryptService`, pas `AuthService`.

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
* **Dans votre code :** `randomBytes(32)` génère le token de vérification e-mail.

---

### 8. Token à Usage Unique (Single-use Token)
* **Définition simple :** Un jeton secret jetable qui ne peut servir qu'une seule fois.
* **Dans votre code :** Dès que l'email est validé, `verificationToken` repasse à `null` pour empêcher toute réutilisation.

---

### 9. Sanitization (Nettoyage de Données)
* **Définition simple :** Nettoyer les données saisies par l'utilisateur (retirer les espaces, passer en minuscules) avant de les traiter.
* **Dans votre code :** `email.toLowerCase().trim()` nettoie l'adresse email lors de l'inscription.

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
* **404 Not Found :** Ressource introuvable (ex: Utilisateur non trouvé).
* **409 Conflict :** Conflit de donnée (ex: Email déjà utilisé).
* **500 Internal Server Error :** Erreur technique du serveur (ex: Serveur mail en panne).

---

### 18. ConfigService & 12-Factor App
* **Définition simple :** Séparer le code de la configuration en lisant toutes les URLs et clés secrètes depuis le fichier `.env`.
* **Dans votre code :** `this.config.getOrThrow('APP_URL')`.

---

### 19. Logger (Journalisation)
* **Définition simple :** Un outil d'enregistrement des messages et des erreurs du serveur à la place de `console.log`.
* **Dans votre code :** `private readonly logger = new Logger(MailService.name)`.

---

### 20. Message Queue (File d'Attente - BullMQ / Redis)
* **Définition simple :** Une liste d'attente qui stocke des tâches lourdes (comme l'envoi d'emails) pour les exécuter en arrière-plan sans bloquer le serveur.
* **Dans votre projet :** L'évolution recommandée pour la production.
