"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { EventCard } from "./EventCard";
import { RegistrationForm } from "./RegistrationForm";
import { Modal } from "@/components/ui/Modal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { ChapterEvent } from "@/types/event";

interface EventsPageClientProps {
  events: ChapterEvent[];
}

export function EventsPageClient({ events }: EventsPageClientProps) {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");
  const [selectedEvent, setSelectedEvent] = useState<ChapterEvent | null>(null);

  return (
    <>
      {paymentStatus === "success" && (
        <div className="border-b border-green-200 bg-green-50 px-4 py-3 text-center text-sm text-green-800">
          Payment received. Your registration is recognized — confirmation will follow
          shortly.
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <AnimatedSection>
          <h1 className="text-4xl font-bold text-gray-900">Chapter Events</h1>
          <p className="mt-4 max-w-2xl text-gray-600">
            Explore upcoming programs, workshops, and conferences. Register online and
            complete payment securely via Paystack.
          </p>
        </AnimatedSection>

        {events.length === 0 ? (
          <p className="mt-12 text-gray-500">No events are published yet.</p>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {events.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                index={i}
                onRegister={setSelectedEvent}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        title="Event registration"
      >
        {selectedEvent && (
          <RegistrationForm
            event={selectedEvent}
            onSuccess={() => setSelectedEvent(null)}
          />
        )}
      </Modal>
    </>
  );
}
