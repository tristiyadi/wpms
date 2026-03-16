# 🧘 Wellness Package Management System (WPMS)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![NextJS](https://img.shields.io/badge/Next.js-black?logo=nextdotjs&logoColor=white)
![Flutter](https://img.shields.io/badge/Flutter-02569B?logo=flutter&logoColor=white)
![Postgres](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)

A **full-stack wellness package management system** built for the Fullstack Developer Assessment. This project demonstrates clean architecture, modular code organization, and cross-platform integration.

---

## 🏗 Architecture & Design Decisions

### 1. High-Level Architecture

```mermaid
flowchart LR
    Admin[Admin Portal<br>Next.js 14]
    Mobile[Mobile App<br>Flutter]
    API[Backend API<br>NestJS]
    DB[(PostgreSQL 17)]

    Admin --> API
    Mobile --> API
    API --> DB
```

### 2. Core Decisions

- **Unified Domain Logic**: The backend uses separate controllers for Admin and Mobile personas but shares the same underlying Service Layer to ensure data consistency.
- **Strict Validation**: Zod is used across the Backend (via `nestjs-zod`) and Frontend to ensure a robust, single-point-of-failure for data validation.
- **Platform-Ready Mobile Service**: The Flutter `ApiService` is built to be environment-aware, automatically switching between `localhost` and emulator-specific (`10.0.2.2`) addresses.
- **Global Error Handling**: A centralized NestJS exception filter maps all internal errors to specific, frontend-friendly REST responses.

---

## 📂 Project Structure

```text
wpms/
├── backend/           # NestJS REST API (Modular Architecture)
├── admin-portal/      # Next.js Dashboard (Zustand + shadcn/ui)
├── mobile_app/        # Flutter Client (Platform-aware API Service)
└── docker-compose.yml # Full-stack orchestration
```

---

## 🚀 Quick Start (Docker)

Start the entire ecosystem (DB, API, and Admin Portal) with a single command:

```bash
docker compose up -d --build
```

| Service | URL |
| :--- | :--- |
| **Backend API** | [http://localhost:3000](http://localhost:3000) |
| **Swagger UI** | [http://localhost:3000/api](http://localhost:3000/api) |
| **Admin Portal** | [http://localhost:3001](http://localhost:3001) |

---

## 📝 API Design Highlights

- **RESTful standard**: Clean HTTP path and verb usage.
- **Dto Pattern**: Every request payload is validated against a strictly typed Zod schema.
- **Separation of Concerns**: UI Controllers are light; all business logic resides in Services.

---

## 👨‍💻 Author

**Tristiyadi** - Fullstack Developer Assessment Submission
