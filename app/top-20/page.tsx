import { PageTitle } from "@/components/PageTitle";
import { RankBoard } from "@/components/RankBoard";
import { topRoastComics } from "@/lib/rankings";

export const metadata = {
  title: "Top 20 | LaughLines",
  description: "The 20 most-booked roast comics this week, updated automatically."
};

export default function Top20Page() {
  return (
    <main className="page-shell">
      <PageTitle>Top 20</PageTitle>
      <p className="update-note">Updated every Monday</p>

      <RankBoard comics={topRoastComics} metric="orders" />
    </main>
  );
}
