export interface RegistrationEmailPayload {
  to: string;
  fullName: string;
  eventTitle: string;
  registrationId: string;
}

export interface EmailAdapter {
  sendRegistrationRecognized(payload: RegistrationEmailPayload): Promise<void>;
}
