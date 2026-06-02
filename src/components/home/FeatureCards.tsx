import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { siteImages } from "@/config/images";

const features = [
  {
    title: "Leadership",
    description:
      "Every nurse is a leader—at every stage, in every role. Sigma empowers you to lead together, right where you are.",
    image: siteImages.features.leadership,
  },
  {
    title: "Community",
    description:
      "Connect with professional colleagues globally. Build mentorship, research collaboration, and lifelong networks.",
    image: siteImages.features.community,
  },
  {
    title: "Excellence",
    description:
      "Access grants, continuing education, and scholarships. Pursue evidence-based practice and nursing research.",
    image: siteImages.features.excellence,
  },
];

export function FeatureCards() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimatedSection className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Sigma?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Leading Together amplifies our voice, advances our value, and multiplies our
            impact across communities.
          </p>
        </AnimatedSection>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <AnimatedSection
              key={feature.title}
              delay={i * 0.1}
              className="group overflow-hidden rounded-2xl border border-[#5E50A1]/10 bg-white shadow-sm transition-shadow hover:shadow-lg hover:shadow-[#5E50A1]/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5E50A1]/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="p-6 text-gray-600">{feature.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
