import { NextResponse } from 'next/server';
import { logger } from './logger';

export type ApiHandler = (req: Request, context: any) => Promise<NextResponse> | NextResponse;

/**
 * Wraps a Next.js Route Handler with consistent error logging and response formatting.
 */
export function withErrorHandling(handler: ApiHandler) {
  return async (req: Request, context: any) => {
    try {
      return await handler(req, context);
    } catch (error) {
      const url = new URL(req.url);
      const path = url.pathname;

      logger.error(`API Error in ${path}`, error, {
        method: req.method,
        path: path
      });

      return NextResponse.json(
        {
          error: 'Internal Server Error',
          message: process.env.NODE_ENV === 'development' ? String(error) : 'An unexpected error occurred.'
        },
        { status: 500 }
      );
    }
  };
}
