import { NextResponse } from "next/server";
import {
  getPaymentInstructionsPath,
  getPaymentProvider,
} from "@/config/payment";
import { getServerEnv } from "@/config/env";
import {
  buildPaymentReference,
  initializePaystackTransaction,
} from "@/lib/paystack/initialize";
import {
  resolvePaymentLink,
} from "@/lib/registration/pricing";
import type { ChapterEvent } from "@/types/event";
import type { Registration } from "@/types/registration";

function bankTransferResponse(registrationId: string) {
  return NextResponse.json({
    registrationId,
    instructionsUrl: getPaymentInstructionsPath(registrationId),
  });
}

async function paystackCheckoutResponse(
  registration: Registration,
  event: ChapterEvent
) {
  const { siteUrl } = getServerEnv();
  const reference = buildPaymentReference(registration.id);
  const eventPath = event.slug ? `/events/${event.slug}` : "/events";

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
}

export async function registrationCheckoutResponse(
  registration: Registration,
  event: ChapterEvent,
  pricingTierIndex?: number
) {
  if (getPaymentProvider() === "bank_transfer") {
    return bankTransferResponse(registration.id);
  }

  if (pricingTierIndex != null) {
    const paymentUrl = resolvePaymentLink(event, pricingTierIndex);
    if (paymentUrl) {
      return NextResponse.json({
        registrationId: registration.id,
        paymentUrl,
      });
    }
  }

  return paystackCheckoutResponse(registration, event);
}
