import { getServerEnv } from "@/config/env";
import { createFirestoreTriggerEmailAdapter } from "./firestoreTrigger";
import { stubEmailAdapter } from "./stub";
import type { EmailAdapter } from "./types";

export function getEmailAdapter(): EmailAdapter {
  const { EMAIL_PROVIDER } = getServerEnv();

  if (EMAIL_PROVIDER === "firebase_extension") {
    return createFirestoreTriggerEmailAdapter();
  }

  return stubEmailAdapter;
}

export type { RegistrationEmailPayload } from "./types";
