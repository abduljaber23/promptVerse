# syntax=docker/dockerfile:1

# ───────────────────────── Build stage ─────────────────────────
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Variables injectées dans le bundle statique au build.
ARG VITE_API_URL=/api/v1
ARG VITE_ASSETS_URL=http://localhost:8333/prompt-verse
ENV VITE_API_URL=$VITE_API_URL \
    VITE_ASSETS_URL=$VITE_ASSETS_URL

RUN npm run build

# ───────────────────────── Serve stage ─────────────────────────
FROM nginx:1.27-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=5 \
  CMD wget -q -O - http://127.0.0.1/healthz >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
