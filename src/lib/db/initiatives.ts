import { supabase, isSupabaseConfigured } from '../supabase';
import type { Database } from '../../types/database';

type InitiativeRow = Database['public']['Tables']['initiatives']['Row'];

export async function fetchInitiatives(workspaceId?: string): Promise<InitiativeRow[]> {
  if (!isSupabaseConfigured) return [];
  try {
    let query = supabase
      .from('initiatives')
      .select('*')
      .order('created_at', { ascending: false });

    if (workspaceId) {
      query = query.eq('workspace_id', workspaceId);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('fetchInitiatives warning:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('fetchInitiatives error:', err);
    return [];
  }
}