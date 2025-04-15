# ====================
# 🔧 Phase 1: Build
# ====================
FROM node:18-alpine AS builder

WORKDIR /app

# Copiem pachetele
COPY package.json package-lock.json ./
RUN npm install

# Copiem codul sursă + fișierul .env.prod
COPY . .
ENV NEXT_PUBLIC_BASE_PATH=/autoflex-fe

# Rulează build-ul Next.js
RUN npm run build

# ====================
# 🚀 Phase 2: Run
# ====================
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_BASE_PATH=/autoflex-fe

# Copiem aplicația construită din containerul builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
