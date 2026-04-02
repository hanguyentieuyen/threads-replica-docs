---
id: tradeoffs-future
title: Trade-offs & Future Work
sidebar_position: 11
---

# Trade-offs & Future Work

## Design trade-offs

### 1. JWT stored in LocalStorage

**Decision:** Store access and refresh tokens in LocalStorage.

| | Details |
|---|---|
| **Pros** | Simple implementation; works seamlessly in a SPA without backend cookie configuration |
| **Cons** | Tokens are readable by JavaScript; vulnerable if an XSS attack is successful |
| **Mitigations** | Input sanitization, React's default HTML escaping, short-lived access tokens, refresh token rotation |
| **Planned improvement** | Move refresh token to an `HttpOnly Secure` cookie; the access token can remain in memory (not LocalStorage) for further hardening |

---

### 2. Fan-out on read (following feed)

**Decision:** Generate the following feed by querying posts whose `authorId` is in the user's following list at read time.

| | Details |
|---|---|
| **Pros** | Simple to implement; no write amplification; always fresh data |
| **Cons** | Query cost grows linearly with the size of the following list; can be slow for users who follow many accounts |
| **Current mitigation** | Compound indexes on `(authorId, createdAt)` and `(followerId)` |
| **Planned improvement** | Cursor-based pagination to limit query scope; precomputed timelines (fan-out on write) for heavy users |

---

### 3. Denormalized like/reply counts

**Decision:** Store `likeCount` and `replyCount` as fields directly on the `Post` document.

| | Details |
|---|---|
| **Pros** | Fast reads; no need to count related documents on every post fetch |
| **Cons** | Write contention on popular posts; risk of count drift if updates are not atomic |
| **Mitigation** | Use atomic increment/decrement operations (`$inc`) to keep counts consistent |
| **Alternative** | Compute counts on read from the `Like` and `Reply` collections (simpler, but slower at scale) |

---

### 4. Monorepo vs separate repos

**Decision:** (Assumed) frontend and backend live in the same private repository for simplicity.

| | Details |
|---|---|
| **Pros** | Easier to coordinate changes across frontend and backend; single CI pipeline |
| **Cons** | Tighter coupling; shared deployment pipeline |
| **Planned improvement** | Separate repos (or at minimum separate CI jobs) if the project grows to a team setting |

---

### 5. No automated test suite (MVP stage)

**Decision:** Manual testing only at MVP stage.

| | Details |
|---|---|
| **Pros** | Faster initial development cycle |
| **Cons** | Higher risk of regressions as the codebase grows |
| **Planned improvement** | Add unit tests (Jest), integration tests (Supertest), and optionally E2E tests (Playwright) — see [Testing & Quality](./testing-quality) |

---

## Future work roadmap

### Near-term

| Feature | Description |
|---|---|
| HttpOnly cookie for refresh token | Harden auth token storage |
| Automated tests | Unit + integration test suite |
| Pagination improvements | Ensure cursor pagination is applied consistently |
| Error monitoring | Integrate Sentry or similar |

### Medium-term

| Feature | Description |
|---|---|
| Real-time notifications | Socket.IO / WebSocket connection for live notification delivery |
| In-app notification center | UI panel for likes, replies, new followers |
| Push notifications | Web Push API or mobile push |
| Full-text search | Search posts and users (MongoDB Atlas Search or Elasticsearch) |

### Longer-term

| Feature | Description |
|---|---|
| Precomputed timeline | Fan-out on write for the following feed (better scalability) |
| Content moderation | Report / block users; automated spam detection |
| Media uploads | Image/video posts with CDN delivery |
| Global/explore feed | Trending posts beyond the following graph |
| Multi-region deployment | Lower latency for users outside the primary region |
| Analytics | Usage metrics and event tracking (privacy-respecting) |

---

## Lessons learned

- **Start simple, index intentionally.** Adding indexes later is easy; removing premature complexity is hard.
- **Short access token TTL matters.** A 15-minute TTL dramatically limits blast radius if a token leaks — the cost (refresh overhead) is minimal.
- **Optimistic UI is important for social apps.** Immediate feedback on likes/follows is a significant UX improvement over waiting for server confirmation.
- **Cursor pagination beats offset pagination early.** Offset pagination produces inconsistent results when new content is inserted concurrently; cursor pagination avoids this entirely.
