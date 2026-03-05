"use client";

import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import { Airport, FlightInfo } from "@/types";
import { airports } from "@/lib/airports";
import { haversineDistance, calculateFlightDuration, calculatePrice, generateArcPoints } from "@/lib/flight";

interface FlightMapProps {
  flightInfo: FlightInfo;
  onFlightUpdate: (info: FlightInfo) => void;
}

function markerIcon(selected: boolean) {
  if (selected) {
    return L.divIcon({
      html: `<div style="position:relative;width:28px;height:28px;display:flex;align-items:center;justify-content:center">
        <div style="position:absolute;inset:0;border-radius:50%;border:1.5px solid #c9a55a;opacity:0.25;animation:mp 2s cubic-bezier(0,0,0.2,1) infinite"></div>
        <div style="position:absolute;inset:4px;border-radius:50%;background:rgba(201,165,90,0.08)"></div>
        <div style="width:12px;height:12px;border-radius:50%;background:#c9a55a;border:2px solid #08090d;box-shadow:0 0 12px rgba(201,165,90,0.4),0 2px 4px rgba(0,0,0,0.3)"></div>
      </div><style>@keyframes mp{75%,100%{transform:scale(2.4);opacity:0}}</style>`,
      className: "mk", iconSize: [28, 28], iconAnchor: [14, 14], popupAnchor: [0, -16],
    });
  }
  return L.divIcon({
    html: `<div style="width:8px;height:8px;border-radius:50%;background:rgba(201,165,90,0.5);border:1.5px solid rgba(201,165,90,0.15);box-shadow:0 0 8px rgba(201,165,90,0.15);transition:all .2s;cursor:pointer" onmouseenter="this.style.background='#c9a55a';this.style.transform='scale(1.8)';this.style.boxShadow='0 0 16px rgba(201,165,90,0.4)'" onmouseleave="this.style.background='rgba(201,165,90,0.5)';this.style.transform='scale(1)';this.style.boxShadow='0 0 8px rgba(201,165,90,0.15)'"></div>`,
    className: "mk", iconSize: [8, 8], iconAnchor: [4, 4], popupAnchor: [0, -8],
  });
}

export default function FlightMap({ flightInfo, onFlightUpdate }: FlightMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const cRef = useRef<HTMLDivElement>(null);
  const mRef = useRef<L.Marker[]>([]);
  const pRef = useRef<L.Polyline | null>(null);
  const gRef = useRef<L.Polyline | null>(null);
  const g2Ref = useRef<L.Polyline | null>(null);
  const sel = useRef<{ departure: Airport | null; arrival: Airport | null }>({ departure: flightInfo.departure, arrival: flightInfo.arrival });

  const refresh = useCallback(() => {
    if (!mapRef.current) return;
    mRef.current.forEach((m) => m.remove());
    mRef.current = [];
    airports.forEach((ap) => {
      const s = ap.code === sel.current.departure?.code || ap.code === sel.current.arrival?.code;
      const m = L.marker([ap.coordinates.lat, ap.coordinates.lng], { icon: markerIcon(s) })
        .addTo(mapRef.current!)
        .bindPopup(`<div style="text-align:center"><div style="font-size:15px;font-weight:600;color:#f0ece4;letter-spacing:2px">${ap.code}</div><div style="font-size:12px;color:#8a8693;margin-top:2px">${ap.city}</div><div style="font-size:10px;color:#5c5868;margin-top:1px">${ap.name} &middot; ${ap.country}</div></div>`, { closeButton: false });
      m.on("click", () => {
        const c = sel.current;
        if (!c.departure) sel.current = { departure: ap, arrival: null };
        else if (!c.arrival && ap.code !== c.departure.code) sel.current = { ...c, arrival: ap };
        else sel.current = { departure: ap, arrival: null };
        const { departure, arrival } = sel.current;
        if (departure && arrival) {
          const d = haversineDistance(departure.coordinates, arrival.coordinates);
          onFlightUpdate({ departure, arrival, distance: d, duration: calculateFlightDuration(d), price: calculatePrice(d) });
          draw(departure, arrival);
        } else {
          onFlightUpdate({ departure, arrival: null, distance: 0, duration: 0, price: 0 });
          clear();
        }
        refresh();
      });
      mRef.current.push(m);
    });
  }, [onFlightUpdate]);

  const clear = useCallback(() => {
    pRef.current?.remove(); pRef.current = null;
    gRef.current?.remove(); gRef.current = null;
    g2Ref.current?.remove(); g2Ref.current = null;
  }, []);

  const draw = useCallback((a: Airport, b: Airport) => {
    if (!mapRef.current) return;
    clear();
    const pts = generateArcPoints(a.coordinates, b.coordinates);
    g2Ref.current = L.polyline(pts, { color: "#c9a55a", weight: 12, opacity: 0.06, smoothFactor: 1.5, lineCap: "round" }).addTo(mapRef.current);
    gRef.current = L.polyline(pts, { color: "#c9a55a", weight: 4, opacity: 0.2, smoothFactor: 1.5, lineCap: "round", className: "arc-glow" }).addTo(mapRef.current);
    pRef.current = L.polyline(pts, { color: "#c9a55a", weight: 1.8, opacity: 0.75, dashArray: "8 6", smoothFactor: 1.5, lineCap: "round", className: "arc" }).addTo(mapRef.current);
    mapRef.current.fitBounds(L.latLngBounds([a.coordinates.lat, a.coordinates.lng], [b.coordinates.lat, b.coordinates.lng]), { padding: [80, 80], maxZoom: 6, animate: true });
  }, [clear]);

  useEffect(() => {
    if (!cRef.current || mapRef.current) return;
    const map = L.map(cRef.current, { center: [28, 15], zoom: 3, minZoom: 2, maxZoom: 8, zoomControl: false, attributionControl: false });
    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 19 }).addTo(map);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 19, opacity: 0.55 }).addTo(map);
    mapRef.current = map;
    refresh();
    setTimeout(() => map.invalidateSize(), 200);
    return () => { map.remove(); mapRef.current = null; };
  }, [refresh]);

  return (
    <div className="absolute inset-0">
      <div ref={cRef} style={{ width: "100%", height: "100%" }} />
      <div className="absolute inset-x-0 top-0 h-16 pointer-events-none bg-gradient-to-b from-background/60 to-transparent z-[400]" />
      <style jsx global>{`.mk{background:transparent!important;border:none!important} .arc{animation:dash-animate 40s linear infinite;stroke-dashoffset:1000} .arc-glow{animation:glow-pulse 3s ease-in-out infinite}`}</style>
    </div>
  );
}
