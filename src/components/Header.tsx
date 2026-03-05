"use client";

import type { NavSection } from "./NavModal";

interface HeaderProps {
  onNavClick: (section: NavSection) => void;
  onBookClick: () => void;
}

export default function Header({ onNavClick, onBookClick }: HeaderProps) {
  const items: { label: string; section: NavSection }[] = [
    { label: "Fleet", section: "fleet" },
    { label: "Destinations", section: "destinations" },
    { label: "Services", section: "services" },
    { label: "Contact", section: "contact" },
  ];

  return (
    <header className="h-14 px-5 md:px-8 flex items-center justify-between bg-background/80 backdrop-blur-xl border-b border-border shrink-0 relative z-50">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-glow via-transparent to-transparent pointer-events-none" />

      <div className="flex items-center gap-2.5 relative">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-[#a88940] flex items-center justify-center shadow-[0_0_16px_rgba(201,165,90,0.15)]">
          <svg className="w-4 h-4 text-primary-fg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-foreground tracking-[0.15em]">PRIVATE JET</span>
      </div>

      <nav className="hidden md:flex items-center gap-6 relative">
        {items.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavClick(item.section)}
            className="text-[13px] text-subtle hover:text-accent transition-colors duration-200 cursor-pointer bg-transparent border-none"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={onBookClick}
        className="relative h-8 px-5 rounded-lg bg-gradient-to-r from-accent to-[#b8943f] text-primary-fg text-xs font-semibold tracking-wide hover:shadow-[0_0_20px_rgba(201,165,90,0.25)] transition-all duration-300 cursor-pointer"
      >
        Book a Flight
      </button>
    </header>
  );
}
