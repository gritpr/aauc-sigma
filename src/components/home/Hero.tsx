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
            Take your place among the world&apos;s top nurses.{" "}
            {siteConfig.chapterName} Chapter at {siteConfig.institution}{" "}
            empowers nurse leaders to drive meaningful change in healthcare.
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
    </section>
  );
}
