# Oral CDA — PromptVerse

Texte complet à dire, diapo par diapo, avec des mots simples.
Tu n'as pas besoin de l'apprendre par cœur : lis-le plusieurs fois à voix haute, puis parle avec tes propres mots en gardant les idées.
Adapte ton rythme au temps indiqué sur ta convocation.

---

## Avant de commencer

- Ouvre le PowerPoint en plein écran sur la diapo 1, et garde le PDF de la présentation en secours sur une clé USB.
- Ouvre https://promptverse.biz dans un autre onglet.
- Prépare trois comptes de démo : un vendeur, un acheteur et un administrateur, avec leurs mots de passe notés quelque part.
- Vérifie avant l'examen que l'achat avec Stripe marche bien sur le site.
- Mets de l'eau à côté de toi. Respire, et parle lentement : c'est normal de faire des pauses.

---

## Diapo 1 — Titre

> Bonjour à tous. Je m'appelle Abduljaber Al Omran. Je suis en formation de Concepteur Développeur d'Applications chez Simplon.
>
> Aujourd'hui, je vais vous présenter PromptVerse. C'est le projet chef-d'œuvre que nous avons réalisé pendant la formation.
>
> PromptVerse est une marketplace, c'est-à-dire un site de vente en ligne, spécialisée dans les prompts pour les intelligences artificielles. Le site est déjà en ligne, vous pouvez le voir à l'adresse promptverse.biz, et je vous en ferai une démonstration à la fin.

## Diapo 2 — Sommaire

> Voici comment ma présentation est organisée.
>
> Je vais commencer par vous présenter le projet et l'équipe. Ensuite, je vous expliquerai comment nous nous sommes organisés et quels outils nous avons utilisés.
>
> Puis je passerai à la partie technique : la conception, avec les diagrammes et la base de données, ensuite l'architecture et le back-end, puis le front-end.
>
> Après ça, je parlerai de la sécurité, des tests, et du déploiement, c'est-à-dire comment l'application a été mise en ligne.
>
> Et pour finir, je vous parlerai de ma veille sur la sécurité, des évolutions possibles du projet, et je vous ferai une démonstration du site.

## Diapo 3 — Introduction

> Pour me présenter rapidement : je suis apprenant en formation Concepteur Développeur d'Applications chez Simplon. C'est un titre professionnel de niveau 6.
>
> Pendant cette formation, nous avons dû réaliser un projet chef-d'œuvre, du début à la fin : analyser un besoin, concevoir l'application, la développer, la tester et la mettre en production.
>
> Notre projet s'appelle PromptVerse. Nous l'avons réalisé en équipe de trois, et aujourd'hui il est réellement en ligne, sur un vrai serveur, avec un nom de domaine et une connexion sécurisée en HTTPS.

## Diapo 4 — Le projet

> Alors, pourquoi PromptVerse ?
>
> Aujourd'hui, beaucoup de gens utilisent des intelligences artificielles comme ChatGPT, Midjourney ou Claude. Pour avoir un bon résultat, il faut leur donner une bonne instruction, qu'on appelle un prompt. Le problème, c'est qu'écrire un bon prompt demande du temps et de l'expérience.
>
> Notre idée, c'est de créer une place de marché : les personnes qui savent bien écrire des prompts peuvent les vendre, et les autres peuvent les acheter pour gagner du temps. Il n'y a pas de rôle vendeur à part : chaque utilisateur inscrit peut à la fois acheter et vendre.
>
> Le site a quatre grandes parties :
> - le **catalogue**, où on peut parcourir les prompts et les filtrer par catégorie ou par outil d'IA ;
> - la **publication**, où chaque utilisateur peut mettre en vente ses propres prompts, avec un prix, un aperçu et des images ;
> - l'**achat**, qui se fait avec Stripe, un service de paiement en ligne. Si un prompt coûte 0 euro, il est gratuit et accessible directement ;
> - et l'**administration**, pour gérer les utilisateurs, leurs rôles, les catégories et les outils d'IA.
>
> La règle la plus importante du site, c'est que le contenu d'un prompt payant reste caché tant que l'achat n'est pas payé. C'est ce qu'on vend, donc il ne doit jamais être visible gratuitement.

## Diapo 5 — L'équipe

