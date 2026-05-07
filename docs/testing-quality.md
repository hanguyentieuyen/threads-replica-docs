---
id: testing-quality
title: Testing & Quality
sidebar_position: 10
---

The quality story is strongest on the frontend today. The private repo contains real automated UI coverage, while the backend currently relies more on validation layers, startup guards, and manual verification than on a visible automated test suite.

## Verified Coverage

| Layer | What is present |
|---|---|
| Frontend unit and component tests | Vitest + Testing Library tests for router behavior, auth pages, feed screens, profile flows, saved posts, messages, and reusable components such as `PostCard` |
| Frontend network mocking | MSW handlers for auth, posts, users, comments, and chat APIs |
| Frontend socket testing | Test setup mocks `socket.io-client` and simulates chat events without a live socket server |
| Browser E2E | Playwright specs for register, login, forgot password, home feed, post detail, post interactions, profile, and search |
| Static API discoverability | Swagger UI in the backend repo |
| Request validation | Joi validation on backend bodies, params, headers, and query strings |

## How Frontend Tests Are Structured

- Shared test setup registers `@testing-library/jest-dom`, MSW, mocked browser storage, and mocked socket behavior.
- Page-level tests cover the main product routes rather than only isolated utility functions.
- Playwright is configured with `http://localhost:3000` as the base URL.
- The Playwright `webServer` block is currently commented out, so the frontend dev server is started manually before E2E runs.

## Code-Quality Practices Visible In The Repo

- Both `threads-web` and `threads-api` include ESLint and Prettier scripts.
- The frontend build script type-checks before bundling.
- The backend validates required runtime environment variables before boot.
- MongoDB text-index creation for post search is handled in application startup rather than as a separate manual note.

## Honest Gaps

- No backend automated test suite was discovered in the inspected private repo.
- There is no visible API-level integration test layer for auth, feed, or conversations yet.
- Realtime chat behavior is thoughtfully implemented, but it would benefit from dedicated backend integration tests around unread counts, membership checks, and socket reconnection scenarios.

## Practical Next Steps

- Add API integration tests for auth, feed, notifications, and conversations.
- Add targeted chat tests for send-message, mark-as-read, and unauthorized conversation access.
- Automate frontend E2E startup so Playwright can run with less manual setup.
