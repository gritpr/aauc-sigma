"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#5E50A1] via-[#6b5fb8] to-[#4a3f8c] text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <motion.p
          className="text-sm font-medium uppercase tracking-widest text-white/80"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {siteConfig.parentOrg}
        </motion.p>
        <motion.h1
          className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {siteConfig.siteTagline}
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-lg text-white/90"
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
    </section>
  );
}
