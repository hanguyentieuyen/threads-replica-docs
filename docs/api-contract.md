---
id: api-contract
title: API Contract
sidebar_position: 7
---

# API Contract (Sanitized)

> Base URL is intentionally omitted. All paths are relative. No production endpoints, secrets, or real domain names are included in this documentation.

## Conventions

- All requests and responses use `Content-Type: application/json`.
- Protected endpoints require an `Authorization: Bearer <access_token>` header.
- Responses follow a consistent envelope:
  ```json
  { "data": <payload>, "error": null }
  // or
  { "data": null, "error": { "message": "...", "code": "..." } }
  ```
- Pagination uses cursor-based strategy: responses include a `nextCursor` field; pass `?cursor=<value>` on the next request.

---

## Authentication

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | — | Create a new account |
| `POST` | `/auth/login` | — | Log in and receive access + refresh tokens |
| `POST` | `/auth/refresh` | — | Exchange a valid refresh token for new tokens |
| `POST` | `/auth/logout` | ✓ | Invalidate the current refresh token |

### POST /auth/register

**Request body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response `201 Created`:**
```json
{
  "data": {
    "user": { "id": "...", "username": "...", "email": "..." },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

### POST /auth/login

**Request body:**
```json
{ "email": "string", "password": "string" }
```

**Response `200 OK`:**
```json
{
  "data": {
    "user": { "id": "...", "username": "..." },
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

### POST /auth/refresh

**Request body:**
```json
{ "refreshToken": "string" }
```

**Response `200 OK`:**
```json
{
  "data": {
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

---

## Users & Profiles

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/users/:id` | — | Get a user's public profile |
| `GET` | `/users/me` | ✓ | Get the authenticated user's profile |
| `PATCH` | `/users/me` | ✓ | Update bio or avatar |

---

## Posts

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/posts` | ✓ | Create a new post |
| `GET` | `/posts/:id` | — | Get a single post |
| `DELETE` | `/posts/:id` | ✓ (owner) | Delete a post |
| `GET` | `/users/:id/posts` | — | List posts by a user |

### POST /posts

**Request body:**
```json
{ "content": "string (max 500 chars)" }
```

**Response `201 Created`:**
```json
{
  "data": {
    "id": "...",
    "content": "...",
    "authorId": "...",
    "likeCount": 0,
    "replyCount": 0,
    "createdAt": "ISO-8601"
  }
}
```

---

## Replies

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/posts/:id/replies` | ✓ | Reply to a post |
| `GET` | `/posts/:id/replies` | — | List replies for a post |

---

## Feed

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/feed/following` | ✓ | Paginated posts from followed users |

**Query parameters:**
| Param | Type | Description |
|---|---|---|
| `cursor` | string | Opaque cursor from previous response |
| `limit` | integer | Page size (default: 20, max: 50) |

**Response `200 OK`:**
```json
{
  "data": {
    "posts": [ { "id": "...", "content": "...", "author": {...}, "likeCount": 0, "createdAt": "..." } ],
    "nextCursor": "...",
    "hasMore": true
  }
}
```

---

## Follows

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/follows/:userId` | ✓ | Follow a user |
| `DELETE` | `/follows/:userId` | ✓ | Unfollow a user |
| `GET` | `/users/me/following` | ✓ | List accounts I follow |
| `GET` | `/users/me/followers` | ✓ | List my followers |

---

## Likes

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/posts/:id/like` | ✓ | Like a post |
| `DELETE` | `/posts/:id/like` | ✓ | Unlike a post |

---

## Error codes

| HTTP Status | Code | Meaning |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Request body/params failed validation |
| 401 | `UNAUTHORIZED` | Missing or invalid access token |
| 403 | `FORBIDDEN` | Authenticated but not permitted (e.g., delete another user's post) |
| 404 | `NOT_FOUND` | Resource not found |
| 409 | `CONFLICT` | Duplicate resource (e.g., already following, already liked) |
| 429 | `RATE_LIMITED` | Too many requests |
| 500 | `INTERNAL_ERROR` | Unexpected server error |
