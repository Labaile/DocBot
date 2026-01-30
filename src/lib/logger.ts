type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  error?: {
    message: string;
    stack?: string;
    code?: string;
  };
}

/**
 * Strips sensitive information from objects to ensure PII is never logged.
 */
function sanitize(obj: any): any {
  if (!obj || typeof obj !== 'object') return obj;

  const sensitiveKeys = ['email', 'password', 'token', 'accessToken', 'secret', 'auth', 'image'];
  const sanitized = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk.toLowerCase()))) {
      (sanitized as any)[key] = '[REDACTED]';
    } else if (typeof obj[key] === 'object') {
      (sanitized as any)[key] = sanitize(obj[key]);
    } else {
      (sanitized as any)[key] = obj[key];
    }
  }

  return sanitized;
}

export const logger = {
  info: (message: string, context?: Record<string, any>) => {
    log('info', message, context);
  },
  warn: (message: string, context?: Record<string, any>) => {
    log('warn', message, context);
  },
  error: (message: string, error?: unknown, context?: Record<string, any>) => {
    const errorData = error instanceof Error ? {
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    } : { message: String(error) };

    log('error', message, context, errorData);
  }
};

function log(level: LogLevel, message: string, context?: Record<string, any>, error?: any) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    context: context ? sanitize(context) : undefined,
    error: error ? sanitize(error) : undefined,
  };

  // Standard JSON output for cloud logging systems (Vercel, GCP, etc.)
  if (process.env.NODE_ENV === 'production') {
    console.log(JSON.stringify(entry));
  } else {
    const color = level === 'error' ? '\x1b[31m' : level === 'warn' ? '\x1b[33m' : '\x1b[32m';
    const reset = '\x1b[0m';
    console.log(`${color}[${entry.level.toUpperCase()}]${reset} ${entry.message}`, entry.context || '', entry.error || '');
  }
}
