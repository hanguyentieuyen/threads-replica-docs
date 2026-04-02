---
id: intro
title: Introduction
sidebar_position: 1
slug: /
---

# Introduction

Welcome to the **Threads Replica** documentation — a sanitized, portfolio-grade write-up of a private full-stack social network project.

## What is Threads Replica?

Threads Replica is a Threads-inspired social network clone built to practice and demonstrate full-stack engineering skills. It replicates the core social interactions found in modern social platforms: posting, replying, liking, following, and a personalized following feed.

> **Note:** The source code is intentionally kept private. This documentation provides a complete system overview — covering architecture, data model, API design, security, and engineering decisions — without exposing any proprietary code, secrets, or production configuration.

## Goals

- Implement core social features with a clean separation between frontend and backend.
- Design a maintainable REST API using Express and Node.js.
- Model social relationships and content in MongoDB.
- Apply JWT-based authentication with access and refresh tokens.
- Provide a production-like deployment on Vercel.

## Non-goals (current stage)

- Complex ranking or recommendation algorithms.
- Real-time notifications (planned — see [Trade-offs & Future Work](./tradeoffs-future)).
- Full-text search (planned).
- Multi-region or high-availability infrastructure.

## How to navigate this documentation

| Section | What you will find |
|---|---|
| [Overview](./overview) | Project summary, key user flows, and screenshot references |
| [Tech Stack](./tech-stack) | Technology choices and rationale |
| [Architecture](./architecture) | High-level diagrams and component breakdown |
| [Features](./features) | Detailed feature descriptions |
| [Data Model](./data-model) | Conceptual entity-relationship diagram |
| [API Contract](./api-contract) | Sanitized REST endpoint reference |
| [Auth & Security](./auth-security) | JWT flow, token storage trade-offs, and mitigations |
| [Deployment](./deployment) | Vercel deployment overview |
| [Testing & Quality](./testing-quality) | Test strategy and code quality practices |
| [Trade-offs & Future Work](./tradeoffs-future) | Design decisions and roadmap |
