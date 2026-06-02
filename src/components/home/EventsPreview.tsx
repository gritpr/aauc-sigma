import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { formatEventDateRange, formatNairaFromKobo } from "@/lib/utils/format";
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
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-medium text-[#5E50A1]">
                  {formatEventDateRange(event.startDate, event.endDate)}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">{event.title}</h3>
                <p className="mt-2 line-clamp-2 text-gray-600">{event.description}</p>
                <p className="mt-4 font-semibold text-gray-900">
                  {formatNairaFromKobo(event.priceKobo)}
                </p>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
