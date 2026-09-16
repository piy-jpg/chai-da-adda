"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cartContext";
import { X, Calendar, Clock, Users, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export function ReservationModal() {
  const { isReservationOpen, setIsReservationOpen } = useCart();

  const [location, setLocation] = useState("delhi-cp");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("17:00 (Sunset Baithak)");
  const [guests, setGuests] = useState("2 Guests");
  const [seating, setSeating] = useState("Heritage Baithak");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = "BK-" + Math.floor(10000 + Math.random() * 90000);
    setBookingRef(refId);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 },
        colors: ["#F59E0B", "#D4AF37", "#9A3412"],
      });
    } catch {
      // ignore
    }
  };

  const handleClose = () => {
    setIsReservationOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isReservationOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="pointer-events-auto w-full max-w-lg glass-panel-gold rounded-3xl border border-amber-500/30 p-6 sm:p-8 bg-obsidian/95 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 p-2 rounded-xl glass-panel text-neutral-400 hover:text-amber-200"
              >
                <X className="w-4 h-4" />
              </button>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                    Table Reserved Successfully
                  </span>
                  <h3 className="text-2xl font-serif text-amber-100 mt-1 mb-2">
                    Booking #{bookingRef}
                  </h3>
                  <p className="text-xs text-amber-200/80 mb-6 leading-relaxed max-w-sm mx-auto">
                    We look forward to welcoming you, <span className="font-semibold text-amber-100">{name || "Chai Connoisseur"}</span>. Fresh Varanasi kulhads and brass handi tea will be simmered upon your arrival.
                  </p>

                  <div className="glass-panel p-4 rounded-2xl border-amber-500/20 text-xs text-left text-neutral-300 mb-6 space-y-1.5">
                    <div><span className="text-amber-400">Location:</span> {location === "delhi-cp" ? "Connaught Place, New Delhi" : location === "mumbai-bandra" ? "Bandra West, Mumbai" : "Indiranagar, Bengaluru"}</div>
                    <div><span className="text-amber-400">Time & Date:</span> {timeSlot} {date ? `• ${date}` : ""}</div>
                    <div><span className="text-amber-400">Party Size:</span> {guests} ({seating})</div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="px-8 py-3 rounded-full bg-amber-500 text-black font-semibold text-xs hover:bg-amber-400"
                  >
                    Close & See You at the Adda
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-semibold uppercase tracking-wider mb-2">
                      <Sparkles className="w-3 h-3" />
                      Table & Tasting Experience
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-amber-100">
                      Reserve an Adda Table
                    </h3>
                    <p className="text-xs text-amber-200/70 font-sans">
                      Complimentary welcome kulhad shot with every table reservation.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    {/* Location */}
                    <div>
                      <label className="block text-amber-300/80 font-medium mb-1.5">
                        Select Flagship Adda
                      </label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-3 rounded-xl bg-neutral-900 border border-amber-500/20 text-amber-100 focus:outline-none focus:border-amber-400"
                      >
                        <option value="delhi-cp">New Delhi • Connaught Place Heritage Adda</option>
                        <option value="mumbai-bandra">Mumbai • Bandra West Sea Breeze Adda</option>
                        <option value="blr-indiranagar">Bengaluru • Indiranagar Botanical Adda</option>
                      </select>
                    </div>

                    {/* Date & Guests */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-amber-300/80 font-medium mb-1.5">
                          Date
                        </label>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full p-3 rounded-xl bg-neutral-900 border border-amber-500/20 text-amber-100 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-amber-300/80 font-medium mb-1.5">
                          Party Size
                        </label>
                        <select
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className="w-full p-3 rounded-xl bg-neutral-900 border border-amber-500/20 text-amber-100 focus:outline-none focus:border-amber-400"
                        >
                          <option value="1 Guest">1 Guest</option>
                          <option value="2 Guests">2 Guests (Couple)</option>
                          <option value="4 Guests">4 Guests (Adda Baithak)</option>
                          <option value="6 Guests">6 Guests (Chai Party)</option>
                          <option value="8+ Guests">8+ Guests (Celebration)</option>
                        </select>
                      </div>
                    </div>

                    {/* Time Slot & Seating */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-amber-300/80 font-medium mb-1.5">
                          Preferred Time Slot
                        </label>
                        <select
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="w-full p-3 rounded-xl bg-neutral-900 border border-amber-500/20 text-amber-100 focus:outline-none focus:border-amber-400"
                        >
                          <option value="07:30 (Morning Dawn Chai)">07:30 (Morning Dawn)</option>
                          <option value="11:00 (Mid-Day Focus)">11:00 (Mid-Day Focus)</option>
                          <option value="17:00 (Sunset Baithak)">17:00 (Sunset Baithak)</option>
                          <option value="20:30 (Dinner & Dessert)">20:30 (Dinner & Dessert)</option>
                          <option value="23:30 (Midnight Adda)">23:30 (Midnight Adda)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-amber-300/80 font-medium mb-1.5">
                          Seating Ambience
                        </label>
                        <select
                          value={seating}
                          onChange={(e) => setSeating(e.target.value)}
                          className="w-full p-3 rounded-xl bg-neutral-900 border border-amber-500/20 text-amber-100 focus:outline-none focus:border-amber-400"
                        >
                          <option value="Heritage Baithak">Heritage Baithak (Floor)</option>
                          <option value="Courtyard Clay Table">Courtyard Open Table</option>
                          <option value="Live Handi Counter">Live Handi Counter View</option>
                        </select>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-amber-300/80 font-medium mb-1.5">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Raghav Sharma"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full p-3 rounded-xl bg-neutral-900 border border-amber-500/20 text-amber-100 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-amber-300/80 font-medium mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full p-3 rounded-xl bg-neutral-900 border border-amber-500/20 text-amber-100 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-semibold text-sm flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform active:scale-95 shadow-xl"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Confirm Adda Table Reservation</span>
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
