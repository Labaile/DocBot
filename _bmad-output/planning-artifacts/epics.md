---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments: ['prd.md', 'architecture.md', 'ux-design-specification.md']
---

# DocBot - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for DocBot, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

- **FR01:** User can sign in using their Google Account.
- **FR02:** User can grant permission for DocBot to write to their Google Calendar.
- **FR03:** User can select an image file from device storage.
- **FR04:** User can capture a photo directly using the device camera.
- **FR05:** System accepts standard image formats (JPG, PNG).
- **FR06:** System extracts **Due Date**, **Total Amount**, and **Vendor Name** from the image.
- **FR07:** System calculates reminder notifications (T-30 days, T-10 days, T-1 day) based on Due Date.
- **FR08:** System rejects processing if "Due Date" confidence is below 80% (Blurry Photo fallback).
- **FR09:** System creates an 'All Day' event on the extracted Due Date.
- **FR10:** System adds the Amount and Vendor to the Event Title/Description.
- **FR11:** System attaches the calculated 3 default reminders to the event.
- **FR12:** User sees a visual "Processing" state during OCR.
- **FR13:** User sees a specific "Re-upload" error message if confidence is low.
- **FR14:** User sees a "Success" confirmation toast upon event creation.
- **FR15:** System permanently deletes the uploaded image immediately after processing.
- **FR16:** System logs critical failures (Auth/OCR errors) to backend logs.

### NonFunctional Requirements

- **NFR1:** Image upload to server completes in **< 3 seconds** on 4G networks.
- **NFR2:** End-to-end processing (Upload -> Event Created) takes **< 30 seconds** (P95).
- **NFR3:** **Zero Retention:** Server MUST delete image files immediately after OCR processing (RAM-only stream).
- **NFR4:** Google Auth Token stored in secure HttpOnly cookie or in-memory only.
- **NFR5:** Request ONLY `calendar.events` scope (Least Privilege).
- **NFR6:** **Fail Gracefully:** Show specific error messages for API downtime.
- **NFR7:** No Auto-Retry for failed uploads.

### Additional Requirements

- **Starter Template:** `npx create-next-app@latest docbot --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`
- **Frontend Stack:** Next.js 16 (App Router), Tailwind CSS, Lucide React, Sonner (Toasts).
- **Backend Stack:** Next.js Route Handlers (Vercel Functions), Auth.js (v5), Zod.
- **UX Theme:** "Digital Lens" dark-mode (Electric Emerald, Deep Slate, Geist Fonts).
- **UX Components:** `LiveViewfinder` (HUD), `DataRevealSheet` (Bottom-drawer).
- **Interaction:** Haptic pulses for document lock and sync confirmation.
- **Responsive:** Mobile-only core (utility card centered on desktop).
- **Accessibility:** WCAG AA (7:1 contrast ratios), 48x48px touch targets.
- **CORS:** Strict backend policy (Production domain only).

### FR Coverage Map

- **FR01:** Epic 1 - Google Sign-In
- **FR02:** Epic 1 - Calendar Permissions
- **FR03:** Epic 2 - File Selection
- **FR04:** Epic 2 - Camera Capture
- **FR05:** Epic 2 - Image Format Support
- **FR06:** Epic 3 - Data Extraction (OCR)
- **FR07:** Epic 4 - Reminder Calculations
- **FR08:** Epic 3 - Confidence Thresholds
- **FR09:** Epic 4 - Calendar Event Creation
- **FR10:** Epic 4 - Event Details Enrichment
- **FR11:** Epic 4 - Default Reminders (T-30, etc.)
- **FR12:** Epic 2 - Processing Visual Feedback
- **FR13:** Epic 3 - Re-upload Guidance
- **FR14:** Epic 4 - Success Confirmation
- **FR15:** Epic 3 - Permanent Image Deletion
- **FR16:** Epic 1 - Failure Logging

## Epic List

### Epic 1: The Foundation (Auth & Environment)
Establish the secure environment and user identity required to interact with Google Services.
**FRs covered:** FR01, FR02, FR16.

### Story 1.1: Project Scaffolding & Next.js Initialization

As a developer,
I want to initialize the Next.js project with Tailwind and TypeScript,
So that I have a consistent, modern foundation for building DocBot.

**Acceptance Criteria:**

**Given** the development environment is ready
**When** I run the npx create-next-app command specified in the Architecture
**Then** the project is initialized with App Router, src/ directory, and Tailwind CSS
**And** the project builds successfully without linting errors

### Story 1.2: Google OAuth Configuration with Auth.js (v5)

As a user,
I want to sign in using my Google account,
So that the app can securely access my personal calendar.

**Acceptance Criteria:**

**Given** the project foundation is set up
**When** I click the "Sign in with Google" button
**Then** I am redirected to the standard Google OAuth consent screen
**And** upon successful login, I am redirected back to the DocBot home screen with an active session

### Story 1.3: Google Calendar Scope Authorization

As a user,
I want to grant DocBot permission to manage my calendar events,
So that it can automatically add my bills to my schedule.

**Acceptance Criteria:**

**Given** I am initiating the Google Sign-In flow
**When** the permission prompt appears
**Then** it specifically requests the `calendar.events` scope
**And** the app functions correctly only after permission is granted

### Story 1.4: Error Logging & Reliability Foundation

As an administrator,
I want to log critical service failures,
So that I can debug authentication or API issues remotely.

**Acceptance Criteria:**

**Given** a critical error occurs during Auth or API routing
**When** the system catches the failure
**Then** the error details (timestamp, code, message) are recorded in the server-side logs
**And** no sensitive user PII is ever included in the log entry


