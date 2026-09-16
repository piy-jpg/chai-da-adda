import type { Metadata, Viewport } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FloatingContact } from "@/components/FloatingContact";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0D0806",
};

export const metadata: Metadata = {
  title: "CHAI KA ADDA | More Than Chai. It's An Experience.",
  description:
    "Authentic Indian chai, crafted with warmth, tradition and a modern soul. Fresh ginger, cardamom, single-estate Assam tea, and unglazed Varanasi terracotta kulhads.",
  keywords: [
    "Chai Ka Adda",
    "Indian Chai Brand",
    "Masala Chai",
    "Adrak Chai",
    "Elaichi Chai",
    "Kesar Chai",
    "Kulhad Chai",
    "Indian Cafe",
  ],
  authors: [{ name: "Chai Ka Adda" }],
  openGraph: {
    title: "CHAI KA ADDA | More Than Chai. It's An Experience.",
    description:
      "Authentic Indian chai, crafted with warmth, tradition and a modern soul.",
    siteName: "Chai Ka Adda",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${jakarta.variable}`}
    >
      <body className="min-h-screen bg-[#0D0806] text-[#FBF6EE] font-sans antialiased overflow-x-hidden selection:bg-[#C69247] selection:text-[#0D0806]">
        <SmoothScroll>{children}</SmoothScroll>
        <FloatingContact />
      </body>
    </html>
  );
}
