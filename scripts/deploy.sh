#!/bin/bash
# =============================================================================
# deploy.sh
#
# Pull latest code, rebuild the Next.js image, and restart with zero downtime.
#
# Usage (on the server, inside the project directory):
#   ./scripts/deploy.sh
# =============================================================================

set -euo pipefail

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
info()    { echo -e "${GREEN}[INFO]${NC} $*"; }
warning() { echo -e "${YELLOW}[WARN]${NC} $*"; }

# Pull latest code
info "Pulling latest code from git..."
git pull origin main

# Rebuild only the app image (nginx and certbot don't need rebuilding)
info "Rebuilding app image..."
docker compose build --no-cache app

# Rolling restart: bring up new container, then remove old one
info "Restarting app container..."
docker compose up -d --no-deps app

# Remove dangling images to free disk space
info "Cleaning up unused Docker images..."
docker image prune -f

# Show running containers
info "Deployment complete. Running containers:"
docker compose ps

echo ""
echo -e "${GREEN}[DONE]${NC} Site is live at https://akbar-ahmadi.ir"
