---
stepsCompleted: ['step-01-init', 'step-02-context', 'step-03-starter', 'step-04-decisions', 'step-05-patterns', 'step-06-structure', 'step-07-validation']
inputDocuments: ['prd.md', 'product-brief-DocBot-2026-01-29.md']
workflowType: 'architecture'
project_name: 'DocBot'
user_name: 'Labaile'
date: '2026-01-29'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
The core functionality drives a simple "Input -> Process -> Output" pipeline.
- **FR01-05 (Ingestion):** Standard file/camera operations. No complex media handling.
- **FR06-08 (Intelligence):** OCR is the "engine." Precision is key.
- **FR09-11 (Integration):** Google Calendar is the "database."

**Non-Functional Requirements:**
- **NFR3 (Zero Retention):** Dictates a stateless architecture. We cannot rely on a DB for job queues.
- **NFR1 (Speed):** <3s upload implies minimal payload overhead.

**Scale & Complexity:**
- **Primary Domain:** Mobile Web SPA.
- **Complexity Level:** Low (Greenfield, No Legacy, No Persistence).
- **Estimated Components:** 2 (Frontend Client, Serverless API).

### Technical Constraints & Dependencies
- **Serverless:** Application MUST run in ephemeral environments (Lambda/Vercel).
- **Google Dependency:** Heavy reliance on `googleapis` SDK.

### Cross-Cutting Concerns Identified
- **Error Handling:** Vital for ephemeral flows. Failures must be communicated instantly to the client.
- **Secrets Management:** API keys must be injected at runtime, never stored client-side.

## Starter Template Evaluation

### Primary Technology Domain
**Web Application** (Mobile-First SPA with Serverless Backend).

### Starter Options Considered
- **Official `create-next-app`**: Clean slate, standard-compliant, perfect for custom serverless logic without database assumptions.
- **T3 Stack**: Includes TRPC/Prisma/DB which conflicts with our stateless, no-DB requirement. **Rejected**.
- **ShipFast / SaaS Starters**: Includes Stripe/Supabase/Auth-UI bloat. Too heavy for a simple prototype. **Rejected**.

### Selected Starter: Official Next.js CLI

**Rationale for Selection:**
Best fit for a "Stateless" architecture. Provides the App Router (for API endpoints) and TypeScript without forcing a database decision we don't need. It allows us to build the "Happy Path" prototype with zero technical debt from unused libraries.

**Initialization Command:**

