# Auth

## Table of Contents <!-- omit in toc -->

- [General info](#general-info)
- [Configure Auth](#configure-auth)
- [Auth via Google](#auth-via-google)
- [Logout](#logout)

---

## General info

By default boilerplate used sign in and sign up via email and password.

```mermaid
sequenceDiagram
    participant A as Fronted App (Web, Mobile, Desktop)
    participant B as Backend App

    A->>B: 1. Sign up via email and password
    A->>B: 2. Sign in via email and password
    B->>A: 3. Get a JWT token
    A->>B: 4. Make any requests using a JWT token
```

<https://user-images.githubusercontent.com/6001723/224566194-1c1f4e98-5691-4703-b30e-92f99ec5d929.mp4>

Also you can sign up via another external services or social networks like Google.

```mermaid
sequenceDiagram
    participant B as External Auth Services (Google, etc)
    participant A as Fronted App (Web, Mobile, Desktop)
    participant C as Backend App

    A->>B: 1. Sign in through an external service
    B->>A: 2. Get Access Token
    A->>C: 3. Send Access Token to auth endpoint
    C->>A: 4. Get a JWT token
    A->>C: 5. Make any requests using a JWT token
```

For auth with external services or social networks you need:

1. Sign in through an external service and get access token(s).
1. Call one of endpoints with access token received in frontend app on 1-st step and get JWT token from the backend app.

   ```text
   POST /api/v1/auth/google/login
   ```

1. Make any requests using a JWT token

---

## Configure Auth

1. Generate secret keys for `access token` and `refresh token`:

   ```bash
   node -e "console.log('\nAUTH_JWT_SECRET=' + require('crypto').randomBytes(256).toString('base64') + '\nAUTH_REFRESH_SECRET=' + require('crypto').randomBytes(256).toString('base64'));"
   ```

1. Go to `/.env` and replace `AUTH_JWT_SECRET` and `AUTH_REFRESH_SECRET` with output from step 1.

   ```text
   AUTH_JWT_SECRET=HERE_SECRET_KEY_FROM_STEP_1
   AUTH_REFRESH_SECRET=HERE_SECRET_KEY_FROM_STEP_1
   ```

## Auth via Google

1. Set up your service on Google
1. Change `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`

   ```text
   GOOGLE_CLIENT_ID=abc
   GOOGLE_CLIENT_SECRET=abc
   ```

## Logout

1. Call following endpoint:

   ```text
   POST /api/v1/auth/logout
   ```

1. Remove `access token` and `refresh token` from your client app (cookies, localStorage, etc).

---

Previous: [Working with database](database.md)

Next: [Serialization](serialization.md)
