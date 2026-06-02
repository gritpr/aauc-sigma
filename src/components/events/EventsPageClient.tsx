"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { EventCard } from "./EventCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { siteImages } from "@/config/images";
import type { ChapterEvent } from "@/types/event";

interface EventsPageClientProps {
  events: ChapterEvent[];
}

export function EventsPageClient({ events }: EventsPageClientProps) {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");

  return (
    <>
      <div className="relative h-48 overflow-hidden sm:h-56">
        <Image
          src={siteImages.events.conference}
          alt="Chapter events"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#5E50A1]/75" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Chapter Events</h1>
        </div>
      </div>

      {paymentStatus === "success" && (
        <div className="border-b border-green-200 bg-green-50 px-4 py-3 text-center text-sm text-green-800">
          Payment received. Your registration is recognized — confirmation will follow
          shortly.
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <AnimatedSection>
          <p className="max-w-2xl text-gray-600">
            Select an event to view full details, tracks, and registration fees. Register
            online and pay securely via Paystack.
          </p>
        </AnimatedSection>

        {events.length === 0 ? (
          <p className="mt-12 text-gray-500">No events are published yet.</p>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
