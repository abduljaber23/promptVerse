# PromptVerse — Script oral : Présentation générale du projet

À lire/adapter à l'oral. Version parlée de `presentation.md`, à utiliser en introduction, avant que chacun présente sa partie (infra / parcours utilisateur / création de prompt).

---

Bonjour, on va vous présenter PromptVerse, un projet qu'on a réalisé à trois — Abduljaber, Amine et Anis — dans le cadre du diplôme CDA.

PromptVerse, c'est une marketplace de prompts pour intelligences artificielles. Concrètement, des créateurs peuvent vendre des prompts déjà rédigés et optimisés — pour ChatGPT, Midjourney, Claude et d'autres outils — et des acheteurs peuvent les parcourir et les acheter en ligne.

Côté fonctionnalités, on a d'abord tout ce qui concerne le compte utilisateur : inscription et connexion sécurisées, vérification de l'email, réinitialisation de mot de passe en cas d'oubli, et un profil personnalisable avec avatar, bio et liens vers les réseaux sociaux.

Ensuite, il y a le catalogue de prompts : on peut chercher et filtrer par catégorie ou par outil IA, chaque prompt a une fiche avec un aperçu gratuit du résultat et un prix, mais le contenu réel du prompt reste masqué tant qu'il n'a pas été acheté. Et bien sûr, chaque utilisateur peut créer et publier ses propres prompts à vendre.

Pour l'achat, on utilise Stripe : le paiement se fait via Stripe Checkout, et c'est un webhook Stripe qui valide la commande côté serveur et débloque l'accès au prompt une fois le paiement confirmé. L'acheteur retrouve ensuite tous ses achats dans un historique dédié.

Enfin, il y a une partie admin pour gérer les utilisateurs — les activer ou les bannir — ainsi que les catégories et les outils IA disponibles sur la plateforme.

Côté technique, le backend est en NestJS avec TypeScript et TypeORM sur une base MySQL. L'authentification est faite maison avec des JWT, sans passer par des librairies type Passport ni par de l'OAuth. Les paiements sont gérés par Stripe, et les fichiers uploadés sont stockés en local sur le serveur.

Le frontend est en React 19 avec TypeScript. On sépare bien l'état "serveur" — les données qui viennent de l'API — géré par TanStack Query, de l'état "client" — l'interface elle-même — géré par Zustand. On a fait ce choix parce que gérer le cache, le chargement et les erreurs à la main donne vite du code répétitif et source de bugs, alors que ces deux outils règlent ça avec très peu de code, contrairement à des solutions plus lourdes comme Redux. L'interface est stylée avec Tailwind CSS et daisyUI.

Et enfin, côté infrastructure, tout est containerisé avec Docker Compose — API, frontend, base de données, Nginx — et l'application est déployée sur un VPS avec Nginx et Certbot pour le HTTPS.

Après cette introduction, on va rentrer dans le détail : [prénom] va vous présenter l'infrastructure, [prénom] le parcours de création de compte et l'envoi d'emails, et [prénom] la création d'un prompt.
