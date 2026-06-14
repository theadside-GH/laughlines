import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { money } from "@/lib/pricing";
import type { ComedianProfile } from "@/lib/types";

export function ComedianCard({ comedian }: { comedian: ComedianProfile }) {
  const makeMeFunny = comedian.services.find(
    (service) => service.serviceType === "MAKE_ME_FUNNY"
  );
  const makeMeLaugh = comedian.services.find(
    (service) => service.serviceType === "MAKE_ME_LAUGH"
  );

  return (
    <article className="comic-card">
      <Link className="comic-card-media" href={`/comedians/${comedian.slug}`}>
        <img src={comedian.profileImage} alt={`${comedian.name} profile`} />
      </Link>
      <div className="comic-card-body">
        <div className="badge-row">
          {comedian.featured ? <span className="badge hot">Featured</span> : null}
          {comedian.newest ? <span className="badge cool">New</span> : null}
          <span className="badge">
            <Star size={14} fill="currentColor" aria-hidden="true" />
            {comedian.rating}
          </span>
        </div>
        <div>
          <h3>{comedian.name}</h3>
          <div className="meta-line">
            <span>{comedian.categories.slice(0, 2).join(" / ")}</span>
            <span>
              <MapPin size={14} aria-hidden="true" /> {comedian.location}
            </span>
          </div>
        </div>
        <p className="muted">{comedian.bio}</p>
        <div className="price-row">
          <div>
            <small>MMF from</small>
            <strong>{makeMeFunny ? money(makeMeFunny.basePriceCents) : "N/A"}</strong>
          </div>
          <div>
            <small>MML from</small>
            <strong>{makeMeLaugh ? money(makeMeLaugh.basePriceCents) : "N/A"}</strong>
          </div>
        </div>
        <Link className="button secondary" href={`/comedians/${comedian.slug}`}>
          View profile
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
