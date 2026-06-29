"use client";

import { useCallback, useState } from "react";

interface CopyableValueProps {
  value: string;
  label?: string;
  display?: string;
  className?: string;
  mono?: boolean;
}

export function CopyableValue({
  value,
  label,
  display,
  className = "",
  mono = true,
}: CopyableValueProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard denied */
    }
  }, [value]);

  return (
    <button
      type="button"
      onClick={copy}
      title="Click to copy"
      className={`group w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-left transition-all hover:border-accent-teal/40 hover:bg-surface-mint/50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-teal/30 ${className}`}
    >
      {label && (
        <span className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </span>
      )}
      <span className="mt-1 flex items-center justify-between gap-3">
        <span
          className={`text-lg font-bold text-primary sm:text-xl ${mono ? "font-mono tracking-wide" : ""}`}
        >
          {display ?? value}
        </span>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
            copied
              ? "bg-accent-teal text-white"
              : "bg-surface-lavender text-primary group-hover:bg-accent-teal/15 group-hover:text-accent-teal"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </span>
      </span>
    </button>
  );
}
