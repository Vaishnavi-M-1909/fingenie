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

export interface BankAccountMeta {
  accountHolderName?: string;
  accountNumber?: string;
  ifscCode?: string;
  bankName?: string;
  branch?: string;
  customerId?: string;
  statementPeriod?: {
    from?: string;
    to?: string;
  };
}

export interface ParseResult {
  transactions: ParsedTransaction[];
  errors: ParserError[];
  metadata: {
    totalRows: number;
    parsedRows: number;
    failedRows: number;
    bankName?: string;
    bankAccountMeta?: BankAccountMeta;
  };
}

export interface ParserError {
  line: number;
  rawText: string;
  reason: string;
}
