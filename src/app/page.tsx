import { Hero } from "@/components/home/Hero";
import { FeatureCards } from "@/components/home/FeatureCards";
import { EventsPreview } from "@/components/home/EventsPreview";
import { getPublishedEvents } from "@/services/events";
import type { ChapterEvent } from "@/types/event";

export default async function HomePage() {
  let events: ChapterEvent[] = [];
  try {
    events = await getPublishedEvents();
  } catch (e) {
    console.error("[home] Failed to load events:", e);
  }

  return (
    <>
      <Hero />
      <FeatureCards />
      <EventsPreview events={events} />
    </>
  );
}
