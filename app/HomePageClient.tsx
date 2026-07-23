"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, memo, Fragment } from "react";
import { ExpertiseCards } from "../components/Expertisecards";
import { SplashScreen } from "@/components/SplashScreen";

// Structured Data for SEO
/* ─────────────────────────────────────────
   useInView
───────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const targetRef = useCallback((el: HTMLDivElement | null) => {
    setElement(el);
  }, []);
  useEffect(() => {
    if (!element) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(element); return () => obs.disconnect();
  }, [element, threshold]);
  return { targetRef, visible };
}

/* ─────────────────────────────────────────
   Section Badge
───────────────────────────────────────── */
const SectionBadge = memo(function SectionBadge({ color, children }: { color: "emerald" | "cyan" | "violet" | "orange"; children: string }) {
  const styles = { emerald: "border-emerald-500/30 text-emerald-400", cyan: "border-cyan-500/30 text-cyan-400", violet: "border-violet-500/30 text-violet-400", orange: "border-orange-500/30 text-orange-400" };
  const bg = { emerald: "rgba(16,185,129,0.08)", cyan: "rgba(6,182,212,0.08)", violet: "rgba(139,92,246,0.08)", orange: "rgba(249,115,22,0.08)" };
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${styles[color]}`} style={{ background: bg[color] }}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "currentColor" }} />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "currentColor" }} />
      </span>
      {children}
    </div>
  );
});

/* ─────────────────────────────────────────
   Hero Canvas (from reference)
───────────────────────────────────────── */
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
    const particles: Particle[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(52,211,153,0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
      for (let y = 0; y < canvas.height; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(52,211,153,${0.09 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110,231,183,${p.alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true" />;
}

/* ─────────────────────────────────────────
   Gradient Hero Word
───────────────────────────────────────── */
function GradientHeroWord({ children, style }: { children: string; style?: React.CSSProperties }) {
  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        background: "linear-gradient(135deg,#34d399,#22d3ee)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────
   HERO SECTION (from reference, recolored)
───────────────────────────────────────── */
function Hero({ heroReady }: { heroReady: boolean }) {
  return (
    <section
      style={{
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        marginTop: "calc(-1 * var(--site-header-offset))",
        width: "100vw",
        minHeight: "clamp(600px,92vh,960px)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg,#050a08 0%,#040d10 50%,#06080a 100%)",
        borderBottom: "1px solid rgba(52,211,153,0.12)",
      }}
    >
      {/* Canvas background */}
      <HeroCanvas />

      {/* Radial glows */}
      <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(34,211,238,0.09) 0%, transparent 70%)", pointerEvents: "none", filter: "blur(50px)" }} />

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div
          className="hero-grid"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "calc(var(--site-header-offset) + 1.25rem) 24px 80px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* Left text */}
          <div>
            <h1 style={{ fontSize: "clamp(2.4rem,5vw,4.2rem)", fontWeight: 900, lineHeight: 1.08, color: "#f0fdf8", marginBottom: 24, fontFamily: "var(--font-display)", opacity: heroReady ? 1 : 0, transform: heroReady ? "translateX(0)" : "translateX(-40px)", transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)" }}>
              Your Market. Our Tech.<br></br> Let's Grow{" "}
              <GradientHeroWord>
                Together.
              </GradientHeroWord>
            </h1>

            {/* Badge */}
            <div
              // style={{
              //   display: "inline-flex",
              //   alignItems: "center",
              //   gap: 8,
              //   background: "rgba(52,211,153,0.08)",
              //   border: "1px solid rgba(52,211,153,0.3)",
              //   borderRadius: 999,
              //   padding: "6px 16px",
              //   marginBottom: 28,
              //   fontSize: 12,
              //   fontWeight: 700,
              //   letterSpacing: "0.1em",
              //   color: "#34d399",
              //   textTransform: "uppercase" as const,
              //   backdropFilter: "blur(8px)",
              //   opacity: heroReady ? 1 : 0, transform: heroReady ? "translateX(0)" : "translateX(-40px)", transition: "opacity 0.8s ease 0.1s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s",
              // }}
            >
              {/* <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 8px rgba(52,211,153,0.9)", animation: "archPulse 2s ease-in-out infinite", display: "inline-block" }} />
              Between ideas and innovation, there&apos;s always a bridge. */}
            </div>
            

            {/* Sub */}
            <p style={{ fontSize: 17, color: "rgba(240,253,248,0.7)", lineHeight: 1.7, marginBottom: 16, maxWidth: 480, fontFamily: "var(--font-body)", opacity: heroReady ? 1 : 0, transform: heroReady ? "translateX(0)" : "translateX(-40px)", transition: "opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s" }}>
              EcoBridgers builds domain-specific SaaS products, custom software, IoT systems and IT services for businesses of every size — from a single shop in Surat to a multi-branch enterprise across India.
            </p>
            <p style={{ fontSize: 14, color: "rgba(240,253,248,0.45)", lineHeight: 1.6, marginBottom: 36, maxWidth: 440, fontFamily: "var(--font-body)", opacity: heroReady ? 1 : 0, transform: heroReady ? "translateX(0)" : "translateX(-40px)", transition: "opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s" }}>
              EcoBridgers was founded to close that gap. We identify the exact operational gap in your business and fill it — with a SaaS product, a custom-built system, an IoT solution or a combination of all three. Every product we build is specific to your domain, built to your scale and priced for the real world.
            </p>

            {/* CTAs */}
            {/* <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44, opacity: heroReady ? 1 : 0, transform: heroReady ? "translateX(0)" : "translateX(-40px)", transition: "opacity 0.8s ease 0.4s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "linear-gradient(135deg,#34d399,#22d3ee)",
                  borderRadius: 12,
                  padding: "13px 28px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#041a10",
                  textDecoration: "none",
                  boxShadow: "0 0 24px rgba(52,211,153,0.35)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  fontFamily: "var(--font-display)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(52,211,153,0.55)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(52,211,153,0.35)"; }}
                aria-label="Contact EcoBridgers to start building your project"
              >
                let&apos;s build something real →
              </Link>
              <Link
                href="/services"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  border: "1px solid rgba(52,211,153,0.3)",
                  borderRadius: 12,
                  padding: "13px 28px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#f0fdf8",
                  textDecoration: "none",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.2s",
                  fontFamily: "var(--font-display)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(52,211,153,0.6)"; (e.currentTarget as HTMLElement).style.background = "rgba(52,211,153,0.07)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(52,211,153,0.3)"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                aria-label="View services offered by EcoBridgers"
              >
                see what we do
                <svg style={{ width: 14, height: 14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div> */}

            {/* Chips */}
            {/* <div style={{ display: "flex", flexWrap: "wrap", gap: 10, opacity: heroReady ? 1 : 0, transform: heroReady ? "translateX(0)" : "translateX(-40px)", transition: "opacity 0.8s ease 0.5s, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s" }}>
              {["End-to-end delivery", "IoT → Cloud", "Ships on Time", "No Over-Engineering"].map((chip) => (
                <span key={chip} style={{
                  background: "rgba(52,211,153,0.07)",
                  border: "1px solid rgba(52,211,153,0.2)",
                  borderRadius: 999,
                  padding: "5px 13px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#34d399",
                  fontFamily: "var(--font-display)",
                  transition: "all 0.2s",
                  cursor: "default",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(52,211,153,0.15)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(52,211,153,0.5)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(52,211,153,0.07)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(52,211,153,0.2)"; }}
                >
                  {chip}
                </span>
              ))}
            </div> */}
          </div>

          {/* Right: Orb (from reference, recolored) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              opacity: heroReady ? 1 : 0,
              transform: heroReady ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            }}
          >
            <div style={{ position: "relative", width: 380, height: 380, animation: "orbFloat 8s ease-in-out infinite" }}>
              {/* Orbit rings */}
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 160 + i * 80,
                    height: 160 + i * 80,
                    marginTop: -(80 + i * 40),
                    marginLeft: -(80 + i * 40),
                    borderRadius: "50%",
                    border: `1px solid rgba(${i === 0 ? "52,211,153" : i === 1 ? "16,185,129" : "34,211,238"},${0.35 - i * 0.08})`,
                    animation: `orbFloat ${8 + i * 2}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
              {/* Core orb */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 110,
                  height: 110,
                  marginTop: -55,
                  marginLeft: -55,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(52,211,153,0.75) 0%, rgba(16,185,129,0.3) 50%, transparent 70%)",
                  boxShadow: "0 0 60px rgba(52,211,153,0.45), 0 0 120px rgba(34,211,238,0.18)",
                  animation: "orbPulse 3s ease-in-out infinite",
                }}
              />
              {/* Float chips */}
              {[
                { label: "SaaS", x: 10, y: 20, color: "#34d399" },
                { label: "React", x: 280, y: 40, color: "#22d3ee" },
                { label: "IoT", x: 300, y: 280, color: "#10b981" },
                { label: "Flutter", x: 20, y: 300, color: "#34d399" },
                { label: "AWS", x: 160, y: 10, color: "#22d3ee" },
              ].map((chip, i) => (
                <div
                  key={chip.label}
                  style={{
                    position: "absolute",
                    left: chip.x,
                    top: chip.y,
                    background: "rgba(5,10,8,0.72)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${chip.color}40`,
                    borderRadius: 10,
                    padding: "6px 13px",
                    fontSize: 12,
                    fontWeight: 700,
                    color: chip.color,
                    whiteSpace: "nowrap" as const,
                    animation: `chipFloat ${3 + i * 0.4}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                    boxShadow: `0 0 12px ${chip.color}25`,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {chip.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @keyframes marquee-scroll{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
        @keyframes orbFloat { 0%,100%{transform:translate(0,0) scale(1);} 33%{transform:translate(8px,-12px) scale(1.04);} 66%{transform:translate(-6px,8px) scale(0.97);} }
        @keyframes chipFloat { 0%,100%{transform:translateY(0px);} 50%{transform:translateY(-10px);} }
        @keyframes orbPulse { 0%,100%{opacity:0.8;transform:scale(1);} 50%{opacity:1;transform:scale(1.08);} }
        @keyframes archPulse { 0%,100%{opacity:0.6;} 50%{opacity:1;} }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-grid > div:last-child { display: none !important; }
          .arch-nodes-grid { grid-template-columns: 1fr !important; gap: 6px !important; }
        }
        @media (min-width: 768px) {
          .mobile-arrow { display: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────
   WHY ECOBRIDGES — Gen-Z bento
───────────────────────────────────────── */
const WhySection = memo(function WhySection({ visible }: { visible: boolean }) {
  const palette = {
    pink: { bg: "#ee93df", text: "#211225", border: "rgba(238,147,223,0.8)" },
    lime: { bg: "#d6dd57", text: "#1e2210", border: "rgba(214,221,87,0.85)" },
    blue: { bg: "#7e88ff", text: "#12162a", border: "rgba(126,136,255,0.85)" },
    green: { bg: "#92e39f", text: "#0f2313", border: "rgba(146,227,159,0.85)" },
    light: { bg: "#f2f3ef", text: "#171717", border: "rgba(255,255,255,0.65)" },
  } as const;
  const photoTiles = {
    architecture: "/images/photo-1518773553398-650c184e0bb3.jpg",
    fieldOps: "/images/photo-1581092160562-40aa08e78837.jpg",
    dashboard: "/images/photo-1460925895917-afdab827c52f.jpg",
  } as const;

  return (
    <section className="space-y-8">
      <div className="space-y-4 transition-all duration-700" style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)" }}>
        {/* <SectionBadge color="emerald">Why Choose Us</SectionBadge> */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-balance font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(2rem,5vw,3.25rem)", fontFamily: "var(--font-display)", lineHeight: 1.05 }}>
            Why{" "}
            <span style={{ background: "linear-gradient(90deg,#34d399,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              EcoBridgers?
            </span>
          </h2>
          <p className="text-sm text-zinc-500 sm:text-right max-w-xs" style={{ fontFamily: "var(--font-body)" }}>
            {/* real projects. real delivery. */}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-8 xl:grid-cols-4 xl:gap-10">
        <article
          className="group overflow-hidden rounded-xl md:col-span-1 xl:col-span-2 md:flex"
          style={{
            background: palette.pink.bg,
            color: palette.pink.text,
            opacity: visible ? 1 : 0,
            transform: visible ? "translate3d(0,0,0) scale(1)" : "translate3d(-32px,44px,0) scale(0.88)",
            filter: visible ? "blur(0px)" : "blur(8px)",
            transition: "transform 1250ms cubic-bezier(.16,1,.3,1), opacity 1250ms cubic-bezier(.16,1,.3,1), filter 1400ms cubic-bezier(.16,1,.3,1)",
            willChange: "transform, filter, opacity",
          }}
        >
          <div className="contents md:flex md:w-full md:items-stretch">
            <div
              className="relative min-h-[250px] overflow-hidden md:min-h-0 md:w-[44%] md:self-stretch"
              role="img"
              aria-label="Creative technology artwork"
            >
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: "url('/images/photo-1550745165-9bc0b252726f.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>
            <div className="p-6 md:w-[56%] md:p-8 lg:p-9">
              <div className="flex items-start justify-between gap-3">
                {/* <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">the hard truth</p> */}
              </div>
              <h3
                className="mt-4 break-words font-extrabold leading-[0.95] [hyphens:none]"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.48rem,2.9vw,2.2rem)", overflowWrap: "anywhere" }}
              >
                One Team. Full Stack.
              </h3>
              <p className="mt-6 max-w-[30ch] text-[1.08rem] leading-snug" style={{ fontFamily: "var(--font-body)" }}>
              Hardware, firmware, SaaS, mobile apps, web platforms
       and databases — all built in-house. You do not manage
       multiple vendors or deal with handoff problems between
       a design agency, a dev company and a hardware supplier.
              </p>
            </div>
          </div>
        </article>

        <article
          className="overflow-hidden rounded-xl md:col-span-1 xl:col-span-1 xl:row-span-2 flex h-full flex-col"
          style={{
            background: palette.lime.bg,
            color: palette.lime.text,
            opacity: visible ? 1 : 0,
            transform: visible ? "translate3d(0,0,0) scale(1)" : "translate3d(26px,44px,0) scale(0.88)",
            filter: visible ? "blur(0px)" : "blur(8px)",
            transition: "transform 1280ms cubic-bezier(.16,1,.3,1) 320ms, opacity 1280ms cubic-bezier(.16,1,.3,1) 320ms, filter 1450ms cubic-bezier(.16,1,.3,1) 320ms",
            willChange: "transform, filter, opacity",
          }}
        >
          <div className="h-60 w-full overflow-hidden">
            <img
              src={photoTiles.architecture}
              alt="System architecture planning"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="space-y-3 p-5 pt-4">
            <div className="flex items-center justify-between gap-3">
              {/* <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">the approach</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">impact</p> */}
            </div>
            <h3 className="font-extrabold leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem" }}>
              Domain-specific, not generic
            </h3>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Every system we build is designed around how your specific industry actually operates. The terminology, the workflow, the reports, the access levels — all built for your domain.
            </p>        
          </div>
        </article>

        <article
          className="overflow-hidden rounded-xl md:col-span-2 xl:col-span-1 xl:row-span-2 flex h-full flex-col"
          style={{
            background: palette.blue.bg,
            color: palette.blue.text,
            opacity: visible ? 1 : 0,
            transform: visible ? "translate3d(0,0,0) scale(1)" : "translate3d(34px,44px,0) scale(0.88)",
            filter: visible ? "blur(0px)" : "blur(8px)",
            transition: "transform 1310ms cubic-bezier(.16,1,.3,1) 640ms, opacity 1310ms cubic-bezier(.16,1,.3,1) 640ms, filter 1480ms cubic-bezier(.16,1,.3,1) 640ms",
            willChange: "transform, filter, opacity",
          }}
        >
          <div className="p-6 pb-4">
            {/* <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">real world only</p> */}
            <h3 className="mt-3 font-extrabold leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.25rem,2.6vw,1.85rem)" }}>
              Designed for every scale
            </h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              We serve local businesses in Surat and Gujarat, mid-size companies across India. The same quality of engineering, scoped to your size and budget.
            </p>
          </div>

          <div className="mt-auto min-h-52 flex-1 w-full overflow-hidden">
            <img
              src={photoTiles.fieldOps}
              alt="On-site deployment environment"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        </article>

        <article
          className="rounded-xl p-6 md:col-span-1 xl:col-span-2"
          style={{
            background: palette.green.bg,
            color: palette.green.text,
            opacity: visible ? 1 : 0,
            transform: visible ? "translate3d(0,0,0) scale(1)" : "translate3d(-18px,44px,0) scale(0.88)",
            filter: visible ? "blur(0px)" : "blur(8px)",
            transition: "transform 1340ms cubic-bezier(.16,1,.3,1) 960ms, opacity 1340ms cubic-bezier(.16,1,.3,1) 960ms, filter 1510ms cubic-bezier(.16,1,.3,1) 960ms",
            willChange: "transform, filter, opacity",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            {/* <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">the process</p>
            <span className="text-[11px] font-semibold opacity-70">fixed scope</span> */}
          </div>
          <h3 className="mt-3 font-extrabold leading-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem,2.4vw,1.8rem)" }}>
            Customisation is standard
          </h3>
          <p className="mt-3 text-sm leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
            Your branding, your pricing structure, your specific workflow requirements — we configure the system around your business, not the other way around.
          </p>
        </article>

      </div>
    </section>
  );
});

/* ─────────────────────────────────────────
   Architecture Flow SVG (from reference, recolored)
───────────────────────────────────────── */
function ArchFlowSVG() {
  return (
    <svg viewBox="0 0 900 120" style={{ width: "100%", height: 120, overflow: "visible" }}>
      <defs>
        <linearGradient id="archLg1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#34d399" /><stop offset="100%" stopColor="#22d3ee" /></linearGradient>
        <linearGradient id="archLg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#10b981" /></linearGradient>
        <linearGradient id="archLg3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#34d399" /></linearGradient>
        <filter id="archGlow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <line x1="160" y1="60" x2="310" y2="60" stroke="url(#archLg1)" strokeWidth="2" strokeDasharray="6 3" />
      <line x1="380" y1="60" x2="520" y2="60" stroke="url(#archLg2)" strokeWidth="2" strokeDasharray="6 3" />
      <line x1="590" y1="60" x2="730" y2="60" stroke="url(#archLg3)" strokeWidth="2" strokeDasharray="6 3" />
      <polygon points="310,54 325,60 310,66" fill="#22d3ee" filter="url(#archGlow)" />
      <polygon points="520,54 535,60 520,66" fill="#10b981" filter="url(#archGlow)" />
      <polygon points="730,54 745,60 730,66" fill="#34d399" filter="url(#archGlow)" />
      <circle r="5" fill="#34d399" filter="url(#archGlow)">
        <animateMotion dur="2s" repeatCount="indefinite" path="M160,60 L320,60" />
      </circle>
      <circle r="5" fill="#22d3ee" filter="url(#archGlow)">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M380,60 L530,60" begin="0.5s" />
      </circle>
      <circle r="5" fill="#10b981" filter="url(#archGlow)">
        <animateMotion dur="2s" repeatCount="indefinite" path="M590,60 L740,60" begin="1s" />
      </circle>
    </svg>
  );
}

/* ─────────────────────────────────────────
   Terminal (from reference, recolored)
───────────────────────────────────────── */
const TERMINAL_CMDS = [
  { cmd: "npm run deploy:production", out: "✓  Deployed to AWS — 99.9% uptime guaranteed" },
  { cmd: "kubectl apply -f k8s/infra.yaml", out: "✓  12 pods running — auto-scaling enabled" },
  { cmd: "mqtt subscribe /factory/sensors/#", out: "✓  Streaming 248 device feeds — edge latency <12ms" },
  { cmd: "python train.py --model predictive_iot", out: "✓  Model accuracy: 94.7% — pushing to registry" },
];

function Terminal() {
  const [cmdText, setCmdText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [cmdIdx, setCmdIdx] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let charIdx = 0;
    const cmd = TERMINAL_CMDS[cmdIdx];
    setCmdText(""); setOutputText("");
    const typeInterval = setInterval(() => {
      charIdx++;
      setCmdText(cmd.cmd.slice(0, charIdx));
      if (charIdx >= cmd.cmd.length) {
        clearInterval(typeInterval);
        timeout = setTimeout(() => {
          setOutputText(cmd.out);
          timeout = setTimeout(() => { setCmdIdx((i) => (i + 1) % TERMINAL_CMDS.length); }, 2600);
        }, 420);
      }
    }, 52);
    return () => { clearInterval(typeInterval); clearTimeout(timeout); };
  }, [cmdIdx]);

  return (
    <div style={{
      background: "rgba(4,10,8,0.95)",
      border: "1px solid rgba(52,211,153,0.2)",
      borderRadius: 14,
      padding: "20px 24px",
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: 13,
    }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, alignItems: "center" }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ fontSize: 11, color: "rgba(52,211,153,0.4)", marginLeft: 8 }}>ecobridges — bash</span>
      </div>
      <div style={{ color: "rgba(240,253,248,0.6)", marginBottom: 6 }}>
        <span style={{ color: "#34d399" }}>eco@bridgers</span>
        <span style={{ color: "rgba(52,211,153,0.4)" }}>:~$</span>{" "}
        <span style={{ color: "#f0fdf8" }}>{cmdText}</span>
        <span style={{
          display: "inline-block", width: 7, height: 14, background: "#34d399",
          marginLeft: 2, verticalAlign: "middle",
          animation: "archPulse 1s ease-in-out infinite",
        }} />
      </div>
      <div style={{ color: "#34d399", marginTop: 4, lineHeight: 1.7, minHeight: "1.7em" }}>
        {outputText}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Architecture Section (from reference, recolored)
───────────────────────────────────────── */
const ARCH_NODES = [
  { id: "iot", label: "IoT Devices", icon: "📡", desc: "Sensors & Edge", color: "#34d399" },
  { id: "api", label: "API Layer", icon: "⚡", desc: "REST / MQTT / FastAPI", color: "#22d3ee" },
  { id: "cloud", label: "Cloud", icon: "☁️", desc: "AWS / GCP / Azure", color: "#10b981" },
  { id: "apps", label: "Apps", icon: "📱", desc: "Mobile & Web", color: "#34d399" },
];

function ArchitectureSection({ visible }: { visible: boolean }) {
  const techTags = ["MQTT", "Node.js", "Firebase", "PostgreSQL", "Redis", "Docker", "Supabase", "AWS", "React Native", "Flutter", "TensorFlow", "Python"];
  const [pillExpanded, setPillExpanded] = useState(false);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useEffect(() => {
    if (!visible) {
      setPillExpanded(false);
      return;
    }
    const t = setTimeout(() => setPillExpanded(true), 520);
    return () => clearTimeout(t);
  }, [visible]);

  useEffect(() => {
    let lastActive: number | null = null;
    const handleScroll = () => {
      if (window.innerWidth >= 768) {
        if (lastActive !== null) {
          lastActive = null;
          setActiveNode(null);
        }
        return;
      }
      
      const center = window.innerHeight / 2;
      let closestIdx = -1;
      let minDistance = Infinity;

      nodeRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elCenter - center);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      });
      
      const newActive = minDistance < window.innerHeight * 0.4 ? closestIdx : null;
      if (lastActive !== newActive) {
        lastActive = newActive;
        setActiveNode(newActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
}

/* ─────────────────────────────────────────
   Static Q&A Section
───────────────────────────────────────── */
const QNA_ITEMS = [
  {
    q: "Do you only build custom software or do you have ready-made products we can use immediately?",
    a: "Both — and this is actually what makes us different. We have our own SaaS products already built and deployable: TextileBridge for textile units, BIoTSense for factory monitoring, TurfBridge for sports venues and CafeBridge for cafes. You can start using them within days. If none of them fit your exact requirements — we build from scratch or customise an existing product around your workflow. Ready-built or fully custom. Your call.",
    accent: "#34d399",
  },
  {
    q: "We are a small business in Surat. Is this affordable for us or is it only for big companies?",
    a: "It is specifically built for you. Our SaaS products start at ₹500/month — deliberately priced for SMEs, not enterprise budgets. CafeBridge is a one-time ₹20,000 with zero monthly fees after that. BIoTSense costs under ₹2,500 to install and under ₹300 per machine per month to run. Enterprise software charges ₹10,000–15,000 per device for the same thing. We are not enterprise software. We are built for businesses like yours.",
    accent: "#22d3ee",
  },
  {
    q: "Do you work with early-stage ideas or only funded projects?",
    a: "Both. If you have a problem and a market, we are in. We have helped businesses go from zero to a working SaaS product or IoT prototype — no deck required, no funding needed, no formal brief necessary. A WhatsApp message describing your problem is enough to start a conversation.",
    accent: "#a78bfa",
  },
  {
    q: "How long does a typical project take?",
    a: "We move fast. SaaS MVPs take 4–8 weeks. Full IoT systems with hardware, cloud and a mobile app take 3–6 months. Custom SaaS built from scratch sits between those two depending on complexity. We give you a real timeline in the first meeting — no vague \"it depends\" answers and no timelines that stretch silently after the project starts.",
    accent: "#fb923c",
  },
  {
    q: "Do you do hardware AND software, or just one?",
    a: "Both — that is the whole point of EcoBridgers. SaaS products, IoT hardware, embedded firmware, cloud backend, mobile apps and web platforms. One team handles all of it. You never explain your project to a second company because there is no second company involved.",
    accent: "#f472b6",
  },
  {
    q: "What happens after the project launches? Do you disappear?",
    a: "No. We offer ongoing maintenance, monitoring and technical support after every deployment. If you want to take the system in-house — we hand off complete documentation and a fully working codebase that your own team can manage. If you want us to stay involved — we stay involved. We also look for gaps in your operation proactively. If we see something technology can fix, we tell you. That is what a partner does, not a vendor.",
    accent: "#34d399",
  },
  {
    q: "Who owns the code, the hardware designs and the data?",
    a: "You do. Always. Source code, database, schematics, CAD files, cloud configuration — everything we build is yours from the moment it is delivered. No vendor lock-in. No licensing restrictions. No situation where we hold your own system hostage. You can take it to any other team tomorrow and they can work on it without us.",
    accent: "#22d3ee",
  },
  {
    q: "What if our project does not fit neatly into a service category?",
    a: "Even better. The projects that do not fit a standard category are usually the most interesting ones and the ones where we can add the most value. Reach out anyway and describe the problem. We will tell you honestly if we can help — and if we cannot, we will point you to someone who can.",
    accent: "#a78bfa",
  },
  {
    q: "Can you work as our long-term technology partner rather than just a one-time vendor?",
    a: "Yes — and this is actually how we prefer to work. We identify gaps, suggest improvements, scale systems as your business grows and stay available for ongoing development. Some of our best work has come from clients who came to us for one thing and stayed because we kept finding ways to make their operations better. If you want a technology partner and not just a development shop — we are the right fit.",
    accent: "#fb923c",
  },
];

const QnASection = memo(function QnASection({ visible }: { visible: boolean }) {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  return (
    <section className="space-y-10">
      <div
        className="space-y-4 transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)" }}
      >
        {/* <SectionBadge color="orange">Quick Q&amp;A</SectionBadge> */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2
            className="text-balance font-extrabold tracking-tight text-white"
            style={{ fontSize: "clamp(2rem,5vw,3.25rem)", fontFamily: "var(--font-display)" }}
          >
            things people{" "}
            <span style={{ background: "linear-gradient(90deg,#fb923c,#f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              actually ask.
            </span>
          </h2>
          {/* <p className="text-sm text-zinc-500 max-w-xs sm:text-right" style={{ fontFamily: "var(--font-body)" }}>
            no fluff. straight answers.
          </p> */}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {QNA_ITEMS.map((item, idx) => {
          const isOpen = !!openItems[idx];
          return (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl border bg-zinc-900/60 backdrop-blur-sm transition-all duration-300"
              style={{
                borderColor: isOpen ? `${item.accent}50` : "rgba(255,255,255,0.1)",
                boxShadow: isOpen ? `0 0 32px -8px ${item.accent}25` : "none",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transitionDelay: `${idx * 60}ms`,
              }}
            >
              {/* accent bar — only visible when open */}
              <div
                style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, ${item.accent}, transparent)`,
                  opacity: isOpen ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              />

              {/* Question row — clickable */}
              <button
                onClick={() => {
                  setOpenItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
                }}
                className="w-full text-left flex items-center justify-between gap-4 p-5 sm:p-6"
                style={{ background: "transparent", border: "none", cursor: "pointer" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ background: `${item.accent}18`, color: item.accent, border: `1px solid ${item.accent}30` }}
                  >
                    Q
                  </span>
                  <p className="text-sm font-bold text-white leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                    {item.q}
                  </p>
                </div>
                {/* Chevron */}
                <svg
                  style={{
                    width: 18, height: 18, flexShrink: 0, color: item.accent,
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Answer — animated expand */}
              <div
                style={{
                  maxHeight: isOpen ? "300px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <div className="flex items-start gap-3 px-5 pb-5 sm:px-6 sm:pb-6">
                    <span
                      className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      A
                    </span>
                    <p className="text-sm text-zinc-400 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
});

/* ─────────────────────────────────────────
   Static data
───────────────────────────────────────── */
const buildFor = [
  {
    label: "Founders going 0→1",
    sub: "You have the idea. We have the full stack. No handoffs, no Fiverr gamble, no wasted months.",
    icon: "🚀",
    color: "from-amber-500/15 to-orange-500/5",
    border: "hover:border-amber-500/40",
    accent: "#f59e0b",
    image: "/images/photo-1521737604893-d14cc237f11d.jpg",
  },
  {
    label: "Local & Growing Businesses",
    sub: "Textile units, cafes, factories, sports venues — we know Surat's industries because we work in them.",
    icon: "🏪",
    color: "from-violet-500/15 to-purple-500/5",
    border: "hover:border-violet-500/40",
    accent: "#a78bfa",
    image: "/images/photo-1562774053-701939374585.jpg",
  },
  {
    label: "Factory & Industrial Ops",
    sub: "Real-time machine monitoring that does not crash at 3am when your shift supervisor calls.",
    icon: "🏭",
    color: "from-sky-500/15 to-blue-500/5",
    border: "hover:border-sky-500/40",
    accent: "#38bdf8",
    image: "/images/photo-1581092918056-0c4c3acd3789.jpg",
  },
  {
    label: "IoT & Hardware Startups",
    sub: "Full-stack embedded — firmware to dashboard, hardware to app. One team, zero handoff chaos.",
    icon: "📡",
    color: "from-emerald-500/15 to-teal-500/5",
    border: "hover:border-emerald-500/40",
    accent: "#34d399",
    image: "/images/photo-1581092160607-ee22621dd758.jpg",
  },
  {
    label: "Enterprises & Multi-Branch Ops",
    sub: "Multi-location systems, role-based access, API integrations. Built to scale with you.",
    icon: "🏢",
    color: "from-cyan-500/15 to-sky-500/5",
    border: "hover:border-cyan-500/40",
    accent: "#22d3ee",
    image: "/images/photo-1517048676732-d65bc937f952.jpg",
  },
  {
    label: "Anyone with a real problem",
    sub: "If it is worth solving, we are in. Reach out — seriously.",
    icon: "💡",
    color: "from-rose-500/15 to-pink-500/5",
    border: "hover:border-rose-500/40",
    accent: "#fb7185",
    image: "/images/photo-1531297484001-80022131f5a1.jpg",
  },
] as const;

const WorkWithScrollShowcase = memo(function WorkWithScrollShowcase({
  items,
  visible,
}: {
  items: typeof buildFor;
  visible: boolean;
}) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [rightYOffset, setRightYOffset] = useState(0);
  const [imgErrored, setImgErrored] = useState(false);
  const activeRef = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    const lastIdx = Math.max(0, items.length - 1);

    // Dead-zone based range switching to avoid flicker/glitch around boundaries.
    const updateActiveFromScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.5;
      const sectionTop = rect.top;
      const sectionHeight = Math.max(rect.height, 1);
      const p = Math.max(0, Math.min(1, (viewportCenter - sectionTop) / sectionHeight));
      const raw = p * lastIdx;

      let next = activeRef.current;
      const step = 0.62; // must cross this far into next/prev range before switching

      if (next < lastIdx && raw >= next + step) {
        next = Math.min(lastIdx, next + 1);
      } else if (next > 0 && raw <= next - step) {
        next = Math.max(0, next - 1);
      }

      if (next !== activeRef.current) {
        activeRef.current = next;
        setActive(next);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActiveFromScroll);
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Keep right image aligned with active text block.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const wrap = wrapRef.current;
      const right = rightRef.current;
      const el = itemRefs.current[active];
      if (!wrap || !right || !el) return;

      const wrapRect = wrap.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const rightRect = right.getBoundingClientRect();

      // Align right panel center to active block center, clamped within wrapper.
      const targetCenterY = (elRect.top - wrapRect.top) + elRect.height * 0.5;
      const panelH = rightRect.height || 520;
      const y = Math.max(0, Math.min(wrapRect.height - panelH, targetCenterY - panelH * 0.5));
      setRightYOffset(y);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [active]);

  const a = items[active];

  return (
    <div
      ref={wrapRef}
      className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 700ms ease, transform 700ms ease",
      }}
    >
      {/* Left: big scroll text */}
      <div className="space-y-8">
        {items.map((it, idx) => {
          const isActive = idx === active;
          return (
            <div
              key={it.label}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className="py-10 sm:py-14"
              style={{ minHeight: "38vh" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: isActive ? it.accent : "rgba(255,255,255,0.35)", fontFamily: "var(--font-display)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              <h3
                className="mt-4 font-extrabold tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.2rem,5.2vw,4.2rem)",
                  lineHeight: 1.02,
                  color: isActive ? "#ffffff" : "rgba(255,255,255,0.26)",
                  transition: "color 260ms ease",
                }}
              >
                {it.label}
              </h3>

              <p
                className="mt-3 max-w-xl text-sm sm:text-base"
                style={{
                  fontFamily: "var(--font-body)",
                  color: isActive ? "rgba(244,244,245,0.82)" : "rgba(244,244,245,0.42)",
                  transition: "color 260ms ease",
                }}
              >
                {it.sub}
              </p>

              {/* Mobile Inline Image Accordion */}
              <div
                className="mt-6 lg:hidden overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
                style={{
                  maxHeight: isActive ? 280 : 0,
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "scale(1)" : "scale(0.96)",
                  boxShadow: isActive ? `0 10px 40px ${it.accent}25` : "none",
                  border: `1px solid ${isActive ? it.accent + '40' : 'transparent'}`,
                }}
              >
                <img 
                  src={it.image} 
                  alt={it.label} 
                  className="w-full h-[220px] sm:h-[280px] object-cover" 
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: aligned image panel */}
      <div className="relative hidden lg:block">
        <div
          ref={rightRef}
          className="relative overflow-visible"
          style={{
            boxShadow: `0 0 70px ${a.accent}18`,
            transform: `translateY(${rightYOffset}px)`,
            transition: "transform 260ms cubic-bezier(.2,.8,.2,1)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 z-20 h-[84px] w-[84px] translate-x-1/2 -translate-y-1/2 rounded-full border border-[#b7a57b] bg-[#efe2bf] text-[#3b2f1f]"
            style={{ fontFamily: "var(--font-display)", boxShadow: "0 12px 30px rgba(0,0,0,0.35)" }}
          >
            <span className="absolute inset-0 grid place-items-center text-center text-[11px] font-semibold uppercase tracking-[0.08em] leading-none">
              Best Fit
            </span>
          </div>
          <div className="relative overflow-hidden rounded-[24px] border border-[#d9c89e]/25 bg-zinc-900/60 backdrop-blur-sm">
            <div className="relative aspect-[16/10] w-full">
            <img
              key={a.image}
              src={a.image}
              alt={a.label}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: "saturate(1.05) contrast(1.02)" }}
              loading="eager"
              referrerPolicy="no-referrer"
              onError={() => setImgErrored(true)}
              onLoad={() => setImgErrored(false)}
            />
            {imgErrored && (
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${a.accent}25 0%, transparent 55%), linear-gradient(135deg, rgba(24,24,27,0.9), rgba(9,9,11,0.95))`,
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
});

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
const SPLASH_DURATION = 2800;
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Module-level variable survives internal Next.js navigation but resets on hard browser refresh
let hasSeenSplashThisSession = false;

export default function HomePageClient() {
  const [splashDone, setSplashDone] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  // Use layout effect to synchronously check global variable before browser paints
  useIsomorphicLayoutEffect(() => {
    if (hasSeenSplashThisSession) {
      setSplashDone(true);
      setHeroReady(true);
    } else {
      const t = setTimeout(() => setHeroReady(true), 80);
      return () => clearTimeout(t);
    }
  }, []);

  const handleSplashComplete = () => {
    hasSeenSplashThisSession = true;
    setSplashDone(true);
  };

  const qnaRef = useInView();
  const whyRef = useInView();
  const archRef = useInView();
  const clientRef = useInView();
  const ctaRef = useInView();

  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleSplashComplete} minDuration={SPLASH_DURATION} />}

      <div className="flex flex-col overflow-x-hidden">

        {/* ══════════════════ HERO ══════════════════ */}
        <Hero heroReady={heroReady} />

        {/* ══════════════════ CONTENT ══════════════════ */}
        <div className="mx-auto w-full max-w-screen-xl space-y-28 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">

          {/* WHY ECOBRIDGES */}
          <section
            ref={whyRef.targetRef}
            style={{
              position: "relative",
              left: "50%",
              right: "50%",
              marginLeft: "-50vw",
              marginRight: "-50vw",
              width: "100vw",
            }}
          >
            <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-10 xl:px-16">
              <WhySection visible={whyRef.visible} />
            </div>
          </section>

          {/* EXPERTISE */}
          <section>
            <ExpertiseCards />
          </section>

          {/* ARCHITECTURE */}
          {/* <div ref={archRef.targetRef}>
            <ArchitectureSection visible={archRef.visible} />
          </div> */}

          {/* WHO WE BUILD FOR */}
          <section ref={clientRef.targetRef} className="space-y-12">
            <div
              className="space-y-4 transition-all duration-700"
              style={{ opacity: clientRef.visible ? 1 : 0, transform: clientRef.visible ? "translateY(0)" : "translateY(32px)" }}
            >
              {/* <SectionBadge color="violet">who we build for</SectionBadge> */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-balance font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(2rem,5vw,3.25rem)", fontFamily: "var(--font-display)" }}>
                  We work with{" "}
                  <span style={{ background: "linear-gradient(90deg,#a78bfa,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    builders.
                  </span>
                </h2>
                {/* <p className="text-sm text-zinc-500 max-w-xs sm:text-right" style={{ fontFamily: "var(--font-body)" }}>
                  if you're making something real, we're in.
                </p> */}
              </div>
            </div>

            <WorkWithScrollShowcase items={buildFor} visible={clientRef.visible} />
          </section>
          <div ref={qnaRef.targetRef}>
            <QnASection visible={qnaRef.visible} />
          </div>
          {/* FINAL CTA */}
          <section
            ref={ctaRef.targetRef}
            className="relative overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-14 lg:p-20 transition-all duration-700"
            style={{
              opacity: ctaRef.visible ? 1 : 0,
              transform: ctaRef.visible ? "translateY(0)" : "translateY(44px)",
              background: "linear-gradient(135deg,#0a0f0d 0%,#061a12 40%,#040d10 100%)",
            }}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-emerald-500/12 blur-[100px]" />
              <div className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[110px]" />
              <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(to right,rgba(52,211,153,.8) 1px,transparent 1px),linear-gradient(to bottom,rgba(52,211,153,.8) 1px,transparent 1px)", backgroundSize: "56px 56px" }} />
            </div>

            <div className="relative space-y-6 text-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-3" style={{ fontFamily: "var(--font-display)" }}>ready when you are</p>
                <h2 className="text-balance font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.75rem,5vw,3rem)", fontFamily: "var(--font-display)" }}>
                  got a problem worth solving?
                </h2>
              </div>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg" style={{ fontFamily: "var(--font-body)" }}>
                doesn't matter if it's rough. bring the napkin sketch, the half-baked idea, the "is this even possible" question.{" "}
                <span className="font-bold text-emerald-400">we'll figure it out together.</span>
              </p>
              <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-1">
                {["IoT & Embedded", "Web Platforms", "Mobile Apps", "Cloud & DevOps", "Custom Hardware", "AI Integration"].map((tag) => (
                  <span key={tag} className="rounded-full border border-emerald-500/20 bg-emerald-500/8 px-2 py-[2px] text-[11px] font-medium text-emerald-400 transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/15 hover:scale-105" style={{ fontFamily: "var(--font-display)" }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mx-auto flex w-fit flex-col items-center justify-center gap-3 pt-4 sm:flex-row sm:gap-4">
                <Link href="/contact"
                  className="group relative inline-flex min-w-[240px] items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.05] hover:shadow-xl hover:shadow-emerald-500/45"
                  style={{ fontFamily: "var(--font-display)" }}
                  aria-label="Contact EcoBridgers to start your project"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                  start a conversation →
                </Link>
                <Link href="/works"
                  className="group inline-flex min-w-[240px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:scale-[1.04] hover:bg-white/10 hover:border-emerald-500/40"
                  style={{ fontFamily: "var(--font-display)" }}
                  aria-label="View EcoBridgers portfolio and past work"
                >
                  see our work
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>
              <p className="text-xs text-zinc-600 pt-2" style={{ fontFamily: "var(--font-body)" }}>
                no retainer required · project-based · you own everything we build
              </p>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}