# PromptVerse — Script oral 3 : Création d'un prompt

À lire/adapter à l'oral. Version parlée de `presentation-3-creation-prompt.md`.

---

Je vais présenter le parcours vendeur : comment un utilisateur crée et publie un prompt à vendre sur la plateforme.

Pour créer un prompt, l'utilisateur envoie un formulaire qui contient à la fois du texte et des fichiers : le titre, le contenu réel du prompt — celui qui est payant —, un aperçu du résultat, un prix, la catégorie, l'outil IA concerné, et éventuellement une image de couverture ainsi que plusieurs images d'exemple. Comme ce formulaire mélange texte et fichiers, il est envoyé dans un format multipart, pas en JSON classique.

Les fichiers sont interceptés et gérés à part, avant même d'arriver dans la logique métier. Chaque fichier est écrit directement sur le disque du serveur, rangé dans un dossier différent selon qu'il s'agit d'une image de couverture ou d'une image d'aperçu, et surtout renommé avec un identifiant généré aléatoirement. Ça évite deux problèmes : que deux fichiers portent le même nom et s'écrasent, et qu'on expose ou qu'on garde le nom d'origine, potentiellement peu propre, fourni par l'utilisateur. On filtre aussi le type de fichier pour n'accepter que des images, avec une taille maximale par fichier.

Une fois les fichiers écrits, le service de création prend le relais. Il vérifie d'abord que l'utilisateur, la catégorie et l'outil IA existent bien. Ensuite, il génère un identifiant d'URL propre au prompt — ce qu'on appelle un slug — à partir du titre, en lui ajoutant un petit suffixe aléatoire pour être sûr qu'il n'entre jamais en conflit avec un slug existant, même si deux prompts ont exactement le même titre. Il construit ensuite les références vers les fichiers déjà écrits sur le disque pour les enregistrer en base, et sauvegarde le prompt avec son statut publié.

Un point auquel on a fait attention : si jamais l'enregistrement en base échoue après que les fichiers ont déjà été écrits sur le disque, on supprime ces fichiers avant de renvoyer l'erreur. Sans ça, on se retrouverait avec des fichiers orphelins qui traînent sur le serveur sans jamais être rattachés à un prompt.

Le dernier point important, c'est la protection du contenu payant. Le vrai contenu du prompt n'est jamais renvoyé dans les listes publiques de prompts — il est explicitement exclu de ces requêtes, pas juste caché côté interface. Sur la fiche d'un prompt, ce contenu n'est renvoyé en entier que si l'utilisateur connecté est le vendeur, si le prompt est gratuit, ou s'il a déjà été acheté. Dans tous les autres cas, seul l'aperçu gratuit est visible. C'est une vérification faite côté serveur, donc impossible à contourner en modifiant juste l'affichage côté client.

Ce que je retiens de cette partie, c'est que la gestion des fichiers et la gestion du contenu payant sont traitées comme deux préoccupations bien séparées : les fichiers sont gérés en amont par la couche d'upload, et la protection du contenu sensible est gérée au niveau du service métier, jamais laissée au frontend.
