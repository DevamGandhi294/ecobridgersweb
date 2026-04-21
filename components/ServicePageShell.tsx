"use client";

import { useEffect, useRef, useState, memo } from "react";

/* ─────────────────────────────────────────
   useInView — scroll-triggered reveal
───────────────────────────────────────── */
export function useInView(threshold = 0.12) {
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
   SectionBadge
───────────────────────────────────────── */
export const SectionBadge = memo(function SectionBadge({
  color = "emerald",
  children,
}: {
  color?: "emerald" | "cyan" | "violet" | "pink" | "amber" | "teal" | "blue" | "rose";
  children: string;
}) {
  const map: Record<string, { border: string; text: string; bg: string }> = {
    emerald: { border: "border-emerald-500/30", text: "text-emerald-400", bg: "rgba(16,185,129,0.08)"  },
    cyan:    { border: "border-cyan-500/30",    text: "text-cyan-400",    bg: "rgba(6,182,212,0.08)"   },
    violet:  { border: "border-violet-500/30",  text: "text-violet-400",  bg: "rgba(139,92,246,0.08)"  },
    pink:    { border: "border-pink-500/30",    text: "text-pink-400",    bg: "rgba(236,72,153,0.08)"  },
    amber:   { border: "border-amber-500/30",   text: "text-amber-400",   bg: "rgba(245,158,11,0.08)"  },
    teal:    { border: "border-teal-500/30",    text: "text-teal-400",    bg: "rgba(20,184,166,0.08)"  },
    blue:    { border: "border-blue-500/30",    text: "text-blue-400",    bg: "rgba(59,130,246,0.08)"  },
    rose:    { border: "border-rose-500/30",    text: "text-rose-400",    bg: "rgba(244,63,94,0.08)"   },
  };
  const s = map[color];
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${s.border} ${s.text}`}
      style={{ background: s.bg, fontFamily: "var(--font-display)" }}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full opacity-75"
          style={{ background: "currentColor", animation: "ping-dot 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "currentColor" }} />
      </span>
      {children}
    </div>
  );
});

/* ─────────────────────────────────────────
   ParallaxOrbs — zero re-renders
───────────────────────────────────────── */
export const ParallaxOrbs = memo(function ParallaxOrbs({
  color1 = "rgba(16,185,129,.18)",
  color2 = "rgba(6,182,212,.14)",
  color3 = "rgba(139,92,246,.10)",
}: {
  color1?: string;
  color2?: string;
  color3?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x  = (e.clientX / window.innerWidth  - 0.5) * 28;
      const y  = (e.clientY / window.innerHeight - 0.5) * 18;
      const el = ref.current;
      if (!el) return;
      (el.children[0] as HTMLElement).style.transform = `translate(${x * 0.6}px,${y * 0.4}px)`;
      (el.children[1] as HTMLElement).style.transform = `translate(${-x * 0.5}px,${-y * 0.3}px)`;
      (el.children[2] as HTMLElement).style.transform = `translate(${x * 0.3}px,${y * 0.5}px)`;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return (
    <div ref={ref} style={{ position:"absolute",zIndex:2,inset:0,pointerEvents:"none" }} aria-hidden>
      <div style={{ position:"absolute",top:"12%",left:"6%",width:"clamp(260px,36vw,500px)",height:"clamp(260px,36vw,500px)",borderRadius:"50%",background:`radial-gradient(circle,${color1} 0%,transparent 70%)`,filter:"blur(48px)",transition:"transform 0.6s cubic-bezier(.2,.8,.4,1)",willChange:"transform" }} />
      <div style={{ position:"absolute",bottom:"8%",right:"4%",width:"clamp(180px,26vw,380px)",height:"clamp(180px,26vw,380px)",borderRadius:"50%",background:`radial-gradient(circle,${color2} 0%,transparent 70%)`,filter:"blur(56px)",transition:"transform 0.7s cubic-bezier(.2,.8,.4,1)",willChange:"transform" }} />
      <div style={{ position:"absolute",top:"52%",left:"52%",width:"clamp(100px,14vw,220px)",height:"clamp(100px,14vw,220px)",borderRadius:"50%",background:`radial-gradient(circle,${color3} 0%,transparent 70%)`,filter:"blur(40px)",transition:"transform 0.8s cubic-bezier(.2,.8,.4,1)",willChange:"transform" }} />
    </div>
  );
});

/* ─────────────────────────────────────────
   ServiceHero
───────────────────────────────────────── */
export function ServiceHero({
  accent,
  accentColor,
  badge,
  badgeColor = "emerald",
  icon,
  title,
  subtitle,
  gridColor,
  children,
}: {
  accent: string;
  accentColor: string;
  badge: string;
  badgeColor?: "emerald" | "cyan" | "violet" | "pink" | "amber" | "teal" | "blue" | "rose";
  icon: string;
  title: React.ReactNode;
  subtitle: string;
  gridColor: string;
  children?: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section
      style={{
        position:"relative", left:"50%", right:"50%",
        marginLeft:"-50vw", marginRight:"-50vw",
        width:"100vw", minHeight:"clamp(520px, 78vh, 860px)",
      }}
      className="flex items-center overflow-hidden border-b border-white/10 pt-20 pb-8"
    >
      {/* Background */}
      <div style={{ position:"absolute",inset:0,zIndex:0 }}>
        <div style={{
          position:"absolute",inset:0,
          background:`radial-gradient(ellipse 80% 60% at 20% 40%,${accentColor}22 0%,transparent 60%),
                      radial-gradient(ellipse 60% 50% at 80% 70%,${accentColor}14 0%,transparent 55%),
                      linear-gradient(135deg,#050709 0%,#080e0b 50%,#040810 100%)`,
          animation:"hero-bg-pulse 8s ease-in-out infinite",
        }} />
      </div>
      <div style={{ position:"absolute",inset:0,zIndex:1,background:"rgba(4,6,9,0.55)",backdropFilter:"blur(2px)" }} />
      <div style={{ position:"absolute",inset:0,zIndex:2,opacity:0.022,pointerEvents:"none",
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
      }} />
      <div style={{ position:"absolute",inset:0,zIndex:3,opacity:0.03,pointerEvents:"none",
        backgroundImage:`linear-gradient(to right,${gridColor} 1px,transparent 1px),linear-gradient(to bottom,${gridColor} 1px,transparent 1px)`,
        backgroundSize:"68px 68px"
      }} />
      <div className="hero-scan-line" style={{ "--scan-color": gridColor } as React.CSSProperties} />
      <ParallaxOrbs color1={`${accentColor}28`} color2={`${accentColor}18`} color3={`${accentColor}10`} />

      {/* Content */}
      <div style={{ position:"relative",zIndex:10,width:"100%" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">

            {/* Left */}
            <div className="space-y-6">
              <div
                className="transition-all duration-700"
                style={{ opacity: ready ? 1 : 0, transform: ready ? "translateY(0) scale(1)" : "translateY(-14px) scale(.95)" }}
              >
                <SectionBadge color={badgeColor}>{badge}</SectionBadge>
              </div>

              <div
                className="transition-all duration-700 delay-100"
                style={{
                  opacity: ready ? 1 : 0,
                  transform: ready ? "translateY(0)" : "translateY(20px)",
                  animation: ready ? "bob 5s ease-in-out infinite 1s" : "none",
                  display: "inline-block",
                  fontSize: "clamp(3.5rem,8vw,5.5rem)",
                  lineHeight: 1,
                  filter: `drop-shadow(0 0 24px ${accentColor}66)`,
                }}
              >
                {icon}
              </div>

              <h1
                className="font-extrabold leading-[1.04] tracking-tight text-white transition-all duration-700 delay-150"
                style={{
                  fontSize: "clamp(2rem,5.5vw,3.8rem)",
                  fontFamily: "var(--font-display)",
                  opacity: ready ? 1 : 0,
                  transform: ready ? "translateY(0)" : "translateY(24px)",
                  willChange: "transform,opacity",
                  animation: ready ? "text-flicker 14s ease-in-out infinite 3s" : "none",
                }}
              >
                {title}
              </h1>

              <p
                className="text-base leading-relaxed text-zinc-300 transition-all duration-700 delay-300 sm:text-lg"
                style={{
                  fontFamily: "var(--font-body)",
                  opacity: ready ? 1 : 0,
                  transform: ready ? "translateY(0)" : "translateY(16px)",
                  maxWidth: "32rem",
                }}
              >
                {subtitle}
              </p>

              {/* CTAs */}
              <div
                className="flex flex-wrap gap-3 pt-2 transition-all duration-700 delay-[400ms]"
                style={{ opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(14px)" }}
              >
                <a
                  href="#inquiry"
                  className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r ${accent} px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.04] hover:shadow-xl`}
                  style={{ fontFamily:"var(--font-display)", boxShadow:`0 8px 32px ${accentColor}44` }}
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  get a free quote →
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/25"
                  style={{ fontFamily:"var(--font-display)" }}
                >
                  all services
                </a>
              </div>
            </div>

            {/* Right */}
            <div
              className="transition-all duration-700 delay-500"
              style={{ opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(28px)" }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   OfferingCard
───────────────────────────────────────── */
export function OfferingCard({
  icon, title, desc, accentColor, borderColor,
}: {
  icon: string; title: string; desc: string;
  accentColor: string; borderColor: string;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm transition-all duration-400 hover:-translate-y-1 hover:bg-zinc-900/90"
      style={{ "--accent": accentColor } as React.CSSProperties}
    >
      <div className="absolute top-0 left-0 right-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: `linear-gradient(to right, transparent, ${accentColor}80, transparent)` }} />
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-all duration-300 group-hover:scale-150"
        style={{ background: `${accentColor}18` }} />
      <div className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full"
        style={{ background: `linear-gradient(to right, ${accentColor}, ${accentColor}80)` }} />

      <div className="relative">
        <div className="text-3xl">{icon}</div>
        <h3 className="mt-4 text-base font-bold text-white" style={{ fontFamily:"var(--font-display)" }}>{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>{desc}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   OfferShowcaseCard
───────────────────────────────────────── */
export function OfferShowcaseCard({
  items,
  accentColor,
  imageSrc,
  imageAlt,
  isActive = true,
}: {
  items: Array<{ icon: string; title: string; desc: string }>;
  accentColor: string;
  imageSrc: string;
  imageAlt: string;
  isActive?: boolean;
}) {
  const primaryItems = items.slice(0, 4);
  const monoIcon = (i: number) => {
    const icons = [
      (
        <svg viewBox="0 0 24 24" className="block h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="5" width="16" height="12" rx="2" />
          <path d="M8 19h8" />
        </svg>
      ),
      (
        <svg viewBox="0 0 24 24" className="block h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      ),
      (
        <svg viewBox="0 0 24 24" className="block h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v6" />
          <path d="M12 15v6" />
          <path d="M5.6 6.2l4.2 2.4" />
          <path d="M14.2 15.4l4.2 2.4" />
          <path d="M18.4 6.2l-4.2 2.4" />
          <path d="M9.8 15.4l-4.2 2.4" />
          <circle cx="12" cy="12" r="2.4" />
        </svg>
      ),
      (
        <svg viewBox="0 0 24 24" className="block h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 7v5l3 3" />
        </svg>
      ),
    ];
    return icons[i % icons.length];
  };

  return (
    <div
      className="overflow-hidden rounded-[28px] border border-zinc-200/90 bg-white p-3 shadow-[0_10px_35px_rgba(0,0,0,0.18)] sm:p-4"
      style={{
        opacity: isActive ? 1 : 0,
        transform: isActive ? "perspective(1200px) rotateX(0deg) translateY(0) scale(1)" : "perspective(1200px) rotateX(14deg) translateY(50px) scale(0.96)",
        filter: isActive ? "blur(0px)" : "blur(5px)",
        transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 900ms cubic-bezier(0.22,1,0.36,1), filter 700ms ease",
      }}
    >
      <style>{`
        @keyframes offer-shine-pass {
          0%   { transform: translateX(-120%) skewX(-20deg); opacity: 0; }
          20%  { opacity: .45; }
          100% { transform: translateX(240%) skewX(-20deg); opacity: 0; }
        }
      `}</style>
      {isActive && (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          style={{ animation: "offer-shine-pass 1200ms ease-out 120ms 1 both" }}
        />
      )}
      <div className="grid gap-3 lg:grid-cols-12">
        {/* Left content list */}
        <div
          className="rounded-2xl border border-zinc-200 bg-zinc-100 p-4 sm:p-5 lg:col-span-7"
          style={{ color: "#111827" }}
        >
          <div className="space-y-3">
            {primaryItems.map((item, i) => (
              <div
                key={item.title}
                className="grid grid-cols-[34px_1fr] items-start gap-3 border-b border-zinc-300/80 pb-3 last:border-b-0 last:pb-0"
              >
                <div className="relative h-8 w-8 shrink-0 self-center rounded-full border border-zinc-400 bg-white text-zinc-700">
                  <span className="absolute inset-0 m-auto flex h-[14px] w-[14px] items-center justify-center leading-none">
                    {monoIcon(i)}
                  </span>
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-bold leading-tight text-zinc-900" style={{ fontFamily: "var(--font-display)" }}>
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-600" style={{ fontFamily: "var(--font-body)" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right visual panel */}
        <div
          className="relative overflow-hidden rounded-2xl border border-white/15 lg:col-span-5"
          style={{
            background: `linear-gradient(145deg, ${accentColor}, ${accentColor}e6)`,
            minHeight: "320px",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.26),transparent_45%)]" />
          <div className="relative z-10 p-4 sm:p-5">
            <div className="overflow-hidden rounded-xl border border-white/35 bg-white/10">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-[300px] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ProcessCard
───────────────────────────────────────── */
export function ProcessCard({
  step, title, desc, accentColor,
}: {
  step: string; title: string; desc: string; accentColor: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:bg-white/[0.06]"
      style={{ borderColor: "transparent" }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}50`)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "transparent")}
    >
      <div className="text-5xl font-black transition-all duration-300 group-hover:scale-110"
        style={{ fontFamily:"var(--font-display)", color:`${accentColor}22` }}>
        {step}
      </div>
      <h3 className="mt-2 text-base font-bold text-white" style={{ fontFamily:"var(--font-display)" }}>{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>{desc}</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   CreationProcessTimeline (horizontal)
───────────────────────────────────────── */
export function CreationProcessTimeline({
  steps,
  accentColor,
}: {
  steps: Array<{ step: string; title: string; desc: string }>;
  accentColor: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const streamGradients = [
    "linear-gradient(90deg,#7bb6f8 0%,#9fd2ff 100%)",
    "linear-gradient(90deg,#6fa9f3 0%,#7ed6f7 100%)",
    "linear-gradient(90deg,#6fc9ef 0%,#7fe7d5 100%)",
    "linear-gradient(90deg,#7fdabf 0%,#9ae49f 100%)",
    "linear-gradient(90deg,#9ee08f 0%,#d4e883 100%)",
    "linear-gradient(90deg,#d7e37f 0%,#ff9061 100%)",
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/50 p-6 sm:p-8 backdrop-blur-sm">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative" onMouseLeave={() => setActive(null)}>
        {/* No horizontal scroll: all steps visible like reference */}
        <div
          className="relative grid divide-x divide-white/30"
          style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
        >
          <div className="pointer-events-none absolute left-0 top-[-14px] bottom-[-14px] w-px bg-white/35" aria-hidden />
          {steps.map((s, idx) => {
            const isActive = idx === active;
            const isUpperRow = idx % 2 === 0;
            return (
              <button
                key={s.step}
                type="button"
                onMouseEnter={() => setActive(idx)}
                onFocus={() => setActive(idx)}
                onClick={() => setActive(idx)}
                className="relative min-h-[190px] px-3 py-2 text-left outline-none sm:px-4"
              >
                {idx < steps.length - 1 ? (
                  <div className="pointer-events-none absolute right-0 top-[-14px] bottom-[-14px] w-px bg-white/35" aria-hidden />
                ) : null}
                <div className={isUpperRow ? "pt-0" : "pt-8"}>
                  <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    STEP #{s.step}
                  </div>

                  <div
                    className="text-sm font-semibold text-white/90"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.title}
                  </div>

                <div className="mt-4 -mx-3 sm:-mx-4">
                    <div
                      className="relative h-6 w-full rounded-full"
                      style={{
                          background: streamGradients[idx % streamGradients.length],
                        opacity: isActive ? 1 : 0.78,
                        filter: isActive ? "saturate(1.1)" : "saturate(0.98)",
                        transition: "opacity 250ms ease, filter 250ms ease",
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          boxShadow: isActive ? `0 10px 26px -14px ${accentColor}aa` : "none",
                          transition: "box-shadow 250ms ease",
                        }}
                      />

                      {/* plus centered on the pill */}
                      <div
                        className="absolute inset-0 m-auto flex h-6 w-6 items-center justify-center rounded-full border border-black/15 bg-white text-black shadow-[0_8px_18px_rgba(0,0,0,0.22)]"
                        aria-hidden
                      >
                        <span className="relative block h-[10px] w-[10px]">
                          <span className="absolute left-1/2 top-1/2 h-[2px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80" />
                          {!isActive ? (
                            <span className="absolute left-1/2 top-1/2 h-[10px] w-[2px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80" />
                          ) : null}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Hover detail dialog */}
        {active !== null ? (
          <div className="relative mt-4 h-64">
            <div
              className="absolute top-0 w-[min(340px,88%)] min-h-[250px] -translate-x-1/2 rounded-[26px] border border-black/10 bg-zinc-100 px-7 py-9 text-center shadow-[0_20px_55px_rgba(0,0,0,0.25)]"
              style={{ left: `${((active + 0.5) / steps.length) * 100}%` }}
            >
              <div className="absolute -top-3 left-1/2 h-0 w-0 -translate-x-1/2 border-l-[10px] border-r-[10px] border-b-[12px] border-l-transparent border-r-transparent border-b-zinc-100" />
              <p className="text-[33px] font-bold leading-none text-zinc-900" style={{ fontFamily: "var(--font-display)" }}>
                {steps[active].step}
              </p>
              <p className="mt-3 text-lg font-bold text-zinc-900" style={{ fontFamily: "var(--font-display)" }}>
                {steps[active].title}
              </p>
              <p className="mt-3 text-base leading-relaxed text-zinc-600" style={{ fontFamily: "var(--font-body)" }}>
                {steps[active].desc}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   UseCaseCard
───────────────────────────────────────── */
export function UseCaseCard({
  icon, label, accentColor,
}: {
  icon: string; label: string; accentColor: string;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/55 p-5 sm:p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-zinc-900/80"
      onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}45`)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "")}
      style={{ minHeight: "210px" }}
    >
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: `linear-gradient(to right, transparent, ${accentColor}a0, transparent)` }} />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 22% 15%, ${accentColor}24 0%, transparent 55%)` }} />

      <div className="relative mx-auto mb-6 h-[60px] w-[92px] -rotate-[36deg] rounded-full border"
        style={{
          background: `linear-gradient(155deg, ${accentColor}, ${accentColor}cc)`,
          borderColor: `${accentColor}66`,
          boxShadow: `inset 0 4px 10px rgba(255,255,255,0.12), 0 0 22px ${accentColor}45`,
        }}
      >
        <div
          className="absolute left-1/2 top-[9px] flex h-11.5 w-11.5 -translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0c0c12] text-white shadow-[0_8px_20px_rgba(0,0,0,0.55)] transition-all duration-500 group-hover:top-[2px]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="rotate-[18deg] transition-transform duration-500 group-hover:scale-105"
          >
            <path d="M7 17L17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </div>
      </div>

      <div className="relative flex h-[calc(100%-92px)] flex-col items-start justify-end">
        <div className="mb-2 text-base leading-none opacity-85">{icon}</div>
        <span className="text-[clamp(1.1rem,2.2vw,1.95rem)] font-medium leading-[1.05] tracking-tight text-zinc-100" style={{ fontFamily:"var(--font-display)" }}>
          {label}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PlatformBenefitsGrid (13g-style)
───────────────────────────────────────── */
export function PlatformBenefitsGrid({
  title,
  subtitle,
  items,
  accentColor,
}: {
  title: string;
  subtitle?: string;
  items: Array<{ title: string; desc?: string }>;
  accentColor: string;
}) {
  const shown = items.slice(0, 6);

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2
          className="font-extrabold tracking-tight text-white"
          style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
        >
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
            {subtitle}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((it) => (
          <div
            key={it.title}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-zinc-900/85"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${accentColor}45`)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `radial-gradient(circle at 22% 15%, ${accentColor}22 0%, transparent 55%)` }}
            />
            <div
              className="pointer-events-none absolute left-0 right-0 top-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ background: `linear-gradient(to right, transparent, ${accentColor}a0, transparent)` }}
            />

            <div
              className="relative mb-8 h-[60px] w-[92px] -rotate-[36deg] rounded-full border"
              style={{
                background: `linear-gradient(155deg, ${accentColor}, ${accentColor}cc)`,
                borderColor: `${accentColor}66`,
                boxShadow: `inset 0 4px 10px rgba(255,255,255,0.12), 0 0 22px ${accentColor}45`,
              }}
            >
              <div className="absolute left-1/2 top-[9px] flex h-11.5 w-11.5 -translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0c0c12] text-white shadow-[0_8px_20px_rgba(0,0,0,0.55)] transition-all duration-500 group-hover:top-[2px]">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="rotate-[18deg] transition-transform duration-500 group-hover:scale-105"
                >
                  <path d="M7 17L17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </div>
            </div>

            <div className="relative space-y-2">
              <h3
                className="text-[clamp(1.35rem,2.6vw,1.9rem)] font-medium leading-[1.05] tracking-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {it.title}
              </h3>
              {it.desc ? (
                <p className="text-sm leading-relaxed text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
                  {it.desc}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   TechBadge
───────────────────────────────────────── */
export function TechBadge({ label, accentColor }: { label: string; accentColor: string }) {
  return (
    <span
      className="inline-flex items-center rounded-xl border px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-all duration-200 hover:scale-105"
      style={{
        borderColor: `${accentColor}30`,
        background:  `${accentColor}08`,
        color:       accentColor,
        fontFamily:  "var(--font-display)",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${accentColor}16`; (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}50`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${accentColor}08`; (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}30`; }}
    >
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────
   InquiryForm
───────────────────────────────────────── */
export function InquiryForm({
  accentGradient,
  accentColor,
  focusColor,
  serviceDefault,
}: {
  accentGradient: string;
  accentColor: string;
  focusColor: string;
  serviceDefault?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 900);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-14 text-center">
        <div className="relative">
          <div className="text-6xl" style={{ filter:`drop-shadow(0 0 20px ${accentColor}88)` }}>✅</div>
          <div className="absolute inset-0 rounded-full blur-xl animate-pulse" style={{ background:`${accentColor}22` }} />
        </div>
        <h3 className="text-xl font-bold text-white" style={{ fontFamily:"var(--font-display)" }}>
          you&apos;re in. we&apos;ll take it from here.
        </h3>
        <p className="text-sm text-zinc-400 max-w-xs" style={{ fontFamily:"var(--font-body)" }}>
          we&apos;ve got your details. expect a real response — not an autoresponder — within 24 hours.
        </p>
      </div>
    );
  }

  const inputCls = `w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all outline-none`;

  return (
    <div className="space-y-3" id="inquiry">
      <div className="grid gap-3 sm:grid-cols-2">
        <input type="text"  placeholder="your name *"         className={inputCls} style={{ fontFamily:"var(--font-body)" }}
          onFocus={e => { e.target.style.borderColor=`${accentColor}60`; e.target.style.boxShadow=`0 0 0 1px ${accentColor}30`; }}
          onBlur={e  => { e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.boxShadow="none"; }} />
        <input type="email" placeholder="your email *"        className={inputCls} style={{ fontFamily:"var(--font-body)" }}
          onFocus={e => { e.target.style.borderColor=`${accentColor}60`; e.target.style.boxShadow=`0 0 0 1px ${accentColor}30`; }}
          onBlur={e  => { e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.boxShadow="none"; }} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input type="tel"  placeholder="phone (optional)"     className={inputCls} style={{ fontFamily:"var(--font-body)" }}
          onFocus={e => { e.target.style.borderColor=`${accentColor}60`; e.target.style.boxShadow=`0 0 0 1px ${accentColor}30`; }}
          onBlur={e  => { e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.boxShadow="none"; }} />
        <input type="text" placeholder="company / project"    className={inputCls} style={{ fontFamily:"var(--font-body)" }}
          onFocus={e => { e.target.style.borderColor=`${accentColor}60`; e.target.style.boxShadow=`0 0 0 1px ${accentColor}30`; }}
          onBlur={e  => { e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.boxShadow="none"; }} />
      </div>
      <select
        defaultValue={serviceDefault ?? ""}
        className="w-full rounded-xl border border-white/10 bg-zinc-800/80 px-4 py-3 text-sm text-zinc-300 backdrop-blur-sm transition-all outline-none"
        style={{ fontFamily:"var(--font-body)" }}
        onFocus={e => { e.target.style.borderColor=`${accentColor}60`; e.target.style.boxShadow=`0 0 0 1px ${accentColor}30`; }}
        onBlur={e  => { e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.boxShadow="none"; }}
      >
        <option value="" disabled>what are you building? *</option>
        <option>IoT &amp; Embedded Systems</option>
        <option>Web &amp; Cloud Platforms</option>
        <option>Mobile Applications</option>
        <option>AI-Assisted Solutions</option>
        <option>Prototyping &amp; POC</option>
        <option>Industrial &amp; Custom Solutions</option>
      </select>
      <textarea
        rows={4}
        placeholder="tell us about it — rough idea, half-baked plan, full spec. all welcome. *"
        className={`${inputCls} resize-none`}
        style={{ fontFamily:"var(--font-body)" }}
        onFocus={e => { e.target.style.borderColor=`${accentColor}60`; e.target.style.boxShadow=`0 0 0 1px ${accentColor}30`; }}
        onBlur={e  => { e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.boxShadow="none"; }}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-r ${accentGradient} py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed`}
        style={{ fontFamily:"var(--font-display)", boxShadow:`0 8px 28px ${accentColor}40` }}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 hover:translate-x-full" />
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            sending...
          </span>
        ) : "let's talk →"}
      </button>
      <p className="text-center text-xs text-zinc-600" style={{ fontFamily:"var(--font-body)" }}>
        no spam. no sales scripts. just a real conversation within 24 hours.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   FormCard
───────────────────────────────────────── */
export function FormCard({
  title = "got a project in mind?",
  subtitle = "rough idea or full spec — drop it here. we'll respond within 24 hours.",
  accentColor,
  children,
}: {
  title?: string;
  subtitle?: string;
  accentColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 p-8 backdrop-blur-xl"
      style={{ boxShadow:`0 0 60px ${accentColor}18` }}
    >
      <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full blur-3xl"
        style={{ background:`${accentColor}20` }} />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full blur-3xl"
        style={{ background:`${accentColor}12` }} />

      <div className="relative">
        <h2 className="text-xl font-bold text-white" style={{ fontFamily:"var(--font-display)" }}>{title}</h2>
        <p className="mt-1 mb-6 text-sm text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>{subtitle}</p>
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ServiceCTA
───────────────────────────────────────── */
export function ServiceCTA({
  accentGradient,
  accentColor,
  title,
  subtitle,
  ctaText = "start a conversation →",
  href = "/contact",
}: {
  accentGradient: string;
  accentColor: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  href?: string;
}) {
  const { ref, visible } = useInView();
  return (
    <section
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-white/10 p-8 text-center sm:p-16 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        background:"linear-gradient(135deg,#050709 0%,#080e0b 50%,#040810 100%)",
        animation: visible ? "glow-pulse 4s ease-in-out infinite" : "none",
        boxShadow: visible ? `0 0 80px ${accentColor}18` : "none",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full blur-[120px]"
          style={{ background:`${accentColor}14` }} />
        <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full blur-[120px]"
          style={{ background:`${accentColor}0e` }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage:`linear-gradient(to right,${accentColor}80 1px,transparent 1px),linear-gradient(to bottom,${accentColor}80 1px,transparent 1px)`, backgroundSize:"56px 56px" }} />
        <div className="absolute top-5 right-5 h-20 w-20 rounded-full border opacity-30"
          style={{ borderColor:`${accentColor}30`, animation:"rotate-slow 18s linear infinite" }} />
      </div>

      <div className="relative space-y-6">
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border text-2xl"
          style={{
            borderColor:`${accentColor}30`,
            background:`${accentColor}12`,
            filter:`drop-shadow(0 0 16px ${accentColor}44)`,
            animation:"bob 4s ease-in-out infinite",
          }}
        >
          🛠️
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: accentColor, fontFamily:"var(--font-display)" }}>
            ready when you are
          </p>
          <h2 className="text-balance font-extrabold tracking-tight text-white"
            style={{ fontSize:"clamp(1.75rem,4.5vw,2.75rem)", fontFamily:"var(--font-display)" }}>
            {title}
          </h2>
        </div>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg"
          style={{ fontFamily:"var(--font-body)" }}>
          {subtitle}
        </p>
        {/* Trust line */}
        <p className="text-xs text-zinc-600" style={{ fontFamily:"var(--font-body)" }}>
          no retainer required · project-based · you own everything we build
        </p>
        <div className="pt-2">
          <a
            href={href}
            className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r ${accentGradient} px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.05] hover:shadow-xl`}
            style={{ fontFamily:"var(--font-display)", boxShadow:`0 8px 32px ${accentColor}44` }}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            {ctaText}
            <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}