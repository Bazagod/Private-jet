import { Coordinate } from "@/types";

const EARTH_RADIUS_KM = 6371;
const AVG_SPEED_KMH = 900;
const PRICE_PER_KM = 12.5;
const BASE_PRICE = 5000;

export function haversineDistance(from: Coordinate, to: Coordinate): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from.lat)) *
      Math.cos(toRad(to.lat)) *
      Math.sin(dLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

export function calculateFlightDuration(distanceKm: number): number {
  return distanceKm / AVG_SPEED_KMH;
}

export function calculatePrice(distanceKm: number): number {
  return BASE_PRICE + distanceKm * PRICE_PER_KM;
}

export function formatDuration(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m.toString().padStart(2, "0")}min`;
}

export function formatDistance(km: number): string {
  return Math.round(km).toLocaleString("en-US");
}

export function formatPrice(price: number): string {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function generateArcPoints(
  from: Coordinate,
  to: Coordinate,
  numPoints: number = 100
): [number, number][] {
  const points: [number, number][] = [];

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const lat = from.lat + (to.lat - from.lat) * t;
    const lng = from.lng + (to.lng - from.lng) * t;

    const arcHeight =
      Math.sin(t * Math.PI) *
      Math.min(
        15,
        haversineDistance(from, to) / 500
      );

    points.push([lat + arcHeight * 0.3, lng]);
  }

  return points;
}
