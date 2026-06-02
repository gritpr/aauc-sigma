import { Suspense } from "react";
import { notFound } from "next/navigation";
import { EventDetail } from "@/components/events/EventDetail";
import { getEventBySlug } from "@/services/events";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Event not found" };

  return {
    title: event.title,
    description: event.theme ?? event.description,
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="p-16 text-center">Loading…</div>}>
      <EventDetail event={event} />
    </Suspense>
  );
}
