export type EventStatus = "draft" | "published";

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
}

import type { Timestamp } from "firebase-admin/firestore";

export interface ChapterEventRecord
  extends Omit<ChapterEvent, "id" | "startDate" | "endDate"> {
  startDate: Timestamp;
  endDate: Timestamp;
}
