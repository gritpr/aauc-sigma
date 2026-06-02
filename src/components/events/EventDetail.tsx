"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RegistrationForm } from "./RegistrationForm";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { formatEventDateRange, formatNairaFromKobo } from "@/lib/utils/format";
import { getEventImageUrl } from "@/config/images";
import type { ChapterEvent } from "@/types/event";

interface EventDetailProps {
  event: ChapterEvent;
}

export function EventDetail({ event }: EventDetailProps) {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");
  const [registerOpen, setRegisterOpen] = useState(false);
  const heroImage = getEventImageUrl(
    event.flierImageUrl ?? event.imageUrl,
    event.slug
  );

  return (
    <article>
      <div className="relative aspect-[3/4] max-h-[520px] w-full overflow-hidden bg-[#5E50A1]/10 sm:aspect-[21/9] sm:max-h-none">
        <Image
          src={heroImage}
          alt={`${event.title} flier`}
          fill
          className="object-contain sm:object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent sm:from-[#5E50A1]/90 sm:via-[#5E50A1]/40" />
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
        <div className="border-b border-green-200 bg-green-50 px-4 py-3 text-center text-sm text-green-800">
          Payment received. Your registration is recognized — confirmation will follow
          shortly.
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {event.motto && (
          <p className="text-center text-lg font-medium italic text-[#5E50A1]">
            {event.motto}
          </p>
        )}

        {event.theme && (
          <section className="mt-10 rounded-2xl border border-[#5E50A1]/15 bg-[#faf9fc] p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#5E50A1]">
              Theme
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-gray-800">{event.theme}</p>
          </section>
        )}

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {event.accreditation && (
            <div className="rounded-xl border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-500">Accreditation</h3>
              <p className="mt-1 font-medium text-gray-900">{event.accreditation}</p>
            </div>
          )}
          <div className="rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-500">Venue</h3>
            <p className="mt-1 font-medium text-gray-900">
              {event.venue ?? event.location}
            </p>
          </div>
        </section>

        <p className="mt-8 text-gray-600 leading-relaxed">{event.description}</p>

        {event.pricingTiers && event.pricingTiers.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900">Registration fees</h2>
            <ul className="mt-4 divide-y divide-gray-200 rounded-xl border border-gray-200">
              {event.pricingTiers.map((tier) => (
                <li
                  key={tier.label}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="text-gray-700">{tier.label}</span>
                  <span className="font-semibold text-[#5E50A1]">
                    {formatNairaFromKobo(tier.amountKobo)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-gray-500">
              Online registration uses the member rate ({formatNairaFromKobo(event.priceKobo)}).
              Contact the chapter for other tiers.
            </p>
          </section>
        )}

        {event.tracks && event.tracks.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900">Conference tracks</h2>
            <div className="mt-4 space-y-4">
              {event.tracks.map((track) => (
                <div
                  key={track.title}
                  className="rounded-xl border border-[#5E50A1]/10 p-5"
                >
                  <h3 className="font-semibold text-[#5E50A1]">{track.title}</h3>
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
          <section className="mt-10 rounded-2xl bg-gray-50 p-6">
            <h2 className="text-xl font-semibold text-gray-900">Call for abstracts</h2>
            <ul className="mt-4 space-y-2 text-gray-600">
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
          </section>
        )}

        {event.contacts && event.contacts.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-gray-900">RSVP / enquiries</h2>
            <ul className="mt-4 space-y-3">
              {event.contacts.map((contact) => (
                <li key={contact.phone} className="text-gray-700">
                  <span className="font-medium">{contact.name}</span>
                  <br />
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="text-[#5E50A1] hover:underline"
                  >
                    {contact.phone}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 flex flex-wrap gap-4 border-t border-gray-200 pt-10">
          <Button onClick={() => setRegisterOpen(true)} className="min-w-[200px]">
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
