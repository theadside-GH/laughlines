import Link from "next/link";
import { ArrowRight, BadgeDollarSign, FileText, Play, Search, Video } from "lucide-react";
import { ComedianCard } from "@/components/ComedianCard";
import {
  featuredComedians,
  mostUsedComedians,
  newComedians,
  sampleSpeechLines
} from "@/lib/data";

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <img className="hero-logo" src="/laughlines-logo-lockup.jpg" alt="LaughLines" />
          <span className="eyebrow">COMEDY DELIVERED</span>
          <h1>LAUGHLINES</h1>
          <p>
            When you want to seem funnier than you are - or you just need a laugh.
            Custom jokes for speeches, send-offs, gatherings or any social setting.
          </p>
          <div className="hero-actions">
            <Link className="button accent" href="/comedians">
              <Search size={18} aria-hidden="true" />
              Find a comedian
            </Link>
            <Link className="button secondary" href="#samples">
              <Play size={18} aria-hidden="true" />
              See samples
            </Link>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="section-header">
          <div>
            <span className="eyebrow">TWO OPTIONS</span>
            <h2>MAKE ME FUNNY or MAKE ME LAUGH</h2>
          </div>
          <Link className="button primary" href="/comedians">
            Start a request
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid two">
          <article className="sample-card">
            <FileText size={28} aria-hidden="true" />
            <h3>MAKE ME FUNNY</h3>
            <p className="muted">
              Hire a comedian to write custom jokes and punch up your speech,
              toast, send-off, roast, gathering, or social moment.
            </p>
          </article>
          <article className="sample-card">
            <Video size={28} aria-hidden="true" />
            <h3>MAKE ME LAUGH</h3>
            <p className="muted">
              Hire a comedian to make a custom video performing jokes tailored
              to your event, person, room, or occasion.
            </p>
          </article>
        </div>
        <p className="options-note">
          Choose a comedian, send the details, and get custom comedy built for
          your exact room.
        </p>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="eyebrow">COMEDIANS</span>
            <h2>FEATURED</h2>
          </div>
          <Link className="button secondary" href="/comedians">
            Browse all
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="grid three">
          {featuredComedians.map((comedian) => (
            <ComedianCard key={comedian.id} comedian={comedian} />
          ))}
        </div>
      </section>

      <section className="section alt" id="samples">
        <div className="section-header">
          <div>
            <span className="eyebrow">Samples</span>
            <h2>Proof that personal beats generic.</h2>
          </div>
        </div>
        <div className="grid two">
          <article className="sample-card">
            <div className="video-tile">
              <button className="play-button" aria-label="Play sample video">
                <Play size={24} fill="currentColor" aria-hidden="true" />
              </button>
            </div>
            <h3>Custom video sample</h3>
            <p className="muted">
              A comic turns a retirement speech brief into a polished video with
              personal jokes, pacing, and usable tags.
            </p>
          </article>
          <article className="sample-card">
            <BadgeDollarSign size={28} aria-hidden="true" />
            <h3>Sample speech lines</h3>
            {sampleSpeechLines.map((sample) => (
              <blockquote key={sample.occasion}>
                <strong>{sample.occasion}</strong>
                <p>{sample.line}</p>
              </blockquote>
            ))}
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <span className="eyebrow">COMEDIANS</span>
            <h2>MOST POPULAR</h2>
          </div>
        </div>
        <div className="grid three">
          {mostUsedComedians.map((comedian) => (
            <ComedianCard key={comedian.id} comedian={comedian} />
          ))}
        </div>
      </section>
    </main>
  );
}
