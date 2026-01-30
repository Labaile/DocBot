# Story 4.1: Google Calendar Event Creation Logic

Status: done

## Story

As a user,
I want my bill details to appear as a calendar event,
So that I have a permanent digital record of the due date.

## Acceptance Criteria

1. **Event Creation**: Create an 'All Day' event on the user's Google Calendar for the extracted Due Date.
2. **Event Title Format**: Event title must contain the Vendor name and Amount (e.g., "DocBot: $150.00 - Comcast Bill").
3. **Event Description**: Include the raw extracted data and confidence score in the description for reference.
4. **API Integration**: Use the Google Calendar API v3 with the user's authenticated session.
5. **Error Handling**: Return specific error codes for auth failures, API downtime, or quota limits.

## Tasks / Subtasks

- [x] Create Google Calendar API Client
  - [x] Implement `src/lib/google-calendar.ts` with event creation logic.
  - [x] Use the session's access token from Auth.js.
- [x] Create Calendar Sync API Route
  - [x] Implement `src/app/api/calendar/sync/route.ts`.
  - [x] Accept bill data and create the event.
- [x] Integrate with DataRevealSheet
  - [x] Update `handleConfirm` in `CameraTerminal` to call the sync API.
- [x] Verification
  - [x] Test event creation with real Google Calendar.
  - [x] Verify event appears with correct title and date.

## Dev Notes

- Installed `googleapis` package for Calendar API v3.
- Implemented date parser to handle MM/DD/YYYY and MM-DD-YYYY formats.
- Triple reminders (T-30, T-10, T-1) included in this story.

## Dev Agent Record

### Agent Model Used

BMad Master (powered by Antigravity)

### Debug Log References

### Completion Notes List

- Implemented `google-calendar.ts` with OAuth2 client and event creation logic.
- Created `/api/calendar/sync` route with comprehensive error handling.
- Integrated calendar sync into `CameraTerminal` with success/error toast feedback.
- Triple reminders (30 days, 10 days, 1 day) are automatically attached to each event.

### File List

- `src/lib/google-calendar.ts`
- `src/app/api/calendar/sync/route.ts`
- `src/components/camera/camera-terminal.tsx`
