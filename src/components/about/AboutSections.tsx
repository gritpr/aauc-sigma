import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { siteConfig, getFullChapterName } from "@/config/site";

const sections = [
  {
    title: "About Sigma",
    body: "Sigma Theta Tau International Honor Society of Nursing is a global organization that empowers nurse leaders to drive meaningful change in healthcare and improve outcomes across communities.",
  },
  {
    title: "Our Chapter",
    body: `${getFullChapterName()} serves nursing professionals at ${siteConfig.institution}, ${siteConfig.location}. We promote nursing excellence, research, leadership development, and international networking among members.`,
  },
  {
    title: "Lead Together",
    body: "Every nurse is a leader—at every stage, in every role. This Nurses Week and beyond, Sigma celebrates the seamless integration of skill and heart—where Skill Meets Heart.",
  },
  {
    title: "Membership Benefits",
    body: "Members access research grants, continuing education, scholarships, mentorship, and opportunities to serve on boards and in community leadership—fostering a high professional standard and pursuit of excellence.",
  },
];

export function AboutSections() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          Learn about {siteConfig.chapterName} Chapter and our connection to Sigma Nursing.
        </p>
      </AnimatedSection>

      <div className="mt-16 space-y-12">
        {sections.map((section, i) => (
          <AnimatedSection
            key={section.title}
            delay={i * 0.08}
            className="rounded-2xl border border-[#5E50A1]/10 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-semibold text-[#5E50A1]">{section.title}</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">{section.body}</p>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
