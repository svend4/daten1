# Railway Deployment Guide - Flower Shop 7 Levels

Полное руководство по развертыванию всех семи уровней магазина цветов на Railway.

## Обзор уровней

Каждый уровень представляет собой отдельную ветку в репозитории с готовым приложением для деплоя:

| Уровень | Ветка | Технологии | Сложность |
|---------|-------|------------|-----------|
| **Level 1** | `claude/level1-TDUEs` | PHP + SQLite | ⭐ Начальный |
| **Level 2** | `claude/level2-TDUEs` | Flask + SQLite | ⭐⭐ Базовый |
| **Level 3** | `claude/level3-TDUEs` | Django + SQLite | ⭐⭐⭐ Средний |
| **Level 4** | `claude/level4-TDUEs` | Node.js + Express | ⭐⭐⭐ Средний |
| **Level 5** | `claude/level5-TDUEs` | React + Flask API | ⭐⭐⭐⭐ Продвинутый |
| **Level 6** | `claude/level6-TDUEs` | Next.js + TypeScript + Prisma | ⭐⭐⭐⭐⭐ Профессиональный |
| **Level 7** | `claude/level7-TDUEs` | Microservices (Docker/K8s) | ⭐⭐⭐⭐⭐⭐ Enterprise |

## Быстрый старт

### Шаг 1: Создайте аккаунт на Railway

