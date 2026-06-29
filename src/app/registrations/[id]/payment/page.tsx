import { notFound } from "next/navigation";
import { PaymentInstructions } from "@/components/registrations/PaymentInstructions";
import { getEventById } from "@/services/events";
import { getRegistrationById } from "@/services/registrations";

interface PaymentPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PaymentPageProps) {
  const { id } = await params;
  const registration = await getRegistrationById(id);
  return {
    title: registration ? "Complete payment" : "Registration not found",
  };
}

export default async function RegistrationPaymentPage({ params }: PaymentPageProps) {
  const { id } = await params;
  const registration = await getRegistrationById(id);

  if (!registration) {
    notFound();
  }

  const event = await getEventById(registration.eventId);

  return (
    <PaymentInstructions
      registrationId={registration.id}
      fullName={registration.fullName}
      eventTitle={registration.eventTitle}
      amountKobo={registration.amount}
      tierLabel={registration.pricingTierLabel}
      eventSlug={event?.slug}
    />
  );
}
