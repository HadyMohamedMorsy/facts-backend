# ======================
# Stage 1: Builder
# ======================
FROM node:20-alpine AS builder

# تثبيت pnpm
RUN npm install -g pnpm

WORKDIR /app

# نسخ ملفات التثبيت أولًا لتحسين cache
COPY package.json pnpm-lock.yaml ./

# ثبت كل الحزم (بما فيهم devDependencies) لبناء المشروع
RUN pnpm install --frozen-lockfile

# نسخ باقي المشروع
COPY . .

# بناء مشروع NestJS
RUN pnpm run build

# ======================
# Stage 2: Production
# ======================
FROM node:20-alpine AS production

ENV NODE_ENV=production

RUN npm install -g pnpm

WORKDIR /app

# نسخ package.json و lockfile
COPY package.json pnpm-lock.yaml ./

# ثبت فقط dependencies اللي مطلوبة للتشغيل
RUN pnpm install --frozen-lockfile --prod

# نسخ ملفات البناء من الـ builder
COPY --from=builder /app/dist ./dist

# فتح البورت الافتراضي
EXPOSE 3000

# أمر التشغيل
CMD ["node", "dist/src/main.js"]