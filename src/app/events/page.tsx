import { Suspense } from "react";
import { EventsPageClient } from "@/components/events/EventsPageClient";
import { getPublishedEvents } from "@/services/events";
import type { ChapterEvent } from "@/types/event";

export const metadata = {
  title: "Events",
};

export default async function EventsPage() {
  let events: ChapterEvent[] = [];
  try {
    events = await getPublishedEvents();
  } catch (e) {
    console.error("[events] Failed to load events:", e);
  }

  return (
    <Suspense fallback={<div className="p-16 text-center">Loading events…</div>}>
      <EventsPageClient events={events} />
    </Suspense>
  );
}
