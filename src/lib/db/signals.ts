import { supabase, isSupabaseConfigured } from '../supabase';
import type { Database } from '../../types/database';

type SignalRow = Database['public']['Tables']['signals']['Row'];
type SignalInsert = Database['public']['Tables']['signals']['Insert'];

export async function fetchSignals(workspaceId?: string): Promise<SignalRow[]> {
  if (!isSupabaseConfigured) return [];
  try {
    let query = supabase
      .from('signals')
      .select('*')
      .order('created_at', { ascending: false });

    if (workspaceId) {
      query = query.eq('workspace_id', workspaceId);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Supabase fetchSignals warning:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('fetchSignals error:', err);
    return [];
  }
}

export async function createSignal(signal: SignalInsert): Promise<SignalRow | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await (supabase.from('signals') as any)
      .insert(signal)
      .select()
      .single();

    if (error) {
      console.error('createSignal error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error('createSignal exception:', err);
    return null;
  }
}

export async function updateSignalStatus(
  signalId: string, 
  status: 'new' | 'investigating' | 'addressed' | 'dismissed'
): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  try {
    const { error } = await (supabase.from('signals') as any)
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', signalId);

    return !error;
  } catch (err) {
    console.error('updateSignalStatus exception:', err);
    return false;
  }
}