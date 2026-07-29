---
id: tradeoffs-future
title: Trade-offs & Future Work
sidebar_position: 11
---

The most interesting part of this project is not the feature list alone, but the decisions behind it. Threads Replica already shows a few deliberate trade-offs that are reasonable for a portfolio-scale product and also make good future-work candidates.

## 1. Browser-Friendly Auth Versus Stricter Token Isolation

- The current SPA stores access and refresh tokens in `localStorage` and uses an Axios refresh flow to recover from expired access tokens.
- On the backend, refresh tokens are still persisted and rotated, which gives the system a server-side revocation point.
- This is a practical middle ground for a browser-first project, but it is not the strongest possible isolation model.
- Best next step: move refresh-token handling to an `HttpOnly Secure` cookie and keep the access token short-lived in memory.

## 2. Aggregation-Heavy Reads Versus Simpler Write Paths

- Feed reads, profile tabs, bookmarks, replies, and search all rely on MongoDB aggregation pipelines to join user data, counts, and related entities on demand.
- That keeps writes comparatively simple and avoids building a separate read model too early.
- The trade-off is pagination consistency and query cost: the current system uses `page` and `limit`, which is easier to implement than cursor pagination but less stable on fast-moving feeds.
- Best next step: introduce cursor pagination for high-churn timelines and message history if the product surface keeps growing.

## 3. Hybrid Chat Design Optimized For 1-1 Messaging

- Conversations and messages are persisted through REST, while Socket.IO is used for `chat:new_message` and `chat:conversation_read` events.
- Conversation documents intentionally denormalize unread counts and last-message preview data so the inbox can be rendered quickly.
- This is a strong fit for direct messages, but the current implementation is still single-node, has no Redis adapter, and does not create chat-specific indexes during startup.
- Best next step: add conversation and message indexes, then layer in chat integration tests before considering horizontal socket scaling.

## 4. Backend Capability Ahead Of UI Surface

- The frontend now includes a notification inbox, but several backend/client capabilities still lack a complete user-facing flow: post search, a `for_you` feed selector, comment replies, and circle/audience management.
- Media uploads also reach the composer, but posted images and video are not yet rendered on feed and detail cards.
- Best next step: add a richer post-search experience, finish media rendering, and decide the product scope for replies and audience management.

## 5. Quality Is Stronger On The Frontend Than The Backend

- The frontend has real automated coverage with Vitest, Testing Library, MSW, and Playwright.
- The backend demonstrates solid validation and runtime safeguards, but no automated test suite was found in the inspected repo.
- Best next step: add API-level tests for auth, feeds, and conversations so future changes have stronger regression protection.
