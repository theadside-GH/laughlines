"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ComedianCard } from "@/components/ComedianCard";
import { PageTitle } from "@/components/PageTitle";
import { comedians } from "@/lib/data";
import type { ServiceType } from "@/lib/types";

function basePrice(comic: (typeof comedians)[number], service: ServiceType) {
  return (
    comic.services.find((s) => s.serviceType === service)?.basePriceCents ??
    Infinity
  );
}

export default function ComediansPage() {
  const [query, setQuery] = useState("");
  const [funny, setFunny] = useState(true);
  const [laugh, setLaugh] = useState(true);
  const [maxPrice, setMaxPrice] = useState("any");
  const [sort, setSort] = useState("popular");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const cap = maxPrice === "any" ? Infinity : Number(maxPrice) * 100;

    let list = comedians.filter((comic) => {
      if (!funny && !laugh) return false;

      // Cheapest of the *selected* services must be within the price cap.
      const selected: ServiceType[] = [];
      if (funny) selected.push("MAKE_ME_FUNNY");
      if (laugh) selected.push("MAKE_ME_LAUGH");
      const cheapest = Math.min(...selected.map((s) => basePrice(comic, s)));
      if (cheapest > cap) return false;

      if (q) {
        const haystack =
          `${comic.name} ${comic.location} ${comic.style} ${comic.categories.join(" ")} ${comic.bio}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-low":
          return basePrice(a, "MAKE_ME_FUNNY") - basePrice(b, "MAKE_ME_FUNNY");
        case "price-high":
          return basePrice(b, "MAKE_ME_FUNNY") - basePrice(a, "MAKE_ME_FUNNY");
        case "new":
          return Number(b.newest) - Number(a.newest) || b.weeklyOrders - a.weeklyOrders;
        default:
          return b.weeklyOrders - a.weeklyOrders;
      }
    });

    return list;
  }, [query, funny, laugh, maxPrice, sort]);

  return (
    <main className="page-shell">
      <PageTitle>Comedians</PageTitle>
      <p className="section-intro dark">
        Search by name, style, price, or popularity.
      </p>

      <section className="panel" aria-label="Comedian filters">
        <div className="form-grid two">
          <label className="field">
            <span>Search</span>
            <div className="search-field">
              <Search size={16} aria-hidden="true" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Corporate, wedding, roast, deadpan, Chicago..."
              />
            </div>
          </label>
          <label className="field">
            <span>Max price</span>
            <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}>
              <option value="any">Any price</option>
              <option value="100">Under $100</option>
              <option value="250">Under $250</option>
              <option value="500">Under $500</option>
            </select>
          </label>
          <label className="field">
            <span>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="popular">Most popular</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="new">Newest</option>
            </select>
          </label>
          <fieldset className="field">
            <span>Service</span>
            <div className="pick-boxes">
              <label className="pick">
                <input
                  type="checkbox"
                  checked={funny}
                  onChange={(e) => setFunny(e.target.checked)}
                />
                Make Me Funny
              </label>
              <label className="pick">
                <input
                  type="checkbox"
                  checked={laugh}
                  onChange={(e) => setLaugh(e.target.checked)}
                />
                Make Me Laugh
              </label>
            </div>
          </fieldset>
        </div>
      </section>

      <p className="results-count">
        {results.length} comedian{results.length === 1 ? "" : "s"}
      </p>

      {results.length === 0 ? (
        <p className="section-intro dark">
          No comedians match those filters — try widening your search.
        </p>
      ) : (
        <div className="grid three">
          {results.map((comedian) => (
            <ComedianCard key={comedian.id} comedian={comedian} />
          ))}
        </div>
      )}
    </main>
  );
}
