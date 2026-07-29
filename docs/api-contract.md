---
id: api-contract
title: API Contract
sidebar_position: 7
---

This page describes the public-safe shape of the API rather than reproducing the entire Swagger specification. It focuses on route grouping, auth patterns, and the conventions that matter when reviewing backend design.

## Conventions

- Protected routes expect `Authorization: Bearer <access_token>`.
- Successful responses consistently include a top-level `message` and `data`.
- Paginated list endpoints use `page` and `limit` query parameters and return `total_page` inside `data`.
- The backend is organized by route group rather than by a single monolithic controller.

## Success Response Shape

```json
{
  "message": "GET_POST_SUCCESS",
  "data": {
    "page": 1,
    "limit": 10,
    "total_page": 3,
    "posts": []
  }
}
```

## Route Groups

| Group | Representative endpoints | Notes |
|---|---|---|
| `/auth` | `POST /register`, `POST /login`, `POST /refresh-token`, `POST /logout`, `POST /verify-email`, `POST /forgot-password`, `POST /verify-forgot-password`, `POST /reset-password`, `PUT /change-password`, `GET /oauth/google` | Covers browser auth lifecycle plus Google OAuth callback |
| `/users` | `GET /me`, `PATCH /me`, `GET /:username`, `POST /follow`, `DELETE /follow/:user_id`, `GET /:user_id/followers`, `GET /:user_id/following`, `GET /:user_id/posts`, `GET /:user_id/replies`, `GET /:user_id/bookmarks`, `GET /` | Mixes profile, social graph, saved-post reads, and username search |
| `/posts` | `GET /`, `POST /`, `GET /:post_id`, `GET /:post_id/activity`, `GET /:post_id/children`, `GET /:post_id/comments`, `POST or DELETE /:post_id/like`, `POST or DELETE /:post_id/repost`, `POST or DELETE /:post_id/bookmark`, `GET /:post_id/likes/users`, `GET /:post_id/reposts/users` | Central route group for feed, detail, and interaction APIs |
| `/search` | `GET /?content=...&page=...&limit=...` | Post search backed by a MongoDB text index |
| `/comments` | `POST /`, `PUT /:comment_id`, `DELETE /:comment_id`, `POST or DELETE /:comment_id/like` | Separate mutation group for comment writes |
| `/medias` | `POST /upload-image`, `POST /upload-video` | Authenticated upload endpoints |
| `/hashtags` | `GET /`, `POST /` | Search or create hashtags |
| `/notifications` | `GET /` plus read-state mutations | Paginated notification retrieval, filtering, and mark-one/mark-all-read actions |
| `/conversations` | `GET /`, `POST /`, `GET /:conversation_id/messages`, `POST /:conversation_id/messages`, `POST /:conversation_id/read` | Inbox, message history, send, and read-state APIs |
| `/static` | Static file access route group | Supports serving uploaded/static assets |

## Pagination And Query Patterns

| Pattern | Where it appears |
|---|---|
| `page` and `limit` pagination | Feed, followers, following, bookmarks, replies, search, notifications, conversations, messages |
| `feed_type=following|for_you` | Home feed endpoint |
| `post_type` filter | Child-post retrieval under a post |
| Text search query params | Post search and user search |
| Notification scope, type, and read-state filters | Notification inbox |

## REST And Realtime For Messaging

Messaging is intentionally hybrid:

- REST endpoints create or fetch conversations and message pages.
- Socket.IO pushes `chat:new_message` and `chat:conversation_read` after the database update completes.
- REST remains the source of truth for pagination and persistence; sockets are used to reduce UI latency and keep inbox state fresh.

## What This Page Intentionally Omits

- No raw tokens, production domains, or internal callback URLs
- No full request or response dump for every endpoint
- No attempt to duplicate the private Swagger site in public docs
