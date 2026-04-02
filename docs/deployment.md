---
id: deployment
title: Deployment
sidebar_position: 9
---

# Deployment

## Platform: Vercel

Both the React frontend (SPA) and the Node.js/Express backend are deployed on **Vercel**.

Vercel provides:

- **Zero-config deployments** for React and Node.js projects.
- **Preview deployments** for every pull request (useful for reviewing UI changes before merging).
- **Serverless Functions** for the Express API (auto-scaling, no server management).
- **Edge CDN** for static assets and the React SPA.
- **Environment variable management** via the Vercel dashboard (secrets are never committed to source control).

---

## Environments

| Environment | Purpose |
|---|---|
| **Development** | Local machine — frontend dev server + local API + local MongoDB |
| **Preview** | Vercel preview URL per PR — useful for testing before merge |
| **Production** | Live Vercel deployment on merge to main branch |

---

## Typical deployment flow

```
1. Developer pushes changes to a feature branch
2. Vercel automatically creates a Preview deployment
3. Manual testing / code review on the Preview URL
4. PR is merged to main
5. Vercel triggers a Production deployment automatically
6. Smoke test: login, feed, create post, like, follow
```

---

## Environment variables

Sensitive configuration (database connection strings, JWT secrets, etc.) is stored as **environment variables in the Vercel dashboard** — never in source code or committed files.

> No secrets, connection strings, or credentials are documented here.

Typical variables managed this way:

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_ACCESS_SECRET` | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens |
| `NODE_ENV` | `development` / `production` |

---

## Build process

### Frontend

```
npm run build
→ Generates static assets in /dist or /build
→ Served by Vercel Edge CDN
```

### Backend (API)

```
Vercel detects Express API entry point
→ Wraps routes as Serverless Functions
→ Auto-deploys on push
```

---

## Database: MongoDB Atlas

The database is hosted on **MongoDB Atlas** (cloud-managed). Vercel Serverless Functions connect to Atlas over a secure TLS connection using the `MONGODB_URI` environment variable.

---

## Monitoring & observability (current state)

| Concern | Current approach |
|---|---|
| Error logging | Console logging (Vercel captures function logs) |
| Request logging | Middleware logs method, path, and status code (sanitized) |
| Alerts | Not configured (future work) |
| Uptime monitoring | Not configured (future work) |

---

## Future improvements

- Add structured logging (e.g., Winston) with log levels.
- Integrate an error tracking service (e.g., Sentry).
- Set up uptime monitoring and alerting.
- Add a staging environment with production-like data.
