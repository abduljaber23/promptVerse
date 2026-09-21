# Vocabulaire CDA — Questions/Réponses

Format à réviser : question du jury → réponse générique (définition valable pour n'importe quel projet, pas juste celui-ci).

## Général / Méthodo

**C'est quoi une API ?**
Un ensemble de points d'entrée (endpoints) qui permettent à deux applications de communiquer entre elles.

**C'est quoi une API REST ?**
Une API qui organise les échanges autour de ressources (ex: `/products`, `/users`) et des verbes HTTP (GET, POST, PATCH, DELETE) pour agir dessus.

**C'est quoi un endpoint ?**
Une URL précise exposée par une API, associée à une action (ex: `POST /login`).

**C'est quoi le CRUD ?**
Les 4 opérations de base sur une donnée : Create, Read, Update, Delete.

**C'est quoi un framework ?**
Une structure imposée qui organise le code et impose des conventions, contrairement à une simple librairie qu'on appelle librement à la demande.

**C'est quoi l'architecture client-serveur ?**
Le client (navigateur, application mobile) envoie des requêtes, le serveur les traite et renvoie une réponse.

**C'est quoi une architecture 3-tiers ?**
Trois couches séparées : présentation (interface), logique métier (traitement), données (stockage), chacune pouvant évoluer indépendamment des autres.

**C'est quoi le versioning avec Git ?**
Suivre l'historique des modifications du code, travailler à plusieurs sans écraser le travail des autres (branches, commits, fusion).

**C'est quoi Docker / la conteneurisation ?**
Faire tourner une application (et ses dépendances) isolée dans un environnement reproductible, identique quel que soit la machine sur laquelle elle s'exécute.

**C'est quoi une variable d'environnement ?**
Une valeur de configuration (clé secrète, URL, mot de passe) séparée du code source, qui peut changer entre développement et production sans toucher au code.

**C'est quoi le protocole HTTP ?**
Le protocole de communication du web : le client envoie une requête (méthode + URL + éventuellement des données), le serveur renvoie une réponse (statut + données).

**Quelle est la différence entre HTTP et HTTPS ?**
HTTPS ajoute un chiffrement (TLS/SSL) des échanges entre le client et le serveur, pour empêcher qu'un tiers les lise ou les modifie.

**Quelle est la différence entre GET et POST ?**
GET récupère une ressource sans la modifier (paramètres dans l'URL) ; POST envoie des données pour créer ou modifier une ressource (dans le corps de la requête).

**C'est quoi le format JSON ?**
Un format texte léger pour structurer des données (objets, listes) échangées entre un client et un serveur.

**C'est quoi le principe "stateless" d'une API REST ?**
Le serveur ne garde pas en mémoire l'état d'une session entre deux requêtes ; chaque requête doit contenir tout ce qui est nécessaire pour être traitée.

**C'est quoi le CORS ?**
Un mécanisme de sécurité du navigateur qui bloque par défaut les requêtes entre deux origines différentes, sauf autorisation explicite du serveur appelé.

**C'est quoi une fonction asynchrone (async/await) ?**
Une manière d'écrire du code qui attend le résultat d'une opération longue (requête réseau, base de données) sans bloquer le reste du programme.

**C'est quoi une Promise en JavaScript ?**
Un objet qui représente le résultat futur d'une opération asynchrone (en attente, réussie ou échouée).

**C'est quoi TypeScript, et pourquoi l'utiliser plutôt que JavaScript ?**
Un langage qui ajoute le typage statique à JavaScript ; il permet de détecter des erreurs (mauvais type, faute de frappe sur un champ) dès l'écriture du code plutôt qu'à l'exécution.

**C'est quoi un package manager (ex: npm) ?**
L'outil qui installe et gère les librairies utilisées par un projet, en gardant la liste de leurs versions.

**C'est quoi le semantic versioning (semver) ?**
Un format de numéro de version `MAJOR.MINOR.PATCH` qui indique si une mise à jour casse la compatibilité, ajoute une fonctionnalité, ou corrige un bug.

**C'est quoi un monorepo ?**
Un seul dépôt Git qui contient plusieurs applications liées (ex: un backend et un frontend) au lieu d'avoir un dépôt séparé pour chacune.

**C'est quoi une méthode Agile / Scrum ?**
Une méthode de gestion de projet qui découpe le travail en itérations courtes, avec des livrables réguliers plutôt qu'un seul livrable à la toute fin.

**C'est quoi un sprint ?**
Une période fixe (ex: 1 à 2 semaines) pendant laquelle une équipe réalise un lot de fonctionnalités défini à l'avance.

**C'est quoi un cahier des charges ?**
Le document qui décrit les besoins, les fonctionnalités attendues et les contraintes d'un projet avant de commencer à coder.

**C'est quoi le MCD / MLD / MPD (méthode Merise) ?**
MCD = modèle conceptuel (entités et relations, sans détails techniques), MLD = modèle logique (tables et clés étrangères), MPD = modèle physique (le script SQL réel).

**C'est quoi un diagramme de cas d'utilisation (UML) ?**
Un schéma qui montre les actions possibles pour chaque type d'utilisateur sur un système.

**C'est quoi un diagramme de séquence (UML) ?**
Un schéma qui montre l'ordre chronologique des échanges entre les composants pour réaliser une action précise.

**Quelle est la différence entre un test unitaire et un test d'intégration ?**
Le test unitaire vérifie une fonction isolée avec ses dépendances simulées ; le test d'intégration vérifie que plusieurs parties fonctionnent bien ensemble.

**C'est quoi le TDD (Test-Driven Development) ?**
Une pratique qui consiste à écrire le test avant le code qui doit le faire passer.

**C'est quoi la dette technique ?**
Le coût futur causé par des choix rapides ou imparfaits pris aujourd'hui (code non nettoyé, simplifications) qu'il faudra corriger plus tard.

**C'est quoi le refactoring ?**
Réécrire une partie du code pour la rendre plus claire ou plus simple, sans changer son comportement.

**C'est quoi la scalabilité ?**
La capacité d'une application à absorber plus de trafic ou de données sans perdre en performance.

**Quelle est la différence entre un monolithe et des microservices ?**
Le monolithe regroupe toute l'application dans un seul service déployé en bloc ; les microservices découpent l'application en plusieurs services indépendants qui communiquent entre eux.

**C'est quoi le RGPD ?**
Le règlement européen sur la protection des données personnelles : il impose de sécuriser les données sensibles, de permettre leur suppression, et de ne collecter que ce qui est nécessaire.

**C'est quoi l'accessibilité web (a11y) ?**
Concevoir une interface utilisable par tous, y compris les personnes en situation de handicap (contraste suffisant, navigation au clavier, textes alternatifs).

**C'est quoi la programmation orientée objet (POO) ?**
Une façon d'organiser le code autour d'objets qui regroupent des données et les comportements qui les manipulent, plutôt qu'une suite de fonctions séparées des données.

**C'est quoi un design pattern ?**
Une solution standard, reconnue et nommée, à un problème de conception qui revient souvent (ex: Singleton, Factory, Repository).

**C'est quoi les principes SOLID ?**
Cinq principes de conception orientée objet qui rendent un code plus facile à faire évoluer (responsabilité unique, ouvert/fermé, substitution de Liskov, ségrégation des interfaces, inversion des dépendances).

**Quelle est la différence entre le rendu côté serveur (SSR) et côté client (CSR) ?**
En SSR, le serveur génère le HTML déjà rempli avant de l'envoyer au navigateur ; en CSR, le navigateur reçoit une page presque vide et c'est le JavaScript qui construit le contenu après coup.

**C'est quoi un runtime (ex: Node.js) ?**
L'environnement qui exécute réellement le code (ici, du JavaScript en dehors du navigateur), avec accès au système de fichiers, au réseau, etc.

**C'est quoi une revue de code (code review) ?**
La relecture du code d'un collègue avant de l'intégrer, pour détecter des bugs, améliorer la lisibilité et partager la connaissance du projet dans l'équipe.

**C'est quoi une user story ?**
Une description courte d'un besoin utilisateur, souvent formulée "en tant que [rôle], je veux [action], afin de [bénéfice]", utilisée pour découper le travail en Agile.

---

## Architecture Backend

**C'est quoi l'injection de dépendances ?**
Un mécanisme où le framework fournit automatiquement une instance d'un service à une classe qui en a besoin (souvent via le constructeur), au lieu qu'elle l'instancie elle-même avec `new`.

**C'est quoi un module (au sens architecture applicative) ?**
Une unité qui regroupe les éléments liés à un même domaine métier (controller, service, entités) pour structurer une grosse application en blocs indépendants.

**C'est quoi un controller ?**
La classe qui reçoit les requêtes HTTP entrantes et délègue le traitement au service approprié.

**C'est quoi un service (au sens couche métier) ?**
La classe qui contient la logique métier réelle, appelée par un controller, indépendante du protocole HTTP.

**C'est quoi un DTO (Data Transfer Object) ?**
Un objet qui décrit la forme et les règles de validation des données reçues dans une requête, avant qu'elles n'atteignent la logique métier.

**C'est quoi un Guard ?**
Une classe exécutée avant un controller qui autorise ou bloque l'accès à une route selon une condition (authentification, rôle...).

**C'est quoi un Interceptor ?**
Du code qui s'exécute autour du traitement d'une requête, pour transformer la requête entrante ou la réponse sortante (ex: retirer un champ sensible, mesurer un temps de traitement).

**C'est quoi un décorateur personnalisé ?**
Une annotation sur-mesure qui ajoute un comportement à une route ou extrait une donnée d'un paramètre, pour éviter de dupliquer du code dans chaque controller.

**C'est quoi un Reflector (ou mécanisme de métadonnées) ?**
Un outil qui permet de lire à l'exécution les informations posées par un décorateur, souvent utilisé dans un Guard pour adapter son comportement selon la route.

**C'est quoi le principe de responsabilité unique (SRP) ?**
Chaque classe ou module ne doit avoir qu'une seule responsabilité et une seule raison de changer.

**C'est quoi le découplage ?**
Réduire les dépendances directes entre les parties du code, pour pouvoir remplacer ou modifier l'une sans impacter les autres.

**C'est quoi Swagger / OpenAPI ?**
Un standard et un outil qui génèrent une documentation interactive d'une API à partir du code, permettant de tester les routes directement depuis un navigateur.

**C'est quoi le rate limiting ?**
Limiter le nombre de requêtes qu'un même client peut faire dans un temps donné, pour se protéger du brute-force ou d'une surcharge du serveur.

**C'est quoi le versioning d'une API ?**
Préfixer ou marquer les routes d'une API avec un numéro de version, pour pouvoir la faire évoluer sans casser les clients qui utilisent une version antérieure.

**C'est quoi un pipe/mécanisme de validation global, et à quoi sert le "whitelisting" des champs ?**
Un mécanisme qui valide automatiquement chaque requête entrante contre le schéma attendu. Le whitelisting retire ou rejette les champs non prévus dans ce schéma, pour éviter qu'un client envoie des données non désirées.

**C'est quoi un contrôle d'accès basé sur les rôles (RBAC) ?**
Restreindre l'accès à une fonctionnalité selon le rôle de l'utilisateur connecté (ex: utilisateur simple vs administrateur), vérifié côté serveur avant d'exécuter l'action.

**C'est quoi un code d'erreur métier ?**
Un identifiant stable et explicite renvoyé en plus du code HTTP, pour que le client puisse réagir précisément à un cas d'erreur sans avoir à analyser un message texte.

**C'est quoi un health check ?**
Une route qui vérifie que le service et ses dépendances critiques (base de données...) répondent correctement, utilisée par les outils de supervision ou d'orchestration.

**C'est quoi le "raw body" d'une requête, et quand en a-t-on besoin ?**
Le corps d'une requête conservé sous sa forme brute, non transformé — nécessaire quand un tiers doit vérifier une signature calculée sur les octets exacts envoyés (ex: la vérification d'un webhook).

**C'est quoi exempter une route du rate limiting ?**
Désactiver la limitation de requêtes sur une route précise, quand elle doit pouvoir recevoir légitimement beaucoup d'appels en peu de temps (ex: un service tiers qui notifie plusieurs événements d'affilée).

