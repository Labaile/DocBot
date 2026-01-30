import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createBillEvent } from '@/lib/google-calendar';
import { withErrorHandling } from '@/lib/api-utils';
import { logger } from '@/lib/logger';

export const POST = withErrorHandling(async (req: Request) => {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      { success: false, error: { code: 'UNAUTHORIZED', message: 'You must be signed in.' } },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { vendor, amount, dueDate, confidence } = body;

  if (!vendor || !amount || !dueDate) {
    return NextResponse.json(
      { success: false, error: { code: 'MISSING_DATA', message: 'Vendor, amount, and due date are required.' } },
      { status: 400 }
    );
  }

  logger.info('Creating calendar event', {
    userId: session.user?.id,
    vendor,
    amount,
    dueDate
  });

  try {
    const eventId = await createBillEvent({
      vendor,
      amount,
      dueDate,
      confidence
    });

    logger.info('Calendar event created successfully', {
      eventId,
      vendor
    });

    return NextResponse.json({
      success: true,
      data: {
        eventId,
        message: 'Bill reminder added to your calendar'
      },
      error: null
    });
  } catch (error: any) {
    logger.error('Calendar sync failed', error);

    // Handle specific Google API errors
    if (error.code === 401 || error.code === 403) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'AUTH_FAILED',
            message: 'Calendar permission denied. Please sign in again.'
          }
        },
        { status: 403 }
      );
    }

    if (error.code === 429) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RATE_LIMIT',
            message: 'Too many requests. Please try again in a moment.'
          }
        },
        { status: 429 }
      );
    }

    throw error; // Rethrow for generic error handling
  }
});
