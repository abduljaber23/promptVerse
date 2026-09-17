# PromptVerse — Script oral 2 : Parcours utilisateur (inscription, connexion, emails)

À lire/adapter à l'oral. Version parlée de `presentation-2-parcours-utilisateur.md`.

---

Je vais présenter tout le cycle de vie d'un compte utilisateur : de l'inscription jusqu'à la connexion, en passant par la vérification d'email et le mot de passe oublié.

Quand un utilisateur s'inscrit, on commence par nettoyer les données qu'il a saisies : l'email est mis en minuscules et débarrassé des espaces, parce qu'un email n'est pas sensible à la casse, et le pseudo est nettoyé des espaces tout en gardant sa casse d'affichage. On vérifie ensuite en base que cet email et ce pseudo ne sont pas déjà utilisés, sinon on renvoie une erreur de conflit. Le mot de passe, lui, n'est jamais stocké en clair : il est haché avec bcrypt avant d'être sauvegardé. Enfin, on génère un token de vérification, valable quinze minutes, et on envoie un email de confirmation contenant ce token.

Quand l'utilisateur clique sur le lien reçu par email, on vérifie que le token correspond et qu'il n'a pas expiré. Si tout est bon, le compte est marqué comme vérifié, et surtout le token est immédiatement effacé, pour qu'il ne puisse pas être réutilisé une deuxième fois. On a volontairement choisi de stocker ce token en base plutôt que d'utiliser un JWT, justement parce qu'un token en base peut être invalidé instantanément, alors qu'un JWT reste valide jusqu'à son expiration même si on voudrait le révoquer avant.

Pour la connexion, on cherche l'utilisateur par email et on vérifie le mot de passe. Et là, un point de sécurité important : que ce soit l'email qui n'existe pas ou le mot de passe qui soit faux, on renvoie exactement le même message d'erreur. Ça empêche un attaquant de deviner quels comptes existent réellement. Si l'email n'a pas encore été vérifié, la connexion est bloquée. Sinon, on génère un jeton JWT contenant l'identifiant de l'utilisateur et son rôle, et on le place dans un cookie httpOnly plutôt que de le renvoyer dans le corps de la réponse ou de le stocker en localStorage — un cookie httpOnly ne peut pas être lu par du JavaScript, ce qui protège contre le vol de session en cas de faille XSS.

Toutes les routes de l'application sont protégées par défaut par ce mécanisme, sauf celles explicitement marquées comme publiques. Et certaines routes, comme celles réservées aux administrateurs, vérifient en plus le rôle de l'utilisateur connecté. Les routes sensibles comme l'inscription et la connexion sont aussi limitées en nombre de tentatives par minute, pour se protéger du brute-force.

Le mot de passe oublié suit la même logique que la vérification d'email : un token temporaire, un email avec un lien vers une page dédiée du frontend, une vérification de validité du lien avant d'afficher le formulaire, puis un nouveau mot de passe haché et sauvegardé, avec le token détruit juste après.

Enfin, tout l'envoi d'emails est isolé dans son propre module. Le reste de l'application se contente de demander "envoie ce mail-là avec ce lien", sans se soucier du serveur SMTP utilisé ni de la mise en forme. Les emails sont générés à partir de modèles séparés du code, dans lesquels on injecte les variables dynamiques comme le lien d'activation. En cas d'échec d'envoi, l'erreur est journalisée côté serveur et le client reçoit un message clair plutôt qu'un plantage silencieux.

S'il fallait retenir une chose de cette partie, ce serait que chaque décision — hachage du mot de passe, message d'erreur identique, cookie httpOnly, token à usage unique — répond à un vrai risque de sécurité concret, pas à une contrainte technique gratuite.
