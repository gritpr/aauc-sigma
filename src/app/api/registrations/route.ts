import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation/registration";
import { createRegistration } from "@/services/registrations";
import { getEventById } from "@/services/events";
import {
  buildPaymentReference,
  initializePaystackTransaction,
} from "@/lib/paystack/initialize";
import { getServerEnv } from "@/config/env";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const registration = await createRegistration(parsed.data);
    const event = await getEventById(registration.eventId);
    const { siteUrl } = getServerEnv();
    const reference = buildPaymentReference(registration.id);
    const eventPath = event?.slug ? `/events/${event.slug}` : "/events";

    const payment = await initializePaystackTransaction({
      email: registration.email,
      amountKobo: registration.amount,
      reference,
      metadata: {
        registrationId: registration.id,
        eventId: registration.eventId,
      },
      callbackUrl: `${siteUrl}${eventPath}?payment=success&registration=${registration.id}`,
    });

    return NextResponse.json({
      registrationId: registration.id,
      authorizationUrl: payment.authorizationUrl,
    });
  } catch (error) {
    console.error("[registrations]", error);
    const message =
      error instanceof Error ? error.message : "Registration failed";
    const status = message.includes("not found") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
