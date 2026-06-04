import { z } from "zod";

export const participantStatusSchema = z.enum(["member", "non_member", "student"]);

export const standardRegistrationSchema = z.object({
  eventId: z.string().min(1),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  organization: z.string().optional(),
  role: z.string().optional(),
});

export const conferenceRegistrationSchema = z.object({
  eventId: z.string().min(1),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  role: z.string().min(1, "Role is required"),
  cadre: z.string().min(1, "Cadre is required"),
  preferredNameOnCertificate: z.string().min(1, "Preferred name on certificate is required"),
  participantStatus: participantStatusSchema,
  gender: z.string().min(1, "Gender is required"),
  industry: z.string().min(1, "Industry is required"),
  institution: z.string().min(1, "Institution is required"),
});

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