> Ce projet, nous l'avons fait à trois : Amine, Anis et moi.
>
> Nous avons travaillé ensemble sur toutes les étapes : la conception, le développement et la mise en ligne. Nous avions un seul dépôt de code en commun, et nous nous répartissions les tâches.
>
> Nous étions aussi suivis par notre formateur à Simplon. Il nous donnait les objectifs de chaque sprint, et il validait ce que nous avions livré à la fin de chaque étape.

## Diapo 6 — Communication et organisation

> Pour nous organiser, nous avons utilisé la méthode Scrum. C'est une méthode agile : au lieu de tout faire d'un coup, on découpe le projet en petites périodes de travail qu'on appelle des sprints. Nous avons fait 8 sprints. À la fin de chaque sprint, on vérifiait que ce qui était prévu était bien fait et bien testé avant de passer au suivant.
>
> Pour suivre les tâches, nous avions un tableau **Trello**. Chaque tâche était une carte, avec une user story, c'est-à-dire une phrase qui décrit le besoin du point de vue de l'utilisateur, et une liste de choses à faire.
>
> Le code était sur **GitHub**, avec trois branches : `dev` pour le développement au quotidien, `main` pour la version stable, et `deploy` pour la mise en production.
>
> Nous avons aussi utilisé **OpenSpec**. Le principe, c'est d'écrire la spécification d'une fonctionnalité avant de la coder : le besoin, comment on va faire, et les critères pour dire que c'est terminé. Comme ça, on sait exactement quoi coder, et les critères deviennent ensuite nos tests.
>
> À droite, vous voyez le planning de nos sprints : on commence par le cadrage et la conception, puis le développement, et on finit par la mise en production.

## Diapo 7 — Stack et outils

> Voici les technologies que nous avons utilisées.
>
> Pour le **front-end**, c'est-à-dire la partie que l'utilisateur voit dans son navigateur, nous avons utilisé React 19 avec TypeScript. TypeScript, c'est du JavaScript avec des types, ce qui permet de trouver beaucoup d'erreurs avant même de lancer le code. Vite sert à lancer et à construire l'application. TanStack Query gère les données qui viennent du serveur, React Router gère la navigation entre les pages, et Tailwind avec daisyUI s'occupe du style.
>
> Pour le **back-end**, c'est-à-dire le serveur, nous avons utilisé NestJS, un framework Node.js en TypeScript. Il est bien organisé et il a des outils intégrés pour la sécurité. La base de données est MySQL, et nous y accédons avec TypeORM, qui permet de manipuler la base avec du code TypeScript au lieu d'écrire du SQL à la main. Pour la connexion des utilisateurs, nous utilisons des jetons JWT et le hachage des mots de passe avec bcrypt. Stripe gère les paiements, et Jest sert pour les tests.
>
> Pour le **DevOps**, c'est-à-dire la mise en ligne, nous avons utilisé Docker pour mettre chaque partie de l'application dans un conteneur, GitHub Actions pour automatiser les tests et le déploiement, et Nginx comme serveur web devant l'application, avec un certificat Let's Encrypt pour le HTTPS. Swagger nous sert à documenter l'API.

## Diapo 8 — Chapitre Conception

> Je passe maintenant à la conception. Avant d'écrire la moindre ligne de code, nous avons d'abord analysé le besoin et fait des diagrammes, pour savoir exactement ce que nous allions construire.

## Diapo 9 — Diagramme de cas d'utilisation

> Voici le diagramme de cas d'utilisation. Il montre qui utilise l'application et ce que chaque personne peut faire.
>
> Il y a quatre acteurs :
> - le **visiteur**, qui n'est pas connecté : il peut parcourir le catalogue, voir la fiche d'un prompt, s'inscrire et se connecter ;
> - l'**utilisateur** connecté : il peut en plus publier des prompts, en acheter, voir ses achats et ses ventes, et gérer son profil ;
> - l'**administrateur** : il peut en plus gérer les catégories et les outils d'IA, et voir la liste des utilisateurs ;
> - et le **super-administrateur** : c'est le seul qui peut changer le rôle d'un utilisateur.
>
> Les flèches entre les acteurs montrent un héritage : chaque rôle peut faire tout ce que fait le rôle au-dessus de lui, plus ses propres actions.
>
> Et à droite, il y a Stripe, qui est un système externe. Quand un utilisateur achète un prompt, ça inclut forcément la confirmation du paiement par Stripe.

