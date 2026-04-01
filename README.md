# The Hare

The Hare is a discovery-first marketplace for barber shops, salons, and independent barbers. The first release is centered on search, filtering, rankings, premium profile pages, and onboarding rather than native in-app scheduling.

## Current implementation

- Next.js App Router with TypeScript and Tailwind CSS v4.
- Premium monochrome brand direction built around white, black, and layered greys.
- Search flow with filters for keyword, location, style specialty, hair type, price band, and language.
- Shared marketplace model for individual barbers and shops.
- Dynamic profile pages for barbers and shops.
- Discovery-first onboarding page for new supply.
- Prisma schema for listings, locations, specialties, languages, services, and reviews.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Data layer

The project includes a Prisma schema at `prisma/schema.prisma` prepared for PostgreSQL. Before using Prisma locally, add a `.env` file with `DATABASE_URL` and run the Prisma client workflow you prefer.

## Phase 1 scope

- Search and filtering
- Ranking signals
- Listing trust and verification states
- Barber and shop profile pages
- Supply onboarding

## Deferred to phase 2

- Native booking and availability
- Payments
- Messaging
- Deep account features
