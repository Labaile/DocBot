# Story 1.4: Error Logging & Reliability Foundation

Status: done

## Story

As an administrator,
I want to log critical service failures,
So that I can debug authentication or API issues remotely.

## Acceptance Criteria

1. **Structured Logging:** Implement a unified logging utility for server-side errors.
2. **PII Sanitization:** Ensure logs do not contain sensitive user information (tokens, emails, names).
3. **Environment Stability:** Formally lock the Node.js version and ensure build scripts are reliable.
4. **Error Catching:** Implement a global or route-level error handling pattern for Next.js Route Handlers.

## Tasks / Subtasks

- [x] Implement Logging Utility
  - [x] Create `src/lib/logger.ts` for structured server-side logging.
  - [x] Add sanitization logic to strip PII from error objects.
- [x] Implement Error Middleware/Wrapper
  - [x] Create a higher-order function or utility to wrap Route Handlers for consistent error logging.
- [x] Solidify Environment
  - [x] Update `package.json` to include `engines` and strict build scripts.
- [x] Verification
  - [x] Run build to ensure logging integration doesn't break static optimization.
  - [x] Verify that a simulated error produces a sanitized log entry.

## Dev Notes

- **Logger:** Simple structured JSON logging to `stdout` is preferred for Vercel/Cloud compatibility.
- **Privacy:** NFR3 (Zero Retention) extends to logs—never log image data or raw OCR results.

## Dev Agent Record

### Agent Model Used

BMad Master (powered by Antigravity)

### Debug Log References

- Created `src/lib/logger.ts` with auto-sanitization for 'email', 'token', etc.
- Created `src/lib/api-utils.ts` with `withErrorHandling` higher-order function.
- Verified build v22.14.0 compatibility.

### Completion Notes List

- Structured logging system is active.
- PII sanitization verified (simulated).
- Environment locked via `.nvmrc` and `engines` field in `package.json`.

### File List

- `src/lib/logger.ts`
- `src/lib/api-utils.ts`
- `package.json` (modified)
- `.nvmrc` (already exists)
