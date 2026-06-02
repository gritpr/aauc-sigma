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
    <section className="section-padding border-y border-primary/10 bg-white">
      <div className="page-container">
        <AnimatedSection className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent-coral">
              Don&apos;t miss out
            </p>
            <h2 className="section-heading-accent mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              Upcoming Events
            </h2>
            <p className="mt-2 text-gray-600">
              Register for chapter programs and conferences.
            </p>
          </div>
          <Link href="/events">
            <Button variant="primary">View all events</Button>
          </Link>
        </AnimatedSection>

        {preview.length === 0 ? (
          <p className="mt-6 rounded-lg bg-surface-lavender px-4 py-3 text-gray-500">
            No upcoming events yet. Check back soon.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {preview.map((event, i) => (
              <AnimatedSection
                key={event.id}
                delay={i * 0.1}
                className="group overflow-hidden rounded-xl border border-primary/10 bg-surface shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/10"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={getEventImageUrl(event.imageUrl, event.slug)}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-accent-gold px-2.5 py-0.5 text-xs font-bold text-primary-dark">
                    {formatEventDateRange(event.startDate, event.endDate)}
                  </div>
                </div>
                <Link href={`/events/${event.slug}`} className="block p-5">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">{event.description}</p>
                  <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent-teal">
                    View details
                    <span aria-hidden="true">→</span>
                  </p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
