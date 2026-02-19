#!/bin/bash
# =============================================================================
# init-letsencrypt.sh
#
# First-time Let's Encrypt SSL certificate setup.
# Run this ONCE on a fresh server before starting the stack normally.
#
# Usage:
#   chmod +x scripts/init-letsencrypt.sh
#   ./scripts/init-letsencrypt.sh
#
# After running, start the stack with:
#   docker compose up -d
# =============================================================================

set -euo pipefail

# --- Configuration -----------------------------------------------------------
EMAIL="me.akbarahmadi@gmail.com"
DOMAINS_PRIMARY="akbar-ahmadi.ir www.akbar-ahmadi.ir"
DOMAINS_SECONDARY="akbaramd.ir www.akbaramd.ir"
DATA_PATH="./certbot"
RSA_KEY_SIZE=4096

# Set to 1 to use Let's Encrypt staging (avoids rate limits during testing)
STAGING=0
# -----------------------------------------------------------------------------

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
info()    { echo -e "${GREEN}[INFO]${NC} $*"; }
warning() { echo -e "${YELLOW}[WARN]${NC} $*"; }
error()   { echo -e "${RED}[ERROR]${NC} $*"; exit 1; }

# Require root or docker access
if ! docker info > /dev/null 2>&1; then
  error "Docker is not running or you don't have permission. Run with sudo or add user to docker group."
fi

# 1. Create required directories
info "Creating certbot data directories..."
mkdir -p "$DATA_PATH/conf/live/akbar-ahmadi.ir"
mkdir -p "$DATA_PATH/conf/live/akbaramd.ir"
mkdir -p "$DATA_PATH/www"

# 2. Download recommended TLS parameters from Certbot
if [ ! -e "$DATA_PATH/conf/options-ssl-nginx.conf" ] || [ ! -e "$DATA_PATH/conf/ssl-dhparams.pem" ]; then
  info "Downloading recommended TLS parameters..."
  curl -fsSL https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf \
    -o "$DATA_PATH/conf/options-ssl-nginx.conf"
  curl -fsSL https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem \
    -o "$DATA_PATH/conf/ssl-dhparams.pem"
fi

# 3. Create self-signed dummy certs so Nginx can start before real certs exist
info "Creating temporary self-signed certificates..."
for domain in "akbar-ahmadi.ir" "akbaramd.ir"; do
  cert_path="$DATA_PATH/conf/live/$domain"
  mkdir -p "$cert_path"
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout "$cert_path/privkey.pem" \
    -out    "$cert_path/fullchain.pem" \
    -subj   "/CN=$domain" \
    2>/dev/null
  # Certbot also expects a chain.pem
  cp "$cert_path/fullchain.pem" "$cert_path/chain.pem"
done

# 4. Start Nginx so it can serve the ACME webroot challenge
info "Starting Nginx with temporary certificates..."
docker compose up --force-recreate -d nginx
sleep 5  # Give Nginx a moment to fully start

# 5. Remove the dummy certs so Certbot can write real ones
info "Removing temporary certificates..."
for domain in "akbar-ahmadi.ir" "akbaramd.ir"; do
  rm -rf "$DATA_PATH/conf/live/$domain"
  rm -rf "$DATA_PATH/conf/archive/$domain"
  rm -f  "$DATA_PATH/conf/renewal/$domain.conf"
done

# Build staging flag
STAGING_FLAG=""
if [ "$STAGING" -ne 0 ]; then
  warning "Running in STAGING mode — certificates will NOT be trusted by browsers."
  STAGING_FLAG="--staging"
fi

# 6. Request real certificate for primary domain
info "Requesting certificate for: $DOMAINS_PRIMARY ..."
# shellcheck disable=SC2086
docker compose run --rm --entrypoint="" certbot \
  certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    $STAGING_FLAG \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    --rsa-key-size "$RSA_KEY_SIZE" \
    --force-renewal \
    $(for d in $DOMAINS_PRIMARY; do echo -n "-d $d "; done)

# 7. Request real certificate for secondary domain
info "Requesting certificate for: $DOMAINS_SECONDARY ..."
# shellcheck disable=SC2086
docker compose run --rm --entrypoint="" certbot \
  certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    $STAGING_FLAG \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    --rsa-key-size "$RSA_KEY_SIZE" \
    --force-renewal \
    $(for d in $DOMAINS_SECONDARY; do echo -n "-d $d "; done)

# 8. Reload Nginx to pick up the real certificates
info "Reloading Nginx with real SSL certificates..."
docker compose exec nginx nginx -s reload

# 9. Start remaining services
info "Starting all services..."
docker compose up -d

echo ""
echo -e "${GREEN}============================================================${NC}"
echo -e "${GREEN} SSL setup complete!${NC}"
echo -e "${GREEN}   https://akbar-ahmadi.ir  ✓${NC}"
echo -e "${GREEN}   https://akbaramd.ir      → redirects to primary  ✓${NC}"
echo -e "${GREEN}============================================================${NC}"
