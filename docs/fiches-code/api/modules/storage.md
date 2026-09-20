# Fiches de code — api/src/modules/storage

## storage.controller.ts

Rôle : sert en lecture les fichiers uploadés (`GET uploads/:folder/:filename`, public). Vérifie que `folder` est une valeur connue de l'enum `StorageFolder` avant de renvoyer le fichier depuis `uploads/<folder>/`, sinon 404.

## storage.module.ts

Rôle : déclare le controller et exporte `StorageService` (utilisé par `UsersModule`, `PromptsModule`, etc. pour supprimer des fichiers).

## storage.service.ts

Rôle : suppression de fichiers sur disque (`deleteFile`). L'upload lui-même est géré directement par Multer (`diskStorage`) dans les modules qui en ont besoin ; ce service ne gère que le nettoyage, en ignorant silencieusement le cas où le fichier est déjà absent (`ENOENT`).
