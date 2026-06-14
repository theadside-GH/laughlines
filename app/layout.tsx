import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Menu, Search, UserRound } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "LaughLines | comedy delivered",
  description:
    "Hire vetted comedians to write custom jokes or perform a tailored comedy video for your speech, toast, party, or event."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand-mark" href="/" aria-label="LaughLines home">
            <img src="/laughlines-logo-icon.jpg" alt="" className="brand-logo" />
            <span>
              <strong>LAUGHLINES</strong>
              <small>COMEDY DELIVERED</small>
            </span>
          </Link>
          <nav aria-label="Main navigation">
            <Link href="/comedians">Comedians</Link>
            <Link href="/dashboard">My orders</Link>
            <Link href="/comic/dashboard">For comics</Link>
            <Link href="/admin">Admin</Link>
          </nav>
          <div className="header-actions">
            <Link className="icon-button" href="/comedians" aria-label="Search comedians">
              <Search size={18} aria-hidden="true" />
            </Link>
            <Link className="icon-button" href="/dashboard" aria-label="Open account">
              <UserRound size={18} aria-hidden="true" />
            </Link>
            <button className="icon-button menu-only" aria-label="Open menu">
              <Menu size={18} aria-hidden="true" />
            </button>
            <Link className="button primary compact" href="/comedians">
              Book a comic
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div>
            <strong>LaughLines</strong>
            <span>comedy delivered</span>
          </div>
          <div className="footer-links">
            <Link href="/comedians">Browse</Link>
            <Link href="/comic/dashboard">Comic portal</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
