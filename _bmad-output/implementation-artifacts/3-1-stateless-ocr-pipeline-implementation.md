# Story 3.1: Stateless OCR Pipeline Implementation

Status: done

## Story

As a developer,
I want a server-side route that accepts an image and returns extracted document data,
So that the app can automate calendar entry without storing user images.

## Acceptance Criteria

1. **Stateless Handler:** Implement a Next.js Route Handler (`POST /api/extractions`) that processes images in memory.
2. **OCR Engine:** Integrate Tesseract.js (or similar) to perform text extraction on the image buffer.
3. **Data Extraction:** Implement regex/logic to extract `Vendor`, `Due Date`, and `Amount` from the raw text.
4. **Zero Retention:** Verify that no file system writes occur during processing (RAM only).
5. **Secure Boundary:** Ensure the route is protected by Auth.js session verification.

## Tasks / Subtasks

- [x] Install OCR Dependencies
  - [x] Execute `npm install tesseract.js`
- [x] Implement OCR Logic
  - [x] Create `src/lib/ocr-processor.ts` to handle buffer-to-text conversion.
  - [x] Add regex patterns for bill data extraction.
- [x] Implement API Route
  - [x] Create `src/app/api/extractions/route.ts` with the standardized JSON envelope.
- [x] UI Integration
  - [x] Update `CameraTerminal` to call the `/api/extractions` endpoint.
- [x] Verification
  - [x] Test with a sample bill image to verify extraction results.
  - [x] Verify build completes successfully.

## Dev Notes

- **Input:** Multipart/form-data with an `image` field.
- **Output:** Standardized JSON: `{ success: true, data: { vendor, dueDate, amount } }`.
- **Privacy:** Request body is consumed and discarded immediately after OCR.

## Dev Agent Record

### Agent Model Used

BMad Master (powered by Antigravity)

### Debug Log References

- Integrated `Tesseract.js` for server-side OCR.
- Implemented `extractBillData` logic in `src/lib/ocr-processor.ts`.
- Created protected `POST /api/extractions` route with PII-safe logging.
- Connected Frontend pipeline to Backend extraction.

### Completion Notes List

- Stateless OCR pipeline is active. 
- Document data (Vendor, Date, Amount) is now extracted in-memory.
- UI reveals analysis results via Sonner toasts.

### File List

- `src/lib/ocr-processor.ts`
- `src/app/api/extractions/route.ts`
- `src/components/camera/camera-terminal.tsx` (modified)
