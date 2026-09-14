# Supabase Production Setup Guide for ARGUS

This guide provides instructions to connect, configure, and operate the Supabase backend for **ARGUS — AI Product Management Operating System**.

---

## 1. Project Credentials

ARGUS is configured with the following Supabase project:

- **Project URL**: `https://cemcvihaobrvkuxteepu.supabase.co`
- **Project Ref**: `cemcvihaobrvkuxteepu`
- **Publishable Key**: `sb_publishable_sLFpaXWgf6cSpcB5QwSkRA_189jVTto`

These keys are safe for client-side distribution as all database access is governed by PostgreSQL **Row Level Security (RLS)**.

---

## 2. Environment Variables

Create `.env.local` in your root repository with:

```bash
VITE_SUPABASE_URL=https://cemcvihaobrvkuxteepu.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_sLFpaXWgf6cSpcB5QwSkRA_189jVTto
```

Template is provided in `.env.example`.

---

## 3. Applying Database Schema & Migrations

### Option A: Via Supabase Web Dashboard (Fastest)

1. Open your project dashboard: [https://supabase.com/dashboard/project/cemcvihaobrvkuxteepu](https://supabase.com/dashboard/project/cemcvihaobrvkuxteepu)
2. Navigate to **SQL Editor** in the left navigation.
3. Click **New Query**.
4. Paste the entire content of [`supabase/migrations/001_initial_argus.sql`](supabase/migrations/001_initial_argus.sql).
5. Click **Run** (or press `Ctrl+Enter`).
6. Confirm all 14 tables, RLS policies, and triggers are created with zero errors.

### Option B: Via Supabase CLI

```bash
# Login to Supabase CLI
supabase login

# Link your local project to remote
supabase link --project-ref cemcvihaobrvkuxteepu

# Push migration
supabase db push
```

---

## 4. Database Entities Created

| Table | Description | RLS Policy |
| :--- | :--- | :--- |
| `workspaces` | Multi-tenant organization containers | Members & Owner |
| `profiles` | User identity & metadata linked to `auth.users` | User & Workspace Peers |
| `workspace_members` | Role-based membership (`owner`, `admin`, `member`, `viewer`) | Workspace Members |
| `signals` | Telemetry & customer signals from Datadog/Sentry/PostHog | Workspace Isolation |
| `signal_events` | Granular event payload log | Cascade through signals |
| `insights` | Causal Bayesian inference discoveries | Workspace Isolation |
| `opportunities` | RICE scored initiatives and tree nodes | Workspace Isolation |
| `opportunity_evidence`| Junction linking opportunities to signals | Workspace Isolation |
| `initiatives` | Roadmap items across Now / Next / Later | Workspace Isolation |
| `prds` | Living Product Requirement Documents | Workspace Isolation |
| `experiments` | A/B tests, variants, and causal lift telemetry | Workspace Isolation |
| `decisions` | Architecture & Product Decision Records (ADRs) | Workspace Isolation |
| `documents` | Technical specs, meeting logs, strategies | Workspace Isolation |
| `audit_logs` | Immutable audit trail of workspace mutations | Read-only to members |

---

## 5. Automated User Provisioning Trigger

The migration configures `handle_new_user()` on `auth.users`. When any new user signs up:
1. A default workspace `"[Name]'s Workspace"` is created automatically.
2. The user profile is created with reference to that workspace.
3. The user is assigned the `owner` role in `workspace_members`.

---

## 6. Authentication Setup

In Supabase Dashboard → **Authentication** → **Providers**:
- **Email**: Enabled by default (Confirm email can be toggled on/off for testing).
- **Google OAuth / GitHub** (Optional): Add Client ID & Secret in Provider settings.