## Diapo 10 — Modèle conceptuel de données

> Pour concevoir la base de données, nous avons utilisé la méthode Merise. Voici le MCD, le modèle conceptuel de données.
>
> Les rectangles sont les entités, c'est-à-dire les grandes informations qu'on stocke : l'utilisateur, son profil, ses liens sociaux, le prompt, ses images d'aperçu, la catégorie et l'outil d'IA.
>
> Les ovales sont les associations, qui relient les entités entre elles, avec des cardinalités. Par exemple : un utilisateur peut vendre zéro ou plusieurs prompts, et un prompt est vendu par un seul utilisateur. Un prompt appartient à une seule catégorie, mais une catégorie peut avoir plusieurs prompts.
>
> L'association la plus intéressante est « achète ». Un utilisateur peut acheter plusieurs prompts, et un prompt peut être acheté par plusieurs utilisateurs. En plus, cette association a ses propres données : le montant payé, le statut du paiement et l'identifiant de la session Stripe. C'est pour ça qu'elle devient une vraie table, la table `purchases`, quand on passe au modèle logique.

## Diapo 11 — Modèle physique et diagramme de classes

> À gauche, vous voyez le modèle physique, c'est-à-dire les vraies tables dans MySQL, avec leurs colonnes et leurs liens. Nous avons 8 tables.
>
> Deux choix sont importants. D'abord, les identifiants sont des UUID, c'est-à-dire de longs identifiants aléatoires, au lieu de simples numéros 1, 2, 3. Comme ça, personne ne peut deviner un identifiant ni savoir combien il y a d'utilisateurs. Ensuite, les prix sont stockés en DECIMAL, pour éviter les erreurs d'arrondi qu'on peut avoir avec les nombres à virgule classiques.
>
> À droite, c'est le diagramme de classes. Il montre les mêmes informations, mais du côté du code : ce sont les entités TypeORM, avec leurs propriétés, leurs relations et les listes de valeurs possibles, comme les rôles ou les statuts d'un achat.

## Diapo 12 — Diagramme de séquence de l'achat

> Ce diagramme de séquence montre, dans l'ordre, tous les échanges quand quelqu'un achète un prompt. Je l'ai résumé en 5 étapes à droite.
>
> **Étape 1** : l'acheteur clique sur « Acheter ». Le front envoie une demande à notre API, et l'API vérifie les règles : le prompt n'est pas gratuit, ce n'est pas son propre prompt, et il ne l'a pas déjà acheté.
>
> **Étape 2** : si tout est bon, l'API enregistre un achat « en attente » dans la base, puis demande à Stripe de créer une page de paiement.
>
> **Étape 3** : l'acheteur est envoyé sur la page de Stripe et il paie avec sa carte. Les données bancaires ne passent jamais par notre application.
>
> **Étape 4** : quand le paiement est validé, Stripe prévient notre API avec un webhook, c'est-à-dire un message envoyé automatiquement à notre serveur. L'API vérifie que ce message vient bien de Stripe, puis elle passe l'achat en « terminé ».
>
> **Étape 5** : le contenu du prompt est débloqué pour l'acheteur.

## Diapo 13 — Du wireframe à l'application

> Pour l'interface, nous avons travaillé en trois étapes.
>
> D'abord, le **wireframe**, à gauche : c'est un croquis simple, en gris, qui montre seulement où se trouvent les différentes zones de la page.
>
> Ensuite, la **maquette haute fidélité**, au milieu : on y ajoute les vraies couleurs, les textes et les images, pour voir à quoi le site va vraiment ressembler.
>
> Et enfin, à droite, le **rendu final**, c'est-à-dire le site réellement développé. Nous avons gardé un thème sombre, avec une couleur bleue pour les boutons et les éléments importants.

## Diapo 14 — Chapitre Architecture et back-end

> Maintenant, je vais vous parler de l'architecture de l'application et de la partie serveur, le back-end.

## Diapo 15 — Architecture de l'application

