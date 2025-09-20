# apps/backend/Dockerfile
# ----------------------
# Multi-stage build:
#  - builder stage: install deps and build the Nest app
#  - runner stage: copy only compiled output + node_modules -> smaller image
# ----------------------

# ---- builder ----
FROM node:20-alpine AS builder

WORKDIR /app

# copy package files first (cache npm install)
COPY package*.json ./

# install deps (use npm ci for reproducible installs)
RUN npm ci

# copy rest of source
COPY . .

# build the app (expects "build" script that outputs to dist/)
RUN npm run build

# ---- runner ----
FROM node:20-alpine AS runner

WORKDIR /app

# copy compiled output + node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Ensure runtime env variables are used (DB url, JWT secrets, etc)
# Run migrations (safe production command) then start the compiled app
# Replace `node dist/main.js` with your actual start command if different
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main.js"]
