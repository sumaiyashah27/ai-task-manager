# AI-Powered Task Manager 🚀

A full-stack, AI-enhanced task & workspace manager with real-time collaboration, AI-driven task summarization & deadline suggestions, and production-ready CI/CD.
Built with **Next.js + React Query** (frontend), **NestJS + PostgreSQL + Redis** (backend + workers), **OpenAI** for LLM features, and Docker + GitHub Actions for CI/CD and deployment.

> Concise goal: let teams create, prioritize, and track work faster — with AI that summarizes work, suggests deadlines & estimates, and helps create task templates.

---

## Repo

👉 **GitHub**: [https://github.com/sumaiyashah27/ai-task-manager.git](https://github.com/sumaiyashah27/ai-task-manager.git)

---

## Table of Contents

* [Tech Stack](#tech-stack)
* [Getting Started — Local](#getting-started-local)
* [Environment Variables](#environment-variables)
* [Docker and Local Dev](#docker-and-local-dev)
* [Database and Migrations](#database-and-migrations)
* [Running Workers](#running-workers)
* [CI / CD](#ci--cd)
* [Architecture Overview](#architecture-overview)
* [File Structure](#file-structure)
* [AI Integration and Prompts](#ai-integration-and-prompts)
* [Testing](#testing)
* [Contributing](#contributing)
* [Roadmap](#roadmap)
* [Useful Links & Resources](#useful-links--resources)
* [License](#license)

---

<!-- Anchors & Sections -->

<a id="tech-stack"></a>

## Tech Stack 🧰

**Frontend**

* Next.js (React) + React Query
* Tailwind / CSS Modules

**Backend**

* NestJS (TypeScript)
* PostgreSQL (Prisma)
* Redis (caching + queues)
* BullMQ for background jobs

**AI**

* OpenAI API (LLMs) — audited responses stored in AiAudit

**Infra**

* Docker + docker-compose
* GitHub Actions CI/CD
* Deploy to Render / AWS / GCP

<a id="getting-started-local"></a>

## Getting Started — Local ⚡

1. Clone repo:

```bash
git clone https://github.com/sumaiyashah27/ai-task-manager.git
cd ai-task-manager
```

2. Copy env:

```bash
cp .env.example .env
```

3. Start stack:

```bash
docker-compose up --build
```

4. Run migrations & seed:

```bash
npm run migrate
npm run seed
```

5. Open:

* Frontend: [http://localhost:3000](http://localhost:3000)
* API: [http://localhost:4000](http://localhost:4000)

<a id="environment-variables"></a>

## Environment Variables

Place values in `.env` (do **not** commit secrets):

```
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://postgres:password@postgres:5432/ai_task_manager?schema=public
REDIS_URL=redis://redis:6379
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
OPENAI_API_KEY=sk-...
FRONTEND_URL=http://localhost:3000
```

<a id="docker-and-local-dev"></a>

## Docker and Local Dev

* `apps/backend/Dockerfile`, `apps/frontend/Dockerfile`, `apps/worker/Dockerfile`
* `docker-compose.yml` orchestrates Postgres, Redis, backend, frontend, worker

Commands:

```bash
docker-compose build
docker-compose up -d
docker-compose logs -f backend
```

<a id="database-and-migrations"></a>

## Database and Migrations

Using Prisma:

```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma migrate deploy
```

<a id="running-workers"></a>

## Running Workers

```bash
docker-compose up worker
# or
cd apps/worker && npm run start:dev
```

<a id="ci--cd"></a>

## CI / CD

* `.github/workflows/ci.yml` — lint, test, build
* `.github/workflows/cd.yml` — build & deploy, run migrations

<a id="architecture-overview"></a>

## Architecture Overview 🏗️

* Frontend: Next.js + React Query
* API: NestJS modular services
* DB: PostgreSQL + Prisma
* Queue: Redis + BullMQ
* AI: OpenAI via `ai.service` (audited)

<a id="file-structure"></a>

## File Structure

```
ai-task-manager/
├─ apps/
│  ├─ frontend/  # Next.js
│  ├─ backend/   # NestJS
│  └─ worker/    # BullMQ
├─ packages/     # shared libs (common, ui)
├─ prisma/
├─ infra/
├─ scripts/
├─ tests/
└─ docs/
```

<a id="ai-integration-and-prompts"></a>

## AI Integration and Prompts

API endpoints:

* `POST /tasks/:id/ai/summarize` → `{ summary, model, promptPreview, confidence }`
* `POST /tasks/:id/ai/suggest-deadline` → `{ suggested_due_date, rationale, confidence }`

AI calls are queued and responses stored in `AiAudit` for explainability. Keep prompts versioned in `docs/prompts.md`.

<a id="testing"></a>

## Testing

* Unit tests, integration tests, E2E (Playwright/Cypress)

Run:

```bash
cd apps/backend && npm test
cd apps/frontend && npm test
```

<a id="contributing"></a>

## Contributing 🤝

1. Fork & create branch `feat/...`
2. Run tests & linters
3. Open PR and link issue

<a id="roadmap"></a>

## Roadmap

* AI audit & cost controls
* Semantic search (embeddings)
* Mobile / PWA
* Enterprise features (SAML/SCIM)

<a id="useful-links--resources"></a>

## Useful Links & Resources

* `docs/api.md` — API reference
* `docs/prompts.md` — prompt library
* `docs/architecture.md` — diagrams

<a id="license"></a>

## License

MIT © [sumaiyashah27](https://github.com/sumaiyashah27)

---
