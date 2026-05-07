---
id: intro
title: Introduction
sidebar_position: 1
slug: /
---

Threads Replica is a private full-stack portfolio project that recreates the core product loops of a modern social app: authentication, short-form posting, follows, search, saved posts, notifications, and direct messages.

This public documentation exists because the implementation repository stays private. The goal is to make the technical work reviewable without publishing source code, secrets, provider credentials, or internal deployment details.

## What This Documentation Helps Reviewers Evaluate

- Product scope and implementation boundaries
- Frontend and backend architecture
- Data modeling choices in MongoDB
- API organization, auth flow, and realtime messaging
- Testing strategy, trade-offs, and next steps

## Current Project Scope

- `threads-web`: a React 18 + TypeScript SPA built with Vite
- `threads-api`: a Node.js + Express + TypeScript API backed by MongoDB
- Core domains: auth, profiles, follows, feeds, posts, comments, reposts, bookmarks, search, notifications, media uploads, and 1-1 messaging
- Realtime behavior: Socket.IO is used for direct-message updates and read-state synchronization

## Deliberate Public Boundaries

- This repo documents the system but does not mirror the private source code.
- It omits raw environment values, secrets, tokens, callback URLs, and internal operational links.
- It stays close to the current codebase rather than older notes or screenshots when those disagree.
- Messaging is documented as direct 1-1 chat only. Group chat is out of scope for the current version.

## How To Read The Docs

| Section | Focus |
|---|---|
| [Overview](./overview) | Product scope, main flows, and UI references |
| [Tech Stack](./tech-stack) | Verified libraries and why they exist |
| [Architecture](./architecture) | Request flow, service layering, and realtime design |
| [Features](./features) | Implemented capabilities grouped by domain |
| [Data Model](./data-model) | Core entities, relationships, and important enums |
| [API Contract](./api-contract) | Route-group organization and response conventions |
| [Auth & Security](./auth-security) | Token lifecycle, validation, and access control |
| [Deployment](./deployment) | Runtime split, setup shape, and environment categories |
| [Testing & Quality](./testing-quality) | Automated coverage, tooling, and current gaps |
| [Trade-offs & Future Work](./tradeoffs-future) | Engineering judgment and next improvements |
