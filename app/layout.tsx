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
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://chai-ka-adda.vercel.app"),
  title: {
    default: "CHAI DA ADDA | Good Tea • Better Vibes",
    template: "%s | CHAI DA ADDA",
  },
  description:
    "Authentic Indian chai, crafted with warmth, tradition and a modern soul. Fresh ginger, cardamom, single-estate Assam tea, and unglazed Varanasi terracotta kulhads.",
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Chai Da Adda",
  },
  formatDetection: {
    telephone: false,
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
    url: "https://chai-ka-adda.vercel.app",
    siteName: "Chai Da Adda",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Chai Da Adda — Good Tea • Better Vibes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CHAI DA ADDA | Good Tea • Better Vibes",
    description: "Authentic Indian chai, crafted with warmth, tradition and a modern soul.",
    images: ["/logo.png"],
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
