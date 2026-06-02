import Link from "next/link";
import { siteConfig, getFullChapterName } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-bold text-[#5E50A1]">{getFullChapterName()}</p>
            <p className="mt-2 text-sm text-gray-600">{siteConfig.institution}</p>
            <p className="text-sm text-gray-600">{siteConfig.location}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Quick links</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>
                <Link href="/events" className="hover:text-[#5E50A1]">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#5E50A1]">
                  About Us
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.parentSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#5E50A1]"
                >
                  Sigma Nursing (Parent)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-900">Contact</p>
            <p className="mt-2 text-sm text-gray-600">
              memserv@sigmanursing.org
              <br />
              (Placeholder — update with chapter contact)
            </p>
          </div>
        </div>
        <p className="mt-8 border-t border-gray-200 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} {siteConfig.parentOrg}. {siteConfig.chapterName}{" "}
          Chapter. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
