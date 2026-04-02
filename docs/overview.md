---
id: overview
title: Overview
sidebar_position: 2
---

# Project Overview

## Summary

Threads Replica is a small but complete social network application inspired by Meta Threads. It was built as a portfolio project to demonstrate full-stack engineering proficiency across frontend, backend, database design, and deployment.

**Core capabilities:**

- User registration and login with JWT authentication
- Create, view, and delete posts
- Reply to posts (threaded discussions)
- Like and unlike posts
- Follow and unfollow other users
- A personalized "Following" feed showing posts from followed accounts
- User profile pages

## Screenshots

> Screenshots of the live application are placed in `static/img/screenshots/`. Add `.png` files named after each view to populate this section.

Recommended screenshot set:

| File | View |
|---|---|
| `static/img/screenshots/login.png` | Login / registration screen |
| `static/img/screenshots/feed.png` | Following feed |
| `static/img/screenshots/create-post.png` | Create post modal |
| `static/img/screenshots/post-detail.png` | Post detail with replies |
| `static/img/screenshots/profile.png` | User profile page |
| `static/img/screenshots/follow.png` | Follow / unfollow interaction |

## Key user flows

### 1. Sign up and log in

```
User visits app
  → fills registration form (username, email, password)
  → server creates account, returns access + refresh tokens
  → tokens stored in LocalStorage
  → user is redirected to the feed
```

### 2. Create a post

```
Authenticated user
  → clicks "New Post"
  → writes content
  → submits → POST /posts
  → post appears at top of their profile and followers' feeds
```

### 3. Follow another user

```
User visits a profile
  → clicks "Follow"
  → POST /follows/:userId
  → that user's posts now appear in the follower's feed
```

### 4. View the following feed

```
Authenticated user
  → visits home/feed
  → GET /feed/following (cursor-paginated)
  → sorted by recency, limited to followed accounts
```

### 5. Like and reply

```
User views a post
  → clicks heart icon → POST /posts/:id/like
  → or clicks "Reply" → POST /posts/:id/replies
  → counts update in real time (optimistic update on client)
```

## Project scope

| In scope | Out of scope (current stage) |
|---|---|
| Core social interactions | Real-time notifications (planned) |
| Following feed | Global/explore feed |
| JWT auth (access + refresh) | OAuth / social login |
| Post / reply / like | Video uploads |
| User profiles | Full-text search |
| Vercel deployment | Multi-region infrastructure |
