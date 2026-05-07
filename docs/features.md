---
id: features
title: Features
sidebar_position: 5
---

The feature surface is broad enough to show full-stack product thinking, but it is not presented as a production-complete social network. The table below focuses on verified capabilities and the visible boundary of the current version.

| Domain | Implemented scope | Current boundary |
|---|---|---|
| Auth | Register, login, logout, email verification, forgot password, reset password, change password, and Google OAuth callback support | Browser-first token storage and auth UX; public docs do not expose provider callbacks or secrets |
| Feed and Posts | Create posts, fetch feed pages, view post detail, threaded replies, likes, reposts, bookmarks, and post-activity users | Feed pagination is page-based, not cursor-based; the client falls back from `following` to `for_you` when a new account has no followed users yet |
| Profiles and Social Graph | View public profiles, edit own profile, follow and unfollow users, inspect followers/following, and browse a user's posts or replies | The current product scope focuses on direct social graph actions rather than advanced discovery or recommendation logic |
| Search | User discovery UI is implemented in the web app; backend endpoints also support post text search and hashtag search/create | The current frontend router emphasizes user search more than post-search exploration |
| Saved Posts | Dedicated saved-posts route backed by bookmark APIs | Saved content is private to the authenticated user and does not yet include richer collection or folder organization |
| Notifications | Backend creates notifications for follow, like, repost, and comment events and exposes paginated retrieval APIs | No dedicated notifications screen is visible in the current frontend router |
| Messaging | Inbox list, create or reuse conversation, paginated message history, optimistic sending, unread counts, mark-as-read, and realtime sync | Direct messages only; no group chat, typing indicator, attachments, edit, or delete flows |
| Media | Authenticated image and video upload endpoints with optional object-storage integration | Media is infrastructure-ready, but the current version does not present a fully polished rich-media product layer |

## Product Maturity Notes

- The backend already contains several domains that go beyond the visible minimum viable UI, especially notifications, hashtags, and post search.
- The frontend is strongest around core social loops: feed, profile, saved posts, and direct messages.
- Messaging should be understood as realtime 1-1 chat only in this version.
