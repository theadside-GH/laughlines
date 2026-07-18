import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://laughlines.vercel.app"),
  title: "LaughLines | comedy delivered",
  description:
    "Hire vetted comedians to write custom jokes or perform a tailored comedy video for your speech, toast, party, or event.",
  openGraph: {
    title: "LaughLines — comedy delivered",
    description:
      "Hire vetted comedians to write custom jokes or perform a tailored comedy video for your speech, toast, party, or event.",
    url: "https://laughlines.vercel.app",
    siteName: "LaughLines",
    type: "website",
    images: [{ url: "/og.jpg", width: 1206, height: 736, alt: "LaughLines — comedy delivered" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "LaughLines — comedy delivered",
    description: "Custom jokes and comedy videos from vetted comedians.",
    images: ["/og.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
