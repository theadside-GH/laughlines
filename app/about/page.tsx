import Link from "next/link";
import { ArrowRight, PenLine, ShieldCheck, Sparkles } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";

export const metadata = {
  title: "100% Original | LaughLines",
  description: "About LaughLines — original comedy, written by real comics, made just for you."
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <PageTitle>100% Original</PageTitle>
      <p className="section-intro dark">
        LaughLines connects you with vetted comedians who write and perform
        comedy built for your exact moment. No recycled bits, no AI-generated
        filler — every line is written fresh by a real comic for your person,
        room, or occasion.
      </p>

      <div className="grid three" style={{ marginTop: 30 }}>
        <article className="sample-card">
          <PenLine size={26} aria-hidden="true" />
          <h3>Written from scratch</h3>
          <p className="muted">
            Every order starts from your details. Comics write original material
            for your speech, roast, or event — never copy-pasted.
          </p>
        </article>
        <article className="sample-card">
          <ShieldCheck size={26} aria-hidden="true" />
          <h3>Vetted talent</h3>
          <p className="muted">
            Comics are reviewed before they join, so you&apos;re hiring working
            performers, not random internet strangers.
          </p>
        </article>
        <article className="sample-card">
          <Sparkles size={26} aria-hidden="true" />
          <h3>Yours to keep</h3>
          <p className="muted">
            The jokes and videos you order are made for you and delivered
            straight to your account.
          </p>
        </article>
      </div>

      <div className="row-actions" style={{ marginTop: 30 }}>
        <Link className="button primary" href="/comedians">
          Meet the comedians
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
