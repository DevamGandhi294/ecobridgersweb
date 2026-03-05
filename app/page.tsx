"use client";

import Link from "next/link";
import { useEffect, useRef, useState, memo } from "react";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";
import { ExpertiseCards } from "../components/Expertisecards";
import { SplashScreen } from "@/components/SplashScreen";
import Plasma from "@/components/Plasma";

/* ─────────────────────────────────────────
   Hooks
───────────────────────────────────────── */
function useInView(threshold = 0.15) {
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

const Counter = memo(function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useInView(0.3);
  useEffect(() => {
    if (!visible) return;
    let n = 0;
    const step = Math.ceil(target / 40);
    const id = setInterval(() => {
      n += step;
      if (n >= target) { setCount(target); clearInterval(id); }
      else setCount(n);
    }, 30);
    return () => clearInterval(id);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
});

/* ─────────────────────────────────────────
   Static data
───────────────────────────────────────── */
const clientTypes = [
  { label: "Startups & Innovators",    icon: "💡", color: "from-amber-500/20 to-orange-500/10",  border: "hover:border-amber-500/40",  glow: "hover:shadow-amber-500/10"  },
  { label: "Educational Institutions", icon: "🎓", color: "from-violet-500/20 to-purple-500/10", border: "hover:border-violet-500/40", glow: "hover:shadow-violet-500/10" },
  { label: "Industrial Monitoring",    icon: "🏭", color: "from-sky-500/20 to-blue-500/10",      border: "hover:border-sky-500/40",    glow: "hover:shadow-sky-500/10"    },
  { label: "Research & Prototypes",    icon: "🔬", color: "from-rose-500/20 to-pink-500/10",     border: "hover:border-rose-500/40",   glow: "hover:shadow-rose-500/10"   },
  { label: "Custom IoT Solutions",     icon: "📡", color: "from-emerald-500/20 to-teal-500/10",  border: "hover:border-emerald-500/40",glow: "hover:shadow-emerald-500/10"},
  { label: "Full-Stack Development",   icon: "🖥️", color: "from-cyan-500/20 to-sky-500/10",     border: "hover:border-cyan-500/40",   glow: "hover:shadow-cyan-500/10"   },
] as const;

const processSteps = [
  { title: "Discussion & Understanding", desc: "Understand your idea, users, and constraints." },
  { title: "System Architecture",        desc: "Plan the full system and technology stack."    },
  { title: "Parallel Development",       desc: "Build hardware, cloud, and apps together."    },
  { title: "Testing & Iteration",        desc: "Test in real conditions and refine."           },
  { title: "Deployment & Handover",      desc: "Deploy, document, and hand over clearly."     },
] as const;

const processIcons = ["💬", "📐", "⚙️", "🧪", "🚀"] as const;

/* ─────────────────────────────────────────
   Section badge
───────────────────────────────────────── */
const SectionBadge = memo(function SectionBadge({
  color, children,
}: { color: "emerald" | "cyan" | "violet"; children: string }) {
  const styles = {
    emerald: "border-emerald-500/25 bg-emerald-500/8 text-emerald-400",
    cyan:    "border-cyan-500/25 bg-cyan-500/8 text-cyan-400",
    violet:  "border-violet-500/25 bg-violet-500/8 text-violet-400",
  };
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${styles[color]}`}>
      {children}
    </div>
  );
});

/* ─────────────────────────────────────────
   Parallax orbs — isolated, zero re-renders
───────────────────────────────────────── */
const ParallaxOrbs = memo(function ParallaxOrbs() {
  const orbsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      const el = orbsRef.current;
      if (!el) return;
      (el.children[0] as HTMLElement).style.transform = `translate(${x * 0.6}px,${y * 0.4}px)`;
      (el.children[1] as HTMLElement).style.transform = `translate(${-x * 0.5}px,${-y * 0.3}px)`;
      (el.children[2] as HTMLElement).style.transform = `translate(${x * 0.3}px,${y * 0.5}px)`;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return (
    <div ref={orbsRef} style={{ position:"absolute",zIndex:2,inset:0,pointerEvents:"none" }} aria-hidden>
      <div style={{ position:"absolute",top:"15%",left:"8%",width:"clamp(280px,40vw,540px)",height:"clamp(280px,40vw,540px)",borderRadius:"50%",background:"radial-gradient(circle,rgba(16,185,129,.18) 0%,transparent 70%)",filter:"blur(48px)",transition:"transform 0.6s cubic-bezier(.2,.8,.4,1)",willChange:"transform" }} />
      <div style={{ position:"absolute",bottom:"10%",right:"6%",width:"clamp(200px,30vw,420px)",height:"clamp(200px,30vw,420px)",borderRadius:"50%",background:"radial-gradient(circle,rgba(6,182,212,.16) 0%,transparent 70%)",filter:"blur(56px)",transition:"transform 0.7s cubic-bezier(.2,.8,.4,1)",willChange:"transform" }} />
      <div style={{ position:"absolute",top:"55%",left:"55%",width:"clamp(120px,18vw,260px)",height:"clamp(120px,18vw,260px)",borderRadius:"50%",background:"radial-gradient(circle,rgba(139,92,246,.12) 0%,transparent 70%)",filter:"blur(40px)",transition:"transform 0.8s cubic-bezier(.2,.8,.4,1)",willChange:"transform" }} />
    </div>
  );
});

/* ─────────────────────────────────────────
   Plasma quality settings
   
   LOW  — used during splash (hidden behind it)
          DPR 0.35 = ~91% less pixels to render
          speed 0.15 = shader runs slower = less GPU work
          no mouse interaction
   
   FULL — switched 700ms before splash exits
          user never sees the quality change
          by splash exit, full quality is already running
───────────────────────────────────────── */
const PLASMA_LOW = {
  speed: 0.15,         // slow — less GPU work
  opacity: 0.3,        // dimmer — less blending cost
  mouseInteractive: false,
} as const;

const PLASMA_FULL = {
  speed: 0.4,
  opacity: 0.55,
  mouseInteractive: true,
} as const;

// Timing must match SplashScreen minDuration
const SPLASH_DURATION   = 2800; // total splash time in ms
const PLASMA_UPGRADE_AT = 2100; // upgrade 700ms before splash exits (2800 - 700)

/* ─────────────────────────────────────────
   Page
───────────────────────────────────────── */
export default function Home() {
  const [splashDone,    setSplashDone]    = useState(false);
  const [heroReady,     setHeroReady]     = useState(false);
  const [plasmaQuality, setPlasmaQuality] = useState<"low" | "full">("low");

  useEffect(() => {
    // Hero entrance
    const t1 = setTimeout(() => setHeroReady(true), 80);

    // Upgrade Plasma to full quality 700ms before splash exits
    // User is still seeing splash at this point — invisible upgrade
    const t2 = setTimeout(() => setPlasmaQuality("full"), PLASMA_UPGRADE_AT);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const plasmaProps = plasmaQuality === "low" ? PLASMA_LOW : PLASMA_FULL;

  const whyRef    = useInView();
  const clientRef = useInView();
  const ctaRef    = useInView();

  return (
    <>
      {/* Splash — on top while page + Plasma load underneath */}
      {!splashDone && (
        <SplashScreen
          onComplete={() => setSplashDone(true)}
          minDuration={SPLASH_DURATION}
        />
      )}

      {/* Page — always mounted */}
      <div className="flex flex-col overflow-x-hidden">

        {/* ── HERO ── */}
        <section
          style={{
            position: "relative",
            left: "50%", right: "50%",
            marginLeft: "-50vw", marginRight: "-50vw",
            width: "100vw",
            minHeight: "clamp(600px, 92vh, 960px)",
          }}
          className="flex items-center overflow-hidden border-b border-emerald-500/15 py-20 sm:py-28"
        >
          {/* Plasma — starts low quality, upgrades to full before splash exits */}
          <div style={{ position:"absolute", inset:0, zIndex:0 }}>
            <Plasma
              color="#10b981"
              direction="forward"
              scale={1.3}
              speed={plasmaProps.speed}
              opacity={plasmaProps.opacity}
              mouseInteractive={plasmaProps.mouseInteractive}
            />
          </div>

          {/* Dark scrim */}
          <div style={{ position:"absolute",inset:0,zIndex:1,background:"rgba(5,7,10,0.62)",backdropFilter:"blur(3px)" }} />

          {/* Noise grain */}
          <div
            style={{
              position:"absolute",inset:0,zIndex:2,opacity:0.025,pointerEvents:"none",
              backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Grid texture */}
          <div
            style={{
              position:"absolute",inset:0,zIndex:3,opacity:0.035,pointerEvents:"none",
              backgroundImage:"linear-gradient(to right,rgba(52,211,153,.8) 1px,transparent 1px),linear-gradient(to bottom,rgba(52,211,153,.8) 1px,transparent 1px)",
              backgroundSize:"72px 72px",
            }}
          />

          {/* Parallax orbs */}
          <ParallaxOrbs />

          {/* Hero content */}
          <div style={{ position:"relative",zIndex:10,width:"100%" }}>
            <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-10">

              <div
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 backdrop-blur-sm transition-all duration-700"
                style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0) scale(1)" : "translateY(-16px) scale(.95)" }}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Built for Practical Delivery
              </div>

              <h1
                className="mt-6 text-balance font-extrabold leading-[1.05] tracking-tight transition-all duration-700 delay-150"
                style={{
                  fontSize: "clamp(2.4rem, 7.5vw, 5.5rem)",
                  opacity: heroReady ? 1 : 0,
                  transform: heroReady ? "translateY(0)" : "translateY(28px)",
                  willChange: "transform, opacity",
                }}
              >
                <span style={{ background:"linear-gradient(135deg,#fff 0%,#e2fdf3 45%,#34d399 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                  Bridging Ideas to<br className="hidden sm:block" />{" "}
                  Real-World Technology
                </span>
              </h1>

              <p
                className="mt-6 mx-auto max-w-2xl leading-relaxed text-zinc-300 transition-all duration-700 delay-300"
                style={{ fontSize:"clamp(1rem,2.2vw,1.2rem)", opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(20px)", willChange:"transform, opacity" }}
              >
                EcoBridges is a project-based technology team building IoT systems, web platforms,
                mobile applications, and cloud solutions using a fast, reliable, and scalable tech stack.
              </p>

              <p
                className="mt-3 mx-auto max-w-xl text-sm leading-relaxed text-zinc-500 transition-all duration-700 delay-[360ms]"
                style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(16px)" }}
              >
                We act as the bridge between your idea and a working, deployable product —<br className="hidden sm:block" /> from concept to execution.
              </p>

              <div
                className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center transition-all duration-700 delay-500"
                style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(16px)" }}
              >
                <Link href="/contact" className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.04] hover:shadow-xl hover:shadow-emerald-500/45 sm:w-auto">
                  <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  Let's discuss your project
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
                <Link href="/services" className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:scale-[1.04] hover:bg-white/10 hover:border-emerald-500/40 sm:w-auto">
                  Explore Our Services
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>

              <div
                className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 transition-all duration-700 delay-700"
                style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(24px)" }}
              >
                {[
                  { num: <Counter target={1} suffix="+" />, label: "Years Experience", accent: "#34d399" },
                  { num: <Counter target={5} suffix="+" />, label: "Team Projects",    accent: "#22d3ee" },
                  { num: "Multiple",                         label: "Featured Works",   accent: "#a78bfa" },
                  { num: "One",                              label: "Optimized Stack",  accent: "#f472b6" },
                ].map(({ num, label, accent }) => (
                  <div key={label} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:-translate-y-0.5 hover:shadow-xl sm:p-6">
                    <div className="absolute top-0 left-1/2 h-px w-12 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100" style={{ background:`linear-gradient(to right, transparent, ${accent}, transparent)` }} />
                    <div className="relative">
                      <div className="text-2xl font-extrabold text-white sm:text-3xl lg:text-4xl">{num}</div>
                      <div className="mt-1.5 text-xs font-medium text-zinc-500 sm:text-sm">{label}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">

          {/* WHY ECOBRIDGES */}
          <section ref={whyRef.ref} className="space-y-10">
            <div
              className="space-y-3 transition-all duration-700"
              style={{ opacity: whyRef.visible ? 1 : 0, transform: whyRef.visible ? "translateY(0)" : "translateY(32px)" }}
            >
              <SectionBadge color="emerald">Why Choose Us</SectionBadge>
              <h2 className="text-balance font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(2rem,5vw,3.25rem)" }}>Why EcoBridges?</h2>
              <p className="max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                At EcoBridges, we don't just build projects — we build solutions that actually work in real environments.
              </p>
            </div>
          </section>

          {/* EXPERTISE */}
          <section><ExpertiseCards /></section>

          {/* WORKFLOW */}
          <section className="space-y-10">
            <div className="space-y-3 text-center">
              <SectionBadge color="cyan">Our Workflow</SectionBadge>
              <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(2rem,5vw,3.25rem)" }}>How We Work</h2>
              <p className="mx-auto max-w-2xl text-sm text-zinc-400 sm:text-base">Five clear steps from first discussion to final deployment.</p>
            </div>
            <WorkflowDiagram processSteps={processSteps} processIcons={processIcons} />
          </section>

          {/* WHO WE WORK WITH */}
          <section ref={clientRef.ref} className="space-y-10">
            <div
              className="space-y-3 text-center transition-all duration-700"
              style={{ opacity: clientRef.visible ? 1 : 0, transform: clientRef.visible ? "translateY(0)" : "translateY(32px)" }}
            >
              <SectionBadge color="violet">Our Clients</SectionBadge>
              <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(2rem,5vw,3.25rem)" }}>Who We Work With</h2>
              <p className="mx-auto max-w-2xl text-base text-zinc-400 sm:text-lg">Project-based services and product-oriented development for:</p>
            </div>
            <div className="grid gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
              {clientTypes.map((type, idx) => (
                <div
                  key={type.label}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-center backdrop-blur-sm transition-all duration-500 ${type.border} hover:-translate-y-1.5 hover:shadow-xl ${type.glow}`}
                  style={{ opacity: clientRef.visible ? 1 : 0, transform: clientRef.visible ? "translateY(0)" : "translateY(32px)", transitionDelay:`${idx * 80}ms`, transitionDuration:"600ms", willChange:"transform, opacity" }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                  <div className="relative">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-2xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:ring-white/20">{type.icon}</div>
                    <div className="text-sm font-semibold text-white">{type.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FINAL CTA */}
          <section
            ref={ctaRef.ref}
            className="relative overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-14 lg:p-20 transition-all duration-700"
            style={{ opacity: ctaRef.visible ? 1 : 0, transform: ctaRef.visible ? "translateY(0)" : "translateY(44px)", background:"linear-gradient(135deg,#0a0f0d 0%,#061a12 40%,#040d10 100%)" }}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-emerald-500/12 blur-[100px]" />
              <div className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[110px]" />
              <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage:"linear-gradient(to right,rgba(52,211,153,.8) 1px,transparent 1px),linear-gradient(to bottom,rgba(52,211,153,.8) 1px,transparent 1px)", backgroundSize:"56px 56px" }} />
              <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full border border-emerald-500/10" />
              <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full border border-emerald-500/6" />
            </div>
            <div className="relative space-y-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-2xl">🚀</div>
              <h2 className="text-balance font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.75rem,5vw,3rem)" }}>Have an Idea or Problem to Solve?</h2>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                Whether it's an IoT system, a web platform, a mobile app, or a complete end-to-end solution —{" "}
                <span className="font-bold text-emerald-400">EcoBridges is ready to build it with you.</span>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {["IoT & Embedded", "Web Platforms", "Mobile Apps", "Cloud & DevOps"].map((tag) => (
                  <span key={tag} className="rounded-full border border-emerald-500/20 bg-emerald-500/8 px-3 py-1 text-xs font-medium text-emerald-400">{tag}</span>
                ))}
              </div>
              <div className="pt-4">
                <Link href="/contact" className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.05] hover:shadow-xl hover:shadow-emerald-500/45">
                  <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  Contact EcoBridges
                  <svg className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}