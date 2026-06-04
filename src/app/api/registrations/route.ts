import { NextResponse } from "next/server";
import {
  conferenceRegistrationSchema,
  standardRegistrationSchema,
  validateRegistrationPhoto,
} from "@/lib/validation/registration";
import { uploadRegistrationTagPhoto } from "@/lib/registration/uploadPhoto";
import {
  isConferenceEvent,
  resolvePaymentLink,
} from "@/lib/registration/pricing";
import { createRegistration, setRegistrationPhotoUrl } from "@/services/registrations";
import { getEventById } from "@/services/events";
import {
  buildPaymentReference,
  initializePaystackTransaction,
} from "@/lib/paystack/initialize";
import { getServerEnv } from "@/config/env";

async function startPaystackCheckout(
  registrationId: string,
  eventId: string,
  email: string,
  amountKobo: number,
  eventSlug?: string
) {
  const { siteUrl } = getServerEnv();
  const reference = buildPaymentReference(registrationId);
  const eventPath = eventSlug ? `/events/${eventSlug}` : "/events";

  const payment = await initializePaystackTransaction({
    email,
    amountKobo,
    reference,
    metadata: {
      registrationId,
      eventId,
    },
    callbackUrl: `${siteUrl}${eventPath}?payment=success&registration=${registrationId}`,
  });

  return NextResponse.json({
    registrationId,
    authorizationUrl: payment.authorizationUrl,
  });
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const eventId = String(form.get("eventId") ?? "");
      const event = await getEventById(eventId);

      if (!event || !isConferenceEvent(event)) {
        return NextResponse.json(
          { error: "Conference registration is not available for this event" },
          { status: 400 }
        );
      }

      const photoFile = form.get("picture");
      const photoError = validateRegistrationPhoto(
        photoFile instanceof File ? photoFile : null
      );
      if (photoError) {
        return NextResponse.json({ error: photoError }, { status: 400 });
      }

      const parsed = conferenceRegistrationSchema.safeParse({
        eventId,
        fullName: form.get("fullName"),
        email: form.get("email"),
        phone: form.get("phone"),
        role: form.get("role"),
        cadre: form.get("cadre"),
        preferredNameOnCertificate: form.get("preferredNameOnCertificate"),
        participantStatus: form.get("participantStatus"),
        gender: form.get("gender"),
        industry: form.get("industry"),
        institution: form.get("institution"),
      });

      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.flatten().fieldErrors },
          { status: 400 }
        );
      }

      const registration = await createRegistration(parsed.data);
      const file = photoFile as File;
      const buffer = Buffer.from(await file.arrayBuffer());
      const photoUrl = await uploadRegistrationTagPhoto(
        registration.id,
        buffer,
        file.type
      );

      await setRegistrationPhotoUrl(registration.id, photoUrl);

      const paymentUrl = resolvePaymentLink(event, parsed.data.participantStatus);
      if (paymentUrl) {
        return NextResponse.json({
          registrationId: registration.id,
          paymentUrl,
        });
      }

      return startPaystackCheckout(
        registration.id,
        registration.eventId,
        registration.email,
        registration.amount,
        event.slug
      );
    }

    const body = await request.json();
    const parsed = standardRegistrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const event = await getEventById(parsed.data.eventId);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const registration = await createRegistration(parsed.data);

    return startPaystackCheckout(
      registration.id,
      registration.eventId,
      registration.email,
      registration.amount,
      event.slug
    );
  } catch (error) {
    console.error("[registrations]", error);
    const message =
      error instanceof Error ? error.message : "Registration failed";
    const status = message.includes("not found") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
