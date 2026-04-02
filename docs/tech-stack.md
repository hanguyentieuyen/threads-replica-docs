---
id: tech-stack
title: Tech Stack
sidebar_position: 3
---

# Tech Stack

## Frontend — React.js

The client is a single-page application built with **React.js**.

| Concern | Approach |
|---|---|
| UI rendering | Functional components with React hooks |
| Routing | Client-side routing (React Router) |
| API communication | Dedicated API client layer (fetch/axios wrapper) |
| State management | Component-local state + React Context for auth/user |
| Optimistic updates | Applied to likes and follow actions for snappy UX |
| Error handling | Centralized error boundary and per-request error states |

### Why React?
React's component model allows clean separation of UI concerns. Its large ecosystem, strong TypeScript support, and Vercel's first-class deployment make it a natural fit for this project.

---

## Backend — Node.js + Express

The server is a RESTful API built with **Node.js** and **Express**.

| Concern | Approach |
|---|---|
| API style | REST — resource-oriented routes |
| Middleware | Auth verification, input validation, error handler |
| Authentication | JWT (access + refresh tokens) |
| Response format | Consistent JSON envelope (`{ data, error, status }`) |
| Error handling | Centralized Express error middleware |

### Why Express?
Express is lightweight and unopinionated, which kept the server simple and easy to reason about. Middleware composition made it straightforward to add auth, validation, and logging cross-cutting concerns.

---

## Database — MongoDB

**MongoDB** stores all application data using a document-oriented model.

| Concern | Approach |
|---|---|
| Users | Single collection, indexed by email/username |
| Posts & replies | Separate collections or nested docs |
| Follows | Junction-style documents (followerId, followingId) |
| Likes | Junction-style documents (userId, postId) |
| Indexing | Compound indexes on author + createdAt, follower pairs |

### Why MongoDB?
The flexible document model suits social content (variable post structure, embedded counts). It also allowed rapid iteration on the data schema during development.

---

## Deployment — Vercel

Both the frontend (React SPA) and the Node.js API are deployed on **Vercel**.

| Concern | Approach |
|---|---|
| Frontend hosting | Vercel static/SPA hosting |
| API hosting | Vercel Serverless Functions |
| Environment separation | Dev vs. Production via Vercel project settings |
| Secrets management | Environment variables configured in Vercel dashboard (not in code) |

### Why Vercel?
Vercel provides zero-config deployment for React and Node.js projects, integrated preview deployments for every PR, and a generous free tier suitable for portfolio projects.

---

## Summary table

| Layer | Technology | Version range |
|---|---|---|
| Frontend | React.js | 18.x |
| Routing | React Router | 6.x |
| Backend | Node.js | 20.x |
| Framework | Express | 4.x |
| Database | MongoDB | 7.x |
| ODM | Mongoose (or native driver) | 8.x |
| Auth | JSON Web Tokens (JWT) | — |
| Deployment | Vercel | — |
