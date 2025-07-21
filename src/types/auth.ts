import { SupabaseClient, User } from "@supabase/supabase-js"

export type Company = {
  id: string
  business_name: string
  domain: string
  url: string
  token: string
  created_at: string
}

export type AuthContextType = {
  supabase: SupabaseClient
  user: User | null
  company: Company | null
  isAdmin: boolean
  loading: boolean
}