---
id: testing-quality
title: Testing & Quality
sidebar_position: 10
---

# Testing & Quality

## Current state

The project is at portfolio/MVP stage. The primary quality gates are:

| Practice | Status |
|---|---|
| Manual smoke testing (core flows) | ✅ Applied |
| ESLint (code style) | ✅ Configured |
| Prettier (formatting) | ✅ Configured |
| TypeScript strict mode | ✅ Enabled |
| Unit tests (business logic) | 🔄 Partial / planned |
| Integration tests (API endpoints) | 🔄 Planned |
| Frontend component tests | 🔄 Planned |
| End-to-end tests | 🔄 Planned |

---

## Manual smoke test checklist

After each deployment, the following flows are verified manually:

- [ ] Register a new account
- [ ] Log in with existing credentials
- [ ] Create a post
- [ ] Reply to a post
- [ ] Like and unlike a post
- [ ] Follow and unfollow a user
- [ ] View the following feed (confirm only followed users' posts appear)
- [ ] Refresh token flow (wait for access token expiry or force-expire, confirm seamless retry)
- [ ] Log out (confirm tokens are invalidated)

---

## Code quality practices

### TypeScript

The project uses **TypeScript** across both frontend and backend. Strict mode (`"strict": true`) is enabled to catch potential null/undefined bugs at compile time.

### ESLint

ESLint is configured with recommended rules for:
- React (hooks rules, JSX best practices)
- Node.js (no `eval`, no insecure patterns)
- TypeScript-specific rules

### Prettier

Prettier enforces a consistent code style. Format-on-save is recommended in the developer setup.

### Commit discipline

- Short, descriptive commit messages.
- Feature branches merged via pull requests.
- PR descriptions include a brief summary of the change and any manual test steps.

---

## Recommended next steps for test coverage

### Unit tests — API layer

Test individual service functions (e.g., `createPost`, `generateFeed`) in isolation with mocked database calls.

**Recommended tool:** Jest + ts-jest

```typescript
// Example: test that createPost rejects empty content
it('should throw VALIDATION_ERROR for empty content', async () => {
  await expect(createPost({ content: '', authorId: 'u1' }))
    .rejects.toMatchObject({ code: 'VALIDATION_ERROR' });
});
```

### Integration tests — REST endpoints

Test full request/response cycles against an in-memory or test MongoDB instance.

**Recommended tool:** Supertest + Jest + MongoDB Memory Server

```typescript
// Example: POST /posts returns 401 without token
it('POST /posts should return 401 when unauthenticated', async () => {
  const res = await request(app).post('/posts').send({ content: 'Hello' });
  expect(res.status).toBe(401);
});
```

### Frontend component tests

Test critical UI components in isolation (e.g., PostCard, FeedList, LoginForm).

**Recommended tool:** React Testing Library + Jest

### End-to-end tests

Test complete user journeys in a browser.

**Recommended tool:** Playwright or Cypress

---

## CI pipeline (future)

A minimal CI pipeline would run on every PR:

```
1. Install dependencies (npm ci)
2. Type-check (tsc --noEmit)
3. Lint (eslint .)
4. Unit + integration tests (jest)
5. Build (npm run build)
```

This ensures no broken types, lint violations, or failing tests reach the main branch.
