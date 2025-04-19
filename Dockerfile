# ====================
# 🔧 Phase 1: Build
# ====================
FROM node:18-alpine AS builder

WORKDIR /app

# Instalăm doar deps necesare buildului
COPY package.json package-lock.json ./
RUN npm install

# Copiem codul aplicației
COPY . .

# Setăm variabilele necesare pentru build
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BASE_PATH=/autoflex-fe

# Generăm buildul
RUN npm run build

# ====================
# 🚀 Phase 2: Run
# ====================
FROM node:18-alpine

WORKDIR /app

# Re-setăm variabilele necesare runtime-ului
ENV NODE_ENV=production
ENV NEXT_PUBLIC_BASE_PATH=/autoflex-fe

# Copiem doar artefactele relevante
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Next.js standalone apps rulează pe 3000
EXPOSE 3000

# Pornim aplicația
CMD ["npm", "start"]
