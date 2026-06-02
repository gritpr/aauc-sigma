import { readFileSync } from "fs";
import path from "path";
import type { ServiceAccount } from "firebase-admin/app";

type ServiceAccountJson = ServiceAccount & {
  private_key?: string;
};

function normalizePrivateKey(account: ServiceAccountJson): ServiceAccountJson {
  if (account.private_key && typeof account.private_key === "string") {
    account.private_key = account.private_key.replace(/\\n/g, "\n");
  }
  return account;
}

function parseServiceAccountJson(raw: string): ServiceAccount {
  const account = JSON.parse(raw.trim()) as ServiceAccountJson;
  return normalizePrivateKey(account);
}

/** Local dev: file path. Vercel/production: FIREBASE_SERVICE_ACCOUNT_JSON env var. */
export function loadServiceAccount(): ServiceAccount {
  const jsonEnv = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (jsonEnv?.trim()) {
    return parseServiceAccountJson(jsonEnv);
  }

  const filePath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim();
  if (!filePath) {
    throw new Error(
      "Firebase Admin credentials missing. Set FIREBASE_SERVICE_ACCOUNT_JSON (Vercel) " +
        "or FIREBASE_SERVICE_ACCOUNT_PATH (local file path only)."
    );
  }

  // Misconfiguration guard: JSON pasted into PATH instead of FIREBASE_SERVICE_ACCOUNT_JSON.
  if (filePath.startsWith("{")) {
    return parseServiceAccountJson(filePath);
  }

  const resolved = path.resolve(process.cwd(), filePath);
  const account = JSON.parse(readFileSync(resolved, "utf8")) as ServiceAccountJson;
  return normalizePrivateKey(account);
}
