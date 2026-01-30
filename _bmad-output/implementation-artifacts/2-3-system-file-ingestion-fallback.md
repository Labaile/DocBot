# Story 2.3: System File Ingestion Fallback

Status: done

## Story

As a user,
I want to select an existing photo from my library,
So that I can process bills I've already photographed.

## Acceptance Criteria

1. **File Picker:** Implement a secondary action that opens the native device file picker.
2. **Format Support:** Restrict selection to standard image formats (JPG, JPEG, PNG).
3. **Ingestion Pipeline:** Integrate the selected file into the same processing pipeline as the camera capture.
4. **UI Feedback:** Show a "File Uploaded" toast and transition to the "Processing" HUD state upon selection.
5. **Validation:** Ensure the system handles non-image files or cancelled selections gracefully.

## Tasks / Subtasks

- [x] Implement File Input
  - [x] Add a hidden `<input type="file">` to the `CameraTerminal` component.
- [x] Connect Import Action
  - [x] Link the "Import Docs" button to trigger the hidden file input.
- [x] Implement File Handling Logic
  - [x] Create a handler to read the selected file and simulate the ingestion phase.
- [x] Verification
  - [x] Validate build integrity.
  - [x] Verify file type filtering in the browser.

## Dev Notes

- **Input:** `<input type="file" accept="image/*" />`.
- **UX:** The transition should feel identical to the "Capture" flow after the file is chosen.

## Dev Agent Record

### Agent Model Used

BMad Master (powered by Antigravity)

### Debug Log References

- Integrated hidden file input with reference in `CameraTerminal`.
- Refactored ingestion logic into a reusable `processIngestion` function.
- Added file type validation for images.
- Verified build v22.14.0 compatibility.

### Completion Notes List

- Users can now upload existing bill images using the "Import Docs" action.
- File ingestion shares the same visual feedback and processing pipeline as the live camera.
- Validation prevents non-image file selection.

### File List

- `src/components/camera/camera-terminal.tsx` (modified)
- `_bmad-output/implementation-artifacts/2-3-system-file-ingestion-fallback.md` (modified)
