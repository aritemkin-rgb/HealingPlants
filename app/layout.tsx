import type { Metadata } from "next";
import localFont from "next/font/local";
import { GuideBubbleHost } from "@/components/GuideBubbleHost";
import { GuideProvider } from "@/components/GuideProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WelcomeIntro } from "@/components/WelcomeIntro";
import "./globals.css";

const acumin = localFont({
  src: "./fonts/AcuminVariableConcept.otf",
  variable: "--font-acumin",
  display: "swap",
  weight: "100 900",
});

const roundedSans = localFont({
  src: "./fonts/rounded_sans_serif_7.ttf",
  variable: "--font-rounded",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Healing Plants of the World",
    template: "%s · Healing Plants of the World",
  },
  description:
    "An interactive guided platform for plant discovery. Browse the Healing Guide, Plant Library, and Marketplace — with Prairie Sage as an optional helper.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${acumin.variable} ${roundedSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-[var(--ink)]">
        <GuideProvider>
          <WelcomeIntro />
          <SiteHeader />
          <main className="relative z-10 flex-1 bg-white">{children}</main>
          <SiteFooter />
          <GuideBubbleHost />
        </GuideProvider>
      </body>
    </html>
  );
}
