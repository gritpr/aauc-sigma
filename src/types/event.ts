import type { Timestamp } from "firebase-admin/firestore";

export type EventStatus = "draft" | "published";

export interface EventPricingTier {
  label: string;
  amountKobo: number;
}

export interface EventTrack {
  title: string;
  topics: string[];
}

export interface EventContact {
  name: string;
  phone: string;
}

export interface AbstractSubmissionInfo {
  wordLimit: number;
  structure: string;
  keywordsCount: number;
  formats: string[];
}

export interface ChapterEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  priceKobo: number;
  capacity?: number;
  status: EventStatus;
  imageUrl?: string;
  /** Extended fields from conference flier / detail page */
  subtitle?: string;
  theme?: string;
  motto?: string;
  accreditation?: string;
  venue?: string;
  flierImageUrl?: string;
  pricingTiers?: EventPricingTier[];
  tracks?: EventTrack[];
  abstractSubmission?: AbstractSubmissionInfo;
  contacts?: EventContact[];
}

export interface ChapterEventRecord
  extends Omit<ChapterEvent, "id" | "startDate" | "endDate"> {
  startDate: Timestamp;
  endDate: Timestamp;
}
