import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Database } from '../types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Workspace = Database['public']['Tables']['workspaces']['Row'];

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  isLoading: boolean;
  isDemoMode: boolean;
  error: string | null;
  signInWithEmail: (email: string, password?: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password?: string, fullName?: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  switchWorkspace: (workspaceId: string) => void;
  setDemoMode: (enabled: boolean) => void;
}

const DEMO_WORKSPACE: Workspace = {
  id: 'ws-demo-001',
  name: 'Acme Core Checkout',
  slug: 'acme-core-checkout',
  owner_id: 'user-demo-001',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const DEMO_PROFILE: Profile = {
  id: 'user-demo-001',
  email: 'product.lead@argus.ai',
  display_name: 'Lead AI Product Architect',
  avatar_url: null,
  role: 'owner',
  active_workspace_id: 'ws-demo-001',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(DEMO_PROFILE);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(DEMO_WORKSPACE);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([DEMO_WORKSPACE]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    return localStorage.getItem('argus_demo_mode') !== 'false';
  });
  const [error, setError] = useState<string | null>(null);

  // Load user data from Supabase
  const loadUserData = async (currentUser: User) => {
    try {
      // 1. Fetch user profile
      const { data: profData, error: profError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (!profError && profData) {
        setProfile(profData);
      }

      // 2. Fetch workspaces user belongs to
      const { data: memberData } = await supabase
        .from('workspace_members')
        .select('workspace_id, workspaces(*)')
        .eq('user_id', currentUser.id);

      if (memberData && memberData.length > 0) {
        const userWs = memberData
          .map((m: any) => m.workspaces)
          .filter(Boolean) as Workspace[];

        if (userWs.length > 0) {
          setWorkspaces(userWs);
          const activeWs = userWs.find(w => w.id === (profData as any)?.active_workspace_id) || userWs[0];
          setCurrentWorkspace(activeWs);
        }
      }
    } catch (err: any) {
      console.warn('loadUserData warning:', err.message);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session: initSession } }) => {
      setSession(initSession);
      setUser(initSession?.user ?? null);
      if (initSession?.user) {
        setIsDemoMode(false);
        loadUserData(initSession.user);
      }
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        setIsDemoMode(false);
        loadUserData(currentSession.user);
      } else {
        setProfile(DEMO_PROFILE);
        setCurrentWorkspace(DEMO_WORKSPACE);
        setWorkspaces([DEMO_WORKSPACE]);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password = 'ArgusDefaultPassword123!') => {
    setError(null);
    if (!isSupabaseConfigured) {
      return { error: new Error('Supabase is not configured') };
    }
    try {
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInErr) {
        setError(signInErr.message);
        return { error: signInErr };
      }
      return { error: null };
    } catch (err: any) {
      setError(err.message);
      return { error: err };
    }
  };

  const signUpWithEmail = async (email: string, password = 'ArgusDefaultPassword123!', fullName?: string) => {
    setError(null);
    if (!isSupabaseConfigured) {
      return { error: new Error('Supabase is not configured') };
    }
    try {
      const { error: signUpErr } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || email.split('@')[0],
          },
        },
      });
      if (signUpErr) {
        setError(signUpErr.message);
        return { error: signUpErr };
      }
      return { error: null };
    } catch (err: any) {
      setError(err.message);
      return { error: err };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    setProfile(DEMO_PROFILE);
    setCurrentWorkspace(DEMO_WORKSPACE);
    setIsDemoMode(true);
    localStorage.setItem('argus_demo_mode', 'true');
  };

  const switchWorkspace = (workspaceId: string) => {
    const target = workspaces.find((w) => w.id === workspaceId);
    if (target) {
      setCurrentWorkspace(target);
      if (user && isSupabaseConfigured) {
        (supabase.from('profiles') as any).update({ active_workspace_id: target.id }).eq('id', user.id);
      }
    }
  };

  const setDemoMode = (enabled: boolean) => {
    setIsDemoMode(enabled);
    localStorage.setItem('argus_demo_mode', String(enabled));
    if (enabled) {
      setProfile(DEMO_PROFILE);
      setCurrentWorkspace(DEMO_WORKSPACE);
      setWorkspaces([DEMO_WORKSPACE]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        currentWorkspace,
        workspaces,
        isLoading,
        isDemoMode,
        error,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        switchWorkspace,
        setDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};