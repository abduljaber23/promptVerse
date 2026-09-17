# PromptVerse — Présentation 2 : Parcours utilisateur (inscription, connexion, emails)

Projet réalisé à 3 : Abduljaber, Amine et Anis, dans le cadre du diplôme CDA.
Cette partie couvre tout le cycle de vie du compte : inscription, vérification par email, connexion, mot de passe oublié.

## Inscription (`register`)

1. L'email est nettoyé (`toLowerCase().trim()`) et le pseudo est nettoyé (`trim()`, casse conservée pour l'affichage).
2. Vérification en base que l'email et le pseudo ne sont pas déjà pris → sinon erreur 409 (conflit).
3. Le mot de passe est haché avec **bcrypt** (facteur de coût 10) — jamais stocké en clair.
4. Un token de vérification aléatoire est généré, valable **15 minutes**, et sauvegardé en base avec l'utilisateur.
5. Un email de confirmation est envoyé avec un lien contenant ce token.

## Vérification de l'email (`verifyEmail`)

- L'utilisateur clique sur le lien reçu par mail.
- Le backend vérifie que l'utilisateur existe, que le token correspond et qu'il n'a pas expiré.
- Si tout est bon : `isEmailVerified` passe à `true` et le token est effacé (`null`) — il ne peut donc servir qu'une seule fois.
- Le token est stocké en base (pas un JWT) justement pour pouvoir être invalidé immédiatement après usage.

## Connexion (`login`)

- Recherche de l'utilisateur par email, puis vérification du mot de passe avec bcrypt.
- Si l'email ou le mot de passe est faux, le message d'erreur est **exactement le même** dans les deux cas, pour ne pas révéler à un attaquant si un compte existe.
- Si l'email n'est pas encore vérifié, la connexion est bloquée.
- Si tout est bon : génération d'un **JWT** (payload = id utilisateur + rôle), stocké dans un **cookie `httpOnly`** (pas en `localStorage`) pour limiter les risques de vol de session via une faille XSS.
- La déconnexion se résume à effacer ce cookie côté serveur.

## Protection des routes

- Un guard global vérifie le cookie JWT sur chaque requête, sauf sur les routes explicitement marquées "publiques".
- Un second guard vérifie le rôle (utilisateur normal / admin) sur les routes qui le nécessitent.
- Les routes sensibles (`/register`, `/login`) sont limitées en nombre de tentatives par minute pour freiner les attaques par force brute.

## Mot de passe oublié

1. L'utilisateur saisit son email → un token aléatoire (15 min) est généré et sauvegardé.
2. Un email est envoyé avec un lien vers une page du frontend React.
3. Cette page vérifie d'abord que le lien est encore valide avant d'afficher le formulaire.
4. Une fois le nouveau mot de passe soumis : hachage bcrypt, sauvegarde, et le token est réinitialisé pour ne plus pouvoir être réutilisé.

## Envoi des emails

- Toute la logique d'envoi de mail est isolée dans un module dédié : le reste de l'application (inscription, mot de passe oublié) demande "envoie ce mail" sans se soucier du fonctionnement technique (serveur SMTP, mise en forme).
- Les emails sont générés à partir de **templates** (fichiers séparés du code), dans lesquels on injecte des variables dynamiques comme le lien d'activation.
- En développement, les mails partent vers un faux serveur SMTP local (visible dans une interface web) pour ne jamais envoyer de vrais emails pendant les tests.
- En cas d'échec d'envoi, l'erreur est journalisée côté serveur et une erreur claire est renvoyée au client.

## Points à retenir pour l'oral

- Sécurité mot de passe : jamais en clair, toujours haché (bcrypt).
- Anti-énumération de comptes : même message d'erreur pour email inconnu ou mot de passe faux.
- Cookie `httpOnly` plutôt que `localStorage` pour le token de session : c'est un choix de sécurité, pas un détail technique anodin.
- Tous les tokens sensibles (vérification email, reset password) sont à usage unique et à durée de vie courte (15 min).
