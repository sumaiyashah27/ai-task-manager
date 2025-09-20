# apps/frontend/Dockerfile
# -----------------------
# Build Next.js app and serve with Next's start (production)
# -----------------------

FROM node:20-alpine AS builder
WORKDIR /app

# copy package files to leverage layer caching
COPY package*.json ./
RUN npm ci

# copy and build
COPY . .
RUN npm run build

# ---- runner ----
FROM node:20-alpine AS runner
WORKDIR /app

# copy built assets and node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Next.js expects environment variables for runtime config.
# Start in production mode
CMD ["npm", "start"]
