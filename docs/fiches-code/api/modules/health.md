# Fiches de code — api/src/modules/health

## health.controller.ts

Rôle : endpoint `GET /health` (public) utilisé pour le monitoring. Vérifie que la base de données répond via `TypeOrmHealthIndicator.pingCheck`. C'est ce type de mécanisme qu'un `healthcheck` Docker pourrait interroger, ici c'est un healthcheck applicatif (au niveau NestJS), distinct du `healthcheck` MySQL défini dans `docker-compose.prod.yml`.

## health.module.ts

Rôle : importe `TerminusModule` (librairie NestJS de health checks) et déclare le controller.
