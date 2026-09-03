"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useInView, SectionBadge, PlatformBenefitsGrid,
  CreationProcessTimeline, TechMarquee,
} from "@/components/ServicePageShell";
import { ScrollToggleHero } from "@/components/ScrollToggleHero";

const ACCENT = "#34d399";
const ACCENT_GRAD = "from-emerald-500 to-teal-500";
const GRID_COLOR = "rgba(52,211,153,0.7)";

const plans = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Perfect for small units",
    price: "₹500",
    badge: null,
    rows: [
      { label: "Production tracking", value: "Yes" },
      { label: "Inventory management", value: "Yes" },
      { label: "Users", value: "Up to 3" },
      { label: "Reports", value: "Basic" },
    ],
    cta: "Get Started",
    accent: false,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Most popular",
    price: "₹1,000",
    badge: "Best Value",
    rows: [
      { label: "Production tracking", value: "Yes" },
      { label: "Inventory management", value: "Advanced" },
      { label: "Users", value: "Up to 10" },
      { label: "Reports", value: "Detailed analytics" },
    ],
    cta: "Get Pro",
    accent: true,
  },
];

const features = [
  { icon: "🧵", title: "Production Tracking", desc: "Track every order from start to finish" },
  { icon: "📦", title: "Inventory Management", desc: "Manage yarn, fabric, and finished goods" },
  { icon: "👥", title: "Supplier & Buyer Mgmt", desc: "Keep all contacts and transactions organized" },
  { icon: "📊", title: "Real-time Reports", desc: "Get instant insights into your business" },
  { icon: "📱", title: "Mobile Access", desc: "Manage from your phone or tablet" },
  { icon: "🔒", title: "Data Security", desc: "Your data is safe and secure" },
];

const steps = [
  { step: "01", title: "Discovery & Scoping", desc: "We understand your textile business, workflow and requirements before writing any code." },
  { step: "02", title: "Product Setup", desc: "We set up the system with your products, branding and workflow exactly how you want it." },
  { step: "03", title: "Staff Training", desc: "We train your staff to use the system — owners, workers, everyone." },
  { step: "04", title: "Launch & Support", desc: "Go live with confidence. We stay available for ongoing support and updates." },
];

const techStack = ["Next.js", "React", "Node.js", "Prisma", "PostgreSQL", "Firebase", "Supabase", "Mobile App", "Cloud Storage"];

const platformBenefits = features.map((f) => ({ title: f.title, desc: f.desc }));

export default function TextileBridgePage() {
  const [billingTab, setBillingTab] = useState("saas");
  const offerRef = useInView();
  const caseRef = useInView();
  const procRef = useInView();
  const techRef = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ScrollToggleHero
        accentGradient={ACCENT_GRAD}
        accentColor={ACCENT}
        badge="Textile Manufacturing"
        badgeColor="emerald"
        icon="🧵"
        gridColor={GRID_COLOR}
        pretitle1="For textile businesses"
        title1={<>TextileBridge<br/>Management</>}
        subtitle1="A complete production, inventory, and order management system built specifically for textile manufacturing units."
        pretitle2="Streamline your operations"
        title2={<>Grow your textile<br/>business</>}
        subtitle2="End-to-end production tracking, yarn & fabric inventory, order management, and real-time reporting."
      />

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">
        {/* Back to Work Link */}
        <div>
          <Link 
            href="/work#products-section"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-emerald-400 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Work
          </Link>
        </div>

        {/* ── THE QUESTIONS ── */}
        <section className="text-center">
          <SectionBadge color="emerald">Before we show you anything</SectionBadge>
          <h2 className="mt-3 font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
            Take your textile business to the next level
          </h2>
          <p className="mt-2 text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
            Answer: scroll down. It's all here.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Tired of manual production tracking?",
              "Lost track of your inventory?",
              "Need better visibility into your operations?",
              "Want to grow your textile business efficiently?"
            ].map((q, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-5 text-left hover:border-emerald-500/25 hover:bg-emerald-500/5 transition-all duration-200"
              >
                <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-bold text-emerald-400">
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
            <SectionBadge color="emerald">Get started quickly</SectionBadge>
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
            <SectionBadge color="emerald">Everything your business needs</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
              Powerful features for textile businesses
            </h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              Designed specifically for the textile industry
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700" style={{ opacity: offerRef.visible ? 1 : 0, transform: offerRef.visible ? "translateY(0)" : "translateY(28px)", transitionDelay: "120ms" }}>
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/5 group"
              >
                <span className="text-3xl">{f.icon}</span>
                <p className="mt-4 font-semibold text-white group-hover:text-emerald-400 transition-colors">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing">
          <div className="space-y-3">
            <SectionBadge color="emerald">Pricing</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
              Simple, affordable pricing
            </h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              Choose the plan that fits your business
            </p>
          </div>

          {/* SaaS Plans */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border p-5 transition-all duration-200 ${
                  plan.accent
                    ? "border-emerald-500/50 bg-gradient-to-b from-emerald-500/10 to-emerald-500/5"
                    : "border-white/10 bg-zinc-900/60 hover:border-white/20"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3.5 py-1 text-[10px] font-bold text-white shadow-lg shadow-emerald-500/30 inline-flex items-center justify-center leading-none text-center select-none">
                    <span className="inline-flex items-center justify-center leading-none text-center">{plan.badge}</span>
                  </span>
                )}

                <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">
                  {plan.name}
                </p>

                {plan.price ? (
                  <p className="text-3xl font-extrabold text-white">
                    {plan.price}
                    <span className="text-sm font-normal text-zinc-400"> /mo</span>
                  </p>
                ) : (
                  <p className="text-xl font-bold text-white">No minimum</p>
                )}

                <p className="mt-1 text-xs text-zinc-500 mb-4 leading-relaxed">{plan.tagline}</p>

                <div className="flex-1 space-y-3 border-t border-white/10 pt-4">
                  {plan.rows.map((r) => (
                    <div key={r.label} className="flex justify-between gap-2">
                      <span className="text-xs text-zinc-400">{r.label}</span>
                      <span className="text-xs font-semibold text-white text-right">{r.value}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className={`mt-5 inline-flex items-center justify-center leading-none text-center rounded-full py-3 text-sm font-bold transition-all duration-200 ${
                    plan.accent
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-[1.02] active:scale-[0.98]"
                      : "border border-white/15 bg-white/5 text-white hover:border-emerald-500/40 hover:bg-emerald-500/10"
                  }`}
                >
                  <span className="inline-flex items-center justify-center leading-none text-center">{plan.cta}</span>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-emerald-950/20 to-zinc-900 p-8 sm:p-16 text-center">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
            </div>

            <div className="relative space-y-5">
              <SectionBadge color="emerald">Ready to transform your textile business?</SectionBadge>
              <h2 className="text-3xl font-bold text-white sm:text-4xl mx-auto max-w-2xl">
                Get started with TextileBridge today
              </h2>
              <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                Contact us for a free demo and see how TextileBridge can help your business grow.
              </p>

              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
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
