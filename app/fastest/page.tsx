import { PageTitle } from "@/components/PageTitle";
import { RankBoard } from "@/components/RankBoard";
import { fastestComics } from "@/lib/rankings";

export const metadata = {
  title: "Fastest Delivery | LaughLines",
  description: "The 20 comics with the quickest turnaround this week, updated automatically."
};

export default function FastestPage() {
  return (
    <main className="page-shell">
      <PageTitle>Fastest Delivery</PageTitle>
      <p className="section-intro dark">
        Need it yesterday? These are the comics with the fastest turnaround time,
        ranked by speed.
      </p>
      <p className="update-note">Updated every Monday</p>

      <RankBoard comics={fastestComics} metric="turnaround" />
    </main>
  );
}
