---
id: deployment
title: Deployment
sidebar_position: 9
---

Threads Replica runs as two separate deployable applications inside the same private source repository: a browser client and a backend API. This page explains the runtime shape without exposing internal endpoints or sensitive configuration.

## Runtime Split

| Application | Role | Verified local default |
|---|---|---|
| `threads-web` | React SPA built with Vite | `http://localhost:3000` |
| `threads-api` | Express API, Swagger UI, and Socket.IO server | `http://localhost:4000` |
| `threads-replica-docs` | Public Docusaurus documentation site | Separate public docs deployment |

## Local Development Shape

1. Install dependencies separately for `threads-web` and `threads-api`.
2. Start the API in watch mode.
3. Start the Vite client.
4. Run browser tests against the local frontend, with the API available on the configured base URL.

The frontend and backend are coupled by environment configuration rather than by a single monolithic runtime.

## Environment Categories

| Category | What it covers |
|---|---|
| Core runtime | Port, environment mode, and general server boot requirements |
| Database | MongoDB credentials, database name, and collection names |
| Auth | JWT signing secrets, token expiry windows, and the password secret used in hashing |
| Client origin and callbacks | Allowed frontend origin, redirect callback, and OAuth-related client or redirect settings |
| Optional storage | S3 or R2 credentials, bucket selection, and endpoint configuration |
| Optional email | Resend or SES-style sender configuration for verify-email and forgot-password flows |

## Verified Backend Startup Behavior

- Required environment variables are validated before the server boots.
- The upload workspace is created during startup.
- Swagger UI is mounted as part of the Express app.
- Database initialization includes creation of a text index for post content search.
- Socket.IO is initialized on the same HTTP server as the REST API.

## Public-Safe Hosting Summary

- The project is designed as a split deployment, not a single all-in-one process.
- Repo materials point to separate frontend and backend hosting rather than a monolith.
- This public documentation intentionally avoids publishing live application URLs, callback URLs, or provider account details.

## Operational Notes

- Media and email integrations are optional from a documentation point of view: they extend the platform, but they are not required to understand the core social architecture.
- The current codebase shows stronger configuration structure than observability structure. Logging, uptime checks, and production monitoring are still natural areas for improvement.
