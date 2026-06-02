export const siteConfig = {
  parentOrg: "Sigma Theta Tau International Honor Society of Nursing",
  chapterName: "Alpha Alpha Upsilon",
  chapterNumber: "5940",
  siteTitle: "Alpha Alpha Upsilon Chapter",
  siteTagline: "Lead Together — Right Where You Are",
  institution: "Obafemi Awolowo University",
  location: "Ile-Ife, Osun State, Nigeria",
  primaryColor: "#5E50A1",
  parentSiteUrl: "https://www.sigmanursing.org",
} as const;

export function getFullChapterName(): string {
  return `${siteConfig.chapterName} Chapter (#${siteConfig.chapterNumber})`;
}
