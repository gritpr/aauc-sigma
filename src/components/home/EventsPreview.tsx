import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { formatEventDateRange } from "@/lib/utils/format";
import { getEventImageUrl } from "@/config/images";
import type { ChapterEvent } from "@/types/event";

interface EventsPreviewProps {
  events: ChapterEvent[];
}

export function EventsPreview({ events }: EventsPreviewProps) {
  const preview = events.slice(0, 2);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimatedSection className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            <p className="mt-2 text-gray-600">Register for chapter programs and conferences.</p>
          </div>
          <Link href="/events">
            <Button variant="secondary">View all events</Button>
          </Link>
        </AnimatedSection>

        {preview.length === 0 ? (
          <p className="mt-8 text-gray-500">No upcoming events yet. Check back soon.</p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {preview.map((event, i) => (
              <AnimatedSection
                key={event.id}
                delay={i * 0.1}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={getEventImageUrl(event.imageUrl, event.slug)}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <Link href={`/events/${event.slug}`} className="block p-6">
                  <p className="text-sm font-medium text-[#5E50A1]">
                    {formatEventDateRange(event.startDate, event.endDate)}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-[#5E50A1]">
                    {event.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-gray-600">{event.description}</p>
                  <p className="mt-4 font-semibold text-[#5E50A1]">View details →</p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
