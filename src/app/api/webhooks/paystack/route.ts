import { NextResponse } from "next/server";
import { getServerEnv } from "@/config/env";
import {
  verifyPaystackSignature,
  type PaystackWebhookEvent,
} from "@/lib/paystack/verifyWebhook";
import { markPaymentReceived, markEmailSent } from "@/services/registrations";
import { getEmailAdapter } from "@/lib/email";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");
  const { PAYSTACK_SECRET_KEY } = getServerEnv();

  if (!PAYSTACK_SECRET_KEY) {
    return NextResponse.json({ error: "Paystack not configured" }, { status: 500 });
  }

  if (!verifyPaystackSignature(rawBody, signature, PAYSTACK_SECRET_KEY)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody) as PaystackWebhookEvent;

  if (event.event !== "charge.success" || event.data.status !== "success") {
    return NextResponse.json({ received: true });
  }

  const registrationId = event.data.metadata?.registrationId;
  if (!registrationId) {
    return NextResponse.json({ error: "Missing registrationId" }, { status: 400 });
  }

  const registration = await markPaymentReceived(
    registrationId,
    event.data.reference
  );

  if (!registration) {
    return NextResponse.json({ error: "Registration not found" }, { status: 404 });
  }

  if (!registration.emailSentAt) {
    const email = getEmailAdapter();
    await email.sendRegistrationRecognized({
      to: registration.email,
      fullName: registration.fullName,
      eventTitle: registration.eventTitle,
      registrationId: registration.id,
    });
    await markEmailSent(registration.id);
  }

  return NextResponse.json({ received: true });
}