> Voici l'architecture complète de l'application en production.
>
> L'utilisateur arrive par son navigateur, en HTTPS. Toutes les requêtes passent d'abord par **Nginx**, qui est le seul point d'entrée. Nginx envoie les pages du site vers le client React, et toutes les requêtes qui commencent par `/api` vers notre API NestJS.
>
> L'API est organisée en couches : les contrôleurs, les services et les repositories. Elle parle à la base de données MySQL, elle enregistre les images envoyées par les utilisateurs dans un dossier sur le serveur, elle utilise Stripe pour les paiements, et un serveur d'emails pour envoyer les emails de vérification.
>
> Cette architecture est **découplée** : le front-end ne parle jamais directement à la base de données, il passe toujours par l'API. L'avantage, c'est que toutes les règles de sécurité sont au même endroit, côté serveur, et qu'on ne peut pas les contourner depuis le navigateur.

## Diapo 16 — Circulation d'une requête dans l'API

> Voici le chemin que suit une requête à l'intérieur de l'API.
>
> 1. Le **contrôleur** reçoit la requête. C'est lui qui définit la route, par exemple « POST /purchases/checkout-session ». Avant d'arriver dans le contrôleur, la requête passe par des guards, qui vérifient si l'utilisateur est connecté et s'il a le droit d'accéder à cette route.
> 2. Le **DTO** vérifie que les données envoyées sont correctes. Par exemple, pour un achat, l'identifiant du prompt doit être un UUID valide. Si ce n'est pas le cas, la requête est refusée directement.
> 3. Le **service** applique les règles métier, par exemple : « on ne peut pas acheter son propre prompt ».
> 4. Le **repository** s'occupe de lire et d'écrire dans la base, grâce à TypeORM.
> 5. Et enfin, les données sont enregistrées dans **MySQL**.
>
> En bas, vous avez l'exemple complet avec l'achat d'un prompt. Le fait de séparer le code en couches comme ça, c'est plus clair, plus facile à tester et plus facile à faire évoluer.

## Diapo 17 — Authentification

> Voici comment fonctionne la connexion.
>
> Quand un utilisateur s'inscrit, son mot de passe n'est jamais enregistré tel quel : il est **haché avec bcrypt**. Ça veut dire qu'on le transforme en une suite de caractères qu'on ne peut pas retransformer en mot de passe. Même si quelqu'un volait la base de données, il ne pourrait pas lire les mots de passe.
>
> Pour se connecter, l'utilisateur doit aussi avoir **vérifié son adresse email**, en cliquant sur le lien qu'il reçoit à l'inscription.
>
> Quand la connexion réussit, l'API crée un **jeton JWT**. C'est une sorte de badge signé qui contient l'identifiant et le rôle de l'utilisateur. On ne renvoie pas ce jeton dans la réponse : on le met dans un **cookie httpOnly**. Un cookie httpOnly ne peut pas être lu par le JavaScript de la page. Donc si un pirate arrivait à injecter du code dans le site, avec une faille XSS, il ne pourrait pas voler le jeton. Le cookie est aussi `secure`, ce qui veut dire qu'il n'est envoyé qu'en HTTPS.
>
> Il y a aussi un **guard global** : toutes les routes de l'API sont privées par défaut. Pour qu'une route soit accessible sans être connecté, il faut l'indiquer exprès avec `@Public()`. Comme ça, on ne peut pas oublier de protéger une route.
>
> Et enfin, la route de connexion a une **limite de tentatives** : au bout de 5 essais en une minute, l'utilisateur est bloqué pendant 15 minutes. Ça protège contre les attaques par force brute, où quelqu'un essaie des milliers de mots de passe.

## Diapo 18 — Protéger le contenu payant

> Voici le code de la règle la plus importante du site : qui a le droit de voir le contenu d'un prompt.
>
> Quand quelqu'un ouvre la fiche d'un prompt, l'API vérifie trois choses :
> - est-ce que la personne est le **vendeur** du prompt ?
> - est-ce que le prompt est **gratuit**, avec un prix à 0 euro ?
> - est-ce que la personne a un **achat payé** pour ce prompt ?
>
> Si une de ces trois conditions est vraie, l'API envoie le contenu complet. Sinon, elle envoie `null` à la place, donc rien.
>
> Le tableau à droite résume les cas : un visiteur ou un utilisateur qui n'a pas acheté ne voit rien ; le vendeur, un acheteur qui a payé, ou n'importe qui sur un prompt gratuit voit le contenu.
>
> Et dans la liste du catalogue, c'est encore plus strict : on ne demande même pas le contenu à la base de données. Comme ça, il ne peut jamais apparaître par erreur dans une liste.

