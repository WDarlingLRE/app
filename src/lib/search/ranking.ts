import { marketplaceListings } from "@/lib/data";
import type { MarketplaceListing, SearchFilters } from "@/lib/types";

function includesMatch(values: string[], query?: string) {
  if (!query) {
    return true;
  }

  return values.some((value) => value.toLowerCase().includes(query.toLowerCase()));
}

function scoreListing(listing: MarketplaceListing, filters: SearchFilters) {
  let score = listing.rating * 12;

  score += listing.profileCompleteness * 0.4;
  score += listing.verified ? 18 : 0;
  score += Math.max(0, 15 - listing.location.distanceMiles);
  score += Math.min(listing.reviewCount, 150) * 0.08;

  if (filters.style && includesMatch(listing.styles, filters.style)) {
    score += 28;
  }

  if (filters.hairType && includesMatch(listing.hairTypes, filters.hairType)) {
    score += 22;
  }

  if (filters.language && includesMatch(listing.languages, filters.language)) {
    score += 14;
  }

  if (filters.query) {
    const haystack = [listing.name, listing.tagline, ...listing.specialties, ...listing.hairTypes];
    if (includesMatch(haystack, filters.query)) {
      score += 20;
    }
  }

  return score;
}

export function searchMarketplace(filters: SearchFilters) {
  return marketplaceListings
    .filter((listing) => {
      const matchesLocation = filters.location
        ? [listing.location.city, listing.location.neighborhood, listing.location.state]
            .join(" ")
            .toLowerCase()
            .includes(filters.location.toLowerCase())
        : true;

      const matchesStyle = filters.style ? includesMatch(listing.styles, filters.style) : true;
      const matchesHairType = filters.hairType ? includesMatch(listing.hairTypes, filters.hairType) : true;
      const matchesLanguage = filters.language ? includesMatch(listing.languages, filters.language) : true;
      const matchesPrice = filters.price ? listing.priceBand === filters.price : true;
      const matchesQuery = filters.query
        ? includesMatch([listing.name, listing.tagline, ...listing.specialties], filters.query)
        : true;

      return matchesLocation && matchesStyle && matchesHairType && matchesLanguage && matchesPrice && matchesQuery;
    })
    .map((listing) => ({
      listing,
      score: scoreListing(listing, filters),
    }))
    .sort((left, right) => right.score - left.score)
    .map(({ listing, score }) => ({
      ...listing,
      rankingScore: Number(score.toFixed(1)),
    }));
}