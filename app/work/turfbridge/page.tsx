"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useInView, SectionBadge, PlatformBenefitsGrid,
  CreationProcessTimeline, TechMarquee,
} from "@/components/ServicePageShell";
import { ScrollToggleHero } from "@/components/ScrollToggleHero";

const ACCENT = "#a855f7";
const ACCENT_GRAD = "from-purple-500 to-pink-500";
const GRID_COLOR = "rgba(168,85,247,0.7)";

const plan = {
  name: "Owner Plan",
  tagline: "Everything a turf owner needs — one simple price",
  price: "₹500",
  rows: [
    { label: "Slot availability management", value: "Yes" },
    { label: "Offline booking management", value: "Yes" },
    { label: "Online bookings from players", value: "Yes" },
    { label: "Payment and advance tracking", value: "Yes" },
    { label: "Dynamic pricing (time based)", value: "Yes" },
    { label: "Weekday and weekend pricing", value: "Yes" },
    { label: "Monthly revenue reports", value: "Yes" },
    { label: "PDF export of reports", value: "Yes" },
    { label: "Player booking notifications", value: "Yes" },
    { label: "Promote your turf to players", value: "Yes" },
    { label: "Number of turfs", value: "Up to 6" },
  ],
  cta: "Start Free Trial",
};

const ownerFeatures = [
  {
    title: "Availability at a Glance",
    desc: "See every time slot across all your turfs in one grid. Know what is free and what is booked in under 5 seconds — perfect when a customer calls.",
  },
  {
    title: "Offline Booking Management",
    desc: "Add walk-in and phone bookings instantly. Track advance payments, due amounts, and booking status all in one place.",
  },
  {
    title: "Online Bookings from Players",
    desc: "Players discover and book your turf directly from the TurfBridge player app. Bookings appear in your dashboard automatically.",
  },
  {
    title: "Smart Payment Tracking",
    desc: "Track advance paid, balance due, and total revenue per booking. Know exactly who has paid and who owes you money.",
  },
  {
    title: "Revenue Reports",
    desc: "View daily, weekly, and monthly revenue with a calendar view. Select any date range and export a full PDF report.",
  },
  {
    title: "Dynamic Pricing",
    desc: "Set different rates for morning, afternoon, and night slots. Separate pricing for weekdays and weekends. Simple to configure.",
  },
  {
    title: "Manage From Your Phone",
    desc: "Everything runs on your Android phone. No computer needed. Built for real-time use on the ground.",
  },
  {
    title: "Instant Notifications",
    desc: "Get notified the moment a player books your turf online. Never miss a booking.",
  },
  {
    title: "Promote Your Turf",
    desc: "Reach more players by placing your turf as a featured listing in the TurfBridge player app. More visibility, more bookings.",
  },
];

const playerFeatures = [
  {
    title: "Discover Turfs Near You",
    desc: "Browse available turfs in your city filtered by sport, price range, and area. See real-time slot availability before you book.",
  },
  {
    title: "Book Instantly",
    desc: "Select your time slot, pay the advance online, and get a confirmation. No phone calls, no back and forth.",
  },
  {
    title: "Play With Strangers, Make Friends",
    desc: "Your friends are not interested? No problem. Post that you are free at a certain time and find other players in your city who want to play. Join a match or start one — cricket, football, basketball, whatever your game is.",
  },
  {
    title: "Upcoming Matches in Your City",
    desc: "See matches being organized near you. Check the sport, time, location, and who is playing. Join with one tap and show up ready.",
  },
  {
    title: "A Community Built Around Sport",
    desc: "TurfBridge is not just a booking app. It is where players in your city connect, organize games, and build a sporting community — one match at a time.",
  },
  {
    title: "Track Your Game Stats",
    desc: "See your total games played, hours on the turf, favourite sport, and booking history — all in your player profile.",
  },
];

