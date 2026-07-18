import { BadgeDollarSign, Clock3, FileVideo, Inbox, Send, Settings } from "lucide-react";
import { AuthGuard } from "@/components/AuthGuard";
import { PageTitle } from "@/components/PageTitle";
import { SignedInAs } from "@/components/SignedInAs";

const comicJobs = [
  {
    id: "LL-1052",
    customer: "Private civilian",
    service: "Make Me Funny",
    occasion: "Corporate keynote",
    status: "needs acceptance",
    deadline: "Accept by tomorrow, 3:00 PM",
    value: "$225"
  },
  {
    id: "LL-1048",
    customer: "Claire P.",
    service: "Make Me Funny",
    occasion: "Best man speech",
    status: "delivered",
    deadline: "Revision window open",
    value: "$171 ledger"
  },
  {
    id: "LL-1044",
    customer: "Jordan M.",
    service: "Make Me Laugh",
    occasion: "Sales kickoff",
    status: "in progress",
    deadline: "Due in 4 days",
    value: "$405"
  }
];

export default function ComicDashboardPage() {
  return (
    <AuthGuard role="comedian">
      <main className="page-shell">
        <PageTitle>Comic Portal</PageTitle>
        <SignedInAs />
        <p className="section-intro dark">
          Accept gigs, deliver the funny, and control pricing, availability, and
          payouts after admin approval.
        </p>
        <p className="preview-banner">
          Preview — the requests and payout figures below are sample data so you
          can see how the portal works. Your real gigs appear here once you're
          approved and booked.
        </p>

      <section className="dashboard-layout">
        <div className="grid">
          <div className="grid three">
            <article className="metric-card">
              <Inbox size={22} aria-hidden="true" />
              <strong>1</strong>
              <p className="muted">New request</p>
            </article>
            <article className="metric-card">
              <BadgeDollarSign size={22} aria-hidden="true" />
              <strong>$1,284</strong>
              <p className="muted">Scheduled payouts</p>
            </article>
            <article className="metric-card">
              <Clock3 size={22} aria-hidden="true" />
              <strong>6h</strong>
              <p className="muted">Median accept time</p>
            </article>
          </div>

          <section className="panel">
            <div className="section-header">
              <div>
                <h2>Requests and deliveries</h2>
                <p className="section-intro dark">
                  A request is only live after payment, and accepted jobs open a
                  private order thread.
                </p>
              </div>
            </div>
            <div className="grid">
              {comicJobs.map((job) => (
                <article className="order-card" key={job.id}>
                  <div className="section-header">
                    <div>
                      <span className="status-pill">{job.status}</span>
                      <h3 style={{ marginTop: 12 }}>
                        {job.service}: {job.occasion}
                      </h3>
                      <p className="muted">
                        {job.id} / {job.customer} / {job.value}
                      </p>
                    </div>
                    <div className="row-actions">
                      <button className="icon-button" aria-label="Accept request">
                        <Send size={18} aria-hidden="true" />
                      </button>
                      <button className="icon-button" aria-label="Upload delivery">
                        <FileVideo size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <p>{job.deadline}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid two">
            <article className="panel">
              <Settings size={24} aria-hidden="true" />
              <h2>Pricing</h2>
              <div className="summary-list">
                <div>
                  <span>Make Me Funny</span>
                  <strong>$125</strong>
                </div>
                <div>
                  <span>Make Me Laugh</span>
                  <strong>$325</strong>
                </div>
                <div>
                  <span>Rush presets</span>
                  <strong>24h / 48h / 72h</strong>
                </div>
              </div>
            </article>
            <article className="panel">
              <BadgeDollarSign size={24} aria-hidden="true" />
              <h2>Payout rules</h2>
              <ul className="timeline">
                <li>Delivery submitted</li>
                <li>Revision window closes or civilian approves</li>
                <li>LaughLines records 10% fee</li>
                <li>Stripe Connect transfer is scheduled</li>
              </ul>
            </article>
          </section>
        </div>
      </section>
      </main>
    </AuthGuard>
  );
}
