export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      battles: {
        Row: {
          created_at: string
          finished: boolean
          id: number
          my_score: number | null
          opponent_id: string | null
          opponent_score: number | null
          round_owner: string | null
          user_id: string | null
          winner_id: string | null
        }
        Insert: {
          created_at?: string
          finished?: boolean
          id?: number
          my_score?: number | null
          opponent_id?: string | null
          opponent_score?: number | null
          round_owner?: string | null
          user_id?: string | null
          winner_id?: string | null
        }
        Update: {
          created_at?: string
          finished?: boolean
          id?: number
          my_score?: number | null
          opponent_id?: string | null
          opponent_score?: number | null
          round_owner?: string | null
          user_id?: string | null
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "battles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "global_user_ranking"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "battles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          badges: string[] | null
          battles_lost: number | null
          battles_won: number | null
          correct_answers: number
          email: string | null
          first_name: string | null
          free_coins: number
          geo_correct_answers: number | null
          history_correct_answers: number | null
          id: string
          last_name: string | null
          math_correct_answers: number | null
          paid_coins: number
          science_correct_answers: number | null
          streak: number
          updated_at: string | null
          username: string | null
          wrong_answers: number
        }
        Insert: {
          badges?: string[] | null
          battles_lost?: number | null
          battles_won?: number | null
          correct_answers?: number
          email?: string | null
          first_name?: string | null
          free_coins?: number
          geo_correct_answers?: number | null
          history_correct_answers?: number | null
          id: string
          last_name?: string | null
          math_correct_answers?: number | null
          paid_coins?: number
          science_correct_answers?: number | null
          streak?: number
          updated_at?: string | null
          username?: string | null
          wrong_answers?: number
        }
        Update: {
          badges?: string[] | null
          battles_lost?: number | null
          battles_won?: number | null
          correct_answers?: number
          email?: string | null
          first_name?: string | null
          free_coins?: number
          geo_correct_answers?: number | null
          history_correct_answers?: number | null
          id?: string
          last_name?: string | null
          math_correct_answers?: number | null
          paid_coins?: number
          science_correct_answers?: number | null
          streak?: number
          updated_at?: string | null
          username?: string | null
          wrong_answers?: number
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      questions: {
        Row: {
          answer: string | null
          created_at: string
          id: number
          img_url: string | null
          level: number | null
          opt_four: string | null
          opt_one: string | null
          opt_three: string | null
          opt_two: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          answer?: string | null
          created_at?: string
          id?: number
          img_url?: string | null
          level?: number | null
          opt_four?: string | null
          opt_one?: string | null
          opt_three?: string | null
          opt_two?: string | null
          title?: string | null
          type?: string | null
        }
        Update: {
          answer?: string | null
          created_at?: string
          id?: number
          img_url?: string | null
          level?: number | null
          opt_four?: string | null
          opt_one?: string | null
          opt_three?: string | null
          opt_two?: string | null
          title?: string | null
          type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      global_user_ranking: {
        Row: {
          correct_answers: number | null
          first_name: string | null
          id: string | null
          last_name: string | null
          rank: number | null
          streak: number | null
          username: string | null
          wrong_answers: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      random_questions: {
        Row: {
          answer: string | null
          created_at: string | null
          id: number | null
          img_url: string | null
          level: number | null
          opt_four: string | null
          opt_one: string | null
          opt_three: string | null
          opt_two: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          answer?: string | null
          created_at?: string | null
          id?: number | null
          img_url?: string | null
          level?: number | null
          opt_four?: string | null
          opt_one?: string | null
          opt_three?: string | null
          opt_two?: string | null
          title?: string | null
          type?: string | null
        }
        Update: {
          answer?: string | null
          created_at?: string | null
          id?: number | null
          img_url?: string | null
          level?: number | null
          opt_four?: string | null
          opt_one?: string | null
          opt_three?: string | null
          opt_two?: string | null
          title?: string | null
          type?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      update_battle_score: {
        Args: {
          type: string
          battle_id: number
          value: number
        }
        Returns: undefined
      }
      update_correct_answer_amount: {
        Args: {
          user_id: string
          new_value: number
        }
        Returns: undefined
      }
      update_entertainment_correct_answers: {
        Args: {
          user_id: string
          new_value: number
        }
        Returns: undefined
      }
      update_free_coins: {
        Args: {
          user_id: string
          value: number
          type: string
        }
        Returns: undefined
      }
      update_geo_correct_answers: {
        Args: {
          user_id: string
          new_value: number
        }
        Returns: undefined
      }
      update_history_correct_answers: {
        Args: {
          user_id: string
          new_value: number
        }
        Returns: undefined
      }
      update_math_correct_answers: {
        Args: {
          user_id: string
          new_value: number
        }
        Returns: undefined
      }
      update_paid_coins: {
        Args: {
          user_id: string
          value: number
          type: string
        }
        Returns: undefined
      }
      update_points: {
        Args: {
          user_id: string
          value: number
          type: string
        }
        Returns: undefined
      }
      update_science_correct_answers: {
        Args: {
          user_id: string
          new_value: number
        }
        Returns: undefined
      }
      update_wrong_answer_amount: {
        Args: {
          user_id: string
          new_value: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never