const steps = [
  {
    step: "01",
    title: "Register Your Business",
    desc: "Sign up with your business name and basic details. Takes under 2 minutes.",
  },
  {
    step: "02",
    title: "Set Up Your Turfs",
    desc: "Add your turf count, operating hours, and pricing blocks for different time slots.",
  },
  {
    step: "03",
    title: "Start Managing",
    desc: "Add bookings, check availability, and track payments from day one. No training needed.",
  },
  {
    step: "04",
    title: "Grow With Players",
    desc: "Players in your city discover and book your turf online. You get notified instantly and your revenue grows.",
  },
];

const faqs = [
  {
    q: "Do I need a computer to use TurfBridge?",
    a: "No. TurfBridge is a mobile app built for Android. Everything — bookings, payments, reports — runs on your phone.",
  },
  {
    q: "What happens after the 3 month free trial?",
    a: "After the trial, the plan is ₹500 per month. No hidden charges. Cancel anytime.",
  },
  {
    q: "Can I manage more than one turf ground?",
    a: "Yes. One account supports up to 6 turf grounds at the same location.",
  },
  {
    q: "What if a player books online — how do I know?",
    a: "You get an instant notification on your phone. The booking appears in your dashboard automatically, just like an offline booking.",
  },
  {
    q: "Can I set different prices for morning and night slots?",
    a: "Yes. You can create pricing blocks for any time range — morning, afternoon, night — with separate rates for weekdays and weekends.",
  },
  {
    q: "Is my data safe?",
    a: "All data is stored securely on Firebase — the same infrastructure used by thousands of apps globally. Each owner account is completely isolated.",
  },
  {
    q: "Is the player app free?",
    a: "Yes. The player app is completely free. Players can discover turfs, book slots, join matches, and connect with other players at no cost.",
  },
];

