import { supabase, isSupabaseConfigured } from '../supabase';
import type { Database } from '../../types/database';

type ExperimentRow = Database['public']['Tables']['experiments']['Row'];

export async function fetchExperiments(workspaceId?: string): Promise<ExperimentRow[]> {
  if (!isSupabaseConfigured) return [];
  try {
    let query = supabase
      .from('experiments')
      .select('*')
      .order('created_at', { ascending: false });

    if (workspaceId) {
      query = query.eq('workspace_id', workspaceId);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('fetchExperiments warning:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('fetchExperiments error:', err);
    return [];
  }
}