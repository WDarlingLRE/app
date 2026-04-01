import Link from "next/link";
import { ListingCard } from "@/components/search/listing-card";
import { marketplaceListings } from "@/lib/data";
import { searchMarketplace } from "@/lib/search/ranking";
import { specialtyTaxonomy } from "@/lib/taxonomies/specialties";

const featuredListings = marketplaceListings.slice(0, 3);
const topRankedBarbers = searchMarketplace({
  query: "fade",
}).filter((listing) => listing.kind === "barber").slice(0, 4);
const topRankedBarberRail = [...topRankedBarbers, ...topRankedBarbers, ...topRankedBarbers];

export default function Home() {
  return (
    <main className="pb-20 pt-6 sm:pb-24 sm:pt-8">
      <div className="page-shell space-y-16">
        <header className="glass-panel relative overflow-hidden rounded-4xl px-6 py-6 sm:px-8 sm:py-8">
          <div className="ambient-orb -right-15 -top-10 h-40 w-40 bg-black/8" />
          <div className="ambient-orb -bottom-5 -left-5 h-24 w-24 bg-white/90" />
          <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <div className="max-w-3xl">
              <div className="section-label mb-4">Find your next barber</div>
              <h1 className="display-title text-5xl leading-none sm:text-6xl lg:text-7xl">
                Find a barber or shop that fits your hair, your style, and your budget.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
                Search by cut, hair type, price, and location, then compare real specialties, reviews, and booking options in one place.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/search"
                  className="primary-cta inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
                >
                  Start searching
                </Link>
                <Link
                  href="/onboarding"
                  className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-white"
                >
                  Claim your listing
                </Link>
              </div>

              <div className="mt-8 rounded-[28px] border border-black/10 bg-white/72 p-4 sm:p-5">
                <div>
                  <div className="section-label">Search now</div>
                  <div className="mt-2 text-lg font-semibold text-neutral-950">Start with a cut, style, or city.</div>
                </div>

                <form action="/search" className="mt-4 grid gap-3 xl:grid-cols-[1.2fr_1fr_auto]">
                  <label className="block">
                    <span className="field-label">What are you looking for?</span>
                    <input
                      name="query"
                      className="field-input"
                      placeholder="Skin fade, braids, beard trim, textured crop"
                    />
                  </label>

                  <label className="block">
                    <span className="field-label">Location</span>
                    <input
                      name="location"
                      className="field-input"
                      placeholder="Brooklyn, Newark, Jersey City"
                    />
                  </label>

                  <button type="submit" className="primary-cta inline-flex items-center justify-center rounded-[18px] px-5 py-3 text-sm font-medium xl:self-end">
                    Search listings
                  </button>
                </form>

                <div className="mt-5">
                  <div className="text-xs uppercase tracking-[0.18em] text-neutral-500">Quick searches</div>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-neutral-600">
                    {specialtyTaxonomy.slice(0, 5).map((specialty) => (
                      <Link key={specialty.slug} href={`/search?style=${specialty.slug}`} className="chip transition-colors hover:border-black/12 hover:bg-white">
                        {specialty.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <aside className="glass-panel flex h-full min-h-144 flex-col rounded-4xl px-6 py-6 sm:px-7 sm:py-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="section-label">Popular on The Hare</div>
                  <div className="mt-3 text-2xl font-semibold text-neutral-950">Start with some of the strongest barber profiles on the app.</div>
                </div>
                <Link href="/search" className="text-sm text-neutral-600 underline-offset-4 hover:underline">
                  See all
                </Link>
              </div>

              <div className="ranked-rail mt-6">
                <div className="ranked-rail-track w-full pr-1">
                  {topRankedBarberRail.map((barber, index) => (
                    <Link
                      key={`${barber.id}-${index}`}
                      href={`/barbers/${barber.slug}`}
                      className="block rounded-3xl border border-black/8 bg-white/82 p-4 transition-colors hover:bg-white"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-[0.18em] text-neutral-500">Top pick {index % topRankedBarbers.length + 1}</div>
                          <h3 className="mt-2 text-xl font-semibold text-neutral-950">{barber.name}</h3>
                          <p className="mt-2 text-sm leading-6 text-neutral-600">{barber.tagline}</p>
                        </div>
                        <div className="rounded-full border border-black/10 px-3 py-1 text-xs text-neutral-700">
                          {barber.rating.toFixed(1)}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {barber.specialties.slice(0, 2).map((specialty) => (
                          <span key={specialty} className="chip text-xs text-neutral-700">
                            {specialty}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center justify-between text-sm text-neutral-600">
                        <span>{barber.location.neighborhood}, {barber.location.city}</span>
                        <span>{barber.reviewCount} reviews</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </section>
        </header>

        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="section-label">Featured listings</div>
              <h2 className="display-title mt-2 text-4xl sm:text-5xl">Barbers and shops worth a closer look.</h2>
            </div>
            <Link href="/search" className="text-sm text-neutral-600 underline-offset-4 hover:underline">
              Browse all listings
            </Link>
          </div>
          <div className="card-grid lg:grid-cols-3">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-4xl px-6 py-6 sm:px-8 sm:py-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="section-label">Own a chair or a shop?</div>
              <h2 className="display-title mt-2 text-4xl sm:text-5xl">Create a profile and help new clients find you.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">Add your specialties, pricing, location, and booking link so people can decide faster and book with confidence.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/onboarding" className="primary-cta inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors hover:bg-neutral-800">
                List your business
              </Link>
              <Link href="/search" className="inline-flex items-center justify-center rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-white">
                Keep browsing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
