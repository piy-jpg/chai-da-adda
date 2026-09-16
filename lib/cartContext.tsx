"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "./data";

export interface CartItem {
  item: MenuItem;
  quantity: number;
  customization?: {
    sweetness?: string;
    milk?: string;
    temperature?: string;
  };
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (item: MenuItem, customization?: CartItem["customization"]) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  finalTotal: number;
  promoCode: string;
  appliedPromo: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  isQuickViewOpen: boolean;
  quickViewItem: MenuItem | null;
  openQuickView: (item: MenuItem) => void;
  closeQuickView: () => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  
  // Quick View Modal
  const [quickViewItem, setQuickViewItem] = useState<MenuItem | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Reservation Modal
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  // Load cart from local storage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("chai_ka_adda_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem("chai_ka_adda_cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = (item: MenuItem, customization?: CartItem["customization"]) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.item.id === item.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += 1;
        return next;
      }
      return [...prev, { item, quantity: 1, customization }];
    });
    setIsOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.item.id === itemId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const applyPromo = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === "ADDAFIRST" || clean === "ADDACHAI" || clean === "ROYAL20") {
      setAppliedPromo(clean);
      return true;
    }
    return false;
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const openQuickView = (item: MenuItem) => {
    setQuickViewItem(item);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewItem(null);
  };

  const totalCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce((acc, i) => acc + i.item.price * i.quantity, 0);
  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const discount = appliedPromo === "ADDAFIRST" ? Math.round(subtotal * 0.2) : appliedPromo ? 50 : 0;
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        discount,
        deliveryFee,
        finalTotal,
        promoCode,
        appliedPromo,
        applyPromo,
        removePromo,
        isQuickViewOpen,
        quickViewItem,
        openQuickView,
        closeQuickView,
        isReservationOpen,
        setIsReservationOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
