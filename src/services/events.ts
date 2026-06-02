import type { DocumentData } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import type { ChapterEvent, EventStatus } from "@/types/event";

function mapDoc(id: string, data: DocumentData): ChapterEvent {
  return {
    id,
    title: data.title,
    slug: data.slug,
    description: data.description,
    startDate: data.startDate.toDate(),
    endDate: data.endDate.toDate(),
    location: data.location,
    priceKobo: data.priceKobo,
    capacity: data.capacity,
    status: data.status as EventStatus,
    imageUrl: data.imageUrl,
  };
}

export async function getPublishedEvents(): Promise<ChapterEvent[]> {
  const snapshot = await getAdminDb()
    .collection("events")
    .where("status", "==", "published")
    .get();

  return snapshot.docs
    .map((doc) => mapDoc(doc.id, doc.data()))
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}

export async function getEventById(id: string): Promise<ChapterEvent | null> {
  const doc = await getAdminDb().collection("events").doc(id).get();
  if (!doc.exists) return null;
  const data = doc.data()!;
  if (data.status !== "published") return null;
  return mapDoc(doc.id, data);
}
