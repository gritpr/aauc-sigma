"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatEventDateRange, formatNairaFromKobo } from "@/lib/utils/format";
import { getEventCardImageUrl } from "@/lib/events/image";
import { EventCoverImage } from "./EventCoverImage";
import type { ChapterEvent } from "@/types/event";

interface EventCardProps {
  event: ChapterEvent;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const imageSrc = getEventCardImageUrl(event);
  const href = `/events/${event.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent-gold/40 hover:shadow-lg hover:shadow-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <EventCoverImage
            src={imageSrc}
            alt={event.title}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
          <p className="absolute bottom-3 left-3 rounded-md bg-accent-gold/90 px-2 py-0.5 text-xs font-bold text-primary-dark">
            {formatEventDateRange(event.startDate, event.endDate)}
          </p>
        </div>
        <div className="flex flex-1 flex-col p-5">
          {event.subtitle && (
            <p className="text-[10px] font-bold uppercase tracking-wide text-accent-teal">
              {event.subtitle}
            </p>
          )}
          <h3 className="mt-1 text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary">
            {event.title}
          </h3>
          <p className="mt-1 text-xs text-gray-500">{event.location}</p>
          <p className="mt-3 flex-1 line-clamp-2 text-sm text-gray-600">{event.description}</p>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-primary/10 pt-4">
            <span className="text-base font-bold text-accent-coral">
              From {formatNairaFromKobo(event.priceKobo)}
            </span>
            <span className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white transition-colors group-hover:bg-primary-dark">
              View details
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
