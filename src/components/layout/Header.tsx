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
    <header className="sticky top-0 z-40 border-b border-[#5E50A1]/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <SigmaLogo variant="header" />
        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                  active
                    ? "bg-[#5E50A1] text-white"
                    : "text-gray-600 hover:bg-[#5E50A1]/10 hover:text-[#5E50A1]"
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
