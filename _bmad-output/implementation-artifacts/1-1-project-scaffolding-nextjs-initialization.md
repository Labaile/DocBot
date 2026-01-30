# Story 1.1: Project Scaffolding & Next.js Initialization

Status: review

## Story

As a developer,
I want to initialize the Next.js project with Tailwind and TypeScript,
so that I have a consistent, modern foundation for building DocBot.

## Acceptance Criteria

1. **Next.js Core:** Initialize the project using the App Router and `src/` directory.
2. **TypeScript:** Full TypeScript support with absolute path aliases (`@/*`).
3. **Styling:** Tailwind CSS configured with "Digital Lens" tokens (`Electric Emerald`, `Deep Slate`).
4. **Font System:** Integration of Geist Sans and Geist Mono fonts as requirement for technical aesthetic.
5. **Library Foundation:** `lucide-react` (icons) and `sonner` (toasts) installed and verified.
6. **Build Integrity:** Initial build must complete successfully with no linting errors.
7. **Git Foundation:** Project initialized with Git and a meaningful initial commit.

## Tasks / Subtasks

- [x] Run initialization command (AC: 1, 2)
  - [x] Execute `npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes`
- [x] Install Core Dependencies (AC: 4, 5)
  - [x] Execute `npm install geist lucide-react sonner`
- [x] Implement Directory Structure (AC: 5)
  - [x] Create `src/components/`, `src/app/`, `src/lib/`, `src/hooks/` folders
- [x] Configure Design System (AC: 3, 4)
  - [x] Update `tailwind.config.ts` with color tokens: `electric-emerald: "#10B981"`, `deep-slate: "#0F172A"`.
  - [x] Update `src/app/layout.tsx` to integrate Geist Sans and Mono fonts.
  - [x] Set "Deep Slate" as default background in `src/app/globals.css`.
- [x] Verification & Version Control (AC: 6, 7)
  - [x] Run `npm run build` and ensure zero errors.
  - [x] Run `git init && git add . && git commit -m "chore: initial project scaffold with docbot design system foundations"`

## Dev Notes

- **Architecture Compliance:** Follow the "Serverless-First" pattern. All logic should be in Route Handlers or Server components where possible.
- **Naming Convention:** Use `kebab-case` for all files and folders.
- **Component Strategy:** Use Radix UI primitives (via library choices) as the foundation for accessible components.
- **Agentic Hint:** Use `--yes` or `-y` for all CLI tools to avoid hanging on interactive prompts.

### Project Structure Notes

- **App Router:** Ensure `page.tsx` is at the root of `/src/app/`.
- **Aliasing:** `@/*` must point to `/src/*` as configured in `tsconfig.json`.

### References

- [Source: architecture.md#Technical Stack]
- [Source: architecture.md#Project Structure]
- [Source: ux-design-specification.md#Design System Foundation]
- [Source: ux-design-specification.md#Color System]

## Dev Agent Record

### Agent Model Used

BMad Master (powered by Antigravity)

### Debug Log References

- Verified Node environment in WSL (v22.20.0 success after initial v18 failure).
- Resolved NPM UNC path failure via direct WSL execution for `create-next-app`.
- Successfully patched `globals.css` with Tailwind v4 `@theme` tokens.

### Completion Notes List

- Project scaffolded with Next.js 15+ (App Router).
- Design system tokens initialized for "Digital Lens" theme (Deep Slate / Emerald).
- Core folders structure created: `components`, `lib`, `hooks`.
- Build verified successful.

### File List

- `src/app/globals.css`
- `src/app/layout.tsx`
- `package.json`
- `src/components/`
- `src/lib/`
- `src/hooks/`
