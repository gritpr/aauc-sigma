import Link from "next/link";
import { siteConfig, getFullChapterName } from "@/config/site";
import { SigmaLogo } from "@/components/ui/SigmaLogo";

export function Footer() {
  return (
    <footer className="border-t border-[#5E50A1]/20 bg-[#5E50A1] text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="rounded-lg bg-white/10 p-3 inline-block">
              <SigmaLogo variant="footer" showChapterName={false} />
            </div>
            <p className="mt-4 font-semibold">{getFullChapterName()}</p>
            <p className="mt-1 text-sm text-white/80">{siteConfig.institution}</p>
            <p className="text-sm text-white/80">{siteConfig.location}</p>
          </div>
          <div>
            <p className="font-semibold">Quick links</p>
            <ul className="mt-2 space-y-1 text-sm text-white/80">
              <li>
                <Link href="/events" className="hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.parentSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Sigma Nursing (Parent)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold">Contact</p>
            <p className="mt-2 text-sm text-white/80">
              memserv@sigmanursing.org
              <br />
              (Placeholder — update with chapter contact)
            </p>
          </div>
        </div>
        <p className="mt-8 border-t border-white/20 pt-8 text-center text-xs text-white/70">
          © {new Date().getFullYear()} {siteConfig.parentOrg}. {siteConfig.chapterName}{" "}
          Chapter. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
