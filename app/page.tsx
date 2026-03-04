"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";
import { ExpertiseCards } from "../components/Expertisecards";
import Plasma from "@/components/Plasma";
import MagicBento from "@/components/MagicBento";
import CircularGallery from '@/components/CircularGallery';

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

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
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
}

const clientTypes = [
  { label: "Startups & Innovators",    icon: "💡" },
  { label: "Educational Institutions", icon: "🎓" },
  { label: "Industrial Monitoring",    icon: "🏭" },
  { label: "Research & Prototypes",    icon: "🔬" },
  { label: "Custom IoT Solutions",     icon: "📡" },
  { label: "Full-Stack Development",   icon: "🖥️" },
] as const;

const circularGalleryItems = [
  { image: "/pics/agriculture.jpg", text: "Smart Agriculture" },
  { image: "/pics/cafe.jpg", text: "Digital Restaurants/Cafe" },
  { image: "/pics/cybersecurity.jpg", text: "Cybersecurity" },
  { image: "/pics/education.jpg", text: "Educational Technology" },
  { image: "/pics/industrial.jpg", text: "Field Development" },
  { image: "/pics/iot.jpg", text: "Additional Sample" },
  { image: "/pics/software.jpg", text: "Full-Stack Development" },
  { image: "/pics/startup.jpg", text: "Startup Concept" },
  { image: "/pics/textile.jpg", text: "Textile Project" },
] as const;

