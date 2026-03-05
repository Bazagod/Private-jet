"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { FlightInfo } from "@/types";
import Header from "@/components/Header";
import FlightDetails from "@/components/FlightDetails";
import BookingForm from "@/components/BookingForm";
import NavModal from "@/components/NavModal";
import type { NavSection } from "@/components/NavModal";

const FlightMap = dynamic(() => import("@/components/FlightMap"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-border border-t-accent rounded-full animate-spin" />
        <span className="text-xs text-subtle">Loading map</span>
      </div>
    </div>
  ),
});

const init: FlightInfo = { departure: null, arrival: null, distance: 0, duration: 0, price: 0 };

export default function Home() {
  const [flight, setFlight] = useState<FlightInfo>(init);
  const [tab, setTab] = useState<"details" | "booking">("details");
  const [navSection, setNavSection] = useState<NavSection>(null);

  const onUpdate = useCallback((info: FlightInfo) => {
    setFlight(info);
    if (info.departure && info.arrival) setTab("details");
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header
        onNavClick={(section) => setNavSection(section)}
        onBookClick={() => setTab("booking")}
      />

      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        {/* ── Map ── */}
        <div className="flex-1 relative min-h-[300px] lg:min-h-0 overflow-hidden bg-background">
          <FlightMap flightInfo={flight} onFlightUpdate={onUpdate} />

          <AnimatePresence mode="wait">
            {!flight.departure && (
              <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ delay: 0.5 }}
                className="absolute top-5 left-1/2 -translate-x-1/2 z-[500] flex items-center gap-2 h-9 px-4 rounded-full bg-surface-elevated/90 backdrop-blur-md shadow-lg shadow-black/20 border border-border">
                <span className="w-[18px] h-[18px] rounded-full bg-accent text-primary-fg text-[9px] font-bold flex items-center justify-center">1</span>
                <span className="text-[12px] text-muted pr-0.5">Select <span className="text-foreground font-medium">departure</span></span>
              </motion.div>
            )}
            {flight.departure && !flight.arrival && (
              <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                className="absolute top-5 left-1/2 -translate-x-1/2 z-[500] flex items-center gap-2 h-9 px-4 rounded-full bg-surface-elevated/90 backdrop-blur-md shadow-lg shadow-black/20 border border-border">
                <span className="w-[18px] h-[18px] rounded-full bg-accent text-primary-fg text-[9px] font-bold flex items-center justify-center">2</span>
                <span className="text-[12px] text-muted pr-0.5">Destination from <span className="text-accent font-semibold tracking-wider">{flight.departure.code}</span></span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-[380px] xl:w-[400px] shrink-0 bg-[#0b0c12] border-t lg:border-t-0 lg:border-l border-border flex flex-col min-h-[320px] lg:min-h-0 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] via-transparent to-transparent pointer-events-none" />

          {/* Tabs */}
          <div className="flex h-12 border-b border-border shrink-0 relative">
            {(["details", "booking"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`flex-1 text-[12px] uppercase tracking-wider font-medium relative cursor-pointer transition-colors ${tab === t ? "text-accent" : "text-subtle hover:text-muted"}`}>
                {t === "details" ? "Flight Details" : "Booking"}
                {tab === t && (
                  <motion.div layoutId="tab" className="absolute bottom-0 inset-x-6 h-[1.5px] bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 relative">
            {tab === "details" ? <FlightDetails flightInfo={flight} /> : <BookingForm flightInfo={flight} />}
          </div>

          {/* Footer */}
          <div className="h-11 px-5 flex items-center justify-between border-t border-border shrink-0 relative">
            <span className="text-[11px] text-subtle font-medium">{flight.departure ? flight.departure.city : "---"}</span>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
              <svg className="w-3.5 h-3.5 text-accent/50 -rotate-45" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></svg>
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
            </div>
            <span className="text-[11px] text-subtle font-medium">{flight.arrival ? flight.arrival.city : "---"}</span>
          </div>

          {/* Signature */}
          <div className="h-9 flex items-center justify-center border-t border-border/50 shrink-0 relative">
            <span className="text-[10px] text-subtle/60 tracking-widest uppercase">Crafted by</span>
            <span className="text-[11px] text-accent/70 font-semibold tracking-wider ml-1.5" style={{ fontStyle: "italic" }}>Bazagod</span>
          </div>
        </aside>
      </div>

      {/* ── Nav Modal ── */}
      <NavModal section={navSection} onClose={() => setNavSection(null)} />
    </div>
  );
}
