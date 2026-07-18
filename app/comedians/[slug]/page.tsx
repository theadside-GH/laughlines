import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, Play, Star } from "lucide-react";
import { SERVICE_COPY } from "@/lib/constants";
import { comedians, findComedian } from "@/lib/data";
import { money } from "@/lib/pricing";

export function generateStaticParams() {
  return comedians.map((comic) => ({ slug: comic.slug }));
}

export default async function ComedianProfilePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comedian = findComedian(slug);

  if (!comedian) {
    notFound();
  }

  return (
    <main>
      <section className="page-shell profile-hero">
        <div className="profile-media">
          <img src={comedian.profileImage} alt={`${comedian.name} portrait`} />
          <div className="badge-row">
            {comedian.categories.map((category) => (
              <span className="badge" key={category}>
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className="profile-copy">
          <span className="eyebrow">Approved comedian</span>
          <h1>{comedian.name}</h1>
          <p>{comedian.bio}</p>
          <div className="meta-line">
            <span>
              <Star size={16} fill="currentColor" aria-hidden="true" />{" "}
              {comedian.rating} from {comedian.reviewCount} reviews
            </span>
            <span>{comedian.completedOrders} completed orders</span>
            <span>{comedian.responseTime}</span>
          </div>
          <div className="hero-actions">
            <Link className="button primary" href={`/request/${comedian.slug}`}>
              Request {comedian.name.split(" ")[0]}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <a className="button secondary" href={comedian.socials.website ?? "#"}>
              Socials
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="grid two">
          <div>
            <span className="eyebrow">Intro video</span>
            <h2>See the voice before you book.</h2>
            <div className="video-tile">
              <button className="play-button" aria-label="Play comedian intro video">
                <Play size={24} fill="currentColor" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="panel service-panel">
            <h3>Services</h3>
            {comedian.services.map((service) => (
              <article className="service-option" key={service.serviceType}>
                <header>
                  <div>
                    <strong>{SERVICE_COPY[service.serviceType].label}</strong>
                    <p className="muted">{SERVICE_COPY[service.serviceType].short}</p>
                  </div>
                  <strong>{money(service.basePriceCents)}</strong>
                </header>
                <div className="badge-row">
                  {service.rushOptions.map((rush) => (
                    <span className="badge" key={rush.preset}>
                      {rush.preset} rush +{money(rush.feeCents)}
                    </span>
                  ))}
                </div>
              </article>
            ))}
            <Link className="button primary" href={`/request/${comedian.slug}`}>
              Start request
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid three">
          <article className="panel">
            <h3>Credits</h3>
            <ul>
              {comedian.credits.map((credit) => (
                <li key={credit}>{credit}</li>
              ))}
            </ul>
          </article>
          <article className="panel">
            <h3>Sample jokes</h3>
            {comedian.sampleJokes.map((joke) => (
              <p key={joke} className="muted">
                "{joke}"
              </p>
            ))}
          </article>
          <article className="panel">
            <h3>Review rules</h3>
            <p className="muted">
              Only civilians with a completed MMF or MML order can leave a public
              review.
            </p>
          </article>
        </div>
      </section>

      <section className="section alt">
        <div className="section-header">
          <div>
            <span className="eyebrow">Reviews</span>
            <h2>People who trusted the bit.</h2>
          </div>
        </div>
        <div className="grid two">
          {comedian.reviews.map((review) => (
            <article className="review-card" key={`${review.name}-${review.event}`}>
              <div className="meta-line">
                <strong>{review.name}</strong>
                <span>{review.event}</span>
                <span>
                  <Star size={14} fill="currentColor" aria-hidden="true" />{" "}
                  {review.rating}
                </span>
              </div>
              <p>{review.quote}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
