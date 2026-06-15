import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

const sql = databaseUrl ? neon(databaseUrl) : null;

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
  if (!sql) {
    // Return empty array if the database is not configured
    return [];
  }

  try {
    const today = new Date().toISOString().split("T")[0];
    const rows = await sql`
      SELECT id, date, venue, location, link, created_at
      FROM events
      WHERE date >= ${today}
      ORDER BY date ASC
      LIMIT 4
    `;

    return rows as Event[];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
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
  if (!sql) {
    return [];
  }

  try {
    const rows = (await sql`
      SELECT id, youtube_id, title, year, badge, created_at
      FROM videos
      ORDER BY id ASC
      LIMIT 6
    `) as VideoRow[];

    return rows.map((video) => ({
      id: video.id,
      youtubeId: video.youtube_id,
      title: video.title,
      year: video.year ?? null,
      badge: video.badge ?? null,
      created_at: video.created_at ?? null,
    }));
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
}
