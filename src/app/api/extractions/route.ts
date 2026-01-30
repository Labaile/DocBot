import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { extractBillData } from '@/lib/ocr-processor';
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

  const formData = await req.formData();
  const file = formData.get('image') as File;

  if (!file) {
    return NextResponse.json(
      { success: false, error: { code: 'MISSING_FILE', message: 'No image file provided.' } },
      { status: 400 }
    );
  }

  logger.info('Processing new document extraction request', {
    userId: session.user?.id,
    fileName: file.name,
    fileSize: file.size
  });

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const data = await extractBillData(buffer);

    logger.info('Extraction successful', {
      vendor: data.vendor,
      hasAmount: data.amount !== 'Unknown',
      hasDate: data.dueDate !== 'Unknown',
      confidence: data.confidence
    });

    return NextResponse.json({
      success: true,
      data: {
        vendor: data.vendor,
        amount: data.amount,
        dueDate: data.dueDate,
        confidence: data.confidence
      },
      error: null
    });
  } catch (error: any) {
    if (error.code === 'ERR_LOW_CONFIDENCE') {
      logger.warn('Extraction blocked: Low confidence score', {
        userId: session.user?.id
      });
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ERR_LOW_CONFIDENCE',
            message: 'Vision unclear. Please ensure document is flat and well-lit.'
          }
        },
        { status: 422 }
      );
    }
    logger.error('Extraction failed', error);
    throw error; // Rethrow to let withErrorHandling handle it
  } finally {
    logger.info('In-memory image buffer purged');
  }
});
