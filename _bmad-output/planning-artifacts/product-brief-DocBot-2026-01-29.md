---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: []
date: 2026-01-29
author: Labaile
---

# Product Brief: DocBot

<!-- Content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

DocBot is an automated "financial safety net" designed to eliminate missed deadlines and late fees by transforming document uploads into actionable calendar events with zero friction. For individuals who struggle with manual tracking or cognitive load (such as ADHD), DocBot provides a reliable system that extracts critical dates from uploaded files and automatically schedules them with a custom reminder cadence. It handles sensitive documents like legal notices, renewals, and invoices with precision, ensuring peace of mind and financial security.

---

## Core Vision

### Problem Statement
Managing document-based deadlines (invoices, renewals, legal notices) requires tedious manual data entry and constant vigilance. For many, especially those with ADHD or high cognitive load, this process is prone to error and forgetfulness, leading to missed dates, financial penalties, and lost opportunities.

### Problem Impact
- **Financial Loss:** Late fees, interest charges, and missed renewal savings.
- **Mental Burden:** Constant low-level stress from trying to remember dates or fear of missing something important.
- **Opportunity Cost:** Losing out on benefits or rights due to expired deadlines.

### Why Existing Solutions Fall Short
- **Manual Friction:** Standard calendars require users to manually type in dates and details, which is a barrier to entry.
- **Lack of "Nagging":** Typical apps set a single reminder, whereas high-stakes deadlines require a specific countdown cadence (e.g., 30 days out, 10 days out, 1 day out) to ensure action.
- **Generic Handling:** They treat a bill the same as a birthday, lacking the urgency and specialized handling needed for financial or legal documents.

### Proposed Solution
A "Zero-Friction" bot that automates the entire lifecycle of a deadline:
1.  **Upload & Forget:** User simply uploads a document (PDF, image).
2.  **Smart Extraction:** The bot parses the document for due dates and amounts.
3.  **Auto-Scheduling:** Creates a Google Calendar event with all details.
4.  **Custom Cadence:** Automatically sets a series of reminders (e.g., 30/10/1 days before) to ensure the user is notified effectively.

### Key Differentiators
- **Zero-Friction Workflow:** The only user action is "Upload." No typing, no configuring each time.
- **Custom Reminder Cadence:** Built-in "nagging" protocols (30/10/1 day) that standard calendars don't automate by default.
- **High-Stakes Precision:** specifically optimized for invoices, renewals, and legal notices where accuracy is non-negotiable.

## Target Users

### Primary Users: "Michelle"
**Context:** Michelle is intelligent and capable but lives with Narcolepsy and ADHD. Her energy levels are unpredictable, and her executive function (planning, organizing, initiating tasks) is often compromised. She deals with "paperwork paralysis" where tasks requiring multi-step processing (reading, understanding, filling out, submitting) become overwhelming barriers.

**Problem Experience:**
- **The "Wall of Awful":** Complex documents (like insurance claims or legal notices) feel impossible to tackle all at once.
- **The Cost of inaction:** She recently lost hundreds of dollars because she missed a deadline to submit her dog's pet insurance claim. It wasn't that she didn't have the money to pay the vet—it was that she couldn't get the paperwork done in time to get reimbursed.
- **Shame & Frustration:** She feels deep frustration when disability symptoms lead to financial loss, knowing it was "preventable" if she had just had the right support.

**Success Vision:**
- **Automated Triage:** A system that reads the document *for her* and says, "Here's what matters."
- **Chunking Support:** Instead of a single "Do this by Friday" reminder, she gets smaller, manageable prompts: "Today, just fill out page 1."
- **Safety Net:** The peace of mind that a bot is tracking the deadline so she doesn't have to hold it in her head.

### User Journey

**1. Discovery & Crisis Prevention**
Michelle is stressed about an upcoming renewal or claim form she needs to submit. She remembers the frustration of the last missed deadline and decides to try DocBot.

**2. The "Dump" (Onboarding)**
She takes a photo of the intimidating insurance form and uploads it to DocBot.
*Immediate Value:** The bot acknowledges receipt and confirms: "I see this is a Pet Insurance Claim due by Oct 15th." (Cognitive load lifted).

**3. "Smart Nagging" (Core Usage)**
Instead of one big deadline, DocBot starts the countdown:
- **T-30 Days:** "Heads up, claim due in a month. Just review the first page today."
- **T-15 Days:** "Time to find those receipts. Upload them here."
- **T-3 Days:** "Almost there! Submit the form by Friday."

**4. Success Moment**
Michelle submits the claim on time. She gets the reimbursement check. The feeling isn't just relief—it's empowerment. "I didn't let my condition cost me money this time."

## Success Metrics

### User Success (Michelle's Perspective)
- **The "One Win" Metric:** Michelle successfully submits **one** major document (like a renewal or claim) BEFORE the deadline using the bot's reminders.
- **Visual Confidence:** She can open her Google Calendar and *see* the deadline and reminder blocks populated accurately from her uploaded file.
- **Completion Rate:** Moving from 0% (avoidance) to 100% completion on a single tracked item.

### Business Objectives (Builder's Perspective)
- **Speed to Value:** A fully functional working prototype (upload -> extract -> calendar event) within **2 weeks**.
- **Accuracy:** The bot correctly extracts the *due date* and *context* from the document without manual correction.

### Key Performance Indicators
- **Prototype Readiness:** Working system by [Date + 2 weeks].
- **Extraction Accuracy:** 90%+ accuracy on date extraction from standard PDF/Image documents.
- **User Trust Signal:** User does NOT manually add a duplicate calendar event (indicating trust in the bot's work).

## MVP Scope

### Core Features (Two-Week Prototype)
- **Authentication:** Google Sign-In to securely authenticate Michelle and grant access to HER personal calendar. (Zero access to other data).
- **Web Uploader:** A simple, mobile-friendly webpage where Michelle can upload a file (PDF/Image) with one click.
- **AI Extraction Engine:** Backend service that processes the file to extract:
    - Document Title (e.g., "Pet Insurance Claim")
    - Due Date
    - Key Context (e.g., "Amount due: $250").
- **Smart Scheduling:** Automatically creating the Google Calendar Event on the due date.
- **Cadence Automation:** Automatically adding "Preparation" events at T-30, T-10, and T-1 days before the due date.

### Out of Scope for MVP
- **Payment Processing:** No subscription or payment handling; free tool for now.
- **History Dashboard:** No UI to see "past uploads." The Google Calendar *is* the UI.
- **Email/SMS Ingestion:** Sticking to web upload for the prototype (simpler to build/secure quickly).
- **Multi-Tenancy Scale:** Building specifically for you and Michelle first, not a SaaS platform yet.

### MVP Success Criteria
- **Functional:** Michelle can sign in, upload a pdf, and see the event appear on her phone's calendar within 30 seconds.
- **Helpful:** The "T-30 Day" reminder appears correctly calculated from the due date.

### Future Vision
- **Omnichannel:** Email forwarding ("forward receipt to bot@docbot.com") and SMS uploads.
- **Action Buttons:** "Pay Now" links directly in the calendar event.
- **Family/Team Sharing:** Shared calendars for household bills.
