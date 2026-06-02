import { createHmac, timingSafeEqual } from "crypto";

export function verifyPaystackSignature(
  rawBody: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature) return false;

  const hash = createHmac("sha512", secret).update(rawBody).digest("hex");
  const a = Buffer.from(hash);
  const b = Buffer.from(signature);

  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export interface PaystackWebhookEvent {
  event: string;
  data: {
    reference: string;
    status: string;
    metadata?: {
      registrationId?: string;
      eventId?: string;
    };
  };
}
