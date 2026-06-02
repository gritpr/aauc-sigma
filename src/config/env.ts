import { z } from "zod";
import path from "path";

const serverSchema = z.object({
  FIREBASE_SERVICE_ACCOUNT_PATH: z.string().min(1),
  PAYSTACK_SECRET_KEY: z.string().optional(),
  EMAIL_PROVIDER: z.enum(["stub", "firebase_extension"]).default("stub"),
  FIREBASE_MAIL_COLLECTION: z.string().default("mail"),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1),
});

export function getClientEnv() {
  return clientSchema.parse({
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
}

export function getServerEnv() {
  const raw = serverSchema.parse({
    FIREBASE_SERVICE_ACCOUNT_PATH: process.env.FIREBASE_SERVICE_ACCOUNT_PATH,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
    EMAIL_PROVIDER: process.env.EMAIL_PROVIDER ?? "stub",
    FIREBASE_MAIL_COLLECTION: process.env.FIREBASE_MAIL_COLLECTION ?? "mail",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  });

  return {
    ...raw,
    serviceAccountPath: path.resolve(process.cwd(), raw.FIREBASE_SERVICE_ACCOUNT_PATH),
    siteUrl: raw.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  };
}
