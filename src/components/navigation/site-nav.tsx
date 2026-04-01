import Link from "next/link";
import { HareMark } from "@/components/branding/hare-mark";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/6 bg-[rgba(246,246,244,0.82)] backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <HareMark />
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-neutral-500">The Hare</div>
            <div className="text-sm text-neutral-700">Find the right chair with less guesswork</div>
          </div>
        </Link>

        <nav className="flex items-center gap-3 text-sm text-neutral-600">
          <Link href="/search" className="rounded-full border border-black/10 px-4 py-2 transition-colors hover:bg-black hover:text-white">
            Browse barbers
          </Link>
          <Link href="/onboarding" className="primary-cta hidden sm:inline-flex rounded-full px-4 py-2 transition-colors hover:bg-neutral-800">
            List your chair
          </Link>
        </nav>
      </div>
    </header>
  );
}