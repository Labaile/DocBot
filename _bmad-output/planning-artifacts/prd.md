---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
inputDocuments: ['product-brief-DocBot-2026-01-29.md']
workflowType: 'prd'
documentCounts:
  briefCount: 1
  researchCount: 0
  brainstormingCount: 0
  projectDocsCount: 0
classification:
  projectType: web_app
  domain: general
  complexity: low
  projectContext: greenfield
---

# Product Requirements Document - DocBot

**Author:** Labaile

## Executive Summary
**DocBot** is a "Zero-Friction" personal productivity tool that allows users to upload photos of physical mail (bills, notices) and automatically schedule them on their Google Calendar. It eliminates the mental load of remembering due dates using a simple Mobile Web -> AI OCR -> Calendar integration.

## Success Criteria

### User Success
- **The "One Win" Metric:** Michelle successfully submits **one** major document (like a renewal or claim) BEFORE the deadline using the bot's reminders.
- **Visual Confidence:** She can open her Google Calendar and *see* the deadline and reminder blocks populated accurately from her uploaded file.
- **Zero-Friction Adoption:** User does not abandon the process during upload (completion rate > 80%).

### Business Success (Prototype)
- **Speed to Value:** A fully functional working prototype (upload -> extract -> calendar event) within **2 weeks**.
- **Accuracy:** The bot correctly extracts the *due date* and *context* from the document without manual correction.

### Technical Success
- **Extraction Accuracy:** **90%+** accuracy on critical fields (Due Date, Amount) from standard PDF/Images.
- **Performance:** End-to-end processing time (from upload to calendar event) is **< 30 seconds**.
- **Data Privacy:** **Strict Ephemeral Processing**. No uploaded documents or extracted PII are stored persistently after processing is complete.

### Measurable Outcomes
- **True Positive Rate:** 9/10 documents result in a correct calendar event.
- **Latency:** P95 processing time under 30 seconds.
- **Retention:** User returns to upload a second document within 14 days.

## Product Scope

### MVP - Minimum Viable Product (2-Week Prototype)
- **Authentication:** Google Sign-In (Restricted scope: `calendar.events`).
- **Web Uploader:** Simple responsive web page for file upload.
- **Extraction:** AI processing for Date, Title, Amount.
- **Scheduling:** Automatic Google Calendar event creation.
- **Cadence Logic:** Auto-calculation of T-30, T-10, T-1 reminder events.
- **Security:** Ephemeral file handling (delete immediately after process).

### Growth Features (Post-MVP)
- **Email Forwarding:** `forward@docbot.com` ingestion.
- **SMS Upload:** MMS image upload.
- **Multi-User:** SaaS account structure.
- **Dashboard:** History view of past uploads.

### Vision (Future)
- **Actionable Events:** "Pay Now" links directly inside calendar events.
- **Household Sharing:** Shared bills and responsibility tracking.
- **Proactive Discovery:** Scanning email inbox for missed bills (requires higher permissions).

## User Journeys

### Journey 1: The "Happy Path" (Michelle)
**Context:** Michelle receives a renewal notice in the mail. Usually, this would go into a pile of "to deal with later" and be forgotten.
- **Trigger:** She opens the envelope and sees "Due: Oct 15th".
- **Action:** She navigates to DocBot on her phone browser and taps "Upload". She snaps a photo.
- **System Response:** The spinner turns for 3 seconds. Then: "Success! Found Pet Insurance Renewal due Oct 15th. Added to Calendar."
- **Outcome:** Michelle feels instant relief. She didn't have to type anything. She closes the tab knowing she'll get a reminder in 30 days.

### Journey 2: The "Blurry Photo" (Edge Case)
**Context:** Michelle is in a rush and takes a blurry photo where the date is unreadable.
- **Action:** Uploads the blurry file.
- **System Analysis:** The extraction confidence score for "Due Date" is low (below 80%).
- **System Response:** Instead of guessing a wrong date, the UI shows: "I couldn't read the date. Please upload again."
- **Outcome:** Michelle retakes the photo. This time it succeeds. The system prevented a "silent failure" (scheduling the wrong date) which builds trust.

### Journey 3: The Builder (Admin/Maintenance)
**Context:** The Google OAuth token expires, causing uploads to fail.
- **Trigger:** Michelle texts you that "it's broken."
- **Action:** You log into the cloud console to view the application logs.
- **Analysis:** You see a clear error log: `Error: Refresh Token Expired`.
- **Resolution:** You restart the service with a new token.
- **Outcome:** System is back online. The error was traceable without a frontend dashboard.

### Journey Requirements Summary
- **Capability:** Mobile-responsive web upload with Camera access.
- **Capability:** Confidence threshold logic (If confidence < X%, reject upload).
- **Capability:** Error handling UI (simple user-friendly messages for failures).
- **Capability:** Backend logging infrastructure for debugging.

## Domain-Specific Requirements

### Liability & Disclaimers
- **Constraint:** System does not guarantee processing times.
- **Waiver:** Product includes terms stating "DocBot is a helper tool. The user is solely responsible for paying bills on time and verifying accuracy."
- **Non-Liability:** Not responsible for late fees incurred due to missed or inaccurate reminders.

### Localization & Financials
- **Currency:** MVP supports **USD ($)** only.
- **Handling:** All currency symbols are parsed; non-USD symbols may initially be treated as generic values or converted 1:1 (US-centric MVP).
- **Date Formats:** System prioritizes US date formats (MM/DD/YYYY).

