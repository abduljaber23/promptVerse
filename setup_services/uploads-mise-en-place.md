# Mise en place des uploads d'images — étape par étape

Images uploadées : **avatar** de l'utilisateur, **image de couverture** et **images d'aperçu** d'un prompt.
Outils : **Multer** (intégré à NestJS via `@nestjs/platform-express`), stockage sur le **disque du serveur** (dossier `uploads/`), fichiers servis par l'API elle-même.

---

## Étape 1 — Préparer les dossiers

Dans `apps/api/uploads/`, un sous-dossier par type de fichier, listés dans un enum :

```ts
// apps/api/src/common/enums/storage-folder.enum.ts
export enum StorageFolder {
  AVATARS = 'avatars',
  ICONS = 'icons',
  PROMPT_COVERS = 'prompt-covers',
  PROMPT_PREVIEWS = 'prompt-previews',
}
```

Dans `apps/api/.gitignore`, on versionne les dossiers vides, pas les fichiers uploadés :

```gitignore
uploads/*/*
!uploads/*/.gitkeep
```

---

## Étape 2 — Configurer Multer dans chaque module

Multer est enregistré avec `MulterModule.register()` dans le module qui reçoit les fichiers.

**Avatars** — `apps/api/src/modules/users/users.module.ts` :

```ts
MulterModule.register({
  storage: diskStorage({
    destination: `./uploads/${StorageFolder.AVATARS}`,
    filename: (req, file, cb) =>
      cb(null, `${randomUUID()}${extname(file.originalname)}`),
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) cb(null, true);
    else cb(new BadRequestException({ code: ErrorCodes.UNSUPPORTED_FILE_TYPE }), false);
  },
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 Mo
}),
```

**Prompts** — `apps/api/src/modules/prompts/prompts.module.ts` : même principe, avec 8 Mo max par fichier et un dossier choisi selon le champ du formulaire :

```ts
destination: (req, file, cb) => {
  const folder = file.fieldname === 'coverImage'
    ? StorageFolder.PROMPT_COVERS
    : StorageFolder.PROMPT_PREVIEWS;
  cb(null, `./uploads/${folder}`);
},
```

Points importants :
- **nom en UUID** : jamais le nom d'origine (évite les collisions et les noms dangereux) ;
- **filtre sur le type MIME** : seules les images passent ;
- **taille maximale** par fichier.

---

## Étape 3 — Recevoir les fichiers dans les contrôleurs

**Un seul fichier (avatar)** — `POST /api/v1/users/avatar` :

```ts
@Post('avatar')
@UseInterceptors(FileInterceptor('avatar'))
@ApiConsumes('multipart/form-data')
uploadProfileAvatar(@UploadedFile() file: Express.Multer.File, @CurrentUser() payload) {
  if (!file) throw new BadRequestException({ code: ErrorCodes.NO_FILE_PROVIDED });
  return this.usersService.setProfileAvatar(payload.sub, file);
}
```

**Plusieurs champs (prompt)** — `POST /api/v1/prompts` :

```ts
@UseInterceptors(
  FileFieldsInterceptor([
    { name: 'coverImage', maxCount: 1 },
    { name: 'previewImages', maxCount: 10 },
  ]),
)
createPrompt(@Body() dto, @UploadedFiles() files: { coverImage?; previewImages? }) { ... }
```

Quand on arrive dans le contrôleur, **Multer a déjà écrit les fichiers sur le disque**.
`@ApiConsumes('multipart/form-data')` permet de tester l'upload dans Swagger.

---

## Étape 4 — Enregistrer la « clé » en base

On ne stocke pas le fichier en base, seulement son chemin relatif (la **clé**), par exemple `avatars/3f2a…-9c.png`.

- **Avatar** (`UsersService.setProfileAvatar`) :
  1. construit la clé `avatars/<file.filename>` ;
  2. **supprime l'ancien avatar** du disque s'il y en avait un ;
  3. enregistre la clé dans `user.profile.avatar`.
