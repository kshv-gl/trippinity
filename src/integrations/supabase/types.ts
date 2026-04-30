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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          add_ons: Json
          add_ons_amount: number
          adults: number
          base_amount: number
          children: number
          created_at: string
          departure_date: string
          gst_amount: number
          id: string
          lead_email: string
          lead_first_name: string
          lead_last_name: string
          lead_phone: string
          payment_status: Database["public"]["Enums"]["payment_status"]
          platform_fee: number
          special_requests: string | null
          status: Database["public"]["Enums"]["booking_status"]
          total_amount: number
          trip_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          add_ons?: Json
          add_ons_amount?: number
          adults?: number
          base_amount: number
          children?: number
          created_at?: string
          departure_date: string
          gst_amount?: number
          id?: string
          lead_email: string
          lead_first_name: string
          lead_last_name: string
          lead_phone: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          platform_fee?: number
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount: number
          trip_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          add_ons?: Json
          add_ons_amount?: number
          adults?: number
          base_amount?: number
          children?: number
          created_at?: string
          departure_date?: string
          gst_amount?: number
          id?: string
          lead_email?: string
          lead_first_name?: string
          lead_last_name?: string
          lead_phone?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          platform_fee?: number
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount?: number
          trip_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      operators: {
        Row: {
          avatar_url: string | null
          bank_account_last4: string | null
          bio: string | null
          business_name: string
          created_at: string
          id: string
          ifsc: string | null
          joined_at: string
          phone: string | null
          rating_avg: number
          rating_count: number
          response_time_hours: number
          updated_at: string
          user_id: string | null
          verified: boolean
          whatsapp: string | null
        }
        Insert: {
          avatar_url?: string | null
          bank_account_last4?: string | null
          bio?: string | null
          business_name: string
          created_at?: string
          id?: string
          ifsc?: string | null
          joined_at?: string
          phone?: string | null
          rating_avg?: number
          rating_count?: number
          response_time_hours?: number
          updated_at?: string
          user_id?: string | null
          verified?: boolean
          whatsapp?: string | null
        }
        Update: {
          avatar_url?: string | null
          bank_account_last4?: string | null
          bio?: string | null
          business_name?: string
          created_at?: string
          id?: string
          ifsc?: string | null
          joined_at?: string
          phone?: string | null
          rating_avg?: number
          rating_count?: number
          response_time_hours?: number
          updated_at?: string
          user_id?: string | null
          verified?: boolean
          whatsapp?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_type: Database["public"]["Enums"]["account_type"]
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_type?: Database["public"]["Enums"]["account_type"]
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_type?: Database["public"]["Enums"]["account_type"]
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          booking_id: string | null
          created_at: string
          id: string
          rating: number
          text: string | null
          trip_id: string
          user_id: string
        }
        Insert: {
          booking_id?: string | null
          created_at?: string
          id?: string
          rating: number
          text?: string | null
          trip_id: string
          user_id: string
        }
        Update: {
          booking_id?: string | null
          created_at?: string
          id?: string
          rating?: number
          text?: string | null
          trip_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      trips: {
        Row: {
          add_ons: Json
          available_dates: string[]
          base_price: number
          bookings_count: number
          cancellation_policy: Database["public"]["Enums"]["cancellation_policy"]
          category: Database["public"]["Enums"]["trip_category"]
          cover_image: string | null
          created_at: string
          destination: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          duration_days: number
          ending_point: string | null
          exclusions: string[]
          group_discount_pct: number | null
          group_discount_threshold: number | null
          id: string
          inclusions: string[]
          itinerary: Json
          max_group_size: number
          min_group_size: number
          operator_id: string
          overview: string | null
          photos: string[]
          rating_avg: number
          rating_count: number
          region: string | null
          short_description: string | null
          slug: string | null
          spots_per_departure: number
          starting_point: string | null
          status: Database["public"]["Enums"]["trip_status"]
          title: string
          updated_at: string
        }
        Insert: {
          add_ons?: Json
          available_dates?: string[]
          base_price: number
          bookings_count?: number
          cancellation_policy?: Database["public"]["Enums"]["cancellation_policy"]
          category: Database["public"]["Enums"]["trip_category"]
          cover_image?: string | null
          created_at?: string
          destination: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          duration_days: number
          ending_point?: string | null
          exclusions?: string[]
          group_discount_pct?: number | null
          group_discount_threshold?: number | null
          id?: string
          inclusions?: string[]
          itinerary?: Json
          max_group_size?: number
          min_group_size?: number
          operator_id: string
          overview?: string | null
          photos?: string[]
          rating_avg?: number
          rating_count?: number
          region?: string | null
          short_description?: string | null
          slug?: string | null
          spots_per_departure?: number
          starting_point?: string | null
          status?: Database["public"]["Enums"]["trip_status"]
          title: string
          updated_at?: string
        }
        Update: {
          add_ons?: Json
          available_dates?: string[]
          base_price?: number
          bookings_count?: number
          cancellation_policy?: Database["public"]["Enums"]["cancellation_policy"]
          category?: Database["public"]["Enums"]["trip_category"]
          cover_image?: string | null
          created_at?: string
          destination?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          duration_days?: number
          ending_point?: string | null
          exclusions?: string[]
          group_discount_pct?: number | null
          group_discount_threshold?: number | null
          id?: string
          inclusions?: string[]
          itinerary?: Json
          max_group_size?: number
          min_group_size?: number
          operator_id?: string
          overview?: string | null
          photos?: string[]
          rating_avg?: number
          rating_count?: number
          region?: string | null
          short_description?: string | null
          slug?: string | null
          spots_per_departure?: number
          starting_point?: string | null
          status?: Database["public"]["Enums"]["trip_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "trips_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlists: {
        Row: {
          created_at: string
          id: string
          trip_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          trip_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          trip_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      account_type: "traveller" | "operator" | "both"
      booking_status: "pending" | "confirmed" | "cancelled" | "completed"
      cancellation_policy: "flexible" | "moderate" | "strict"
      difficulty_level: "easy" | "moderate" | "challenging" | "expert"
      payment_status: "pending" | "paid" | "refunded" | "failed"
      trip_category:
        | "trek"
        | "beach"
        | "cultural"
        | "wildlife"
        | "road_trip"
        | "offbeat"
        | "luxury"
        | "budget"
      trip_status: "draft" | "under_review" | "live" | "paused"
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
      account_type: ["traveller", "operator", "both"],
      booking_status: ["pending", "confirmed", "cancelled", "completed"],
      cancellation_policy: ["flexible", "moderate", "strict"],
      difficulty_level: ["easy", "moderate", "challenging", "expert"],
      payment_status: ["pending", "paid", "refunded", "failed"],
      trip_category: [
        "trek",
        "beach",
        "cultural",
        "wildlife",
        "road_trip",
        "offbeat",
        "luxury",
        "budget",
      ],
      trip_status: ["draft", "under_review", "live", "paused"],
    },
  },
} as const
