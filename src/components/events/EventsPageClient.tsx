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
      <div className="relative h-40 overflow-hidden sm:h-48">
        <Image
          src={siteImages.eventsBanner}
          alt="Conference event"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/80 to-accent-teal/60" />
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="page-container relative flex h-full flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-gold">
            Programs & conferences
          </p>
          <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">Chapter Events</h1>
        </div>
      </div>

      {paymentStatus === "success" && (
        <div className="border-b border-accent-teal/30 bg-surface-mint px-4 py-3 text-center text-sm text-accent-teal">
          Payment received. Your registration is recognized — confirmation will follow
          shortly.
        </div>
      )}

      <div className="section-padding">
        <div className="page-container">
          <AnimatedSection>
            <div className="rounded-xl border border-primary/10 bg-surface-lavender p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-gray-700">
                Select an event to view full details, tracks, and registration fees. Register
                online and pay securely via{" "}
                <span className="font-semibold text-accent-teal">Paystack</span>.
              </p>
            </div>
          </AnimatedSection>

          {events.length === 0 ? (
            <p className="mt-8 rounded-lg bg-surface-lavender px-4 py-3 text-gray-500">
              No events are published yet.
            </p>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {events.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
