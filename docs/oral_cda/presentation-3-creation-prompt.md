# PromptVerse — Présentation 3 : Création d'un prompt

Projet réalisé à 3 : Abduljaber, Amine et Anis, dans le cadre du diplôme CDA.
Cette partie couvre le parcours vendeur : comment un utilisateur crée et publie un prompt à vendre.

## Le formulaire de création

Un vendeur envoie une requête avec :
- **title** : titre du prompt
- **promptContent** : le contenu réel du prompt (le texte payant)
- **previewResult** (optionnel) : description/aperçu du résultat obtenu
- **price** : prix en euros (0 à 99,99€)
- **categoryId** / **aiToolId** : à quelle catégorie et quel outil IA (ChatGPT, Midjourney...) le prompt est rattaché
- **coverImage** (optionnel, 1 fichier) : image de couverture
- **previewImages** (optionnel, jusqu'à 10 fichiers) : images d'exemple

La requête est envoyée en `multipart/form-data` puisqu'elle contient à la fois du texte et des fichiers.

## Upload des fichiers

- Les fichiers sont gérés par **Multer**, configuré directement sur le module des prompts.
- Chaque fichier est écrit sur le disque **avant même** d'arriver dans le service métier :
  - dans le dossier `prompt-covers` ou `prompt-previews` selon qu'il s'agit de la couverture ou d'une image d'aperçu,
  - avec un nom de fichier généré aléatoirement (UUID) + l'extension d'origine, pour éviter les collisions et les noms de fichiers "sales" fournis par l'utilisateur.
- Seuls les fichiers de type image sont acceptés (filtre sur le mimetype), taille max 8 Mo par fichier.

## Création en base (`PromptsService.create`)

1. Vérifie que l'utilisateur, la catégorie et l'outil IA existent bien.
2. Génère un **slug** unique pour l'URL du prompt (titre "slugifié" + un petit suffixe aléatoire), pour éviter les doublons d'URL si deux prompts ont le même titre.
3. Construit les "clés" de stockage des images déjà écrites sur disque par Multer (`dossier/nom-de-fichier`) pour les enregistrer en base.
4. Sauvegarde le prompt (avec son statut "publié") et ses images d'aperçu associées en une seule opération.
5. **Si l'enregistrement en base échoue**, les fichiers déjà écrits sur disque sont supprimés — pour éviter d'accumuler des fichiers orphelins qui ne correspondent à aucun prompt.

## Protection du contenu payant

- Le champ `promptContent` (le vrai contenu du prompt) est explicitement exclu de toutes les listes publiques de prompts — il n'est jamais renvoyé tant que l'achat n'a pas été confirmé.
- Sur la page d'un prompt, le contenu complet n'est renvoyé que si l'utilisateur connecté est le vendeur, si le prompt est gratuit, ou s'il a déjà été acheté. Sinon, seul l'aperçu gratuit est visible.

## Lecture des images

- Une fois créées, les images (couverture, aperçus) sont accessibles via une route de lecture de fichiers dédiée, qui vérifie que le dossier demandé est bien un dossier autorisé avant de servir le fichier.

## Points à retenir pour l'oral

- Les fichiers sont traités à un niveau différent du texte (Multer intercepte les fichiers avant le contrôleur), c'est une architecture courante pour les uploads.
- Le nommage aléatoire des fichiers est une mesure de sécurité/robustesse simple : pas de conflit, pas de fuite du nom original.
- Le nettoyage des fichiers en cas d'échec (rollback manuel) est important : sans ça, une erreur en base laisserait des fichiers inutiles sur le serveur.
- Le contenu payant n'est jamais exposé côté backend tant que l'achat n'est pas vérifié — c'est une protection côté serveur, pas seulement un masquage côté frontend.
