import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { siteConfig, getFullChapterName } from "@/config/site";
import { siteImages } from "@/config/images";

const sections = [
  {
    title: "About Sigma",
    body: "Sigma Theta Tau International Honor Society of Nursing is a global organization that empowers nurse leaders to drive meaningful change in healthcare and improve outcomes across communities.",
    accent: "border-l-accent-gold",
  },
  {
    title: "Our Chapter",
    body: `${getFullChapterName()} serves nursing professionals at ${siteConfig.institution}, ${siteConfig.location}. We promote nursing excellence, research, leadership development, and international networking among members.`,
    accent: "border-l-accent-teal",
  },
  {
    title: "Lead Together",
    body: "Every nurse is a leader—at every stage, in every role. This Nurses Week and beyond, Sigma celebrates the seamless integration of skill and heart—where Skill Meets Heart.",
    accent: "border-l-primary",
  },
  {
    title: "Membership Benefits",
    body: "Members access research grants, continuing education, scholarships, mentorship, and opportunities to serve on boards and in community leadership—fostering a high professional standard and pursuit of excellence.",
    accent: "border-l-accent-coral",
  },
];

export function AboutSections() {
  return (
    <>
      <div className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-dots opacity-30" />
        <div className="page-container relative py-10 sm:py-12">
          <AnimatedSection className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent-gold">
                Our story
              </p>
              <h1 className="mt-2 text-3xl font-bold sm:text-4xl">About Us</h1>
              <p className="mt-3 max-w-xl text-white/85">
                Learn about {siteConfig.chapterName} Chapter and our connection to Sigma
                Nursing.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl ring-2 ring-accent-gold/30">
              <Image
                src={siteImages.about}
                alt="Obafemi Awolowo University Teaching Hospital, Ile-Ife"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </AnimatedSection>
        </div>
        <div className="accent-stripe" />
      </div>

      <div className="section-padding">
        <div className="page-container">
          <div className="grid gap-5 sm:grid-cols-2">
            {sections.map((section, i) => (
              <AnimatedSection
                key={section.title}
                delay={i * 0.08}
                className={`rounded-xl border border-primary/10 border-l-4 bg-white p-6 shadow-sm ${section.accent}`}
              >
                <h2 className="text-lg font-semibold text-primary">{section.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{section.body}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