export default function Home() {
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const whyRef    = useInView();
  const clientRef = useInView();
  const ctaRef    = useInView();

  const processSteps = [
    { title: "Discussion & Understanding", desc: "Understand your idea, users, and constraints." },
    { title: "System Architecture",        desc: "Plan the full system and technology stack." },
    { title: "Parallel Development",       desc: "Build hardware, cloud, and apps together." },
    { title: "Testing & Iteration",        desc: "Test in real conditions and refine." },
    { title: "Deployment & Handover",      desc: "Deploy, document, and hand over clearly." },
  ] as const;

  const processIcons = ["💬", "📐", "⚙️", "🧪", "🚀"] as const;

  return (
    <div className="flex flex-col">

      {/* ══════════════════════════════
          HERO — true full-viewport width
          uses position:relative + left/right
          to escape ANY parent container
      ══════════════════════════════ */}
      <section
        style={{
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          width: "100vw",
        }}
        className="overflow-hidden border-y border-emerald-500/20 py-16 sm:py-20"
      >
        {/* ── Plasma fills entire section ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Plasma
            color="#10b981"
            speed={0.5}
            direction="forward"
            scale={1.2}
            opacity={0.6}
            mouseInteractive={true}
          />
        </div>

        {/* ── Dark scrim ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "rgba(9,9,11,0.55)", backdropFilter: "blur(2px)" }} />

        {/* ── Grid texture ── */}
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 2,
            opacity: 0.04, pointerEvents: "none",
            backgroundImage: "linear-gradient(to right,rgb(52,211,153) 1px,transparent 1px),linear-gradient(to bottom,rgb(52,211,153) 1px,transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* ── Content centred inside ── */}
        <div style={{ position: "relative", zIndex: 10 }} className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-10">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-sm transition-all duration-700"
            style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(-12px)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Built for Practical Delivery
          </div>

          {/* Heading */}
          <h1
            className="mt-6 text-balance text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl transition-all duration-700 delay-150"
            style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(24px)" }}
          >
            <span className="bg-gradient-to-r from-white via-white to-emerald-300 bg-clip-text text-transparent">
              Bridging Ideas to Real-World Technology{" "}
            </span>
          </h1>

          <p
            className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl transition-all duration-700 delay-300"
            style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(20px)" }}
          >
            EcoBridges is a project-based technology team building IoT systems, web platforms,
            mobile applications, and cloud solutions using a fast, reliable, and scalable tech stack.
          </p>

          <p
            className="mt-3 mx-auto max-w-2xl text-base leading-relaxed text-zinc-400 transition-all duration-700 delay-[350ms]"
            style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(16px)" }}
          >
            We act as the bridge between your idea and a working, deployable product — from concept to execution.
          </p>

          {/* CTAs */}
          <div
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center transition-all duration-700 delay-500"
            style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(16px)" }}
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-emerald-500/40"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
              Let's discuss your project
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:scale-[1.03] hover:bg-white/10 hover:border-emerald-500/40"
            >
              Explore Our Services
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Stats */}
          <div
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 transition-all duration-700 delay-700"
            style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(20px)" }}
          >
            {[
              { num: <Counter target={1} suffix="+" />, label: "Years Experience" },
              { num: <Counter target={5} suffix="+" />, label: "Team Projects" },
              { num: "Multiple", label: "Featured Works" },
              { num: "One",      label: "Optimized Stack" },
            ].map(({ num, label }) => (
              <div
                key={label}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/40 hover:bg-white/[0.09] hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="text-3xl font-bold text-white sm:text-4xl">{num}</div>
                  <div className="mt-2 text-xs font-medium text-zinc-400 sm:text-sm">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── all other sections inside a centred wrapper ── */}
      <div className="mx-auto w-full max-w-screen-xl space-y-20 px-4 pt-16 pb-20 sm:px-6 lg:px-10 xl:px-16">

        {/* WHY ECOBRIDGES — MagicBento cards */}
        <section ref={whyRef.ref} className="space-y-10">
          <div
            className="space-y-3 transition-all duration-700"
            style={{ opacity: whyRef.visible ? 1 : 0, transform: whyRef.visible ? "translateY(0)" : "translateY(30px)" }}
          >
            <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Why Choose Us
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Why EcoBridges?</h2>
            <p className="max-w-3xl text-lg text-zinc-400">
              At EcoBridges, we don't just build projects — we build solutions that actually work in real environments.
            </p>
          </div>
          <MagicBento
            textAutoHide={true}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="16, 185, 129"
            disableAnimations={false}
          />
        </section>
        {/* EXPERTISE */}
        <ExpertiseCards />

        {/* WORKFLOW */}
        <section className="space-y-8">
          <div className="space-y-3 text-center">
            <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">Our Workflow</div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">How We Work</h2>
            <p className="mx-auto max-w-2xl text-sm text-zinc-400 sm:text-base">Five clear steps from first discussion to final deployment.</p>
          </div>
          <WorkflowDiagram processSteps={processSteps} processIcons={processIcons} />
        </section>
        {/* WHO WE WORK WITH */}
        <section ref={clientRef.ref} className="space-y-10">
          <div
            className="space-y-3 text-center transition-all duration-700"
            style={{ opacity: clientRef.visible ? 1 : 0, transform: clientRef.visible ? "translateY(0)" : "translateY(30px)" }}
          >
            <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">Our Clients</div>
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Who We Work With</h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">Project-based services and product-oriented development for:</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clientTypes.map((type, idx) => (
              <div
                key={type.label}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 text-center backdrop-blur-sm transition-all duration-500 hover:border-emerald-500/40 hover:bg-zinc-900/80 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/10"
                style={{
                  opacity: clientRef.visible ? 1 : 0,
                  transform: clientRef.visible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${idx * 80}ms`,
                  transitionDuration: "600ms",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/15 to-cyan-500/10 text-2xl transition-transform duration-300 group-hover:scale-110">{type.icon}</div>
                  <div className="text-sm font-semibold text-white">{type.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Circular gallery of example work */}
          <div style={{ marginTop: '3rem', height: '420px', position: 'relative' }}>
            <CircularGallery
              items={circularGalleryItems}
              bend={1}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollSpeed={2}
              scrollEase={0.05}
            />
          </div>
        </section>

        {/* FINAL CTA */}
        <section
          ref={ctaRef.ref}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-emerald-950/20 to-zinc-900 p-8 backdrop-blur-sm sm:p-16 transition-all duration-700"
          style={{ opacity: ctaRef.visible ? 1 : 0, transform: ctaRef.visible ? "translateY(0)" : "translateY(40px)" }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
            <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
          </div>
          <div className="relative space-y-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Have an Idea or Problem to Solve?</h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-zinc-300">
              Whether it's an IoT system, a web platform, a mobile app, or a complete end-to-end solution —{" "}
              <span className="font-bold text-emerald-400">EcoBridges is ready to build it with you.</span>
            </p>
            <div className="pt-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.04] hover:shadow-xl hover:shadow-emerald-500/40"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                Contact EcoBridges
                <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

      </div>{/* end centred wrapper */}
    </div>
  );
}