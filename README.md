# Subscription Radar

![Node.js](https://img.shields.io/badge/Node.js-22%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-REST%20API-000000?logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-node%3Asqlite-003B57?logo=sqlite&logoColor=white)
![Tests](https://img.shields.io/badge/tests-Jest-C21325?logo=jest&logoColor=white)
![Frontend](https://img.shields.io/badge/frontend-Vanilla%20JS-F7DF1E?logo=javascript&logoColor=black)

Subscription Radar is a full-stack personal finance app for tracking recurring subscriptions, renewal dates, usage value, and avoidable monthly spend.

The app combines a lightweight vanilla JavaScript interface with a Node.js/Express API, JWT authentication, SQLite persistence, Swagger API documentation, and focused unit tests around the subscription analytics logic.

## Highlights

- Track monthly, annual, and weekly subscriptions in one dashboard
- See monthly and annual spend totals, next renewal, and upcoming renewals
- Review real usage with frequency, value rating, and notes
- Detect low-value subscriptions and estimate potential savings
- Browse a renewal calendar with recurring monthly, weekly, and annual events
- Organize spend by editable categories with visual summaries
- Use protected REST endpoints with JWT-based authentication
- Explore the API through Swagger UI at `/api-docs`

## Demo Flow

1. Register a local account.
2. Add subscriptions such as Netflix, Spotify, iCloud, GitHub, or a gym membership.
3. Review how often each service is used.
4. Check the dashboard for spend totals, renewal alerts, and savings opportunities.
5. Use the calendar to plan upcoming payments.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | HTML, CSS, vanilla JavaScript SPA |
| Backend | Node.js, Express |
| Database | SQLite through Node's built-in `node:sqlite` module |
| Auth | JWT tokens, `crypto.scryptSync` password hashing |
| API Docs | Swagger UI, OpenAPI annotations |
| Tests | Jest |
| CI | GitHub Actions lint workflow |

## Requirements

- Node.js 22 or newer
- npm

`node:sqlite` is a built-in Node.js module, so the project expects a recent Node runtime.

## Quick Start

```bash
git clone https://github.com/AdaSevvalSari/Subscription-Radar.git
cd subscription-radar/backend
npm install
npm start
```

Then open:

| URL | Description |
| --- | --- |
| `http://localhost:3000` | Web app |
| `http://localhost:3000/api-docs` | Swagger API docs |

For development with auto-restart:

```bash
cd backend
npm run dev
```

## Environment Variables

The app works locally without a `.env` file, but production deployments should set a strong JWT secret.

```bash
cd backend
cp .env.example .env
```

```env
JWT_SECRET=replace-this-with-a-long-random-secret
PORT=3000
```

Do not commit your real `.env` file. The repository includes `.env.example` only as a safe template.

If `NODE_ENV=production`, `JWT_SECRET` is required. In local development, the app can fall back to an in-memory development secret.

## Testing

```bash
cd backend
npm test
npm run lint
```

The test suite covers subscription calculations, category summaries, usage reviews, waste detection, and cancellation simulation logic.

## Project Structure

```text
subscription-radar/
├── .github/workflows/
│   └── lint.yml
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config.js
│   │   ├── db/
│   │   │   ├── database.js
│   │   │   └── schema.sql
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── categories.js
│   │   │   ├── subscriptions.js
│   │   │   └── usage.js
│   │   └── services/
│   │       ├── authService.js
│   │       ├── categoryService.js
│   │       ├── subscriptionService.js
│   │       └── usageService.js
│   └── tests/
│       ├── categoryService.test.js
│       ├── subscriptionService.test.js
│       └── usageService.test.js
└── frontend/
    ├── index.html
    ├── style.css
    ├── app.js
    └── logos/
```

## API Overview

All protected endpoints require:

```http
Authorization: Bearer <token>
```

### Auth

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create a user and return a JWT |
| `POST` | `/api/auth/login` | Login and return a JWT |

### Subscriptions

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/subscriptions` | List subscriptions |
| `GET` | `/api/subscriptions/summary` | Dashboard summary |
| `GET` | `/api/subscriptions/:id` | Get one subscription |
| `POST` | `/api/subscriptions` | Create a subscription |
| `PUT` | `/api/subscriptions/:id` | Update a subscription |
| `DELETE` | `/api/subscriptions/:id` | Delete a subscription |
| `PATCH` | `/api/subscriptions/:id/review` | Save a usage review |

### Categories

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/categories` | List categories with spend stats |
| `POST` | `/api/categories` | Create a category |
| `PUT` | `/api/categories/:id` | Update a category |
| `DELETE` | `/api/categories/:id` | Delete a category |

### Usage Logs

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/subscriptions/:id/usage` | Get usage logs and analytics |
| `POST` | `/api/subscriptions/:id/usage` | Log a usage session |
| `DELETE` | `/api/subscriptions/:id/usage/:logId` | Delete a usage log |

## Architecture Notes

- Route files stay thin and delegate business rules to service modules.
- Analytics helpers are written as testable functions where possible.
- Renewal dates are calculated from `start_date` and `billing_cycle`.
- Savings opportunities are based on usage frequency and low value ratings.
- Passwords are salted and hashed before storage.
- SQLite data is local-only and intentionally ignored by Git.

## GitHub Safety Notes

The repository is configured to ignore generated and private local files:

- `backend/subscription-radar.db`
- `backend/subscription-radar.db-shm`
- `backend/subscription-radar.db-wal`
- `backend/node_modules/`
- `.env` and `.env.*`
- `.DS_Store`
- coverage and npm debug logs

Only commit `.env.example`, never a real `.env` file.