**C'est quoi un middleware ?**
Une fonction exécutée entre l'arrivée d'une requête et son traitement final, qui peut la modifier, la bloquer ou simplement l'observer (logs, headers de sécurité...).

**C'est quoi l'inversion de contrôle (IoC) ?**
Le principe où c'est le framework qui décide quand appeler le code de l'application (et lui fournit ses dépendances), plutôt que l'application qui pilote elle-même son propre déroulement.

**C'est quoi le pattern Repository ?**
Une couche qui isole l'accès aux données (requêtes en base) du reste de la logique métier, pour pouvoir changer la source de données sans toucher au reste du code.

**C'est quoi une API idempotente ?**
Une API où appeler plusieurs fois la même requête produit toujours le même résultat final, sans effet de bord supplémentaire à chaque répétition.

**C'est quoi la pagination d'une API ?**
Renvoyer les résultats d'une liste par petits lots (ex: 20 éléments) plutôt que tout d'un coup, pour rester rapide et léger même quand il y a beaucoup de données.

---

## Sécurité

**C'est quoi un JWT (JSON Web Token) ?**
Un jeton signé qui prouve l'identité d'un utilisateur, envoyé au client puis renvoyé à chaque requête pour prouver qu'il est connecté.

**Pourquoi préférer un cookie HTTP-only au localStorage pour stocker un token ?**
Un cookie HTTP-only n'est pas accessible en JavaScript, donc un script malveillant (XSS) ne peut pas voler le token.

