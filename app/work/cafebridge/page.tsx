"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useInView,
  SectionBadge,
  CreationProcessTimeline,
} from "@/components/ServicePageShell";
import { ScrollToggleHero } from "@/components/ScrollToggleHero";

const ACCENT = "#fbbf24";
const ACCENT_GRAD = "from-amber-500 to-orange-500";
const GRID_COLOR = "rgba(251,191,36,0.7)";

// ─── DATA ────────────────────────────────────────────────────────────────────

const problems = [
  {
    id: "01",
    q: "Why pay yearly when your business runs daily?",
    a: "CafeBridge charges per order — you pay only on days you earn. No slow month should cost you the same as a busy one.",
  },
  {
    id: "02",
    q: "Why sit at a counter when you can manage from your pocket?",
    a: "Owner, waiter, and chef all use the same system from any device — phone, tablet, or desktop.",
  },
  {
    id: "03",
    q: "Why share your business data with anyone?",
    a: "We use Firebase, so your data is secure by default. Buy your own custom build and you get full database access — no monthly charges, no one else can see it.",
  },
  {
    id: "04",
    q: "Why pay for features you never even use?",
    a: "Pick the plan that fits your volume. Start Pay As You Go with zero commitment — upgrade only when you need to.",
  },
];

const features = [
  {
    title: "Smart Billing",
    desc: "Fast, accurate bills every single time. No errors, no arguments at the counter.",
  },
  {
    title: "KOT Display",
    desc: "Kitchen sees every order the moment it's placed. No shouting. No paper slips.",
  },
  {
    title: "QR Ordering",
    desc: "Customer scans, browses, and orders from their own phone. No app download needed.",
  },
  {
    title: "Menu Management",
    desc: "Add items, change prices, mark dishes unavailable — all from your phone in seconds.",
  },
  {
    title: "Inventory Tracking",
    desc: "Know what's running low before it runs out. Stay stocked, stay serving.",
  },
  {
    title: "Business Analytics",
    desc: "See what's selling, what's not, and what's actually earning you money.",
  },
];

const steps = [
  {
    step: "01",
    title: "Discovery & Scoping",
    desc: "We understand your cafe, your workflow, and your exact requirements before writing any code.",
  },
  {
    step: "02",
    title: "Product Setup",
    desc: "We configure the system with your menu, branding, and workflow exactly how you want it.",
  },
  {
    step: "03",
    title: "Staff Training",
    desc: "We train your staff to use the system — owner, waiters, kitchen, everyone gets onboarded.",
  },
  {
    step: "04",
    title: "Launch & Support",
    desc: "Go live with confidence. We stay available for ongoing support, updates, and questions.",
  },
];

const platforms = [
  {
    name: "Web App",
    desc: "Works in any browser on any device. No installation. Staff can use it on their existing phones or tablets from day one.",
  },
  {
    name: "Mobile App",
    desc: "Full Android app published on the Play Store under your cafe's name. Your brand, your app.",
  },
  {
    name: "Website",
    desc: "A professional landing page for your cafe with your menu, location, and contact — discoverable on Google.",
  },
];

const plans = [
  {
    id: "payg",
    name: "Pay As You Go",
    tagline: "Zero commitment. Start today.",
    price: null,
    priceLabel: "No minimum",
    badge: null,
    rows: [
      { label: "App only", value: "₹0.30 / order" },
      { label: "App + QR ordering", value: "₹0.40 / order" },
      { label: "Monthly minimum", value: "None" },
      { label: "Setup fee", value: "None" },
    ],
    cta: "Start free",
    accent: false,
  },
  {
    id: "base",
    name: "Base",
    tagline: "For steady small cafes.",
    price: "₹499",
    priceLabel: "/mo",
    badge: null,
    rows: [
      { label: "Orders included", value: "2,000 / month" },
      { label: "Extra orders", value: "₹0.30 each" },
      { label: "QR ordering add-on", value: "+ ₹199 / month" },
      { label: "Extra orders with QR", value: "₹0.40 each" },
    ],
    cta: "Get Base",
    accent: false,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Most popular for growing restaurants.",
    price: "₹999",
    priceLabel: "/mo",
    badge: "Most popular",
    rows: [
      { label: "Orders included", value: "5,000 / month" },
      { label: "Extra orders", value: "₹0.30 each" },
      { label: "QR ordering add-on", value: "+ ₹399 / month" },
      { label: "Extra orders with QR", value: "₹0.40 each" },
    ],
    cta: "Get Pro",
    accent: true,
  },
  {
    id: "max",
    name: "Max",
    tagline: "High-volume restaurants.",
    price: "₹1,999",
    priceLabel: "/mo",
    badge: null,
    rows: [
      { label: "Orders included", value: "10,000 / month" },
      { label: "Extra orders", value: "₹0.30 each" },
      { label: "QR ordering add-on", value: "+ ₹799 / month" },
      { label: "Extra orders with QR", value: "₹0.40 each" },
    ],
    cta: "Get Max",
    accent: false,
  },
];