- **Prompt** (`PromptsService.create`) :
  - clé de couverture `prompt-covers/<nom>` dans `prompt.coverImage` ;
  - une ligne `PreviewImage` par image d'aperçu (`url` = clé, `sortOrder` = ordre) ;
  - **si l'enregistrement en base échoue**, les fichiers déjà écrits sont supprimés (`Promise.allSettled(uploadedKeys.map(deleteFile))`) pour ne pas laisser de fichiers orphelins.

---

## Étape 5 — `StorageService` : supprimer un fichier

`apps/api/src/modules/storage/storage.service.ts` :

```ts
async deleteFile(key: string) {
  try {
    await fs.unlink(join('uploads', key));
  } catch (e) {
    if (e.code === 'ENOENT') return; // déjà absent : pas grave
    this.logger.error(...);
  }
}
```

Utilisé pour le remplacement ou la suppression d'avatar (`DELETE /users/avatar`) et le rollback à la création de prompt.

---

## Étape 6 — `StorageController` : servir les fichiers

`GET /api/v1/uploads/:folder/:filename` (route `@Public()`) :

```ts
if (!Object.values(StorageFolder).includes(folder)) {
  throw new NotFoundException({ code: ErrorCodes.FILE_NOT_FOUND });
}
return res.sendFile(filename, { root: join('uploads', folder) });
```

- Seuls les dossiers de l'enum sont autorisés.
- `sendFile` avec `root` empêche de sortir du dossier (`../`).

---

## Étape 7 — Côté front React

**Envoyer** avec un `FormData` (`apps/client/src/common/api/users.api.ts` et `prompts.api.ts`) :

```ts
const form = new FormData();
form.append("avatar", file);
api.post("/users/avatar", form, {
  headers: { "Content-Type": "multipart/form-data" },
});
```

Pour un prompt : on ajoute les champs texte, puis `coverImage`, puis chaque image dans `previewImages`.

**Afficher** avec `resolveAssetUrl()` (`apps/client/src/common/lib/assets.ts`), qui transforme la clé en URL :

```ts
resolveAssetUrl("avatars/xxx.png")
// → `${API_BASE_URL}/uploads/avatars/xxx.png`
```

S'il n'y a pas de clé, la fonction renvoie `null` et le composant affiche une image par défaut.

---

## Étape 8 — Docker et Nginx en prod

- **Dockerfile** (`apps/api/Dockerfile`) : copie l'arborescence `uploads/` vide dans l'image.
- **docker-compose.prod.yml** : un volume nommé pour que les fichiers **survivent aux redéploiements** :
  ```yaml
  volumes:
    - uploads_data:/app/uploads
  ```
- **Nginx** (`nginx/nginx.prod.conf`) : la taille de requête est limitée par défaut, alors on la relève sur `/api/` :
  ```nginx
  client_max_body_size 100M;  # 1 couverture + 10 aperçus × 8 Mo ≈ 88 Mo
  ```
  Sans ça, Nginx répond `413 Request Entity Too Large` avant même que la requête arrive à NestJS.

---

## Étape 9 — Tester

1. Swagger (`/api/docs`) ou le site : uploader un avatar depuis le profil.
2. Vérifier que le fichier apparaît dans `apps/api/uploads/avatars/`, avec un nom en UUID.
3. Ouvrir `http://localhost:3000/api/v1/uploads/avatars/<nom>` : l'image s'affiche.
4. Envoyer un PDF : refusé (`UNSUPPORTED_FILE_TYPE`).
5. Créer un prompt avec une couverture et des aperçus : ils s'affichent sur la page du prompt.

---

## Résumé du flux

```
Front : FormData (multipart/form-data)
  → Nginx (client_max_body_size)
  → Multer : vérifie type + taille, écrit uploads/<dossier>/<uuid>.png
  → Service : enregistre la clé "<dossier>/<uuid>.png" en base
Affichage :
  → resolveAssetUrl(clé) → GET /api/v1/uploads/<dossier>/<uuid>.png
  → StorageController → res.sendFile()
```
