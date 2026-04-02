# Threads Replica — Public Documentation (Sanitized)

This repository contains **sanitized, portfolio-grade documentation** for a private Threads-inspired social network project. The source code is intentionally kept private; this repo exists to showcase system design, architecture, and engineering decisions.

## Live Docs

**[https://hanguyentieuyen.github.io/threads-replica-docs/](https://hanguyentieuyen.github.io/threads-replica-docs/)**

## Tech stack (private project)

- **Frontend:** React.js (SPA)
- **Backend:** Node.js + Express (REST API)
- **Database:** MongoDB
- **Auth:** JWT access + refresh tokens
- **Deployment:** Vercel

## What's documented here

| Section | Content |
|---|---|
| Overview | Project summary, user flows, screenshot references |
| Tech Stack | Technology choices and rationale |
| Architecture | High-level diagrams and component breakdown |
| Features | Detailed feature descriptions |
| Data Model | Conceptual ER diagram |
| API Contract | Sanitized REST endpoint reference |
| Auth & Security | JWT flow, token storage trade-offs, mitigations |
| Deployment | Vercel deployment overview |
| Testing & Quality | Test strategy and code quality practices |
| Trade-offs & Future Work | Design decisions and roadmap |

## What is intentionally NOT included

- Source code
- Secrets, environment variables, or credentials
- Production endpoints or real domain names
- Private infrastructure configuration

## Run docs locally

```bash
npm install
npm start
```

## Build for production

```bash
npm run build
```

Built with [Docusaurus](https://docusaurus.io/).
