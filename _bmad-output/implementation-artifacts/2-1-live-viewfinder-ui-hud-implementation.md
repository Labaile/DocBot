# Story 2.1: Live Viewfinder UI & HUD Implementation

Status: done

## Story

As a user,
I want a clear, technical-looking viewfinder with HUD overlays,
So that I know exactly how to align my document for high-accuracy OCR.

## Acceptance Criteria

1. **Dashboard Shell:** Implement a mobile-first dashboard layout with the "Digital Lens" aesthetic.
2. **Camera HUD:** Create a `ViewfinderHUD` component with "Electric Emerald" corner markers and technical labels.
3. **Live Feed Placeholder:** Implement a visual container for the camera stream with appropriate aspect ratio (3:4 or 16:9).
4. **HUD Overlay:** Add technical metadata overlays (e.g., "ISO: AUTO", "DOC_SCAN_ACTIVE") to enhance the technical feel.
5. **Responsive Design:** Ensure the HUD scales correctly across mobile screens while remaining centered on desktop.

## Tasks / Subtasks

- [x] Implement UI Components
  - [x] Create `src/components/camera/viewfinder-hud.tsx`.
  - [x] Implement `EmeraldCorner` sub-component for the HUD frame.
- [x] Create Dashboard Page
  - [x] Create `src/app/dashboard/page.tsx`.
  - [x] Integrate session check to protect the dashboard route.
- [x] Implement HUD Layout
  - [x] Add technical labels and animated "SCANNING" message placeholders.
- [x] Verification
  - [x] Run build to ensure layout and Tailwind tokens work correctly.
  - [x] Verify HUD responsiveness in simulated mobile viewport.

## Dev Notes

- **Aesthetic:** Use `electric-emerald` for all HUD elements.
- **Typography:** Use Geist Mono for metadata labels to maintain the technical theme.
- **Privacy:** Ensure the HUD UI works even if camera permissions are pending.

## Dev Agent Record

### Agent Model Used

BMad Master (powered by Antigravity)

### Debug Log References

- Implemented `ViewfinderHUD` component with Tailwind v4 theme.
- Configured dashboard page with server-side session protection.
- Resolved build error related to `styled-jsx` in Server Components.

### Completion Notes List

- Dashboard shell is ready with technical HUD.
- Navigation logic preserves Auth session state.
- Aesthetic markers (Emerald Corners, Metadata labels) implemented.

### File List

- `src/components/camera/viewfinder-hud.tsx`
- `src/app/dashboard/page.tsx`
