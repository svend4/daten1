# daten1 — Браузерные блокноты (SQLite/PWA), HTML5-игры и многоуровневый учебный проект

Репозиторий объединяет автономные HTML-приложения (блокноты на SQLite в браузере с поддержкой PWA и 2D/2.5D/3D-игры), справочные материалы по разработке игр, а также серию веток с 7 архитектурными уровнями веб-приложения магазина цветов (`flower_shop_master_levels_v7`).

## Состав и структура ветки `main`

### Браузерные блокноты и PWA

- `notebook-2d.html` — «Многопользовательский Блокнот + SQLite».
- `notebook-2.5d.html` — 2.5D-версия блокнота.
- `notebook-3d.html` — «3D Записная Книжка + SQLite».
- `notebook-2d-ultra.html` — расширенная 2D-версия блокнота.
- `notebook-2d-mega.html` — «МЕГА Блокнот» (100+ функций, включая поддержку SQLite, Markdown, графиков и экспорта).
- `manifest.json` — веб-манифест PWA для `notebook-2d-mega.html` (`start_url: "/notebook-2d-mega.html"`, быстрые действия «Новая заметка» и «Дашборд»).
- `sw.js` — Service Worker для офлайн-кеширования `notebook-2d-mega.html` и CDN-библиотек (`sql.js`, `marked`, `jspdf`, `Chart.js`, `highlight.js`, `mermaid`).

### Браузерные игры и материалы по геймдеву

- `space-shooter-game.html` — 2D-игра «Космический Защитник».
- `space-shooter-2.5d.html` — 2.5D-версия космического шутера.
- `space-shooter-3d.html` — 3D-версия «Космический Защитник 3D».
- `browser-games-guide.md` — руководство по созданию браузерных игр (HTML5 Canvas, JS ES6+, WebGL, CSS).
- `computer-games-types.md` — классификация жанров, платформ и моделей распространения компьютерных игр.
- `minimal-game-development.md` — минимальный стек и стартовые примеры игр на Python (Pygame), JavaScript (HTML5 Canvas), C# (Unity), C++ (SFML) и GDScript (Godot).

### Архив и служебные файлы

- `flower_shop_master_levels_v7.zip` — архив с проектом магазина цветов в 7 уровнях сложности.
- `LICENSE` — лицензия GNU Affero General Public License v3.
- `README.md` — документация репозитория.

## Технологический стек и запуск (`main`)

- **Технологии:** HTML5, CSS3, Vanilla JavaScript, Canvas/WebGL, PWA (Web App Manifest + Service Worker), CDN-зависимости в `sw.js` (`sql.js`, `marked`, `jspdf`, `Chart.js`, `highlight.js`, `mermaid`).
- **Запуск:**
  - Простые HTML-страницы (`space-shooter-*.html`, `notebook-*.html`) можно открыть напрямую в браузере.
  - Для корректной работы PWA (`manifest.json` и `sw.js`, использующих абсолютный путь `/notebook-2d-mega.html`) запустите локальный HTTP-сервер из корня репозитория:

```bash
python3 -m http.server 8000
# затем откройте http://localhost:8000/notebook-2d-mega.html
```

## Ветки репозитория

Помимо `main` (куда влиты PR [#1](../../pull/1)–[#11](../../pull/11)), в репозитории присутствуют следующие ветки:

- `claude/browser-game-development-u0n4p` — прототип браузерной игры `index.html` («Space Defender - Браузерная игра»).
- `claude/computer-games-types-VBcEn` — ветка разработки игр и блокнотов; содержит дополнительный коммит `3743e3e` («Улучшена система тем (U2)») с обновлённым `notebook-2d-mega.html`.
- `claude/extract-archive-TDUEs` — распакованный каталог `flower_shop_master_levels_v7/`, обзорный `README.md` («Flower Shop - 7 Levels») и руководство `RAILWAY_DEPLOYMENT_GUIDE.md` по деплою всех 7 уровней на Railway.
- `claude/level1-TDUEs` — Уровень 1 (PHP + SQLite): `index.php`, `init_db.php`, `flowers.db`, `images/`, `nixpacks.toml`, `RAILWAY_DEPLOY.md`; запуск: `php -S localhost:8000`.
- `claude/level2-TDUEs` — Уровень 2 (Python Flask + SQLite): `app.py`, `config.py`, `database.py`, `flowers.db`, `templates/`, `static/`, `requirements.txt`, `Procfile`, `RAILWAY_DEPLOY.md`; запуск: `pip install -r requirements.txt && python app.py`.
- `claude/level3-TDUEs` — Уровень 3 (Django): `manage.py`, `flower_shop/`, `shop/`, `templates/`, `static/`, `requirements.txt`, `Procfile`, `RAILWAY_DEPLOY.md`; запуск: `pip install -r requirements.txt && python manage.py migrate && python manage.py runserver`.
- `claude/level4-TDUEs` — Уровень 4 (Node.js + Express + EJS + SQLite): `server.js`, `package.json`, `flowers.db`, `views/`, `public/`, `RAILWAY_DEPLOY.md`; запуск: `npm install && npm start`.
- `claude/level5-TDUEs` — Уровень 5 (React + Vite + Flask API + SQLite): `backend/`, `frontend/`, `RAILWAY_DEPLOY.md`.
- `claude/level6-TDUEs` — Уровень 6 (Next.js App Router + TypeScript + Prisma + PostgreSQL + Tailwind CSS): `src/`, `prisma/`, `public/`, `next.config.js`, `package.json`, `tailwind.config.ts`, `tsconfig.json`, `RAILWAY_DEPLOY.md`.
- `claude/level7-TDUEs` — Уровень 7 (Enterprise-микросервисы: React + nginx `api-gateway/` + `services/` + Postgres + RabbitMQ + Docker/Kubernetes): `docker-compose.yml`, `kubernetes/`, `db/`, `RAILWAY_DEPLOY.md`; запуск: `docker compose up --build`.
- `codex/readme-overview-20261118` — неслитая ветка с открытым draft PR [#12](../../pull/12) («Add concise project README»).

## Лицензия

В ветке `main` проект распространяется под лицензией **GNU Affero General Public License v3** (см. файл `LICENSE`).
