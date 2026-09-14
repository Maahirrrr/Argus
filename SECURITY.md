# ARGUS Security & Row Level Security (RLS) Specification

Security in ARGUS is enforced at the database layer using PostgreSQL Row Level Security (RLS). Even if a client query is intercepted or tampered with, the PostgreSQL database kernel prevents cross-tenant data leakage.

---

## 1. Multi-Tenant Isolation Architecture

All operational tables (`signals`, `opportunities`, `prds`, `experiments`, `decisions`, `documents`, `initiatives`, `audit_logs`) contain a mandatory foreign key `workspace_id uuid references public.workspaces(id) on delete cascade`.

### Security Definer Function: `is_workspace_member`

```sql
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
```

This function executes with elevated definer privileges without exposing the `workspace_members` table directly, preventing recursion issues during policy evaluation.

---

## 2. Role-Based Access Control (RBAC) Matrix

| Resource | Viewer | Member | Admin | Owner |
| :--- | :---: | :---: | :---: | :---: |
| View Workspace Data | Read | Read | Read | Read |
| Create Signals / Insights | - | Write | Write | Write |
| Edit Opportunities / PRDs | - | Write | Write | Write |
| Run / Conclude Experiments| - | Write | Write | Write |
| Delete Resources | - | - | Delete | Delete |
| Invite / Remove Members | - | - | Manage | Manage |
| Billing & Transfer Ownership| - | - | - | Owner Only |

---

## 3. Data Flow & Security Guarantee

1. **Client Request**: Frontend sends query with user's Supabase JWT.
2. **Postgres auth.uid()**: PostgreSQL decodes the JWT signature and extracts the authenticated UUID `auth.uid()`.
3. **RLS Filter**: PostgreSQL appends `WHERE is_workspace_member(workspace_id)` before scanning indices.
4. **Data Isolation**: A user from Workspace A cannot query, update, or delete any record belonging to Workspace B under any circumstance.