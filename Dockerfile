# Этап сборки
FROM node:20-alpine AS builder

WORKDIR /app

# Установка pnpm
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

# Копирование файлов конфигурации
COPY package.json pnpm-workspace.yaml .npmrc ./
COPY packages/api-client/package.json ./packages/api-client/
COPY packages/utils/package.json ./packages/utils/
COPY packages/ui-kit/package.json ./packages/ui-kit/
COPY apps/main-app/package.json ./apps/main-app/

# Установка всех зависимостей
RUN pnpm install

# Копирование исходного кода
COPY . .

# Исправление прав доступа
RUN chown -R node:node /app && \
    chmod -R 755 /app

# Сборка пакетов
RUN pnpm run build:packages

# Этап development
FROM node:20-alpine AS development

WORKDIR /app

# Установка pnpm
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

# Копирование всего проекта из этапа сборки
COPY --from=builder /app .

# Настройка переменных окружения
ENV NODE_ENV=development
ENV PORT=3000
ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true
ENV TURBO_FORCE=true

# Открытие порта
EXPOSE 3000

# Этап production
FROM node:20-alpine AS runner

WORKDIR /app

# Установка pnpm
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

# Копирование необходимых файлов из этапа сборки
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml /app/.npmrc ./
COPY --from=builder /app/packages/api-client/package.json ./packages/api-client/
COPY --from=builder /app/packages/utils/package.json ./packages/utils/
COPY --from=builder /app/packages/ui-kit/package.json ./packages/ui-kit/
COPY --from=builder /app/apps/main-app/package.json ./apps/main-app/
COPY --from=builder /app/apps/main-app/next.config.js ./apps/main-app/
COPY --from=builder /app/apps/main-app/.next/standalone ./
COPY --from=builder /app/apps/main-app/.next/static ./apps/main-app/.next/static
COPY --from=builder /app/apps/main-app/public ./apps/main-app/public
COPY --from=builder /app/packages/api-client/dist ./packages/api-client/dist
COPY --from=builder /app/packages/utils/dist ./packages/utils/dist
COPY --from=builder /app/packages/ui-kit/dist ./packages/ui-kit/dist

# Установка production зависимостей
RUN pnpm install --prod

# Настройка переменных окружения
ENV NODE_ENV=production
ENV PORT=3000

# Открытие порта
EXPOSE 3000

# Запуск приложения
CMD ["node", "apps/main-app/server.js"] 