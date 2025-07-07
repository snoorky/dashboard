import { SupabaseClient, User } from "@supabase/supabase-js";

export type Company = {
  id: string;
  business_name: string;
  domain: string;
  url: string;
  token: string;
  created_at: string;
};

export type AuthContextType = {
  supabase: SupabaseClient;
  loading: boolean;
  user: User | null;
  company: Company | null;
};

export type Report = {
  id: string;
  business_id: string;
  operator: string;
  department: string;
  period: string;
  sent_messages_count: number;
  received_messages_count: number;
  total_messages_count: number;
  opened_tickets_count: number;
  closed_tickets_count: number;
  total_tickets_count: number;
  waiting_time: string;
  waiting_time_after_bot: string;
  waiting_time_avg: string;
  ticket_time: string;
  contacts_count: number;
  created_at: string;
};