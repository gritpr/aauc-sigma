/** Central image paths — swap files in /public/images/ to update site-wide */
export const siteImages = {
  sigmaLogo: "/images/sigma-logo.png",
  /** Wiki Loves Africa 2021 — Ghanaian nurse (CC BY-SA 4.0) */
  hero: "/images/hero-main.jpg",
  /** OAU campus landscape (CC BY-SA 4.0, Tufoto) */
  heroBg: "/images/hero-bg.jpg",
  /** OAU Teaching Hospital, Ile-Ife (CC BY 2.0, T. Obi) */
  about: "/images/about.jpg",
  features: {
    /** Oduduwa statue, OAU campus (CC BY-SA 4.0, Tufoto) */
    leadership: "/images/leadership.jpg",
    /** OAU main campus (CC BY 2.0, T. Obi) */
    community: "/images/community.jpg",
    /** Faculty of Medicine, OAU (CC BY 2.0, T. Obi) */
    excellence: "/images/excellence.jpg",
  },
  events: {
    /** OAU campus landscape (CC BY-SA 4.0, Tufoto) */
    default: "/images/event-conference.jpg",
    conference: "/images/event-conference.jpg",
    /** OAU Teaching Hospital (CC BY 2.0, T. Obi) */
    workshop: "/images/event-conference.jpg",
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
