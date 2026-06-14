import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CreditCard, FileText, LockKeyhole, Video } from "lucide-react";
import { BRAND, OCCASIONS, SERVICE_COPY } from "@/lib/constants";
import { findComedian } from "@/lib/data";
import { calculatePrice, money } from "@/lib/pricing";

export function generateStaticParams() {
  return ["maya-ross", "dev-santos", "lena-bright"].map((comedianSlug) => ({
    comedianSlug
  }));
}

export default async function RequestPage({
  params
}: {
  params: Promise<{ comedianSlug: string }>;
}) {
  const { comedianSlug } = await params;
  const comedian = findComedian(comedianSlug);

  if (!comedian) {
    notFound();
  }

  const defaultService = comedian.services[0];
  const price = calculatePrice(defaultService, {
    rushPreset: "72h",
    tipCents: 2500,
    discountPercent: 0
  });

  return (
    <main className="page-shell">
      <Link className="button secondary compact" href={`/comedians/${comedian.slug}`}>
        <ArrowLeft size={16} aria-hidden="true" />
        Back to {comedian.name}
      </Link>

      <div style={{ marginTop: 28 }}>
        <span className="eyebrow">Request brief</span>
        <h1>Give {comedian.name.split(" ")[0]} the useful details.</h1>
        <p className="section-intro dark">
          This form becomes the order brief. After checkout, the comic has{" "}
          {BRAND.acceptWindowHours} hours to accept or decline.
        </p>
      </div>

      <section className="request-layout">
        <form className="panel form-grid" aria-label="LaughLines request form">
          <div className="grid two">
            {comedian.services.map((service) => (
              <label className="service-option" key={service.serviceType}>
                <header>
                  <span>
                    {service.serviceType === "MAKE_ME_FUNNY" ? (
                      <FileText size={22} aria-hidden="true" />
                    ) : (
                      <Video size={22} aria-hidden="true" />
                    )}
                  </span>
                  <input
                    name="serviceType"
                    type="radio"
                    defaultChecked={service.serviceType === "MAKE_ME_FUNNY"}
                    value={service.serviceType}
                  />
                </header>
                <strong>{SERVICE_COPY[service.serviceType].label}</strong>
                <p className="muted">{SERVICE_COPY[service.serviceType].detail}</p>
                <strong>{money(service.basePriceCents)}</strong>
              </label>
            ))}
          </div>

          <div className="form-grid two">
            <label className="field">
              <span>Occasion</span>
              <select defaultValue="Best man speech">
                {OCCASIONS.map((occasion) => (
                  <option key={occasion}>{occasion}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Deadline</span>
              <input type="date" />
            </label>
          </div>

          <label className="field">
            <span>Who is the audience?</span>
            <input placeholder="Company leadership, wedding guests, close family..." />
          </label>

          <label className="field">
            <span>Tone</span>
            <select defaultValue="warm">
              <option value="warm">Warm and clever</option>
              <option value="clean">Clean and workplace-safe</option>
              <option value="roast">Roasty but survivable</option>
              <option value="absurd">A little absurd</option>
            </select>
          </label>

          <label className="field">
            <span>Useful specifics</span>
            <textarea placeholder="Names, relationships, inside jokes, stories, job titles, habits, phrases, and anything the comic should know." />
          </label>

          <label className="field">
            <span>Do not mention</span>
            <textarea placeholder="Sensitive topics, names, family drama, company details, or jokes that would not land." />
          </label>

          <div className="form-grid two">
            <label className="field">
              <span>Rush option</span>
              <select defaultValue="72h">
                <option value="">Standard 7 days</option>
                <option value="72h">72 hour rush</option>
                <option value="48h">48 hour rush</option>
                <option value="24h">24 hour rush</option>
              </select>
            </label>
            <label className="field">
              <span>Tip</span>
              <select defaultValue="25">
                <option value="0">No tip</option>
                <option value="10">$10</option>
                <option value="25">$25</option>
                <option value="50">$50</option>
              </select>
            </label>
          </div>

          <label className="field">
            <span>Profile visibility</span>
            <select defaultValue="private">
              <option value="private">Keep my civilian profile private</option>
              <option value="public">Show my display name on reviews</option>
            </select>
          </label>

          <button className="button primary" type="button">
            <CreditCard size={18} aria-hidden="true" />
            Continue to Stripe Checkout
          </button>
        </form>

        <aside className="panel">
          <div className="badge-row">
            <span className="badge hot">1 revision included</span>
            <span className="badge">USD only</span>
          </div>
          <h3 style={{ marginTop: 18 }}>Order summary</h3>
          <div className="summary-list">
            <div>
              <span>Base</span>
              <strong>{money(price.baseCents)}</strong>
            </div>
            <div>
              <span>72h rush</span>
              <strong>{money(price.rushCents)}</strong>
            </div>
            <div>
              <span>Tip</span>
              <strong>{money(price.tipCents)}</strong>
            </div>
            <div>
              <span>LaughLines 10%</span>
              <strong>{money(price.platformFeeCents)}</strong>
            </div>
            <div>
              <span>Comic payout ledger</span>
              <strong>{money(price.comedianGrossCents)}</strong>
            </div>
            <div>
              <span>Total today</span>
              <strong>{money(price.totalCents)}</strong>
            </div>
          </div>
          <p className="muted">
            Payment is collected at checkout. The comic payout is scheduled after
            delivery, revision window, and completion.
          </p>
          <div className="meta-line">
            <LockKeyhole size={16} aria-hidden="true" />
            Stripe handles card details.
          </div>
        </aside>
      </section>
    </main>
  );
}
