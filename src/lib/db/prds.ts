import { supabase, isSupabaseConfigured } from '../supabase';
import type { Database } from '../../types/database';

type PrdRow = Database['public']['Tables']['prds']['Row'];
type PrdInsert = Database['public']['Tables']['prds']['Insert'];

export async function fetchPrds(workspaceId?: string): Promise<PrdRow[]> {
  if (!isSupabaseConfigured) return [];
  try {
    let query = supabase
      .from('prds')
      .select('*')
      .order('created_at', { ascending: false });

    if (workspaceId) {
      query = query.eq('workspace_id', workspaceId);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('fetchPrds warning:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('fetchPrds error:', err);
    return [];
  }
}

export async function createPrd(prd: PrdInsert): Promise<PrdRow | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await (supabase.from('prds') as any)
      .insert(prd)
      .select()
      .single();

    if (error) {
      console.error('createPrd error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error('createPrd exception:', err);
    return null;
  }
}