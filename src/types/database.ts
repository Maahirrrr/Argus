export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string;
          name: string;
          slug: string;
          owner_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          owner_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          owner_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          role: string | null;
          active_workspace_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          avatar_url?: string | null;
          role?: string | null;
          active_workspace_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          role?: string | null;
          active_workspace_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      workspace_members: {
        Row: {
          id: string;
          workspace_id: string;
          user_id: string;
          role: 'owner' | 'admin' | 'member' | 'viewer';
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          user_id: string;
          role?: 'owner' | 'admin' | 'member' | 'viewer';
          created_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          user_id?: string;
          role?: 'owner' | 'admin' | 'member' | 'viewer';
          created_at?: string;
        };
      };
      signals: {
        Row: {
          id: string;
          workspace_id: string;
          external_id: string | null;
          title: string;
          description: string | null;
          source: string;
          source_type: string;
          volume: number;
          sentiment: number;
          velocity: 'surging' | 'rising' | 'steady' | 'falling';
          status: 'new' | 'investigating' | 'addressed' | 'dismissed';
          severity: 'low' | 'medium' | 'high' | 'critical';
          confidence: number;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          external_id?: string | null;
          title: string;
          description?: string | null;
          source: string;
          source_type?: string;
          volume?: number;
          sentiment?: number;
          velocity?: 'surging' | 'rising' | 'steady' | 'falling';
          status?: 'new' | 'investigating' | 'addressed' | 'dismissed';
          severity?: 'low' | 'medium' | 'high' | 'critical';
          confidence?: number;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          external_id?: string | null;
          title?: string;
          description?: string | null;
          source?: string;
          source_type?: string;
          volume?: number;
          sentiment?: number;
          velocity?: 'surging' | 'rising' | 'steady' | 'falling';
          status?: 'new' | 'investigating' | 'addressed' | 'dismissed';
          severity?: 'low' | 'medium' | 'high' | 'critical';
          confidence?: number;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      opportunities: {
        Row: {
          id: string;
          workspace_id: string;
          title: string;
          description: string | null;
          category: string;
          reach: number;
          impact: number;
          confidence: number;
          effort: number;
          score: number;
          status: 'inbox' | 'evaluating' | 'committed' | 'archive';
          owner_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          title: string;
          description?: string | null;
          category?: string;
          reach?: number;
          impact?: number;
          confidence?: number;
          effort?: number;
          score?: number;
          status?: 'inbox' | 'evaluating' | 'committed' | 'archive';
          owner_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          title?: string;
          description?: string | null;
          category?: string;
          reach?: number;
          impact?: number;
          confidence?: number;
          effort?: number;
          score?: number;
          status?: 'inbox' | 'evaluating' | 'committed' | 'archive';
          owner_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      prds: {
        Row: {
          id: string;
          workspace_id: string;
          initiative_id: string | null;
          title: string;
          problem_statement: string | null;
          hypothesis: string | null;
          target_audience: string | null;
          success_metrics: Json;
          technical_considerations: string | null;
          risks: string | null;
          status: 'draft' | 'review' | 'approved' | 'in_dev' | 'shipped';
          version: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          initiative_id?: string | null;
          title: string;
          problem_statement?: string | null;
          hypothesis?: string | null;
          target_audience?: string | null;
          success_metrics?: Json;
          technical_considerations?: string | null;
          risks?: string | null;
          status?: 'draft' | 'review' | 'approved' | 'in_dev' | 'shipped';
          version?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          initiative_id?: string | null;
          title?: string;
          problem_statement?: string | null;
          hypothesis?: string | null;
          target_audience?: string | null;
          success_metrics?: Json;
          technical_considerations?: string | null;
          risks?: string | null;
          status?: 'draft' | 'review' | 'approved' | 'in_dev' | 'shipped';
          version?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      initiatives: {
        Row: {
          id: string;
          workspace_id: string;
          opportunity_id: string | null;
          title: string;
          status: 'now' | 'next' | 'later' | 'planned' | 'in_progress' | 'shipped';
          timeframe: string;
          target_quarter: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          opportunity_id?: string | null;
          title: string;
          status?: 'now' | 'next' | 'later' | 'planned' | 'in_progress' | 'shipped';
          timeframe?: string;
          target_quarter?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          opportunity_id?: string | null;
          title?: string;
          status?: 'now' | 'next' | 'later' | 'planned' | 'in_progress' | 'shipped';
          timeframe?: string;
          target_quarter?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      experiments: {
        Row: {
          id: string;
          workspace_id: string;
          prd_id: string | null;
          name: string;
          hypothesis: string | null;
          metric_name: string | null;
          baseline_value: number;
          target_value: number;
          status: 'draft' | 'running' | 'concluded' | 'aborted';
          start_date: string | null;
          end_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          prd_id?: string | null;
          name: string;
          hypothesis?: string | null;
          metric_name?: string | null;
          baseline_value?: number;
          target_value?: number;
          status?: 'draft' | 'running' | 'concluded' | 'aborted';
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          prd_id?: string | null;
          name?: string;
          hypothesis?: string | null;
          metric_name?: string | null;
          baseline_value?: number;
          target_value?: number;
          status?: 'draft' | 'running' | 'concluded' | 'aborted';
          start_date?: string | null;
          end_date?: string | null;
          created_at?: string;
        };
      };
      decisions: {
        Row: {
          id: string;
          workspace_id: string;
          title: string;
          context: string | null;
          decision_made: string;
          rationale: string | null;
          consequences: string | null;
          status: 'proposed' | 'accepted' | 'superseded' | 'rejected';
          author_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          title: string;
          context?: string | null;
          decision_made: string;
          rationale?: string | null;
          consequences?: string | null;
          status?: 'proposed' | 'accepted' | 'superseded' | 'rejected';
          author_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          title?: string;
          context?: string | null;
          decision_made?: string;
          rationale?: string | null;
          consequences?: string | null;
          status?: 'proposed' | 'accepted' | 'superseded' | 'rejected';
          author_id?: string | null;
          created_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          workspace_id: string;
          title: string;
          content: string | null;
          category: 'spec' | 'architecture' | 'strategy' | 'user_research';
          author_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          workspace_id: string;
          title: string;
          content?: string | null;
          category?: 'spec' | 'architecture' | 'strategy' | 'user_research';
          author_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          title?: string;
          content?: string | null;
          category?: 'spec' | 'architecture' | 'strategy' | 'user_research';
          author_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}