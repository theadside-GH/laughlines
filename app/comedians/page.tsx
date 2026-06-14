import { Filter, Search } from "lucide-react";
import { ComedianCard } from "@/components/ComedianCard";
import { comedians } from "@/lib/data";

export default function ComediansPage() {
  return (
    <main className="page-shell">
      <span className="eyebrow">COMEDIANS</span>
      <h1>COMEDIANS</h1>
      <p className="section-intro dark">
        Search by price, popularity, or newest comedians.
      </p>

      <section className="panel" aria-label="Comedian filters">
        <div className="form-grid two">
          <label className="field">
            <span>Search</span>
            <input placeholder="Corporate, wedding, roast, clean..." />
          </label>
          <label className="field">
            <span>Service</span>
            <select defaultValue="all">
              <option value="all">All services</option>
              <option value="MAKE_ME_FUNNY">Make Me Funny</option>
              <option value="MAKE_ME_LAUGH">Make Me Laugh</option>
            </select>
          </label>
          <label className="field">
            <span>Max price</span>
            <select defaultValue="any">
              <option value="any">Any price</option>
              <option value="100">Under $100</option>
              <option value="250">Under $250</option>
              <option value="500">Under $500</option>
            </select>
          </label>
          <label className="field">
            <span>Sort</span>
            <select defaultValue="popular">
              <option value="popular">Popular</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="new">Newest</option>
            </select>
          </label>
          <label className="field">
            <span>Featured list</span>
            <select defaultValue="featured">
              <option value="featured">Featured first</option>
              <option value="popular">Most popular</option>
              <option value="new">Newest comedians</option>
            </select>
          </label>
        </div>
        <div className="row-actions">
          <button className="button primary">
            <Search size={16} aria-hidden="true" />
            Search
          </button>
          <button className="button secondary">
            <Filter size={16} aria-hidden="true" />
            More filters
          </button>
        </div>
      </section>

      <section className="section-header" style={{ marginTop: 34 }}>
        <div>
          <h2>{comedians.length} comedians</h2>
          <p className="section-intro dark">
            Featured, new, and most-used comics appear first while search wiring
            connects to Supabase in production.
          </p>
        </div>
      </section>
      <div className="grid three">
        {comedians.map((comedian) => (
          <ComedianCard key={comedian.id} comedian={comedian} />
        ))}
      </div>
    </main>
  );
}
