"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useInView, SectionBadge, PlatformBenefitsGrid,
  CreationProcessTimeline, TechMarquee,
} from "@/components/ServicePageShell";
import { ScrollToggleHero } from "@/components/ScrollToggleHero";

const ACCENT = "#06b6d4";
const ACCENT_GRAD = "from-cyan-500 to-blue-500";
const GRID_COLOR = "rgba(6,182,212,0.7)";

const features = [
  { icon: "📡", title: "Live Sensor Dashboard", desc: "Monitor all machines in real-time" },
  { icon: "⚠️", title: "Anomaly Detection", desc: "Get alerts before issues become problems" },
  { icon: "🔧", title: "Predictive Maintenance", desc: "Schedule maintenance before breakdowns" },
  { icon: "📊", title: "Data Analytics", desc: "Get actionable insights from your data" },
  { icon: "🏭", title: "Multi-machine Support", desc: "Monitor all your machines in one place" },
  { icon: "🌐", title: "Cloud-based", desc: "Access from anywhere, anytime" },
];

const steps = [
  { step: "01", title: "Discovery & Scoping", desc: "We understand your machines and requirements before installing any sensors." },
  { step: "02", title: "Sensor Installation", desc: "We install sensors on your machines and set up secure data transmission." },
  { step: "03", title: "System Configuration", desc: "We configure the dashboard and alert system to your exact needs." },
  { step: "04", title: "Launch & Support", desc: "Go live with confidence. We stay available for ongoing support and updates." },
];

const techStack = ["IoT Sensors", "Next.js", "React", "Node.js", "Prisma", "PostgreSQL", "Firebase", "Supabase", "Cloud Storage", "AI/ML"];

const platformBenefits = features.map((f) => ({ title: f.title, desc: f.desc }));

export default function BIoTSensePage() {
  const offerRef = useInView();
  const caseRef = useInView();
  const procRef = useInView();
  const techRef = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ScrollToggleHero
        accentGradient={ACCENT_GRAD}
        accentColor={ACCENT}
        badge="IoT & Machine Health"
        badgeColor="cyan"
        icon="📡"
        gridColor={GRID_COLOR}
        pretitle1="For manufacturing"
        title1={<>BIoTSense<br/>Monitoring</>}
        subtitle1="Machine health monitoring & predictive maintenance powered by IoT sensors and AI anomaly detection."
        pretitle2="Stop unexpected breakdowns"
        title2={<>Predict, prevent,<br/>optimize</>}
        subtitle2="Attach sensors to any machine and get live vibration, temperature, and current data. BIoTSense flags anomalies before breakdowns happen."
      />

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">
        {/* Back to Work Link */}
        <div>
          <Link 
            href="/work#products-section"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-cyan-400 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Work
          </Link>
        </div>

        {/* ── THE QUESTIONS ── */}
        <section className="text-center">
          <SectionBadge color="cyan">Before we show you anything</SectionBadge>
          <h2 className="mt-3 font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
            Stop unexpected breakdowns
          </h2>
          <p className="mt-2 text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
            Answer: scroll down. It's all here.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Unexpected machine breakdowns costing you money?",
              "Want to reduce maintenance costs?",
              "Need better visibility into machine health?",
              "Looking to improve operational efficiency?"
            ].map((q, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-5 text-left hover:border-cyan-500/25 hover:bg-cyan-500/5 transition-all duration-200"
              >
                <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-bold text-cyan-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-zinc-300 pt-1">{q}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section
          ref={procRef.targetRef}
          className="relative space-y-8 transition-all duration-700"
          style={{ opacity: procRef.visible ? 1 : 0, transform: procRef.visible ? "translateY(0)" : "translateY(36px)" }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full blur-[100px]" style={{ background: `${ACCENT}14` }} />
            <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full blur-[80px]" style={{ background: `${ACCENT}0e` }} />
          </div>
          <div className="relative mb-10 flex flex-col items-start space-y-3 text-left">
            <SectionBadge color="cyan">Simple setup process</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
              See it working in 4 steps.
            </h2>
          </div>
          <div className="relative">
            <CreationProcessTimeline steps={steps} accentColor={ACCENT} />
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section
          ref={offerRef.targetRef}
          className="space-y-10"
        >
          <div className="space-y-3 transition-all duration-700" style={{ opacity: offerRef.visible ? 1 : 0, transform: offerRef.visible ? "translateY(0)" : "translateY(32px)" }}>
            <SectionBadge color="cyan">Powerful features</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
              Everything you need for machine monitoring
            </h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              Comprehensive IoT solution for manufacturing
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700" style={{ opacity: offerRef.visible ? 1 : 0, transform: offerRef.visible ? "translateY(0)" : "translateY(28px)", transitionDelay: "120ms" }}>
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 transition-all duration-200 hover:border-cyan-500/30 hover:bg-cyan-500/5 group"
              >
                <span className="text-3xl">{f.icon}</span>
                <p className="mt-4 font-semibold text-white group-hover:text-cyan-400 transition-colors">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-cyan-950/20 to-zinc-900 p-8 sm:p-16 text-center">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
            </div>

            <div className="relative space-y-5">
              <SectionBadge color="cyan">Ready to reduce downtime?</SectionBadge>
              <h2 className="text-3xl font-bold text-white sm:text-4xl mx-auto max-w-2xl">
                Get started with BIoTSense today
              </h2>
              <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                Contact us for a free demo and see how BIoTSense can help your business save money and improve efficiency.
              </p>

              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
