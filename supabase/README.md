# ARGUS Supabase Migrations & Schema

This directory contains the versioned database migrations for ARGUS.

## Directory Structure

- `migrations/`
  - `001_initial_argus.sql`: Complete base schema, 14 tables, helper functions, automated trigger, indices, and RLS policies.

## How to Apply

Execute `001_initial_argus.sql` in the Supabase SQL Editor:
[https://supabase.com/dashboard/project/cemcvihaobrvkuxteepu/sql](https://supabase.com/dashboard/project/cemcvihaobrvkuxteepu/sql)