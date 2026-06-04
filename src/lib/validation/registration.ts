import { z } from "zod";

export const participantStatusSchema = z.enum(["member", "non_member", "student"]);

export const genderSchema = z.enum([
  "female",
  "male",
  "non_binary",
  "prefer_not_to_say",
]);

const phoneSchema = z
  .string()
  .min(7, "Enter a valid phone number (at least 7 digits)")
  .max(20, "Phone number is too long")
  .regex(/^[\d\s+()-]+$/, "Phone may only contain digits, spaces, and + ( ) -");

const nameSchema = z
  .string()
  .min(2, "Must be at least 2 characters")
  .max(120, "Must be 120 characters or fewer");

export const standardRegistrationSchema = z.object({
  eventId: z.string().min(1),
  fullName: nameSchema,
  email: z.string().email("Enter a valid email address"),
  phone: phoneSchema,
  organization: z.string().max(200, "Must be 200 characters or fewer").optional(),
  role: z.string().max(120, "Must be 120 characters or fewer").optional(),
});

export const conferenceRegistrationSchema = z.object({
  eventId: z.string().min(1),
  fullName: nameSchema,
  email: z.string().email("Enter a valid email address"),
  phone: phoneSchema,
  role: z.string().min(1, "Role is required").max(120, "Must be 120 characters or fewer"),
  cadre: z.string().min(1, "Cadre is required").max(120, "Must be 120 characters or fewer"),
  preferredNameOnCertificate: z
    .string()
    .min(1, "Preferred name on certificate is required")
    .max(120, "Must be 120 characters or fewer"),
  participantStatus: participantStatusSchema,
  gender: genderSchema,
  industry: z.string().min(1, "Industry is required").max(120, "Must be 120 characters or fewer"),
  institution: z
    .string()
    .min(1, "Institution is required")
    .max(200, "Must be 200 characters or fewer"),
});

export type FieldErrors = Partial<Record<string, string>>;

export function zodToFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !errors[field]) {
      errors[field] = issue.message;
    }
  }
  return errors;
}

function trimFormValue(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function optionalTrimmed(form: FormData, key: string): string | undefined {
  const value = trimFormValue(form, key);
  return value.length > 0 ? value : undefined;
}

export function validateStandardRegistrationForm(
  form: FormData,
  eventId: string
) {
  return standardRegistrationSchema.safeParse({
    eventId,
    fullName: trimFormValue(form, "fullName"),
    email: trimFormValue(form, "email"),
    phone: trimFormValue(form, "phone"),
    organization: optionalTrimmed(form, "organization"),
    role: optionalTrimmed(form, "role"),
  });
}

export function validateConferenceRegistrationForm(
  form: FormData,
  eventId: string
) {
  return conferenceRegistrationSchema.safeParse({
    eventId,
    fullName: trimFormValue(form, "fullName"),
    email: trimFormValue(form, "email"),
    phone: trimFormValue(form, "phone"),
    role: trimFormValue(form, "role"),
    cadre: trimFormValue(form, "cadre"),
    preferredNameOnCertificate: trimFormValue(form, "preferredNameOnCertificate"),
    participantStatus: trimFormValue(form, "participantStatus"),
    gender: trimFormValue(form, "gender"),
    industry: trimFormValue(form, "industry"),
    institution: trimFormValue(form, "institution"),
  });
}

export type StandardRegistrationFormData = z.infer<typeof standardRegistrationSchema>;
export type ConferenceRegistrationFormData = z.infer<typeof conferenceRegistrationSchema>;

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

export function validateRegistrationPhoto(file: File | null): string | null {
  if (!file || file.size === 0) {
    return "A picture for your conference tag is required";
  }
  if (!ALLOWED_PHOTO_TYPES.has(file.type)) {
    return "Photo must be JPEG, PNG, or WebP";
  }
  if (file.size > MAX_PHOTO_BYTES) {
    return "Photo must be 5 MB or smaller";
  }
  return null;
}
