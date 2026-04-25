"use client";

import React, { useEffect, useMemo, useRef, useState, ReactElement } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─────────────────────────────────────────
   Data — 5 cards
───────────────────────────────────────── */
const highlights = [
  {
    icon: "🔌",
    title: "IoT & Embedded Systems",
    desc: "sensors, microcontrollers, edge devices — built to survive the real world, not just your lab bench.",
    longDesc: "we build connected hardware for where things actually get rough: dust, vibration, -20°C to +60°C, internet that ghosts for hours. edge logic handles decisions locally so your system keeps running no matter what. data only moves when it matters. alerts fire when they should. zero cloud round-trips, zero excuses.",
    accent: ["#10b981", "#14b8a6"],
    tag: "Hardware",
    href: "/services#iot",
    pattern: "circuit",
    number: "01",
  },
  {
    icon: "🌐",
    title: "Web & Cloud Platforms",
    desc: "dashboards, APIs, real-time streams — the software layer your hardware actually deserves.",
    longDesc: "next.js frontends, node/python backends, websocket streams, REST & graphql APIs. wired to your IoT stack or built standalone — either way it feels like it was always supposed to be there. fast to ship, clean to scale, no spaghetti left behind.",
    accent: ["#06b6d4", "#3b82f6"],
    tag: "Cloud",
    href: "/services#web",
    pattern: "grid",
    number: "02",
  },
  {
    icon: "📱",
    title: "Mobile Applications",
    desc: "cross-platform apps that put your whole system in a pocket. live data, remote control, zero lag.",
    longDesc: "flutter apps that connect users directly to hardware or platforms. push notifications that don't cry wolf. live charts that don't freeze at the worst moment. remote control that actually responds. one codebase, iOS and android, polished enough that it doesn't embarrass the rest of what you built.",
    accent: ["#8b5cf6", "#a855f7"],
    tag: "Mobile",
    href: "/services#mobile",
    pattern: "dots",
    number: "03",
  },
  {
    icon: "🧠",
    title: "AI-Assisted Solutions",
    desc: "anomaly detection, predictive maintenance, edge vision — ML that earns its place, not just its title.",
    longDesc: "we use AI where it actually moves the needle: catching failures before they cost money, spotting patterns humans miss, running computer vision at the edge without melting a raspberry pi. practical ML, zero buzzword fluff. if it doesn't make the product measurably better, we don't ship it. full stop.",
    accent: ["#ec4899", "#f43f5e"],
    tag: "AI / ML",
    href: "/services#ai",
    pattern: "wave",
    number: "04",
  },
  {
    icon: "🔒",
    title: "Security & DevOps",
    desc: "CI/CD, containers, TLS everywhere — ships fast, stays secure, doesn't become a headline.",
    longDesc: "docker, github actions, MQTT over TLS, VPN-tunnelled device fleets. security isn't a checkbox we bolt on at the end — it's baked in from commit one. auto-deploying pipelines, reproducible infra, devices that can't be trivially owned. you get ship speed and sleep quality. both. not one or the other.",
    accent: ["#f59e0b", "#f97316"],
    tag: "DevOps",
    href: "/services#devops",
    pattern: "hex",
    number: "05",
  },
] as const;

/* ─────────────────────────────────────────
   SVG micro-patterns
───────────────────────────────────────── */
function PatternCircuit({ color }: { color: string }) {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
      <defs>
        <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M10 0v10h10v10H10v10" stroke={color} strokeWidth="0.8" fill="none" />
          <circle cx="10" cy="10" r="1.5" fill={color} />
          <circle cx="20" cy="20" r="1.5" fill={color} />
          <path d="M30 0v20h-10" stroke={color} strokeWidth="0.8" fill="none" />
          <circle cx="30" cy="20" r="1.5" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  );
}
function PatternGrid({ color }: { color: string }) {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, opacity: 0.055 }}>
      <defs>
        <pattern id="grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0v24" stroke={color} strokeWidth="0.6" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}
