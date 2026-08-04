## Why

Prepare the application for production deployment by fully containerizing the backend and frontend, configuring a reverse proxy, and setting up CI/CD pipelines.

## What Changes

- **Infra**: Create `Dockerfile` for NestJS backend.
- **Infra**: Create multi-stage `Dockerfile` for React frontend (Vite build -> Nginx).
- **Infra**: Update `docker-compose.yml` to orchestrate all services.
- **CI/CD**: Create `.github/workflows/ci.yml` for automated testing and building.

## Capabilities

### New Capabilities
- `production-deployment`: Dockerized infrastructure and automated CI/CD pipeline.

### Modified Capabilities
None.

## Impact

- **Infrastructure**: Completes the DevOps requirements for the CDA certification.