## Diapo 19 — Paiement Stripe et webhook

> Voici deux parties du code du paiement.
>
> En haut, avant de créer le paiement, on vérifie trois règles. Si le prompt est gratuit, on refuse, parce qu'il n'y a rien à payer. Si c'est son propre prompt, on refuse aussi. Et si l'utilisateur l'a déjà acheté, on refuse pour éviter qu'il paie deux fois. À chaque fois, l'API renvoie un code d'erreur clair, que le front transforme en message pour l'utilisateur.
>
> En bas, c'est ce qui se passe quand Stripe confirme le paiement avec le webhook. Stripe peut parfois envoyer le même message plusieurs fois. Si on ne faisait pas attention, le vendeur pourrait être payé deux fois. Donc on vérifie d'abord : si l'achat est déjà terminé, on ne fait rien. C'est ce qu'on appelle un traitement **idempotent** : qu'on le fasse une fois ou plusieurs fois, le résultat est le même. Sinon, on passe l'achat en terminé, on augmente le nombre de ventes du prompt, et on ajoute le montant au solde du vendeur.
>
> À droite : ce webhook est accessible publiquement, puisque Stripe n'a pas de compte chez nous. Mais on vérifie la **signature** de chaque message avec une clé secrète partagée avec Stripe. Si quelqu'un envoie un faux message pour dire « j'ai payé », il est rejeté.

## Diapo 20 — Chapitre Front-end

> Passons maintenant au front-end, c'est-à-dire l'application que l'utilisateur voit dans son navigateur. C'est une application React, qui fonctionne sur une seule page et qui change de contenu sans recharger toute la page.

## Diapo 21 — Organisation du front-end

> Le code du front est rangé par rôle, pour s'y retrouver facilement :
> - `pages`, avec un fichier pour chaque écran du site ;
> - `components`, avec les morceaux d'interface qu'on réutilise, comme les boutons ou les cartes des prompts ;
> - `common/api`, qui contient tous les appels à notre API ;
> - `hooks`, avec les requêtes gérées par TanStack Query ;
> - et `common/store`, avec l'état de l'interface géré par Zustand, par exemple l'utilisateur connecté ou les messages de notification.
>
> Pourquoi TanStack Query et Zustand ? Sans eux, il faudrait gérer à la main le chargement, les erreurs et la mise en cache des données pour chaque page, ce qui donne beaucoup de code répété et donc plus de bugs. TanStack Query fait tout ça automatiquement pour les données qui viennent du serveur. Zustand, lui, garde l'état de l'interface. On sépare bien les deux. Et c'est beaucoup plus simple et plus léger que Redux pour notre besoin.

## Diapo 22 — Routes protégées et formulaires

> À gauche, c'est une route protégée. Certaines pages, comme le tableau de bord, ne sont accessibles qu'aux utilisateurs connectés. Pendant qu'on vérifie la session, on affiche un chargement. Si l'utilisateur n'est pas connecté, on le renvoie vers la page de connexion, et on garde en mémoire la page qu'il voulait voir pour l'y ramener après.
>
> À droite, c'est la validation du formulaire d'inscription avec zod. On décrit les règles : le pseudo doit faire entre 3 et 50 caractères, l'email doit être valide, les deux mots de passe doivent être identiques, et il faut accepter les conditions. Si une règle n'est pas respectée, un message s'affiche directement sous le champ, avant même d'envoyer quoi que ce soit au serveur.
>
> Mais attention : ces vérifications côté navigateur servent au confort de l'utilisateur. Quelqu'un de malin pourrait les contourner. C'est pour ça que la vraie sécurité est toujours dans l'API, qui revérifie tout.

## Diapo 23 — L'application

