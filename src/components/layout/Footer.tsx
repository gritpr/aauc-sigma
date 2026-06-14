import Link from "next/link";
import { siteConfig, getFullChapterName } from "@/config/site";
import { SigmaLogo } from "@/components/ui/SigmaLogo";

export function Footer() {
  return (
    <footer className="relative border-t border-primary/20 bg-primary text-white">
      <div className="accent-stripe" />
      <div className="page-container py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="inline-block rounded-lg bg-white/10 p-3 ring-1 ring-accent-gold/30">
              <SigmaLogo variant="footer" showChapterName={false} />
            </div>
            <p className="mt-4 font-semibold">{getFullChapterName()}</p>
            <p className="mt-1 text-sm text-white/80">{siteConfig.institution}</p>
            <p className="text-sm text-white/80">{siteConfig.location}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-accent-gold/20 px-3 py-1 text-xs font-medium text-accent-gold">
                Honor Society
              </span>
              <span className="rounded-full bg-accent-teal/20 px-3 py-1 text-xs font-medium text-accent-teal">
                Chapter #{siteConfig.chapterNumber}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-gold">
              Quick links
            </p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li>
                <Link href="/events" className="hover:text-accent-gold transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.parentSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-gold transition-colors"
                >
                  Sigma Nursing (Parent)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-gold">
              Contact
            </p>
            <p className="mt-3 text-sm text-white/80">
              aausigmaconference2026@gmail.com
              <br />
             +234 813 275 0008
            </p>
          </div>
        </div>
        <p className="mt-8 border-t border-white/15 pt-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} {siteConfig.parentOrg}. {siteConfig.chapterName}{" "}
          Chapter. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
