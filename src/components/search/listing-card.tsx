import Link from "next/link";
import type { MarketplaceListing } from "@/lib/types";

type ListingCardProps = {
  listing: MarketplaceListing;
};

export function ListingCard({ listing }: ListingCardProps) {
  const href = listing.kind === "barber" ? `/barbers/${listing.slug}` : `/shops/${listing.slug}`;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-[30px] border border-black/10 bg-white/80 p-5 shadow-[0_18px_60px_rgba(16,16,16,0.06)] transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-neutral-500">{listing.kind === "barber" ? "Barber" : "Shop"}</div>
          <h3 className="mt-3 text-2xl font-semibold text-neutral-950">{listing.name}</h3>
          <div className="mt-2 text-sm text-neutral-600">{listing.location.neighborhood}, {listing.location.city}</div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">{listing.tagline}</p>
        </div>
        <div className="rounded-full border border-black/10 px-3 py-1 text-xs text-neutral-600">
          {listing.verified ? "Verified" : "Pending"}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {listing.specialties.slice(0, 3).map((specialty) => (
          <span key={specialty} className="chip text-xs text-neutral-700">
            {specialty}
          </span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div>
          <div className="text-neutral-500">Rating</div>
          <div className="mt-1 font-semibold text-neutral-950">{listing.rating.toFixed(1)}</div>
        </div>
        <div>
          <div className="text-neutral-500">Price</div>
          <div className="mt-1 font-semibold text-neutral-950">{listing.priceBandLabel}</div>
        </div>
        <div>
          <div className="text-neutral-500">Language</div>
          <div className="mt-1 font-semibold text-neutral-950">{listing.languages[0]}</div>
        </div>
        <div>
          <div className="text-neutral-500">Distance</div>
          <div className="mt-1 font-semibold text-neutral-950">{listing.location.distanceMiles.toFixed(1)} mi</div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-black/8 pt-4 text-sm text-neutral-600">
        <span>{listing.reviewCount} reviews</span>
        <span className="transition-transform group-hover:translate-x-1">View profile</span>
      </div>
    </Link>
  );
}