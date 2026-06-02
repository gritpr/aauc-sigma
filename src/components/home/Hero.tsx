"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/config/images";
import { Button } from "@/components/ui/Button";
import { SigmaLogo } from "@/components/ui/SigmaLogo";

const highlights = [
  { label: "Chapter", value: `#${siteConfig.chapterNumber}`, accent: "gold" as const },
  { label: "Institution", value: "OAU", accent: "teal" as const },
  { label: "Location", value: "Ile-Ife", accent: "coral" as const },
];

const accentBadge: Record<(typeof highlights)[number]["accent"], string> = {
  gold: "bg-accent-gold/25 text-accent-gold ring-accent-gold/40",
  teal: "bg-accent-teal/25 text-accent-teal ring-accent-teal/40",
  coral: "bg-accent-coral/25 text-accent-coral ring-accent-coral/40",
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light text-white">
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="absolute inset-0">
        <Image
          src={siteImages.hero}
          alt="Nurses collaborating — Sigma Nursing"
          fill
          className="object-cover opacity-20 mix-blend-overlay"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary/88 to-primary/75" />
      </div>

      <div className="page-container relative grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5 inline-flex rounded-xl bg-white/95 p-3 shadow-lg ring-2 ring-accent-gold/30"
          >
            <SigmaLogo variant="hero" showChapterName={false} />
          </motion.div>
          <motion.p
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-gold ring-1 ring-accent-gold/30"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
            {siteConfig.chapterName} · #{siteConfig.chapterNumber}
          </motion.p>
          <motion.h1
            className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {siteConfig.siteTagline}
          </motion.h1>
          <motion.p
            className="mt-4 max-w-xl text-base text-white/90 sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Take your place among the world&apos;s top nurses. {siteConfig.chapterName}{" "}
            Chapter at {siteConfig.institution} empowers nurse leaders to drive meaningful
            change in healthcare.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/events">
              <Button variant="gold">Explore Events</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline">About Our Chapter</Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-2 ring-accent-gold/40 lg:block"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image
            src={siteImages.hero}
            alt="Sigma Nursing — nurses at work"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 480px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 to-transparent" />
        </motion.div>
      </div>

      <div className="relative border-t border-white/15 bg-black/15 backdrop-blur-sm">
        <div className="page-container grid grid-cols-3 gap-3 py-4 sm:gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
              className="text-center sm:text-left"
            >
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/60 sm:text-xs">
                {item.label}
              </p>
              <p
                className={`mt-1 inline-block rounded-md px-2 py-0.5 text-sm font-bold ring-1 sm:text-base ${accentBadge[item.accent]}`}
              >
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
