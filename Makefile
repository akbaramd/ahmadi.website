# =============================================================================
# Makefile — convenience commands for the ahmadi.blog project
# =============================================================================

.PHONY: help dev build up down restart logs shell ssl deploy clean

# Default target
help:
	@echo ""
	@echo "  ahmadi.blog — available commands"
	@echo ""
	@echo "  Development"
	@echo "    make dev          Start Next.js dev server (hot reload)"
	@echo ""
	@echo "  Docker"
	@echo "    make build        Build the Docker image"
	@echo "    make up           Start all containers in background"
	@echo "    make down         Stop all containers"
	@echo "    make restart      Restart all containers"
	@echo "    make logs         Tail logs from all containers"
	@echo "    make logs-app     Tail logs from the Next.js container"
	@echo "    make logs-nginx   Tail logs from the Nginx container"
	@echo "    make shell        Open a shell in the app container"
	@echo ""
	@echo "  Server"
	@echo "    make ssl          Run first-time Let's Encrypt SSL setup"
	@echo "    make deploy       Pull latest code and redeploy"
	@echo "    make clean        Remove stopped containers and unused images"
	@echo ""

# ---------------------------------------------------------------------------
# Development
# ---------------------------------------------------------------------------
dev:
	npm run dev

# ---------------------------------------------------------------------------
# Docker
# ---------------------------------------------------------------------------
build:
	docker compose build --no-cache

up:
	docker compose up -d

down:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

logs-app:
	docker compose logs -f app

logs-nginx:
	docker compose logs -f nginx

shell:
	docker compose exec app sh

# ---------------------------------------------------------------------------
# Server operations
# ---------------------------------------------------------------------------
ssl:
	@bash scripts/init-letsencrypt.sh

deploy:
	@bash scripts/deploy.sh

clean:
	docker compose down
	docker image prune -f
	docker volume prune -f
