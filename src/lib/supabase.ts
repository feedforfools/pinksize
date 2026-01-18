import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a mock client or real client based on env vars
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

export interface Event {
  id: number;
  date: string;
  venue: string;
  location: string;
  link?: string;
  is_quartet?: boolean;
  is_the_wall?: boolean;
  is_dark_side?: boolean;
  created_at?: string;
}

export async function getUpcomingEvents(): Promise<Event[]> {
  if (!supabase) {
    // Return empty array if Supabase is not configured
    // The Events component will use fallback data
    return [];
  }

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("date", new Date().toISOString().split("T")[0])
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data || [];
}
