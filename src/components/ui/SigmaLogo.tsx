import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/config/images";

interface SigmaLogoProps {
  variant?: "header" | "footer" | "hero";
  showChapterName?: boolean;
}

const sizes = {
  header: { width: 140, height: 78, className: "h-10 w-auto sm:h-12" },
  footer: { width: 120, height: 67, className: "h-9 w-auto" },
  hero: { width: 160, height: 89, className: "h-12 w-auto" },
};

export function SigmaLogo({
  variant = "header",
  showChapterName = true,
}: SigmaLogoProps) {
  const size = sizes[variant];

  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
      aria-label={`${siteConfig.siteTitle} — home`}
    >
      <Image
        src={siteImages.sigmaLogo}
        alt="Sigma Nursing logo"
        width={size.width}
        height={size.height}
        className={size.className}
        priority={variant === "header"}
      />
      {showChapterName && (
        <div className="hidden sm:block border-l border-[#5E50A1]/20 pl-3">
          <p className="text-xs font-medium uppercase tracking-wider text-[#5E50A1]">
            {siteConfig.chapterName}
          </p>
          <p className="text-sm font-semibold text-gray-900 group-hover:text-[#5E50A1] transition-colors">
            Chapter #{siteConfig.chapterNumber}
          </p>
        </div>
      )}
    </Link>
  );
}
