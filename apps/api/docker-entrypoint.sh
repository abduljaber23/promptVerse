#!/bin/sh
set -e

DB_HOST="${DB_HOST:-database}"
DB_PORT="${DB_PORT:-3306}"

echo "[entrypoint] attente de ${DB_HOST}:${DB_PORT} ..."
i=0
while ! node -e "require('net').connect({host:'${DB_HOST}',port:${DB_PORT}}).on('connect',function(){process.exit(0)}).on('error',function(){process.exit(1)})" 2>/dev/null; do
  i=$((i + 1))
  if [ "$i" -ge 60 ]; then
    echo "[entrypoint] base de données injoignable, abandon." >&2
    exit 1
  fi
  sleep 2
done

echo "[entrypoint] exécution des migrations ..."
node ./node_modules/typeorm/cli.js -d dist/database/data-source.js migration:run

echo "[entrypoint] démarrage : $*"
exec "$@"
