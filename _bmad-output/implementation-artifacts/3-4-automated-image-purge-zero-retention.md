# Story 3.4: Automated Image Purge (Zero-Retention)

Status: done

## Story

As a privacy-conscious user,
I want my bill image deleted immediately after the data is extracted,
So that my sensitive financial information is never stored.

## Acceptance Criteria

1. **Memory-Only Processing**: Confirm that the API route processes images in RAM using Buffers/Streams without writing to disk.
2. **Worker Termination**: Ensure Tesseract workers are explicitly terminated after extraction to release memory.
3. **Visual Confirmation**: Display a "Security: Image Purged" indicator in the UI (HUD or Verification Sheet) after processing.
4. **Audit Log**: Log the completion of the purge (without logging image data) for internal verification.

## Tasks / Subtasks

- [x] Technical Audit of OCR Pipeline
  - [x] Verify `src/app/api/extractions/route.ts` for disk-less operation.
  - [x] Verify `src/lib/ocr-processor.ts` for worker cleanup.
- [x] Implement Visual Purge Confirmation
  - [x] Add "Holographic Purge" notification or badge to `DataRevealSheet`.
- [x] Backend Purge Logging
  - [x] Add explicit purge logging to the extraction API.
- [x] Verification
  - [x] Verify no temp files exist in `/tmp` or project root after upload.

## Dev Notes

- Pipeline is verified to be disk-less.
- Tesseract worker cleanup is now wrapped in a `try...finally` block for resilience.
- Added a "Security: Image Purged" badge to the `DataRevealSheet` header.

## Dev Agent Record

### Agent Model Used

BMad Master (powered by Antigravity)

### Debug Log References

### Completion Notes List

- Refactored `src/lib/ocr-processor.ts` with `try...finally` for guaranteed worker termination.
- Updated `src/app/api/extractions/route.ts` with explicit "Purged" logging in a `finally` block.
- Added a `ShieldCheck` status badge to `DataRevealSheet.tsx` to provide visual privacy assurance to the user.


### File List

- `src/lib/ocr-processor.ts`
- `src/app/api/extractions/route.ts`
- `src/components/camera/data-reveal-sheet.tsx`
