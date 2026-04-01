"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ListingCard } from "@/components/search/listing-card";
import { searchMarketplace } from "@/lib/search/ranking";
import { hairTypeTaxonomy, languageTaxonomy, priceTaxonomy, specialtyTaxonomy } from "@/lib/taxonomies/specialties";
import type { PriceBand } from "@/lib/types";

function isPriceBand(value: string | null): value is PriceBand {
  return value === "under-50" || value === "under-70" || value === "70-plus";
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const price = searchParams.get("price");
  const filters = {
    query: searchParams.get("query") ?? undefined,
    location: searchParams.get("location") ?? undefined,
    style: searchParams.get("style") ?? undefined,
    hairType: searchParams.get("hairType") ?? undefined,
    price: isPriceBand(price) ? price : undefined,
    language: searchParams.get("language") ?? undefined,
  };
  const results = searchMarketplace(filters);

  return (
    <main className="pb-20 pt-6 sm:pt-8">
      <div className="page-shell grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="glass-panel h-fit rounded-[30px] p-5 sm:p-6">
          <div className="section-label">Search filters</div>
          <h1 className="display-title mt-3 text-4xl">Find the right fit.</h1>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            This first pass focuses on fast local discovery. The score favors specialty relevance, trust, and distance.
          </p>

          <form className="mt-6 space-y-4" action="/search">
            <label className="block">
              <span className="mb-2 block text-sm text-neutral-600">Keyword</span>
              <input name="query" defaultValue={filters.query} className="w-full rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black/30" placeholder="fade, braids, beard, color" />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-neutral-600">Location</span>
              <input name="location" defaultValue={filters.location} className="w-full rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black/30" placeholder="Brooklyn, Jersey City, Newark" />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-neutral-600">Style specialty</span>
              <select name="style" defaultValue={filters.style ?? ""} className="w-full rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black/30">
                <option value="">Any style</option>
                {specialtyTaxonomy.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-neutral-600">Hair type</span>
              <select name="hairType" defaultValue={filters.hairType ?? ""} className="w-full rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black/30">
                <option value="">Any hair type</option>
                {hairTypeTaxonomy.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-neutral-600">Price range</span>
              <select name="price" defaultValue={filters.price ?? ""} className="w-full rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black/30">
                <option value="">Any price</option>
                {priceTaxonomy.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-neutral-600">Language</span>
              <select name="language" defaultValue={filters.language ?? ""} className="w-full rounded-[18px] border border-black/10 bg-white px-4 py-3 outline-none transition focus:border-black/30">
                <option value="">Any language</option>
                {languageTaxonomy.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 rounded-[18px] bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-800">
                Apply filters
              </button>
              <Link href="/search" className="inline-flex items-center justify-center rounded-[18px] border border-black/10 px-4 py-3 text-sm text-neutral-600 transition hover:bg-white">
                Reset
              </Link>
            </div>
          </form>
        </aside>

        <section>
          <div className="glass-panel rounded-[30px] px-5 py-5 sm:px-6">
            <div className="section-label">Results</div>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="display-title text-4xl">{results.length} listings ranked for this search</h2>
                <p className="mt-2 text-sm text-neutral-600">
                  Ranked by specialty match, trust signals, review quality, and local fit.
                </p>
              </div>
              <div className="chip text-xs text-neutral-600">
                Discovery-first phase one
              </div>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="mt-6 rounded-[30px] border border-dashed border-black/12 bg-white/70 p-10 text-center shadow-[0_18px_60px_rgba(16,16,16,0.05)]">
              <div className="display-title text-4xl">No exact matches yet.</div>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-neutral-600">
                Try widening the location, removing a specialty filter, or browsing onboarding to see how new barbers and shops will enter the marketplace.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Link href="/search" className="rounded-full bg-black px-5 py-3 text-sm text-white">Reset search</Link>
                <Link href="/onboarding" className="rounded-full border border-black/10 px-5 py-3 text-sm text-neutral-700">Join The Hare</Link>
              </div>
            </div>
          ) : (
            <div className="mt-6 card-grid xl:grid-cols-2">
              {results.map((listing) => (
                <div key={listing.id} className="space-y-3">
                  <div className="pl-2 text-xs uppercase tracking-[0.16em] text-neutral-500">
                    Rank score {listing.rankingScore}
                  </div>
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageContent />
    </Suspense>
  );
}