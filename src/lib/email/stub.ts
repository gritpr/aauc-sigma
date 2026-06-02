import type { EmailAdapter, RegistrationEmailPayload } from "./types";

export const stubEmailAdapter: EmailAdapter = {
  async sendRegistrationRecognized(payload: RegistrationEmailPayload) {
    console.info("[email:stub] Registration recognized", {
      to: payload.to,
      registrationId: payload.registrationId,
      eventTitle: payload.eventTitle,
    });
  },
};
