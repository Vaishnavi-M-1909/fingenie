# Full development spec — Web-first Finance AI (18–24)

Below is an end-to-end development specification you can use as a blueprint for implementation, testing, and deployment. It’s tuned for a **student project** (free tiers) and built to be web-first, secure, and easy to iterate on.

---

# 1. High-level summary & goals

**Product**: Web app where users (age 18–24) upload bank statements (PDF/CSV). The system extracts transactions, categorizes them, shows visual analytics, generates AI insights and tailored learning resources (articles/videos).
**Primary goals:** fast MVP, privacy by default, accurate parsing, useful AI explanations, low/no-cost hosting.

---

# 2. Target MVP (must-have features)

1. Google sign-in (single provider).
2. Upload bank statement (PDF/CSV).
3. Reliable transaction extraction & normalization.
4. Rule-based merchant→category mapping + manual override.
5. Dashboard: totals, category pie, timeline, top merchants, subscription detector.
6. AI insight generator (summary, suggestions, 2–3 learning links) via OpenRouter.
7. Persisted user data in PostgreSQL (via Supabase).
8. Simple settings & privacy page (data deletion).
9. CI/CD deploy to Vercel, DB + auth + storage on Supabase.

---

# 3. Recommended tech stack (free-friendly)

- Frontend / fullstack framework: Next.js (App Router).
- Hosting / CI: Vercel.
- Auth + DB + Storage: Supabase (PostgreSQL, Supabase Storage, Auth).
- LLM / inference: OpenRouter (use free models via OpenRouter).
- Styling: Tailwind CSS.
- Charts: Recharts or Chart.js.
- ORM: Prisma (works well with Postgres).
- Optional parsing microservice (if needed): Python with `pdfplumber` / `camelot` (for complex PDFs).
- Auth integration helper (if you don’t want to write flows): NextAuth — _but you can use Supabase Auth directly (recommended for simpler integration)._
- Optional object storage alternative: Cloudflare R2 (if you want external storage). Use Supabase Storage for simplicity.

> These services have generous free tiers suitable for a student project.

---

# 4. System architecture (components & flow)

1. **Browser / Next.js UI** — pages + client queries.
2. **Vercel Serverless / Next.js API routes** — endpoints for uploads, parsing triggers, insights.
3. **Supabase** — Auth (Google), PostgreSQL (data), Storage (raw statements), Edge Functions (optional worker), Realtime (notification).
4. **Parsing Worker** — either Node in API route or a Supabase Edge Function / tiny Python microservice for heavy PDFs.
5. **AI layer** — call OpenRouter with prepared summaries (not raw transactions) to generate human-friendly insights.
6. **Background jobs** — lightweight queue using Supabase row flags + cron or Edge Function; avoid extra infrastructure (Redis) for MVP.
7. **Monitoring / telemetry** — Sentry or simple server logs + Supabase logs.

Flow:
User logs in → uploads file → file saved to Supabase Storage → insert `statements` row (status=queued) → parsing worker picks it up → extract transactions & write to `transactions` → backend computes analytics → sends analytics summary to OpenRouter → store `insights` → user dashboard polls/receives update.

---

# 5. Data model (core tables)

Simplified Prisma/Postgres schema (illustrative):

```prisma
model user {
  id         String   @id @default(cuid())
  email      String   @unique
  name       String?
  created_at DateTime @default(now())
  statements statement[]
  transactions transaction[]
  insights    insight[]
}

model statement {
  id         String   @id @default(cuid())
  userId     String
  file_path  String    // Supabase storage path
  uploaded_at DateTime @default(now())
  status     String    // queued | parsing | done | failed
  meta       Json?     // optional parsed metadata
  user       user      @relation(fields: [userId], references: [id])
}

model transaction {
  id           String   @id @default(cuid())
  userId       String
  statementId  String?
  date         DateTime
  merchant     String
  amount       Float
  currency     String
  category     String?
  description  String?
  raw_line     String
}

model insight {
  id           String @id @default(cuid())
  userId       String
  statementId  String?
  month        String    // e.g. "2026-03"
  score        Int?
  summary      String
  recommendations Json?   // list of links/titles
  created_at   DateTime @default(now())
}
```

Notes:

- Use Postgres `JSONB` for flexible metadata (e.g., raw parser output).
- Add indexes on `userId`, `date`, and `month` for fast queries.

---

# 6. API surface (contract examples)

Auth handled by Supabase — no custom login endpoints needed.

Primary endpoints (Next.js API routes or Supabase Edge Functions):

- `POST /api/upload`
  - body: multipart form with file.
  - action: upload to Supabase Storage, insert `statement` (status=queued), return statement id.

