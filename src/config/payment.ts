/** Bank transfer details shown after registration while Paystack is unavailable. */
export const bankTransferConfig = {
  bankName: "WEMA BANK PLC",
  accountNumber: "0123563000",
  accountName:
    "Alpha Alpha Upsilon Chapter of Sigma, Department of Nursing Science",
  whatsappNumber: "07036582022",
  whatsappIntl: "2347036582022",
} as const;

export function getPaymentInstructionsPath(registrationId: string): string {
  return `/registrations/${registrationId}/payment`;
}
