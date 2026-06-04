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

export function isConferenceEvent(event: ChapterEvent): boolean {
  return Boolean(event.pricingTiers?.length);
}

export function resolvePricingTier(
  event: ChapterEvent,
  participantStatus?: ParticipantStatus
): EventPricingTier | undefined {
  if (!participantStatus || !event.pricingTiers?.length) {
    return undefined;
  }

  const keywords = STATUS_TIER_KEYWORDS[participantStatus];
  return event.pricingTiers.find((t) => {
    const normalized = normalizeLabel(t.label);
    return keywords.some((kw) => normalized.includes(kw));
  });
}

export function resolveRegistrationAmountKobo(
  event: ChapterEvent,
  participantStatus?: ParticipantStatus
): number {
  return resolvePricingTier(event, participantStatus)?.amountKobo ?? event.priceKobo;
}

export function resolvePaymentLink(
  event: ChapterEvent,
  participantStatus?: ParticipantStatus
): string | undefined {
  return resolvePricingTier(event, participantStatus)?.paymentLink?.trim();
}

export function getParticipantStatusOptions(event: ChapterEvent) {
  const tiers = event.pricingTiers ?? [];
  const statuses: ParticipantStatus[] = ["member", "non_member", "student"];

  return statuses.map((status) => {
    const tier = resolvePricingTier(event, status);
    return {
      value: status,
      label:
        status === "member"
          ? "Member"
          : status === "non_member"
            ? "Non-member"
            : "Student",
      amountKobo: tier?.amountKobo ?? event.priceKobo,
      tierLabel: tier?.label,
      paymentLink: tier?.paymentLink,
    };
  });
}