> Voici quelques écrans de l'application :
> - en haut à gauche, le **catalogue**, avec les filtres par catégorie et par outil d'IA, et un badge « Gratuit » sur les prompts à 0 euro ;
> - en haut à droite, la **fiche d'un prompt**, avec son titre, son prix, son aperçu et le bouton pour l'acheter ;
> - en bas à gauche, le **tableau de bord du vendeur**, avec ses statistiques, ses prompts en vente et ses ventes ;
> - et en bas à droite, l'**administration**, où le super-administrateur peut changer le rôle des utilisateurs.
>
> Je vous montrerai tout ça en direct pendant la démonstration.

## Diapo 24 — Chapitre Sécurité

> Je passe à la sécurité. Pour nous, ce n'était pas quelque chose à ajouter à la fin : nous l'avons prise en compte dès la conception du projet.

## Diapo 25 — Mesures de sécurité

> Voici un résumé des mesures de sécurité que nous avons mises en place :
> - **Authentification** : les mots de passe sont hachés avec bcrypt, et le jeton de connexion est dans un cookie httpOnly et sécurisé.
> - **Contrôle d'accès** : toutes les routes sont privées par défaut, et certaines sont réservées aux administrateurs grâce aux rôles.
> - **Validation** : toutes les données reçues sont vérifiées, et si quelqu'un envoie un champ qui n'est pas prévu, la requête est refusée. Par exemple, on ne peut pas envoyer un faux prix.
> - **Limitation de débit** : on limite le nombre de requêtes, dans l'API et aussi dans Nginx, pour se protéger contre la force brute et les surcharges.
> - **Injection SQL** : on n'écrit jamais de SQL à la main avec les données de l'utilisateur. TypeORM utilise des requêtes paramétrées, donc un utilisateur ne peut pas injecter du code SQL.
> - **Transport** : tout passe en HTTPS, avec des en-têtes de sécurité ajoutés par Helmet et Nginx, et le CORS n'autorise que notre site à appeler l'API.

## Diapo 26 — RGPD et accessibilité

> Pour les **données personnelles** et le RGPD :
> - nous ne demandons que le minimum : un email et un pseudo ;
> - les mots de passe sont hachés, jamais stockés en clair ;
> - aucune donnée bancaire n'est stockée chez nous, tout le paiement se fait chez Stripe ;
> - l'utilisateur doit accepter les conditions d'utilisation à l'inscription ;
> - et il peut supprimer son compte depuis ses paramètres.
>
> Pour l'**accessibilité** :
> - chaque champ de formulaire a un libellé, ce qui aide les lecteurs d'écran ;
> - les images ont un texte alternatif ;
> - les messages d'erreur sont écrits en texte sous le champ concerné ;
> - et le thème sombre a un fort contraste entre le texte et le fond.
>
> Un audit complet selon le RGAA, le référentiel français d'accessibilité, fait partie de ce qui reste à faire.

## Diapo 27 — Chapitre Tests

> Je vais maintenant vous parler des tests, qui permettent de vérifier que l'application fait bien ce qu'on attend d'elle.

## Diapo 28 — Tests unitaires et jeu d'essai

> Nous avons deux types de tests.
>
> D'abord, les **tests unitaires** avec Jest. Un test unitaire vérifie une petite partie du code toute seule, sans base de données et sans Stripe : on remplace ces dépendances par des « mocks », c'est-à-dire de fausses versions qu'on contrôle. Nous avons 18 tests unitaires, et ils passent tous. Ils testent les parties les plus sensibles : qui peut voir le contenu d'un prompt, toutes les règles de l'achat, et le changement de rôle des utilisateurs.
>
> Le code affiché est un exemple : il vérifie que si Stripe envoie deux fois le même paiement, l'achat n'est pas enregistré une deuxième fois et le vendeur n'est pas crédité deux fois.
>
> Ensuite, j'ai fait un **jeu d'essai** sur la fonctionnalité la plus importante, l'achat. Cette fois, ce sont de vraies requêtes envoyées à l'API qui tourne avec Docker. Par exemple : un visiteur qui essaie d'acheter sans être connecté, un vendeur qui essaie d'acheter son propre prompt, quelqu'un qui envoie un faux webhook, ou qui essaie d'ajouter un faux prix dans la requête. Pour chaque cas, on compare le résultat attendu avec le résultat obtenu.
>
> Sur 11 scénarios, 10 étaient conformes. Le seul écart venait de la clé Stripe de test qui n'était plus valide dans notre environnement local. Ce n'était pas un problème dans le code, et l'API a bien renvoyé une erreur propre, sans rien casser.

