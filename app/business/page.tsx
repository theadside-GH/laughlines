import Link from "next/link";
import { Building2 } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";

export const metadata = {
  title: "For Business | LaughLines",
  description: "LaughLines for Business — coming soon."
};

export default function BusinessPage() {
  return (
    <main className="page-shell">
      <PageTitle>For Business</PageTitle>
      <div className="form-column">
        <section className="panel confirm-panel">
          <Building2 size={32} aria-hidden="true" />
          <h2>Coming soon.</h2>
          <p className="muted">
            Team accounts, invoicing, and bulk comedy for companies are on the
            way. Nothing to see here just yet.
          </p>
          <Link className="button secondary" href="/">
            Back to the front door
          </Link>
        </section>
      </div>
    </main>
  );
}