function PatternDots({ color }: { color: string }) {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, opacity: 0.07 }}>
      <defs>
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}
function PatternWave({ color }: { color: string }) {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, opacity: 0.06 }}>
      <defs>
        <pattern id="wave" x="0" y="0" width="60" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 C15 0,45 0,60 10 C75 20,105 20,120 10" stroke={color} strokeWidth="0.7" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wave)" />
    </svg>
  );
}
function PatternHex({ color }: { color: string }) {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, opacity: 0.055 }}>
      <defs>
        <pattern id="hex" x="0" y="0" width="30" height="26" patternUnits="userSpaceOnUse">
          <polygon points="15,1 28,8 28,18 15,25 2,18 2,8" stroke={color} strokeWidth="0.7" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex)" />
    </svg>
  );
}

const patterns: Record<string, (c: string) => ReactElement> = {
  circuit: (c) => <PatternCircuit color={c} />,
  grid:    (c) => <PatternGrid    color={c} />,
  dots:    (c) => <PatternDots    color={c} />,
  wave:    (c) => <PatternWave    color={c} />,
  hex:     (c) => <PatternHex     color={c} />,
};

/* ─────────────────────────────────────────
   useInView
───────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─────────────────────────────────────────
   Single card component
───────────────────────────────────────── */
type CardSize = "feature" | "tall" | "normal";

