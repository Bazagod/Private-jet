# PRIVATE JET — Luxury Flight Configurator

A premium private jet booking experience built with Next.js. Select departure and arrival airports on an interactive dark-themed map, view flight details with real-time pricing, and book your journey — all in a single-page application.

## Preview

- **Dark luxury theme** with champagne gold accents
- **Interactive world map** with 300+ airports (Leaflet + CartoDB dark tiles)
- **Animated flight routes** with gold arc and glow effects
- **Real-time pricing** based on haversine distance calculations
- **Booking form** with Zod validation and react-hook-form
- **Full navigation** — Fleet, Destinations, Services, Contact modals with lifestyle imagery

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4 |
| Animations | Framer Motion |
| Maps | Leaflet + react-leaflet |
| Forms | react-hook-form + Zod |
| Language | TypeScript 5 |
| Fonts | Geist Sans & Geist Mono |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Dark theme, custom properties, Leaflet overrides
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Main page (map + sidebar)
├── components/
│   ├── Header.tsx           # Navigation bar with glass blur effect
│   ├── FlightMap.tsx        # Interactive Leaflet map with airport markers
│   ├── FlightDetails.tsx    # Route card, stats, price, amenities
│   ├── BookingForm.tsx      # Passenger info + booking form
│   ├── CountUpPrice.tsx     # Animated price counter (spring physics)
│   └── NavModal.tsx         # Fleet, Destinations, Services, Contact modals
├── lib/
│   ├── airports.ts          # 300+ airport database (IATA codes, coordinates)
│   ├── flight.ts            # Haversine distance, duration, price calculations
│   └── schema.ts            # Zod booking validation schema
└── types/
    └── index.ts             # TypeScript interfaces
```

## How It Works

1. Click an airport on the map to set your **departure**
2. Click another airport to set your **arrival**
3. A gold animated arc draws the route; distance, duration, and price are calculated
4. Switch to the **Booking** tab to fill in passenger details and confirm

## Author

**Bazagod**
