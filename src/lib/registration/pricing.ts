import type { ChapterEvent, EventPricingTier } from "@/types/event";
import type { ParticipantStatus } from "@/types/registration";

const STATUS_TIER_KEYWORDS: Record<ParticipantStatus, string[]> = {
  member: ["member"],
  non_member: ["non-member", "non member", "nonmember"],
  student: ["student", "students", "undergraduate"],
};

function normalizeLabel(label: string): string {
  return label.toLowerCase().replace(/\s+/g, " ").trim();
}

export interface PricingTierOption {
  value: string;
  label: string;
  amountKobo: number;
  paymentLink?: string;
  requestIdDoc: boolean;
}

export function isConferenceEvent(event: ChapterEvent): boolean {
  return Boolean(event.pricingTiers?.length);
}

export function getPricingTierOptions(event: ChapterEvent): PricingTierOption[] {
  return (event.pricingTiers ?? []).map((tier, index) => ({
    value: String(index),
    label: tier.label,
    amountKobo: tier.amountKobo,
    paymentLink: tier.paymentLink,
    requestIdDoc: tier.requestIdDoc === true,
  }));
}

/** @deprecated Use getPricingTierOptions — kept for any legacy imports */
export const getParticipantStatusOptions = getPricingTierOptions;

export function resolvePricingTierByIndex(
  event: ChapterEvent,
  tierIndex: number
): EventPricingTier | undefined {
  return event.pricingTiers?.[tierIndex];
}

export function inferParticipantStatusFromTierLabel(
  label: string
): ParticipantStatus | undefined {
  const normalized = normalizeLabel(label);
  for (const [status, keywords] of Object.entries(STATUS_TIER_KEYWORDS) as [
    ParticipantStatus,
    string[],
  ][]) {
    if (keywords.some((kw) => normalized.includes(kw))) {
      return status;
    }
  }
  return undefined;
}

export function resolveRegistrationAmountKobo(
  event: ChapterEvent,
  tierIndex?: number
): number {
  if (tierIndex == null || !Number.isInteger(tierIndex) || tierIndex < 0) {
    return event.priceKobo;
  }
  return resolvePricingTierByIndex(event, tierIndex)?.amountKobo ?? event.priceKobo;
}

export function resolvePaymentLink(
  event: ChapterEvent,
  tierIndex?: number
): string | undefined {
  if (tierIndex == null || !Number.isInteger(tierIndex) || tierIndex < 0) {
    return undefined;
  }
  return resolvePricingTierByIndex(event, tierIndex)?.paymentLink?.trim();
}

export function tierRequiresIdDoc(
  event: ChapterEvent,
  tierIndex?: number
): boolean {
  if (tierIndex == null || !Number.isInteger(tierIndex) || tierIndex < 0) {
    return false;
  }
  return resolvePricingTierByIndex(event, tierIndex)?.requestIdDoc === true;
}
