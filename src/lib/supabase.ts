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
  link?: string | null;
  created_at: string;
}

export interface Video {
  id: number;
  youtubeId: string;
  title: string;
  year?: string | null;
  badge?: "LIVE" | "PROMO" | "STUDIO" | null;
  created_at?: string | null;
}

export async function getUpcomingEvents(): Promise<Event[]> {
  if (!supabase) {
    // Return empty array if Supabase is not configured
    return [];
  }

  const { data, error } = await supabase
    .from("pinksize_events")
    .select("*")
    .gte("date", new Date().toISOString().split("T")[0])
    .order("date", { ascending: true })
    .limit(4);

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data || [];
}

type VideoRow = {
  id: number;
  youtube_id: string;
  title: string;
  year?: string | null;
  badge?: "LIVE" | "PROMO" | "STUDIO" | null;
  created_at?: string | null;
};

export async function getVideos(): Promise<Video[]> {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("pinksize_videos")
    .select("id, youtube_id, title, year, badge, created_at")
    .order("id", { ascending: true })
    .limit(6);

  if (error) {
    console.error("Error fetching videos:", error);
    return [];
  }

  return (
    data?.map((video: VideoRow) => ({
      id: video.id,
      youtubeId: video.youtube_id,
      title: video.title,
      year: video.year ?? null,
      badge: video.badge ?? null,
      created_at: video.created_at ?? null,
    })) || []
  );
}
