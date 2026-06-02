"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About Us" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[#5E50A1]/10 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="group">
          <p className="text-xs font-medium uppercase tracking-wider text-[#5E50A1]">
            Sigma Nursing
          </p>
          <p className="text-lg font-bold text-gray-900 group-hover:text-[#5E50A1] transition-colors">
            {siteConfig.chapterName}
          </p>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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
