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

const conference = {
  title: "Sigma 2026 Conference",
  slug: "sigma-2026-conference",
  subtitle: "3rd Annual Scientific Conference and Award Ceremony",
  description:
    "Join Alpha Alpha Upsilon for a week of nursing leadership, research, and connection at Redeemer's University, Ede.",
  theme:
    "Redefining Care: Advancing Nursing Leadership, Human Connection, and Resilient Health Systems in a Changing World",
  motto: "Leading Change. Advancing Care. Inspiring Connections.",
  startDate: Timestamp.fromDate(new Date("2026-09-13T08:00:00+01:00")),
  endDate: Timestamp.fromDate(new Date("2026-09-19T18:00:00+01:00")),
  location: "Redeemer's University, Ede, Osun State, Nigeria",
  venue: "Redeemer's University, Ede",
  priceKobo: 5_000_000,
  accreditation: "3 NMCN Credit Units",
  imageUrl: "/images/conference-flier.jpeg",
  flierImageUrl: "/images/conference-flier.jpeg",
  status: "published",
  pricingTiers: [
    { label: "Member", amountKobo: 5_000_000 },
    { label: "Non-Member", amountKobo: 6_000_000 },
    { label: "Students (Undergraduate)", amountKobo: 3_000_000 },
  ],
  tracks: [
    {
      title: "Track I: Nursing Education & Development",
      topics: [
        "Innovative Nursing Education",
        "Mentorship and Career Development",
        "Student and Faculty Well-being",
        "Continuing Professional Development",
      ],
    },
    {
      title: "Track II: Nursing Practice & Care",
      topics: [
        "Compassionate and Patient-Centered Care",
        "Primary Health Care and Community Nursing",
        "Mental Health and Psychosocial Care",
        "Patient Safety and Quality Care",
      ],
    },
    {
      title: "Track III: Population & Global Health",
      topics: [
        "Health Equity and Social Determinants",
        "Maternal, Child, and Adolescent Health",
        "Health Promotion and Disease Prevention",
        "Disaster and Humanitarian Nursing",
      ],
    },
    {
      title: "Track IV: Leadership & Health Systems",
      topics: [
        "Nursing Leadership and Policy",
        "Health Workforce Development",
        "Interprofessional Collaboration",
        "Health Systems Strengthening",
      ],
    },
    {
      title: "Track V: Technology, Innovation & Practice Improvement",
      topics: [
        "Technology and Innovation in Healthcare",
        "Digital Health and Telehealth",
        "Artificial Intelligence in Nursing",
        "Quality Improvement and Evidence-Based Practice",
      ],
    },
  ],
  abstractSubmission: {
    wordLimit: 250,
    structure: "Title, Aim, Objectives, IMRAD Format, and Recommendation",
    keywordsCount: 5,
    formats: ["Oral Presentation", "Poster Presentation"],
  },
  contacts: [
    { name: "Prof. Adelanu Tijani", phone: "+234 907 762 6665" },
    { name: "Prof. Toyin Musah", phone: "+234 803 370 8027" },
  ],
  createdAt: Timestamp.now(),
  updatedAt: Timestamp.now(),
};

const existing = await db
  .collection("events")
  .where("slug", "==", conference.slug)
  .limit(1)
  .get();

if (existing.empty) {
  const ref = await db.collection("events").add(conference);
  console.log(`Created conference event: ${ref.id}`);
} else {
  await existing.docs[0].ref.set(
    { ...conference, updatedAt: Timestamp.now() },
    { merge: true }
  );
  console.log(`Updated conference event: ${existing.docs[0].id}`);
}

console.log("Done.");
