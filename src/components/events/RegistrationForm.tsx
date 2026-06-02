"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { ChapterEvent } from "@/types/event";

interface RegistrationFormProps {
  event: ChapterEvent;
  onSuccess: () => void;
}

export function RegistrationForm({ event, onSuccess }: RegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Registration failed. Please try again."
        );
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

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-[#5E50A1] focus:outline-none focus:ring-2 focus:ring-[#5E50A1]/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
