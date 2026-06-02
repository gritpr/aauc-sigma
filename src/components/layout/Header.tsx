"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SigmaLogo } from "@/components/ui/SigmaLogo";

const nav = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About Us" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-primary/15 bg-white/95 shadow-sm shadow-primary/5 backdrop-blur-md">
      <div className="accent-stripe" />
      <div className="page-container flex items-center justify-between gap-3 py-2.5">
        <SigmaLogo variant="header" />
        <nav className="flex items-center gap-0.5 sm:gap-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all sm:px-4 ${
                  active
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "text-gray-600 hover:bg-surface-lavender hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