## Diapo 29 — Chapitre DevOps et déploiement

> Pour finir la partie technique, je vais vous expliquer comment l'application est mise en ligne, depuis notre code jusqu'au serveur de production.

## Diapo 30 — Conteneurisation avec Docker

> Nous utilisons Docker. Docker permet de mettre chaque partie de l'application dans un conteneur, avec tout ce dont elle a besoin pour fonctionner. Comme ça, l'application marche de la même façon sur l'ordinateur de chacun et sur le serveur.
>
> Nous avons deux environnements :
> - en **développement**, avec l'API, le client, la base MySQL et Mailpit, un faux serveur d'emails qui nous permet de voir les emails envoyés sans les envoyer vraiment. Le code est relié aux conteneurs, donc chaque modification est prise en compte directement, sans tout relancer ;
> - en **production**, avec Nginx devant, l'API et le client qui viennent d'images déjà construites, et la base de données avec un volume pour que les données ne soient jamais perdues.
>
> À droite, le Dockerfile de l'API est construit en plusieurs étapes. La première compile le code TypeScript, la deuxième installe seulement les dépendances nécessaires en production, et la dernière ne garde que le résultat. L'image finale est donc plus légère, et elle ne tourne pas avec l'utilisateur administrateur du système, ce qui est plus sûr.
>
> Et au démarrage, un script attend que la base de données soit prête, lance automatiquement les migrations pour mettre la base à jour, puis démarre l'API.

## Diapo 31 — Pipeline CI/CD

> Pour la mise en ligne, nous avons automatisé tout le processus avec GitHub Actions. C'est ce qu'on appelle la CI/CD : l'intégration et le déploiement continus.
>
> Quand on envoie du code sur la branche `deploy`, quatre étapes se lancent automatiquement :
> 1. les **tests du back-end** : la vérification du style du code et les tests Jest ;
> 2. les **tests du front-end** : la vérification du code et la construction de l'application ;
> 3. si tout est bon, la **construction des images Docker**, qui sont envoyées sur Docker Hub ;
> 4. et enfin le **déploiement** : GitHub se connecte à notre serveur, récupère les nouvelles images et redémarre l'application.
>
> Si un test échoue, le déploiement ne se fait pas. Comme ça, on ne peut pas mettre en ligne une version cassée.

## Diapo 32 — Mise en production

> L'application tourne sur un **VPS**, c'est-à-dire un serveur privé loué, sous Linux, avec Docker.
>
> **Nginx** est le seul service accessible depuis Internet. La base de données, elle, n'est pas accessible de l'extérieur.
>
> Le site est en **HTTPS**, avec un certificat gratuit fourni par Let's Encrypt.
>
> Les **données**, c'est-à-dire la base et les images envoyées par les utilisateurs, sont gardées dans des volumes Docker, donc elles ne sont pas perdues quand on met à jour l'application.
>
> Et chaque version de l'application est enregistrée avec le numéro de son commit. Donc si une mise à jour pose un problème, on peut facilement revenir à la version d'avant.
>
> Le site est accessible à l'adresse promptverse.biz.

## Diapo 33 — Veille sur les vulnérabilités

> Pendant le projet, j'ai fait une veille sur la sécurité. J'ai utilisé l'OWASP, qui publie la liste des dix risques les plus importants pour les applications web, le CERT-FR de l'ANSSI, qui publie les alertes de sécurité en France, et l'outil `npm audit`, qui vérifie si nos bibliothèques ont des failles connues.
>
> Résultat de l'audit : côté client, aucune vulnérabilité. Côté API, il y a 15 alertes dans les bibliothèques qu'on utilise. La plupart se corrigent en mettant simplement ces bibliothèques à jour.
>
> J'ai aussi trouvé une faille dans notre propre code. Pour l'envoi d'images, nous acceptons tous les fichiers dont le type commence par « image ». Le problème, c'est que ça accepte aussi les fichiers SVG, qui peuvent contenir du JavaScript. Et en plus, ce type est donné par le navigateur, donc il peut être falsifié. Un pirate pourrait donc envoyer une fausse image qui exécute du code.
>
> La correction prévue, c'est d'accepter seulement les formats JPEG, PNG et WebP, de vérifier le vrai contenu du fichier et pas seulement son type, et d'ajouter la vérification des bibliothèques dans notre pipeline de déploiement.

