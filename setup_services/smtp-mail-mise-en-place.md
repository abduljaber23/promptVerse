# Mise en place des emails (SMTP) — étape par étape

Deux emails envoyés par l'API : **vérification du compte** à l'inscription et **réinitialisation du mot de passe**.
Outils : **Nodemailer** via `@nestjs-modules/mailer`, templates **EJS**, **Mailpit** en local (faux serveur SMTP) et **Brevo** en prod.

---

## Étape 1 — Installer les dépendances

```bash
cd apps/api
npm install @nestjs-modules/mailer nodemailer ejs
```

---

## Étape 2 — Variables d'environnement

Dans le `.env` :

```env
SMTP_FROM=no-reply@promptverse.com
SMTP_FROM_NAME=PromptVerse
SMTP_HOST=mailpit        # en prod : l'hôte SMTP du fournisseur (Brevo)
SMTP_PORT=1025           # en prod : 587
SMTP_USERNAME=promptverse
SMTP_PASSWORD=promptverse
CLIENT_URL=http://localhost:8080   # pour construire les liens dans les mails
```

Validées au démarrage dans `apps/api/src/common/config/env.validation.ts` (Joi) :

```ts
SMTP_FROM: Joi.string().email().required(),
SMTP_HOST: Joi.string().required(),
SMTP_PORT: Joi.number().port().required(),
SMTP_USERNAME: Joi.string().required(),
```

---

## Étape 3 — Mailpit en local (Docker)

Dans `docker-compose.dev.yml`, un conteneur Mailpit reçoit tous les mails au lieu de les envoyer vraiment :

```yaml
mailpit:
  image: axllent/mailpit:latest
  ports:
    - "${MAILPIT_SMTP_PORT:-1025}:1025"   # SMTP
    - "${MAILPIT_UI_PORT:-8025}:8025"     # interface web
```

L'API y est reliée par `SMTP_HOST: mailpit` et `SMTP_PORT: "1025"`.
On lit les mails reçus sur **http://localhost:8025**.

---

## Étape 4 — Créer le `MailModule`

`apps/api/src/modules/mail/mail.module.ts` : configure le transport SMTP à partir du `.env` avec `MailerModule.forRootAsync` :

```ts
transport: {
  host: config.get('SMTP_HOST'),
  port: config.get('SMTP_PORT'),
  secure: false,                 // STARTTLS sur 587, pas de SSL direct
  auth: { user: SMTP_USERNAME, pass: SMTP_PASSWORD },
},
defaults: {
  from: `"PromptVerse" <no-reply@promptverse.com>`,
},
template: {
  dir: join(__dirname, 'templates'),
  adapter: new EjsAdapter({ inlineCssEnabled: true }),
},
```

`inlineCssEnabled` met le CSS directement dans les balises, parce que beaucoup de clients mail ignorent les `<style>`.
Le module exporte `MailService`, puis il est importé dans `AppModule`, `AuthModule` et `UsersModule`.

---

## Étape 5 — Écrire les templates EJS

`apps/api/src/modules/mail/templates/` :
- `verify-email.ejs`
- `reset-password.ejs`

Chacun reçoit une variable `link` affichée dans un bouton :

```html
<a href="<%= link %>">Verify Email</a>
```

---

## Étape 6 — Copier les templates au build

Les `.ejs` ne sont pas du TypeScript, donc `nest build` ne les copie pas par défaut dans `dist/`.
Dans `apps/api/nest-cli.json` :

```json
"assets": [
  { "include": "modules/mail/templates/**/*", "outDir": "dist/", "watchAssets": true }
]
```

Sans ça, l'envoi marche en dev mais plante en prod (template introuvable).

---

## Étape 7 — Créer le `MailService`

`apps/api/src/modules/mail/mail.service.ts` : une méthode par type de mail.

```ts
async sendVerifyEmailTemplate(email: string, link: string) {
  await this.mailerService.sendMail({
    to: email,
    subject: 'Verify your account',
    template: 'verify-email',
    context: { link },
  });
}
```

Même chose pour `sendResetPasswordTemplate`. En cas d'échec, l'erreur est loguée et on renvoie `500` avec le code `EMAIL_SEND_FAILED`.

---

## Étape 8 — Envoyer le mail de vérification (inscription)

Dans `AuthService.register()` :
1. Créer l'utilisateur avec un `verificationToken` aléatoire (`randomBytes(32).toString('hex')`) valable **15 min**.
2. Construire le lien : `${CLIENT_URL}/verify-email/${userId}/${token}`.
3. `mailService.sendVerifyEmailTemplate(email, link)`.

Route de validation : `GET /api/v1/auth/verify-email/:id/:verificationToken`, qui compare le token et sa date d'expiration puis marque le compte vérifié.

Si un utilisateur non vérifié essaie de se connecter, un **nouveau token** est généré, le mail est renvoyé et la connexion est refusée (`403`).
Le mail est aussi renvoyé quand l'utilisateur change d'email (`UsersService`).

---

## Étape 9 — Mot de passe oublié

1. `POST /api/v1/auth/forgot-password` `{ email }` :
   - génère un `resetPasswordToken` valable 15 min ;
   - envoie le lien `${CLIENT_URL}/reset-password/${userId}/${token}` ;
   - renvoie **toujours la même réponse neutre**, que l'email existe ou non, pour ne pas révéler quels emails sont inscrits.
2. `GET /api/v1/auth/reset-password/:id/:token` : vérifie que le lien est valide.
3. `POST /api/v1/auth/reset-password` : enregistre le nouveau mot de passe (hashé).

---

## Étape 10 — Prod

Dans le `.env` du serveur, remplacer les valeurs Mailpit par celles du fournisseur SMTP (Brevo) : `SMTP_HOST`, `SMTP_PORT=587`, `SMTP_USERNAME`, `SMTP_PASSWORD`, et un `SMTP_FROM` d'un domaine validé chez le fournisseur.
Aucun changement de code : seul le `.env` change.

---

## Étape 11 — Tester

1. `docker compose -f docker-compose.dev.yml up`
2. S'inscrire sur le site.
3. Ouvrir **http://localhost:8025** : le mail est là, cliquer sur le lien pour vérifier le compte.
4. Même test avec « Mot de passe oublié ».

---

## Résumé du flux

```
Inscription
  → token aléatoire (15 min) enregistré en base
  → MailService → SMTP (Mailpit en dev / Brevo en prod)
  → l'utilisateur clique sur le lien
  → GET /auth/verify-email/:id/:token → compte vérifié
```
