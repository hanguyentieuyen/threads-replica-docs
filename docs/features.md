---
id: features
title: Features
sidebar_position: 5
---

The feature surface is broad enough to show full-stack product thinking, but it is not presented as a production-complete social network. The table below focuses on verified capabilities and the visible boundary of the current version.

| Domain | Implemented scope | Current boundary |
|---|---|---|
| Auth | Register, login, logout, email verification, forgot password, reset password, change password, and Google OAuth callback support | Browser-first token storage and auth UX; public docs do not expose provider callbacks or secrets |
| Feed and Posts | Create text posts with hashtags, mentions, quote posts, and audience metadata; fetch the home feed, view post detail, like, repost, bookmark, and inspect post activity | The API supports `following` and `for_you` feed types, but the UI currently exposes one home-feed surface rather than a feed switcher. Pagination is page-based, not cursor-based. |
| Comments | Read and create top-level comments, and like comments | The model/API support `parent_id`, edit, and delete operations, but the current UI does not yet offer a complete reply-thread or edit/delete experience. |
| Profiles and Social Graph | View public profiles, edit own profile, follow and unfollow users, inspect followers/following, and browse a user's posts or replies | Profile avatar editing currently accepts a URL rather than providing a dedicated upload flow. Profile-completion CTAs are placeholders. |
| Search | User discovery UI is implemented in the web app; backend endpoints also support post text search and hashtag search/create | The current frontend router emphasizes user search more than post-search exploration |
| Saved Posts | Dedicated saved-posts route backed by bookmark APIs | Saved content is private to the authenticated user and does not yet include richer collection or folder organization |
| Notifications | Inbox screen with received/activity scopes, type and read-state filters, date grouping, unread badge, pagination, and mark-read actions | Some interface copy remains hard-coded rather than fully localized. |
| Messaging | Inbox list, create or reuse conversation, paginated message history, optimistic sending, unread counts, mark-as-read, and realtime sync | Direct messages only; no group chat, typing indicator, attachments, edit, or delete flows |
| Creator analytics | Profile and insight screens with overview metrics, date ranges, top posts/hashtags, and owner-only post activity | Dedicated backend automated coverage for analytics is still missing. |
| Internationalization | English/Vietnamese selection and persisted language preference | The product is only partly localized; several UI strings remain hard-coded. |
| Media | Authenticated image and video upload endpoints, plus composer preview | Posted media is not yet rendered in feed/detail cards; the composer currently treats all preview media as images. |

## Product Maturity Notes

- The backend/client capability still exceeds the UI in a few places: post search, a `for_you` feed control, complete comment replies, and circle/audience management are not full user-facing flows.
- The frontend is strongest around core social loops: feed, profile, notifications, saved posts, direct messages, and creator analytics.
- Messaging should be understood as realtime 1-1 chat only in this version.