export default function TurfBridgePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const offerRef = useInView();
  const playerRef = useInView();
  const procRef = useInView();
  const faqRef = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ScrollToggleHero
        accentGradient={ACCENT_GRAD}
        accentColor={ACCENT}
        badge="Turf Management Platform"
        badgeColor="amber"
        gridColor={GRID_COLOR}
        pretitle1="For turf owners"
        title1={<>TurfBridge<br />Owner App</>}
        subtitle1="Manage your turf bookings, availability, and payments — all from your phone. Built for box cricket and sports venue owners across India."
        pretitle2="For players"
        title2={<>Find. Book.<br />Play.</>}
        subtitle2="Discover turfs near you, book a slot in seconds, and find other players to play with — even if your friends are not interested. TurfBridge connects you with the sporting community in your city." icon={""}      />

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">

        {/* Back */}
        <div>
          <Link
            href="/work#products-section"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-purple-400 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Work
          </Link>
        </div>

        {/* ── PAIN POINTS ── */}
        <section className="text-center">
          <SectionBadge color="amber">Sound familiar?</SectionBadge>
          <h2
            className="mt-3 font-extrabold tracking-tight text-white"
            style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
          >
            Running a turf on paper is holding you back
          </h2>
          <p className="mt-2 text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
            TurfBridge fixes all of this.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Customers call to ask availability and you have to check a notebook?",
              "Advance payments are tracked on WhatsApp or paper receipts?",
              "You have no clear picture of what your monthly revenue actually was?",
              "Players in your city do not even know your turf exists?",
            ].map((q, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-5 text-left hover:border-purple-500/25 hover:bg-purple-500/5 transition-all duration-200"
              >
                <span className="mt-0.5 grid place-items-center h-8 w-8 shrink-0 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-bold text-purple-400 leading-none text-center select-none">
                  <span className="inline-flex items-center justify-center leading-none text-center">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <p className="text-sm leading-relaxed text-zinc-300 pt-1">{q}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TWO SIDES ── */}
        <section className="text-center">
          <SectionBadge color="amber">One app, two experiences</SectionBadge>
          <h2
            className="mt-3 font-extrabold tracking-tight text-white"
            style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
          >
            Built for owners and players
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-left">
              <h3 className="text-lg font-bold text-white">Turf Owner</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Manage your bookings, track payments, set pricing, check availability, and grow your business — all from one app on your phone.
              </p>
              <p className="mt-4 text-xs font-semibold text-purple-400">₹500 / month &nbsp;·&nbsp; First 3 months free</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-left">
              <h3 className="text-lg font-bold text-white">Player</h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                Find turfs near you, book a slot, join matches, and connect with other players in your city who are looking for a game.
              </p>
              <p className="mt-4 text-xs font-semibold text-purple-400">Free for players</p>
            </div>
          </div>
        </section>

        {/* ── OWNER FEATURES ── */}
        <section
          ref={offerRef.targetRef}
          className="space-y-10 transition-all duration-700"
          style={{ opacity: offerRef.visible ? 1 : 0, transform: offerRef.visible ? "translateY(0)" : "translateY(32px)" }}
        >
          <div className="space-y-3">
            <SectionBadge color="amber">For turf owners</SectionBadge>
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
            >
              Everything you need to run your turf
            </h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              From the moment a customer calls to the end of month report — TurfBridge handles it.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ownerFeatures.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 transition-all duration-200 hover:border-purple-500/30 hover:bg-purple-500/5 group"
              >
                <p className="font-semibold text-white group-hover:text-purple-400 transition-colors">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PLAYER FEATURES ── */}
        <section
          ref={playerRef.targetRef}
          className="space-y-10 transition-all duration-700"
          style={{ opacity: playerRef.visible ? 1 : 0, transform: playerRef.visible ? "translateY(0)" : "translateY(32px)" }}
        >
          <div className="space-y-3">
            <SectionBadge color="amber">For players</SectionBadge>
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
            >
              Not just a booking app. A sports community.
            </h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              The player app is completely free. Your friends do not want to play? Find players near you who do.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {playerFeatures.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 transition-all duration-200 hover:border-purple-500/30 hover:bg-purple-500/5 group"
              >
                <p className="font-semibold text-white group-hover:text-purple-400 transition-colors">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
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
            <SectionBadge color="amber">Getting started</SectionBadge>
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
            >
              Up and running in 4 steps.
            </h2>
          </div>
          <div className="relative">
            <CreationProcessTimeline steps={steps} accentColor={ACCENT} />
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="space-y-8">
          <div className="space-y-3">
            <SectionBadge color="amber">Pricing</SectionBadge>
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
            >
              One plan. No surprises.
            </h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              Try TurfBridge free for 3 months. After that, just ₹500 per month.
            </p>
          </div>

          <div className="max-w-md">
            <div className="relative flex flex-col rounded-2xl border border-purple-500/50 bg-gradient-to-b from-purple-500/10 to-purple-500/5 p-6">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-[10px] font-bold text-white shadow-lg shadow-purple-500/30">
                3 Months Free Trial
              </span>

              <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">
                {plan.name}
              </p>
              <p className="text-3xl font-extrabold text-white">
                {plan.price}
                <span className="text-sm font-normal text-zinc-400"> /month after trial</span>
              </p>
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
                className="mt-6 flex items-center justify-center rounded-full py-2.5 text-sm font-bold transition-all duration-200 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-500/30 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98]"
              >
                {plan.cta}
              </Link>

              <p className="mt-3 text-center text-xs text-zinc-500">
                No credit card required &nbsp;·&nbsp; Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section
          ref={faqRef.targetRef}
          className="space-y-8 transition-all duration-700"
          style={{ opacity: faqRef.visible ? 1 : 0, transform: faqRef.visible ? "translateY(0)" : "translateY(32px)" }}
        >
          <div className="space-y-3">
            <SectionBadge color="amber">FAQ</SectionBadge>
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
            >
              Common questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-zinc-900/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
                  <span className="flex-shrink-0 text-purple-400 text-lg">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-purple-950/20 to-zinc-900 p-8 sm:p-16 text-center">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px]" />
            </div>

            <div className="relative space-y-5">
              <SectionBadge color="amber">Ready to get started?</SectionBadge>
              <h2 className="text-3xl font-bold text-white sm:text-4xl mx-auto max-w-2xl">
                Start managing your turf the smart way
              </h2>
              <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                Join turf owners across India who are saving time, tracking revenue, and getting more bookings with TurfBridge. First 3 months are on us.
              </p>

              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] ml-4"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-bold text-white transition-all hover:border-purple-500/40 hover:bg-purple-500/10"
                >
                  Request a Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}