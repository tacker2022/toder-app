import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: {
    default: "TODER Project | Sektörel Yenilik ve İşbirliği",
    template: "%s | TODER Project",
  },
  description: "TODER Project - Sektörel Yenilik, İşbirliği ve Dijital Dönüşüm Platformu. Otomotiv ve mobilite sektöründe geleceği şekillendiriyoruz.",
  keywords: ["TODER", "Otomotiv", "Dernek", "Sivil Toplum", "Yenilik", "İşbirliği", "Dijital Dönüşüm", "Mobilite", "Türkiye"],
  authors: [{ name: "TODER Project" }],
  creator: "TODER Project",
  publisher: "TODER Project",
  metadataBase: new URL("https://toder.net"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TODER Project | Sektörel Yenilik ve İşbirliği",
    description: "TODER Project - Sektörel Yenilik, İşbirliği ve Dijital Dönüşüm Platformu.",
    url: "https://toder.net",
    siteName: "TODER Project",
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/og-image.png", // We might need to create this or use a default one
        width: 1200,
        height: 630,
        alt: "TODER Project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TODER Project | Sektörel Yenilik ve İşbirliği",
    description: "TODER Project - Sektörel Yenilik, İşbirliği ve Dijital Dönüşüm Platformu.",
    images: ["/og-image.png"], // Same here
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "TODER Project",
              url: "https://toder.net",
              logo: "https://toder.net/logo.png", // Assuming a logo exists or will exist
              sameAs: [
                "https://twitter.com/toderproject",
                "https://instagram.com/toderproject",
                "https://linkedin.com/company/toderproject",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+90-555-555-5555",
                contactType: "customer service",
                areaServed: "TR",
                availableLanguage: "Turkish",
              },
            }),
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YZ2TXWFEV0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-YZ2TXWFEV0');
          `}
        </Script>
      </body>
    </html>
  );
}
