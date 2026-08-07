# 🎓 Oral CDA — Module Storage (MinIO / AWS S3)

> **Fichier de référence du module :**
> - 📄 [storage.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/storage/storage.service.ts)
> - 📄 [storage.module.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/storage/storage.module.ts)

---

### Q1 : Quel est le rôle du `StorageModule` et pourquoi utiliser l'AWS SDK v3 ?
* **Explication simple :** Il gère le stockage et la suppression des fichiers (avatars de profil et images de prompts) sur un serveur S3 (MinIO en dev, AWS S3 en prod).
* **Dans votre code :** `StorageService` utilise `@aws-sdk/client-s3` (`PutObjectCommand`, `DeleteObjectCommand`, `GetObjectCommand`).
* **🗣️ À dire à l'oral :** *"J'ai créé un `StorageModule` dédié pour abstraire le stockage de fichiers d'objets S3. En développement, j'utilise un conteneur MinIO local, et en production AWS S3. Grâce à l'AWS SDK v3, le code est moderne et totalement indépendant du fournisseur de stockage."*

---

### Q2 : Pourquoi avoir configuré `forcePathStyle: true` dans le client S3 ?
* **Explication simple :** MinIO local fonctionne avec des URLs de type `http://localhost:9000/bucket/key` (Path Style), alors qu'AWS S3 utilise des sous-domaines `http://bucket.s3.amazonaws.com/key`. `forcePathStyle: true` est obligatoire pour que MinIO fonctionne localement sans erreur DNS.
* **Dans votre code :** `forcePathStyle: true` dans le constructeur de `StorageService`.
* **🗣️ À dire à l'oral :** *"Le paramètre `forcePathStyle: true` est indispensable pour l'intégration de MinIO en local. Il force l'utilisation d'URLs par chemin au lieu des sous-domaines virtuels utilisés par défaut sur AWS."*

---

### Q3 : Comment gérez-vous l'upload et l'unicité des noms de fichiers (`uploadFile`) ?
* **Explication simple :** Chaque fichier uploade reçoit un nom aléatoire unique (UUID de 16 caractères) tout en conservant son extension d'origine, et il est rangé dans un sous-dossier (`avatars` ou `media`).
* **Dans votre code :** `const key = `${folder}/${randomName}${fileExtName}`;` dans [storage.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/storage/storage.service.ts#L47).
* **🗣️ À dire à l'oral :** *"Pour éviter tout risque d'écrasement de fichiers et masquer le nom d'origine fourni par l'utilisateur, je génère une clé unique via un UUID aléatoire tout en conservant l'extension d'origine (`extname`)."*

---

### Q4 : Comment gérez-vous les erreurs et la récupération d'image (`getFile`) ?
* **Explication simple :** Si l'image n'existe pas sur le serveur S3, le SDK lève une erreur `NoSuchKey` que je capture pour renvoyer une erreur HTTP 404 (`FILE_NOT_FOUND`). Pour les autres erreurs d'upload ou de suppression, je renvoie une HTTP 500 avec journalisation dans le `Logger`.
* **Dans votre code :** `if (error.name === 'NoSuchKey') throw new NotFoundException({ code: ErrorCodes.FILE_NOT_FOUND });`.
* **🗣️ À dire à l'oral :** *"Je capture spécifiquement l'erreur `NoSuchKey` du SDK AWS pour la mapper vers une `NotFoundException` (HTTP 404) lisible par le client. Les autres erreurs d'I/O S3 sont journalisées puis transformées en `InternalServerErrorException` (HTTP 500)."*
