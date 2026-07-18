import { Filter, Search } from "lucide-react";
import { ComedianCard } from "@/components/ComedianCard";
import { PageTitle } from "@/components/PageTitle";
import { comedians } from "@/lib/data";

export default function ComediansPage() {
  return (
    <main className="page-shell">
      <PageTitle>Comedians</PageTitle>
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
          <fieldset className="field">
            <span>Service</span>
            <div className="pick-boxes">
              <label className="pick">
                <input type="checkbox" defaultChecked />
                Make Me Funny
              </label>
              <label className="pick">
                <input type="checkbox" defaultChecked />
                Make Me Laugh
              </label>
            </div>
          </fieldset>
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

      <div className="grid three" style={{ marginTop: 34 }}>
        {comedians.map((comedian) => (
          <ComedianCard key={comedian.id} comedian={comedian} />
        ))}
      </div>
    </main>
  );
}
