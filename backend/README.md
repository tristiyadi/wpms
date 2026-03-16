# 🚀 WPMS Backend API

NestJS-based RESTful API for the Wellness Package Management System.

## 📁 Project Structure

```text
src/
├── bootstrap/       # App initialization logic (Swagger, CORS, etc.)
├── config/          # Database and environmental configurations
├── filters/         # Global exception filters
├── modules/         # Feature modules
│   └── packages/    # Package management logic
│       ├── controllers/ # HTTP Route handlers (Admin/Mobile)
│       ├── dto/         # Data Transfer Objects (Zod schemas)
│       ├── entities/    # TypeORM Entities
│       └── packages.service.ts # Core business logic
└── main.ts          # Application entry point
```

## ⚙️ Setup Instructions

1. **Install Dependencies**:

   ```bash
   pnpm install
   ```

2. **Environment Specs**:
   Copy `.env.example` to `.env` and configure your PostgreSQL credentials.

3. **Database Management (Migrations & Seeding)**:

   The project uses TypeORM for entity-based migrations, but also includes custom tools for raw SQL migrations and database resets. Choose the flow that matches your requirements.

   **Standard TypeORM Flow:**

   - To run pending migrations:

     ```bash
     pnpm run migration:run
     ```

   - To generate a new migration from entity changes:

     ```bash
     pnpm run migration:generate
     ```

   - To revert the last executed migration:

     ```bash
     pnpm run migration:revert
     ```

   **Custom SQL Flow & Reset (If prefering plain SQL):**

   - To run all `.sql` files in `database/migrations` directly:

     ```bash
     pnpm run migration:sql
     ```

   - To reset the database (drop `wellness_packages` and re-run all `.sql` migrations):

     ```bash
     pnpm run db:reset
     ```

4. **Seed Data**:

   ```bash
   pnpm run seed
   ```

5. **Run Development**:

   ```bash
   pnpm run start:dev
   ```

## 📝 API Design

The API follows RESTful principles with specialized controllers for different personas:

- **Admin Endpoints**: `/admin/packages` (Full CRUD)
- **Mobile Endpoints**: `/mobile/packages` (Read-only access)

**Documentation**: Accessible at `http://localhost:3000/api` via Swagger UI.

## 🏗 Architectural Decisions

- **Modular Architecture**: NestJS modules are used to encapsulate logic, making the system scalable.
- **Zod for Validation**: Using `nestjs-zod` ensuring a single source of truth for both TypeScript types and runtime validation.
- **Global Exception Mapping**: A centralized filter ensures consistent error responses across all endpoints.
- **Separation of Concerns**: Controllers handle requests, Services handle logic, and Repositories handle data.

## 💡 Assumptions Made

- **Soft Deletion**: While not fully implemented in this version, the architecture supports moving towards soft-deletes by isolating database operations in services.
- **Public Access**: Mobile endpoints are assumed to be public for this assessment, while Admin endpoints are structured for future Guard/Auth implementation.
