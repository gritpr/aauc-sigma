/** Site-wide static assets in /public/images — not used for event covers */
export const siteImages = {
  sigmaLogo: "/images/sigma-logo.png",
  hero: "/images/hero-main.jpg",
  heroBg: "/images/hero-bg.jpg",
  about: "/images/about.jpg",
  features: {
    leadership: "/images/leadership.jpg",
    community: "/images/community.jpg",
    excellence: "/images/excellence.jpg",
  },
  /** Decorative banner for /events page only (not event data) */
  eventsBanner: "/images/event-conference.jpg",
} as const;
