# FinGenie — Technical Documentation

> **FinGenie** is an AI-powered personal finance operating system for young adults (18–24) in India. Users upload bank statements, receive AI-driven spending insights, chat with an intelligent financial assistant, and access curated learning resources—all through a brutalist-editorial UI.

---

## Table of Contents

1. [User Flow](#1-user-flow)
2. [System Architecture](#2-system-architecture)
3. [Database Schema](#3-database-schema)
4. [API Route Map](#4-api-route-map)
5. [Core Feature Deep Dives](#5-core-feature-deep-dives)
6. [Technical Specifications](#6-technical-specifications)
7. [Security Model](#7-security-model)
8. [Deployment Architecture](#8-deployment-architecture)

---

## 1. User Flow

### 1.1 End-to-End User Journey

```mermaid
flowchart TD
    A["Landing Page"] --> B{"Authenticated?"}
    B -- No --> C["Login Page"]
    C --> D["Google OAuth via Supabase"]
    D --> E["Auth Callback /auth/callback"]
    E --> F["Upsert User in PostgreSQL"]
    F --> G{"Has Bank Account?"}
    B -- Yes --> G

    G -- No --> H["Setup Bank Account Page"]
    H --> I["Register Bank Details"]
    I --> J["Dashboard"]
    G -- Yes --> J

    J --> K["Upload Statement"]
    J --> L["View Transactions (Ledger)"]
    J --> M["AI Assistant (Intelligence)"]
    J --> N["View Insights"]
    J --> O["Document Vault"]
    J --> P["Learning Academy"]
    J --> Q["Settings / Config"]

    K --> K1["Select File (CSV/PDF/Image)"]
    K1 --> K2["Parse & Extract Transactions"]
    K2 --> K3["Validate Against Bank Account"]
    K3 --> K4["Store Transactions in DB"]
    K4 --> J

    M --> M1["Send Text/Image Message"]
    M1 --> M2["Fetch Transaction Context"]
    M2 --> M3["Detect @flags for Resources"]
    M3 --> M4["Call OpenRouter AI"]
    M4 --> M5["Display Response + Recommendations"]

    N --> N1["Select Month"]
    N1 --> N2["Generate AI Insights via OpenRouter"]
    N2 --> N3["Display Summary, Actions, Score"]

    style A fill:#1a1a1a,color:#fff,stroke:#333
    style J fill:#0066ff,color:#fff,stroke:#003399
    style K fill:#2d2d2d,color:#fff
    style M fill:#2d2d2d,color:#fff
    style N fill:#2d2d2d,color:#fff
```

### 1.2 Authentication Flow

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant Supabase as Supabase Auth
    participant Callback as /auth/callback
    participant Middleware as Next.js Middleware
    participant Auth as getUser()
    participant DB as PostgreSQL (Prisma)

    User->>Browser: Click "Sign in with Google"
    Browser->>Supabase: OAuth redirect
    Supabase-->>Browser: Redirect to /auth/callback?code=...
    Browser->>Callback: GET /auth/callback
    Callback->>Supabase: Exchange code for session
    Supabase-->>Callback: Session tokens
    Callback-->>Browser: Redirect to /dashboard

    Note over Middleware: Every request passes through middleware
    Browser->>Middleware: Request to protected route
    Middleware->>Supabase: Validate/refresh session
    Middleware-->>Browser: Allow or redirect to /login

    Note over Auth: API routes call getUser()
    Auth->>Supabase: supabase.auth.getUser()
    Supabase-->>Auth: Supabase user object
    Auth->>DB: prisma.user.upsert(email)
    DB-->>Auth: Prisma User record
```

### 1.3 Monthly Reminder Flow

```mermaid
sequenceDiagram
    participant Vercel as Vercel Cron
    participant API as /api/cron/monthly-reminder
    participant DB as PostgreSQL
    participant Resend as Resend Email API
    participant User as User Inbox
    participant App as FinGenie App
    participant Popup as In-App Reminder

    Note over Vercel: 1st of every month at 00:00 UTC
    Vercel->>API: GET /api/cron/monthly-reminder
    API->>DB: Find users with monthlyReminder=true
    DB-->>API: List of opted-in users
    loop For each user
        API->>Resend: Send email reminder
        Resend-->>User: "Time for Audit" email
    end
    API-->>Vercel: 200 OK

    Note over App: On page load (client-side)
    App->>App: Check if 1st of month
    App->>Popup: Show BankStatementReminder modal
    User->>Popup: "Upload Now" or dismiss
```

---

## 2. System Architecture

### 2.1 High-Level Architecture

```mermaid
graph TB
    subgraph Client["Client — Browser"]
        UI["Next.js 16 App (React 19)"]
        RQ["React Query"]
        Charts["Recharts"]
        MD["React Markdown"]
    end

    subgraph Server["Next.js Server — Vercel"]
        API["API Route Handlers"]
        MW["Middleware (Auth Guard)"]
        Parsers["File Parsers"]
        AI["OpenRouter Integration"]
        Email["Resend Email Service"]
    end

    subgraph Data["Data Layer"]
        Prisma["Prisma ORM v7"]
        PG["PostgreSQL (Supabase)"]
        Storage["Supabase Storage (finGenie-bucket)"]
    end

    subgraph External["External Services"]
        Supabase["Supabase Auth (Google OAuth)"]
        OpenRouter["OpenRouter API (arcee-ai/trinity)"]
        ResendSvc["Resend (Email Delivery)"]
        VercelCron["Vercel Cron Jobs"]
    end

    UI --> RQ
    RQ --> API
    UI --> Charts
    UI --> MD
    MW --> Supabase
    API --> Prisma
    Prisma --> PG
    API --> Storage
    API --> AI
    AI --> OpenRouter
    API --> Email
    Email --> ResendSvc
    VercelCron --> API
    Parsers --> API
```

### 2.2 File Parsing Pipeline

```mermaid
flowchart LR
    Upload["File Upload"] --> Detect{"Detect Format"}

    Detect -- .csv --> CSV["csv-parser.ts"]
    Detect -- .pdf --> PDF["pdf-parser.ts"]
    Detect -- ".jpg/.png" --> IMG["image-parser.ts"]

    CSV --> Norm["normalizer.ts"]
    PDF --> Norm
    IMG --> OCR["OpenRouter Vision API"] --> Norm

    Norm --> Output["Normalized Transactions[]"]
    Output --> Meta["Extract Bank Metadata"]
    Meta --> Validate{"Match User's\nBank Account?"}
    Validate -- Yes --> Save["Save to DB"]
    Validate -- No --> Reject["Reject Upload"]

    style Upload fill:#0066ff,color:#fff
    style Save fill:#00aa44,color:#fff
    style Reject fill:#cc3333,color:#fff
```

---

## 3. Database Schema

### 3.1 Entity-Relationship Diagram

```mermaid
erDiagram
    User ||--o{ BankAccount : "has many"
    User ||--o{ Statement : "uploads"
    User ||--o{ Transaction : "owns"
    User ||--o{ Chat : "sends/receives"
    User ||--o{ Insight : "gets"
    User ||--o{ ResourceInteraction : "interacts"

    BankAccount ||--o{ Statement : "linked to"

    Statement ||--o{ Transaction : "contains"
    Statement ||--o{ Insight : "analyzed in"

    LearningResource ||--o{ ResourceInteraction : "tracked by"

    User {
        string id PK "cuid()"
        string email UK "unique"
        string name "nullable"
        string avatarUrl "nullable"
        boolean monthlyReminder "default: false"
        datetime createdAt
    }

    BankAccount {
        string id PK "cuid()"
        string userId FK
        string accountHolderName
        string accountNumber
        string ifscCode "nullable"
        string bankName
        string branch "nullable"
        datetime createdAt
    }

    Statement {
        string id PK "cuid()"
        string userId FK
        string bankAccountId FK "nullable"
        string filePath "Supabase Storage path"
        string originalFilename
        string status "queued | parsing | done | failed"
        json meta "parsing metadata"
        datetime uploadedAt
    }

    Transaction {
        string id PK "cuid()"
        string userId FK
        string statementId FK "nullable"
        datetime date
        string merchant
        float amount "negative = expense"
        string currency "default: INR"
        string category "nullable"
        string description "nullable"
        string rawLine "original parsed line"
    }

    Chat {
        string id PK "cuid()"
        string userId FK
        string role "user | assistant"
        string content
        string imageUrl "nullable"
        json recommendations "nullable"
        datetime createdAt
    }

    Insight {
        string id PK "cuid()"
        string userId FK
        string statementId FK "nullable"
        string month "e.g. 2026-03"
        int score "health score 0-100"
        string summary
        json recommendations
        datetime createdAt
    }

    MerchantMap {
        string id PK "cuid()"
        string normalizedName UK
        string category
        string createdBy "default: system"
    }

    LearningResource {
        string id PK "cuid()"
        string title
        string description
        string type "VIDEO | ARTICLE | BOOK"
        string category
        string url
        string thumbnailUrl "nullable"
        string author "nullable"
        string[] tags "default: []"
        datetime createdAt
    }

    ResourceInteraction {
        string id PK "cuid()"
        string userId FK
        string resourceId FK
        string type "CLICK | VIEW | COMPLETE"
        datetime interactedAt
    }
```

### 3.2 Key Database Design Decisions

| Decision | Rationale |
|---|---|
| **User ID = Supabase Auth ID** | The `user.id` in Prisma is set to the Supabase auth user ID via `getUser()` upsert, ensuring a 1:1 mapping. |
| **Negative amounts = expenses** | Transactions with `amount < 0` are treated as expenses. Positive amounts in expense categories are also caught (legacy data handling). |
| **Composite unique on BankAccount** | `@@unique([userId, accountNumber])` prevents a user from registering the same account twice. |
| **Statement to BankAccount linking** | Bank account is auto-matched during upload by checking extracted account number against registered accounts. |
| **MerchantMap for normalization** | A lookup table that maps raw merchant strings to clean names and categories, used during CSV/PDF parsing. |
| **JSON fields for flexibility** | `Statement.meta`, `Chat.recommendations`, `Insight.recommendations` store variable-structure data without schema migration. |
| **Indexes on foreign keys + date** | All `userId` FKs and `Transaction.date` are indexed for fast filtered queries by user and time range. |

---

## 4. API Route Map

### 4.1 Route Overview

```mermaid
graph LR
    subgraph Auth["Auth"]
        R1["/auth/callback"]
        R2["/api/user/notifications"]
        R3["/api/delete-account"]
    end

    subgraph Core["Core Data"]
        R4["/api/bank-account"]
        R5["/api/bank-account/:id"]
        R6["/api/upload"]
        R7["/api/transactions"]
        R8["/api/transactions/:id/category"]
    end

    subgraph Analytics["Analytics"]
        R9["/api/dashboard"]
        R10["/api/insights/generate"]
    end

    subgraph Intelligence["Intelligence"]
        R11["/api/chat"]
        R12["/api/chat/:id"]
        R13["/api/chat/context"]
        R14["/api/recommendations"]
    end

    subgraph Storage["Vault"]
        R15["/api/vault"]
        R16["/api/vault/:id"]
        R17["/api/vault/file/:id"]
        R18["/api/vault/wipe"]
    end

    subgraph Automation["Automation"]
        R19["/api/cron/monthly-reminder"]
    end
```

### 4.2 Detailed Route Table

| Route | Method | Description |
|---|---|---|
| `/auth/callback` | GET | Exchanges OAuth code for Supabase session, redirects to dashboard |
| `/api/user/notifications` | GET/PUT | Read and update user notification preferences (`monthlyReminder`) |
| `/api/delete-account` | DELETE | Permanently deletes user account and all associated data |
| `/api/bank-account` | GET/POST | List user's bank accounts; register a new bank account |
| `/api/bank-account/[id]` | PUT/DELETE | Update or remove a specific bank account |
| `/api/upload` | POST | Upload bank statement (CSV/PDF/Image), parse, validate, and store transactions |
| `/api/transactions` | GET | Fetch transactions with month and bank account filters |
| `/api/transactions/[id]/category` | PATCH | Update the category of a specific transaction |
| `/api/dashboard` | GET | Aggregated analytics: totals, categories, daily timeline, merchants, health score, recommendations |
| `/api/insights/generate` | GET/POST | GET = fetch saved insights; POST = generate new AI insights for a month |
| `/api/chat` | GET/POST | GET = fetch chat history; POST = send message, get AI response |
| `/api/chat/[id]` | DELETE | Delete a specific chat message |
| `/api/chat/context` | GET | Fetch contextual data for the chat (e.g. specific transaction/merchant details) |
| `/api/recommendations` | GET/POST | GET = browse learning resources; POST = track interaction (CLICK/VIEW/COMPLETE) |
| `/api/vault` | GET | List all uploaded statements with transaction counts |
| `/api/vault/[id]` | DELETE | Delete a specific statement and its transactions |
| `/api/vault/file/[id]` | GET | Download the original uploaded file from Supabase Storage |
| `/api/vault/wipe` | DELETE | Wipe all statements and transactions for the user |
| `/api/cron/monthly-reminder` | GET | Vercel cron endpoint — sends email reminders to opted-in users on the 1st of each month |

---

## 5. Core Feature Deep Dives

### 5.1 Statement Upload & Parsing Pipeline

The upload system supports **three file formats**, each with a dedicated parser:

| Format | Parser | Method |
|---|---|---|
| **CSV** | `csv-parser.ts` | PapaParse library; detects column headers dynamically |
| **PDF** | `pdf-parser.ts` | `pdf-parse` library; extracts text and applies regex patterns for Indian bank statements |
| **Image** (JPG/PNG) | `image-parser.ts` | Sends base64 to OpenRouter Vision API for OCR, then normalizes extracted text |

**Validation rules:**
- Max file size: **5 MB**
- Allowed extensions: `.csv`, `.pdf`, `.jpg`, `.jpeg`, `.png`
- If bank account metadata is extracted, it must match a registered account — otherwise the upload is **rejected**

### 5.2 AI-Powered Chat Assistant

```mermaid
flowchart TD
    A["User sends message"] --> B["Detect @flags"]
    B --> C{"Flags found?"}
    C -- Yes --> D["Query LearningResource DB\nfor matching categories"]
    C -- No --> E["Skip recommendations"]
    D --> F["Build recommendation context"]

    A --> G["Fetch last 50 transactions"]
    G --> H["Build transaction context"]

    F --> I["Compose system prompt"]
    E --> I
    H --> I

    A --> J{"Image attached?"}
    J -- Yes --> K["Upload to Supabase Storage"]
    K --> L["Include image_url in message"]
    J -- No --> L["Text-only message"]

    I --> M["Call OpenRouter API\n(arcee-ai/trinity)"]
    L --> M
    M --> N["Save user + AI messages to DB"]
    N --> O["Return response + recommendation cards"]
```

**@flag system:** Users can type `@tax`, `@investing`, `@budgeting`, etc. in their message to trigger curated learning resource recommendations alongside the AI response.

### 5.3 Dashboard Analytics Engine

The dashboard API computes the following in real-time from raw transactions:

| Metric | Computation |
|---|---|
| **Total Spent** | Sum of `abs(amount)` for all expense transactions |
| **Category Breakdown** | Grouped sum by `category` field |
| **Daily Timeline** | Grouped sum by date for the Recharts line chart |
| **Top Merchants** | Top 10 merchants by total spend |
| **Recurring Payments** | Detected via `normalizer.ts` — merchants appearing 2+ times with similar amounts |
| **Health Score (0-100)** | Weighted composite: spending variability (30%), category diversity (30%), subscription burden (40%) |
| **Recommendations** | Top 3 unwatched `LearningResource` entries matching the user's top spending category |

### 5.4 Learning Resource Engine

- Resources are seeded via `scripts/seed-resources.ts` with curated financial education content
- Categories: Tax, Finance, Investing, Budgeting, Savings, Insurance, Spending
- Types: VIDEO, ARTICLE, BOOK
- User interactions (CLICK, VIEW, COMPLETE) are tracked in `ResourceInteraction`
- The system **deprioritizes already-watched content** in both dashboard and chat recommendations

---

## 6. Technical Specifications

### 6.1 Technology Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.1.6 |
| **Language** | TypeScript | ^5 |
| **UI Library** | React | 19.2.3 |
| **Styling** | TailwindCSS | ^4 |
| **ORM** | Prisma Client | ^7.5.0 |
| **Database** | PostgreSQL | via Supabase |
| **Auth** | Supabase Auth (`@supabase/ssr`) | ^0.9.0 |
| **State Management** | React Query (`@tanstack/react-query`) | ^5.90 |
| **Charts** | Recharts | ^3.8.0 |
| **Markdown Rendering** | react-markdown + remark-gfm | ^10.1 / ^4.0 |
| **AI/LLM** | OpenRouter API | arcee-ai/trinity-large-preview:free |
| **Email** | Resend | ^6.9.4 |
| **File Parsing** | PapaParse (CSV), pdf-parse (PDF) | ^5.5 / ^2.4 |
| **Icons** | Lucide React | ^0.577 |
| **Deployment** | Vercel | Edge + Serverless |
| **Cron** | Vercel Cron | `0 0 1 * *` (monthly) |

### 6.2 Project Structure

```
FinGenie/
├── prisma/
│   └── schema.prisma              # 8 models, PostgreSQL
├── scripts/
│   └── seed-resources.ts          # Learning resource seeder
├── src/
│   ├── app/
│   │   ├── (protected)/           # Auth-gated pages
│   │   │   ├── dashboard/         # Main analytics dashboard
│   │   │   ├── assistant/         # AI chat (Intelligence)
│   │   │   ├── upload/            # Statement upload (Registry)
│   │   │   ├── transactions/      # Transaction list (Ledger)
│   │   │   ├── vault/             # Document storage (Vault)
│   │   │   ├── insights/          # AI insights page
│   │   │   ├── academy/           # Learning resources
│   │   │   ├── settings/          # Accounts, Notifications, Privacy
│   │   │   ├── setup-bank/        # Bank account registration
│   │   │   └── layout.tsx         # Sidebar nav, BankProvider
│   │   ├── api/                   # 19 API route files
│   │   ├── auth/callback/         # OAuth callback handler
│   │   ├── login/                 # Login page
│   │   └── page.tsx               # Landing page
│   ├── components/
│   │   ├── AccountSwitcher.tsx    # Multi-account dropdown
│   │   ├── BankStatementReminder  # Monthly popup reminder
│   │   ├── Logo.tsx               # Brand logo component
│   │   └── RecommendationCards    # Learning resource cards
│   ├── lib/
│   │   ├── auth.ts                # getUser() — Supabase to Prisma upsert
│   │   ├── prisma.ts              # Prisma client singleton
│   │   ├── openrouter.ts          # AI API integration
│   │   ├── email.ts               # Resend email utility
│   │   ├── parsers/               # CSV, PDF, Image, Normalizer
│   │   ├── supabase/              # Client, server, middleware helpers
│   │   └── contexts/              # BankContext (React context)
│   ├── providers/
│   │   └── query-provider.tsx     # React Query provider
│   └── middleware.ts              # Session refresh on every request
└── vercel.json                    # Cron job configuration
```

### 6.3 Environment Variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key (client-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) |
| `DATABASE_URL` | PostgreSQL connection string with pooling |
| `DIRECT_URL` | Direct PostgreSQL connection (for migrations) |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI features |
| `RESEND_API_KEY` | Resend API key for email delivery |
| `NEXT_PUBLIC_APP_URL` | Deployed app URL for email links |
| `CRON_SECRET` | Secret token to authenticate cron requests |

---

## 7. Security Model

```mermaid
flowchart TD
    A["Incoming Request"] --> B["Next.js Middleware"]
    B --> C["Supabase Session Validation"]
    C --> D{"Valid Session?"}
    D -- No --> E["Redirect to /login"]
    D -- Yes --> F["Refresh Session Tokens"]
    F --> G["API Route Handler"]
    G --> H["getUser() - Server-Side Auth"]
    H --> I{"User Found?"}
    I -- No --> J["401 Unauthorized"]
    I -- Yes --> K["Execute Business Logic"]
    K --> L["Row-Level Scoping by userId"]
```

**Key security measures:**

- **Authentication:** Google OAuth via Supabase — no password storage
- **Session management:** Supabase SSR cookies, refreshed on every request via middleware
- **API authorization:** Every API route calls `getUser()` which validates the Supabase session server-side and returns the Prisma user
- **Row-level data isolation:** All database queries are scoped with `userId: user.id`
- **File upload validation:** 5 MB limit, allowlisted extensions only
- **Bank account verification:** Uploaded statements are cross-checked against registered bank account numbers
- **Cron authentication:** Monthly reminder endpoint is protected by a `CRON_SECRET` token
- **Cascade deletes:** Deleting a user cascades to all related data (bank accounts, statements, transactions, chats, insights, interactions)

---

## 8. Deployment Architecture

```mermaid
graph TB
    subgraph Vercel["Vercel"]
        Edge["Edge Runtime (Middleware)"]
        Serverless["Serverless Functions (API Routes)"]
        Static["Static Assets (Next.js)"]
        Cron["Cron Job (Monthly)"]
    end

    subgraph Supabase["Supabase"]
        Auth["Auth (Google OAuth)"]
        PG["PostgreSQL Database"]
        Storage["Storage (finGenie-bucket)"]
    end

    subgraph External["Third-Party"]
        OpenRouter["OpenRouter (AI/LLM)"]
        Resend["Resend (Email)"]
    end

    Users["Users"] --> Edge
    Edge --> Serverless
    Serverless --> PG
    Serverless --> Storage
    Serverless --> Auth
    Serverless --> OpenRouter
    Cron --> Serverless
    Serverless --> Resend
    Static --> Users
```

**Deployment details:**
- **Hosting:** Vercel (automatic deployments from Git)
- **Database:** Supabase-managed PostgreSQL with connection pooling via `@prisma/adapter-pg`
- **File storage:** Supabase Storage bucket `finGenie-bucket` for uploaded statements and chat images
- **CDN:** Vercel Edge Network for static assets and middleware execution
- **Cron schedule:** `0 0 1 * *` — runs on the 1st of every month at midnight UTC
