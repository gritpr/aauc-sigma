/** Event cover URLs come from Firestore (Firebase Storage download URLs). */

export function getEventCardImageUrl(event: {
  imageUrl?: string;
  flierImageUrl?: string;
}): string | undefined {
  const url = event.imageUrl?.trim() || event.flierImageUrl?.trim();
  return url || undefined;
}

export function getEventDetailImageUrl(event: {
  imageUrl?: string;
  flierImageUrl?: string;
}): string | undefined {
  const url = event.flierImageUrl?.trim() || event.imageUrl?.trim();
  return url || undefined;
}
