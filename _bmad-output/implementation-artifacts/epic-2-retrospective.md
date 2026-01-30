# Epic 2 Retrospective: The Lens (Ingestion & Capture)

**Status:** Completed
**Date:** 2026-01-29

## 🎯 Objective Achievement
The goal of Epic 2 was to implement a mobile-first, "Digital Lens" capture interface that handles both live camera streams and local file ingestion with a technical, high-fidelity aesthetic.

- **[Success]** Live hardware camera stream integrated via MediaDevices API.
- **[Success]** Shared ingestion pipeline for both camera and file uploads.
- **[Success]** Technical HUD with state-aware markers (Searching → Locked → Processing).
- **[Success]** Zero-retention privacy branding integrated into the core UI.

## 🚀 Key Successes
1.  **Aesthetic Fidelity:** Successfully translated the complex "Digital Lens" HUD from the UX spec into a performant Tailwind v4 + React implementation.
2.  **State Orchestration:** The transition between "Ready," "Capture," and "Processing" feels fluid and intentional due to the unified state management in `CameraTerminal`.
3.  **Cross-Platform Ingestion:** Providing the `FileUp` fallback ensures the app is usable on devices where camera permissions might be restricted or for processing existing photos.

## ⚠️ Challenges & Lessons Learned
1.  **Turbopack & Server Components:** Encountered build errors when using `styled-jsx` within Server Components.
    - *Resolution:* Isolated all visual effects and animations into a dedicated Client Component (`src/components/visual-effects.tsx`).
2.  **Environment Versioning:** Encountered background Node.js version conflicts (v18 vs v22).
    - *Resolution:* Established a strict build protocol using Node v22.14.0 and documented it in the `.nvmrc` and `package.json`.
3.  **Media Stream Lifecycle:** Managing the camera stream to prevent memory leaks and unnecessary battery drain.
    - *Resolution:* Implemented careful effect cleanup in `useCamera` and `CameraTerminal`.

## 🛠️ Adjustments for Epic 3
- **OCR Format:** Epic 3 will require the image data to be sent to a serverless handler. The `processIngestion` logic is already set up to handle `Blob` objects, making the handoff straightforward.
- **Privacy Enforcement:** NFR3 (Zero Retention) must be strictly enforced in the backend. Epic 2 verified the visual promise; Epic 3 must prove the technical reality (in-memory only).

## ✅ Conclusion
Epic 2 has established a premium, trusted front-end ingestion layer. DocBot now "sees" the bills; next, it must "understand" them.

---
*End of Retrospective*
