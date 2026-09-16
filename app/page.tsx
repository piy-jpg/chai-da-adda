"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BrandStory } from "@/components/BrandStory";
import { ChaiProducts } from "@/components/ChaiProducts";
import { Experience } from "@/components/Experience";
import { WhyChai } from "@/components/WhyChai";
import { CinematicSection } from "@/components/CinematicSection";
import { Testimonials } from "@/components/Testimonials";
import { VisitUs } from "@/components/VisitUs";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0D0806] text-[#FBF6EE] overflow-x-hidden selection:bg-[#C69247] selection:text-[#0D0806]">
      {/* Top Fixed Navbar */}
      <Navbar />

      {/* Section 1: Hero Video (public/videos/chai-ka-adda.mp4) */}
      <Hero />

      {/* Section 2: Our Story */}
      <BrandStory />

      {/* Section 3: Signature Chai (Masala, Adrak, Elaichi, Kesar) */}
      <ChaiProducts />

      {/* Section 4: The Adda Experience */}
      <Experience />

      {/* Section 5: Why Chai Ka Adda */}
      <WhyChai />

      {/* Section 6: Cinematic Break ("Ek Cup Chai. Hazaar Kahaniyan.") */}
      <CinematicSection />

      {/* Section 7: Testimonials */}
      <Testimonials />

      {/* Section 9: Visit The Adda (Directions + WhatsApp CTA) */}
      <VisitUs />

      {/* Section 10: Footer */}
      <Footer />
    </main>
  );
}
