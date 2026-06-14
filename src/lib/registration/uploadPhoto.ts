import { getAdminStorage } from "@/lib/firebase/admin";

const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export async function uploadRegistrationTagPhoto(
  registrationId: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  const bucket = getAdminStorage().bucket();
  const ext = EXT_BY_TYPE[contentType] ?? ".jpg";
  const path = `registrations/${registrationId}/tag-photo${ext}`;

  const file = bucket.file(path);
  await file.save(buffer, {
    metadata: {
      contentType,
      cacheControl: "private, max-age=3600",
    },
  });

  await file.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${path}`;
}

export async function uploadRegistrationIdDoc(
  registrationId: string,
  buffer: Buffer,
  contentType: string
): Promise<string> {
  const bucket = getAdminStorage().bucket();
  const ext = EXT_BY_TYPE[contentType] ?? ".jpg";
  const path = `registrations/${registrationId}/id-doc${ext}`;

  const file = bucket.file(path);
  await file.save(buffer, {
    metadata: {
      contentType,
      cacheControl: "private, max-age=3600",
    },
  });

  await file.makePublic();

  return `https://storage.googleapis.com/${bucket.name}/${path}`;
}