```bash
npx create-next-app@latest docbot --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

**Architectural Decisions Provided by Starter:**

**Language & Runtime:**
- **TypeScript:** Configured by default for type safety across API and Frontend.
- **Runtime:** Edge-compatible (Middleware/API Routes).

**Styling Solution:**
- **Tailwind CSS:** Pre-configured with PostCSS. Ideal for rapid mobile-first UI development.

**Build Tooling:**
- **Next.js Compiler (Rust-based):** Fast builds and HMR.

**Code Organization:**
- **`src/` Directory:** Enforces clean separation of source code from config files.
- **App Router:** `src/app` for pages and API routes (`src/app/api/...`).

**Development Experience:**
- **ESLint:** Pre-configured for Next.js best practices (Core Web Vitals).

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- **Stateless Data Flow:** Direct streaming of images to memory (RAM) and immediate deletion.
- **Provider-Based Identity:** Using Auth.js v5 for Google OAuth with strict calendar scopes.

**Important Decisions (Shape Architecture):**
- **Standardized API Responses:** JSON-based error codes for low OCR confidence (e.g., `ERR_LOW_CONFIDENCE`).
- **Serverless-First Deployment:** Targeting Vercel for zero-config infrastructure.

**Deferred Decisions (Post-MVP):**
- **Scaling to Multi-User Groups:** Deferred until MVP validates the OCR accuracy.
- **Support for Non-USD Currencies:** Deferred to Phase 2.

### Data Architecture
- **Storage Strategy:** **Stateless / Ephemeral**. Images are held in memory during the POST request and never persisted to a database or local disk.
- **Validation:** **Zod (v4.3.6)**. All incoming JSON and form data is validated against strict schemas before processing.

### Authentication & Security
- **Identity Provider:** **Google Identity Services** via **Auth.js (v5)**.
- **Session Management:** Encrypted JWT tokens stored in HttpOnly cookies.
- **Least Privilege:** OAuth scopes are restricted solely to `calendar.events`.

### API & Communication Patterns
- **API Design:** **Next.js (v16.x) Route Handlers**. RESTful implementation for the processing pipeline.
- **Processing Pipeline:** `Client (Image) -> API (OCR) -> Google (Calendar Event) -> Client (Success Toast)`.

### Frontend Architecture
- **State Management:** **React `useActionState`**. Native Next.js 16/React 19 hooks for handling form submission and processing states.
- **UI Components:** **Tailwind CSS** with **Lucide React (0.563.0)** for iconography.
- **Feedback:** **Sonner** for lightweight, non-blocking success/error toasts.

### Infrastructure & Deployment
- **Hosting Platform:** **Vercel**. Leverage Vercel Functions for the OCR logic and Next.js optimizations.
- **Environment Management:** Encrypted environment variables for Google Client IDs and backend secrets.

### Decision Impact Analysis
**Implementation Sequence:**
1. Initialize Next.js 16 project.
2. Configure Auth.js v5 with Google Provider.
3. Build the `/api/process` route handler.
4. Implement the Camera/Upload UI with `useActionState`.

## Implementation Patterns & Consistency Rules

### Naming Patterns

**API Naming Conventions:**
- **Endpoint Naming:** Pluralized resource names using kebab-case. Example: `/api/extractions`.
- **Parameter Format:** CamelCase for query parameters and JSON fields.

**Code Naming Conventions:**
- **Variables & Functions:** `camelCase`.
- **React Components:** `PascalCase`.
- **File Naming:** `kebab-case`. Example: `camera-capture.tsx`.

### Structure Patterns

**Project Organization:**
- **Logic:** Business logic (Google API, OCR parsing) MUST live in `src/lib/`.
- **Components:** Feature-based organization within `src/components/`.
- **Tests:** Co-located with the source file using the `.test.ts(x)` suffix.

### Format Patterns

**API Response Formats:**
All API routes MUST return a consistent envelope to ensure predictable handling in the ephemeral pipeline:
```json
{
  "success": boolean,
  "data": object | null,
  "error": {
    "code": string,
    "message": string
  } | null
}
```

**Data Exchange Formats:**
- **Dates:** ISO-8601 strings only.
- **Booleans:** Native `true`/`false`.

### Process Patterns

**Error Handling Patterns:**
- **Client Side:** Unified `ErrorToast` component triggered by the API `error.code`.
- **Server Side:** Immediate termination of the request upon error to maintain "Zero-Retention" (do not hold data in memory while retrying).

**Loading State Patterns:**
- **Naming:** `isProcessing` for OCR/API calls.
- **Visuals:** Skeleton loaders or "Processing..." overlays during the 30s P95 window.

### Enforcement Guidelines
- **All AI Agents MUST:**
  - Follow the `src/lib` logic separation strictly.
  - Use the standardized API response envelope.
  - Use Tailwind CSS for 100% of styling.

## Project Structure & Boundaries

### Complete Project Directory Structure

```text
docbot/
├── src/
│   ├── app/                    # Next.js App Router (UI & API)
│   │   ├── api/
│   │   │   ├── auth/           # Auth.js / NextAuth routes
│   │   │   └── extractions/    # The POST /api/extractions handler
│   │   ├── layout.tsx          # Auth provider & global UI
│   │   └── page.tsx            # Main "Happy Path" Capture Screen
│   ├── components/
│   │   ├── camera/             # Camera logic & capture button
│   │   ├── ui/                 # Shared Tailwind components (Toasts, Buttons)
│   │   └── extraction-result/  # The "Success/Failure" feedback view
│   ├── lib/                    # The "Stateless Engine"
│   │   ├── google-calendar.ts  # Calendar API logic
│   │   ├── ocr-processor.ts    # AI/OCR extraction logic
│   │   └── auth-config.ts      # Auth.js middleware/providers
│   ├── types/                  # Shared TypeScript interfaces
│   └── middleware.ts           # Route protection (Protect /extractions)
├── public/                     # Icons & Manifest
├── .env.example                # Sample secrets (GOOGLE_ID, etc)
├── next.config.ts
└── tailwind.config.ts
```

### Architectural Boundaries

**API Boundaries:**
- All API routes MUST reside in `src/app/api/`.
- Logic for external services (Google, OCR) MUST be abstracted into `src/lib/`.

**Component Boundaries:**
- Components in `src/components/ui/` MUST be presentational only.
- Business logic or API calls MUST be handled via `useActionState` in `src/app/page.tsx` or specialized feature components.

**Data Boundaries:**
- No persistent database. Data exists only within the request scope of `src/app/api/extractions/`.

### Requirements to Structure Mapping

**Feature: Authentication (FR01-FR02)**
- Config: `src/lib/auth-config.ts`
- Routes: `src/app/api/auth/`
- Middleware: `src/middleware.ts`

**Feature: Image Processing (FR03-FR08, FR15)**
- Frontend: `src/components/camera/`
- Logic: `src/lib/ocr-processor.ts`
- API: `src/app/api/extractions/`

**Feature: Calendar Integration (FR09-FR11)**
- Logic: `src/lib/google-calendar.ts`
- Integration Point: Called by `src/app/api/extractions/route.ts` upon successful OCR.

### Integration Points

**External Integrations:**
- **Google Calendar API:** via `googleapis` npm package.
- **Google Identity Services:** via `auth.js` (NextAuth).

**Data Flow:**
- **Google Identity Services:** via `auth.js` (NextAuth).

**Data Flow:**
`User Camera -> src/components/camera/ -> (POST) /api/extractions -> src/lib/ocr-processor.ts (RAM ONLY) -> src/lib/google-calendar.ts -> Google APIs`.

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices (Next.js 16, Auth.js v5, Zod, Lucide) are highly compatible and standard within the modern React ecosystem. Versions have been verified for stability.

**Pattern Consistency:**
Implementation patterns (camelCase, kebab-case files, logic in `src/lib`) directly support the architectural goal of a clean, serverless utility.

**Structure Alignment:**
The defined Next.js structure perfectly houses the stateless processing pipeline and Auth boundaries.

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**
- **FR01-02 (Auth):** Managed via Auth.js v5.
- **FR03-15 (Processing/Privacy):** Handled by the stateless memory-stream pattern in `src/lib/ocr-processor.ts`.
- **FR09-11 (Calendar):** Abstracted into `src/lib/google-calendar.ts`.

**Non-Functional Requirements Coverage:**
- **NFR3 (Zero Retention):** Enforced by the "Stateless" Data Boundary.
- **NFR1-2 (Performance):** Supported by Vercel's serverless infrastructure.

### Implementation Readiness Validation ✅

**Decision Completeness:**
All critical decisions, including data handling, auth, and deployment, are documented.

**Structure Completeness:**
A specific project tree has been provided, mapping features to directories.

**Pattern Completeness:**
Standardized API envelopes and naming conventions are established to prevent agent conflicts.

### Architecture Completeness Checklist

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** READY FOR IMPLEMENTATION
**Confidence Level:** High

**Key Strengths:**
- Stateless "Zero-Retention" design is perfect for the document privacy goal.
- Standardized API envelope simplifies client-side error handling.
- Next.js 16 provides an ultra-modern foundation with minimal boilerplate.

### Implementation Handoff

**AI Agent Guidelines:**
- Follow the `src/lib` logic separation strictly.
- Every API route MUST use the standardized JSON envelope.
- Use Tailwind CSS for all styling.

**First Implementation Priority:**
```bash
npx create-next-app@latest docbot --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```
