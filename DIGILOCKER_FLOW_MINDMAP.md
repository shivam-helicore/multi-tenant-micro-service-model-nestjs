## DigiLocker OAuth Backend – Mind Map (High-Level)

> Simple overview so you understand **har ek step**, **har ek variable**, aur **kya input kahan jaata hai**.
   
---

### 1. High-Level Flow (User Journey)

- **Step 1 – Client calls backend**
  - **Endpoint**: `GET /auth/digilocker/init`
  - **Goal**: DigiLocker ka **authorization URL** banana.

- **Step 2 – User is redirected to DigiLocker**
  - Browser -> `authorizationUrl` (DigiLocker UI).
  - User login + consent deta hai.

- **Step 3 – DigiLocker redirects back**
  - DigiLocker -> `REDIRECT_URI` (humare backend ka callback).
  - **Endpoint**: `GET /auth/digilocker/callback?code=...&state=...`
  - Backend:
    - `state` validate karta hai (CSRF protection).
    - `code_verifier` + `code` use karke **access_token** leta hai.

- **Step 4 – Fetch documents**
  - **Endpoint**: `GET /digilocker/documents`
  - Backend:
    - Session se `access_token` nikalta hai.
    - DigiLocker ke **issued documents API** ko call karta hai.

- **Step 5 – (Optional) Refresh token**
  - Future endpoint (e.g. `POST /auth/digilocker/refresh`):
    - Session se `refresh_token` nikalta hai.
    - DigiLocker ke token endpoint ko `grant_type=refresh_token` ke saath call karta hai.

---

### 2. ENV Variables Mind Map (`.env`)

- **`CLIENT_ID`**
  - Kahan use hota hai:
    - `/auth/digilocker/init` -> authorize URL ke query params me.
    - `exchangeCodeForToken` -> token API body me.
  - Kya hona chahiye:
    - DigiLocker / API Setu ne jo **client id** diya hai.

- **`CLIENT_SECRET`**
  - Kahan use hota hai:
    - `exchangeCodeForToken` -> token API body me.
  - Kya hona chahiye:
    - DigiLocker ka **secret** (DO NOT share publicly).

- **`REDIRECT_URI`**
  - Kahan use hota hai:
    - `/auth/digilocker/init` -> authorize URL ke query param me.
    - `exchangeCodeForToken` -> token API body me.
  - Important:
    - DigiLocker dashboard me jo redirect URL registered hai, **exact match** hona chahiye.
    - Example: `http://localhost:3000/auth/digilocker/callback`

- **`BASE_URL`**
  - Kahan use hota hai:
    - Token aur documents ke base host ke liye (`tokenUrl`, `documentsUrl`).
  - Example:
    - `https://api.digitallocker.gov.in` ya aapke docs me jo diya ho.

- **`OAUTH_AUTHORIZE_BASE_URL`**
  - Kahan use hota hai:
    - Sirf **authorization UI** ke liye (user login page).
    - `authorizeUrl = OAUTH_AUTHORIZE_BASE_URL + OAUTH_AUTHORIZE_PATH`
  - Example (pattern):
    - `https://accounts.digitallocker.gov.in/signin/oauth_partner`

- **`OAUTH_AUTHORIZE_PATH`**
  - Default: `/oauth2/1/authorize`
  - Final authorize URL:
    - `OAUTH_AUTHORIZE_BASE_URL + OAUTH_AUTHORIZE_PATH`

- **`OAUTH_TOKEN_PATH`**
  - Default: `/oauth2/1/token`
  - Final token URL:
    - `BASE_URL + OAUTH_TOKEN_PATH`

- **`ISSUED_DOCUMENTS_PATH`**
  - Default: `/public/oauth2/1/files/issued`
  - Final documents URL:
    - `BASE_URL + ISSUED_DOCUMENTS_PATH`

- **`DIGILOCKER_SCOPE`**
  - Example: `openid`
  - Kahan use hota hai:
    - `/auth/digilocker/init` authorize URL me `scope` query param.

- **`PORT`**
  - Example: `3000`
  - Kahan use hota hai:
    - `src/index.js` me `app.listen(env.port, ...)`.

- **`SESSION_SECRET`**
  - Express-session ke liye secret.
  - Kya store hota hai session me:
    - `digilockerOAuthState`
    - `digilockerCodeVerifier`
    - `digilockerToken` (access_token + refresh_token etc.)

---

### 3. PKCE Mind Map (`src/utils/pkce.js`)

- **Function**: `generatePkcePair()`
  - Output:
    - `codeVerifier` (long random string)
    - `codeChallenge` = `BASE64URL(SHA256(codeVerifier))`
    - `codeChallengeMethod` = `"S256"`

- **Where is it used?**
  - `/auth/digilocker/init` route me:
    - `codeVerifier` -> **session** me store hota hai (`req.session.digilockerCodeVerifier`).
    - `codeChallenge` + `code_challenge_method` -> authorize URL ke query parameters me jaate hain.

