import { BadgeCheck, BadgeDollarSign, Flag, ShieldAlert, TicketPercent, UserCheck } from "lucide-react";

const adminQueues = [
  {
    label: "Comedian applications",
    count: 8,
    icon: UserCheck,
    detail: "Review credits, samples, socials, and Stripe readiness."
  },
  {
    label: "Refund or dispute review",
    count: 2,
    icon: ShieldAlert,
    detail: "Hold payout, inspect order thread, and resolve with notes."
  },
  {
    label: "Review moderation",
    count: 5,
    icon: Flag,
    detail: "Hide abusive or non-order reviews before publishing."
  },
  {
    label: "Discount codes",
    count: 4,
    icon: TicketPercent,
    detail: "Manage Stripe promotion code mappings."
  }
];

export default function AdminPage() {
  return (
    <main className="page-shell">
      <span className="eyebrow">Admin operations</span>
      <h1>Keep the marketplace funny and functional.</h1>
      <p className="section-intro dark">
        Admins approve comedians, feature profiles, inspect order threads,
        moderate reviews, manage discounts, and hold payouts during disputes.
      </p>

      <section className="grid three">
        <article className="metric-card">
          <BadgeCheck size={22} aria-hidden="true" />
          <strong>42</strong>
          <p className="muted">Approved comedians</p>
        </article>
        <article className="metric-card">
          <BadgeDollarSign size={22} aria-hidden="true" />
          <strong>$18.4k</strong>
          <p className="muted">Gross marketplace volume</p>
        </article>
        <article className="metric-card">
          <TicketPercent size={22} aria-hidden="true" />
          <strong>10%</strong>
          <p className="muted">LaughLines platform fee</p>
        </article>
      </section>

      <section className="dashboard-layout" style={{ marginTop: 28 }}>
        <div className="grid">
          <section className="grid two">
            {adminQueues.map((item) => {
              const Icon = item.icon;
              return (
                <article className="panel" key={item.label}>
                  <Icon size={24} aria-hidden="true" />
                  <h2>{item.count}</h2>
                  <h3>{item.label}</h3>
                  <p className="muted">{item.detail}</p>
                  <div className="row-actions">
                    <button className="button secondary">Open queue</button>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="panel">
            <h2>Order intervention model</h2>
            <ul className="timeline">
              <li>Paid requests create a ledger entry before the comic accepts.</li>
              <li>Declined requests are refunded or re-routed by admin.</li>
              <li>Disputed orders pause completion and payout scheduling.</li>
              <li>Completed orders unlock civilian-only reviews.</li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
