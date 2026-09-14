import { supabase, isSupabaseConfigured } from '../supabase';
import type { Database } from '../../types/database';

type DocumentRow = Database['public']['Tables']['documents']['Row'];

export async function fetchDocuments(workspaceId?: string): Promise<DocumentRow[]> {
  if (!isSupabaseConfigured) return [];
  try {
    let query = supabase
      .from('documents')
      .select('*')
      .order('updated_at', { ascending: false });

    if (workspaceId) {
      query = query.eq('workspace_id', workspaceId);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('fetchDocuments warning:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('fetchDocuments error:', err);
    return [];
  }
}