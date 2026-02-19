# =============================================================================
# Stage 1: Install dependencies
# =============================================================================
FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable Yarn via Corepack (comes with Node 20)
RUN corepack enable

# Copy dependency manifests
# - yarn.lock for Yarn classic
# - .yarnrc.yml + .yarn/ for Yarn berry (PnP / node-modules)
COPY package.json yarn.lock ./
# If you use Yarn Berry, uncomment these:
# COPY .yarnrc.yml ./
# COPY .yarn ./.yarn

# Install dependencies
RUN yarn install --frozen-lockfile


# =============================================================================
# Stage 2: Build the Next.js application
# =============================================================================
FROM node:20-alpine AS builder

WORKDIR /app
RUN corepack enable

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN yarn build


# =============================================================================
# Stage 3: Production runner (minimal image)
# =============================================================================
FROM node:20-alpine AS runner

WORKDIR /app
RUN corepack enable

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy only what the standalone server needs
COPY --from=builder /app/public ./public

# next.config.ts with output:"standalone" emits a self-contained server
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]