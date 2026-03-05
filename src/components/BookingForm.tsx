"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { bookingSchema, BookingSchema } from "@/lib/schema";
import { FlightInfo } from "@/types";
import { formatDuration, formatDistance, formatPrice } from "@/lib/flight";

export default function BookingForm({ flightInfo }: { flightInfo: FlightInfo }) {
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { passengers: 1, specialRequests: "" },
  });

  const onSubmit = async (data: BookingSchema) => {
    await new Promise((r) => setTimeout(r, 1500));
    console.log("Booking:", { ...data, flight: flightInfo });
    setDone(true);
    setTimeout(() => { setDone(false); reset(); }, 5000);
  };

  const ok = flightInfo.departure && flightInfo.arrival;

  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div key="ok" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="text-sm font-semibold text-foreground">Booking Confirmed</p>
          <p className="text-xs text-muted mt-1 max-w-[220px]">Our concierge team will reach out within the hour.</p>
        </motion.div>
      ) : (
        <motion.form key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          {ok && (
            <div className="card p-3.5 flex items-center justify-between mb-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-glow via-transparent to-accent-glow pointer-events-none" />
              <div className="text-center flex-1 relative">
                <div className="text-base font-bold text-foreground tracking-wider">{flightInfo.departure!.code}</div>
                <div className="text-[10px] text-muted">{flightInfo.departure!.city}</div>
              </div>
              <svg className="w-3.5 h-3.5 text-accent -rotate-45 mx-2 shrink-0 relative" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></svg>
              <div className="text-center flex-1 relative">
                <div className="text-base font-bold text-foreground tracking-wider">{flightInfo.arrival!.code}</div>
                <div className="text-[10px] text-muted">{flightInfo.arrival!.city}</div>
              </div>
            </div>
          )}

          <Section>Passenger</Section>
          <div className="grid grid-cols-2 gap-2.5">
            <F l="First Name" e={errors.firstName?.message}><input {...register("firstName")} placeholder="James" className="form-input" /></F>
            <F l="Last Name" e={errors.lastName?.message}><input {...register("lastName")} placeholder="Bond" className="form-input" /></F>
          </div>
          <F l="Email" e={errors.email?.message}><input {...register("email")} type="email" placeholder="james@bond.com" className="form-input" /></F>
          <F l="Phone" e={errors.phone?.message}><input {...register("phone")} type="tel" placeholder="+44 20 7946 0958" className="form-input" /></F>

          <Section>Travel details</Section>
          <div className="grid grid-cols-2 gap-2.5">
            <F l="Passengers" e={errors.passengers?.message}><input {...register("passengers", { valueAsNumber: true })} type="number" min={1} max={18} placeholder="1" className="form-input" /></F>
            <F l="Date" e={errors.date?.message}><input {...register("date")} type="date" className="form-input" /></F>
          </div>
          <F l="Special Requests" e={errors.specialRequests?.message}><textarea {...register("specialRequests")} placeholder="Champagne, catering, transport..." rows={2} className="form-input resize-none" /></F>

          {ok && (
            <div className="flex items-center justify-between pt-1 pb-0.5 text-xs">
              <span className="text-muted">{formatDistance(flightInfo.distance)} km · {formatDuration(flightInfo.duration)}</span>
              <span className="font-semibold text-accent">{formatPrice(flightInfo.price)}</span>
            </div>
          )}

          <button type="submit" disabled={!ok || isSubmitting}
            className={`w-full h-10 rounded-xl text-[13px] font-semibold tracking-wide transition-all duration-300 cursor-pointer ${ok ? "bg-gradient-to-r from-accent to-[#b8943f] text-primary-fg hover:shadow-[0_0_24px_rgba(201,165,90,0.2)]" : "bg-surface-alt text-subtle cursor-not-allowed border border-border"}`}>
            {isSubmitting ? "Processing..." : ok ? "Confirm Booking" : "Select a route first"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2.5 pt-1"><span className="text-[11px] text-accent/60 font-medium uppercase tracking-wider">{children}</span><div className="flex-1 h-px bg-border" /></div>;
}

function F({ l, e, children }: { l: string; e?: string; children: React.ReactNode }) {
  return <div><label className="block text-[11px] text-muted mb-1">{l}</label>{children}{e && <p className="text-red-400 text-[11px] mt-0.5">{e}</p>}</div>;
}
