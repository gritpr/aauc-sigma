"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import {
  getParticipantStatusOptions,
  isConferenceEvent,
} from "@/lib/registration/pricing";
import { validateRegistrationPhoto } from "@/lib/validation/registration";
import { formatNairaFromKobo } from "@/lib/utils/format";
import type { ChapterEvent } from "@/types/event";
import type { ParticipantStatus } from "@/types/registration";

interface RegistrationFormProps {
  event: ChapterEvent;
  onSuccess: () => void;
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

const GENDER_OPTIONS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "non_binary", label: "Non-binary" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

export function RegistrationForm({ event, onSuccess }: RegistrationFormProps) {
  const conference = isConferenceEvent(event);
  const statusOptions = useMemo(
    () => (conference ? getParticipantStatusOptions(event) : []),
    [conference, event]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ParticipantStatus>("member");

  const selectedAmount = useMemo(() => {
    const option = statusOptions.find((o) => o.value === selectedStatus);
    return option?.amountKobo ?? event.priceKobo;
  }, [statusOptions, selectedStatus, event.priceKobo]);

  async function handleStandardSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const body = {
      eventId: event.id,
      fullName: form.get("fullName") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      organization: (form.get("organization") as string) || undefined,
      role: (form.get("role") as string) || undefined,
    };

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(parseApiError(data));
      }
      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
        return;
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleConferenceSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const picture = form.get("picture");

    const photoError = validateRegistrationPhoto(
      picture instanceof File ? picture : null
    );
    if (photoError) {
      setError(photoError);
      setLoading(false);
      return;
    }

    form.set("eventId", event.id);

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(parseApiError(data));
      }
      if (data.paymentUrl) {
        window.open(data.paymentUrl, "_blank", "noopener,noreferrer");
        onSuccess();
        return;
      }
      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
        return;
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (conference) {
    return (
      <form onSubmit={handleConferenceSubmit} className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
        <p className="text-sm text-gray-600">
          Registering for: <strong>{event.title}</strong>
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700">
              Full name *
            </label>
            <input id="fullName" name="fullName" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input id="email" name="email" type="email" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
              Phone *
            </label>
            <input id="phone" name="phone" type="tel" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="role" className="mb-1 block text-sm font-medium text-gray-700">
              Role *
            </label>
            <input id="role" name="role" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="cadre" className="mb-1 block text-sm font-medium text-gray-700">
              Cadre *
            </label>
            <input id="cadre" name="cadre" required className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="preferredNameOnCertificate"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Preferred name on certificate *
            </label>
            <input
              id="preferredNameOnCertificate"
              name="preferredNameOnCertificate"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="gender" className="mb-1 block text-sm font-medium text-gray-700">
              Gender *
            </label>
            <select id="gender" name="gender" required className={inputClass} defaultValue="">
              <option value="" disabled>
                Select gender
              </option>
              {GENDER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="industry" className="mb-1 block text-sm font-medium text-gray-700">
              Industry *
            </label>
            <input id="industry" name="industry" required className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="institution" className="mb-1 block text-sm font-medium text-gray-700">
              Institution *
            </label>
            <input id="institution" name="institution" required className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="picture" className="mb-1 block text-sm font-medium text-gray-700">
              Picture (for conference tag) *
            </label>
            <input
              id="picture"
              name="picture"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:text-sm file:font-medium file:text-primary`}
            />
            <p className="mt-1 text-xs text-gray-500">JPEG, PNG, or WebP. Max 5 MB.</p>
          </div>
        </div>

        <fieldset className="rounded-xl border border-primary/15 bg-surface p-4">
          <legend className="px-1 text-sm font-semibold text-gray-900">
            Status * <span className="font-normal text-gray-500">(sets your fee)</span>
          </legend>
          <div className="mt-3 space-y-2">
            {statusOptions.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-4 py-3 transition-colors ${
                  selectedStatus === option.value
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/30"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="participantStatus"
                    value={option.value}
                    required
                    checked={selectedStatus === option.value}
                    onChange={() => setSelectedStatus(option.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-900">{option.label}</span>
                </span>
                <span className="text-sm font-bold text-accent-coral">
                  {formatNairaFromKobo(option.amountKobo)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <p className="text-center text-sm text-gray-600">
          Total due:{" "}
          <strong className="text-primary">{formatNairaFromKobo(selectedAmount)}</strong>
        </p>

        <p className="rounded-lg bg-surface-lavender px-3 py-2 text-xs text-gray-600">
          After you submit, you&apos;ll be taken to Paystack to complete payment. If you
          are submitting an abstract, attach your payment receipt to the conference email
          as described on the event page.
        </p>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving…" : "Submit & pay on Paystack"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleStandardSubmit} className="space-y-4">
      <p className="text-sm text-gray-600">
        Registering for: <strong>{event.title}</strong>
      </p>
      <div>
        <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700">
          Full name *
        </label>
        <input id="fullName" name="fullName" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
          Phone *
        </label>
        <input id="phone" name="phone" type="tel" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="organization" className="mb-1 block text-sm font-medium text-gray-700">
          Organization
        </label>
        <input id="organization" name="organization" className={inputClass} />
      </div>
      <div>
        <label htmlFor="role" className="mb-1 block text-sm font-medium text-gray-700">
          Role / title
        </label>
        <input id="role" name="role" className={inputClass} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Processing…" : "Continue to payment"}
      </Button>
    </form>
  );
}

function parseApiError(data: unknown): string {
  if (typeof data === "object" && data !== null && "error" in data) {
    const err = (data as { error: unknown }).error;
    if (typeof err === "string") return err;
    if (typeof err === "object" && err !== null) {
      const messages = Object.values(err as Record<string, string[] | undefined>)
        .flat()
        .filter(Boolean);
      if (messages.length) return messages.join(". ");
    }
  }
  return "Registration failed. Please try again.";
}