**C'est quoi le hachage (ex: bcrypt) ?**
Transformer un mot de passe en une empreinte irréversible avant de le stocker en base, impossible à retrouver même si la base fuite.

**C'est quoi le salt et le facteur de coût en hachage de mot de passe ?**
Le salt est une donnée aléatoire ajoutée au mot de passe avant hachage ; le facteur de coût est le nombre de tours de calcul répétés pour ralentir volontairement le hachage et bloquer la force brute.

**C'est quoi un token à usage unique ?**
Un jeton qui devient invalide dès qu'il a servi une fois (ex: un lien de vérification ou de réinitialisation de mot de passe).

**C'est quoi le XSS (Cross-Site Scripting) ?**
Une attaque qui injecte du code malveillant exécuté dans le navigateur de la victime.

**C'est quoi l'injection SQL ?**
Une attaque qui insère du SQL malveillant dans une requête ; un ORM avec des requêtes préparées protège naturellement contre ce type d'attaque.

**C'est quoi la sanitization ?**
Nettoyer une donnée saisie par l'utilisateur (ex: retirer les espaces, mettre en minuscules) avant de la traiter ou de la stocker.

**C'est quoi le CSRF ?**
Une attaque qui fait exécuter une action à l'insu d'un utilisateur déjà connecté ; on s'en protège via un cookie `sameSite`, un token dédié, ou une vérification de l'origine de la requête.

