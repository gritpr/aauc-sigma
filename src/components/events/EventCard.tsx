"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatEventDateRange, formatNairaFromKobo } from "@/lib/utils/format";
import { getEventImageUrl } from "@/config/images";
import type { ChapterEvent } from "@/types/event";

interface EventCardProps {
  event: ChapterEvent;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const imageSrc = getEventImageUrl(event.imageUrl, event.slug);
  const href = `/events/${event.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={href}
        className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5E50A1]"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={imageSrc}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <p className="absolute bottom-3 left-4 text-sm font-medium text-white">
            {formatEventDateRange(event.startDate, event.endDate)}
          </p>
        </div>
        <div className="flex flex-1 flex-col p-6">
          {event.subtitle && (
            <p className="text-xs font-medium uppercase tracking-wide text-[#5E50A1]">
              {event.subtitle}
            </p>
          )}
          <h3 className="mt-1 text-xl font-semibold text-gray-900 group-hover:text-[#5E50A1] transition-colors">
            {event.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{event.location}</p>
          <p className="mt-4 flex-1 line-clamp-2 text-gray-600">{event.description}</p>
          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-lg font-bold text-gray-900">
              From {formatNairaFromKobo(event.priceKobo)}
            </span>
            <span className="rounded-full bg-[#5E50A1] px-5 py-2.5 text-sm font-semibold text-white">
              View details
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
