---
id: features
title: Features
sidebar_position: 5
---

# Features

## Authentication

Users can create an account and log in using email and password credentials.

| Feature | Description |
|---|---|
| Registration | Creates a new user account with hashed password |
| Login | Validates credentials and issues access + refresh tokens |
| Token refresh | Exchanges a valid refresh token for a new access token |
| Logout | Invalidates the refresh token server-side |

**Token lifecycle:**
- Access token: short-lived (e.g., 15 minutes), sent in every API request header.
- Refresh token: longer-lived, used only to obtain a new access token.

---

## Posts

Users can create short-form text posts similar to Threads.

| Feature | Description |
|---|---|
| Create post | Authenticated user submits a text post |
| View post | Fetch a single post with its metadata |
| Delete post | Owner-only action to remove a post |
| List posts by user | View all posts authored by a specific user |

---

## Replies

Posts can have nested replies, enabling threaded conversations.

| Feature | Description |
|---|---|
| Create reply | Authenticated user replies to a post |
| List replies | Fetch all replies for a given post |

---

## Likes

Users can express appreciation for posts.

| Feature | Description |
|---|---|
| Like a post | Increments the like counter; records the user-post relationship |
| Unlike a post | Removes the like; decrements the counter |
| Like count display | Visible on each post card |

Optimistic UI updates are applied on the client side so the like toggle feels instant.

---

## Following system

Users can follow other accounts to build a personalized feed.

| Feature | Description |
|---|---|
| Follow a user | Creates a directed follow relationship |
| Unfollow a user | Removes the follow relationship |
| Following list | Lists accounts a user follows |
| Follower count | Displayed on profile pages |

---

## Following feed

The home feed shows posts only from accounts the authenticated user follows.

| Feature | Description |
|---|---|
| Feed retrieval | `GET /feed/following` — cursor-paginated |
| Sort order | Reverse chronological (newest first) |
| Scope | Limited to followed users |

**Implementation notes:**
- The query finds all `userId`s in the user's following list, then fetches recent posts where `authorId` is in that set.
- Cursor-based pagination avoids the performance pitfalls of offset pagination on large datasets.

---

## User profiles

Each user has a public profile page.

| Feature | Description |
|---|---|
| View public profile | Username, bio, post count, follower/following counts |
| My profile | Same as public, but with edit controls |
| Profile posts | Lists all posts by the user |

---

## Planned features

The following features are designed but **not yet implemented**:

| Feature | Notes |
|---|---|
| Real-time notifications | Planned via Socket.IO or WebSocket |
| In-app notification center | UI for likes, replies, new followers |
| Push notifications | Future work |
| Full-text search | Search posts and users |
| Content moderation | Report / block users |
