import { supabase, isSupabaseConfigured } from '../supabase';
import type { Database } from '../../types/database';

type OpportunityRow = Database['public']['Tables']['opportunities']['Row'];
type OpportunityInsert = Database['public']['Tables']['opportunities']['Insert'];

export async function fetchOpportunities(workspaceId?: string): Promise<OpportunityRow[]> {
  if (!isSupabaseConfigured) return [];
  try {
    let query = supabase
      .from('opportunities')
      .select('*')
      .order('score', { ascending: false });

    if (workspaceId) {
      query = query.eq('workspace_id', workspaceId);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('fetchOpportunities warning:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('fetchOpportunities error:', err);
    return [];
  }
}

export async function createOpportunity(opp: OpportunityInsert): Promise<OpportunityRow | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await (supabase.from('opportunities') as any)
      .insert(opp)
      .select()
      .single();

    if (error) {
      console.error('createOpportunity error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error('createOpportunity exception:', err);
    return null;
  }
}