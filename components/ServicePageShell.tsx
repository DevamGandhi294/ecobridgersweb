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
   SectionBadge — animated ping dot badge
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
   ServiceHero — full-bleed hero matching homepage
   Props:
     accent      — gradient class e.g. "from-emerald-500 to-teal-500"
     accentColor — raw hex/rgb for glow e.g. "#10b981"
     badge       — pill text
     icon        — emoji
     title       — JSX (allows gradient spans)
     subtitle    — plain string
     badgeColor  — SectionBadge color
     children    — right-side content (form or details)
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
      className="flex items-center overflow-hidden border-b border-white/10 py-16 sm:py-24"
    >
      {/* Plasma-style gradient background */}
      <div style={{ position:"absolute",inset:0,zIndex:0 }}>
        <div style={{
          position:"absolute",inset:0,
          background:`radial-gradient(ellipse 80% 60% at 20% 40%,${accentColor}22 0%,transparent 60%),
                      radial-gradient(ellipse 60% 50% at 80% 70%,${accentColor}14 0%,transparent 55%),
                      linear-gradient(135deg,#050709 0%,#080e0b 50%,#040810 100%)`,
          animation:"hero-bg-pulse 8s ease-in-out infinite",
        }} />
      </div>

      {/* Dark scrim */}
      <div style={{ position:"absolute",inset:0,zIndex:1,background:"rgba(4,6,9,0.55)",backdropFilter:"blur(2px)" }} />

      {/* Noise grain */}
      <div style={{ position:"absolute",inset:0,zIndex:2,opacity:0.022,pointerEvents:"none",
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
      }} />

      {/* Grid texture */}
      <div style={{ position:"absolute",inset:0,zIndex:3,opacity:0.03,pointerEvents:"none",
        backgroundImage:`linear-gradient(to right,${gridColor} 1px,transparent 1px),linear-gradient(to bottom,${gridColor} 1px,transparent 1px)`,
        backgroundSize:"68px 68px"
      }} />

      {/* Scan line */}
      <div className="hero-scan-line" style={{ "--scan-color": gridColor } as React.CSSProperties} />

      {/* Parallax orbs */}
      <ParallaxOrbs
        color1={`${accentColor}28`}
        color2={`${accentColor}18`}
        color3={`${accentColor}10`}
      />

      {/* Content */}
      <div style={{ position:"relative",zIndex:10,width:"100%" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">

            {/* Left — text */}
            <div className="space-y-6">
              {/* Animated badge */}
              <div
                className="transition-all duration-700"
                style={{ opacity: ready ? 1 : 0, transform: ready ? "translateY(0) scale(1)" : "translateY(-14px) scale(.95)" }}
              >
                <SectionBadge color={badgeColor}>{badge}</SectionBadge>
              </div>

              {/* Icon */}
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

              {/* Heading */}
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

              {/* CTA row */}
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
                  Get a Free Quote
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/25"
                  style={{ fontFamily:"var(--font-display)" }}
                >
                  All Services
                </a>
              </div>
            </div>

            {/* Right — form / details */}
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
   OfferingCard — hover scan + glow
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
      {/* Top shimmer on hover */}
      <div className="absolute top-0 left-0 right-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: `linear-gradient(to right, transparent, ${accentColor}80, transparent)` }} />
      {/* Glow blob */}
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-all duration-300 group-hover:scale-150"
        style={{ background: `${accentColor}18` }} />
      {/* Bottom bar */}
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
   ProcessCard — large step number
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
   UseCaseCard
───────────────────────────────────────── */
export function UseCaseCard({
  icon, label, accentColor,
}: {
  icon: string; label: string; accentColor: string;
}) {
  return (
    <div
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/50 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-900/80"
      onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}40`)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "")}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-all duration-300 group-hover:scale-110"
        style={{ background: `linear-gradient(135deg,${accentColor}18,${accentColor}08)` }}>
        {icon}
      </div>
      <span className="text-sm font-semibold text-zinc-200" style={{ fontFamily:"var(--font-display)" }}>{label}</span>
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
   InquiryForm — shared across all service pages
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
        <h3 className="text-xl font-bold text-white" style={{ fontFamily:"var(--font-display)" }}>Request Sent!</h3>
        <p className="text-sm text-zinc-400 max-w-xs" style={{ fontFamily:"var(--font-body)" }}>
          We&apos;ll review your requirements and get back to you within 24 hours.
        </p>
      </div>
    );
  }

  const inputCls = `w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all outline-none`;
  const focusStyle = `focus:border-[${focusColor}]/50 focus:ring-1 focus:ring-[${focusColor}]/30`;

  return (
    <div className="space-y-3" id="inquiry">
      <div className="grid gap-3 sm:grid-cols-2">
        <input type="text"  placeholder="Full Name *"      className={inputCls} style={{ fontFamily:"var(--font-body)" }}
          onFocus={e => { e.target.style.borderColor=`${accentColor}60`; e.target.style.boxShadow=`0 0 0 1px ${accentColor}30`; }}
          onBlur={e  => { e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.boxShadow="none"; }} />
        <input type="email" placeholder="Email Address *"  className={inputCls} style={{ fontFamily:"var(--font-body)" }}
          onFocus={e => { e.target.style.borderColor=`${accentColor}60`; e.target.style.boxShadow=`0 0 0 1px ${accentColor}30`; }}
          onBlur={e  => { e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.boxShadow="none"; }} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input type="tel"  placeholder="Phone Number"  className={inputCls} style={{ fontFamily:"var(--font-body)" }}
          onFocus={e => { e.target.style.borderColor=`${accentColor}60`; e.target.style.boxShadow=`0 0 0 1px ${accentColor}30`; }}
          onBlur={e  => { e.target.style.borderColor="rgba(255,255,255,0.1)"; e.target.style.boxShadow="none"; }} />
        <input type="text" placeholder="Company / Project" className={inputCls} style={{ fontFamily:"var(--font-body)" }}
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
        <option value="" disabled>Select Service *</option>
        <option>IoT &amp; Embedded Systems</option>
        <option>Web &amp; Cloud Platforms</option>
        <option>Mobile Applications</option>
        <option>AI-Assisted Solutions</option>
        <option>Prototyping &amp; POC</option>
        <option>Industrial &amp; Custom Solutions</option>
      </select>
      <textarea
        rows={4}
        placeholder="Describe your project or requirements *"
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
            Sending...
          </span>
        ) : "Submit Request →"}
      </button>
      <p className="text-center text-xs text-zinc-600" style={{ fontFamily:"var(--font-body)" }}>
        No spam. We&apos;ll respond within 24 hours.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   FormCard — glass card wrapping the form
───────────────────────────────────────── */
export function FormCard({
  title = "Request a Free Quote",
  subtitle = "Tell us about your project — we'll respond within 24 hours.",
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
      {/* Corner glow */}
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
   ServiceCTA — final CTA section
───────────────────────────────────────── */
export function ServiceCTA({
  accentGradient,
  accentColor,
  title,
  subtitle,
  ctaText = "Get in Touch",
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
          🚀
        </div>
        <h2 className="text-balance font-extrabold tracking-tight text-white"
          style={{ fontSize:"clamp(1.75rem,4.5vw,2.75rem)", fontFamily:"var(--font-display)" }}>
          {title}
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg"
          style={{ fontFamily:"var(--font-body)" }}>
          {subtitle}
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