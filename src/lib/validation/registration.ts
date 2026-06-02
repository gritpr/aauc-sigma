import { z } from "zod";

export const registrationSchema = z.object({
  eventId: z.string().min(1),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7, "Phone number is required"),
  organization: z.string().optional(),
  role: z.string().optional(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
