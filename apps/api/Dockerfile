# syntax=docker/dockerfile:1

# ───────────────────────── Build stage ─────────────────────────
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ───────────────────── Production dependencies ─────────────────
FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# ─────────────────────────── Runtime ──────────────────────────
FROM node:22-alpine AS production

ENV NODE_ENV=production
WORKDIR /app

COPY package.json package-lock.json ./
COPY --from=deps  /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER node

EXPOSE 3000

# Le endpoint /<prefix>/health (Terminus) est public et non versionné.
HEALTHCHECK --interval=15s --timeout=5s --start-period=40s --retries=5 \
  CMD wget -q -O - "http://127.0.0.1:3000/${API_PREFIX:-api}/health" >/dev/null 2>&1 || exit 1

# L'entrypoint attend la BDD, joue les migrations, puis lance la commande.
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "dist/main"]
