import Link from "next/link";
import { notFound } from "next/navigation";
import { marketplaceListings } from "@/lib/data";

export function generateStaticParams() {
  return marketplaceListings
    .filter((listing) => listing.kind === "shop")
    .map((listing) => ({ slug: listing.slug }));
}

type ShopPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ShopPage({ params }: ShopPageProps) {
  const { slug } = await params;
  const shop = marketplaceListings.find((listing) => listing.kind === "shop" && listing.slug === slug);

  if (!shop) {
    notFound();
  }

  return (
    <main className="pb-20 pt-6 sm:pt-8">
      <div className="page-shell">
        <Link href="/search" className="text-sm text-neutral-600 underline-offset-4 hover:underline">Back to search</Link>
        <section className="glass-panel mt-4 rounded-[34px] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="section-label">Shop profile</div>
              <h1 className="display-title mt-3 text-5xl sm:text-6xl">{shop.name}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">{shop.tagline}</p>
              <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600">{shop.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {shop.specialties.map((specialty) => (
                  <span key={specialty} className="chip text-sm text-neutral-700">{specialty}</span>
                ))}
              </div>
            </div>

            <aside className="rounded-[30px] border border-black/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(16,16,16,0.06)]">
              <div className="section-label">At a glance</div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <div className="text-sm text-neutral-500">Rating</div>
                  <div className="mt-1 text-3xl font-semibold text-neutral-950">{shop.rating.toFixed(1)}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Reviews</div>
                  <div className="mt-1 text-3xl font-semibold text-neutral-950">{shop.reviewCount}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Profile status</div>
                  <div className="mt-1 text-lg font-semibold text-neutral-950">{shop.verified ? "Verified" : "Pending review"}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500">Price range</div>
                  <div className="mt-1 text-lg font-semibold text-neutral-950">{shop.priceBandLabel}</div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[30px] border border-black/10 bg-white/78 p-6 shadow-[0_18px_60px_rgba(16,16,16,0.06)]">
            <div className="section-label">Team</div>
            <div className="mt-5 space-y-3">
              {shop.team?.map((member) => (
                <div key={member} className="rounded-[22px] border border-black/8 px-4 py-4 text-neutral-900">
                  {member}
                </div>
              ))}
            </div>
          </article>

          <article className="dark-surface rounded-[30px] border border-black/10 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <div className="section-label text-white/80">Services and booking</div>
            <div className="mt-5 space-y-4">
              {shop.services.map((service) => (
                <div key={service.name} className="flex items-center justify-between rounded-[22px] border border-white/12 px-4 py-4">
                  <div>
                    <div className="font-medium text-white">{service.name}</div>
                    <div className="mt-1 text-sm text-white/85">{service.duration}</div>
                  </div>
                  <div className="text-sm font-semibold text-white">{service.price}</div>
                </div>
              ))}
            </div>

            <a href={shop.bookingUrl} className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200">
              Open booking page
            </a>
          </article>
        </section>
      </div>
    </main>
  );
}