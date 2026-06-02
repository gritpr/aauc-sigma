/** Central image paths — swap files in /public/images/ to update site-wide */
export const siteImages = {
  sigmaLogo: "/images/sigma-logo.png",
  hero: "/images/hero-nurses.jpg",
  about: "/images/about-nursing.jpg",
  features: {
    leadership: "/images/feature-leadership.jpg",
    community: "/images/feature-community.jpg",
    excellence: "/images/feature-excellence.jpg",
  },
  events: {
    default: "/images/event-conference.jpg",
    conference: "/images/conference-flier.jpeg",
    workshop: "/images/event-workshop.jpg",
  },
} as const;

export function getEventImageUrl(imageUrl?: string, slug?: string): string {
  if (imageUrl) return imageUrl;
  if (slug?.includes("sigma-2026") || slug?.includes("conference")) {
    return siteImages.events.conference;
  }
  if (slug?.includes("workshop") || slug?.includes("research")) {
    return siteImages.events.workshop;
  }
  return siteImages.events.default;
}
