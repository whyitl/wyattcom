import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://wyattlain.com"; // Updated for SEO
const defaultDescription =
  "Finance-driven web developer in Calgary specializing in React, Next.js, and data-driven websites. Founder of TUCN Media. Fast, modern web solutions.";
const defaultKeywords =
  "Calgary web developer, React developer Calgary, web design Calgary, TUCN Media, Wyatt Lain";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Wyatt's Portfolio",
    template: "%s | Wyatt Lain",
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  authors: [{ name: "Wyatt Lain", url: baseUrl }],
  creator: "Wyatt Lain",
  publisher: "Wyatt Lain",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Wyatt Lain - Web Developer",
    title: "Calgary Web Developer | React & Modern Web Design - Wyatt Lain",
    description: defaultDescription,
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Wyatt Lain - Calgary Web Developer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calgary Web Developer | React & Modern Web Design - Wyatt Lain",
    description: defaultDescription,
    images: [`${baseUrl}/og-image.png`],
    creator: "@wyattlain",
  },
  icons: {
    icon: "/WyattFavicon.svg",
    shortcut: "/WyattFavicon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="canonical" href={baseUrl} />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Google Analytics 4 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
