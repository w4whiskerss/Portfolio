import type { Metadata } from "next";
import { Geist, Geist_Mono, Monoton } from "next/font/google";
import Script from "next/script";
import TerminalLoader from "@/components/TerminalLoader";
import ParticleBackground from "@/components/ParticleBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const brandDisplay = Monoton({
  variable: "--font-brand-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://w4whiskers.vercel.app"),
  title: {
    default: "W4Whiskers",
    template: "%s | W4Whiskers",
  },
  description:
    "Personal portfolio for W4Whiskers featuring frontend projects, UI experiments, Minecraft work, and live creator links.",
  applicationName: "W4Whiskers",
  keywords: [
    "W4Whiskers",
    "portfolio",
    "frontend developer",
    "Next.js",
    "Minecraft mods",
    "UI experiments",
  ],
  authors: [{ name: "W4Whiskers" }],
  creator: "W4Whiskers",
  publisher: "W4Whiskers",
  verification: {
    google: "xkA7CZ8AABLEoqHnx5ewqjOXu6WMgmoeu4hF12HClPo",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/logo2.png", type: "image/png" },
    ],
    shortcut: "/logo2.png",
    apple: "/logo2.png",
  },
  openGraph: {
    title: "W4Whiskers",
    description:
      "Frontend developer portfolio with web projects, creator links, and a custom interactive design.",
    url: "https://w4whiskers.vercel.app",
    siteName: "W4Whiskers",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "W4Whiskers portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "W4Whiskers",
    description:
      "Frontend developer portfolio with web projects, creator links, and a custom interactive design.",
    images: ["/preview.png"],
  },
};

const themeBootstrapScript = `
  try {
    var savedTheme = localStorage.getItem("w4whiskers-page-theme");
    document.documentElement.dataset.theme = savedTheme === "light" ? "light" : "dark";
  } catch (error) {
    document.documentElement.dataset.theme = "dark";
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${brandDisplay.variable} relative min-h-screen isolate antialiased`}
      >
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeBootstrapScript}
        </Script>
        <div className="fixed inset-0 z-0">
          <ParticleBackground />
        </div>
        <TerminalLoader />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
