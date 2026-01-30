import { google } from 'googleapis';
import { auth } from '@/auth';

export interface CalendarEventData {
  vendor: string;
  amount: string;
  dueDate: string;
  confidence?: number;
}

/**
 * Creates a Google Calendar event for a bill payment reminder.
 * Adheres to NFR5: Least Privilege (calendar.events scope only).
 */
export async function createBillEvent(eventData: CalendarEventData): Promise<string> {
  const session = await auth();

  if (!session?.accessToken) {
    throw new Error('No valid session or access token');
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: session.accessToken as string,
  });

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  // Parse the due date (assuming format like "12/31/2024" or "12-31-2024")
  const parsedDate = parseDueDate(eventData.dueDate);

  const event = {
    summary: `DocBot: $${eventData.amount} - ${eventData.vendor}`,
    description: `Bill payment reminder\n\nVendor: ${eventData.vendor}\nAmount: $${eventData.amount}\nDue Date: ${eventData.dueDate}\n\nExtraction Confidence: ${eventData.confidence || 'N/A'}%`,
    start: {
      date: parsedDate, // All-day event format: YYYY-MM-DD
    },
    end: {
      date: parsedDate,
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'popup', minutes: 43200 }, // 30 days (30 * 24 * 60)
        { method: 'popup', minutes: 14400 }, // 10 days
        { method: 'popup', minutes: 1440 },  // 1 day
      ],
    },
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
  });

  return response.data.id || 'unknown';
}

/**
 * Parses various date formats into ISO 8601 date string (YYYY-MM-DD).
 */
function parseDueDate(dateString: string): string {
  // Handle formats: MM/DD/YYYY, MM-DD-YYYY, M/D/YY, etc.
  const parts = dateString.split(/[\/-]/);

  if (parts.length !== 3) {
    throw new Error(`Invalid date format: ${dateString}`);
  }

  let [month, day, year] = parts;

  // Handle 2-digit years
  if (year.length === 2) {
    const currentYear = new Date().getFullYear();
    const century = Math.floor(currentYear / 100) * 100;
    year = String(century + parseInt(year));
  }

  // Pad month and day with leading zeros
  month = month.padStart(2, '0');
  day = day.padStart(2, '0');

  return `${year}-${month}-${day}`;
}
