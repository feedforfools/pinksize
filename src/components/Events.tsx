"use client";

import { useEffect, useState } from "react";
import { Event, getUpcomingEvents } from "@/lib/supabase";

function getDateParts(dateString: string): {
  day: number;
  monthShort: string;
} {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthsShort = [
    "GEN",
    "FEB",
    "MAR",
    "APR",
    "MAG",
    "GIU",
    "LUG",
    "AGO",
    "SET",
    "OTT",
    "NOV",
    "DIC",
  ];
  return {
    day,
    monthShort: monthsShort[date.getMonth()],
  };
}

// Calendar-style date component
function CalendarDate({ dateString }: { dateString: string }) {
  const { day, monthShort } = getDateParts(dateString);

  return (
    <div className="flex flex-col items-center justify-center w-[var(--events-date-size)] h-[var(--events-date-size)] bg-[rgb(var(--color-white-rgb))] shadow-lg overflow-hidden">
      {/* Month header */}
      <div className="w-full bg-[color:var(--color-accent)] text-[rgb(var(--color-white-rgb))] text-[length:var(--events-date-month-size)] text-center">
        <span
          style={{
            fontWeight: 900,
            transform: "scaleX(1.6)",
            display: "inline-block",
          }}
        >
          {monthShort}
        </span>
      </div>
      {/* Day number */}
      <div className="flex-1 flex items-center justify-center">
        <span className="text-[length:var(--events-date-day-size)] font-bold text-[rgb(var(--color-gray-900-rgb))] leading-none">
          {day}
        </span>
      </div>
    </div>
  );
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await getUpcomingEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <section id="live" className="relative py-0 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover blur-xs"
        >
          <source src="/images/events-bg.webm" type="video/webm" />
        </video>
      </div>
      {/* Diagonal Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -55deg,
            rgb(var(--color-black-rgb)) 0px,
            rgb(var(--color-black-rgb)) 2px,
            transparent 2px,
            transparent 4px
          )`,
        }}
      />
      <div className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-[var(--section-padding-x)] py-[var(--section-padding-y)]">
        <h2 className="text-[length:var(--section-title-size)] md:text-[length:var(--section-title-size-lg)] font-bold text-center text-[rgb(var(--color-white-rgb))] mb-[var(--section-title-margin-bottom)] tracking-tight">
          PROSSIMI EVENTI
        </h2>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(var(--color-white-rgb))]"></div>
          </div>
        ) : events.length === 0 ? (
          <p className="text-center text-[rgb(var(--color-gray-400-rgb))] text-[length:var(--body-text-lg)]">
            Nessun evento in programma
          </p>
        ) : (
          <div className="flex justify-center">
            <div className="w-full sm:w-fit max-w-full sm:max-w-[var(--events-row-max-width)]">
              <div className="flex flex-col gap-[var(--events-list-gap)] sm:table sm:border-separate sm:border-spacing-y-[var(--events-list-gap)] sm:-my-[var(--events-list-gap)]">
                {/* Event rows */}
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={`group flex sm:table-row transition-all duration-200 ease-out hover:scale-[1.015] hover:drop-shadow-[var(--shadow-glow-white-strong)] ${
                      event.link ? "cursor-pointer" : ""
                    } bg-[rgba(var(--color-black-rgb),0.4)] sm:bg-transparent rounded-lg sm:rounded-none p-3 sm:p-0`}
                    onClick={() =>
                      event.link &&
                      window.open(event.link, "_blank", "noopener,noreferrer")
                    }
                  >
                    {/* Calendar Date */}
                    <div className="sm:table-cell sm:align-middle sm:pr-[calc(var(--events-row-gap)*0.6)] sm:py-[var(--events-row-padding)] flex-shrink-0">
                      <div className="flex-shrink-0">
                        <CalendarDate dateString={event.date} />
                      </div>
                    </div>

                    {/* Mobile: Venue + Location stacked | Desktop: separate cells */}
                    <div className="sm:contents flex flex-col justify-start flex-1 min-w-0 pl-3 sm:pl-0 leading-tight">
                      {/* Venue */}
                      <div className="sm:table-cell sm:align-middle sm:pl-[calc(var(--events-row-gap)*0.4)] sm:pr-[var(--events-row-gap)] sm:py-[var(--events-row-padding)] text-[rgb(var(--color-white-rgb))] font-bold text-[length:var(--events-venue-size)] max-w-full sm:max-w-[var(--events-venue-max-width)] sm:truncate truncate text-left uppercase">
                        {event.venue}
                      </div>

                      {/* Location */}
                      <div className="sm:table-cell sm:align-middle sm:pl-[var(--events-row-gap)] sm:pr-[calc(var(--events-row-gap)*0.2)] sm:py-[var(--events-row-padding)] text-[rgb(var(--color-white-rgb))] text-[length:var(--events-location-size)] max-w-full sm:max-w-[var(--events-location-max-width)] sm:truncate truncate text-left opacity-80 sm:opacity-100">
                        {event.location}
                      </div>
                    </div>

                    {/* Link Icon - always visible for rows with links */}
                    <div className="sm:table-cell sm:align-middle sm:pl-[calc(var(--events-row-gap)*0.2)] sm:py-[var(--events-row-padding)] flex items-center justify-center flex-shrink-0 pl-2 sm:pl-0">
                      <div className="flex items-center justify-center w-[var(--events-link-column)]">
                        {event.link && (
                          <span className="text-[rgb(var(--color-white-rgb))] opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
