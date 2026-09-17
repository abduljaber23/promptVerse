dev:
	docker compose -f docker-compose.dev.yml up -d --build

migrate:
	docker compose -f docker-compose.dev.yml exec api npm run migration:run

logs:
	docker compose -f docker-compose.dev.yml logs -f

down:
	docker compose -f docker-compose.dev.yml down