1. Перейдите на [railway.app](https://railway.app)
2. Зарегистрируйтесь через GitHub
3. Подтвердите свой email

### Шаг 2: Подключите репозиторий

1. В Railway нажмите "New Project"
2. Выберите "Deploy from GitHub repo"
3. Выберите репозиторий `svend4/daten1`
4. Railway запросит доступ - разрешите

### Шаг 3: Выберите уровень для деплоя

Выберите нужную ветку в зависимости от уровня (см. таблицу выше).

## Детальные инструкции по каждому уровню

### 📘 Level 1: PHP + SQLite

**Ветка:** `claude/level1-TDUEs`

**Что деплоится:**
- Простой PHP сайт с одним файлом
- SQLite база данных (встроенная)
- Встроенный PHP сервер

**Инструкции:**
1. Deploy from GitHub → выберите ветку `claude/level1-TDUEs`
2. Railway автоматически определит PHP
3. Приложение готово!

**Переменные окружения:** Не требуются

**Документация:** См. `RAILWAY_DEPLOY.md` в ветке

---

### 📗 Level 2: Flask + SQLite

**Ветка:** `claude/level2-TDUEs`

**Что деплоится:**
- Flask веб-приложение
- SQLite база данных
- Gunicorn веб-сервер

**Инструкции:**
1. Deploy from GitHub → `claude/level2-TDUEs`
2. Railway автоматически определит Python/Flask
3. Готово!

**Переменные окружения (опционально):**
- `SECRET_KEY` - ключ для сессий
- `FLASK_DEBUG` - режим отладки

**Документация:** См. `RAILWAY_DEPLOY.md` в ветке

---

### 📙 Level 3: Django

**Ветка:** `claude/level3-TDUEs`

**Что деплоится:**
- Django приложение
- SQLite/PostgreSQL база данных
- Gunicorn + WhiteNoise для статики

**Инструкции:**
1. Deploy from GitHub → `claude/level3-TDUEs`
2. Railway определит Django
3. Миграции выполнятся автоматически

**Переменные окружения:**
- `SECRET_KEY` - Django secret (генерируется автоматически)
- `DEBUG` - режим отладки (по умолчанию False)

**Админка:** `/admin` (создайте superuser в консоли)

**Документация:** См. `RAILWAY_DEPLOY.md` в ветке

---

### 📕 Level 4: Node.js + Express

**Ветка:** `claude/level4-TDUEs`

**Что деплоится:**
- Express.js сервер
- EJS шаблоны
- SQLite база данных

**Инструкции:**
1. Deploy from GitHub → `claude/level4-TDUEs`
2. Railway определит Node.js
3. Запустится автоматически

**Переменные окружения:** Не требуются (PORT настраивается автоматически)

**Документация:** См. `RAILWAY_DEPLOY.md` в ветке

---

### 📔 Level 5: React + Flask API

**Ветка:** `claude/level5-TDUEs`

**Что деплоится:**
- **Backend:** Flask REST API
- **Frontend:** React + Vite SPA

**ВАЖНО:** Это два отдельных сервиса!

**Инструкции:**

#### Backend:
1. New Project → Deploy from GitHub → `claude/level5-TDUEs`
2. Root Directory: `backend`
3. Railway определит Flask
4. Запишите URL backend (нужен для frontend)

#### Frontend:
1. New Service (в том же проекте)
2. Deploy from GitHub → `claude/level5-TDUEs`
3. Root Directory: `frontend`
4. Добавьте переменную: `VITE_API_URL=<backend-url>`
5. Railway определит Node.js/Vite

**Переменные окружения:**
- Backend: `PORT` (автоматически)
- Frontend: `VITE_API_URL` (URL бэкенда)

**Документация:** См. `RAILWAY_DEPLOY.md` в ветке

---

### 📓 Level 6: Next.js + TypeScript + Prisma

**Ветка:** `claude/level6-TDUEs`

**Что деплоится:**
- Next.js 14+ приложение
- TypeScript
- Prisma ORM
- Tailwind CSS
- Zustand state management

**Инструкции:**
1. Deploy from GitHub → `claude/level6-TDUEs`
2. Railway определит Next.js
3. Prisma сгенерирует клиент автоматически

**Опционально - PostgreSQL:**
1. Добавьте PostgreSQL service в Railway
2. Обновите `DATABASE_URL` на PostgreSQL URL
3. Измените `provider` в `schema.prisma` на `postgresql`

**Переменные окружения:**
- `DATABASE_URL` - SQLite или PostgreSQL
- `NODE_ENV=production`

**Документация:** См. `RAILWAY_DEPLOY.md` в ветке

---

### 📒 Level 7: Microservices Architecture

**Ветка:** `claude/level7-TDUEs`

**Что деплоится:**
- **product-service**: Node.js микросервис
- **order-service**: Python Flask микросервис
- **notification-service**: Python worker
- **frontend**: React + Vite
- **Требуется:** PostgreSQL + Redis

**ВАЖНО:** Это 4-5 отдельных сервисов!

**Инструкции:**

1. **Добавьте ресурсы в Railway:**
   - PostgreSQL database
   - Redis

2. **Product Service:**
   - Deploy from GitHub → `claude/level7-TDUEs`
   - Root Directory: `services/product-service`
   - Env: `DATABASE_URL` (PostgreSQL)

3. **Order Service:**
   - New Service → `claude/level7-TDUEs`
   - Root Directory: `services/order-service`
   - Env: `DATABASE_URL`, `PRODUCT_SERVICE_URL`, `REDIS_URL`

4. **Notification Service:**
   - New Service → `claude/level7-TDUEs`
   - Root Directory: `services/notification-service`
   - Env: `REDIS_URL`

5. **Frontend:**
   - New Service → `claude/level7-TDUEs`
   - Root Directory: `frontend`
   - Env: `VITE_PRODUCT_SERVICE_URL`, `VITE_ORDER_SERVICE_URL`

**Документация:** См. `RAILWAY_DEPLOY.md` в ветке

---

## Общие рекомендации

### Стоимость
- Railway предоставляет $5 бесплатно каждый месяц
- Этого хватит для тестирования нескольких уровней
- Уровни 1-4 очень дешевые (< $1/месяц каждый)
- Level 5-7 дороже из-за нескольких сервисов

### Масштабирование
- Начните с простых уровней (1-4)
- Переходите к сложным по мере необходимости
- Level 7 рекомендуется только для production

### Мониторинг
- Все логи доступны в Railway dashboard
- Метрики CPU/RAM для каждого сервиса
- Alerts для ошибок

### База данных
- SQLite: хорошо для dev/demo (Level 1-4)
- PostgreSQL: рекомендуется для production (Level 5-7)
- Railway предоставляет бесплатный PostgreSQL

## Поддержка

- Документация Railway: https://docs.railway.app
- Community: https://discord.gg/railway

## Следующие шаги

1. Выберите уровень для начала
2. Следуйте инструкциям выше
3. Изучите `RAILWAY_DEPLOY.md` в соответствующей ветке
4. Деплойте и тестируйте!

Удачи! 🚀
