import { FieldValue, type DocumentData } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import type { CreateRegistrationInput, Registration, RegistrationStatus } from "@/types/registration";
import { getEventById } from "./events";

function mapDoc(id: string, data: DocumentData): Registration {
  return {
    id,
    eventId: data.eventId,
    eventTitle: data.eventTitle,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    organization: data.organization,
    role: data.role,
    status: data.status as RegistrationStatus,
    amount: data.amount,
    currency: data.currency,
    paystackReference: data.paystackReference,
    paidAt: data.paidAt?.toDate(),
    emailSentAt: data.emailSentAt?.toDate(),
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  };
}

export async function createRegistration(
  input: CreateRegistrationInput
): Promise<Registration> {
  const event = await getEventById(input.eventId);
  if (!event) {
    throw new Error("Event not found or not available for registration");
  }

  const now = FieldValue.serverTimestamp();
  const ref = getAdminDb().collection("registrations").doc();

  await ref.set({
    eventId: event.id,
    eventTitle: event.title,
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    organization: input.organization?.trim() || null,
    role: input.role?.trim() || null,
    status: "pending_payment",
    amount: event.priceKobo,
    currency: "NGN",
    createdAt: now,
    updatedAt: now,
  });

  const saved = await ref.get();
  return mapDoc(saved.id, saved.data()!);
}

export async function getRegistrationById(id: string): Promise<Registration | null> {
  const doc = await getAdminDb().collection("registrations").doc(id).get();
  if (!doc.exists) return null;
  return mapDoc(doc.id, doc.data()!);
}

export async function markPaymentReceived(
  id: string,
  paystackReference: string
): Promise<Registration | null> {
  const ref = getAdminDb().collection("registrations").doc(id);
  const existing = await ref.get();
  if (!existing.exists) return null;

  const data = existing.data()!;
  if (data.status === "payment_received" || data.status === "confirmed") {
    return mapDoc(existing.id, data);
  }

  await ref.update({
    status: "payment_received",
    paystackReference,
    paidAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });

  const updated = await ref.get();
  return mapDoc(updated.id, updated.data()!);
}

export async function markEmailSent(id: string): Promise<void> {
  await getAdminDb().collection("registrations").doc(id).update({
    emailSentAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  });
}