**C'est quoi les principaux codes de statut HTTP ?**
201 = créé, 400 = données invalides, 401 = non authentifié, 403 = accès interdit, 404 = introuvable, 409 = conflit, 429 = trop de requêtes, 500 = erreur serveur.

**C'est quoi un middleware de sécurité (ex: Helmet) ?**
Un composant qui ajoute automatiquement des en-têtes HTTP de sécurité à chaque réponse (anti-clickjacking, anti-sniffing de type MIME, etc.).

**C'est quoi le CORS avec "credentials" ?**
Une configuration qui autorise explicitement une origine précise à faire des requêtes cross-origin en incluant les cookies, alors que par défaut le navigateur bloque cet envoi vers une origine non autorisée.

**Quelle est la différence entre une route publique et une route à authentification optionnelle ?**
Une route publique ignore totalement l'authentification. Une route à authentification optionnelle reste accessible sans connexion, mais identifie quand même l'utilisateur si un token valide est fourni.

**C'est quoi la validation des variables d'environnement au démarrage ?**
Un schéma qui vérifie que toutes les variables nécessaires sont présentes et valides avant que l'application ne démarre, pour échouer immédiatement plutôt que de planter plus tard en pleine requête.

**C'est quoi le principe "fail-fast" ?**
Vérifier les conditions bloquantes le plus tôt possible et arrêter immédiatement le traitement si l'une échoue, plutôt que de continuer un travail qui sera de toute façon annulé.

