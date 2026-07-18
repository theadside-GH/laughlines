import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";

export const metadata = {
  title: "Custom Jokes | LaughLines",
  description: "Order custom jokes from any comic — written for you, or performed on video."
};

export default function CustomJokesPage() {
  return (
    <main className="page-shell">
      <PageTitle>Custom Jokes</PageTitle>
      <p className="section-intro dark">
        Order jokes from any comic. Pick a comedian, tell them the occasion, and
        choose how you want it delivered:
      </p>

      <ul className="option-list">
        <li>
          <strong>Make Me Funny</strong> — a comic <em>writes it for you</em>:
          custom jokes and punch-up for your speech, toast, or roast, delivered
          as text to perform yourself.
        </li>
        <li>
          <strong>Make Me Laugh</strong> — a comic <em>tells it in video form</em>:
          a custom video of them performing jokes written for your exact person,
          room, or occasion.
        </li>
      </ul>

      <div className="cta-with-picks">
        <div className="row-actions" style={{ marginTop: 0 }}>
          <Link className="button primary" href="/comedians">
            Choose a comedian
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link className="button secondary" href="/top-20">
            See the Top 20
          </Link>
        </div>
        <fieldset className="pick-boxes" aria-label="Delivery type">
          <label className="pick">
            <input type="checkbox" defaultChecked />
            Make Me Funny
          </label>
          <label className="pick">
            <input type="checkbox" />
            Make Me Laugh
          </label>
        </fieldset>
      </div>
    </main>
  );
}
