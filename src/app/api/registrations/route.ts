import { NextResponse } from "next/server";
import {
  conferenceRegistrationSchema,
  standardRegistrationSchema,
  validateRegistrationIdDoc,
  validateRegistrationPhoto,
} from "@/lib/validation/registration";
import {
  uploadRegistrationIdDoc,
  uploadRegistrationTagPhoto,
} from "@/lib/registration/uploadPhoto";
import { getPaymentInstructionsPath } from "@/config/payment";
import { isConferenceEvent, tierRequiresIdDoc } from "@/lib/registration/pricing";
import {
  createRegistration,
  setRegistrationIdDocUrl,
  setRegistrationPhotoUrl,
} from "@/services/registrations";
import { getEventById } from "@/services/events";

function paymentInstructionsResponse(registrationId: string) {
  return NextResponse.json({
    registrationId,
    instructionsUrl: getPaymentInstructionsPath(registrationId),
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
        pricingTierIndex: form.get("pricingTierIndex"),
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

      const tierCount = event.pricingTiers?.length ?? 0;
      if (parsed.data.pricingTierIndex >= tierCount) {
        return NextResponse.json(
          { error: { pricingTierIndex: ["Select a valid registration category"] } },
          { status: 400 }
        );
      }

      const requiresIdDoc = tierRequiresIdDoc(event, parsed.data.pricingTierIndex);
      const idDocFile = form.get("idDoc");
      const idDocError = validateRegistrationIdDoc(
        idDocFile instanceof File ? idDocFile : null,
        requiresIdDoc
      );
      if (idDocError) {
        return NextResponse.json({ error: idDocError }, { status: 400 });
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

      if (requiresIdDoc && idDocFile instanceof File) {
        const idBuffer = Buffer.from(await idDocFile.arrayBuffer());
        const idDocUrl = await uploadRegistrationIdDoc(
          registration.id,
          idBuffer,
          idDocFile.type
        );
        await setRegistrationIdDocUrl(registration.id, idDocUrl);
      }

      return paymentInstructionsResponse(registration.id);
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

    return paymentInstructionsResponse(registration.id);
  } catch (error) {
    console.error("[registrations]", error);
    const message =
      error instanceof Error ? error.message : "Registration failed";
    const status = message.includes("not found") ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
