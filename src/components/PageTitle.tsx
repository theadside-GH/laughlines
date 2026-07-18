import Link from "next/link";

// The red eyebrow at the top of every page doubles as the page title and
// links back to the home screen.
export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <Link className="eyebrow eyebrow-home" href="/">
      {children}
    </Link>
  );
}
