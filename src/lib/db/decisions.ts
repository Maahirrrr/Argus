import { supabase, isSupabaseConfigured } from '../supabase';
import type { Database } from '../../types/database';

type DecisionRow = Database['public']['Tables']['decisions']['Row'];

export async function fetchDecisions(workspaceId?: string): Promise<DecisionRow[]> {
  if (!isSupabaseConfigured) return [];
  try {
    let query = supabase
      .from('decisions')
      .select('*')
      .order('created_at', { ascending: false });

    if (workspaceId) {
      query = query.eq('workspace_id', workspaceId);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('fetchDecisions warning:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('fetchDecisions error:', err);
    return [];
  }
}