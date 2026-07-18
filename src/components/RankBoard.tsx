import Link from "next/link";
import type { RankedComic } from "@/lib/rankings";

const AVATAR_COLORS = [
  "#ff6b57",
  "#3c6df0",
  "#5ee0b5",
  "#6f4adf",
  "#ffd166",
  "#f0733c"
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function RankBoard({
  comics,
  metric
}: {
  comics: RankedComic[];
  metric: "orders" | "turnaround";
}) {
  return (
    <ol className="rank-board">
      {comics.map((comic) => (
        <li className="rank-row" key={comic.rank}>
          <span className={`rank-number${comic.rank <= 3 ? " top" : ""}`}>
            {comic.rank}
          </span>
          <span
            className="rank-avatar"
            style={{ background: AVATAR_COLORS[comic.rank % AVATAR_COLORS.length] }}
            aria-hidden="true"
          >
            {initials(comic.name)}
          </span>
          <span className="rank-info">
            <strong>{comic.name}</strong>
            <span className="muted">
              {comic.style} · {comic.location}
            </span>
          </span>
          <span className="rank-metric">
            {metric === "orders" ? (
              <>
                <strong>{comic.weeklyOrders}</strong>
                <small>orders / wk</small>
              </>
            ) : (
              <>
                <strong>{comic.avgTurnaround}</strong>
                <small>{comic.onTimeRate}% on time</small>
              </>
            )}
          </span>
          <Link className="button secondary compact rank-cta" href="/comedians">
            Book
          </Link>
        </li>
      ))}
    </ol>
  );
}
