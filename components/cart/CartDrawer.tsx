"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles, Tag, ArrowRight, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    discount,
    deliveryFee,
    finalTotal,
    appliedPromo,
    applyPromo,
    removePromo,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = applyPromo(promoInput);
    if (!success) {
      setPromoError(true);
      setTimeout(() => setPromoError(false), 3000);
    } else {
      setPromoInput("");
      setPromoError(false);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      const randomId = "ADDA-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(randomId);
      setOrderComplete(true);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#F59E0B", "#D4AF37", "#9A3412", "#FFF0D0"],
        });
      } catch {
        // ignore
      }
    }, 1200);
  };

  const resetAndClose = () => {
    setOrderComplete(false);
    clearCart();
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-obsidian-light border-l border-amber-500/20 flex flex-col justify-between shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-amber-500/15 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif text-lg font-bold text-amber-100">
                  Your Adda Bag
                </h3>
                {items.length > 0 && (
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                    {items.reduce((a, b) => a + b.quantity, 0)} items
                  </span>
                )}
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl glass-panel text-neutral-400 hover:text-amber-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {orderComplete ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10 px-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-4 text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1">
                    Order Dispatched To Brass Handi
                  </span>
                  <h3 className="text-2xl font-serif text-amber-100 mb-2">
                    Order #{orderId}
                  </h3>
                  <p className="text-xs text-amber-200/70 mb-6 max-w-xs leading-relaxed">
                    Your chai is being freshly brewed on slow dum in our brass urn. Varanasi clay kulhads are being prepared!
                  </p>
                  <button
                    onClick={resetAndClose}
                    className="px-6 py-3 rounded-full bg-amber-500 text-black font-semibold text-xs hover:bg-amber-400"
                  >
                    Done & Back to Adda
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-neutral-400">
                  <div className="w-16 h-16 rounded-full glass-panel border-amber-500/20 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-neutral-600" />
                  </div>
                  <h4 className="text-lg font-serif text-amber-200 mb-1">
                    Your Bag is Empty
                  </h4>
                  <p className="text-xs text-neutral-500 mb-6 max-w-xs">
                    Explore our signature brass handi brews or authentic street-style bun maska.
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30 hover:bg-amber-500/30"
                  >
                    Explore Flavors
                  </button>
                </div>
              ) : (
                items.map(({ item, quantity, customization }) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl glass-panel border-amber-500/15 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-serif font-bold text-amber-100 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-amber-400/70 font-mono">
                        ₹{item.price} each
                      </p>
                      {customization && (
                        <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                          {customization.milk} • {customization.sweetness}
                        </p>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-xl border border-amber-500/20">
                        <button
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                          className="p-1 text-neutral-400 hover:text-amber-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-amber-100 px-1">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, quantity + 1)}
                          className="p-1 text-neutral-400 hover:text-amber-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer (Checkout Details) */}
            {items.length > 0 && !orderComplete && (
              <div className="p-5 border-t border-amber-500/15 bg-black/60 space-y-4">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-400/60" />
                    <input
                      type="text"
                      placeholder="Use code ADDAFIRST"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-900 border border-amber-500/20 text-xs text-amber-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-semibold hover:bg-amber-500/30 border border-amber-500/30"
                  >
                    Apply
                  </button>
                </form>

                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs bg-emerald-950/40 border border-emerald-500/30 p-2 rounded-xl text-emerald-300">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Code {appliedPromo} Applied!
                    </span>
                    <button
                      onClick={removePromo}
                      className="text-[10px] text-neutral-400 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {promoError && (
                  <p className="text-[11px] text-red-400">
                    Invalid code. Try "ADDAFIRST" for 20% off.
                  </p>
                )}

                {/* Subtotals */}
                <div className="space-y-1.5 text-xs text-neutral-300">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono">₹{subtotal}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Royal Discount</span>
                      <span className="font-mono">-₹{discount}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery (Free over ₹499)</span>
                    <span className="font-mono">
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-serif font-bold text-amber-100 pt-2 border-t border-amber-500/10">
                    <span>Grand Total</span>
                    <span className="text-gold-gradient text-base font-mono">
                      ₹{finalTotal}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-semibold text-sm flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform active:scale-95 shadow-xl disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Brewing Your Order...
                    </span>
                  ) : (
                    <>
                      <span>Proceed to Royal Checkout</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
