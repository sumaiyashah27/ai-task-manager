# AI-Powered Task Manager 🚀

A full-stack, AI-enhanced task & workspace manager with real-time collaboration, AI-driven task summarization & deadline suggestions, and production-ready CI/CD.
Built with **Next.js + React Query** (frontend), **NestJS + PostgreSQL + Redis** (backend + workers), **OpenAI** for LLM features, and Docker + GitHub Actions for CI/CD and deployment.

> Concise goal: let teams create, prioritize, and track work faster — with AI that summarizes work, suggests deadlines & estimates, and helps create task templates.

---

## Repo

👉 **GitHub**: [sumaiyashah27/ai-task-manager](https://github.com/sumaiyashah27/ai-task-manager.git)

---

## Badges

![build](https://img.shields.io/badge/build-passing-brightgreen)
![license](https://img.shields.io/badge/license-MIT-blue)

---

## Highlights / Key Features ✨

* JWT-based auth + RBAC (`admin` / `member`)
* Workspaces, memberships, and teams
* Tasks: CRUD, subtasks, dependencies, attachments
* AI: one-click task summaries, deadline suggestions, time estimates, title/priority suggestions, template generation
* Real-time sync (WebSockets / SSE)
* Notifications: in-app + email (reminders, mentions, assignments)
* Background workers (BullMQ + Redis) for AI batching, scheduled reminders, email delivery
* Storage via S3-compatible signed URLs for attachments
* Dockerized for local dev & production; GitHub Actions CI/CD pipelines
* Observability & security best practices: logging, Sentry, rate-limiting, OWASP rules

---

## Quick Demo (conceptual)

```bash
# create a task
curl -X POST https://api.example.com/workspaces/{workspaceId}/tasks \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Plan onboarding","description":"Create checklist for new hires...","assignees":["user-id-1"]}'

# ask AI to summarize a task
curl -X POST https://api.example.com/tasks/{taskId}/ai/summarize \
  -H "Authorization: Bearer $ACCESS_TOKEN"
# => returns { summary, model, promptPreview, confidence }
```

---

## Table of Contents

* [Tech Stack](#tech-stack)
* [Getting Started (Local)](#getting-started-local)
* [Environment Variables](#environment-variables)
* [Docker & Local Dev](#docker--local-dev)
* [Database & Migrations](#database--migrations)
* [Running Workers](#running-workers)
* [CI / CD](#ci--cd)
* [Architecture Overview](#architecture-overview)
* [File Structure](#file-structure)
* [AI Integration & Prompts](#ai-integration--prompts)
* [Testing](#testing)
* [Contributing](#contributing)
* [Roadmap](#roadmap)
* [Useful Links](#useful-links--resources)
* [License](#license--credits)

---

## Tech Stack 🧰

**Frontend**

* Next.js (React) + React Query
* Tailwind / CSS Modules
* PWA support (optional)

**Backend**

* NestJS (TypeScript)
* PostgreSQL (Prisma ORM)
* Redis (caching, sessions, queues)
* BullMQ for background jobs
* OpenAPI / Swagger docs

**AI**

* OpenAI API for summarization, suggestions, and generation
* Audit of AI responses (AiAudit table)

**Infra**

* Docker + docker-compose
* GitHub Actions for CI/CD
* Deploy to Render / AWS / GCP
* S3-compatible storage for attachments

---

## Getting Started (Local) ⚡

> Assumes Node.js (18+), Docker, and Docker Compose installed.

1. Clone repository

```bash
git clone https://github.com/sumaiyashah27/ai-task-manager.git
cd ai-task-manager
```

2. Copy env examples

```bash
cp .env.example .env
```

3. Start local stack (Postgres, Redis, backend, frontend, worker)

```bash
docker-compose up --build
```

4. Run migrations & seed

```bash
npm run migrate
npm run seed
```

5. Open app

* Frontend: [http://localhost:3000](http://localhost:3000)
* API: [http://localhost:4000](http://localhost:4000) (Swagger at `/api`)

---

## Environment Variables

```
# App
NODE_ENV=development
PORT=4000

# Database
DATABASE_URL=postgresql://postgres:password@postgres:5432/ai_task_manager?schema=public

# Redis
REDIS_URL=redis://redis:6379

# JWT
JWT_ACCESS_SECRET=change_this_to_a_strong_secret
JWT_REFRESH_SECRET=change_this_too
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# OpenAI
OPENAI_API_KEY=sk-...

# AWS / S3 (optional)
S3_ENDPOINT=
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY=
S3_SECRET_KEY=

# Sentry (optional)
SENTRY_DSN=

# Other
FRONTEND_URL=http://localhost:3000
```

---

## Docker & Local Dev

* **apps/backend/Dockerfile** — backend container
* **apps/frontend/Dockerfile** — frontend container
* **apps/worker/Dockerfile** — worker container
* **docker-compose.yml** — orchestrates Postgres, Redis, backend, frontend, worker, and Adminer

Commands:

```bash
# build images (local)
docker-compose build

# start stack (foreground)
docker-compose up

# start stack (detached)
docker-compose up -d

# view logs
docker-compose logs -f backend
```

---

## Database & Migrations

We recommend Prisma for schema & migrations (files in `/prisma`).

```bash
# generate client
npx prisma generate

# create migration
npx prisma migrate dev --name init

# run migrations (production)
npx prisma migrate deploy
```

---

## Running Workers

Workers handle AI batching, emails, and scheduled reminders.

```bash
# from repo root (in dev using docker-compose)
docker-compose up worker

# or run locally
cd apps/worker
npm install
npm run start:dev
```

---

## CI / CD (GitHub Actions)

* `.github/workflows/ci.yml` — run lint, unit tests, build images, integration checks
* `.github/workflows/cd.yml` — deploy to Render/AWS/GCP, run migrations, send notifications

Tip: Protect `main` branch and require CI to pass before merging.

---

## Architecture Overview 🏗️

* **Frontend**: Next.js + React Query, secure auth, responsive UI
* **API**: Modular NestJS (auth, users, workspaces, tasks, ai, notifications)
* **DB**: PostgreSQL + Prisma
* **Cache/Queue**: Redis + BullMQ
* **AI**: OpenAI via centralized service with audit logs
* **Workers**: AI batching, reminders, email
* **Deployment**: Docker images + CI/CD pipelines

---

## File Structure (short)

```
ai-task-manager/
├─ apps/
│  ├─ frontend/ (Next.js)
│  ├─ backend/  (NestJS)
│  └─ worker/   (BullMQ)
├─ packages/    (shared types & UI)
├─ prisma/
├─ infra/
├─ .github/
└─ docs/
```

---

## AI Integration & Prompts

* **Endpoints**

  * `POST /tasks/:id/ai/summarize` → `{ summary, model, promptPreview, confidence }`
  * `POST /tasks/:id/ai/suggest-deadline` → `{ suggested_due_date, rationale, confidence }`
* AI calls queued for cost/concurrency control
* Responses stored with model + prompt (AiAudit)
* Prompt library versioned in `docs/prompts.md`

Example prompt:

```
You are a helpful assistant. Summarize the following task description into a concise one-line summary (under 20 words) and a 2-sentence rationale.
Task: {task.description}
```

---

## Testing

* Unit tests (backend modules + frontend components)
* Integration tests (API endpoints with test DB)
* E2E tests (Playwright / Cypress)

```bash
# backend
cd apps/backend
npm test

# frontend
cd apps/frontend
npm test
```

---

## Contributing 🤝

1. Fork the repo & create a feature branch: `git checkout -b feat/awesome`
2. Open a PR against `main` with a clear description & linked issue
3. Ensure CI passes (lint, tests)
4. Update docs if you change behavior or prompts

Code style: Prettier + ESLint (config in root). Commit hooks via Husky recommended.

---

## Roadmap

* AI audit & cost controls
* Semantic search (embeddings)
* Mobile app / PWA polish
* Enterprise: SAML/SCIM, data retention controls

---

## Useful Links & Resources

* `docs/api.md` — API reference
* `docs/prompts.md` — AI prompt library
* `docs/architecture.md` — diagrams & flows

---

## License & Credits

MIT © [sumaiyashah27](https://github.com/sumaiyashah27)

---

🚀 Clone the repo & get started:

```bash
git clone https://github.com/sumaiyashah27/ai-task-manager.git
```



