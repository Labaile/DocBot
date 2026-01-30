import { createWorker } from 'tesseract.js';

export interface ExtractedBillData {
  vendor: string;
  amount: string;
  dueDate: string;
  rawText: string;
  confidence: number;
}

const CONFIDENCE_THRESHOLD = 70;

/**
 * Processes an image buffer and extracts bill-related information.
 * Adheres to NFR3: Zero Retention (RAM only).
 */
export async function extractBillData(imageBuffer: Buffer): Promise<ExtractedBillData> {
  const worker = await createWorker('eng');

  try {
    const { data: { text, confidence } } = await worker.recognize(imageBuffer);

    if (confidence < CONFIDENCE_THRESHOLD) {
      const error: any = new Error('Confidence below threshold');
      error.code = 'ERR_LOW_CONFIDENCE';
      throw error;
    }

    const result = parseBillText(text);

    // AC 3.2.5: Treat missing critical fields as low confidence failure
    if (result.amount === 'Unknown' || result.dueDate === 'Unknown') {
      const error: any = new Error('Critical fields missing or unreadable');
      error.code = 'ERR_LOW_CONFIDENCE';
      throw error;
    }

    return {
      ...result,
      confidence
    };
  } finally {
    await worker.terminate();
  }
}

function parseBillText(text: string): Omit<ExtractedBillData, 'confidence'> {
  const lines = text.split('\n');

  // Basic patterns (to be refined in Epic 3.2)
  const amountRegex = /(?:total|amount|due|pay)\s*:?\s*\$?\s*(\d+[\.,]\d{2})/i;
  const dateRegex = /(?:due|date|by)\s*:?\s*(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/i;

  let amount = 'Unknown';
  let dueDate = 'Unknown';
  let vendor = 'Unknown';

  // Amount extraction
  const amountMatch = text.match(amountRegex);
  if (amountMatch) {
    amount = amountMatch[1];
  }

  // Date extraction
  const dateMatch = text.match(dateRegex);
  if (dateMatch) {
    dueDate = dateMatch[1];
  }

  // Vendor extraction (simple heuristic: first non-empty line that isn't purely numeric)
  for (const line of lines) {
    const cleanLine = line.trim();
    if (cleanLine.length > 3 && !/^[\d\s\W]+$/.test(cleanLine)) {
      vendor = cleanLine;
      break;
    }
  }

  return {
    vendor,
    amount,
    dueDate,
    rawText: text
  };
}
