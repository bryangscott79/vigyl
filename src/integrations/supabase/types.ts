export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      cached_intelligence: {
        Row: {
          created_at: string
          id: string
          intelligence_data: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          intelligence_data: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          intelligence_data?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          ai_readiness_score: number | null
          annual_revenue_estimate: string | null
          competitive_advantage: string | null
          created_at: string | null
          description: string | null
          employee_count_estimate: number | null
          headquarters_city: string | null
          headquarters_country: string | null
          headquarters_state: string | null
          id: string
          industry_name: string
          industry_slug: string
          is_active: boolean | null
          market_position: string | null
          metadata: Json | null
          name: string
          revenue_tier: string | null
          scope: string | null
          sector: string | null
          slug: string
          tags: string[] | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          ai_readiness_score?: number | null
          annual_revenue_estimate?: string | null
          competitive_advantage?: string | null
          created_at?: string | null
          description?: string | null
          employee_count_estimate?: number | null
          headquarters_city?: string | null
          headquarters_country?: string | null
          headquarters_state?: string | null
          id?: string
          industry_name: string
          industry_slug: string
          is_active?: boolean | null
          market_position?: string | null
          metadata?: Json | null
          name: string
          revenue_tier?: string | null
          scope?: string | null
          sector?: string | null
          slug: string
          tags?: string[] | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          ai_readiness_score?: number | null
          annual_revenue_estimate?: string | null
          competitive_advantage?: string | null
          created_at?: string | null
          description?: string | null
          employee_count_estimate?: number | null
          headquarters_city?: string | null
          headquarters_country?: string | null
          headquarters_state?: string | null
          id?: string
          industry_name?: string
          industry_slug?: string
          is_active?: boolean | null
          market_position?: string | null
          metadata?: Json | null
          name?: string
          revenue_tier?: string | null
          scope?: string | null
          sector?: string | null
          slug?: string
          tags?: string[] | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      company_contacts: {
        Row: {
          company_id: string
          created_at: string | null
          department: string | null
          email: string | null
          id: string
          linkedin_url: string | null
          name: string
          relevance: string | null
          source: string | null
          title: string | null
          updated_at: string | null
          verified: boolean | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          department?: string | null
          email?: string | null
          id?: string
          linkedin_url?: string | null
          name: string
          relevance?: string | null
          source?: string | null
          title?: string | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          department?: string | null
          email?: string | null
          id?: string
          linkedin_url?: string | null
          name?: string
          relevance?: string | null
          source?: string | null
          title?: string | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "company_contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_scores: {
        Row: {
          company_id: string
          composite_score: number
          geo_match_score: number | null
          id: string
          industry_match_score: number | null
          matched_signal_ids: string[] | null
          revenue_match_score: number | null
          scored_at: string | null
          services_match_score: number | null
          signal_recency_score: number | null
          user_id: string
        }
        Insert: {
          company_id: string
          composite_score?: number
          geo_match_score?: number | null
          id?: string
          industry_match_score?: number | null
          matched_signal_ids?: string[] | null
          revenue_match_score?: number | null
          scored_at?: string | null
          services_match_score?: number | null
          signal_recency_score?: number | null
          user_id: string
        }
        Update: {
          company_id?: string
          composite_score?: number
          geo_match_score?: number | null
          id?: string
          industry_match_score?: number | null
          matched_signal_ids?: string[] | null
          revenue_match_score?: number | null
          scored_at?: string | null
          services_match_score?: number | null
          signal_recency_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_scores_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_items: {
        Row: {
          company_name: string
          created_at: string
          id: string
          industry_name: string | null
          last_contacted: string | null
          notes: string | null
          pipeline_stage: string
          prospect_data: Json | null
          updated_at: string
          user_id: string
          vigyl_score: number | null
        }
        Insert: {
          company_name: string
          created_at?: string
          id?: string
          industry_name?: string | null
          last_contacted?: string | null
          notes?: string | null
          pipeline_stage?: string
          prospect_data?: Json | null
          updated_at?: string
          user_id: string
          vigyl_score?: number | null
        }
        Update: {
          company_name?: string
          created_at?: string
          id?: string
          industry_name?: string | null
          last_contacted?: string | null
          notes?: string | null
          pipeline_stage?: string
          prospect_data?: Json | null
          updated_at?: string
          user_id?: string
          vigyl_score?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          ai_maturity_self: string | null
          ai_summary: string | null
          business_summary: string | null
          case_study_industries: string[] | null
          company_descriptors: string[] | null
          company_name: string | null
          company_size: string | null
          created_at: string
          customer_industries: string[] | null
          differentiators: string | null
          entity_type: string | null
          geographic_focus: string[] | null
          id: string
          ideal_client_employee_max: number | null
          ideal_client_employee_min: number | null
          ideal_client_revenue_max: string | null
          ideal_client_revenue_min: string | null
          known_competitors: string[] | null
          location_city: string | null
          location_country: string | null
          location_state: string | null
          onboarding_completed: boolean
          role_title: string | null
          services: string[] | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_end: string | null
          subscription_status: string | null
          subscription_tier: string | null
          tags: string[] | null
          target_industries: string[] | null
          updated_at: string
          user_id: string
          user_persona: string | null
          value_propositions: string[] | null
          website_url: string | null
        }
        Insert: {
          ai_maturity_self?: string | null
          ai_summary?: string | null
          business_summary?: string | null
          case_study_industries?: string[] | null
          company_descriptors?: string[] | null
          company_name?: string | null
          company_size?: string | null
          created_at?: string
          customer_industries?: string[] | null
          differentiators?: string | null
          entity_type?: string | null
          geographic_focus?: string[] | null
          id?: string
          ideal_client_employee_max?: number | null
          ideal_client_employee_min?: number | null
          ideal_client_revenue_max?: string | null
          ideal_client_revenue_min?: string | null
          known_competitors?: string[] | null
          location_city?: string | null
          location_country?: string | null
          location_state?: string | null
          onboarding_completed?: boolean
          role_title?: string | null
          services?: string[] | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          tags?: string[] | null
          target_industries?: string[] | null
          updated_at?: string
          user_id: string
          user_persona?: string | null
          value_propositions?: string[] | null
          website_url?: string | null
        }
        Update: {
          ai_maturity_self?: string | null
          ai_summary?: string | null
          business_summary?: string | null
          case_study_industries?: string[] | null
          company_descriptors?: string[] | null
          company_name?: string | null
          company_size?: string | null
          created_at?: string
          customer_industries?: string[] | null
          differentiators?: string | null
          entity_type?: string | null
          geographic_focus?: string[] | null
          id?: string
          ideal_client_employee_max?: number | null
          ideal_client_employee_min?: number | null
          ideal_client_revenue_max?: string | null
          ideal_client_revenue_min?: string | null
          known_competitors?: string[] | null
          location_city?: string | null
          location_country?: string | null
          location_state?: string | null
          onboarding_completed?: boolean
          role_title?: string | null
          services?: string[] | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_end?: string | null
          subscription_status?: string | null
          subscription_tier?: string | null
          tags?: string[] | null
          target_industries?: string[] | null
          updated_at?: string
          user_id?: string
          user_persona?: string | null
          value_propositions?: string[] | null
          website_url?: string | null
        }
        Relationships: []
      }
      prospect_feedback: {
        Row: {
          created_at: string
          feedback_type: string
          id: string
          prospect_company_name: string
          prospect_data: Json | null
          prospect_industry: string
          user_id: string
        }
        Insert: {
          created_at?: string
          feedback_type: string
          id?: string
          prospect_company_name: string
          prospect_data?: Json | null
          prospect_industry: string
          user_id: string
        }
        Update: {
          created_at?: string
          feedback_type?: string
          id?: string
          prospect_company_name?: string
          prospect_data?: Json | null
          prospect_industry?: string
          user_id?: string
        }
        Relationships: []
      }
      real_signals: {
        Row: {
          ai_enriched: boolean | null
          content_hash: string | null
          id: string
          ingested_at: string | null
          metadata: Json | null
          published_at: string | null
          related_company_names: string[] | null
          related_industries: string[] | null
          sales_implication: string | null
          sentiment: string | null
          severity: number | null
          signal_type: string | null
          source_name: string | null
          source_url: string
          summary: string | null
          title: string
        }
        Insert: {
          ai_enriched?: boolean | null
          content_hash?: string | null
          id?: string
          ingested_at?: string | null
          metadata?: Json | null
          published_at?: string | null
          related_company_names?: string[] | null
          related_industries?: string[] | null
          sales_implication?: string | null
          sentiment?: string | null
          severity?: number | null
          signal_type?: string | null
          source_name?: string | null
          source_url: string
          summary?: string | null
          title: string
        }
        Update: {
          ai_enriched?: boolean | null
          content_hash?: string | null
          id?: string
          ingested_at?: string | null
          metadata?: Json | null
          published_at?: string | null
          related_company_names?: string[] | null
          related_industries?: string[] | null
          sales_implication?: string | null
          sentiment?: string | null
          severity?: number | null
          signal_type?: string | null
          source_name?: string | null
          source_url?: string
          summary?: string | null
          title?: string
        }
        Relationships: []
      }
      saved_signals: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          opportunity_name: string
          prospect_id: string | null
          signal_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          opportunity_name: string
          prospect_id?: string | null
          signal_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          opportunity_name?: string
          prospect_id?: string | null
          signal_id?: string
          user_id?: string
        }
        Relationships: []
      }
      signal_ingestion_log: {
        Row: {
          completed_at: string | null
          errors: string[] | null
          id: string
          metadata: Json | null
          query_term: string | null
          signals_enriched: number | null
          signals_fetched: number | null
          signals_new: number | null
          source: string
          started_at: string | null
        }
        Insert: {
          completed_at?: string | null
          errors?: string[] | null
          id?: string
          metadata?: Json | null
          query_term?: string | null
          signals_enriched?: number | null
          signals_fetched?: number | null
          signals_new?: number | null
          source: string
          started_at?: string | null
        }
        Update: {
          completed_at?: string | null
          errors?: string[] | null
          id?: string
          metadata?: Json | null
          query_term?: string | null
          signals_enriched?: number | null
          signals_fetched?: number | null
          signals_new?: number | null
          source?: string
          started_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
