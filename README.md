# FinGenie

FinGenie is a comprehensive financial operating system designed for young professionals. It provides automated bank statement analysis, spending insights, and a curated learning hub to help users achieve financial independence.

## Core Features

- **Automated Registry**: Upload bank statements (PDF/CSV) or receipts (IMG) for AI-powered data extraction.
- **Financial Intelligence**: A conversational assistant that analyzes your spending patterns and provides actionable advice.
- **Learning Journey**: A curated library of verified financial resources, including videos from top educators and classic personal finance books.
- **Financial Vault**: A secure audit trail of all uploaded documents and their extracted transaction history.
- **Health Scoring**: Dynamic financial health scores based on spending variability, diversity, and subscription burden.

## Technical Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: Supabase Auth
- **AI Engine**: OpenRouter (opensource models) for document parsing and chat intelligence
- **Storage**: Supabase Storage for encrypted document handling

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

### 3. Database Initialization

```bash
npx prisma generate
npx prisma db push
npm run seed
```

### 4. Development

```bash
npm run dev
```

## Seed Data

To populate the learning resource library with verified financial content:

```bash
npx tsx scripts/seed-resources.ts
```
