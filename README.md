# OpsCore - Unified Operations Platform

![OpsCore Thumbnail](./public/image/hero-section.png)

A multi-tenant SaaS platform where businesses create private workspaces to manage products, customers, orders, and analytics with strict data isolation.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=Greensock&logoColor=white)](https://greensock.com/gsap/)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)](https://stripe.com/)
[![TanStack Form](https://img.shields.io/badge/TanStack_Form-FF4154?style=for-the-badge&logo=React%20Query&logoColor=white)](https://tanstack.com/form/latest)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=React%20Query&logoColor=white)](https://tanstack.com/query/latest)
[![Better-Auth](https://img.shields.io/badge/Better--Auth-111111?style=for-the-badge&logo=betterauth&logoColor=white)](https://better-auth.com/)

---

## 📌 Project Overview
OpsCore is a powerful, multi-tenant operations platform designed to help businesses scale efficiently. It provides a shared SaaS infrastructure where each organization gets its own secure, sandboxed workspace. From team management to billing, automation, and real-time analytics, OpsCore acts as the central command hub for business operations.

## 💻 Tech Stack
- **Framework:** Next.js (App Router) for server-side rendering, routing, and optimal performance.
- **Language:** TypeScript for type safety and developer productivity.
- **Styling:** Tailwind CSS & Shadcn UI for a sleek, responsive, and accessible user interface.
- **State Management & Fetching:** TanStack React Query for efficient data synchronization, caching, and background updates.
- **Authentication:** Better-Auth for secure, session-based authentication (including multi-tenant logic).
- **Forms & Validation:** TanStack Form and Zod for robust form state management and schema validation.
- **Animations:** GSAP and tw-animate-css for fluid, professional micro-animations and scroll transitions.
- **Data Visualization:** Recharts for dynamic and interactive analytics dashboards.

## 🏗 Project Architecture & Workflow
The application follows a modular and scalable approach:
- **Route Groups:** Separated route blocks for `(authRouteGroup)`, `(publicLayout)`, and `(dashboardLayout)` to manage layout states completely independently.
- **Strict Data Isolation:** Multi-tenancy is baked into the UI where all dashboard views dynamically adjust based on the selected workspace context.
- **Reusable UI Library:** Shadcn UI powers the core visuals (in `src/components/ui/`), while complex domain logic is encapsulated inside `src/components/features/`.
- **Custom Hooks & Services:** Core logic like querying API endpoints and tracking container dimensions is abstracted into `src/hooks/` and `src/lib/`.

## 🔄 API Endpoints & Data Flow
Although this is a frontend repository, it heavily interacts with a centralized backend API:
- **Authentication Flow:** Better-Auth interfaces with `/api/auth` seamlessly to handle cookies, sessions, and third-party OAuth. 
- **Data Fetching:** Standardized fetch utilities (`lib/fetcher.ts`) are hooked onto TanStack React Query. This manages caching, refetching on window focus, and optimistic UI updates.
- **Tenant Context:** API requests automatically carry the Workspace ID via headers or route parameters to ensure the backend only returns data scoped to the active tenant.

## ✨ Features
- **Multi-tenant Architecture:** Completely isolated workspaces for different organizations.
- **Live Analytics Dashboard:** Track active users, workspace growth, and estimated revenue. 
- **Role-based Access Control:** Super-Admin vs Workspace Admin views with constrained permissions.
- **Interactive Visualizations:** Stunning Recharts-based revenue and growth trend charts.
- **Fluid UI Animations:** Custom GSAP micro-interactions on charts and data cards for a premium feel.
- **Responsive Design:** Operates perfectly on desktop, tablet, and mobile browsers.

## 🛠 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd opscore-frontend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add to it:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
   BETTER_AUTH_URL=http://localhost:3000
   ```
   *(Update the backend URL to match your running instance).*

4. **Run the development server:**
   ```bash
   pnpm run dev
   ```

5. Visit `http://localhost:3000` to preview the application.

## 📂 Folder Structure
```text
src/
├── app/                  # Next.js pages organized by Route Groups
│   ├── (authRouteGroup)/ # Login, registration, password recovery pages
│   ├── (dashboardLayout)/# Authenticated workspace and admin pages
│   └── (publicLayout)/   # Landing pages and marketing site
├── components/           
│   ├── charts/           # Recharts visualization wrappers
│   ├── features/         # Complex, domain-specific UI (Dashboard, Pricing)
│   ├── form/             # Form wrapper components using TanStack Form
│   ├── shared/           # Cross-app shared components (Empty state, errors)
│   └── ui/               # Reusable Atomic UI elements (Shadcn + Radix)
├── hooks/                # Specialized logic (e.g. useContainerDimensions)
├── lib/                  # Auth clients, API fetchers, and utilities
└── providers/            # React Query & Theme contextual wrappers
```

## 🚀 Future Improvements
- Implement comprehensive **End-to-End (E2E) testing** with Playwright.
- Integrate **AI-powered business insights** straight into the dashboard.
- More granular **business automation workflows** and webhooks integration interface.
- Deeper internationalization (i18n) support for global scaling.
