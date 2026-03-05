"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type NavSection = "fleet" | "destinations" | "services" | "contact" | null;

interface NavModalProps {
  section: NavSection;
  onClose: () => void;
}

export default function NavModal({ section, onClose }: NavModalProps) {
  return (
    <AnimatePresence>
      {section && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[900]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-[901] bg-[#0b0c12] border border-border rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent pointer-events-none" />

            <div className="h-14 px-6 flex items-center justify-between border-b border-border shrink-0 relative">
              <h2 className="text-sm font-semibold text-accent uppercase tracking-[0.2em]">
                {section === "fleet" && "Our Fleet"}
                {section === "destinations" && "Destinations"}
                {section === "services" && "Services"}
                {section === "contact" && "Contact"}
              </h2>
              <button onClick={onClose} className="w-8 h-8 rounded-lg bg-surface-alt border border-border flex items-center justify-center text-subtle hover:text-foreground hover:border-accent/30 transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 relative">
              {section === "fleet" && <FleetContent />}
              {section === "destinations" && <DestinationsContent />}
              {section === "services" && <ServicesContent />}
              {section === "contact" && <ContactContent />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Fleet ─────────────────────────────── */

const jets = [
  { name: "Gulfstream G650", range: "12,964 km", speed: "Mach 0.925", pax: "Up to 19", desc: "The flagship of long-range business aviation. Unmatched cabin comfort, transatlantic range, and best-in-class speed.", features: ["Full galley kitchen", "Private stateroom", "Satellite Wi-Fi", "14+ hour range"], img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=600&q=80" },
  { name: "Bombardier Global 7500", range: "14,260 km", speed: "Mach 0.925", pax: "Up to 19", desc: "The world's largest and longest-range business jet. Four living spaces and a dedicated crew suite.", features: ["4 living spaces", "Full-size kitchen", "Dedicated crew suite", "Ultra-quiet cabin"], img: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=600&q=80" },
  { name: "Dassault Falcon 8X", range: "11,945 km", speed: "Mach 0.90", pax: "Up to 16", desc: "French elegance meets engineering precision. Tri-engine reliability and exceptional short-field performance.", features: ["Tri-engine safety", "Short runway capable", "30+ cabin layouts", "Low emissions"], img: "https://images.unsplash.com/photo-1770334618960-d246fc142297?auto=format&fit=crop&w=600&q=80" },
  { name: "Cessna Citation Longitude", range: "6,482 km", speed: "Mach 0.84", pax: "Up to 12", desc: "The super-midsize leader. Perfect for transcontinental flights with the quietest cabin in its class.", features: ["Quietest cabin in class", "Flat floor throughout", "Full stand-up cabin", "Low operating costs"], img: "https://images.unsplash.com/photo-1759614581731-4c7090648de0?auto=format&fit=crop&w=600&q=80" },
  { name: "Embraer Praetor 600", range: "7,223 km", speed: "Mach 0.83", pax: "Up to 12", desc: "Brazilian craftsmanship at its finest. Best-in-class range and a full fly-by-wire experience.", features: ["Fly-by-wire", "Full wet galley", "Stone floor option", "ETOPs certified"], img: "https://images.unsplash.com/photo-1751378679009-d5a1a8a1f001?auto=format&fit=crop&w=600&q=80" },
  { name: "Pilatus PC-24", range: "3,610 km", speed: "815 km/h", pax: "Up to 11", desc: "The versatile super light jet. The only business jet that can operate from unpaved runways.", features: ["Unpaved runway capable", "Cargo door", "Versatile cabin", "Single pilot certified"], img: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?auto=format&fit=crop&w=600&q=80" },
];

function FleetContent() {
  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <div className="relative h-48 md:h-56 rounded-xl overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1504877497169-fe91a0b062dc?auto=format&fit=crop&w=1200&q=80" alt="Luxury jet interior" fill className="object-cover" sizes="(max-width: 768px) 100vw, 80vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c12]/90 via-[#0b0c12]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <p className="text-[10px] text-accent uppercase tracking-[0.25em] font-medium mb-2">World-Class Aircraft</p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">Curated for<br />Excellence</h3>
          <p className="text-sm text-muted/80 mt-2 max-w-md">From short regional hops to ultra-long-range intercontinental flights, every aircraft in our fleet is maintained to the highest standards.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {jets.map((jet) => (
          <div key={jet.name} className="card overflow-hidden hover:border-accent/20 transition-colors duration-300 group">
            <div className="relative h-40">
              <Image src={jet.img} alt={jet.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12131b] via-[#12131b]/30 to-transparent" />
              <div className="absolute top-3 right-3">
                <svg className="w-5 h-5 text-accent/40" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></svg>
              </div>
              <div className="absolute bottom-3 left-4">
                <h3 className="text-[15px] font-semibold text-foreground group-hover:text-accent transition-colors">{jet.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-muted leading-relaxed mb-3">{jet.desc}</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <StatMini label="Range" value={jet.range} />
                <StatMini label="Speed" value={jet.speed} />
                <StatMini label="Capacity" value={jet.pax} />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {jet.features.map((f) => (
                  <span key={f} className="text-[10px] text-subtle px-2 py-0.5 rounded-full border border-border bg-surface-alt">{f}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Destinations ──────────────────────── */

const regions = [
  { name: "Europe", cities: ["Paris", "London", "Nice", "Geneva", "Zurich", "Milan", "Rome", "Barcelona", "Madrid", "Munich", "Vienna", "Mykonos", "Monaco"], count: 85, img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" },
  { name: "Middle East", cities: ["Dubai", "Abu Dhabi", "Riyadh", "Jeddah", "Doha", "Bahrain", "Kuwait", "Muscat"], count: 24, img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80" },
  { name: "Africa", cities: ["Casablanca", "Marrakech", "Cape Town", "Johannesburg", "Nairobi", "Lagos", "Accra", "Dakar"], count: 35, img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=600&q=80" },
  { name: "Americas", cities: ["New York", "Miami", "Los Angeles", "Aspen", "Teterboro", "São Paulo", "Mexico City", "Toronto"], count: 62, img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=600&q=80" },
  { name: "Asia & Pacific", cities: ["Tokyo", "Singapore", "Hong Kong", "Shanghai", "Sydney", "Bali", "Male", "Mumbai"], count: 48, img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80" },
];

const popular = [
  { from: "Paris", to: "London", duration: "1h 10min", price: "$12,400" },
  { from: "New York", to: "Miami", duration: "2h 50min", price: "$28,500" },
  { from: "Dubai", to: "London", duration: "7h 15min", price: "$95,000" },
  { from: "Paris", to: "Geneva", duration: "55min", price: "$9,800" },
  { from: "London", to: "Nice", duration: "1h 55min", price: "$18,200" },
  { from: "Milan", to: "Ibiza", duration: "1h 40min", price: "$15,600" },
];

function DestinationsContent() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative h-48 md:h-56 rounded-xl overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=1200&q=80" alt="Aerial view" fill className="object-cover" sizes="(max-width: 768px) 100vw, 80vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c12]/90 via-[#0b0c12]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <p className="text-[10px] text-accent uppercase tracking-[0.25em] font-medium mb-2">Global Network</p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">300+ Airports<br />Worldwide</h3>
          <p className="text-sm text-muted/80 mt-2 max-w-md">From major international hubs to exclusive private terminals, we connect you to the world.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {regions.map((r) => (
          <div key={r.name} className="card overflow-hidden hover:border-accent/20 transition-colors duration-300 group">
            <div className="relative h-36">
              <Image src={r.img} alt={r.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12131b] via-[#12131b]/40 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <h3 className="text-[15px] font-semibold text-foreground">{r.name}</h3>
                <span className="text-[11px] text-accent font-medium">{r.count} airports</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-1.5">
                {r.cities.map((c) => (
                  <span key={c} className="text-[11px] text-muted px-2.5 py-1 rounded-full border border-border bg-surface-alt">{c}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xs text-accent/60 font-medium uppercase tracking-wider mb-4">Popular Routes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {popular.map((r) => (
            <div key={`${r.from}-${r.to}`} className="card px-4 py-3 flex items-center justify-between hover:border-accent/20 transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{r.from}</span>
                <svg className="w-3 h-3 text-accent/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                <span className="text-sm font-semibold text-foreground">{r.to}</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-muted block">{r.duration}</span>
                <span className="text-xs font-semibold text-accent">{r.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Services ──────────────────────────── */

const services = [
  { icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z", title: "VIP Lounge Access", desc: "Skip the crowds with exclusive access to private terminals and VIP lounges at every departure and arrival airport.", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=400&q=80" },
  { icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z", title: "Personal Concierge", desc: "A dedicated concierge available 24/7 to handle every detail of your journey, from dining reservations to ground transport.", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80" },
  { icon: "M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z", title: "Gourmet Catering", desc: "World-class cuisine prepared by Michelin-star chefs. Customize your menu with fine dining and premium beverages.", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80" },
  { icon: "M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z", title: "In-Flight Wi-Fi", desc: "Stay connected at 45,000 feet with high-speed satellite internet. Stream, video call, and work without interruption.", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80" },
  { icon: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z", title: "Ground Transport", desc: "Luxury vehicles waiting at every destination. From Rolls-Royce to armored SUVs, arrive in style from door to door.", img: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=400&q=80" },
  { icon: "M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z", title: "Custom Itineraries", desc: "Multi-leg journeys, same-day returns, one-way flights — we build the perfect itinerary around your schedule.", img: "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=400&q=80" },
];

function ServicesContent() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative h-48 md:h-56 rounded-xl overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80" alt="Luxury service" fill className="object-cover" sizes="(max-width: 768px) 100vw, 80vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c12]/90 via-[#0b0c12]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <p className="text-[10px] text-accent uppercase tracking-[0.25em] font-medium mb-2">All-Inclusive</p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">White Glove<br />Service</h3>
          <p className="text-sm text-muted/80 mt-2 max-w-md">Every flight is a complete luxury experience. Our services ensure you never have to think about the details.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {services.map((s) => (
          <div key={s.title} className="card overflow-hidden hover:border-accent/20 transition-colors duration-300 group">
            <div className="relative h-36">
              <Image src={s.img} alt={s.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12131b] via-[#12131b]/40 to-transparent" />
              <div className="absolute top-3 left-3">
                <div className="w-9 h-9 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
                  <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 24 24"><path d={s.icon} /></svg>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-[15px] font-semibold text-foreground mb-1.5 group-hover:text-accent transition-colors">{s.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Contact ───────────────────────────── */

function ContactContent() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Hero */}
      <div className="relative h-44 md:h-52 rounded-xl overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1200&q=80" alt="Contact" fill className="object-cover" sizes="(max-width: 768px) 100vw, 60vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c12]/90 via-[#0b0c12]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <p className="text-[10px] text-accent uppercase tracking-[0.25em] font-medium mb-2">24/7 Support</p>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">Get in Touch</h3>
          <p className="text-sm text-muted/80 mt-2">Available around the clock for inquiries, bookings, and support.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-accent/70" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Phone</h3>
          <p className="text-accent text-sm font-medium">+1 (888) 555-JETS</p>
          <p className="text-[11px] text-subtle mt-1">24/7 — Instant response</p>
        </div>

        <div className="card p-5">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-accent/70" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Email</h3>
          <p className="text-accent text-sm font-medium">charter@privatejet.com</p>
          <p className="text-[11px] text-subtle mt-1">Response within 30 minutes</p>
        </div>

        <div className="card p-5">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-accent/70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Headquarters</h3>
          <p className="text-muted text-sm">Aéroport du Bourget</p>
          <p className="text-[11px] text-subtle mt-1">Paris, France</p>
        </div>

        <div className="card p-5">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/15 flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-accent/70" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Hours</h3>
          <p className="text-muted text-sm">24/7 Operations</p>
          <p className="text-[11px] text-subtle mt-1">365 days a year</p>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-xs text-accent/60 font-medium uppercase tracking-wider mb-4">Send us a message</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="Your Name" className="form-input" />
            <input type="email" placeholder="Email" className="form-input" />
          </div>
          <input type="text" placeholder="Subject" className="form-input" />
          <textarea placeholder="Your message..." rows={4} className="form-input resize-none" />
          <button className="h-10 px-6 rounded-xl bg-gradient-to-r from-accent to-[#b8943f] text-primary-fg text-[13px] font-semibold tracking-wide hover:shadow-[0_0_24px_rgba(201,165,90,0.2)] transition-all duration-300 cursor-pointer">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

function StatMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-[9px] text-subtle uppercase tracking-wider">{label}</p>
      <p className="text-[11px] font-semibold text-foreground mt-0.5">{value}</p>
    </div>
  );
}

export type { NavSection };
