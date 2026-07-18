"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="page-shell">
      <PageTitle>Contact</PageTitle>
      <p className="section-intro dark">
        Questions, press, or partnerships? Drop us a line.
      </p>

      <div className="form-column">
        <p className="contact-email">
          <Mail size={16} aria-hidden="true" />
          <a href="mailto:hello@laughlines.example">hello@laughlines.example</a>
        </p>

        {sent ? (
          <section className="panel confirm-panel">
            <Send size={30} aria-hidden="true" />
            <h2>Message sent!</h2>
            <p className="muted">
              This is a demo, so nothing was actually sent. Once we&apos;re live
              we&apos;ll get back to you within one business day.
            </p>
            <button className="button secondary" onClick={() => setSent(false)}>
              Send another
            </button>
          </section>
        ) : (
          <section className="panel">
            <form
              className="form-grid"
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
            >
              <label className="field">
                <span>Your name</span>
                <input required />
              </label>
              <label className="field">
                <span>Email</span>
                <input required type="email" />
              </label>
              <label className="field">
                <span>Message</span>
                <textarea required placeholder="How can we help?" />
              </label>
              <button className="button primary" type="submit">
                <Send size={16} aria-hidden="true" />
                Send message
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}
