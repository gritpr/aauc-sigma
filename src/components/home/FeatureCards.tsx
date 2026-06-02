import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { siteImages } from "@/config/images";

const features = [
  {
    title: "Leadership",
    description:
      "Every nurse is a leader—at every stage, in every role. Sigma empowers you to lead together, right where you are.",
    image: siteImages.features.leadership,
    accent: "border-t-accent-gold",
    badge: "bg-accent-gold/15 text-accent-gold",
  },
  {
    title: "Community",
    description:
      "Connect with professional colleagues globally. Build mentorship, research collaboration, and lifelong networks.",
    image: siteImages.features.community,
    accent: "border-t-accent-teal",
    badge: "bg-accent-teal/15 text-accent-teal",
  },
  {
    title: "Excellence",
    description:
      "Access grants, continuing education, and scholarships. Pursue evidence-based practice and nursing research.",
    image: siteImages.features.excellence,
    accent: "border-t-accent-coral",
    badge: "bg-accent-coral/15 text-accent-coral",
  },
];

export function FeatureCards() {
  return (
    <section className="section-padding bg-surface-lavender bg-dots">
      <div className="page-container">
        <AnimatedSection>
          <p className="text-xs font-bold uppercase tracking-widest text-accent-teal">
            Our pillars
          </p>
          <h2 className="section-heading-accent mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Why Sigma?
          </h2>
          <p className="mt-3 max-w-2xl text-gray-600">
            Leading Together amplifies our voice, advances our value, and multiplies our
            impact across communities.
          </p>
        </AnimatedSection>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <AnimatedSection
              key={feature.title}
              delay={i * 0.1}
              className={`group overflow-hidden rounded-xl border border-primary/10 border-t-4 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 ${feature.accent}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${feature.badge}`}
                >
                  {feature.title}
                </span>
              </div>
              <p className="p-5 text-sm leading-relaxed text-gray-600">{feature.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
