import Link from "next/link";
import { CheckCircle2, Eye, EyeOff, MessageSquareText, Star } from "lucide-react";
import { AuthGuard } from "@/components/AuthGuard";
import { PageTitle } from "@/components/PageTitle";
import { SignedInAs } from "@/components/SignedInAs";

const civilianOrders = [
  {
    id: "LL-1048",
    comedian: "Maya Ross",
    service: "Make Me Funny",
    occasion: "Best man speech",
    status: "delivered",
    due: "Revision window ends in 42 hours",
    total: "$190"
  },
  {
    id: "LL-1039",
    comedian: "Dev Santos",
    service: "Make Me Laugh",
    occasion: "Birthday roast",
    status: "payout scheduled",
    due: "Review available",
    total: "$305"
  }
];

export default function CivilianDashboardPage() {
  return (
    <AuthGuard role="civilian">
      <main className="page-shell">
        <PageTitle>My Orders</PageTitle>
        <SignedInAs />
        <p className="section-intro dark">
          Your orders, privacy controls, revision windows, and review prompts
          after completion.
        </p>

      <section className="dashboard-layout">
        <div className="grid">
          <div className="grid three">
            <article className="metric-card">
              <strong>7</strong>
              <p className="muted">Total LaughLines orders</p>
            </article>
            <article className="metric-card">
              <strong>Private</strong>
              <p className="muted">Profile visibility</p>
            </article>
            <article className="metric-card">
              <strong>2</strong>
              <p className="muted">Reviews posted</p>
            </article>
          </div>

          <section className="panel">
            <div className="section-header">
              <div>
                <h2>Active and past orders</h2>
                <p className="section-intro dark">
                  Orders become review-eligible only after paid completion.
                </p>
              </div>
            </div>
            <div className="grid">
              {civilianOrders.map((order) => (
                <article className="order-card" key={order.id}>
                  <div className="section-header">
                    <div>
                      <span className="status-pill">{order.status}</span>
                      <h3 style={{ marginTop: 12 }}>
                        {order.service} with {order.comedian}
                      </h3>
                      <p className="muted">
                        {order.id} / {order.occasion} / {order.total}
                      </p>
                    </div>
                    <div className="row-actions">
                      <button className="icon-button" aria-label="Open order thread">
                        <MessageSquareText size={18} aria-hidden="true" />
                      </button>
                      <button className="icon-button" aria-label="Approve delivery">
                        <CheckCircle2 size={18} aria-hidden="true" />
                      </button>
                      <button className="icon-button" aria-label="Leave review">
                        <Star size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <p>{order.due}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="panel">
            <h2>Profile privacy</h2>
            <div className="grid two">
              <article className="service-option">
                <EyeOff size={22} aria-hidden="true" />
                <strong>Private civilian profile</strong>
                <p className="muted">
                  Your usage count is visible to you and admins, not public
                  visitors.
                </p>
              </article>
              <article className="service-option">
                <Eye size={22} aria-hidden="true" />
                <strong>Public reviews</strong>
                <p className="muted">
                  Choose per review whether your display name appears publicly.
                </p>
              </article>
            </div>
            <div className="row-actions">
              <Link className="button primary" href="/comedians">
                Book another comic
              </Link>
            </div>
          </section>
        </div>
      </section>
      </main>
    </AuthGuard>
  );
}
