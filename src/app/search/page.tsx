"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ListingCard } from "@/components/search/listing-card";
import { searchMarketplace } from "@/lib/search/ranking";
import { hairTypeTaxonomy, languageTaxonomy, priceTaxonomy, specialtyTaxonomy } from "@/lib/taxonomies/specialties";
import type { PriceBand } from "@/lib/types";

const searchPresets = [
  {
    href: "/search?style=skin-fade&location=Brooklyn&price=under-70",
    label: "Brooklyn fades under $70",
  },
  {
    href: "/search?style=braids&hairType=Coily",
    label: "Braids for coily hair",
  },
  {
    href: "/search?style=locs&language=Spanish",
    label: "Loc care with Spanish-speaking pros",
  },
];

function isPriceBand(value: string | null): value is PriceBand {
  return value === "under-50" || value === "under-70" || value === "70-plus";
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const price = searchParams.get("price");
  const styleLabel = specialtyTaxonomy.find((item) => item.slug === searchParams.get("style"))?.label;
  const priceLabel = priceTaxonomy.find((item) => item.value === price)?.label;
  const filters = {
    query: searchParams.get("query") ?? undefined,
    location: searchParams.get("location") ?? undefined,
    style: searchParams.get("style") ?? undefined,
    hairType: searchParams.get("hairType") ?? undefined,
    price: isPriceBand(price) ? price : undefined,
    language: searchParams.get("language") ?? undefined,
  };
  const results = searchMarketplace(filters);
  const activeFilters = [
    filters.query ? `Keyword: ${filters.query}` : null,
    filters.location ? `Location: ${filters.location}` : null,
    styleLabel ? `Style: ${styleLabel}` : null,
    filters.hairType ? `Hair type: ${filters.hairType}` : null,
    priceLabel ? `Budget: ${priceLabel}` : null,
    filters.language ? `Language: ${filters.language}` : null,
  ].filter(Boolean) as string[];

  return (
    <main className="pb-20 pt-6 sm:pt-8">
      <div className="page-shell space-y-6">
        <section className="glass-panel rounded-4xl px-5 py-6 sm:px-7 sm:py-7">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="section-label">Search barbers and shops</div>
              <h1 className="display-title mt-3 text-4xl leading-tight sm:text-5xl">Find the right cut, barber, and location without bouncing between tabs.</h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-neutral-600 sm:text-base">
                Search by style, hair type, price, and language, then compare listings with reviews, specialties, and booking details in one place.
              </p>
            </div>
            <div className="rounded-3xl border border-black/10 bg-white/74 px-4 py-4 text-sm text-neutral-700">
              <div className="text-xs uppercase tracking-[0.18em] text-neutral-500">Showing now</div>
              <div className="mt-2 font-semibold text-neutral-950">{results.length} matches</div>
              <div className="mt-1 text-neutral-600">Results are sorted to highlight strong local matches first.</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-[0.18em] text-neutral-500">Popular starting points</div>
            <div className="mt-3 flex flex-wrap gap-3">
              {searchPresets.map((preset) => (
                <Link key={preset.href} href={preset.href} className="chip transition-colors hover:border-black/12 hover:bg-white">
                  {preset.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="glass-panel h-fit rounded-[30px] p-5 sm:p-6 lg:sticky lg:top-4">
            <div className="section-label">Filters</div>
            <h2 className="display-title mt-3 text-3xl sm:text-4xl">Narrow down your options.</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Start broad, then filter by the details that matter most to you.
            </p>

            <form className="mt-6 space-y-6" action="/search">
              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold text-neutral-900">What are you looking for?</legend>

                <label className="block">
                  <span className="field-label">Keyword</span>
                  <input name="query" defaultValue={filters.query} className="field-input" placeholder="fade, braids, beard, color" />
                  <span className="field-help">Use the service, result, or cut you already have in mind.</span>
                </label>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <label className="block">
                    <span className="field-label">Style specialty</span>
                    <select name="style" defaultValue={filters.style ?? ""} className="field-input">
                      <option value="">Any style</option>
                      {specialtyTaxonomy.map((item) => (
                        <option key={item.slug} value={item.slug}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="field-label">Hair type</span>
                    <select name="hairType" defaultValue={filters.hairType ?? ""} className="field-input">
                      <option value="">Any hair type</option>
                      {hairTypeTaxonomy.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </fieldset>

              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold text-neutral-900">Where and under what constraints?</legend>

                <label className="block">
                  <span className="field-label">Location</span>
                  <input name="location" defaultValue={filters.location} className="field-input" placeholder="Brooklyn, Jersey City, Newark" />
                </label>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <label className="block">
                    <span className="field-label">Price range</span>
                    <select name="price" defaultValue={filters.price ?? ""} className="field-input">
                      <option value="">Any price</option>
                      {priceTaxonomy.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="field-label">Language</span>
                    <select name="language" defaultValue={filters.language ?? ""} className="field-input">
                      <option value="">Any language</option>
                      {languageTaxonomy.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </fieldset>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row lg:flex-col">
                <button type="submit" className="primary-cta w-full rounded-[18px] px-4 py-3 text-sm font-medium transition hover:bg-neutral-800">
                  Update results
                </button>
                <Link href="/search" className="inline-flex items-center justify-center rounded-[18px] border border-black/10 px-4 py-3 text-sm text-neutral-600 transition hover:bg-white">
                  Clear all filters
                </Link>
              </div>
            </form>

            <div className="mt-6 rounded-3xl border border-black/10 bg-white/76 p-4">
              <div className="text-sm font-semibold text-neutral-950">Tip</div>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                If you are not seeing enough results, remove the style or budget filter first. Those usually narrow the list the fastest.
              </p>
            </div>
          </aside>

          <section className="space-y-6">
            <div className="glass-panel rounded-[30px] px-5 py-5 sm:px-6">
              <div className="section-label">Results</div>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="display-title text-3xl leading-tight sm:text-4xl">{results.length} listings for this search</h2>
                  <p className="mt-2 max-w-2xl text-sm text-neutral-600">
                    Compare specialties, reviews, pricing, language, and location before you choose where to book.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-xs uppercase tracking-[0.18em] text-neutral-500">Active filters</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeFilters.length > 0 ? (
                    activeFilters.map((filter) => (
                      <span key={filter} className="chip text-xs text-neutral-700">
                        {filter}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-neutral-600">No filters applied yet. Start with a location, style, or budget to narrow the field.</span>
                  )}
                </div>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="rounded-[30px] border border-dashed border-black/12 bg-white/70 p-8 text-center shadow-[0_18px_60px_rgba(16,16,16,0.05)] sm:p-10">
                <div className="display-title text-4xl">No exact matches yet.</div>
                <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-neutral-600">
                  Try widening the location or removing one filter to see more options nearby.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href="/search" className="primary-cta rounded-full px-5 py-3 text-sm">Reset search</Link>
                  <Link href="/onboarding" className="rounded-full border border-black/10 px-5 py-3 text-sm text-neutral-700">Add your business</Link>
                </div>
              </div>
            ) : (
              <div className="card-grid xl:grid-cols-2">
                {results.map((listing) => (
                  <div key={listing.id} className="space-y-3">
                    <ListingCard listing={listing} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
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