- **Why PKCE? (simple)**
  - DigiLocker ko ensure karna hota hai ki:
    - Jo app authorization start kar raha hai, **wahi** app later token le raha hai.
  - Isliye:
    - Front end / backend `code_challenge` send karta hai.
    - Baad me `code_verifier` se verify hota hai.

---

### 4. Session Variables Mind Map

- **`req.session.digilockerOAuthState`**
  - Generate: `/auth/digilocker/init` me `state = base64UrlRandom(24)`.
  - Purpose:
    - Callback me `state` query param se compare karke **CSRF protection**.

- **`req.session.digilockerCodeVerifier`**
  - Generate: `generatePkcePair()` se.
  - Purpose:
    - `/auth/digilocker/callback` ke time:
      - `code_verifier` param ke roop me token API ko bheja jaata hai.

- **`req.session.digilockerToken`**
  - Fill hota hai:
    - Token API se success response ke baad (`exchangeCodeForToken`).
  - Typical fields (DigiLocker spec ke hisaab se):
    - `access_token`
    - `token_type`
    - `expires_in`
    - `scope`
    - `refresh_token` (agar diya ho)
  - Use:
    - `/digilocker/documents` me `access_token` nikalne ke liye.
    - Future `/auth/digilocker/refresh` me `refresh_token` nikalne ke liye.

---

### 5. Endpoint-wise Mind Map

#### `GET /auth/digilocker/init`

- **Inputs**
  - No request body.
  - Uses ENV + Session:
    - `CLIENT_ID`
    - `REDIRECT_URI`
    - `DIGILOCKER_SCOPE`
    - `OAUTH_AUTHORIZE_BASE_URL`
    - `OAUTH_AUTHORIZE_PATH`

- **Processing**
  - `generatePkcePair()` → `codeVerifier`, `codeChallenge`, `codeChallengeMethod`.
  - `state` generate hota hai.
  - `state` + `codeVerifier` session me save hote hain.
  - Query params se authorize URL build hota hai.

- **Output (JSON)**
  - `authorizationUrl`
  - `state`
  - `code_challenge`
  - `code_challenge_method`

---

#### `GET /auth/digilocker/callback`

- **Inputs (from DigiLocker redirect)**
  - Query params:
    - `code`
    - `state`
    - (optional) `error`, `error_description`

- **Session se Inputs**
  - `digilockerOAuthState`
  - `digilockerCodeVerifier`

- **Processing**
  - Error query aaya to error JSON return.
  - `state` compare karta hai:
    - Agar mismatch → `invalid_state` error.
  - `exchangeCodeForToken({ code, codeVerifier })` call:
    - Token endpoint ko axios POST.
    - Body me:
      - `grant_type=authorization_code`
      - `code`, `redirect_uri`, `client_id`, `client_secret`, `code_verifier`.
  - Success pe:
    - `req.session.digilockerToken = <token-body>`.
    - State + verifier session se hata deta hai.

- **Output (JSON)**
  - `ok: true`
  - `tokenType`, `expiresIn`, `scope`, `hasAccessToken`
  - (Token poora session me stored hai; response me nahi bhej rahe by default.)

---

#### `GET /digilocker/documents`

- **Inputs**
  - Session:
    - `req.session.digilockerToken.access_token`

- **Processing**
  - Agar access token nahi:
    - 401 JSON: `not_authenticated`.
  - Agar token hai:
    - `fetchIssuedDocuments(access_token)` call:
      - axios GET to `documentsUrl` (`BASE_URL + ISSUED_DOCUMENTS_PATH`).
      - Header: `Authorization: Bearer <access_token>`.

- **Output**
  - Success: DigiLocker se jo JSON aaya woh forward.
  - Error: `documents_fetch_failed` JSON + details.

---

### 6. Refresh Token (Planned)

- **Future Endpoint**: `POST /auth/digilocker/refresh`

- **Inputs**
  - Session:
    - `req.session.digilockerToken.refresh_token`

- **Processing (expected pattern)**
  - Token endpoint ko POST:
    - `grant_type=refresh_token`
    - `refresh_token`
    - `client_id`, `client_secret`
  - Naya token session me overwrite:
    - `req.session.digilockerToken = newToken`.

- **Output**
  - JSON: New expiry info + status.

> Jab hum refresh endpoint code me add karenge, yahi structure follow karega. 

---

### 7. How to Use This File

- Agar aap confused ho:
  - **Kaunsa ENV kahan use ho raha hai?** → Section 2.
  - **PKCE kya kar raha hai?** → Section 3.
  - **Session me kya store ho raha hai?** → Section 4.
  - **Har endpoint kya leta / deta hai?** → Section 5.

Isko padhkar aap sequence imagine kar sakte ho:

`ENV -> /auth/digilocker/init -> DigiLocker UI -> /auth/digilocker/callback -> Session me tokens -> /digilocker/documents -> (future) /auth/digilocker/refresh`

