"use client";

import { useState } from "react";
import { LogIn, Mic2, UserPlus } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase";

type Tab = "signin" | "user" | "comic";

const tabs: Array<{ id: Tab; label: string; icon: typeof LogIn }> = [
  { id: "signin", label: "Sign in", icon: LogIn },
  { id: "user", label: "Create account", icon: UserPlus },
  { id: "comic", label: "Join as a comic", icon: Mic2 }
];

export default function JoinPage() {
  const [tab, setTab] = useState<Tab>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  function switchTab(id: Tab) {
    setTab(id);
    setError(null);
    setMessage(null);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    // Demo mode: no Supabase project connected yet.
    if (!isSupabaseConfigured()) {
      setMessage(
        "Demo mode — no account was created yet. Connect Supabase and this will really sign you up."
      );
      return;
    }

    setLoading(true);
    try {
      const supabase = getSupabaseBrowserClient();

      if (tab === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        setMessage("You're signed in.");
      } else {
        const role = tab === "comic" ? "comedian" : "civilian";
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role,
              display_name: name || undefined,
              social_link: link || undefined
            }
          }
        });
        if (error) throw error;

        // With email confirmation on, there's no session yet.
        setMessage(
          data.session
            ? "Account created — you're signed in."
            : "Account created! Check your email to confirm your address."
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const submitLabel =
    tab === "signin"
      ? "Sign in"
      : tab === "user"
        ? "Create account"
        : "Apply as a comic";

  return (
    <main className="page-shell join-page">
      <PageTitle>Join</PageTitle>
      <p className="section-intro dark">
        Sign in, create an account, or join as a comedian.
      </p>

      <div className="form-column">
        <div className="tab-row" role="tablist" aria-label="Join options">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              className={`tab-button${tab === id ? " active" : ""}`}
              onClick={() => switchTab(id)}
            >
              <Icon size={16} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <section className="panel">
          {message ? (
            <div className="confirm-panel">
              <h2>{tab === "signin" ? "Welcome back." : "Almost there."}</h2>
              <p className="muted">{message}</p>
              <button
                className="button secondary"
                onClick={() => setMessage(null)}
              >
                Back
              </button>
            </div>
          ) : (
            <form className="form-grid" onSubmit={handleSubmit}>
              {tab === "comic" ? (
                <label className="field">
                  <span>Stage name</span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
              ) : null}
              {tab === "user" ? (
                <label className="field">
                  <span>Name</span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
              ) : null}
              <label className="field">
                <span>Email</span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="field">
                <span>Password</span>
                <input
                  required
                  type="password"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              {tab === "comic" ? (
                <label className="field">
                  <span>Where can we see your comedy? (link)</span>
                  <input
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://instagram.com/yourhandle"
                  />
                </label>
              ) : null}

              {error ? <p className="form-error">{error}</p> : null}

              <button className="button primary" type="submit" disabled={loading}>
                {loading ? "Working..." : submitLabel}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
