"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FlightInfo } from "@/types";
import { formatDuration, formatDistance } from "@/lib/flight";
import CountUpPrice from "./CountUpPrice";

const CABIN_IMG = "https://images.unsplash.com/photo-1768346564210-f382cdf18375?auto=format&fit=crop&w=800&q=80";
const HERO_IMG = "https://images.unsplash.com/photo-1504877497169-fe91a0b062dc?auto=format&fit=crop&w=800&q=80";

export default function FlightDetails({ flightInfo }: { flightInfo: FlightInfo }) {
  const ok = flightInfo.departure && flightInfo.arrival;

  return (
    <AnimatePresence mode="wait">
      {ok ? (
        <motion.div
          key={`${flightInfo.departure!.code}-${flightInfo.arrival!.code}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-4"
        >
          {/* Cabin image banner */}
          <div className="relative h-32 rounded-xl overflow-hidden">
            <Image src={CABIN_IMG} alt="Private jet" fill className="object-cover" sizes="400px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c12] via-[#0b0c12]/40 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
              <span className="text-[10px] text-accent/80 uppercase tracking-widest font-medium">Your Flight</span>
              <span className="text-[10px] text-foreground/60">Gulfstream G650</span>
            </div>
          </div>

          {/* Route card */}
          <div className="card p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-glow via-transparent to-accent-glow pointer-events-none" />
            <div className="flex items-center relative">
              <div className="flex-1 text-center">
                <div className="text-2xl font-bold text-foreground tracking-widest">{flightInfo.departure!.code}</div>
                <div className="text-xs text-muted mt-0.5">{flightInfo.departure!.city}</div>
              </div>
              <div className="w-16 flex flex-col items-center gap-1 mx-2 shrink-0">
                <div className="w-full flex items-center">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                  <svg className="w-3.5 h-3.5 text-accent mx-1.5 -rotate-45 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                  </svg>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                </div>
                <span className="text-[9px] text-accent/70 uppercase tracking-[0.15em]">Direct</span>
              </div>
              <div className="flex-1 text-center">
                <div className="text-2xl font-bold text-foreground tracking-widest">{flightInfo.arrival!.code}</div>
                <div className="text-xs text-muted mt-0.5">{flightInfo.arrival!.city}</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2.5">
            <Stat label="Distance" val={formatDistance(flightInfo.distance)} unit="km" />
            <Stat label="Duration" val={formatDuration(flightInfo.duration)} />
            <Stat label="Speed" val="900" unit="km/h" />
          </div>

          {/* Price */}
          <div className="card p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] to-transparent pointer-events-none" />
            <div className="flex items-center justify-between relative">
              <div>
                <p className="text-[11px] text-subtle uppercase tracking-wider mb-0.5">Estimated total</p>
                <CountUpPrice value={flightInfo.price} className="text-2xl font-bold text-accent" />
              </div>
              <div className="text-right space-y-0.5">
                <span className="inline-block text-[11px] text-muted px-2.5 py-1 rounded-md bg-surface-alt border border-border">Gulfstream G650</span>
                <p className="text-[10px] text-subtle">All-inclusive</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <p className="text-[11px] text-muted font-medium mb-2">Included amenities</p>
            <div className="flex flex-wrap gap-1.5">
              {["VIP Lounge", "Concierge", "Gourmet Catering", "Wi-Fi", "Ground Transport"].map((a) => (
                <span key={a} className="text-[11px] text-muted px-2.5 py-1 rounded-full border border-border bg-surface-alt hover:border-accent/20 hover:text-accent/80 transition-colors duration-200">{a}</span>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div key="e" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full">
          {/* Hero image */}
          <div className="relative h-44 rounded-xl overflow-hidden mb-5">
            <Image src={HERO_IMG} alt="Private jet lifestyle" fill className="object-cover" sizes="400px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c12] via-[#0b0c12]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-[10px] text-accent uppercase tracking-[0.2em] font-medium mb-1">Private Aviation</p>
              <p className="text-lg font-bold text-foreground leading-tight">Fly Beyond<br />First Class</p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center flex-1 justify-center">
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/[0.03] border border-accent/15 flex items-center justify-center mb-4">
              <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(201,165,90,0.08)]" />
              <svg className="w-6 h-6 text-accent/70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
            <p className="text-[15px] font-semibold text-foreground tracking-wide">Select your route</p>
            <p className="text-xs text-muted mt-1.5 max-w-[200px] leading-relaxed">Click a departure then a destination on the map</p>
            <div className="flex items-center gap-3 mt-5">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-accent/50" />
                <span className="text-[10px] text-subtle">300+ airports</span>
              </div>
              <div className="w-px h-3 bg-border" />
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-accent/30" />
                <span className="text-[10px] text-subtle">Worldwide</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({ label, val, unit }: { label: string; val: string; unit?: string }) {
  return (
    <div className="card p-3 text-center">
      <p className="text-[10px] text-subtle uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-[15px] font-semibold text-foreground">
        {val}{unit && <span className="text-[10px] font-normal text-subtle ml-0.5">{unit}</span>}
      </p>
    </div>
  );
}
