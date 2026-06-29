"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import {
  getPricingTierOptions,
  isConferenceEvent,
} from "@/lib/registration/pricing";
import {
  validateConferenceRegistrationForm,
  validateRegistrationIdDoc,
  validateRegistrationPhoto,
  validateStandardRegistrationForm,
  zodToFieldErrors,
  type FieldErrors,
} from "@/lib/validation/registration";
import { formatNairaFromKobo } from "@/lib/utils/format";
import type { ChapterEvent } from "@/types/event";

interface RegistrationFormProps {
  event: ChapterEvent;
  onSuccess: () => void;
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

const inputErrorClass =
  "border-red-400 focus:border-red-500 focus:ring-red-200";

const GENDER_OPTIONS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "non_binary", label: "Non-binary" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const;

function fieldClass(hasError: boolean) {
  return `${inputClass}${hasError ? ` ${inputErrorClass}` : ""}`;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

export function RegistrationForm({ event, onSuccess }: RegistrationFormProps) {
  const conference = isConferenceEvent(event);
  const tierOptions = useMemo(
    () => (conference ? getPricingTierOptions(event) : []),
    [conference, event]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [selectedTierIndex, setSelectedTierIndex] = useState(
    () => tierOptions[0]?.value ?? "0"
  );

  const selectedAmount = useMemo(() => {
    const option = tierOptions.find((o) => o.value === selectedTierIndex);
    return option?.amountKobo ?? event.priceKobo;
  }, [tierOptions, selectedTierIndex, event.priceKobo]);

  const selectedTierRequiresId = useMemo(
    () =>
      tierOptions.find((option) => option.value === selectedTierIndex)
        ?.requestIdDoc ?? false,
    [tierOptions, selectedTierIndex]
  );

  function clearFieldError(name: string) {
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function handleStandardSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    const form = new FormData(e.currentTarget);
    const parsed = validateStandardRegistrationForm(form, event.id);

    if (!parsed.success) {
      setFieldErrors(zodToFieldErrors(parsed.error));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(parseApiError(data, setFieldErrors));
      }
      if (data.instructionsUrl) {
        window.location.assign(data.instructionsUrl);
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
    setFieldErrors({});

    const form = new FormData(e.currentTarget);
    const picture = form.get("picture");

    const photoError = validateRegistrationPhoto(
      picture instanceof File ? picture : null
    );
    if (photoError) {
      setFieldErrors({ picture: photoError });
      setLoading(false);
      return;
    }

    const parsed = validateConferenceRegistrationForm(form, event.id);
    if (!parsed.success) {
      setFieldErrors(zodToFieldErrors(parsed.error));
      setLoading(false);
      return;
    }

    const requiresIdDoc =
      tierOptions.find((option) => option.value === String(parsed.data.pricingTierIndex))
        ?.requestIdDoc ?? false;
    const idDoc = form.get("idDoc");
    const idDocError = validateRegistrationIdDoc(
      idDoc instanceof File ? idDoc : null,
      requiresIdDoc
    );
    if (idDocError) {
      setFieldErrors({ idDoc: idDocError });
      setLoading(false);
      return;
    }

    const data = parsed.data;
    form.set("eventId", data.eventId);
    form.set("fullName", data.fullName);
    form.set("email", data.email);
    form.set("phone", data.phone);
    form.set("role", data.role);
    form.set("cadre", data.cadre);
    form.set("preferredNameOnCertificate", data.preferredNameOnCertificate);
    form.set("pricingTierIndex", String(data.pricingTierIndex));
    form.set("gender", data.gender);
    form.set("industry", data.industry);
    form.set("institution", data.institution);

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(parseApiError(data, setFieldErrors));
      }
      if (data.instructionsUrl) {
        window.location.assign(data.instructionsUrl);
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
      <form
        onSubmit={handleConferenceSubmit}
        noValidate
        className="max-h-[70vh] space-y-4 overflow-y-auto pr-1"
      >
        <p className="text-sm text-gray-600">
          Registering for: <strong>{event.title}</strong>
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700">
              Full name *
            </label>
            <input
              id="fullName"
              name="fullName"
              autoComplete="name"
              className={fieldClass(Boolean(fieldErrors.fullName))}
              aria-invalid={Boolean(fieldErrors.fullName)}
              onChange={() => clearFieldError("fullName")}
            />
            <FieldError message={fieldErrors.fullName} />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={fieldClass(Boolean(fieldErrors.email))}
              aria-invalid={Boolean(fieldErrors.email)}
              onChange={() => clearFieldError("email")}
            />
            <FieldError message={fieldErrors.email} />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
              Phone *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="e.g. 08012345678"
              className={fieldClass(Boolean(fieldErrors.phone))}
              aria-invalid={Boolean(fieldErrors.phone)}
              onChange={() => clearFieldError("phone")}
            />
            <FieldError message={fieldErrors.phone} />
          </div>
          <div>
            <label htmlFor="role" className="mb-1 block text-sm font-medium text-gray-700">
              Role *
            </label>
            <input
              id="role"
              name="role"
              className={fieldClass(Boolean(fieldErrors.role))}
              aria-invalid={Boolean(fieldErrors.role)}
              onChange={() => clearFieldError("role")}
            />
            <FieldError message={fieldErrors.role} />
          </div>
          <div>
            <label htmlFor="cadre" className="mb-1 block text-sm font-medium text-gray-700">
              Cadre *
            </label>
            <input
              id="cadre"
              name="cadre"
              className={fieldClass(Boolean(fieldErrors.cadre))}
              aria-invalid={Boolean(fieldErrors.cadre)}
              onChange={() => clearFieldError("cadre")}
            />
            <FieldError message={fieldErrors.cadre} />
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
              className={fieldClass(Boolean(fieldErrors.preferredNameOnCertificate))}
              aria-invalid={Boolean(fieldErrors.preferredNameOnCertificate)}
              onChange={() => clearFieldError("preferredNameOnCertificate")}
            />
            <FieldError message={fieldErrors.preferredNameOnCertificate} />
          </div>
          <div>
            <label htmlFor="gender" className="mb-1 block text-sm font-medium text-gray-700">
              Gender *
            </label>
            <select
              id="gender"
              name="gender"
              defaultValue=""
              className={fieldClass(Boolean(fieldErrors.gender))}
              aria-invalid={Boolean(fieldErrors.gender)}
              onChange={() => clearFieldError("gender")}
            >
              <option value="" disabled>
                Select gender
              </option>
              {GENDER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <FieldError message={fieldErrors.gender} />
          </div>
          <div>
            <label htmlFor="industry" className="mb-1 block text-sm font-medium text-gray-700">
              Industry *
            </label>
            <input
              id="industry"
              name="industry"
              className={fieldClass(Boolean(fieldErrors.industry))}
              aria-invalid={Boolean(fieldErrors.industry)}
              onChange={() => clearFieldError("industry")}
            />
            <FieldError message={fieldErrors.industry} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="institution" className="mb-1 block text-sm font-medium text-gray-700">
              Institution *
            </label>
            <input
              id="institution"
              name="institution"
              className={fieldClass(Boolean(fieldErrors.institution))}
              aria-invalid={Boolean(fieldErrors.institution)}
              onChange={() => clearFieldError("institution")}
            />
            <FieldError message={fieldErrors.institution} />
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
              className={`${fieldClass(Boolean(fieldErrors.picture))} file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:text-sm file:font-medium file:text-primary`}
              aria-invalid={Boolean(fieldErrors.picture)}
              onChange={() => clearFieldError("picture")}
            />
            <p className="mt-1 text-xs text-gray-500">JPEG, PNG, or WebP. Max 5 MB.</p>
            <FieldError message={fieldErrors.picture} />
          </div>
        </div>

        <fieldset
          className={`rounded-xl border bg-surface p-4 ${
            fieldErrors.pricingTierIndex
              ? "border-red-400"
              : "border-primary/15"
          }`}
        >
          <legend className="px-1 text-sm font-semibold text-gray-900">
            Registration category *{" "}
            <span className="font-normal text-gray-500">(sets your fee)</span>
          </legend>
          <div className="mt-3 space-y-2">
            {tierOptions.map((option) => (
              <label
                key={option.value}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-4 py-3 transition-colors ${
                  selectedTierIndex === option.value
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/30"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="pricingTierIndex"
                    value={option.value}
                    checked={selectedTierIndex === option.value}
                    onChange={() => {
                      setSelectedTierIndex(option.value);
                      clearFieldError("pricingTierIndex");
                      clearFieldError("idDoc");
                    }}
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
          <FieldError message={fieldErrors.pricingTierIndex} />
        </fieldset>

        {selectedTierRequiresId && (
          <div>
            <label htmlFor="idDoc" className="mb-1 block text-sm font-medium text-gray-700">
              ID card *
            </label>
            <input
              id="idDoc"
              name="idDoc"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className={`${fieldClass(Boolean(fieldErrors.idDoc))} file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1 file:text-sm file:font-medium file:text-primary`}
              aria-invalid={Boolean(fieldErrors.idDoc)}
              onChange={() => clearFieldError("idDoc")}
            />
            <p className="mt-1 text-xs text-gray-500">
              Upload a clear photo of your ID card. JPEG, PNG, or WebP. Max 5 MB.
            </p>
            <FieldError message={fieldErrors.idDoc} />
          </div>
        )}

        <p className="text-center text-sm text-gray-600">
          Total due:{" "}
          <strong className="text-primary">{formatNairaFromKobo(selectedAmount)}</strong>
        </p>

        <p className="rounded-lg bg-surface-lavender px-3 py-2 text-xs text-gray-600">
          After you submit, you&apos;ll see bank transfer details and WhatsApp instructions
          to complete payment.
        </p>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving…" : "Submit registration"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleStandardSubmit} noValidate className="space-y-4">
      <p className="text-sm text-gray-600">
        Registering for: <strong>{event.title}</strong>
      </p>
      <div>
        <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-gray-700">
          Full name *
        </label>
        <input
          id="fullName"
          name="fullName"
          autoComplete="name"
          className={fieldClass(Boolean(fieldErrors.fullName))}
          aria-invalid={Boolean(fieldErrors.fullName)}
          onChange={() => clearFieldError("fullName")}
        />
        <FieldError message={fieldErrors.fullName} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={fieldClass(Boolean(fieldErrors.email))}
          aria-invalid={Boolean(fieldErrors.email)}
          onChange={() => clearFieldError("email")}
        />
        <FieldError message={fieldErrors.email} />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
          Phone *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="e.g. 08012345678"
          className={fieldClass(Boolean(fieldErrors.phone))}
          aria-invalid={Boolean(fieldErrors.phone)}
          onChange={() => clearFieldError("phone")}
        />
        <FieldError message={fieldErrors.phone} />
      </div>
      <div>
        <label htmlFor="organization" className="mb-1 block text-sm font-medium text-gray-700">
          Organization
        </label>
        <input
          id="organization"
          name="organization"
          className={fieldClass(Boolean(fieldErrors.organization))}
          aria-invalid={Boolean(fieldErrors.organization)}
          onChange={() => clearFieldError("organization")}
        />
        <FieldError message={fieldErrors.organization} />
      </div>
      <div>
        <label htmlFor="role" className="mb-1 block text-sm font-medium text-gray-700">
          Role / title
        </label>
        <input
          id="role"
          name="role"
          className={fieldClass(Boolean(fieldErrors.role))}
          aria-invalid={Boolean(fieldErrors.role)}
          onChange={() => clearFieldError("role")}
        />
        <FieldError message={fieldErrors.role} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Processing…" : "Submit registration"}
      </Button>
    </form>
  );
}

function parseApiError(
  data: unknown,
  setFieldErrors: (errors: FieldErrors) => void
): string {
  if (typeof data === "object" && data !== null && "error" in data) {
    const err = (data as { error: unknown }).error;
    if (typeof err === "string") return err;
    if (typeof err === "object" && err !== null) {
      const fieldMap: FieldErrors = {};
      for (const [key, messages] of Object.entries(
        err as Record<string, string[] | undefined>
      )) {
        const first = messages?.[0];
        if (first) fieldMap[key] = first;
      }
      if (Object.keys(fieldMap).length > 0) {
        setFieldErrors(fieldMap);
        return "Please fix the errors below and try again.";
      }
    }
  }
  return "Registration failed. Please try again.";
}
