# Story 2.4: Active Processing Visual State (Emerald Scanline)

Status: done

## Story

As a user,
I want to see an animated "Scan" effect after snapping the photo,
So that I know the app is actively analyzing my document.

## Acceptance Criteria

1. **Scanline Animation:** Implement a vertical emerald scanline that moves across the viewfinder during processing.
2. **Status Feedback:** Display a "Processing..." or "Analyzing..." mono-font message centrally in the HUD.
3. **Blur Effect:** Apply a backdrop blur or dimming effect to the camera feed while processing to draw focus to the animation.
4. **Transition Smoothness:** Ensure the transition into and out of the processing state is fluid and technical.
5. **Zero Delay:** The animation must start immediately upon capture/upload confirmation.

## Tasks / Subtasks

- [x] Enhance `ViewfinderHUD`
  - [x] Add an `isProcessing` prop or integrate it into the `status` state.
  - [x] Implement the internal scanline animation and "Processing" label.
- [x] Update `CameraTerminal`
  - [x] Ensure the processing state correctly triggers the HUD's visual refinements.
- [x] Verification
  - [x] Validate build integrity.
  - [x] Ensure animations don't cause performance issues on mobile-simulated viewports.

## Dev Notes

- **Aesthetic:** Use `electric-emerald` for the scanline glow.
- **Timing:** The scanline should cycle every 1.5 - 2 seconds to feel "active."

## Dev Agent Record

### Agent Model Used

BMad Master (powered by Antigravity)

### Debug Log References

- Enhanced `ViewfinderHUD` with a native CSS `scanline` animation.
- Implemented state-based visual dimming and blurring of the camera feed during processing.
- Added orange "ANALYZING_DOC" status indicators to provide distinct visual feedback from the emerald "Locked" state.
- Verified build v22.14.0 compatibility.

### Completion Notes List

- Active processing state is visually distinct and follows the "Digital Lens" specification.
- Transition periods (3 seconds) now feel high-tech and intentional.
- All HUD elements (corners, labels) remain visible and correctly themed during processing.

### File List

- `src/components/camera/viewfinder-hud.tsx` (modified)
- `src/components/camera/camera-terminal.tsx` (modified)