function ExpertiseCard({
  item,
  size = "normal",
  delay = 0,
  visible,
  animateByGsap = false,
}: {
  item: (typeof highlights)[number];
  size?: CardSize;
  delay?: number;
  visible: boolean;
  animateByGsap?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [mouseLocal, setMouseLocal] = useState({ x: 50, y: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent) {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouseLocal({
      x: ((e.clientX - r.left) / r.width)  * 100,
      y: ((e.clientY - r.top)  / r.height) * 100,
    });
  }

  const [from, to] = item.accent;
  const isFeature = size === "feature";
  const isTall    = size === "tall";
  const isStage   = animateByGsap;

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      style={{
        opacity:    animateByGsap ? 1 : (visible ? 1 : 0),
        transform:  animateByGsap ? "none" : (visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)"),
        transition: animateByGsap ? "none" : `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(.2,.8,.4,1) ${delay}ms`,
        height: "100%",
      }}
    >
      <a
        href={item.href}
        className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-sm h-full group"
        style={{
          boxShadow: hovered
            ? `0 0 0 1px ${from}55, 0 24px 60px -12px ${from}30, inset 0 0 80px 0 ${from}08`
            : "none",
          transition: "box-shadow 0.4s ease",
          padding: isStage ? "1.8rem 1.8rem 2.4rem 1.8rem" : (isFeature ? "clamp(1.5rem,3vw,2.25rem)" : "1.5rem"),
          minHeight: isStage ? "clamp(460px,68vh,700px)" : (isFeature ? "clamp(300px,38vw,460px)" : isTall ? "200px" : "180px"),
        }}
      >
        {/* Background pattern */}
        <div className="pointer-events-none">
          {patterns[item.pattern](from)}
        </div>

        {/* Spotlight radial follow */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(320px circle at ${mouseLocal.x}% ${mouseLocal.y}%, ${from}18 0%, transparent 65%)`,
          }}
        />

        {/* Glow orb top-right */}
        <div
          className="pointer-events-none absolute -right-8 -top-8 rounded-full transition-all duration-500"
          style={{
            width:  isFeature ? "200px" : "140px",
            height: isFeature ? "200px" : "140px",
            background: `radial-gradient(circle, ${from}30 0%, transparent 70%)`,
            filter: "blur(32px)",
            opacity: hovered ? 1 : 0.5,
            transform: hovered ? "scale(1.3)" : "scale(1)",
          }}
        />

        {/* Scan-line shimmer on hover */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
          style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}
        >
          <div
            style={{
              position: "absolute",
              top: "-100%",
              left: 0,
              right: 0,
              height: "200%",
              background: `linear-gradient(180deg, transparent 0%, ${from}0a 48%, ${from}16 50%, ${from}0a 52%, transparent 100%)`,
              animation: hovered ? "scanDown 1.6s ease-in-out" : "none",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">

          {/* Number + tag row */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="font-mono text-xs font-bold tracking-widest"
              style={{ color: `${from}88` }}
            >
              {item.number}
            </span>
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
              style={{
                background: `linear-gradient(135deg, ${from}22, ${to}18)`,
                border: `1px solid ${from}35`,
                color: from,
              }}
            >
              {item.tag}
            </span>
          </div>

          {/* Icon */}
          <div
            className="mt-5 flex items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
            style={{
              width:      isFeature ? "clamp(56px,8vw,76px)" : "52px",
              height:     isFeature ? "clamp(56px,8vw,76px)" : "52px",
              fontSize:   isFeature ? "clamp(1.6rem,3vw,2.2rem)" : "1.5rem",
              background: `linear-gradient(135deg, ${from}20, ${to}12)`,
              border:     `1px solid ${from}30`,
              boxShadow:  hovered ? `0 0 24px 0 ${from}30` : "none",
              transition: "box-shadow 0.4s ease",
            }}
          >
            {item.icon}
          </div>

          {/* Title */}
          <h3
            className="mt-4 font-extrabold leading-tight text-white"
            style={{ fontSize: isStage ? "clamp(1.35rem,2.2vw,1.75rem)" : (isFeature ? "clamp(1.2rem,2.5vw,1.65rem)" : "1rem") }}
          >
            {item.title}
          </h3>

          {/* Desc */}
          <p
            className="mt-2 leading-relaxed text-zinc-400"
            style={{ fontSize: isStage ? "0.95rem" : (isFeature ? "0.9rem" : "0.78rem") }}
          >
            {isFeature ? item.longDesc : item.desc}
          </p>

          {/* View more arrow */}
          <div
            className="mt-auto pt-5 flex items-center gap-1.5 text-xs font-semibold transition-all duration-300"
            style={{
              color: from,
              opacity: hovered ? 1 : 0.6,
              transform: hovered ? "translateX(4px)" : "translateX(0)",
            }}
          >
            View more
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-500"
          style={{
            background: `linear-gradient(to right, transparent, ${from}, ${to}, transparent)`,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scaleX(1)" : "scaleX(0.4)",
            transformOrigin: "center",
          }}
        />

        {/* Watermark */}
        <div
          className="pointer-events-none absolute -bottom-3 -right-3 select-none leading-none transition-all duration-500"
          style={{
            fontSize: isFeature ? "8rem" : "5.5rem",
            opacity: hovered ? 0.07 : 0.03,
            transform: hovered ? "scale(1.1) rotate(-6deg)" : "scale(1) rotate(-6deg)",
            filter: `drop-shadow(0 0 20px ${from})`,
          }}
        >
          {item.icon}
        </div>
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main export
───────────────────────────────────────── */
export function ExpertiseCards() {
  const { ref, visible } = useInView(0.1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  const prefersReduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    if (prefersReduced) return;
    const wrapEl = wrapRef.current;
    const stageEl = stageRef.current;
    if (!wrapEl || !stageEl) return;

    gsap.registerPlugin(ScrollTrigger);

    const cards = cardWrapRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      const applyState = (activeIdx: number) => {
        cards.forEach((el, idx) => {
          const isActive = idx === activeIdx;
          const rel = idx - activeIdx; // negative = old cards, positive = upcoming cards
          const distance = Math.abs(rel);
          const clamped = Math.min(distance, 4);

          gsap.to(el, {
            // Previous cards fan to the left; next cards fan to the right.
            x: isActive ? 0 : (rel < 0 ? -(120 + clamped * 26) : (82 + clamped * 20)),
            y: isActive ? 0 : (24 + clamped * 14),
            rotate: isActive ? 0 : (rel < 0 ? -(8 + clamped * 1.3) : (5 + clamped * 1.1)),
            scale: isActive ? 1.02 : Math.max(0.84, 0.96 - clamped * 0.03),
            // Keep all 5 cards visible as stacked layers.
            opacity: isActive ? 1 : Math.max(0.08, 0.24 - clamped * 0.04),
            filter: isActive ? "blur(0px) brightness(1)" : "blur(1.8px) brightness(0.6)",
            zIndex: isActive ? 40 : Math.max(10, 30 - clamped * 5),
            duration: 0.72,
            ease: "power3.out",
          });

          gsap.to(el, {
            boxShadow: isActive
              ? "0 0 0 1px rgba(255,255,255,0.08), 0 26px 70px -22px rgba(0,0,0,0.7)"
              : "0 10px 30px -24px rgba(0,0,0,0.7)",
            duration: 0.72,
            ease: "power3.out",
          });
        });
      };

      // Set starting state and make first card visible immediately.
      gsap.set(cards, {
        x: 0,
        y: 64,
        rotate: 4,
        scale: 0.92,
        opacity: 0,
        filter: "blur(8px)",
        transformOrigin: "50% 50%",
        willChange: "transform, filter, opacity",
      });

      // Pin stage at its natural position (under title), then switch cards while scrolling.
      ScrollTrigger.create({
        trigger: stageEl,
        start: "top top+=140",
        end: () => `+=${Math.max(1, cards.length - 1) * 260}`,
        pin: stageEl,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => {
          const hold = 0.16; // keep first card visible at pin start
          const normalized = Math.max(0, (self.progress - hold) / (1 - hold));
          const idx = Math.min(cards.length - 1, Math.floor(normalized * cards.length));
          applyState(idx);
        },
      });

      // Default active card (prevents blank/black stage).
      applyState(0);
    }, stageEl);

    return () => ctx.revert();
  }, [isDesktop, prefersReduced]);

  return (
    <section ref={ref} className="relative space-y-10 overflow-x-clip pb-8 mb-10 border-b border-white/10">
      <style>{`
        @keyframes scanDown {
          0%   { top: -100%; }
          100% { top: 100%;  }
        }
      `}</style>

      {/* ── Header ── */}
      <div
        className="space-y-3 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)" }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-cyan-400">
          Core Expertise
        </div>
        <h2
          className="font-extrabold tracking-tight text-white"
          style={{ fontSize: "clamp(2rem,5vw,3.25rem)" }}
        >
          What We Build
        </h2>
        <p className="max-w-2xl text-sm text-zinc-500 sm:text-base">
          End-to-end capability across hardware, software, mobile, AI, and infrastructure.
        </p>
      </div>

      {/* Desktop: pinned stage + scroll track (goned-style). Mobile: keep grid. */}
      {isDesktop && !prefersReduced ? (
        <div ref={wrapRef} className="relative">
          {/* Pinned stage */}
          <div
            ref={stageRef}
            className="relative z-10 mx-auto max-w-6xl"
            style={{
              height: "clamp(520px, 70vh, 760px)",
              perspective: "1200px",
            }}
          >
            {highlights.map((item, idx) => (
              <div
                key={item.title}
                ref={(el) => {
                  cardWrapRefs.current[idx] = el;
                }}
                className="absolute left-1/2 top-6 w-[min(420px,86%)] -translate-x-1/2"
              >
                <ExpertiseCard item={item} size="normal" visible={true} animateByGsap />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {/* Card 1 — Feature card */}
          <div className="md:row-span-2 md:col-span-1">
            <ExpertiseCard item={highlights[0]} size="feature" delay={0} visible={visible} />
          </div>

          {/* Cards 2-5 */}
          <div className="grid grid-cols-2 gap-4 md:contents">
            {highlights.slice(1).map((item, i) => (
              <div key={item.title} className="md:col-span-1">
                <ExpertiseCard item={item} size="normal" delay={(i + 1) * 80} visible={visible} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}