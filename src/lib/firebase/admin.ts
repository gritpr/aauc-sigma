import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage, type Storage } from "firebase-admin/storage";
import { loadServiceAccount } from "./serviceAccount";

let app: App | undefined;
let db: Firestore | undefined;
let storage: Storage | undefined;

export function getAdminApp(): App {
  if (app) return app;

  const serviceAccount = loadServiceAccount();

  app =
    getApps()[0] ??
    initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });

  return app;
}

export function getAdminDb(): Firestore {
  if (!db) {
    db = getFirestore(getAdminApp());
  }
  return db;
}

export function getAdminStorage(): Storage {
  if (!storage) {
    storage = getStorage(getAdminApp());
  }
  return storage;
}
