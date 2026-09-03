"use client";

import { useState } from "react";
import Link from "next/link";
import { useInView, SectionBadge } from "@/components/ServicePageShell";
import { ScrollToggleHero } from "@/components/ScrollToggleHero";

const ACCENT = "#fbbf24";
const ACCENT_GRAD = "from-amber-500 to-orange-500";
const GRID_COLOR = "rgba(251,191,36,0.7)";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const plans = [
  {
    id: "payg",
    name: "Pay As You Go",
    tagline: "30 orders today, pay for 30. Day off, pay nothing.",
    price: null,
    priceLabel: "No minimum",
    badge: null,
    rows: [
      // { label: "Without QR", value: "₹0.30 / order" },
      // { label: "With QR ordering", value: "₹0.40 / order" },
      { label: "Monthly minimum", value: "None" },
      { label: "Setup fee", value: "None" },
    ],
    cta: "Start free",
    accent: false,
  },
  {
    id: "base",
    name: "Base",
    tagline: "Steady cafe, steady cost.",
    price: "₹499",
    priceLabel: "/mo",
    badge: null,
    rows: [
      { label: "Orders included", value: "2,000 / month" },
      { label: "Extra orders", value: "₹0.30 each" },
      // { label: "QR add-on", value: "+ ₹199 / month" },
      // { label: "Extra with QR", value: "₹0.40 each" },
    ],
    cta: "Get Base",
    accent: false,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Growing fast? This one keeps up.",
    price: "₹999",
    priceLabel: "/mo",
    badge: "Most popular",
    rows: [
      { label: "Orders included", value: "5,000 / month" },
      { label: "Extra orders", value: "₹0.30 each" },
      // { label: "QR add-on", value: "+ ₹399 / month" },
      // { label: "Extra with QR", value: "₹0.40 each" },
    ],
    cta: "Get Pro",
    accent: true,
  },
  {
    id: "max",
    name: "Max",
    tagline: "Full house every night.",
    price: "₹1,999",
    priceLabel: "/mo",
    badge: null,
    rows: [
      { label: "Orders included", value: "10,000 / month" },
      { label: "Extra orders", value: "₹0.30 each" },
      // { label: "QR add-on", value: "+ ₹799 / month" },
      // { label: "Extra with QR", value: "₹0.40 each" },
    ],
    cta: "Get Max",
    accent: false,
  },
];

const houseSpecialFeatures = [
  "Cafe website — shows up on Google",
  "QR ordering on every table",
  "Android app on Play Store under your name",
  "Admin panel — orders, menu, kitchen in one screen",
  "WhatsApp bill to customer on order confirm",
  "1 year server + domain included free",
  "Full database access — your server, your data",
  "Save ₹5,000 vs buying separately",
];

const platforms = [
  {
    name: "Web App",
    tag: "Works today, no install",
    desc: "Runs in any browser on any phone, tablet, or desktop. Staff are ready from day one — nothing to download.",
  },
  {
    name: "Mobile App",
    tag: "Your brand on Play Store",
    desc: "Full Android app published under your cafe's name. Customers download your app, not ours.",
  },
  {
    name: "Website",
    tag: "Get found on Google",
    desc: "Your cafe online with menu, photos, location, and contact. New customers find you before they even step out.",
  },
];

// ─── INQUIRY FORM ──────────────────────────────────────────────────────────────

