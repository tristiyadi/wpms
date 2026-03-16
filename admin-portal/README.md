# 🖥️ WPMS Admin Portal

Next.js-based management dashboard for wellness packages.

## 📁 Project Structure

```text
src/
├── app/             # App Router pages and layouts
├── components/      # Reusable UI components (shadcn/ui)
├── lib/             # Utility functions and API client
└── store/           # Frontend state management (Zustand)
```

## ⚙️ Setup Instructions

1. **Install Dependencies**:

   ```bash
   pnpm install
   ```

2. **Environment Specs**:
   Create a `.env` file with:
   `NEXT_PUBLIC_API_URL=http://localhost:3000`

3. **Run Development**:

   ```bash
   pnpm run dev
   ```

## 🏗 Architectural Decisions

- **App Router**: Leveraging Next.js 14 server and client components for optimal performance.
- **Client-Side State**: Using **Zustand** for lightweight and reactive state management of package data.
- **Atomic Components**: UI is built using small, reusable components (Button, Modal, Card) to ensure consistency.
- **Zod Schema Sharing**: Validation patterns match the backend schema to ensure data integrity.

## 💡 Assumptions Made

- **Admin Persona**: Access is assumed to be unrestricted for local testing, designed with a "Manager" role in mind.
- **API Availability**: The portal assumes the NestJS backend is running on port 3000.
