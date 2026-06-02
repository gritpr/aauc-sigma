"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { formatEventDateRange, formatNairaFromKobo } from "@/lib/utils/format";
import type { ChapterEvent } from "@/types/event";

interface EventCardProps {
  event: ChapterEvent;
  onRegister: (event: ChapterEvent) => void;
  index?: number;
}

export function EventCard({ event, onRegister, index = 0 }: EventCardProps) {
  return (
    <motion.article
      className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <p className="text-sm font-medium text-[#5E50A1]">
        {formatEventDateRange(event.startDate, event.endDate)}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-gray-900">{event.title}</h3>
      <p className="mt-1 text-sm text-gray-500">{event.location}</p>
      <p className="mt-4 flex-1 text-gray-600">{event.description}</p>
      <div className="mt-6 flex items-center justify-between gap-4">
        <span className="text-lg font-bold text-gray-900">
          {formatNairaFromKobo(event.priceKobo)}
        </span>
        <Button onClick={() => onRegister(event)}>Register</Button>
      </div>
    </motion.article>
  );
}
