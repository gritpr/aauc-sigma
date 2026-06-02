export const siteConfig = {
  parentOrg: "Sigma Theta Tau International Honor Society of Nursing",
  chapterName: "Alpha Alpha Upsilon",
  chapterNumber: "594",
  siteTitle: "Alpha Alpha Upsilon Chapter",
  siteTagline: "Lead Together — Right Where You Are",
  institution: "Obafemi Awolowo University",
  location: "Ile-Ife, Osun State, Nigeria",
  primaryColor: "#5E50A1",
  accentGold: "#D4A843",
  accentTeal: "#2A9D8F",
  accentCoral: "#E07A5F",
  parentSiteUrl: "https://www.sigmanursing.org",
} as const;

export function getFullChapterName(): string {
  return `${siteConfig.chapterName} Chapter (#${siteConfig.chapterNumber})`;
}
