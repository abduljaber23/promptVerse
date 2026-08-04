## 1. Dockerization

- [ ] 1.1 Create `apps/api/Dockerfile` (Node.js).
- [ ] 1.2 Create `apps/web/Dockerfile` (Multi-stage: Node build -> Nginx alpine).
- [ ] 1.3 Create `docker-compose.prod.yml` to orchestrate API, Web, and DB.

## 2. CI/CD Pipeline

- [ ] 2.1 Create `.github/workflows/ci.yml`.
- [ ] 2.2 Configure ESLint and Prettier checks in the pipeline.
- [ ] 2.3 Configure unit testing steps (`npm run test`).
- [ ] 2.4 Configure Docker image build steps.