## Diapo 34 — Évolutions du projet

> Le projet n'est pas terminé, et nous avons déjà des idées pour la suite :
> - des **avis et des notes** sur les prompts achetés ;
> - une **liste de favoris** ;
> - une **recherche** par mot-clé dans le catalogue ;
> - le **reversement de l'argent aux vendeurs** avec Stripe Connect, pour qu'ils puissent récupérer leurs gains ;
> - plus de **tests**, avec des tests de bout en bout qui simulent un vrai utilisateur ;
> - et plus de **sécurité** : corriger l'envoi d'images, demander des mots de passe plus longs, et mettre à jour les bibliothèques.

## Diapo 35 — Démonstration

> Je vais maintenant vous montrer l'application en direct.

Déroulé de la démo, avec ce que tu peux dire à chaque étape :

1. **Page d'accueil puis catalogue.**
   > Voici la page d'accueil, avec les catégories, les outils d'IA et les prompts récents. Dans le catalogue, je peux filtrer par catégorie ou par outil.

2. **Ouvrir un prompt payant sans être connecté.**
   > Je ne suis pas connecté. J'ouvre un prompt payant : je vois le titre, le prix et l'aperçu, mais pas le contenu complet. Il est caché par l'API.

3. **Se connecter en vendeur et publier un prompt.**
   > Je me connecte avec un compte vendeur. Dans le tableau de bord, je vois mes statistiques et mes ventes. Je publie un nouveau prompt : je choisis une catégorie, un outil d'IA, un prix, et j'ajoute une image. Le prompt est en ligne tout de suite.

4. **Se connecter en acheteur et acheter.**
   > Je me connecte maintenant avec un compte acheteur, et j'achète un prompt. Je suis envoyé sur la page de paiement de Stripe. Je paie avec une carte de test. Je reviens sur le site, le paiement est confirmé, et le contenu du prompt est maintenant visible.

5. **Se connecter en administrateur.**
   > Pour finir, avec un compte administrateur, je peux gérer les catégories et les outils d'IA. Et avec le super-administrateur, je peux changer le rôle d'un utilisateur.

Si Internet ne marche pas pendant l'examen, montre les captures de la diapo 23 et explique le parcours avec le diagramme de séquence de la diapo 12.

## Diapo 36 — Conclusion

> Pour conclure, ce projet a été très enrichissant pour moi.
>
> D'abord, il m'a permis de faire **tout le cycle de vie d'une application** : analyser le besoin, concevoir avec UML et Merise, développer le back-end et le front-end, tester, et mettre en production. Avant, je n'avais jamais fait tout ça sur un même projet.
>
> Ensuite, j'ai appris à penser **la sécurité dès la conception** : les routes protégées par défaut, le cookie httpOnly, le contenu payant caché côté serveur, et le webhook idempotent.
>
> J'ai aussi appris à **travailler en équipe** : partager un même dépôt, se répartir les tâches, expliquer ses choix et intégrer le travail des autres.
>
> Et enfin, j'ai compris l'**esprit DevOps** : un projet n'est vraiment terminé que quand il fonctionne en production, et qu'on peut le redéployer facilement et de façon fiable.

## Diapo 37 — Merci

> Merci beaucoup pour votre attention. Je suis maintenant prêt à répondre à vos questions.

---

## Conseils pour le jour J

- Regarde le jury quand tu parles, pas l'écran.
- Quand tu expliques un schéma, montre la partie dont tu parles avec la souris.
- Ne lis pas le code ligne par ligne : explique ce qu'il fait et pourquoi.
- Quand tu parles du travail d'équipe, dis « on » ou « nous ». Quand tu parles de ce que tu as fait toi-même, comme le jeu d'essai ou la veille, dis « j'ai ».
- Si tu ne connais pas la réponse à une question, dis-le simplement, puis explique comment tu ferais pour trouver la réponse.
- Si tu perds le fil, regarde le titre de la diapo : il te rappelle de quoi tu dois parler.
