"use client";

import Link from "next/link";
import { CopyableValue } from "@/components/ui/CopyableValue";
import { Button } from "@/components/ui/Button";
import { bankTransferConfig } from "@/config/payment";
import { formatNairaFromKobo } from "@/lib/utils/format";

interface PaymentInstructionsProps {
  registrationId: string;
  fullName: string;
  eventTitle: string;
  amountKobo: number;
  tierLabel?: string;
  eventSlug?: string;
}

export function PaymentInstructions({
  registrationId,
  fullName,
  eventTitle,
  amountKobo,
  tierLabel,
  eventSlug,
}: PaymentInstructionsProps) {
  const fee = formatNairaFromKobo(amountKobo);
  const whatsappMessage = encodeURIComponent(
    `Hello, I have completed payment for ${eventTitle}. Registration ref: ${registrationId}. Name: ${fullName}.`
  );
  const whatsappHref = `https://wa.me/${bankTransferConfig.whatsappIntl}?text=${whatsappMessage}`;

  return (
    <div className="page-container section-padding max-w-2xl">
      <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-lg shadow-primary/5">
        <div className="bg-gradient-to-br from-primary via-primary-dark to-accent-teal px-6 py-8 text-white sm:px-8">
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-2xl"
              aria-hidden
            >
              ✓
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent-gold">
                Registration received
              </p>
              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                Complete your payment
              </h1>
              <p className="mt-2 text-sm text-white/85">
                Hi <strong>{fullName}</strong> — one more step to secure your spot at{" "}
                <strong>{eventTitle}</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          {tierLabel && (
            <p className="rounded-lg bg-surface-lavender px-4 py-2.5 text-sm text-gray-700">
              Category: <strong className="text-primary">{tierLabel}</strong>
            </p>
          )}

          <section>
            <h2 className="section-heading-accent text-lg font-semibold text-gray-900">
              Step 1 — Pay your registration fee
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              To complete your registration, please pay the amount below to this account.
            </p>

            <div className="mt-4">
              <CopyableValue
                label="Registration fee"
                value={String(amountKobo / 100)}
                display={fee}
                mono={false}
                className="border-accent-gold/30 bg-surface-mint/30"
              />
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-primary/10 bg-surface px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Bank
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {bankTransferConfig.bankName}
                </p>
              </div>

              <CopyableValue
                label="Naira account"
                value={bankTransferConfig.accountNumber}
              />

              <div className="rounded-xl border border-primary/10 bg-surface px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Account name
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-gray-900">
                  {bankTransferConfig.accountName}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-accent-teal/20 bg-surface-mint/40 p-5">
            <h2 className="text-lg font-semibold text-accent-teal">
              Step 2 — Send your receipt
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              After payment, send the receipt to our WhatsApp number for acknowledgement
              and addition to the conference group.
            </p>

            <div className="mt-4">
              <CopyableValue
                label="WhatsApp"
                value={bankTransferConfig.whatsappNumber}
                display={bankTransferConfig.whatsappNumber}
              />
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block"
            >
              <Button variant="teal" className="w-full">
                Open WhatsApp with message
              </Button>
            </a>
          </section>

          <p className="text-center text-xs text-gray-500">
            Reference: <span className="font-mono text-gray-600">{registrationId}</span>
          </p>

          {eventSlug && (
            <div className="flex justify-center border-t border-primary/10 pt-6">
              <Link
                href={`/events/${eventSlug}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                ← Back to event details
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
