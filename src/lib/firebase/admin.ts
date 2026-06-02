import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { getServerEnv } from "@/config/env";

let app: App | undefined;
let db: Firestore | undefined;

export function getAdminApp(): App {
  if (app) return app;

  const { serviceAccountPath } = getServerEnv();
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

  app =
    getApps()[0] ??
    initializeApp({
      credential: cert(serviceAccount),
    });

  return app;
}

export function getAdminDb(): Firestore {
  if (!db) {
    db = getFirestore(getAdminApp());
  }
  return db;
}
