/** Bank transfer details shown after registration while Paystack is unavailable. */
export const bankTransferConfig = {
  bankName: "WEMA BANK PLC",
  accountNumber: "0123563000",
  accountName:
    "Alpha Alpha Upsilon Chapter of Sigma, Department of Nursing Science",
  whatsappNumber: "07036582022",
  whatsappIntl: "2347036582022",
} as const;

export type PaymentProvider = "bank_transfer" | "paystack";

/** Set PAYMENT_PROVIDER=paystack in env to use Shop links / Paystack API again. */
export function getPaymentProvider(): PaymentProvider {
  const value = process.env.PAYMENT_PROVIDER?.trim().toLowerCase();
  return value === "paystack" ? "paystack" : "bank_transfer";
}

export function getPaymentInstructionsPath(registrationId: string): string {
  return `/registrations/${registrationId}/payment`;
}
