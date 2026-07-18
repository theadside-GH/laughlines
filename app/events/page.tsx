"use client";

import { useRef, useState } from "react";
import { CalendarDays, PartyPopper } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";

export default function EventsPage() {
  const [submitted, setSubmitted] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);
  const dateOpen = useRef(false);

  // Clicking the date field toggles the native picker: a second click closes it.
  function toggleDatePicker(event: React.MouseEvent<HTMLInputElement>) {
    event.preventDefault();
    const el = dateRef.current;
    if (!el) return;
    if (dateOpen.current) {
      el.blur();
      dateOpen.current = false;
    } else {
      el.focus();
      el.showPicker?.();
      dateOpen.current = true;
    }
  }

  return (
    <main className="page-shell">
      <PageTitle>Events &amp; Parties</PageTitle>
      <p className="section-intro dark">
        Hire a comic for your event. Birthdays, weddings, corporate parties,
        roasts, fundraisers — tell us what you&apos;re planning and we&apos;ll
        match you with the right comics.
      </p>

      {submitted ? (
        <section className="panel confirm-panel">
          <PartyPopper size={32} aria-hidden="true" />
          <h2>Inquiry received!</h2>
          <p className="muted">
            Thanks — this is a demo, so nothing was sent yet. Once bookings go
            live, our team will reply within one business day with comic
            recommendations and quotes.
          </p>
          <button className="button secondary" onClick={() => setSubmitted(false)}>
            Submit another inquiry
          </button>
        </section>
      ) : (
        <section className="panel" aria-label="Event inquiry form">
          <form
            className="form-grid two"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
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
              <span>Event type</span>
              <select defaultValue="birthday">
                <option value="birthday">Birthday</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate party</option>
                <option value="roast">Roast</option>
                <option value="fundraiser">Fundraiser</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="field">
              <span>Event date</span>
              <input
                ref={dateRef}
                type="date"
                onMouseDown={toggleDatePicker}
                onBlur={() => {
                  dateOpen.current = false;
                }}
              />
            </label>
            <label className="field">
              <span>City</span>
              <input />
            </label>
            <label className="field">
              <span>Approx. guests</span>
              <input type="number" min={1} />
            </label>
            <label className="field" style={{ gridColumn: "1 / -1" }}>
              <span>Tell us about it</span>
              <textarea placeholder="Roast for my dad's 60th, keep it clean-ish, about 20 minutes..." />
            </label>
            <div className="row-actions" style={{ gridColumn: "1 / -1" }}>
              <button className="button primary" type="submit">
                <CalendarDays size={16} aria-hidden="true" />
                Send inquiry
              </button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}
