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
  metadataBase: new URL("https://chai-da-adda.vercel.app"),
  title: "CHAI DA ADDA | Good Tea • Better Vibes",
  description:
    "Authentic Indian chai, crafted with warmth, tradition and a modern soul. Fresh ginger, cardamom, single-estate Assam tea, and unglazed Varanasi terracotta kulhads.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    "Chai Da Adda",
    "Chai Ka Adda",
    "Indian Chai Brand",
    "Masala Chai",
    "Adrak Chai",
    "Elaichi Chai",
    "Kesar Chai",
    "Kulhad Chai",
    "Indian Cafe",
  ],
  authors: [{ name: "Chai Da Adda" }],
  openGraph: {
    title: "CHAI DA ADDA | Good Tea • Better Vibes",
    description:
      "Authentic Indian chai, crafted with warmth, tradition and a modern soul.",
    siteName: "Chai Da Adda",
    locale: "en_IN",
    type: "website",
    images: ["/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Chai Da Adda",
  image: "https://chai-da-adda.vercel.app/logo.png",
  telephone: "+91-7300212948",
  servesCuisine: "Indian Chai & Tea Specialities",
  priceRange: "₹100 - ₹250",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Heritage Ghat Road, Assi Ghat Corridor",
    addressLocality: "Varanasi",
    addressRegion: "Uttar Pradesh",
    postalCode: "221005",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:00",
      closes: "02:00",
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#0D0806] text-[#FBF6EE] font-sans antialiased overflow-x-hidden selection:bg-[#C69247] selection:text-[#0D0806]">
        <SmoothScroll>{children}</SmoothScroll>
        <FloatingContact />
      </body>
    </html>
  );
}
