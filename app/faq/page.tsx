import { PageTitle } from "@/components/PageTitle";

export const metadata = {
  title: "FAQ | LaughLines",
  description: "Frequently asked questions about ordering comedy on LaughLines."
};

const faqs = [
  {
    q: "What's the difference between Make Me Funny and Make Me Laugh?",
    a: "Make Me Funny means a comic writes custom jokes for you to deliver yourself. Make Me Laugh means a comic performs your custom material in a video."
  },
  {
    q: "How fast can I get my order?",
    a: "It depends on the comic. Check the Fastest Delivery list for comics ranked by turnaround time — some deliver same-day."
  },
  {
    q: "Are the jokes really original?",
    a: "Yes. Every order is written from scratch by a real, vetted comic for your specific person, room, or occasion."
  },
  {
    q: "How are the Top 20 and Fastest lists chosen?",
    a: "They're generated automatically and refreshed every Monday — Top 20 by number of orders, Fastest by average delivery time."
  },
  {
    q: "Can I hire a comic for a live event?",
    a: "Yes — head to Events & Parties and send an inquiry with your details, and we'll match you with the right comics."
  },
  {
    q: "How do I become a comic on LaughLines?",
    a: "Use the Join page and choose \"Join as a comic.\" Full onboarding and payouts arrive once accounts go live."
  }
];

export default function FaqPage() {
  return (
    <main className="page-shell">
      <PageTitle>FAQ</PageTitle>
      <p className="section-intro dark">
        Quick answers to the questions we hear most.
      </p>

      <div className="faq-list">
        {faqs.map((item) => (
          <article className="faq-item" key={item.q}>
            <h2>{item.q}</h2>
            <p className="muted">{item.a}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
