"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/config/images";
import { Button } from "@/components/ui/Button";
import { SigmaLogo } from "@/components/ui/SigmaLogo";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#5E50A1] via-[#6b5fb8] to-[#4a3f8c] text-white">
      <div className="absolute inset-0">
        <Image
          src={siteImages.hero}
          alt="Nurses collaborating — Sigma Nursing"
          fill
          className="object-cover opacity-25 mix-blend-overlay"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4a3f8c]/95 via-[#5E50A1]/85 to-[#5E50A1]/70" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex rounded-xl bg-white/95 p-3 shadow-lg"
          >
            <SigmaLogo variant="hero" showChapterName={false} />
          </motion.div>
          <motion.p
            className="text-sm font-medium uppercase tracking-widest text-white/80"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {siteConfig.chapterName} · #{siteConfig.chapterNumber}
          </motion.p>
          <motion.h1
            className="mt-3 text-4xl font-bold leading-tight sm:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {siteConfig.siteTagline}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg text-white/90"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Take your place among the world&apos;s top nurses. {siteConfig.chapterName}{" "}
            Chapter at {siteConfig.institution} empowers nurse leaders to drive meaningful
            change in healthcare.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/events">
              <Button variant="secondary">Explore Events</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline">About Our Chapter</Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white/20 lg:block"
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
        </motion.div>
      </div>
    </section>
  );
}