**C'est quoi le principe du moindre privilège ?**
Ne donner à chaque utilisateur, service ou composant que les droits strictement nécessaires à son fonctionnement, jamais plus.

**C'est quoi l'OWASP Top 10 ?**
Une liste de référence des 10 failles de sécurité web les plus courantes et les plus critiques (injection, mauvaise authentification, etc.), utilisée comme checklist par les développeurs.

**C'est quoi une attaque par force brute, et comment s'en protéger ?**
Essayer un grand nombre de combinaisons (mots de passe, tokens) jusqu'à trouver la bonne ; on s'en protège avec du rate limiting, un verrouillage temporaire après plusieurs échecs, et des mots de passe/tokens suffisamment longs.

**Pourquoi ne jamais committer un secret (clé API, mot de passe) dans le code ?**
Parce que l'historique Git garde une trace permanente, même si on le supprime plus tard ; les secrets doivent rester dans des variables d'environnement non versionnées.

**Quelle est la différence entre authentification et autorisation ?**
L'authentification vérifie qui est l'utilisateur (login) ; l'autorisation vérifie ce qu'il a le droit de faire une fois identifié.

---

## Base de données

**C'est quoi un ORM ?**
Un outil qui permet de manipuler les tables d'une base de données relationnelle comme des objets du langage de programmation, sans écrire de SQL brut.

**C'est quoi une migration ?**
Un fichier versionné qui décrit une modification du schéma de la base (création/modification de table), appliqué dans un ordre précis pour que toutes les instances de la base restent synchronisées.

**C'est quoi un UUID ?**
Un identifiant unique long et imprévisible, utilisé comme clé primaire à la place d'un simple entier auto-incrémenté.

**C'est quoi le soft delete ?**
Au lieu de supprimer une ligne, on remplit une colonne "date de suppression" pour la masquer sans perdre la donnée.

