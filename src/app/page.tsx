import Link from "next/link";
import { HareMark } from "@/components/branding/hare-mark";
import { ListingCard } from "@/components/search/listing-card";
import { marketplaceListings } from "@/lib/data";
import { specialtyTaxonomy } from "@/lib/taxonomies/specialties";

const featuredListings = marketplaceListings.slice(0, 3);

export default function Home() {
  return (
    <main className="pb-20 pt-6 sm:pb-24 sm:pt-8">
      <div className="page-shell">
        <header className="glass-panel relative overflow-hidden rounded-[32px] px-6 py-6 sm:px-8">
          <div className="ambient-orb right-[-60px] top-[-40px] h-40 w-40 bg-black/8" />
          <div className="ambient-orb bottom-[-20px] left-[-20px] h-24 w-24 bg-white/90" />
          <nav className="mb-10 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <HareMark />
              <div>
                <div className="text-xs tracking-[0.24em] text-neutral-500 uppercase">The Hare</div>
                <div className="text-sm text-neutral-700">Find the right chair faster</div>
              </div>
            </Link>
            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <Link href="/search" className="rounded-full border border-black/10 px-4 py-2 hover:bg-black hover:text-white transition-colors">
                Browse listings
              </Link>
              <Link href="/onboarding" className="hidden sm:inline-flex rounded-full bg-black px-4 py-2 text-white hover:bg-neutral-800 transition-colors">
                Join The Hare
              </Link>
            </div>
          </nav>

          <section className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="section-label mb-4">Discovery-first grooming marketplace</div>
              <h1 className="display-title text-5xl leading-none sm:text-6xl lg:text-7xl">
                Search for the barber who actually fits your hair, style, and city.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
                The Hare replaces scattered Google searches with a single marketplace for barbers, salons, and specialists. Filter by hair type, style specialty, language, price, and location to narrow the field fast.
              </p>

              <div className="mt-8 grid gap-3 rounded-[28px] border border-black/10 bg-white/70 p-4 sm:grid-cols-[1.15fr_0.85fr_0.85fr_auto] sm:p-5">
                <div className="rounded-[20px] border border-black/8 bg-white px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.22em] text-neutral-500">Style</div>
                  <div className="mt-2 text-sm text-neutral-900">Textured crop, fades, braids, locs</div>
                </div>
                <div className="rounded-[20px] border border-black/8 bg-white px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.22em] text-neutral-500">Location</div>
                  <div className="mt-2 text-sm text-neutral-900">Brooklyn within 8 miles</div>
                </div>
                <div className="rounded-[20px] border border-black/8 bg-white px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.22em] text-neutral-500">Price</div>
                  <div className="mt-2 text-sm text-neutral-900">Under $70</div>
                </div>
                <Link
                  href="/search?query=textured+crop&location=Brooklyn&style=textured-crop&price=under-70"
                  className="inline-flex items-center justify-center rounded-[20px] bg-black px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
                >
                  Search now
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-neutral-600">
                {specialtyTaxonomy.slice(0, 5).map((specialty) => (
                  <Link key={specialty.slug} href={`/search?style=${specialty.slug}`} className="chip hover:border-black/12 hover:bg-white transition-colors">
                    {specialty.label}
                  </Link>
                ))}
              </div>
            </div>

            <aside className="rounded-[32px] border border-black/10 bg-black px-6 py-6 text-white shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
              <div className="section-label text-white/60">Why it works</div>
              <div className="mt-4 text-2xl font-semibold">Built for discovery, not endless scrolling.</div>
              <div className="mt-6 space-y-4 text-sm leading-6 text-white/72">
                <p>Compare verified specialists in one place instead of checking ten sites, five Instagrams, and three booking pages.</p>
                <p>Profiles surface the details customers care about first: specialties, hair types served, price range, location, review quality, and language.</p>
                <p>The Hare is designed to feel selective, editorial, and fast.</p>
              </div>
            </aside>
          </section>
        </header>

        <section className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="section-label">Search signal stack</div>
            <h2 className="display-title mt-3 text-4xl leading-tight sm:text-5xl">Specialty match, trust, and distance all in the same result rank.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-neutral-600">
              Results are shaped by what the customer actually needs, not whoever happened to game a feed. The score favors specialty relevance, review quality, profile depth, verification, and local fit.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Hair type and style", "Curly cuts, braids, sharp fades, beard work, color, loc care."],
              ["Trust signals", "Verified listings, review count, profile completeness, and recent activity."],
              ["Local intent", "Search by city, ZIP, neighborhood, or distance radius for real nearby options."],
            ].map(([title, body]) => (
              <article key={title} className="rounded-[28px] border border-black/10 bg-white/75 p-5 shadow-[0_18px_60px_rgba(16,16,16,0.06)]">
                <div className="text-sm font-semibold text-neutral-900">{title}</div>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="section-label">Featured in the market</div>
              <h2 className="display-title mt-2 text-4xl sm:text-5xl">A first pass at premium discovery.</h2>
            </div>
            <Link href="/search" className="text-sm text-neutral-600 underline-offset-4 hover:underline">
              View all listings
            </Link>
          </div>
          <div className="card-grid lg:grid-cols-3">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
