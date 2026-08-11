# Local Meetup RSVP Tracker — Dexqbit Technical Assignment

A secure, full-stack local meetup event & RSVP tracking platform built with **Next.js 14**, **Node.js**,
**Express**, and **MySQL**, orchestrated with **Docker Compose** for single-command execution.

---

## Quick Start (Single Command Run)

Run the entire application (MySQL 8 database, Express REST API, and Next.js Web Frontend) using a single command:

```bash
docker compose up --build
```

Once the containers start up cleanly:
- 🌐 **Frontend Application**: [http://localhost:3000](http://localhost:3000)
- ⚙️ **Express REST API**: [http://localhost:5000/api](http://localhost:5000/api)
- 🗄️ **MySQL Database**: `localhost:3306`

---

## 🔑 Pre-seeded Demo User Credentials

The database initializes and seeds 3 demo users automatically on container startup with pre-hashed passwords
(`Password123!`):

| User Name | Email | Default Password | Role |
| :--- | :--- | :--- | :--- |
| **Sarah Connor** | `sarah@dexqbit.com` | `Password123!` | Event Host & User |
| **Alex Dev** | `alex@dexqbit.com` | `Password123!` | Event Host & User |
| **Elena Rostova** | `elena@dexqbit.com` | `Password123!` | Event Host & User |

*💡 Tip: The header navbar and login page include a **Quick Demo Login Switcher** to quickly switch
between demo accounts with 1 click.*

---

## 🚀 Key Features & Architectural Highlights

### 1. Relational Database Schema & Data Integrity
- **Normalized Schema**: `users`, `events`, and `rsvps` tables with proper Foreign Keys and `ON DELETE CASCADE`.
- **Duplicate Prevention**: `UNIQUE KEY (event_id, user_id)` constraint on `rsvps` table guarantees no duplicate
  or conflicting RSVPs per user.
- **Capacity Management**: Real-time RSVP capacity validation ensuring RSVPs do not exceed `max_capacity`.

### 2. Security & Server-Side Ownership Enforcement
- **Authentication**: JWT Bearer token authentication signed with secret keys. Passwords stored using
  `bcrypt` (10 rounds).
- **Strict Authorization**: Server-side checks in `EventService` enforce that **only the creator of an event**
  can update (`PUT /api/events/:id`) or delete (`DELETE /api/events/:id`) it.
  Unauthorized requests receive a server-side `403 Forbidden` response.
- **Input Validation**: Request body validation powered by **Zod schemas** at controller boundaries.

### 3. Service-Layer Architecture & Code Quality
- Follows clean layer separation:
  **Routes → Middleware / Validators → Controllers → Services (`BaseService`) → MySQL Pool**.
- Adheres strictly to [CODING_STANDARDS.md](CODING_STANDARDS.md):
  - Max file size <= 300 lines.
  - Max line length <= 120 characters.
  - Zero hardcoded secrets, externalized `.env.example`.
  - Type-safe domain models and DTOs.

---

## 📡 API Endpoints Overview

| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/auth/login` | ❌ | Authenticate user & return JWT token |
| `GET` | `/api/auth/demo-users` | ❌ | Get pre-seeded demo accounts |
| `GET` | `/api/auth/me` | ✅ | Get current authenticated user profile |
| `GET` | `/api/events` | ❌ | List all events (supports `?search=` and `?category=`) |
| `GET` | `/api/events/:id` | ❌ | Get event detail & RSVP summary |
| `POST` | `/api/events` | ✅ | Create a new meetup event |
| `PUT` | `/api/events/:id` | ✅ (Owner) | Update meetup event |
| `DELETE` | `/api/events/:id` | ✅ (Owner) | Delete meetup event |
| `POST` | `/api/rsvps/:eventId` | ✅ | Upsert RSVP status (`going`, `maybe`, `declined`) |
| `GET` | `/api/rsvps/:eventId/attendees` | ❌ | List attendees grouped by status |

---

## 🛠️ Tech Stack & Technologies

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express.js, TypeScript, mysql2, JWT, bcryptjs, Zod.
- **Database**: MySQL 8.0.
- **Containerization**: Docker, Docker Compose.
