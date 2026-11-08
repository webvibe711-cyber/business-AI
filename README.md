# BusinessPilot AI — The Next-Generation AI Business Operating System

> **Tagline:** *Your Business. Your AI Workforce.*  
> **Visual Identity:** Premium White Futuristic SaaS × Creative Editorial Design × Intelligent Motion.

BusinessPilot AI is a production-grade multi-agent AI business operating system that empowers businesses to manage their entire operation—from sales and CRM to invoicing, customer support, marketing, operations, and predictive analytics—through conversational orchestration and specialized autonomous agents with verified PayPal Sandbox settlement.

---

## 📸 Visual Design Direction

Designed strictly following the approved design reference:
- **Main Background:** `#FFFFFF`
- **Secondary Canvas:** `#F7F8FF`
- **Primary Violet:** `#633BFF`
- **Electric Blue:** `#4285FF`
- **Lavender:** `#E9E2FF`
- **Cyan:** `#62D9ED`
- **Main Text:** `#15172B`
- **Secondary Text:** `#687089`
- **Borders:** `#E9EAF2`
- **Agent Pastel Aura Gradients:** Rose/Purple (Sales), Mint/Green (Finance), Ocean Blue (Support), Amber/Orange (Marketing), Cyan/Teal (Operations), Lavender/Indigo (Analyst).
- **Zero 3D:** Clean 2D SVG artwork, subtle floating preview elevation, soft lavender shadows, smooth Framer Motion transitions.

---

## ⚡ The Core Hackathon Flow (Must-See Demo)

Test the complete end-to-end multi-agent PayPal workflow:

1. **Natural AI Instruction:**  
   Open BusinessPilot AI and type in the Central AI Command Center:  
   `"Create an invoice for customer John for $500."`
2. **Intent Parsing & Dispatch:**  
   The Central Orchestrator classifies the request, selects the **Finance Agent**, and resolves verified customer `John Doe` from the database.
3. **Itemized Draft Generation:**  
   The Finance Agent prepares an itemized invoice for **$500.00 USD** with Net-14 terms.
4. **Human-in-the-Loop Security Gate:**  
   A modal prompts the business owner to review and authorize the financial operation.
5. **PayPal Sandbox Order Creation:**  
   Upon approval, a verified PayPal Sandbox Order ID (`PAYID-...`) is generated via PayPal Orders v2 REST API.
6. **Customer Payment Capture:**  
   The customer (or evaluator) approves the payment directly through the hosted checkout page (`/pay/:invoiceId`) or the built-in Sandbox Simulator.
7. **Verification & Ledger Sync:**  
   The server captures the transaction ID (`CAP-...`), marks the invoice as **Paid**, records the payment in the ledger, and **immediately reflects the +$500.00 jump on the live Revenue chart and MRR analytics** with celebratory feedback!

---

## 🤖 6 Specialized AI Agents

| Agent | Domain | Key Capabilities |
| :--- | :--- | :--- |
| **1. AI Sales Agent** | CRM & Deals | Lead scoring (0-100), pipeline progression, personalized outreach pitch generator |
| **2. AI Finance Agent** | Billing & PayPal | Invoice generation, PayPal Sandbox orders, payment reminder sequences, cashflow reconciliation |
| **3. AI Support Agent** | Knowledge & Triage | 24/7 knowledge base search, synthesized customer query responses, priority ticket triage |
| **4. AI Marketing Agent** | Content Studio | Multi-platform copy generation (LinkedIn, X, Newsletters), campaign focus tuning |
| **5. AI Operations Agent** | Task Scheduler | Cross-agent task queues, operational balancing, priority management |
| **6. AI Business Analyst** | Intelligence | Real-time revenue cohort regression, collection efficiency tracking, actionable growth briefs |

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide React, Recharts, Canvas-Confetti, React Router.
- **Backend & Database:** Supabase PostgreSQL with strict Row Level Security (RLS) policies, UUID keys, foreign key cascades, and audit triggers.
- **AI Engine:** Google Gemini 1.5 Multi-Agent Tool Calling + deterministic conversational pattern parser.
- **Payments:** PayPal Developer Sandbox REST API (Orders v2 & Payments v2), webhook simulation, verified capture IDs.
- **Resilience:** Offline-first reactive persistence engine that saves state in `localStorage` when remote Supabase credentials are not supplied, ensuring uninterrupted hackathon judging.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(If keys are omitted, the app functions completely using its built-in reactive storage engine and PayPal Sandbox credentials!)*

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```
├── src/
│   ├── components/
│   │   ├── agents/          # 6 Specialized Agent Workspaces + Workforce Hub
│   │   ├── auth/            # AuthModal & Business Onboarding
│   │   ├── common/          # Navbar, Footer
│   │   ├── crm/             # CustomerList & Kanban LeadPipeline
│   │   ├── dashboard/       # Sidebar, TopHeader, OverviewView, ApprovalModal
│   │   ├── invoices/        # InvoiceList & Line Items Manager
│   │   ├── landing/         # Hero matching reference image, 6 Agent Cards, Metrics
│   │   ├── orchestrator/    # Central AI Conversational Command Center
│   │   ├── payments/        # PayPal Sandbox verified audit ledger
│   │   ├── analytics/       # Recharts revenue trends & agent workload
│   │   └── settings/        # PayPal, Supabase & Gemini configurations
│   ├── context/             # AuthContext & BusinessContext reactive state
│   ├── lib/                 # PayPal REST caller, Gemini dispatcher, Supabase client
│   ├── pages/               # LandingPage, DashboardPage, PublicInvoicePayPage
│   └── types/               # Strict TypeScript interface definitions
├── supabase/
│   └── migrations/          # Complete SQL DDL with Row Level Security
└── server/                  # Node.js PayPal REST Sandbox proxy service
```

---

## 🔒 Security & Fiduciary Integrity

- **Strict RLS:** All multi-tenant data is isolated by business owner UUIDs in Supabase PostgreSQL.
- **Human-in-the-Loop:** Sensitive financial operations (issuing payment links, creating PayPal orders) cannot execute without owner approval.
- **Verifiable Payments:** Payment records require matching PayPal Order and Capture IDs; status never updates without backend verification.
