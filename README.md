<div align="center">

# 🌟 AI-Powered Task Manager

🚀 A sleek full-stack **AI-powered task management app** that helps teams organize workspaces, manage tasks, and get AI-driven summaries & smart deadline suggestions.

Built with **Next.js + React Query (frontend)**, **NestJS + PostgreSQL + Redis (backend)**, and **OpenAI API (AI integration)**.
Deployed with **Docker + GitHub Actions** to **Render / AWS / GCP**.

![Banner](https://placehold.co/1200x300/0D1117/FFFFFF?text=AI-Powered+Task+Manager\&font=Montserrat)

</div>

---

## ✨ Features

* 🔐 **User Authentication (JWT)** — secure register/login with role-based access (`admin` / `member`).
* 👥 **Workspaces** — create, invite members, and manage permissions.
* ✅ **Tasks CRUD** — create, update, delete, assign, prioritize, and filter tasks.
* 🤖 **AI Suggestions** — OpenAI-powered summaries & intelligent deadline predictions.
* 📊 **Dashboard** — progress tracking, task filters, and workspace statistics.
* ⚙️ **Infra** — Dockerized services & CI/CD pipelines with GitHub Actions.

---

## 🛠 Tech Stack

**Frontend:** Next.js • React Query • TailwindCSS
**Backend:** NestJS • Prisma ORM • PostgreSQL • Redis • BullMQ
**AI:** OpenAI API (LLMs)
**Infra:** Docker • GitHub Actions • Render / AWS / GCP

---

## 📂 Project Structure

```bash
ai-task-manager/
├─ apps/
│  ├─ api/      # NestJS backend
│  ├─ web/      # Next.js frontend
│  └─ worker/   # Background worker (AI jobs)
├─ infra/       # Docker & deployment configs
├─ scripts/     # DB seeds & migrations
└─ .github/     # CI/CD workflows
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/sumaiyashah27/ai-task-manager.git
cd ai-task-manager
```

### 2️⃣ Setup Environment Variables

```bash
cp .env.example .env
```

Update `.env` with your values:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/ai_task_manager
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=900s
JWT_REFRESH_EXPIRES_IN=7d
OPENAI_API_KEY=sk-xxxxxxx
PORT_API=4000
PORT_WEB=3000
```

### 3️⃣ Start Services with Docker

```bash
docker-compose up -d
```

* PostgreSQL → `localhost:5432`
* Redis → `localhost:6379`

### 4️⃣ Run Backend (NestJS API)

```bash
cd apps/api
npm install
npx prisma migrate dev --name init   # setup database schema
npm run start:dev
```

Backend → [http://localhost:4000](http://localhost:4000)

### 5️⃣ Run Frontend (Next.js)

```bash
cd apps/web
npm install
npm run dev
```

Frontend → [http://localhost:3000](http://localhost:3000)

### 6️⃣ Run Worker (AI Jobs)

```bash
cd apps/worker
npm install
npm run start:dev
```

Worker listens to Redis and processes AI jobs.

---

## 🧪 Testing

**Backend**

```bash
cd apps/api
npm run test
```

**Frontend**

```bash
cd apps/web
npm run test
```

---

## 📌 Roadmap

* [ ] 🔐 Authentication (JWT, roles)
* [ ] 👥 Workspaces CRUD + members
* [ ] ✅ Tasks CRUD + filters
* [ ] 🤖 AI agent integration (OpenAI API)
* [ ] 📊 Dashboard & charts
* [ ] ⚙️ CI/CD pipelines
* [ ] 🔔 Notifications & reminders
* [ ] 📝 Audit logs & activity tracking
* [ ] 🌐 Deployment to Render/AWS/GCP

---

## 📜 License

MIT License © 2025 **sumaiyashah27**



