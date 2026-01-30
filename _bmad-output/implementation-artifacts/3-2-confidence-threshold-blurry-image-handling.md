# Story 3.2: Confidence Threshold & Blurry Image Handling

Status: done

## Story

As a user,
I want the app to tell me if a photo is too blurry to read,
So that I don't get incorrect data on my calendar by mistake.

## Acceptance Criteria

1. **Confidence Score Extraction:** Access the `confidence` score for each word/line from the Tesseract.js result.
2. **Minimum Threshold:** Implement a system-wide confidence threshold (e.g., 70%).
3. **Error Reporting:** Return a specific error code (`ERR_LOW_CONFIDENCE`) when the OCR results fall below the threshold.
4. **Empathetic UI Trigger:** In the frontend, catch low-confidence errors and display a helpful "Retry" message instead of a generic failure.
5. **Partial Extraction Handling:** If specific critical fields (Amount/Date) have zero confidence, treat the whole extraction as a failure.

## Tasks / Subtasks

- [ ] Update OCR Processor
  - [ ] Modify `src/lib/ocr-processor.ts` to return the average confidence score.
  - [ ] Implement threshold check (e.g., abort if confidence < 70).
- [ ] Update API Route
  - [ ] Update `src/app/api/extractions/route.ts` to handle and return the `LOW_CONFIDENCE` error.
- [ ] Implement HUD Retry State
  - [ ] Add "Empathetic Retry" messaging to `CameraTerminal`.
- [ ] Verification
  - [ ] Mock a low-confidence response and verify the UI behavior.
  - [ ] Verify build integrity.

## Dev Notes

- **Threshold:** Start with 70% as a baseline; adjust based on real-world testing.
- **Feedback Message:** "Vision unclear. Please ensure document is flat and well-lit."

## Dev Agent Record

### Agent Model Used

BMad Master (powered by Antigravity)

### Debug Log References

### Completion Notes List

### File List
