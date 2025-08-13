# Dockerfile

ARG NODE=node:lts-alpine3.21

# Stage 1: Install ALL dependencies (including devDependencies for build)
FROM ${NODE} AS deps

WORKDIR /app

COPY package*.json yarn.lock* ./

RUN yarn install --frozen-lockfile --production=false

# Stage 2: Build the app
FROM ${NODE} AS build

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN yarn build

# Stage 3: Install ONLY production dependencies
FROM ${NODE} AS prod-deps

WORKDIR /app

COPY package*.json yarn.lock* ./

RUN yarn install --frozen-lockfile --production=true

# Stage 4: Production image
FROM ${NODE} AS production

WORKDIR /app

# Copy only production dependencies
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy built application
COPY --from=build /app/build ./build

# Copy generated Prisma client to the correct location for @generated path mapping
COPY --from=build /app/generated ./generated

# Copy Prisma schema and migrations
COPY --from=build /app/prisma ./prisma

# Copy package.json for metadata
COPY package*.json ./

# Expose port (adjust if needed)
EXPOSE 4300

# Environment variables can be overridden at runtime
ENV NODE_ENV=production
ENV PORT=4300
ENV DATABASE_URL=""
ENV HOST="localhost"

HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4300/health || exit 1

# Run the application
CMD ["sh", "-c", "until nc -z mariadb 3306; do echo 'Waiting for MariaDB...'; sleep 2; done && npx prisma db push --schema /app/prisma/schema.prisma && node /app/prisma/seed.js && node /app/build/server.js"]