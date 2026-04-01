export type ListingKind = "barber" | "shop";

export type PriceBand = "under-50" | "under-70" | "70-plus";

export type MarketplaceListing = {
  id: string;
  slug: string;
  kind: ListingKind;
  name: string;
  tagline: string;
  description: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  profileCompleteness: number;
  priceBand: PriceBand;
  priceBandLabel: string;
  bookingUrl: string;
  specialties: string[];
  hairTypes: string[];
  styles: string[];
  languages: string[];
  services: { name: string; price: string; duration: string }[];
  location: {
    city: string;
    neighborhood: string;
    state: string;
    distanceMiles: number;
  };
  team?: string[];
};

export type SearchFilters = {
  query?: string;
  location?: string;
  style?: string;
  hairType?: string;
  price?: PriceBand;
  language?: string;
};