- `POST /api/trigger-parse` (internal / worker)
  - body: `{ statementId }`
  - action: parse file, write transactions, update statement.status.

- `GET /api/transactions?userId=&month=`
  - returns paged transactions.

- `GET /api/dashboard?userId=&month=`
  - returns computed analytics: totals, category totals, time series, subscriptions, top merchants.

- `POST /api/insights/generate`
  - body: `{ userId, month, analyticsSummary }`
  - action: call OpenRouter, save insight, return result.

- `POST /api/transactions/:id/category`
  - body: `{ category }` — manual override for user corrections.

- `POST /api/delete-account`
  - action: delete user data & storage (comply with privacy request).

Design notes:

- Keep the LLM call server-side; never call it from browser.
- Use JWT provided by Supabase for auth on API calls.

---

# 7. Parsing pipeline (detailed)

**Goal**: robust extraction from multiple bank PDF formats & CSVs.

Stages:

1. **File ingestion** — receive & store raw file in Supabase Storage.
2. **Text extraction** — Node: `pdf-parse` or `pdf-lib` for text; for complex statement tables consider Python `pdfplumber`/`camelot`. CSVs use `papaparse`.
3. **Line segmentation** — split by lines, detect lines with date + amount patterns. Use regexes tolerant to multiple date formats.
4. **Row normalisation** — parse date, merchant, amount, debit/credit. Clean merchant strings (uppercase, trim tokens like UPI/ID).
5. **Heuristics & rules** — detect multi-line descriptions, remove headers/footers.
6. **Confidence scoring** — tag uncertain rows for manual review.
7. **Save to DB** — insert transactions, link to statement.
8. **Post-processing** — detect recurring payments (group by normalized merchant + similar amount + monthly cadence).

Testing:

- Collect 20+ sample statements from common Indian banks (SBI, HDFC, ICICI, Axis) to build regexes and test cases.
- Build unit tests for parsing functions and integration tests with sample PDFs.

Fallback:

- If a PDF fails parsing, mark status `failed` and allow user to re-upload CSV or manually enter transactions.

---

# 8. Categorization strategy

Phase 1: **Rule-based mapping**

- Maintain `merchant_map` table: common normalized merchant → category. Allow admins/users to add maps.

Phase 2: **Hybrid AI classifier**

- Compute merchant embeddings (use lightweight model or OpenRouter model) and do similarity search against a labeled merchant set. Or send merchant + context (transaction description, amount) to a model for classification.

User experience:

- Show predicted category with “change” button; user edits feed back into merchant_map for future improvements.

---

# 9. Analytics & scoring

Compute deterministically:

- monthly totals, category totals, % of income (if income provided), daily averages, weekend vs weekday spending, top merchants, recurring subscriptions.

Financial Health Score (example formula):

- Components: savings ratio (if user provides income), subscription burden, variability (std dev of daily spend), impulsive spend weight (one-off large purchases).
- Score = weighted sum normalized to 0–100.
- Provide breakdown explaining each component.

Simulations:

- “If you reduce category X by Y% you save Z/year” — basic deterministic math on category totals.

---

# 10. AI prompt design (example)

**Send to OpenRouter only short, structured summaries**, not raw personal data.

Example prompt (system + user):

```
SYSTEM: You are a friendly financial coach for young adults. Keep tone casual, concise, and actionable.

USER:
Month: 2026-03
Totals: total_spent: ₹18,400
Category totals: Food: ₹7,200 (39%), Shopping: ₹3,400 (18%), Transport: ₹1,800 (9.8%), Subscriptions: ₹1,067 (5.8%)
Patterns: weekend spending spike, 6 recurring subscriptions (total ₹1,067)
Ask: produce (1) 3-point plain English summary of user's spending, (2) 3 concrete actions to reduce spending, (3) 2 learning resources (title + url) targeted to “reducing food delivery” and “subscription management”.

Provide output as JSON with keys: summary, actions[], resources[].
```

Validate model output and persist the JSON. If output fails schema, fallback to a simpler template or mark manual review.

---

# 11. Frontend architecture & UI components

Pages:

- `/` landing (marketing + sign up)
- `/upload` (drag & drop, supported banks list)
- `/dashboard` (main view)
- `/transactions` (list + filters + edit category)
- `/insights` (AI insights per month)
- `/settings/privacy` (delete account)

Key components:

- `UploadDropzone` (file upload + preview)
- `TransactionsTable` (virtualized list)
- `CategoryChip` (editable)
- `SpendingPie`, `SpendingLine` (Recharts)
- `InsightCard` (LLM output)
- `BudgetAlert` (notifications)

State & data:

