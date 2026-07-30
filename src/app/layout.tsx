import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { Staatliches, Stint_Ultra_Condensed, Noto_Serif_Devanagari, Instrument_Serif } from "next/font/google";

const clashGrotesk = localFont({
  src: "../../public/fonts/ClashGrotesk-Variable.ttf",
  variable: "--font-clash-grotesk",
});

const staatliches = Staatliches({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-staatliches",
});

const stintUltraCondensed = Stint_Ultra_Condensed({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-stint-ultra-condensed",
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  weight: "500",
  subsets: ["devanagari", "latin"],
  variable: "--font-noto-serif-devanagari",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Kalpesh Prajapati | MERN Stack Developer & React.js Specialist",
  description: "Results-driven MERN Stack Developer specializing in React.js, Next.js, Node.js, Express.js, MongoDB, RESTful APIs, and frontend performance optimization.",
  icons: {
    icon: "/assets/favicon.jpg",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kalpesh Prajapati",
              "alternateName": "kalpesh.dev",
              "url": "https://kalpesh-prajapati.dev",
              "jobTitle": "MERN Stack Developer & React.js Specialist",
              "email": "kalpeshprajapti.dev@gmail.com",
              "telephone": "+91 9427144690",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ahmedabad",
                "addressCountry": "India"
              },
              "sameAs": [
                "https://www.linkedin.com/in/prajapati-kalpesh-it/",
                "https://github.com/kalpesh9427"
              ]
            }),
          }}
        />
      </head>
      <body
        className={`${clashGrotesk.variable} ${staatliches.variable} ${stintUltraCondensed.variable} ${notoSerifDevanagari.variable} ${instrumentSerif.variable} antialiased`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
