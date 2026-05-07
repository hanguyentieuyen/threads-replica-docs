---
id: tech-stack
title: Tech Stack
sidebar_position: 3
---

Threads Replica uses a modern TypeScript stack across both the browser client and the API. The choices are pragmatic rather than experimental: the code favors libraries that make product iteration, API organization, and testing straightforward.

## Frontend Stack

| Area | Verified choice | Role in the project |
|---|---|---|
| App framework | React 18 | Builds the single-page application and route-level screens |
| Language and bundler | TypeScript + Vite | Fast local iteration and typed UI code |
| Routing | React Router | Public and protected route separation |
| Server state | TanStack Query | Fetching, pagination, caching, retries, and invalidation |
| HTTP client | Axios | Shared request layer with auth headers and token refresh handling |
| Forms | React Hook Form | Form state and validation ergonomics on auth/profile flows |
| UI system | Tailwind CSS + Radix UI | Utility-first styling and accessible primitives |
| Realtime client | Socket.IO client | Direct-message synchronization |
| Localization | i18next + react-i18next | English and Vietnamese UI text |

## Backend Stack

| Area | Verified choice | Role in the project |
|---|---|---|
| Runtime | Node.js | Runs the API server and background helpers |
| Web framework | Express | Route registration, middleware composition, and JSON APIs |
| Language | TypeScript | Shared domain types and service-layer safety |
| Database | MongoDB native driver | Stores users, posts, follows, bookmarks, notifications, and chat data |
| Validation | Joi | Validates request bodies, params, headers, and query strings |
| Authentication | JWT | Access token, refresh token, verify-email, and forgot-password flows |
| Realtime server | Socket.IO | Handshake auth, user rooms, and conversation events |
| API documentation | Swagger UI | Interactive API reference for the private implementation repo |

## Quality and Developer Tooling

| Area | Verified choice | Role in the project |
|---|---|---|
| Component and page tests | Vitest + Testing Library | Frontend behavior tests |
| Network mocking | MSW | Stable client-side tests without a live backend |
| Browser E2E | Playwright | End-to-end flows for auth, feed, profile, and search |
| Linting and formatting | ESLint + Prettier | Baseline code consistency across web and API projects |

## Optional Integrations

These integrations are supported in the codebase but are not required to understand the core architecture.

| Integration | Purpose |
|---|---|
| Google OAuth | Optional social sign-in entry point |
| AWS S3 or Cloudflare R2 | Optional object storage for uploaded media |
| Resend or SES-compatible sender config | Optional email delivery for verify-email and password-reset flows |

## Why This Stack Fits The Project

- React, TanStack Query, and Axios make it easy to express feed-style data fetching and protected routes.
- Express, Joi, and a service-oriented backend structure keep route logic understandable in a portfolio project.
- MongoDB fits social data well because posts, mentions, hashtags, notifications, and conversation metadata all benefit from flexible document shapes and aggregation pipelines.
