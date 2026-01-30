# Story 1.3: Google Calendar Scope Authorization

Status: done

## Story

As a user,
I want to grant DocBot permission to manage my calendar events,
So that it can automatically add my bills to my schedule.

## Acceptance Criteria

1. **Incremental Scopes:** Configure Auth.js to request `https://www.googleapis.com/auth/calendar.events` during the sign-in flow.
2. **Persistence:** Access tokens are stored/available in the session for subsequent backend API calls.
3. **Least Privilege:** Verify only calendar event access is requested, not full calendar or drive access.

## Tasks / Subtasks

- [x] Update Auth configuration for Scopes
  - [x] Modify `src/auth.ts` to include `calendar.events` scope in the Google provider.
- [x] Implement Session Token Handling
  - [x] Add `callbacks` to `src/auth.ts` to persist the `access_token` in the JWT and Session objects.
- [x] Verification
  - [x] Run build to ensure type safety for session callbacks.
  - [x] Verify the OAuth redirect URL includes the requested scope (simulated).

## Dev Notes

- **Scope:** `https://www.googleapis.com/auth/calendar.events` is the specific scope for creating and managing events.
- **Provider Settings:** `authorization: { params: { scope: "..." } }` is the standard Auth.js configuration pattern.

## Dev Agent Record

### Agent Model Used

BMad Master (powered by Antigravity)

### Debug Log References

- Configured `calendar.events` scope in `src/auth.ts`.
- Implemented `jwt` and `session` callbacks for token persistence.
- Added type definitions in `src/types/next-auth.d.ts` to resolve `accessToken` property errors.
- Verified build using Node v22.14.0.

### Completion Notes List

- Calendar API access token is now available in the frontend session object for downstream API calls.
- Scope request correctly integrated into Google provider params.

### File List

- `src/auth.ts` (modified)
- `src/types/next-auth.d.ts` (created)