**C'est quoi une clé étrangère ?**
Une colonne qui référence l'ID d'une autre table (ex: l'ID de l'auteur dans une table d'articles), garantit la cohérence entre les tables.

**C'est quoi une relation 1:1, 1:N, N:N ?**
1:1 (un utilisateur a un seul profil), 1:N (un utilisateur peut passer plusieurs commandes), N:N (un produit peut appartenir à plusieurs catégories, et une catégorie contenir plusieurs produits).

**C'est quoi l'intégrité référentielle ?**
Le fait qu'il ne puisse pas exister de donnée "orpheline" : une ligne qui référence un ID qui n'existe plus.

**C'est quoi un enum en base de données ?**
Une colonne qui ne peut prendre qu'une liste fixe de valeurs (ex: un statut limité à "en attente"/"validé"/"refusé"), au lieu d'une chaîne de caractères libre.

**C'est quoi une transaction SQL ?**
Un ensemble d'opérations exécutées comme un bloc unique : soit toutes réussissent et sont validées, soit une échoue et tout est annulé, pour garantir la cohérence des données.

**C'est quoi un index en base de données ?**
Une structure qui accélère la recherche sur une colonne (comme le sommaire d'un livre), au prix d'un peu plus de place et d'un léger coût à l'écriture.

**C'est quoi le problème "N+1 requêtes" ?**
Le fait de faire une requête pour récupérer une liste, puis une requête supplémentaire par élément de cette liste pour récupérer ses données liées, au lieu de tout récupérer en une seule requête optimisée.

**C'est quoi ACID ?**
Les quatre garanties d'une transaction fiable : Atomicité (tout ou rien), Cohérence (la base reste valide), Isolation (les transactions ne se marchent pas dessus), Durabilité (une fois validée, la donnée survit à une panne).

**C'est quoi une contrainte d'unicité ?**
Une règle en base qui empêche deux lignes d'avoir la même valeur sur une colonne (ex: deux comptes avec le même email).

---

## Paiement en ligne

**Comment se déroule un paiement avec une page de paiement hébergée (ex: Stripe Checkout) ?**
Le client est redirigé vers une page de paiement gérée par le prestataire, paie, puis le prestataire notifie le serveur (webhook) qui valide la commande et débloque l'accès.

**Pourquoi utiliser une page de paiement hébergée plutôt que de gérer la carte bancaire soi-même ?**
Aucune donnée bancaire ne transite par son propre serveur, ce qui évite d'avoir à être conforme aux normes de sécurité bancaire (PCI-DSS) soi-même.

**C'est quoi un webhook ?**
Une notification qu'un service tiers envoie automatiquement à un serveur pour l'informer qu'un événement s'est produit (ex: un paiement réussi).

**C'est quoi l'idempotence, appliquée à un webhook ?**
Si le même événement est reçu plusieurs fois, le traitement ne doit pas être exécuté plusieurs fois ni créer de doublon.

**Comment protéger un contenu payant après un achat ?**
Le contenu sensible n'est renvoyé par l'API que si un achat validé existe en base pour cet utilisateur, vérifié côté serveur à chaque requête — jamais seulement caché ou désactivé côté interface.

**Quels sont les statuts typiques d'une commande ?**
En attente (créée mais pas encore payée), validée/complétée (paiement confirmé), échouée/annulée (paiement non abouti ou session expirée).

**Pourquoi valider des règles métier côté serveur avant de déclencher un paiement ?**
Pour éviter des cas incohérents (ex: acheter son propre produit, acheter deux fois le même article) : ces vérifications se font côté serveur, jamais seulement côté interface qui peut être contournée.

**Comment gérer un produit gratuit dans un système de paiement ?**
Un produit à prix nul ne doit jamais passer par le prestataire de paiement : il est débloqué directement côté serveur, sans création de session de paiement.

**Pourquoi convertir un prix en centimes avant d'appeler un prestataire de paiement ?**
La plupart des prestataires travaillent en plus petite unité de la devise (centimes), et manipuler des entiers évite les erreurs d'arrondi liées aux nombres flottants.

**C'est quoi un environnement "test" / sandbox chez un prestataire de paiement ?**
Un mode qui simule de vrais paiements avec des cartes de test, sans mouvement d'argent réel, pour développer et tester sans risque.

**Comment gérer un remboursement techniquement ?**
On appelle l'API de remboursement du prestataire de paiement, puis on met à jour le statut de la commande en base une fois la confirmation reçue (souvent via un nouveau webhook dédié).

---

## Frontend

**Quelle est la différence entre état serveur et état client ?**
L'état serveur vient de l'API et doit rester synchronisé avec elle (cache, rechargement) ; l'état client est propre à l'interface (ex: ouverture d'un menu, un formulaire en cours de saisie).

**C'est quoi une librairie de gestion d'état serveur (ex: TanStack Query) ?**
Une librairie qui gère le chargement, le cache et la synchronisation des données venant d'une API, pour éviter de recoder un système de cache à la main.

**C'est quoi une librairie de gestion d'état client global (ex: Zustand, Redux) ?**
Une librairie qui centralise un état partagé entre plusieurs composants de l'interface (ex: l'utilisateur connecté, des notifications), sans avoir à le faire remonter manuellement de composant en composant.

**C'est quoi un hook React ?**
Une fonction réutilisable qui encapsule une logique liée à l'état ou au cycle de vie d'un composant.

**C'est quoi la validation de formulaire avec un schéma (ex: Zod) ?**
Un schéma qui décrit les règles attendues sur les champs d'un formulaire et rejette les données invalides avant l'envoi à l'API.

**C'est quoi le routing côté client ?**
Changer de page dans une application sans recharger tout le site, en gérant les URLs directement dans le navigateur.

**C'est quoi le responsive design ?**
Une interface qui s'adapte à toutes les tailles d'écran (mobile, tablette, desktop), souvent via des media queries ou un framework CSS utilitaire.

**Comment protéger une page réservée aux utilisateurs connectés côté frontend ?**
Un composant ou une garde de route vérifie le statut d'authentification avant d'afficher la page, et redirige vers la connexion sinon — cette protection reste un confort d'UX, la vraie sécurité est toujours revérifiée côté serveur.

**C'est quoi une couche d'accès à l'API côté frontend ?**
Un ensemble de fonctions qui centralisent tous les appels HTTP vers le backend, pour que les composants ne manipulent jamais directement le client HTTP et restent découplés du détail des routes.

**C'est quoi une SPA (Single Page Application) ?**
Une application web qui charge une seule page HTML au départ, puis met à jour le contenu dynamiquement en JavaScript sans recharger la page à chaque navigation.

**C'est quoi le lazy loading ?**
Charger une ressource (image, composant, page) seulement au moment où elle devient réellement nécessaire, plutôt que tout charger d'un coup au démarrage.

**C'est quoi une mise à jour optimiste (optimistic update) ?**
Mettre à jour l'interface immédiatement en supposant que l'action va réussir, avant même la réponse du serveur, puis annuler l'affichage si jamais elle échoue — pour donner une sensation de rapidité.

---

## Infra / Déploiement

**C'est quoi un reverse proxy ?**
Un point d'entrée unique qui reçoit toutes les requêtes et les redirige vers le bon service selon l'URL, et gère souvent le HTTPS.

**C'est quoi Docker Compose ?**
Un fichier qui décrit et démarre plusieurs conteneurs liés (application, base de données, proxy...) avec une seule commande.

**C'est quoi Certbot / un certificat HTTPS ?**
Un outil qui génère et renouvelle automatiquement un certificat SSL pour chiffrer les échanges entre le client et le serveur.

**Quelle est la différence entre un environnement de dev et de prod ?**
Deux configurations différentes (base de données, clés secrètes, URLs) pour le même code, séparées via des fichiers de configuration distincts.

**C'est quoi un pipeline de déploiement (CI/CD) ?**
La suite d'étapes automatisées (build, tests, mise en ligne) qui envoie le code sur le serveur de production à chaque changement validé.

**C'est quoi un cache applicatif (ex: Redis) ?**
Une base de données en mémoire très rapide, utilisée pour stocker temporairement des résultats coûteux à recalculer, des sessions, ou des files d'attente.

**C'est quoi un entrypoint de conteneur, et pourquoi y lancer les migrations ?**
Le script exécuté au démarrage d'un conteneur avant l'application elle-même ; il sert souvent à appliquer les migrations de base de données en attente, pour garantir que le schéma est à jour avant que le service ne commence à traiter du trafic.

**Quelle est la différence entre une image Docker et un conteneur ?**
L'image est le modèle figé (fichiers, dépendances, configuration) ; le conteneur est une instance en cours d'exécution de cette image, comme la différence entre une classe et un objet.

**C'est quoi un registre d'images (ex: Docker Hub) ?**
Un service qui stocke des images Docker et permet de les récupérer (`pull`) depuis n'importe quelle machine, au lieu de reconstruire l'image à chaque déploiement.

**C'est quoi un volume Docker ?**
Un espace de stockage qui existe en dehors du cycle de vie d'un conteneur, pour que les données survivent même si le conteneur est supprimé ou recréé.

**Quelle est la différence entre scaling horizontal et vertical ?**
Le scaling vertical augmente la puissance d'une seule machine (plus de CPU/RAM) ; le scaling horizontal ajoute plusieurs machines/instances qui se partagent la charge.

**C'est quoi un load balancer ?**
Un composant qui répartit le trafic entrant entre plusieurs instances d'un même service, pour équilibrer la charge et éviter qu'une seule instance soit surchargée.

**C'est quoi un rollback de déploiement ?**
Revenir à la version précédente de l'application après un déploiement problématique, généralement en redéployant l'ancienne image Docker.

**C'est quoi un environnement de staging ?**
Un environnement intermédiaire qui reproduit la production le plus fidèlement possible, utilisé pour valider une version avant sa mise en ligne réelle.
