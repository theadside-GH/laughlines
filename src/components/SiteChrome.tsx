"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The landing page ("/") is a full-screen immersive door, so we hide the
// standard header/footer there. Every other page gets the simple chrome.
export function SiteHeader() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-mark" href="/" aria-label="LaughLines home">
          <span className="brand-logo">
            <img src="/laughlines-logo-icon.jpg" alt="" />
          </span>
          <span>
            <strong>LAUGHLINES</strong>
            <small>COMEDY DELIVERED</small>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/comedians">Comedians</Link>
          <Link href="/top-20">Top 20</Link>
          <Link href="/join">Join</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link href="/" className="footer-brand">
          <strong>LaughLines</strong>
          <span>comedy delivered</span>
        </Link>
        <div className="footer-links">
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