### Data Privacy & Retention
- **Policy:** **Standard Best Practices**.
- **PII Retention:** Zero-retention for uploaded documents (deleted immediately after processing).
- **Metadata:** Only minimal metadata (timestamps, success/fail status) retained for logs; no sensitive content stored in logs.

## Project Type Specific Requirements (Web App)

### Project-Type Overview
- **Type:** Responsive Web Application (Mobile-First).
- **Architecture:** Client-Side SPA (Single Page App) with Serverless Backend.
- **Hosting:** Static Web Hosting + Serverless Functions (e.g., Vercel, Netlify, or AWS Amplify).

### Technical Architecture Considerations
- **Frontend Stack:** Vanilla HTML/JS or Lightweight Framework (e.g., React/Vue).
- **Backend Logic:** Serverless Functions (Node.js/Python) for orchestrating OCR and Google API calls.
- **Database:** **None**. Application is stateless.
- **Authentication:** **Google Identity Services SDK** (OAuth 2.0).
    - Scope: `https://www.googleapis.com/auth/calendar.events` (Write access to events).

### Browser & Device Support
- **Primary Target:** Mobile Web (iOS Safari, Android Chrome).
- **Camera Access:** Must support HTML5 File API (`<input type="file" capture>`) for direct camera access.
- **Performance:** Time-to-Interactive < 3 seconds on 4G networks.

### Implementation Considerations
- **CORS:** Backend must be configured to accept requests only from the production frontend domain.
- **Environment Variables:** API Keys (Google Client ID, OCR Secrets) must be strictly managed in serverless environment variables, NOT exposed in client-side code (except public Client ID).

## Project Scoping & Phased Development

### MVP Strategy & Philosophy
**MVP Approach:** "The Happy Path Prototype" (Speed to Value).
**Philosophy:** Minimize UI complexity to validate the core "Photo -> Calendar" value proposition. If the AI is accurate enough, editing is a secondary need.
**Resource Requirements:** 1 Developer (Full Stack), 2 Weeks.

### MVP Feature Set (Phase 1)
**Core User Journeys Supported:**
- Journey 1 (The Happy Path)
- Journey 3 (The Builder/Admin - via logs)

**Must-Have Capabilities:**
- **Auth:** Google Sign-In (Client-side).
- **Input:** Camera/File Upload UI.
- **Processing:** OCR Extraction (Date, Amount, Title).
- **Output:** Automatic Google Calendar Event Creation.
- **Feedback:** Simple Success/Failure Toasts.

### Post-MVP Features

**Phase 2 (Growth - "Robustness"):**
- **Edit Screen:** UI to manually correct extracted dates/amounts before saving.
- **Blurry Photo Handling:** Smart detection of low-quality images with "Re-upload" prompts (Journey 2).
- **Email Forwarding:** `forward@docbot.com` ingestion.

**Phase 3 (Expansion):**
- **Dashboard:** History view of past uploads.
- **Multi-User:** SaaS accounts.
- **Proactive Scanning:** Gmail read access.

### Risk Mitigation Strategy
- **Technical Risk:** *Accuracy is too low.*
    - **Mitigation:** Use high-quality OCR (e.g., GPT-4o-mini or dedicated OCR API) and provide immediate feedback.
- **Market Risk:** *User doesn't trust the bot.*
    - **Mitigation:** The "Visual Confidence" success metric—user checks GCal immediately to verify.
- **Resource Risk:** *Running out of time.*
    - **Mitigation:** Cut custom UI styling; used standard browser defaults or a lightweight CSS framework (e.g., Pico.css).

## Functional Requirements

### Authentication & Identity
- **FR01:** User can sign in using their Google Account.
- **FR02:** User can grant permission for DocBot to write to their Google Calendar.

### Document Ingestion
- **FR03:** User can select an image file from device storage.
- **FR04:** User can capture a photo directly using the device camera.
- **FR05:** System accepts standard image formats (JPG, PNG).

### Intelligence & Processing
- **FR06:** System extracts **Due Date**, **Total Amount**, and **Vendor Name** from the image.
- **FR07:** System calculates reminder notifications (T-30 days, T-10 days, T-1 day) based on Due Date.
- **FR08:** System rejects processing if "Due Date" confidence is below 80% (Blurry Photo fallback).

### Calendar Integration
- **FR09:** System creates an 'All Day' event on the extracted Due Date.
- **FR10:** System adds the Amount and Vendor to the Event Title/Description.
- **FR11:** System attaches the calculated 3 default reminders to the event.

### User Feedback
- **FR12:** User sees a visual "Processing" state during OCR.
- **FR13:** User sees a specific "Re-upload" error message if confidence is low.
- **FR14:** User sees a "Success" confirmation toast upon event creation.

### Privacy & Ops
- **FR15:** System permanently deletes the uploaded image immediately after processing.
- **FR16:** System logs critical failures (Auth/OCR errors) to backend logs (for Admin debugging).

## Non-Functional Requirements

### Performance
- **Upload Speed:** Image upload to server completes in **< 3 seconds** on 4G networks.
- **Processing Latency:** End-to-end (Upload -> Event Created) takes **< 30 seconds** (P95).

### Security
- **Zero Retention:** Server MUST delete image files immediately after OCR processing completes (or fails).
- **Least Privilege:** Google Auth Token stored in `httpOnly` secure cookie or in-memory only (never in `localStorage`).
- **Scope Limits:** Request ONLY `calendar.events` scope (No Drive/Mail access).

### Reliability
- **Fail Gracefully:** If Google API is down, show a specific error message ("Google Calendar is not responding"), not a generic crash.
- **No Auto-Retry:** Frontend does **not** auto-retry failed uploads (prevents OCR billing spikes). Users must manually retry.
