import { readFileSync } from "fs";
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const serviceAccount = JSON.parse(
  readFileSync(path.join(root, "firebase-service-account.json"), "utf8")
);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const now = new Date();
const nextMonth = new Date(now);
nextMonth.setMonth(nextMonth.getMonth() + 1);

const events = [
  {
    title: "Chapter Induction & Leadership Forum",
    slug: "induction-leadership-forum",
    description:
      "Join Alpha Alpha Upsilon for an evening of leadership, mentorship, and nursing excellence. Placeholder copy from Sigma Nursing.",
    startDate: Timestamp.fromDate(nextMonth),
    endDate: Timestamp.fromDate(nextMonth),
    location: "Obafemi Awolowo University, Ile-Ife",
    priceKobo: 1500000,
    capacity: 120,
    status: "published",
    imageUrl: "/images/event-conference.jpg",
  },
  {
    title: "Nursing Research & Evidence-Based Practice Workshop",
    slug: "research-ebp-workshop",
    description:
      "Explore research dissemination and evidence-based practice. Sigma empowers nurse leaders to drive meaningful change.",
    startDate: Timestamp.fromDate(
      new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 15)
    ),
    endDate: Timestamp.fromDate(
      new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 16)
    ),
    location: "Faculty of Nursing, OAU",
    priceKobo: 500000,
    capacity: 80,
    status: "published",
    imageUrl: "/images/event-workshop.jpg",
  },
];

for (const event of events) {
  const ref = await db.collection("events").add({
    ...event,
    createdAt: Timestamp.now(),
  });
  console.log(`Created event: ${event.title} (${ref.id})`);
}

console.log("Done seeding events.");
