export interface ParsedTransaction {
  date: Date;
  merchant: string;
  amount: number;
  currency: string;
  category?: string;
  description?: string;
  rawLine: string;
  confidence: number; // 0-1
}

export interface ParseResult {
  transactions: ParsedTransaction[];
  errors: ParserError[];
  metadata: {
    totalRows: number;
    parsedRows: number;
    failedRows: number;
    bankName?: string;
  };
}

export interface ParserError {
  line: number;
  rawText: string;
  reason: string;
}