const customBuilds = [
  {
    name: "Website + QR",
    price: "₹14,999",
    desc: "Custom-branded website with QR ordering. One-time payment. Yours to keep forever.",
    features: [
      "Custom UI & branding",
      "QR ordering system",
      "Minor backend changes included",
      "1 year server + domain free",
    ],
    highlight: false,
  },
  {
    name: "Mobile App",
    price: "₹19,999",
    desc: "Full Android app published on Google Play Store under your cafe's name.",
    features: [
      "Custom UI & branding",
      "Published on Play Store",
      "1 year server free",
    ],
    highlight: false,
  },
  {
    name: "Combo",
    price: "₹29,999",
    desc: "Website + QR + Mobile App together. Save ₹5,000 vs buying separately.",
    features: [
      "Everything in both plans",
      "Save ₹5,000 vs buying separate",
      "1 year server + domain free",
    ],
    highlight: true,
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function CafeBridgePage() {
  const [billingTab, setBillingTab] = useState<"saas" | "custom">("saas");
  const featRef = useInView();
  const procRef = useInView();
  const pricRef = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* ── HERO ── */}
      <ScrollToggleHero
        accentGradient={ACCENT_GRAD}
        accentColor={ACCENT}
        badge="Cafe & Cloud Kitchen"
        badgeColor="amber"
        gridColor={GRID_COLOR}
        pretitle1="For cafes & restaurants"
        title1={<>
          CafeBridge
          <br />
          POS
        </>}
        subtitle1="A complete POS, ordering, and management system built specifically for cafes and cloud kitchens. First 3 months free."
        pretitle2="Simple, flexible pricing"
        title2={<>
          Pay only when
          <br />
          you earn
        </>}
        subtitle2="Pay per order — no setup fee, no monthly minimum, no risk. Your first 3 months are completely free." icon={""}      />

      <div className="mx-auto w-full max-w-screen-xl space-y-28 px-4 pt-20 pb-28 sm:px-6 lg:px-10 xl:px-16">
        {/* Back link */}
        <div>
          <Link
            href="/work#products-section"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Work
          </Link>
        </div>

        {/* ── PROBLEM SECTION ── */}
        <section className="text-left">
          <SectionBadge color="amber">Before we show you anything</SectionBadge>
          <h2
            className="mt-4 font-extrabold tracking-tight text-white"
            style={{
              fontSize: "clamp(1.9rem,4.5vw,3rem)",
              fontFamily: "var(--font-display)",
            }}
          >
            You deserve better than
            <br />
            what you&apos;re paying for.
          </h2>
          <p
            className="mt-3 text-base text-zinc-400 max-w-xl"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Most cafe POS systems charge you yearly, lock your data, and sell
            you features you never asked for. CafeBridge doesn&apos;t.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {problems.map((p) => (
              <div
                key={p.id}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-zinc-900/60 p-5 hover:border-amber-500/25 hover:bg-amber-500/5 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <span className="grid place-items-center h-7 w-7 shrink-0 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-bold text-amber-400 leading-none text-center select-none">
                    <span className="inline-flex items-center justify-center leading-none text-center">{p.id}</span>
                  </span>
                  <p className="text-sm font-semibold text-white leading-snug pt-0.5">
                    {p.q}
                  </p>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed pl-11">
                  {p.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PLATFORM AVAILABILITY ── */}
        <section className="space-y-8">
          <div className="space-y-3">
            <SectionBadge color="amber">Available everywhere</SectionBadge>
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{
                fontSize: "clamp(1.9rem,4.5vw,3rem)",
                fontFamily: "var(--font-display)",
              }}
            >
              Web app. Mobile app. Website.
              <br />
              All three. Your choice.
            </h2>
            <p
              className="max-w-xl text-base text-zinc-400"
              style={{ fontFamily: "var(--font-body)" }}
            >
              CafeBridge isn&apos;t locked to one platform. Use the web app
              today on any device, get a mobile app on the Play Store, or
              launch a full website — or all three together.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 hover:border-amber-500/25 hover:bg-amber-500/5 transition-all duration-200"
              >
                <p className="font-bold text-white text-base mb-2">{p.name}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section
          ref={procRef.targetRef}
          className="relative space-y-10 transition-all duration-700"
          style={{
            opacity: procRef.visible ? 1 : 0,
            transform: procRef.visible ? "translateY(0)" : "translateY(36px)",
          }}
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute -left-20 top-0 h-64 w-64 rounded-full blur-[100px]"
              style={{ background: `${ACCENT}14` }}
            />
            <div
              className="absolute -right-20 bottom-0 h-48 w-48 rounded-full blur-[80px]"
              style={{ background: `${ACCENT}0e` }}
            />
          </div>
          <div className="relative flex flex-col items-start space-y-3">
            <SectionBadge color="amber">One order. Zero confusion.</SectionBadge>
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{
                fontSize: "clamp(1.9rem,4.5vw,3rem)",
                fontFamily: "var(--font-display)",
              }}
            >
              See it working in 4 steps.
            </h2>
            <p
              className="text-base text-zinc-400 max-w-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              From the moment a customer scans a QR code to the moment staff
              confirms the order — CafeBridge handles everything in between.
            </p>
          </div>
          <div className="relative">
            <CreationProcessTimeline steps={steps} accentColor={ACCENT} />
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section
          ref={featRef.targetRef}
          className="space-y-10 transition-all duration-700"
          style={{
            opacity: featRef.visible ? 1 : 0,
            transform: featRef.visible ? "translateY(0)" : "translateY(32px)",
          }}
        >
          <div className="space-y-3">
            <SectionBadge color="amber">Everything your cafe needs</SectionBadge>
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{
                fontSize: "clamp(1.9rem,4.5vw,3rem)",
                fontFamily: "var(--font-display)",
              }}
            >
              One screen. All features.
            </h2>
            <p
              className="max-w-2xl text-base text-zinc-400"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Used by the owner, waiter, and chef — same system, one account,
              every role covered.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-white/10 bg-zinc-900/60 p-5 transition-all duration-200 hover:border-amber-500/30 hover:bg-amber-500/5"
              >
                <p className="font-semibold text-white group-hover:text-amber-400 transition-colors">
                  {f.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section
          id="pricing"
          ref={pricRef.targetRef}
          className="space-y-8 transition-all duration-700"
          style={{
            opacity: pricRef.visible ? 1 : 0,
            transform: pricRef.visible ? "translateY(0)" : "translateY(32px)",
          }}
        >
          {/* 3 months free banner */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4">
            <p className="text-sm font-bold text-amber-400">
              First 3 months completely free
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              No credit card needed. No setup fee. Try CafeBridge in your own
              cafe before paying anything.
            </p>
          </div>

          <div className="space-y-3">
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{
                fontSize: "clamp(1.9rem,4.5vw,3rem)",
                fontFamily: "var(--font-display)",
              }}
            >
              Pay only when your business runs.
            </h2>
            <p
              className="max-w-2xl text-base text-zinc-400"
              style={{ fontFamily: "var(--font-body)" }}
            >
              No setup fee. No monthly minimum on Pay As You Go. Prepaid plans
              — like a mobile recharge. Top up when you need, stop when you
              don&apos;t.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex justify-center">
            <div className="inline-flex gap-1 rounded-xl border border-white/10 bg-zinc-900/60 p-1">
              {(
                [
                  { id: "saas", label: "Monthly Plans" },
                  { id: "custom", label: "Custom Build" },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setBillingTab(t.id)}
                  className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                    billingTab === t.id
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── SaaS Plans ── */}
          {billingTab === "saas" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col rounded-2xl border p-5 transition-all duration-200 ${
                      plan.accent
                        ? "border-amber-500/50 bg-gradient-to-b from-amber-500/10 to-amber-500/5"
                        : "border-white/10 bg-zinc-900/60 hover:border-white/20"
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3.5 py-1 text-[10px] font-bold text-white shadow-lg shadow-amber-500/30 inline-flex items-center justify-center leading-none text-center select-none">
                        <span className="inline-flex items-center justify-center leading-none text-center">{plan.badge}</span>
                      </span>
                    )}

                    <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
                      {plan.name}
                    </p>

                    {plan.price ? (
                      <p className="text-3xl font-extrabold text-white">
                        {plan.price}
                        <span className="text-sm font-normal text-zinc-400">
                          {plan.priceLabel}
                        </span>
                      </p>
                    ) : (
                      <p className="text-xl font-bold text-white">
                        {plan.priceLabel}
                      </p>
                    )}

                    <p className="mt-1 text-xs text-zinc-500 mb-4 leading-relaxed">
                      {plan.tagline}
                    </p>

                    <div className="flex-1 space-y-3 border-t border-white/10 pt-4">
                      {plan.rows.map((r) => (
                        <div key={r.label} className="flex justify-between gap-2">
                          <span className="text-xs text-zinc-400">{r.label}</span>
                          <span className="text-xs font-semibold text-white text-right">
                            {r.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className={`mt-5 inline-flex items-center justify-center leading-none text-center rounded-full py-3 text-sm font-bold transition-all duration-200 ${
                        plan.accent
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/50 hover:scale-[1.04] active:scale-[0.98]"
                          : "border border-white/15 bg-white/5 text-white hover:border-amber-500/40 hover:bg-amber-500/10"
                      }`}
                    >
                      <span className="inline-flex items-center justify-center leading-none text-center">{plan.cta}</span>
                    </Link>
                  </div>
                ))}
              </div>

              <p className="text-xs text-zinc-500 text-center">
                Extra orders — ₹0.30 without QR&nbsp;&nbsp;|&nbsp;&nbsp;₹0.40
                with QR &nbsp;·&nbsp; Prepaid. Flexible. Zero risk.
              </p>
            </>
          )}

          {/* ── Custom Build ── */}
          {billingTab === "custom" && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-3">
                {customBuilds.map((b) => (
                  <div
                    key={b.name}
                    className={`relative flex flex-col rounded-2xl border p-5 transition-all duration-200 text-left ${
                      b.highlight
                        ? "border-amber-500/50 bg-gradient-to-b from-amber-500/10 to-amber-500/5"
                        : "border-white/10 bg-zinc-900/60 hover:border-white/20"
                    }`}
                  >
                    {b.highlight && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-[10px] font-bold text-white shadow-lg shadow-amber-500/30">
                        Best value · Save ₹5,000
                      </span>
                    )}

                    <p className="font-bold text-white text-lg">{b.name}</p>
                    <p className="text-2xl font-extrabold text-amber-400 mt-1">
                      {b.price}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5 mb-1">
                      one-time payment
                    </p>
                    <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                      {b.desc}
                    </p>

                    <ul className="flex-1 space-y-2.5 border-t border-white/10 pt-4">
                      {b.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-2.5 text-xs text-zinc-300"
                        >
                          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/contact"
                      className={`mt-5 flex items-center justify-center rounded-full py-2.5 text-sm font-bold transition-all duration-200 ${
                        b.highlight
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/50 hover:scale-[1.04] active:scale-[0.98]"
                          : "border border-white/15 bg-white/5 text-white hover:border-amber-500/40 hover:bg-amber-500/10"
                      }`}
                    >
                      Enquire now
                    </Link>
                  </div>
                ))}
              </div>

              {/* Data privacy callout */}
              <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5 text-left">
                <p className="font-semibold text-white text-sm">
                  Your data. Full control.
                </p>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  We use Firebase — so all data is secure and managed by Google&apos;s
                  infrastructure by default. With a custom build, you get full
                  database access. Your data, your server, no monthly charges, and
                  not even we can see it. After year one, server and domain renew
                  directly through you — full control, always yours.
                </p>
              </div>
            </div>
          )}

          <p className="text-xs text-zinc-500 text-center">
            WhatsApp billing coming soon — pricing will update when it launches.
          </p>
        </section>

        {/* ── FINAL CTA ── */}
        <section>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 p-8 sm:p-16 text-center">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[100px]" />
            </div>

            <div className="relative space-y-6">
              <SectionBadge color="amber">
                Let&apos;s get your cafe online
              </SectionBadge>

              <h2 className="text-3xl font-bold text-white sm:text-4xl mx-auto max-w-2xl">
                Free demo — see it running in your own cafe before you pay
                anything.
              </h2>

              <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                WhatsApp us and get a response within 24 hours. We show you
                everything live, in your cafe, on your own devices. First 3
                months free — no card needed.
              </p>

              <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto pt-2 pb-2">
                {[
                  { label: "WhatsApp us", sub: "Response in 24 hrs" },
                  { label: "Free demo", sub: "We show you live" },
                  { label: "Go live", sub: "Your cafe online in days" },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <p className="text-sm font-semibold text-white text-center">{s.label}</p>
                    <p className="text-xs text-zinc-500 text-center">{s.sub}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <a
                  href="https://wa.me/917862949437"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-amber-500/30 transition-all hover:shadow-xl hover:shadow-amber-500/50 hover:scale-[1.04] active:scale-[0.98]"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp · +91 78629 49437
                </a>
                <a
                  href="mailto:ecobridgers.tech@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-amber-500/40 hover:bg-amber-500/10"
                >
                  ecobridgers.tech@gmail.com
                </a>
              </div>

              <p className="text-xs text-zinc-600 pt-2">
                Eco Bridgers — Building digital bridges for cafes across India
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}