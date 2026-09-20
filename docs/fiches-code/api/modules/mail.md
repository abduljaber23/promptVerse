# Fiches de code — api/src/modules/mail

## mail.module.ts

Rôle : configure `MailerModule` (SMTP lu depuis la config, adaptateur de templates EJS avec CSS inliné) et expose `MailService`.

## mail.service.ts

Rôle : envoi des emails transactionnels. Expose `sendVerifyEmailTemplate` et `sendResetPasswordTemplate`, chacun logue et convertit une erreur d'envoi en `InternalServerErrorException` (code `EMAIL_SEND_FAILED`).

Dépendances : `MailerService` (SMTP), templates EJS ci-dessous. Utilisé par `AuthService` et `UsersService`.

## templates/verify-email.ejs, reset-password.ejs

Rôle : templates HTML des emails de vérification d'email et de réinitialisation de mot de passe, chacun avec un bouton lien (`<%= link %>`) vers l'URL générée côté service.