function InquiryForm() {
  const [form, setForm] = useState({
    name: "",
    cafe: "",
    phone: "",
    email: "",
    plan: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center space-y-2">
        <p className="text-lg font-bold text-amber-400">We got it.</p>
        <p className="text-sm text-zinc-400">
          We'll WhatsApp you within 24 hours to set up a free demo at your cafe.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:bg-zinc-900 transition-all duration-200";

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400">Your name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Devam Gandhi"
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400">Cafe / restaurant name</label>
          <input
            name="cafe"
            value={form.cafe}
            onChange={handleChange}
            placeholder="The Coffee House"
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400">WhatsApp number *</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className={inputClass}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">Plan you're interested in</label>
        <select
          name="plan"
          value={form.plan}
          onChange={handleChange}
          className={inputClass + " appearance-none cursor-pointer"}
        >
          <option value="">Not sure yet — just exploring</option>
          <option value="payg">Pay As You Go</option>
          <option value="base">Base — ₹499/mo</option>
          <option value="pro">Pro — ₹999/mo</option>
          <option value="max">Max — ₹1,999/mo</option>
          <option value="house">House Special — ₹29,999 one-time</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">Anything you want to tell us</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={3}
          placeholder="How many tables, what city, what you need — anything helps."
          className={inputClass + " resize-none"}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={status === "sending" || !form.name || !form.phone}
        className="w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 text-sm font-bold text-white shadow-md shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {status === "sending" ? "Sending..." : "Request free demo →"}
      </button>

      {status === "error" && (
        <p className="text-xs text-red-400 text-center">
          Something went wrong. WhatsApp us directly at +91 78629 49437.
        </p>
      )}

      <p className="text-xs text-zinc-600 text-center">
        We reply within 24 hours. No sales scripts — just a straight conversation.
      </p>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function CafeBridgePage() {
  const [billingTab, setBillingTab] = useState<"saas" | "custom">("saas");
  const pricRef = useInView();
  const ctaRef = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ScrollToggleHero
        accentGradient={ACCENT_GRAD}
        accentColor={ACCENT}
        badge="Cafe & Cloud Kitchen"
        badgeColor="amber"
        gridColor={GRID_COLOR}
        pretitle1="For cafes & restaurants"
        title1={<>Your cafe.<br />Fully loaded.</>}
        subtitle1="POS, QR ordering, digital menu, and WhatsApp billing — one system, every device, first 3 months free."
        pretitle2="Pay per order"
        title2={<>Pay only when<br />you serve.</>}
        subtitle2="30 orders today, pay for 30. Day off, pay nothing. No yearly lock-in. No setup fee. No hidden charges."
        icon={""}
      />

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-28 sm:px-6 lg:px-10 xl:px-16">

        {/* Back */}
        {/* <div>
          <Link href="/work#products-section" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition-colors">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Work
          </Link>
        </div> */}

        {/* ── WHY CAFEBRIDGE ── */}
        <section className="space-y-8">
          <div className="space-y-3">
            {/* <SectionBadge color="amber">Why CafeBridge</SectionBadge> */}
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
              Other POS systems charge you
              <br />before you serve a single plate.
            </h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              ₹30,000 upfront. ₹8,000 every year. Same fee whether your kitchen is packed or empty. Your sales data on their server. Features you never asked for. CafeBridge is none of that.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Pay per order",
                desc: "You pay only on days your kitchen runs. Slow month costs less. No order, no charge. No yearly commitment.",
              },
              {
                title: "QR ordering on every table",
                desc: "Customer scans, browses your full menu, and orders from their phone. No app download. No waiting for a waiter. Bill goes straight to their WhatsApp.",
              },
              {
                title: "Your data stays yours",
                desc: "Standard plans run on Firebase — secure by default. House Special gives you your own server. Not even we can see your sales data.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 hover:border-amber-500/25 hover:bg-amber-500/5 transition-all duration-200">
                <p className="font-bold text-white mb-2">{item.title}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PLATFORMS ── */}
        <section className="space-y-8">
          <div className="space-y-3">
            {/* <SectionBadge color="amber">All platforms</SectionBadge> */}
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
              Web app. Mobile app. Website.
              <br />All three. Your choice.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {platforms.map((p) => (
              <div key={p.name} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 hover:border-amber-500/25 hover:bg-amber-500/5 transition-all duration-200">
                <p className="font-bold text-white text-base">{p.name}</p>
                <p className="text-xs text-amber-400 font-medium mt-0.5 mb-3">{p.tag}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section
          id="pricing"
          ref={pricRef.targetRef}
          className="space-y-8 transition-all duration-700"
          style={{ opacity: pricRef.visible ? 1 : 0, transform: pricRef.visible ? "translateY(0)" : "translateY(32px)" }}
        >
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4">
            <p className="text-sm font-bold text-amber-400">First 3 months completely free — no card needed.</p>
            <p className="text-xs text-zinc-400 mt-1">Try CafeBridge in your own cafe, on your own devices, with your own menu. No commitment. If it doesn't work for you, walk away.</p>
          </div>

          <div className="space-y-2">
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
              No yearly lock-in.
              <br />No hidden charges.
            </h2>
            <p className="max-w-xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              Pay like a mobile recharge — top up when you need, stop when you don't.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex gap-1 rounded-xl border border-white/10 bg-zinc-900/60 p-1">
              {([
                { id: "saas", label: "Monthly Plans" },
                { id: "custom", label: "House Special" },
              ] as const).map((t) => (
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

          {/* Monthly plans */}
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
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3.5 py-1 text-[10px] font-bold text-white shadow-lg shadow-amber-500/30">
                        {plan.badge}
                      </span>
                    )}
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">{plan.name}</p>
                    {plan.price ? (
                      <p className="text-3xl font-extrabold text-white">
                        {plan.price}<span className="text-sm font-normal text-zinc-400">{plan.priceLabel}</span>
                      </p>
                    ) : (
                      <p className="text-xl font-bold text-white">{plan.priceLabel}</p>
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
                      href="#inquiry"
                      className={`mt-5 inline-flex items-center justify-center rounded-full py-3 text-sm font-bold transition-all duration-200 ${
                        plan.accent
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/50 hover:scale-[1.04] active:scale-[0.98]"
                          : "border border-white/15 bg-white/5 text-white hover:border-amber-500/40 hover:bg-amber-500/10"
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                ))}
              </div>
              <p className="text-xs text-zinc-500 text-center">
                Extra orders — ₹0.30 without QR · ₹0.40 with QR · Prepaid. Flexible. Zero risk.
              </p>
            </>
          )}

          {/* House Special */}
          {billingTab === "custom" && (
            <div className="space-y-4">
              <div className="relative rounded-2xl border border-amber-500/50 bg-gradient-to-b from-amber-500/10 to-amber-500/5 p-7">
                <span className="absolute -top-3.5 left-8 whitespace-nowrap rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-1 text-[10px] font-bold text-white shadow-lg shadow-amber-500/30">
                  Best value · Save ₹5,000
                </span>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">House Special</p>
                    <p className="text-4xl font-extrabold text-white">₹29,999</p>
                    <p className="text-xs text-zinc-500 mt-1">one-time · yours forever</p>
                  </div>
                  <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
                    Website, QR ordering, Android app — everything under your brand, on your server, one payment. No monthly fee after that.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 border-t border-white/10 pt-5">
                  {houseSpecialFeatures.map((f) => (
                    <div key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link
                  href="#inquiry"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-8 py-3 text-sm font-bold text-white shadow-md shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Order the House Special
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5">
                <p className="font-semibold text-white text-sm">Your data. Your server. Nobody else's.</p>
                <p className="mt-1 text-xs text-zinc-400 leading-relaxed">
                  Standard plans use Firebase — secure, Google-managed infrastructure. The House Special gives you full database access on your own server. Your orders, your revenue, your customer patterns — not visible to us, not shared with anyone. After year one, server and domain renew directly through you.
                </p>
              </div>
            </div>
          )}

          <p className="text-xs text-zinc-500 text-center">
            WhatsApp billing coming soon — pricing will update when it launches.
          </p>
        </section>

        {/* ── INQUIRY FORM ── */}
        <section
          id="inquiry"
          ref={ctaRef.targetRef}
          className="space-y-8 transition-all duration-700"
          style={{ opacity: ctaRef.visible ? 1 : 0, transform: ctaRef.visible ? "translateY(0)" : "translateY(32px)" }}
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">

            {/* Left — text */}
            <div className="space-y-6">
              <div className="space-y-3">
                {/* <SectionBadge color="amber">Free demo</SectionBadge> */}
                <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
                  See it live in your
                  <br />cafe before you pay.
                </h2>
                <p className="text-base text-zinc-400 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  We come to your cafe, set it up on your own devices, and show you everything working — orders, kitchen display, WhatsApp billing. First 3 months free. No card needed.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { step: "01", text: "Fill the form — we reply on WhatsApp within 24 hours." },
                  { step: "02", text: "We visit your cafe and run a live demo on your devices." },
                  { step: "03", text: "Your cafe goes live. Staff trained. We stay available." },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-bold text-amber-400">
                      {s.step}
                    </span>
                    <p className="text-sm text-zinc-400 leading-relaxed pt-0.5">{s.text}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 space-y-2 border-t border-white/10">
                <p className="text-xs text-zinc-500">Or reach us directly</p>
                <a href="https://wa.me/917862949437" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white hover:text-amber-400 transition-colors">
                  <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  +91 78629 49437
                </a>
                <a href="mailto:ecobridgers.tech@gmail.com" className="flex items-center gap-2 text-sm text-white hover:text-amber-400 transition-colors">
                  <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  ecobridgers.tech@gmail.com
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
              <p className="text-base font-bold text-white mb-1">Request a free demo</p>
              <p className="text-xs text-zinc-500 mb-6">We reply on WhatsApp within 24 hours.</p>
              <InquiryForm />
            </div>
          </div>
        </section>

        {/* <p className="text-xs text-zinc-600 text-center pb-4">
          Eco Bridgers — Building digital bridges for cafes across India
        </p> */}
      </div>
    </div>
  );
}