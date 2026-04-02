---
id: architecture
title: Architecture
sidebar_position: 4
---

# Architecture

## High-level overview

The system follows a classic three-tier web architecture: a React single-page application in the browser, a Node.js/Express REST API on the server, and MongoDB as the primary data store. Both tiers are deployed on Vercel.

```mermaid
flowchart LR
    U([User / Browser])

    subgraph Client["Client Tier (Vercel SPA)"]
        FE["React Web App\n(SPA)"]
    end

    subgraph Server["Server Tier (Vercel Functions)"]
        API["Express REST API\n(Node.js)"]
        AUTH["Auth Middleware\n(JWT verify)"]
    end

    subgraph Data["Data Tier"]
        DB[("MongoDB\n(Atlas)")]
    end

    U -- "HTTPS (REST)" --> FE
    FE -- "HTTPS (REST + Bearer token)" --> API
    API -- "verify" --> AUTH
    AUTH -- "pass / reject" --> API
    API -- "read / write" --> DB
```

---

## Request lifecycle (authenticated call)

The following sequence diagram illustrates how a typical authenticated request (e.g., create a post) flows through the system.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant SPA as React SPA
    participant API as Express API
    participant MW as Auth Middleware
    participant DB as MongoDB

    User->>SPA: Submits "New Post" form
    SPA->>API: POST /posts\nAuthorization: Bearer <access_token>
    API->>MW: Invoke auth middleware
    MW->>MW: Verify JWT signature & expiry
    alt Token valid
        MW-->>API: next() — attach userId to req
        API->>DB: Insert post document
        DB-->>API: Inserted document
        API-->>SPA: 201 Created { data: post }
        SPA-->>User: Post appears in feed
    else Token expired
        MW-->>SPA: 401 Unauthorized
        SPA->>API: POST /auth/refresh\n{ refreshToken }
        API->>DB: Validate refresh token
        DB-->>API: Token record found
        API-->>SPA: 200 { accessToken, refreshToken }
        SPA->>API: Retry POST /posts (new access token)
        API-->>SPA: 201 Created { data: post }
    end
```

---

## Component responsibilities

### React Web App (SPA)

- Renders all UI: feed, profiles, post detail, auth screens.
- Manages client-side routing (no full-page reloads).
- Maintains auth state (tokens in LocalStorage; see [Auth & Security](./auth-security)).
- Applies optimistic updates for likes and follows to keep the UI responsive.
- Handles token refresh transparently in the API client layer.

### Express REST API

- Implements business logic for all social features.
- Applies auth middleware to protected routes (JWT verification).
- Validates request payloads (body, params, query).
- Returns consistent JSON responses and standardized error codes.
- Delegates data access to the MongoDB layer.

### Auth Middleware (JWT verify)

- Reads the `Authorization: Bearer <token>` header on every protected request.
- Verifies the JWT signature using the configured secret.
- Checks token expiry (`exp` claim).
- Attaches the decoded `userId` to the request context for downstream handlers.

### MongoDB (Atlas)

- Primary storage for users, posts, replies, follow relationships, and likes.
- Indexes support the most common read patterns:
  - Posts by author and creation time (feed generation).
  - Follow pairs (follower, following) for feed queries and follow-status checks.
  - User lookup by email and username (login, profile).

---

## Deployment topology

```
Browser
  │
  ├── React SPA ──────────── Vercel Edge Network (CDN)
  │
  └── Express API ─────────── Vercel Serverless Functions
                                    │
                              MongoDB Atlas (cloud-hosted)
```

Both the SPA and the API are deployed to Vercel. The API runs as Vercel Serverless Functions, which auto-scales with traffic and requires no infrastructure management.
