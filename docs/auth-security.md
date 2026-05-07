---
id: auth-security
title: Auth & Security
sidebar_position: 8
---

Threads Replica uses a browser-oriented JWT model with server-side refresh token records, email-based account flows, and access checks at both the REST and socket layers.

## Implemented Auth Flows

| Flow | Verified behavior |
|---|---|
| Register | Creates a user, hashes the password, issues access and refresh tokens, and generates a verify-email token |
| Login | Verifies credentials and stores a refresh-token record in MongoDB |
| Refresh | Accepts a refresh token, replaces the old record, and issues a new access token |
| Logout | Deletes the stored refresh-token record |
| Verify email | Accepts a verify-email token and updates the account verification state |
| Forgot/reset password | Generates a forgot-password token, verifies it, and lets the user set a new password |
| Change password | Protected flow for authenticated users |
| Google OAuth | Supported through a backend callback flow that can log in or create an account |

## Token Roles

| Token or secret-backed artifact | Purpose |
|---|---|
| Access token | Sent on protected REST requests and used for socket handshake auth |
| Refresh token | Rotated through the API and stored server-side for revocation/logout |
| Verify-email token | Confirms account ownership during onboarding |
| Forgot-password token | Gates the password reset flow |

## Password Handling

- New passwords are hashed with bcrypt before storage.
- The hash includes an application-side secret, so the stored value is not just the raw password hash.
- The login path still recognizes a legacy SHA-256 format and transparently rehashes that password with bcrypt after a successful login.

## Validation And Rate Limiting

- Joi schemas validate request bodies, params, query strings, and headers before controller logic runs.
- Protected endpoints validate the `Bearer` header format and then verify the JWT.
- Credential-sensitive auth routes share a strict rate limit of 10 attempts per 15 minutes per IP.
- The backend also fails fast at startup when required auth-related environment variables are missing.

## Client-Side Token Handling

- The SPA stores access and refresh tokens in `localStorage`.
- A shared Axios client attaches the access token automatically and attempts a refresh when it receives an expired-token response.
- This keeps the browser flow simple, but it is still a trade-off: `localStorage` is easier to wire into an SPA than cookies, but it is more exposed to XSS if the client is ever compromised.

## Chat Access Control

- Socket.IO requires `Authorization: Bearer <access_token>` during the handshake.
- Unauthorized sockets are rejected or disconnected.
- Conversation reads, writes, and room joins all verify that the caller is a participant in that conversation.
- This means a valid token alone is not enough to read or send messages in an unrelated thread.

## Origin And Integration Boundaries

- Express CORS is scoped to the configured client origin when available, with a development-friendly fallback.
- Public docs intentionally omit secret names, token contents, callback URLs, and provider credentials.
- A reasonable next hardening step would be moving refresh-token handling to an `HttpOnly Secure` cookie while keeping access tokens short-lived.
