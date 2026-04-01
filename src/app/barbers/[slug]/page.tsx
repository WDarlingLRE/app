import Link from "next/link";
import { notFound } from "next/navigation";
import { marketplaceListings } from "@/lib/data";

export function generateStaticParams() {
  return marketplaceListings
    .filter((listing) => listing.kind === "barber")
    .map((listing) => ({ slug: listing.slug }));
}

type BarberPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BarberPage({ params }: BarberPageProps) {
  const { slug } = await params;
  const barber = marketplaceListings.find((listing) => listing.kind === "barber" && listing.slug === slug);

  if (!barber) {
    notFound();
  }

  return (
    <main className="pb-20 pt-6 sm:pt-8">
      <div className="page-shell">
        <Link href="/search" className="text-sm text-neutral-600 underline-offset-4 hover:underline">Back to search</Link>
        <section className="glass-panel mt-4 rounded-[34px] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="section-label">Barber profile</div>
              <h1 className="display-title mt-3 text-5xl sm:text-6xl">{barber.name}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">{barber.tagline}</p>
              <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600">{barber.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {barber.specialties.map((specialty) => (
                  <span key={specialty} className="chip text-sm text-neutral-700">{specialty}</span>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[24px] border border-black/10 bg-white/80 p-5">
                  <div className="text-sm text-neutral-500">Rating</div>
                  <div className="mt-2 text-3xl font-semibold">{barber.rating.toFixed(1)}</div>
                  <div className="mt-1 text-sm text-neutral-600">{barber.reviewCount} reviews</div>
                </div>
                <div className="rounded-[24px] border border-black/10 bg-white/80 p-5">
                  <div className="text-sm text-neutral-500">Price range</div>
                  <div className="mt-2 text-3xl font-semibold">{barber.priceBandLabel}</div>
                  <div className="mt-1 text-sm text-neutral-600">Typical price</div>
                </div>
                <div className="rounded-[24px] border border-black/10 bg-white/80 p-5">
                  <div className="text-sm text-neutral-500">Languages</div>
                  <div className="mt-2 text-2xl font-semibold">{barber.languages.join(", ")}</div>
                  <div className="mt-1 text-sm text-neutral-600">Spoken in the chair</div>
                </div>
              </div>
            </div>

            <aside className="dark-surface rounded-[30px] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
              <div className="section-label text-white/80">Book this barber</div>
              <div className="mt-3 text-3xl font-semibold">Book directly through their current booking page.</div>
              <p className="mt-4 text-sm leading-7 text-white/90">
                You will leave The Hare to finish booking, but this profile gives you the details you need before you click through.
              </p>
              <a href={barber.bookingUrl} className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200">
                Open booking page
              </a>

              <div className="hairline my-8 opacity-20" />

              <div className="space-y-3 text-sm text-white/90">
                <div>{barber.location.neighborhood}, {barber.location.city}, {barber.location.state}</div>
                <div>{barber.location.distanceMiles} miles away</div>
                <div>{barber.verified ? "Verified profile" : "Profile verification pending"}</div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[30px] border border-black/10 bg-white/78 p-6 shadow-[0_18px_60px_rgba(16,16,16,0.06)]">
            <div className="section-label">Services</div>
            <div className="mt-5 space-y-4">
              {barber.services.map((service) => (
                <div key={service.name} className="flex items-center justify-between rounded-[22px] border border-black/8 px-4 py-4">
                  <div>
                    <div className="font-medium text-neutral-950">{service.name}</div>
                    <div className="mt-1 text-sm text-neutral-600">{service.duration}</div>
                  </div>
                  <div className="text-sm font-semibold text-neutral-950">{service.price}</div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[30px] border border-black/10 bg-white/78 p-6 shadow-[0_18px_60px_rgba(16,16,16,0.06)]">
            <div className="section-label">Good to know</div>
            <div className="mt-5 space-y-5">
              <div>
                <div className="text-sm text-neutral-500">Works with</div>
                <div className="mt-2 text-lg text-neutral-900">{barber.hairTypes.join(", ")}</div>
              </div>
              <div>
                <div className="text-sm text-neutral-500">Known for</div>
                <div className="mt-2 text-lg text-neutral-900">{barber.styles.join(", ")}</div>
              </div>
              <div>
                <div className="text-sm text-neutral-500">Profile details added</div>
                <div className="mt-2 text-lg text-neutral-900">{barber.profileCompleteness}% complete</div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}