import { getAdminDb } from "@/lib/firebase/admin";
import { getServerEnv } from "@/config/env";
import { siteConfig, getFullChapterName } from "@/config/site";
import type { EmailAdapter, RegistrationEmailPayload } from "./types";

export function createFirestoreTriggerEmailAdapter(): EmailAdapter {
  return {
    async sendRegistrationRecognized(payload: RegistrationEmailPayload) {
      const { FIREBASE_MAIL_COLLECTION } = getServerEnv();

      await getAdminDb()
        .collection(FIREBASE_MAIL_COLLECTION)
        .add({
          to: [payload.to],
          message: {
            subject: `Registration received — ${getFullChapterName()}`,
            text: [
              `Dear ${payload.fullName},`,
              "",
              "Your registration attempt has been recognized. Confirmation will follow shortly.",
              "",
              `Event: ${payload.eventTitle}`,
              `Reference: ${payload.registrationId}`,
              "",
              `— ${siteConfig.chapterName} Chapter`,
            ].join("\n"),
          },
        });
    },
  };
}
