import { format } from "date-fns";

export function formatNairaFromKobo(kobo: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(kobo / 100);
}

export function formatEventDateRange(start: Date, end: Date): string {
  const sameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  if (sameDay) {
    return format(start, "MMMM d, yyyy");
  }

  return `${format(start, "MMM d")} – ${format(end, "MMM d, yyyy")}`;
}
