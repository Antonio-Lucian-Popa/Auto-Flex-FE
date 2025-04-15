# Phase 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# 👇 Copiem fișierele inclusiv .env.prod
COPY . .

# 👇 Specificăm manual variabila dacă e nevoie
ENV NEXT_PUBLIC_BASE_PATH=/autoflex-fe

# 👇 Build cu variabile disponibile
RUN npm run build

# Phase 2: Run
FROM node:18-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
