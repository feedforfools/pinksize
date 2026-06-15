import { NextResponse } from "next/server";
import { getUpcomingEvents } from "@/lib/db";

export async function GET() {
  const events = await getUpcomingEvents();
  return NextResponse.json(events);
}
