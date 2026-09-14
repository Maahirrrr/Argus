-- ==============================================================================
-- ARGUS AI PRODUCT MANAGEMENT OPERATING SYSTEM
-- Initial Database Migration with Row Level Security (RLS)
-- Version: 1.0.0
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. WORKSPACES
create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  owner_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. USER PROFILES
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  avatar_url text,
  role text default 'member',
  active_workspace_id uuid references public.workspaces(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. WORKSPACE MEMBERS
create table if not exists public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member', 'viewer')),
  created_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);

-- Helper function: check if authenticated user belongs to workspace
create or replace function public.is_workspace_member(ws_id uuid)
returns boolean
security definer
set search_path = public
language plpgsql
as $$
begin
  return exists (
    select 1
    from public.workspace_members
    where workspace_id = ws_id
      and user_id = auth.uid()
  );
end;
$$;

-- Helper function: check if authenticated user is admin/owner
create or replace function public.is_workspace_admin(ws_id uuid)
returns boolean
security definer
set search_path = public
language plpgsql
as $$
begin
  return exists (
    select 1
    from public.workspace_members
    where workspace_id = ws_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
  );
end;
$$;

-- 4. SIGNALS (Telemetry & Customer signals)
create table if not exists public.signals (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  external_id text,
  title text not null,
  description text,
  source text not null,
  source_type text default 'telemetry',
  volume integer default 0,
  sentiment numeric(4,2) default 0.0,
  velocity text default 'steady' check (velocity in ('surging', 'rising', 'steady', 'falling')),
  status text default 'new' check (status in ('new', 'investigating', 'addressed', 'dismissed')),
  severity text default 'medium' check (severity in ('low', 'medium', 'high', 'critical')),
  confidence numeric(4,2) default 0.85,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 5. SIGNAL EVENTS
create table if not exists public.signal_events (
  id uuid primary key default gen_random_uuid(),
  signal_id uuid not null references public.signals(id) on delete cascade,
  event_name text not null,
  source text not null,
  payload jsonb default '{}'::jsonb,
  timestamp timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- 6. INSIGHTS (Causal inference engine)
create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null,
  summary text not null,
  root_cause text,
  confidence_score numeric(4,2) default 0.90,
  impact_score text default 'high' check (impact_score in ('low', 'medium', 'high', 'critical')),
  category text default 'retention',
  status text default 'open' check (status in ('open', 'actioned', 'dismissed')),
  evidence_signal_ids jsonb default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- 7. OPPORTUNITIES (RICE scoring & Opportunity Trees)
create table if not exists public.opportunities (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null,
  description text,
  category text default 'growth',
  reach integer default 5000,
  impact numeric(3,1) default 3.0,
  confidence numeric(4,2) default 0.80,
  effort numeric(3,1) default 2.0,
  score numeric(8,2) default 6000.0,
  status text default 'inbox' check (status in ('inbox', 'evaluating', 'committed', 'archive')),
  owner_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 8. OPPORTUNITY EVIDENCE
create table if not exists public.opportunity_evidence (
  id uuid primary key default gen_random_uuid(),
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  signal_id uuid references public.signals(id) on delete set null,
  confidence_weight numeric(4,2) default 1.0,
  created_at timestamptz not null default now()
);

-- 9. INITIATIVES (Roadmap items)
create table if not exists public.initiatives (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  opportunity_id uuid references public.opportunities(id) on delete set null,
  title text not null,
  status text default 'planned' check (status in ('now', 'next', 'later', 'planned', 'in_progress', 'shipped')),
  timeframe text default 'q3_2025',
  target_quarter text default 'Q3 2025',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 10. PRDS (Product Requirement Documents)
create table if not exists public.prds (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  initiative_id uuid references public.initiatives(id) on delete set null,
  title text not null,
  problem_statement text,
  hypothesis text,
  target_audience text,
  success_metrics jsonb default '[]'::jsonb,
  technical_considerations text,
  risks text,
  status text default 'draft' check (status in ('draft', 'review', 'approved', 'in_dev', 'shipped')),
  version integer default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 11. EXPERIMENTS (A/B testing & causal metrics)
create table if not exists public.experiments (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  prd_id uuid references public.prds(id) on delete set null,
  name text not null,
  hypothesis text,
  metric_name text,
  baseline_value numeric(8,2) default 0.0,
  target_value numeric(8,2) default 0.0,
  status text default 'draft' check (status in ('draft', 'running', 'concluded', 'aborted')),
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz not null default now()
);

-- 12. DECISIONS (Architecture & Product Decision Records - ADR)
create table if not exists public.decisions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null,
  context text,
  decision_made text not null,
  rationale text,
  consequences text,
  status text default 'accepted' check (status in ('proposed', 'accepted', 'superseded', 'rejected')),
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- 13. DOCUMENTS (Knowledge & Specs)
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  title text not null,
  content text,
  category text default 'spec' check (category in ('spec', 'architecture', 'strategy', 'user_research')),
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 14. AUDIT LOGS
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  details jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ==============================================================================
-- INDEXES FOR SCALE
-- ==============================================================================
create index if not exists idx_signals_ws on public.signals(workspace_id, status);
create index if not exists idx_signals_severity on public.signals(workspace_id, severity);
create index if not exists idx_signal_events_sig on public.signal_events(signal_id);
create index if not exists idx_opps_ws on public.opportunities(workspace_id, status);
create index if not exists idx_prds_ws on public.prds(workspace_id, status);
create index if not exists idx_initiatives_ws on public.initiatives(workspace_id, status);
create index if not exists idx_decisions_ws on public.decisions(workspace_id, status);
create index if not exists idx_documents_ws on public.documents(workspace_id, category);
create index if not exists idx_members_user on public.workspace_members(user_id, workspace_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
alter table public.workspaces enable row level security;
alter table public.profiles enable row level security;
alter table public.workspace_members enable row level security;
alter table public.signals enable row level security;
alter table public.signal_events enable row level security;
alter table public.insights enable row level security;
alter table public.opportunities enable row level security;
alter table public.opportunity_evidence enable row level security;
alter table public.initiatives enable row level security;
alter table public.prds enable row level security;
alter table public.experiments enable row level security;
alter table public.decisions enable row level security;
alter table public.documents enable row level security;
alter table public.audit_logs enable row level security;

-- Workspaces policies
create policy "Users can view their workspaces"
  on public.workspaces for select
  using (public.is_workspace_member(id) or owner_id = auth.uid());

create policy "Users can create workspaces"
  on public.workspaces for insert
  with check (auth.uid() is not null);

create policy "Workspace owners can update their workspaces"
  on public.workspaces for update
  using (owner_id = auth.uid() or public.is_workspace_admin(id));

-- Profiles policies
create policy "Users can view any profile in their workspace"
  on public.profiles for select
  using (auth.uid() is not null);

create policy "Users can update their own profile"
  on public.profiles for update
  using (id = auth.uid());

-- Workspace members policies
create policy "Members can view membership in their workspace"
  on public.workspace_members for select
  using (public.is_workspace_member(workspace_id));

create policy "Admins can manage members"
  on public.workspace_members for all
  using (public.is_workspace_admin(workspace_id));

-- Workspace resources policies (standard RLS pattern)
create policy "Workspace members can view signals" on public.signals for select using (public.is_workspace_member(workspace_id));
create policy "Workspace members can insert signals" on public.signals for insert with check (public.is_workspace_member(workspace_id));
create policy "Workspace members can update signals" on public.signals for update using (public.is_workspace_member(workspace_id));
create policy "Workspace admins can delete signals" on public.signals for delete using (public.is_workspace_admin(workspace_id));

create policy "Workspace members can view opportunities" on public.opportunities for select using (public.is_workspace_member(workspace_id));
create policy "Workspace members can insert opportunities" on public.opportunities for insert with check (public.is_workspace_member(workspace_id));
create policy "Workspace members can update opportunities" on public.opportunities for update using (public.is_workspace_member(workspace_id));
create policy "Workspace admins can delete opportunities" on public.opportunities for delete using (public.is_workspace_admin(workspace_id));

create policy "Workspace members can view initiatives" on public.initiatives for select using (public.is_workspace_member(workspace_id));
create policy "Workspace members can manage initiatives" on public.initiatives for all using (public.is_workspace_member(workspace_id));

create policy "Workspace members can view prds" on public.prds for select using (public.is_workspace_member(workspace_id));
create policy "Workspace members can manage prds" on public.prds for all using (public.is_workspace_member(workspace_id));

create policy "Workspace members can view experiments" on public.experiments for select using (public.is_workspace_member(workspace_id));
create policy "Workspace members can manage experiments" on public.experiments for all using (public.is_workspace_member(workspace_id));

create policy "Workspace members can view decisions" on public.decisions for select using (public.is_workspace_member(workspace_id));
create policy "Workspace members can manage decisions" on public.decisions for all using (public.is_workspace_member(workspace_id));

create policy "Workspace members can view documents" on public.documents for select using (public.is_workspace_member(workspace_id));
create policy "Workspace members can manage documents" on public.documents for all using (public.is_workspace_member(workspace_id));

create policy "Workspace members can view audit logs" on public.audit_logs for select using (public.is_workspace_member(workspace_id));
create policy "Workspace members can insert audit logs" on public.audit_logs for insert with check (public.is_workspace_member(workspace_id));

-- ==============================================================================
-- AUTH AUTOMATION TRIGGER (handle_new_user)
-- ==============================================================================
create or replace function public.handle_new_user()
returns trigger
security definer
set search_path = public
language plpgsql
as $$
declare
  default_ws_id uuid;
  user_email text;
  user_name text;
begin
  user_email := new.email;
  user_name := coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1));

  -- 1. Create a default workspace for the new user
  insert into public.workspaces (name, slug, owner_id)
  values (
    user_name || '''s Workspace',
    'ws-' || substr(md5(random()::text), 1, 8),
    new.id
  )
  returning id into default_ws_id;

  -- 2. Create profile
  insert into public.profiles (id, email, display_name, active_workspace_id, role)
  values (
    new.id,
    user_email,
    user_name,
    default_ws_id,
    'owner'
  );

  -- 3. Add to workspace_members as owner
  insert into public.workspace_members (workspace_id, user_id, role)
  values (
    default_ws_id,
    new.id,
    'owner'
  );

  return new;
end;
$$;

-- Trigger on auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();