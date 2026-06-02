import { getServerEnv } from "@/config/env";
import { siteConfig } from "@/config/site";

interface InitializeParams {
  email: string;
  amountKobo: number;
  reference: string;
  metadata: Record<string, string>;
  callbackUrl: string;
}

interface InitializeResult {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
}

export async function initializePaystackTransaction(
  params: InitializeParams
): Promise<InitializeResult> {
  const { PAYSTACK_SECRET_KEY } = getServerEnv();
  if (!PAYSTACK_SECRET_KEY) {
    throw new Error("Paystack is not configured. Add PAYSTACK_SECRET_KEY to .env.local");
  }

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: params.email,
      amount: params.amountKobo,
      reference: params.reference,
      metadata: params.metadata,
      callback_url: params.callbackUrl,
      currency: "NGN",
      channels: ["card", "bank", "ussd", "bank_transfer"],
    }),
  });

  const json = await response.json();
  if (!response.ok || !json.status) {
    throw new Error(json.message ?? "Failed to initialize Paystack payment");
  }

  return {
    authorizationUrl: json.data.authorization_url,
    accessCode: json.data.access_code,
    reference: json.data.reference,
  };
}

export function buildPaymentReference(registrationId: string): string {
  return `reg_${registrationId}_${Date.now()}`;
}

export function getPaystackDescription(eventTitle: string): string {
  return `${siteConfig.chapterName} — ${eventTitle}`;
}
