"use client";

import Link from "next/link";
import { useRef } from "react";

type Door = {
  num: number;
  label: string;
  desc: string;
  href: string;
  disabled?: boolean;
};

// The 8 doors, in clockwise order starting from the top.
const doors: Door[] = [
  { num: 1, label: "Comedians", desc: "Browse the roster", href: "/comedians" },
  { num: 2, label: "Custom Jokes", desc: "Make Me Funny / Make Me Laugh", href: "/custom-jokes" },
  { num: 3, label: "Top 20", desc: "This week's featured roasters", href: "/top-20" },
  { num: 4, label: "Events & Parties", desc: "Hire a comic for your event", href: "/events" },
  { num: 5, label: "For Business", desc: "Coming soon", href: "/business", disabled: true },
  { num: 6, label: "Fastest Delivery", desc: "Quickest turnaround this week", href: "/fastest" },
  { num: 7, label: "100% Original", desc: "About LaughLines", href: "/about" },
  { num: 8, label: "Join", desc: "Sign in or sign up", href: "/join" }
];

// Radius of the ring as a percentage of the square stage.
const RADIUS = 43;

function ringPosition(index: number, total: number) {
  // Start at the top (-90deg) and space points evenly clockwise.
  const angle = (-90 + (360 / total) * index) * (Math.PI / 180);
  const x = 50 + RADIUS * Math.cos(angle);
  const y = 50 + RADIUS * Math.sin(angle);
  return { "--x": `${x}%`, "--y": `${y}%` } as React.CSSProperties;
}

export function FrontDoor() {
  const stageRef = useRef<HTMLDivElement>(null);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const mx = ((event.clientX - rect.left) / rect.width) * 100;
    const my = ((event.clientY - rect.top) / rect.height) * 100;
    stage.style.setProperty("--mx", `${mx}%`);
    stage.style.setProperty("--my", `${my}%`);
  }

  return (
    <section className="front-door" aria-label="LaughLines">
      <div className="front-stage" ref={stageRef} onMouseMove={handleMove}>
        <div className="front-glow" aria-hidden="true" />

        <div className="front-badge">
          <span className="front-badge-icon">
            <img src="/laughlines-logo-icon.jpg" alt="" />
          </span>
          <span className="front-badge-word">
            LaughLines<sup>™</sup>
          </span>
          <span className="front-badge-sub">— COMEDY DELIVERED —</span>
          <span className="front-badge-est">EST 2026</span>
        </div>

        <div className="front-ring">
          {doors.map((door, index) => {
            const style = ringPosition(index, doors.length);
            const inner = (
              <>
                <span className="front-point-num">{door.num}</span>
                <span className="front-point-text">
                  <span className="front-point-label">{door.label}</span>
                  <span className="front-point-desc">{door.desc}</span>
                </span>
              </>
            );

            if (door.disabled) {
              return (
                <span
                  key={door.num}
                  className="front-point is-disabled"
                  style={style}
                  aria-disabled="true"
                >
                  {inner}
                </span>
              );
            }

            return (
              <Link
                key={door.num}
                href={door.href}
                className="front-point"
                style={style}
              >
                {inner}
              </Link>
            );
          })}
        </div>
      </div>

      <p className="front-hint">
        <span className="on-desktop">Move around the ring — pick a door.</span>
        <span className="on-mobile">Tap a door to explore.</span>
      </p>
    </section>
  );
}
