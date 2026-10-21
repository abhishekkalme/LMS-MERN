# Learnify

A full-stack learning management system for RGPV engineering students. It provides unit-wise notes, curated important questions, previous year papers and syllabus PDFs, organised by branch, year and semester, with an integrated study assistant.

Live demo: [https://mylearnify.vercel.app](https://mylearnify.vercel.app)

---

## Contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Testing](#testing)
- [Deployment notes](#deployment-notes)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Learnify is built around a single shared curriculum. The subject codes, their names and their unit breakdowns live in `shared/curriculum.json` at the repository root and are read by both the API and the web client, so the two can never disagree about what a subject is called or which year and semester it belongs to.

The API is an Express application backed by MongoDB. Files are stored on Cloudinary. Authentication uses a signed JWT with an email one-time code, an optional Google sign in and a password reset flow. The client is a React single page application that renders the notes, the previous year papers, the important questions, the syllabus, a timetable and two study tools.

---

## Features

**Accounts and access**

- Registration with an emailed one-time code, and a rate limited, attempt capped verification flow
- Sign in with a password, with Google, or with a single use reset link
- Student, teacher and administrator roles, enforced on the server rather than only in the interface
- Profile editing, including an academic record, social links and custom sections

**Content**

- Notes organised by branch, year, semester, subject and unit, with a PDF preview and a real download counter
- Curated important questions and previous year papers, filtered by branch, year and semester
- Syllabus documents with one link per semester
- A global search across notes, papers and questions that only ever returns real records
- A discussion board on every subject page

**Platform**

- A study assistant backed by Google Gemini, with the conversation history kept per user
- A pomodoro timer and a GPA calculator
- A light and a dark theme that is applied before the first paint
- An administration area for uploading content and managing user roles
- A timetable view

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, Vite 6, React Router 7, Tailwind CSS 3, Framer Motion, Axios, Recharts |
| Backend | Node.js, Express 4, Mongoose 8, Zod 4, Helmet, express-rate-limit |
| Database | MongoDB |
| Authentication | JSON Web Tokens, bcrypt, Google OAuth 2 |
| File storage | Cloudinary |
| Email | Nodemailer over SMTP |
| AI | Google Gemini |
| Tests | The Node test runner |

---

## Project structure

```text
.
├── shared/            the curriculum, shared by the API and the client
│   ├── curriculum.json
│   └── build-curriculum.js
├── Backend/
│   ├── config/        environment, database and Cloudinary setup
│   ├── middleware/    authentication and request validation
│   ├── models/        the Mongoose schemas
│   ├── routes/        the HTTP routes
│   ├── schemas/       the Zod request schemas
│   ├── utils/         the shared helpers
│   └── test/          the test suite
└── Frontend/
    └── src/
        ├── api/        the shared HTTP client
        ├── components/ the pages and the shared components
        ├── context/    the auth and theme providers
        ├── data/       the curriculum and the academic reference data
        ├── hooks/      the shared hooks
        └── utils/      small helpers
```

---

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm 9 or newer
- A MongoDB instance, either local or a hosted cluster
- A Cloudinary account for the file uploads
- An SMTP account for the verification and reset emails

### Installation

```sh
git clone https://github.com/abhishekkalme/LMS-MERN
cd LMS-MERN

cd Backend && npm install
cd ../Frontend && npm install
```

Copy the environment templates and fill them in:

```sh
cp Backend/.env.example Backend/.env
cp Frontend/.env.example Frontend/.env
```

`Backend/.env` requires `JWT_SECRET` and `MONGO_URI`; the server refuses to start without them. The Cloudinary keys, the SMTP details and `CLIENT_URL` are needed for the uploads and the emails. `GOOGLE_CLIENT_ID` and `GEMINI_API_KEY` are optional and only enable Google sign in and the study assistant.

`Frontend/.env` needs `VITE_API_BASE_URL`, the origin of the API. `VITE_APP_GOOGLE_CLIENT_ID` is only needed for the Google sign in button, and must match the backend's `GOOGLE_CLIENT_ID`.

### Running

```sh
# terminal one
cd Backend && npm run dev

# terminal two
cd Frontend && npm run dev
```

Open <http://localhost:5173>. The development server proxies `/api` to the backend, so no CORS configuration is needed locally.

To run the API in production mode it also serves the built client:

```sh
cd Frontend && npm run build
cd ../Backend && npm start
```

---

## Testing

The API test suite uses the Node test runner, so it needs no extra dependency. It requires a reachable `MONGO_URI` and runs against a separate `learnify_test` database, which it empties when it finishes.

```sh
cd Backend && npm test
```

The client has no unit tests. It is checked with the linter and a production build:

```sh
cd Frontend && npm run lint
cd Frontend && npm run build
```

---

## Deployment notes

- Set `NODE_ENV=production` so that stack traces are not returned to the client.
- `TRUST_PROXY` is the number of reverse proxy hops to trust. It defaults to `1`, which is correct for a single proxy such as Render or Railway. Never set it to `true`: a client could then spoof its own address and defeat the rate limiting.
- `RATE_LIMIT_MAX` sets the request allowance per address, and defaults to `600` per fifteen minutes. A campus network shares one address between many students, so the allowance has to cover a whole cohort.
- The repository root has to be deployed, not just the `Backend` folder, because the API reads the shared curriculum from `../shared`.
- The `Frontend` build is served by the API in production. The two are therefore released together.

---

## Contributing

1. Fork the repository and create a branch.
2. Make the change, and keep the linter and the test suite green.
3. Open a pull request describing what changed and why.

---

## License

Released under the ISC License. See [LICENSE](LICENSE).