- Use TanStack Query for fetching & caching.
- Use optimistic updates for category edits.
- Poll dashboard endpoint once every 10–20s while `statement.status !== done`, or use Supabase Realtime for push updates.

UX:

- Show parsing progress & clear error messages.
- Allow manual transaction correction & “train” button to update merchant map.
- Make learning resources open in new tabs and track clicks for analytics.

---

# 12. Background processing / job model

For free student setup avoid dedicated Redis/Queue initially.

Options (MVP):

1. **Synchronous parse on serverless route** — acceptable if parsing is quick. Limit file size and show spinner.
2. **Supabase row-based queue** — set `status = queued`; have a scheduled Supabase Edge Function (cron) or Vercel cron (if available) that polls queued rows and processes them. Edge Functions can run parsing (Node) or call a Python microservice.
3. **Hybrid** — small files handled sync; large files route to an Edge Function.

Advantages of row-based queue: no additional infra, simple to debug.

---

# 13. Security & privacy (musts)

- Use Supabase Auth with Google — trustable OAuth provider.
- Enforce per-user row level security (RLS) in Postgres — every query checks `auth.uid() = user_id`.
- Store only statement file path and parsed structured transactions (not raw bank credentials).
- Consider encrypting file blobs at rest (Supabase handles storage encryption for you).
- Access control: validate all API requests by verifying JWT.
- Provide delete flow to remove Supabase Storage file + all DB rows for user on request.
- Do not send raw PII to external LLMs; only send aggregated summaries (no account numbers, masked merchant ids).
- Rate limit OpenRouter calls and cache common prompts to cut costs.

---

# 14. Deployment & CI/CD

- Repo on GitHub.
- Deploy Next.js app to Vercel (connect to GitHub main branch).
- Supabase project set up: enable Google provider, create DB and Storage bucket, create RLS policies.
- Environment variables: Supabase URL/KEY, OpenRouter API key (server only), SENTRY DSN (if used). Keep secrets in Vercel env.
- DB migrations: use Prisma migrate or Supabase SQL migrations. Run migrations in CI or manually.

---

# 15. Monitoring & error handling

- Set up Sentry (free tier) for frontend & server errors.
- Log parsing failures to a `parser_errors` table with sample lines for debugging.
- Track LLM usage and costs (OpenRouter dashboard).
- Basic analytics: Supabase table for events (upload, parse success/fail, insight click) to measure engagement.

---

# 16. Testing & QA

- Unit tests for parsing logic (lots of sample PDFs/CSV).
- Integration tests for API endpoints (use Supabase test project).
- E2E for critical flows using Playwright or Cypress (login + upload + parse + dashboard).
- UAT: test with 10 real sample statements from friends (ask permissions).

---

# 17. Phased roadmap (practical)

**Phase 0 — planning**

- Collect sample statements, design DB schema, set up Supabase & Vercel.

**Phase 1 — core MVP (2–3 weeks)**

- Supabase Auth (Google), Upload, synchronous parsing for CSV, store transactions, simple dashboard charts, manual category edits.

**Phase 2 — polish & AI (2–3 weeks)**

- Improve PDF parsing, merchant normalization, recurring detection, generate deterministic analytics, call OpenRouter for insights, display recommendations.

**Phase 3 — robustness (2–3 weeks)**

- Edge worker or background queue, hybrid classification (embeddings or API), RLS & delete flows, testing & monitoring.

**Phase 4 — extras**

- Gamification, simulations, mobile PWA or React Native port, personalized onboarding tutorials.

---

# 18. Deliverables & checklist (for your project submission)

- Working deployed app (Vercel url).
- Supabase project with sample data (or a script to seed).
- README with setup + env vars + migration steps.
- Short demo recording (2–3 minutes) showing upload → parse → dashboard → insight.
- Code comments for parser and AI prompt logic.
- Short security/privacy doc describing how user data is handled & deletion flow.

---

# 19. Practical tips & pitfalls

- **Parsing is the main time sink** — invest time in building solid rules and test cases.
- **Start deterministic**: do analytics yourself and let the LLM explain results — don’t rely on LLMs to compute raw numbers.
- **Keep PII out of LLM calls** — send aggregated summaries only.
- **Allow users to correct categories** — this is critical for trust and training merchant map.
- **Log everything** (parser errors, LLM responses) for debugging.

---

# 20. Quick resource list (tools to read/install)

- Next.js docs
- Supabase docs (Auth, Storage, Edge Functions)
- Vercel docs (deployment, envs)
- OpenRouter API docs
- Prisma docs
- `pdf-parse`, `pdf-lib` (Node) and/or `pdfplumber` (Python) for parsing
- `recharts` or `chart.js` for visualizations

---
