import { AnimatedSection } from "@/components/ui/AnimatedSection";

const features = [
  {
    title: "Leadership",
    description:
      "Every nurse is a leader—at every stage, in every role. Sigma empowers you to lead together, right where you are.",
  },
  {
    title: "Community",
    description:
      "Connect with professional colleagues globally. Build mentorship, research collaboration, and lifelong networks.",
  },
  {
    title: "Excellence",
    description:
      "Access grants, continuing education, and scholarships. Pursue evidence-based practice and nursing research.",
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
              className="rounded-2xl border border-[#5E50A1]/10 bg-[#faf9fc] p-8 transition-shadow hover:shadow-lg hover:shadow-[#5E50A1]/10"
            >
              <div className="mb-4 h-1 w-12 rounded-full bg-[#5E50A1]" />
              <h3 className="text-xl font-semibold text-[#5E50A1]">{feature.title}</h3>
              <p className="mt-3 text-gray-600">{feature.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
