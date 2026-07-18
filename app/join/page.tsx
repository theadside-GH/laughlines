"use client";

import { useState } from "react";
import { LogIn, Mic2, UserPlus } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";

type Tab = "signin" | "user" | "comic";

const tabs: Array<{ id: Tab; label: string; icon: typeof LogIn }> = [
  { id: "signin", label: "Sign in", icon: LogIn },
  { id: "user", label: "Create account", icon: UserPlus },
  { id: "comic", label: "Join as a comic", icon: Mic2 }
];

export default function JoinPage() {
  const [tab, setTab] = useState<Tab>("signin");
  const [done, setDone] = useState(false);

  return (
    <main className="page-shell join-page">
      <PageTitle>Join</PageTitle>
      <p className="section-intro dark">
        Sign in, create an account, or join as a comedian. Accounts are a demo
        for now — real sign-in arrives when we wire up Supabase.
      </p>

      <div className="form-column">
      <div className="tab-row" role="tablist" aria-label="Join options">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            role="tab"
            aria-selected={tab === id}
            className={`tab-button${tab === id ? " active" : ""}`}
            onClick={() => {
              setTab(id);
              setDone(false);
            }}
          >
            <Icon size={16} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      <section className="panel">
        {done ? (
          <div className="confirm-panel">
            <h2>You&apos;re all set (almost).</h2>
            <p className="muted">
              This is a demo — no account was created. Once Supabase auth is
              connected, this button will really sign you in.
            </p>
            <button className="button secondary" onClick={() => setDone(false)}>
              Back
            </button>
          </div>
        ) : (
          <form
            className="form-grid"
            onSubmit={(event) => {
              event.preventDefault();
              setDone(true);
            }}
          >
            {tab === "comic" ? (
              <label className="field">
                <span>Stage name</span>
                <input required placeholder="Dev Santos" />
              </label>
            ) : null}
            {tab === "user" ? (
              <label className="field">
                <span>Name</span>
                <input required placeholder="Jordan Rivera" />
              </label>
            ) : null}
            <label className="field">
              <span>Email</span>
              <input required type="email" placeholder="you@example.com" />
            </label>
            <label className="field">
              <span>Password</span>
              <input required type="password" placeholder="••••••••" />
            </label>
            {tab === "comic" ? (
              <label className="field">
                <span>Where can we see your comedy? (link)</span>
                <input placeholder="https://instagram.com/yourhandle" />
              </label>
            ) : null}
            <button className="button primary" type="submit">
              {tab === "signin"
                ? "Sign in"
                : tab === "user"
                  ? "Create account"
                  : "Apply as a comic"}
            </button>
          </form>
        )}
      </section>
      </div>
    </main>
  );
}