### Epic 2: The Lens (Ingestion & Capture)
Implement the core mobile-first camera interface and image ingestion logic using the "Digital Lens" UX patterns.
**FRs covered:** FR03, FR04, FR05, FR12.

### Story 2.1: Live Viewfinder UI & HUD Implementation

As a user,
I want a clear, technical-looking viewfinder with HUD overlays,
So that I know exactly how to align my document for high-accuracy OCR.

**Acceptance Criteria:**

**Given** a mobile device with camera permissions granted
**When** I launch the DocBot app
**Then** I see a full-screen camera feed with "Electric Emerald" HUD corners
**And** the interface follows the "Digital Lens" visual theme (dark mode, technical aesthetic)

### Story 2.2: Native Camera Capture Logic

As a user,
I want to tap a central button to capture a photo of my bill,
So that I can send it for processing immediately.

**Acceptance Criteria:**

**Given** the camera viewfinder is active
**When** I tap the primary "Capture" trigger
**Then** the current frame is captured as a high-resolution image
**And** the image is momentarily displayed or transitioned to the processing state

### Story 2.3: System File Ingestion Fallback

As a user,
I want to select an existing photo from my library,
So that I can process bills I've already photographed.

**Acceptance Criteria:**

**Given** I am on the main capture screen
**When** I select the "Upload File" secondary action
**Then** the native device file picker opens
**And** I can select standard JPG or PNG image formats for processing

### Story 2.4: Active Processing Visual State (Emerald Scanline)

As a user,
I want to see an animated "Scan" effect after snapping the photo,
So that I know the app is actively analyzing my document.

**Acceptance Criteria:**

**Given** an image has been captured or uploaded
**When** the OCR processing begins
**Then** an animated emerald scanline moves across the viewfinder area
**And** a mono-font status message says "Processing..."


### Epic 3: The Intelligence (OCR & Extraction)
Implement the "Brain" of the operation—converting pixels into structured bill data with a strict zero-retention privacy policy.
**FRs covered:** FR06, FR08, FR13, FR15.

### Story 3.1: Stateless OCR Pipeline Implementation

As a system,
I want to extract Vendor, Due Date, and Amount from the image in-memory,
So that I can fulfill the zero-retention privacy promise.

**Acceptance Criteria:**

**Given** a valid image stream from the frontend
**When** the image is processed by the serverless handler
**Then** it accurately extracts Vendor, Due Date (ISO-8601), and Amount
**And** the entire processing occurs in RAM without any disk writes

### Story 3.2: Confidence Threshold & Blurry Image Handling

As a user,
I want to be warned if my photo is too blurry to read accurately,
So that I don't accidentally schedule an event with the wrong date.

**Acceptance Criteria:**

**Given** a captured image with low visual clarity
**When** the OCR confidence score falls below 80%
**Then** the extraction fails with a specific `ERR_LOW_CONFIDENCE` code
**And** the user is prompted with a helpful "Re-upload" guide

### Story 3.3: "Data Reveal" Verification Sheet

As a user,
I want to see and verify the extracted bill details before they are saved,
So that I maintain absolute control over my calendar data.

**Acceptance Criteria:**

**Given** the OCR extraction is successful
**When** the data returns to the client
**Then** the `DataRevealSheet` slides up from the bottom
**And** the user can review and manually edit the Due Date or Amount if needed

### Story 3.4: Automated Image Purge (Zero-Retention)

As a privacy-conscious user,
I want my bill image deleted immediately after the data is extracted,
So that my sensitive financial information is never stored.

**Acceptance Criteria:**

**Given** the extraction process has completed (success or failure)
**When** the memory buffer is released
**Then** no temporary file remains on the server
**And** the UI displays an "Image Purged" visual confirmation


### Epic 4: The Handoff (Calendar & Notifications)
Finalize the loop by automating the calendar entry and multi-stage reminders (T-30, T-10, T-1).
**FRs covered:** FR07, FR09, FR10, FR11, FR14.

### Story 4.1: Google Calendar Event Creation Logic

As a user,
I want my bill details to appear as a calendar event,
So that I have a permanent digital record of the due date.

**Acceptance Criteria:**

**Given** the user has confirmed the extracted data
**When** the "Confirm & Schedule" button is pressed
**Then** an 'All Day' event is created on the user's Google Calendar for the specific Due Date
**And** the event title contains the Vendor name and Amount (e.g., "DocBot: $150.00 Comcast Bill")

### Story 4.2: Triple-Reminder Logic (T-30, T-10, T-1)

As a busy user,
I want to be reminded 30, 10, and 1 day before the due date,
So that I never incur late fees by forgetting a bill.

**Acceptance Criteria:**

**Given** a new bill event is being created
**When** the calendar API call is constructed
**Then** three default reminders are attached (30 days, 10 days, and 1 day before the event)
**And** the reminders appear correctly in the user's Google Calendar notification settings

### Story 4.3: "Sync Celebration" & Success Feedback

As a user,
I want a clear, rewarding confirmation when the sync is successful,
So that I feel a sense of accomplishment and closure for the task.

**Acceptance Criteria:**

**Given** the Google Calendar API returns a success status
**When** the frontend receive the confirmation
**Then** the "Magical Glass" success overlay is displayed with an emerald checkmark
**And** (if supported) the device triggers a short haptic "thump" vibration

### Story 4.4: Graceful API & Sync Failure Handling

As a user,
I want to know exactly why a sync failed (e.g., "Google Calendar is down"),
So that I can try again later without frustration.

**Acceptance Criteria:**

**Given** the Google Calendar API returns an error or is unreachable
**When** the sync attempt fails
**Then** the user is presented with a specific error toast (e.g., "Google Calendar not responding")
**And** no data is persisted in a failed or partial state

