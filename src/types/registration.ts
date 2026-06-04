export type RegistrationStatus =
  | "pending_payment"
  | "payment_received"
  | "confirmed"
  | "cancelled";

export type ParticipantStatus = "member" | "non_member" | "student";

export interface Registration {
  id: string;
  eventId: string;
  eventTitle: string;
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  role?: string;
  cadre?: string;
  preferredNameOnCertificate?: string;
  photoUrl?: string;
  participantStatus?: ParticipantStatus;
  gender?: string;
  industry?: string;
  institution?: string;
  status: RegistrationStatus;
  amount: number;
  currency: string;
  paystackReference?: string;
  paidAt?: Date;
  emailSentAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRegistrationInput {
  eventId: string;
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  role?: string;
  cadre?: string;
  preferredNameOnCertificate?: string;
  photoUrl?: string;
  participantStatus?: ParticipantStatus;
  gender?: string;
  industry?: string;
  institution?: string;
}
