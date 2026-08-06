# 🎓 Oral CDA — Module Mail (Envoi d'Emails & Templates)

> **Fichiers sources associés :**
> - 📄 [mail.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/mail/mail.service.ts)
> - 📄 [mail.module.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/mail/mail.module.ts)

---

### Q1 : Quel est le rôle de `MailService` et pourquoi l'avoir isolé ?
* **Explication simple :** Il sert uniquement à envoyer des e-mails. L'isoler permet à `AuthService` de ne pas se soucier de la technique d'envoi d'e-mail.
* **Dans votre code :** `MailModule` encapsule `@nestjs-modules/mailer` et fournit `MailService`.
* **🗣️ À dire à l'oral :** *"J'ai isolé la communication par email dans `MailService` pour respecter le principe de responsabilité unique (SRP). `AuthModule` demande l'envoi d'un mail sans se soucier du transporteur SMTP sous-jacent."*

---

### Q2 : Comment fonctionne l'envoi de mail avec template dans `sendVerifyEmailTemplate()` ?
* **Explication simple :** Au lieu d'écrire le code HTML dans TypeScript, on utilise un fichier template Handlebars (`verify-email.hbs`) et on lui passe dynamiquement la variable `link`.
* **Dans votre code :** `template: 'verify-email'` et `context: { link }` dans [mail.service.ts](file:///c:/FormationCDA/projet_final/PromptVerse/apps/api/src/modules/mail/mail.service.ts).
* **🗣️ À dire à l'oral :** *"J'utilise un moteur de templates Handlebars (`.hbs`). `MailService` injecte la variable dynamique du lien d'activation dans le template HTML avant d'expédier le mail via le serveur SMTP."*

---

### Q3 : Comment gérez-vous les erreurs d'envoi d'email ?
* **Explication simple :** Tout est dans un bloc `try/catch`. Si le serveur e-mail plante, l'erreur est écrite dans les logs et une erreur 500 (`EMAIL_SEND_FAILED`) est renvoyée.
* **Dans votre code :** `this.logger.error()` et `throw new InternalServerErrorException({ code: ErrorCodes.EMAIL_SEND_FAILED })`.
* **🗣️ À dire à l'oral :** *"En cas d'échec SMTP, l'erreur est capturée dans un `try/catch`, journalisée avec sa pile d'exécution dans le `Logger` NestJS, et une `InternalServerErrorException` (HTTP 500) est levée avec un code d'erreur applicatif."*

---

### Q4 : Que feriez-vous pour optimiser l'envoi d'e-mails en production ?
* **Explication simple :** L'envoi direct peut être lent. En production, on mettrait les e-mails dans une file d'attente Redis pour qu'ils soient envoyés en arrière-plan sans ralentir l'utilisateur.
* **Dans votre projet :** Évolution recommandée avec BullMQ et Redis.
* **🗣️ À dire à l'oral :** *"Pour encaisser une forte montée en charge, la bonne pratique serait d'introduire une Message Queue (BullMQ avec Redis) pour envoyer les e-mails de manière asynchrone en arrière-plan."*
