---
id: overview
title: Overview
sidebar_position: 2
---

import LoginScreen from '@site/static/img/screenshots/login-screen.png'
import HomeFeedScreen from '@site/static/img/screenshots/home-feed.png'

Threads Replica is a two-application system: a browser-based React client and a separate Express API. Together they cover the main social loops of account creation, posting, follows, search, saving content, and direct messaging.

## Product Summary

- The web app routes authenticated users into a home feed, post detail pages, profile pages, search, saved posts, and messages.
- The API surface is broader than the current router and also includes hashtags, media uploads, post-search endpoints, and feed-type capabilities that are not all surfaced in the UI.
- The system is intentionally portfolio-sized: broad enough to show architecture and product thinking, but still honest about current constraints.

## UI Snapshot

These screenshots are public-safe references from the private project.

<div className="row">
  <div className="col col--6">
    <img src={LoginScreen} alt="Login screen" />
    <p><em>Login flow</em></p>
  </div>
  <div className="col col--6">
    <img src={HomeFeedScreen} alt="Home feed" />
    <p><em>Home feed</em></p>
  </div>
</div>

## Main User Journeys

1. Auth and onboarding: users can register, log in, verify email, recover passwords, and complete a Google OAuth callback flow.
2. Feed and posting: authenticated users land on a paginated home feed, can create text, quote, and audience-aware posts, then interact through likes, reposts, bookmarks, and comments.
3. Profiles and social graph: users can view profiles, follow or unfollow accounts, edit their own profile, and browse posts or replies.
4. Search, saved content, and notifications: the UI supports user discovery, saved posts, and a filterable notification inbox; the backend also exposes post-search and hashtag endpoints.
5. Direct messages and insights: users can start or reuse a 1-1 conversation, read paginated history, send messages, receive realtime inbox updates, and view creator analytics.

## Scope Notes

- The current frontend router exposes login, register, password recovery, email verification, feed, search, saved posts, profiles, post detail, and messages.
- Notifications have a dedicated inbox with unread state and filtering. Post search remains a backend/client capability without a corresponding web search experience.
- Image and video uploads are available from the composer, but media rendering in feed and detail cards is not yet complete.
- Messaging is implemented as direct 1-1 chat only. There is no group chat surface in the current version.
