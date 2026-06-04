"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RegistrationForm } from "./RegistrationForm";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { formatEventDateRange, formatNairaFromKobo } from "@/lib/utils/format";
import { getEventDetailImageUrl } from "@/lib/events/image";
import { EventCoverImage } from "./EventCoverImage";
import type { ChapterEvent } from "@/types/event";

interface EventDetailProps {
  event: ChapterEvent;
}

function extractEmail(text: string): string {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  return match?.[0] ?? "";
}

export function EventDetail({ event }: EventDetailProps) {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");
  const [registerOpen, setRegisterOpen] = useState(false);
  const heroImage = getEventDetailImageUrl(event);

  return (
    <article>
      <div className="relative aspect-[3/4] max-h-[520px] w-full overflow-hidden bg-primary/10 sm:aspect-[21/9] sm:max-h-none">
        <EventCoverImage
          src={heroImage}
          alt={`${event.title} flier`}
          fit="contain"
          className="sm:object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent sm:from-primary-dark/90 sm:via-primary/40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-10">
          <Link
            href="/events"
            className="mb-4 inline-block text-sm text-white/80 hover:text-white"
          >
            ← All events
          </Link>
          {event.subtitle && (
            <p className="text-sm font-medium uppercase tracking-wide text-white/90">
              {event.subtitle}
            </p>
          )}
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{event.title}</h1>
          <p className="mt-2 text-lg text-white/90">
            {formatEventDateRange(event.startDate, event.endDate)}
          </p>
          <p className="mt-1 text-white/80">{event.location}</p>
        </div>
      </div>

      {paymentStatus === "success" && (
        <div className="border-b border-accent-teal/30 bg-surface-mint px-4 py-3 text-center text-sm text-accent-teal">
          Payment received. Your registration is recognized — confirmation will follow
          shortly.
        </div>
      )}

      <div className="page-container section-padding max-w-5xl">
        {event.motto && (
          <p className="rounded-lg bg-surface-lavender px-4 py-3 text-center text-base font-medium italic text-primary">
            {event.motto}
          </p>
        )}

        {event.theme && (
          <section className="mt-8 rounded-xl border border-primary/15 border-l-4 border-l-accent-gold bg-surface p-5">
            <h2 className="text-xs font-bold uppercase tracking-wide text-accent-gold">
              Theme
            </h2>
            <p className="mt-2 text-base leading-relaxed text-gray-800">{event.theme}</p>
          </section>
        )}

        <section className="mt-6 grid gap-3 sm:grid-cols-2">
          {event.accreditation && (
            <div className="rounded-xl border border-primary/10 border-t-2 border-t-accent-teal bg-white p-4">
              <h3 className="text-xs font-bold uppercase text-accent-teal">Accreditation</h3>
              <p className="mt-1 font-medium text-gray-900">{event.accreditation}</p>
            </div>
          )}
          <div className="rounded-xl border border-primary/10 border-t-2 border-t-accent-coral bg-white p-4">
            <h3 className="text-xs font-bold uppercase text-accent-coral">Venue</h3>
            <p className="mt-1 font-medium text-gray-900">
              {event.venue ?? event.location}
            </p>
          </div>
        </section>

        <p className="mt-6 text-sm leading-relaxed text-gray-600">{event.description}</p>

        {event.pricingTiers && event.pricingTiers.length > 0 && (
          <section className="mt-8">
            <h2 className="section-heading-accent text-lg font-semibold text-gray-900">
              Registration fees
            </h2>
            <ul className="mt-3 divide-y divide-primary/10 overflow-hidden rounded-xl border border-primary/10">
              {event.pricingTiers.map((tier) => (
                <li
                  key={tier.label}
                  className="flex items-center justify-between bg-white px-4 py-3 even:bg-surface"
                >
                  <span className="text-sm text-gray-700">{tier.label}</span>
                  <span className="font-semibold text-accent-coral">
                    {formatNairaFromKobo(tier.amountKobo)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-xs text-gray-500">
              Your registration fee is based on the status you select when registering.
            </p>
          </section>
        )}

        {event.tracks && event.tracks.length > 0 && (
          <section className="mt-8">
            <h2 className="section-heading-accent text-lg font-semibold text-gray-900">
              Conference tracks
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {event.tracks.map((track, i) => (
                <div
                  key={track.title}
                  className={`rounded-xl border border-primary/10 bg-white p-4 border-l-4 ${
                    i % 3 === 0
                      ? "border-l-accent-gold"
                      : i % 3 === 1
                        ? "border-l-accent-teal"
                        : "border-l-accent-coral"
                  }`}
                >
                  <h3 className="font-semibold text-primary">{track.title}</h3>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-600">
                    {track.topics.map((topic) => (
                      <li key={topic}>{topic}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {event.abstractSubmission && (
          <section className="mt-8 rounded-xl border border-accent-teal/20 bg-surface-mint p-5">
            <h2 className="text-lg font-semibold text-accent-teal">Call for abstracts</h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>
                <strong>Word limit:</strong> Maximum {event.abstractSubmission.wordLimit}{" "}
                words
              </li>
              <li>
                <strong>Structure:</strong> {event.abstractSubmission.structure}
              </li>
              <li>
                <strong>Keywords:</strong> Include {event.abstractSubmission.keywordsCount}{" "}
                keywords
              </li>
              <li>
                <strong>Formats:</strong>{" "}
                {event.abstractSubmission.formats.join(" · ")}
              </li>
            </ul>
            {event.abstractSubmission.guidelines && (
              <div className="mt-4 rounded-lg border border-accent-teal/30 bg-white/80 p-4">
                <p className="text-sm font-semibold text-accent-teal">
                  Submission guidelines
                </p>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {event.abstractSubmission.guidelines}
                </p>
                {(() => {
                  const email = extractEmail(event.abstractSubmission.guidelines!);
                  return email ? (
                    <a
                      href={`mailto:${email}`}
                      className="mt-3 inline-block text-sm font-semibold text-accent-teal hover:underline"
                    >
                      Email your abstract to {email} →
                    </a>
                  ) : null;
                })()}
              </div>
            )}
          </section>
        )}

        {event.contacts && event.contacts.length > 0 && (
          <section className="mt-8">
            <h2 className="section-heading-accent text-lg font-semibold text-gray-900">
              RSVP / enquiries
            </h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {event.contacts.map((contact) => (
                <li
                  key={contact.phone}
                  className="rounded-lg border border-primary/10 bg-surface-lavender p-4 text-sm text-gray-700"
                >
                  <span className="font-medium">{contact.name}</span>
                  <br />
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-accent-teal hover:underline"
                  >
                    {contact.phone}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-10 flex flex-wrap gap-3 border-t border-primary/10 pt-8">
          <Button onClick={() => setRegisterOpen(true)} variant="gold" className="min-w-[180px]">
            Register & pay
          </Button>
          <Link href="/events">
            <Button variant="secondary">Back to events</Button>
          </Link>
        </div>
      </div>

      <Modal
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        title="Event registration"
      >
        <RegistrationForm event={event} onSuccess={() => setRegisterOpen(false)} />
      </Modal>
    </article>
  );
}
