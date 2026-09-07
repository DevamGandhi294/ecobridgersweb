"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useInView,
  SectionBadge,
  CreationProcessTimeline,
} from "@/components/ServicePageShell";
import { ScrollToggleHero } from "@/components/ScrollToggleHero";

const ACCENT = "#a855f7";
const ACCENT_GRAD = "from-purple-500 via-pink-500 to-amber-500";
const GRID_COLOR = "rgba(168,85,247,0.7)";

// ─── ROLES DATA ──────────────────────────────────────────────────────────────
const roles = [
  {
    id: "crew",
    name: "CREW",
    badge: "Majority Role",
    color: "emerald",
    bgGradient: "from-emerald-500/20 to-teal-500/10",
    borderColor: "border-emerald-500/40",
    textColor: "text-emerald-400",
    wordExample: "Apple",
    description:
      "Sees the real secret word (e.g., 'Apple'). You are part of the majority, but you DON'T know for sure if you are Crew or Clone. Give subtle clues to find the Faker without revealing the exact word to them!",
  },
  {
    id: "clone",
    name: "CLONE",
    badge: "Deceptive Twist Role",
    color: "amber",
    bgGradient: "from-amber-500/20 to-orange-500/10",
    borderColor: "border-amber-500/40",
    textColor: "text-amber-400",
    wordExample: "Strawberry",
    description:
      "Sees a related but slightly different secret word (e.g., 'Strawberry' instead of 'Apple'). You don't realize you're the Clone — you think you're regular Crew until your clues don't quite match!",
  },
  {
    id: "faker",
    name: "FAKER",
    badge: "Master Bluff Role",
    color: "purple",
    bgGradient: "from-purple-500/20 to-pink-500/10",
    borderColor: "border-purple-500/40",
    textColor: "text-purple-400",
    wordExample: "[NO WORD]",
    description:
      "Sees NO word at all — only your role title. You know 100% that you are the odd one out. Listen closely to everyone's clues and bluff your way through without getting voted out!",
  },
];

// ─── GAME ROUND FLOW ────────────────────────────────────────────────────────
const roundSteps = [
  {
    step: "01",
    title: "Category & Setup",
    desc: "Host chooses a word category (Fruits, Bollywood, Cricket, Tech, Anime, Travel), sets role counts (Crew/Clone/Faker), and picks the voting style.",
  },
  {
    step: "02",
    title: "Identity Reveal",
    desc: "Each player privately checks their card — pass-the-phone offline, or on their own screen in Online Room mode.",
  },
  {
    step: "03",
    title: "Clues & Discussion",
    desc: "Open-ended conversation round. Players take turns giving clues about their word, testing others, and trying to spot who is bluffing.",
  },
  {
    step: "04",
    title: "Voting & Elimination",
    desc: "Discussion vote or secret ballot! The group chooses a suspect to eliminate, revealing their role and secret word to everyone.",
  },
  {
    step: "05",
    title: "Win Check & Scoring",
    desc: "Game checks win conditions: Crew wins if Faker is caught, Faker wins if surviving to final 2, Clone wins by surviving or guessing Crew word!",
  },
];

// ─── CATEGORY ENGINE SAMPLES ────────────────────────────────────────────────
const categories = [
  { name: "Fruits 🍎", pair: ["Apple", "Strawberry"], Difficulty: "Easy" },
  { name: "Bollywood 🎬", pair: ["Shah Rukh Khan", "Salman Khan"], Difficulty: "Medium" },
  { name: "Cricket 🏏", pair: ["Virat Kohli", "Rohit Sharma"], Difficulty: "Medium" },
  { name: "Tech 💻", pair: ["React", "Vue.js"], Difficulty: "Hard" },
  { name: "Anime ⛩️", pair: ["Naruto", "Sasuke"], Difficulty: "Medium" },
  { name: "Travel ✈️", pair: ["Paris", "Rome"], Difficulty: "Easy" },
];

export default function PlaycoClient() {
  const [activeRole, setActiveRole] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const rolesRef = useInView();
  const flowRef = useInView();
  const modesRef = useInView();
  const catRef = useInView();
  const faqRef = useInView();

  const currentRole = roles[activeRole];

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* ── HERO ── */}
      <ScrollToggleHero
        accentGradient={ACCENT_GRAD}
        accentColor={ACCENT}
        // badge="Social Party Game · 3–10 Players"
        badgeColor="violet"
        gridColor={GRID_COLOR}
        pretitle1="Playco — Imposter"
        title1={
          <>
            Talk in circles.
            <br />
            Bluff your way out.
          </>
        }
        subtitle1="A party game of secret words, hidden roles, and social deduction. Pass one phone around or connect online with a room code."
        pretitle2="Pass & Play or Online"
        title2={
          <>
            Hidden roles.
            <br />
            Zero certainty.
          </>
        }
        subtitle2="Crew knows a word. Clone knows a different word. Faker knows nothing. Nobody is 100% sure of their own role."
        icon="🎮"
      />

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-16 pb-28 sm:px-6 lg:px-10 xl:px-16">
        
        {/* Back Link */}
        <div>
          {/* <Link
            href="/services/saas"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-purple-400 transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link> */}
        </div>

        {/* ── CORE IDEA & HIGHLIGHT ── */}
        <section className="space-y-8 text-center">
          {/* <SectionBadge color="violet">The Core Idea</SectionBadge> */}
          <h2
            className="font-extrabold tracking-tight text-white mx-auto max-w-3xl"
            style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
          >
            One secret word. One intruder.
            <br />
            Can you spot the Imposter?
          </h2>
          <p
            className="mx-auto max-w-2xl text-base text-zinc-300 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            3 to 10 players share one device (or join via room code). Everyone receives a secret role card.
            Most players get a secret word — but one gets a different word, and one gets NO word at all!
            Give subtle clues, catch discrepancies, and vote out the Faker.
          </p>

          <div className="grid gap-4 sm:grid-cols-3 pt-4">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-left hover:border-purple-500/30 transition-all">
              <span className="text-3xl mb-3 block">📱</span>
              <p className="font-bold text-white text-base">Pass & Play (Offline)</p>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Pass 1 phone around the table. Zero internet required. Completely free for everyone at the party.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-left hover:border-purple-500/30 transition-all">
              <span className="text-3xl mb-3 block">🌐</span>
              <p className="font-bold text-white text-base">Online Room Mode</p>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Join from individual phones using a 4-letter Room Code. Host pulls in friends seamlessly for remote party sessions.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-left hover:border-purple-500/30 transition-all">
              <span className="text-3xl mb-3 block">🏆</span>
              <p className="font-bold text-white text-base">Session Scoreboard</p>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Play multiple matches back-to-back with a running leaderboard, role-risk scoring, and end-of-session MVP awards!
              </p>
            </div>
          </div>
        </section>

        {/* ── THE THREE ROLES ── */}
        <section
          ref={rolesRef.targetRef}
          className="space-y-8 transition-all duration-700"
          style={{
            opacity: rolesRef.visible ? 1 : 0,
            transform: rolesRef.visible ? "translateY(0)" : "translateY(32px)",
          }}
        >
          <div className="space-y-3 text-center sm:text-left">
            {/* <SectionBadge color="violet">Hidden Uncertainty</SectionBadge> */}
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
            >
              The Three Roles
            </h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              Nobody except the Faker knows 100% for sure if they have the real word or the clone word.
            </p>
          </div>

          {/* Role selector buttons */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {roles.map((r, i) => (
              <button
                key={r.id}
                onClick={() => setActiveRole(i)}
                className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-all duration-200 ${
                  activeRole === i
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/50"
                    : "bg-zinc-900/80 text-zinc-400 border border-white/10 hover:text-white"
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>

          {/* Role Detail Card */}
          <div className={`rounded-3xl border p-7 sm:p-10 bg-gradient-to-br ${currentRole.bgGradient} ${currentRole.borderColor} transition-all duration-300`}>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <span className={`text-xs font-bold uppercase tracking-widest ${currentRole.textColor}`}>
                  {currentRole.badge}
                </span>
                <h3 className="text-3xl font-extrabold text-white mt-1" style={{ fontFamily: "var(--font-display)" }}>
                  {currentRole.name}
                </h3>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-950/80 px-5 py-3 text-right">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Card View</span>
                <span className={`text-lg font-bold ${currentRole.textColor}`}>{currentRole.wordExample}</span>
              </div>
            </div>

            <p className="text-base text-zinc-200 leading-relaxed max-w-3xl" style={{ fontFamily: "var(--font-body)" }}>
              {currentRole.description}
            </p>
          </div>
        </section>

        {/* ── ROUND FLOW ── */}
        <section
          ref={flowRef.targetRef}
          className="relative space-y-10 transition-all duration-700"
          style={{
            opacity: flowRef.visible ? 1 : 0,
            transform: flowRef.visible ? "translateY(0)" : "translateY(36px)",
          }}
        >
          <div className="relative flex flex-col items-start space-y-3 text-left">
            {/* <SectionBadge color="violet">Step by Step</SectionBadge> */}
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
            >
              How a Round Works
            </h2>
            <p className="text-base text-zinc-400 max-w-xl" style={{ fontFamily: "var(--font-body)" }}>
              From category selection to the final voting reveal — clean, fast-paced party rounds.
            </p>
          </div>

          <div className="relative">
            <CreationProcessTimeline steps={roundSteps} accentColor={ACCENT} />
          </div>
        </section>

        {/* ── CATEGORIES & WORD PAIRS ── */}
        <section
          ref={catRef.targetRef}
          className="space-y-8 transition-all duration-700"
          style={{
            opacity: catRef.visible ? 1 : 0,
            transform: catRef.visible ? "translateY(0)" : "translateY(32px)",
          }}
        >
          <div className="space-y-3">
            {/* <SectionBadge color="violet">The Content Engine</SectionBadge> */}
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
            >
              Curated Categories & Word Pairs
            </h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              Word pairs are crafted so Crew and Clone words are closely related — creating funny misunderstandings when giving clues!
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-white text-base">{c.name}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400 border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 rounded-full">
                    {c.Difficulty}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-white/10 pt-3 text-zinc-400">
                  <span>Crew: <strong className="text-emerald-400">{c.pair[0]}</strong></span>
                  <span>vs</span>
                  <span>Clone: <strong className="text-amber-400">{c.pair[1]}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WIN CONDITIONS & SCORING ── */}
        <section className="space-y-8">
          <div className="space-y-3">
            {/* <SectionBadge color="violet">Rules & Scoring</SectionBadge> */}
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
            >
              Win Conditions & Role Risk Points
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Crew Victory</span>
              <h4 className="text-lg font-bold text-white mt-1 mb-2">Vote out the Faker</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                If the group successfully identifies and eliminates the Faker, all surviving Crew members win points.
              </p>
            </div>
            <div className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Faker Victory</span>
              <h4 className="text-lg font-bold text-white mt-1 mb-2">Survive to Final 2</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Highest risk role! If the Faker bluffs successfully down to the final 2 remaining players, the Faker takes maximum points.
              </p>
            </div>
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Clone Victory</span>
              <h4 className="text-lg font-bold text-white mt-1 mb-2">Survive or Guess Real Word</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Clone wins if they survive to the end, or if eliminated, correctly guess the real Crew secret word!
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section
          ref={faqRef.targetRef}
          className="space-y-8 transition-all duration-700"
          style={{
            opacity: faqRef.visible ? 1 : 0,
            transform: faqRef.visible ? "translateY(0)" : "translateY(32px)",
          }}
        >
          <div className="space-y-3">
            {/* <SectionBadge color="violet">FAQ</SectionBadge> */}
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Is Playco free to play?",
                a: "Yes! Pass & Play (Offline mode) is 100% free for everyone. Online Mode allows one host to start rooms for friends.",
              },
              {
                q: "How many players are required?",
                a: "Playco Imposter supports 3 to 10 players in a single game room or shared device.",
              },
              {
                q: "Do I need internet for Pass & Play?",
                a: "No! Pass & Play works entirely offline on 1 single phone passed around the table.",
              },
              {
                q: "What platforms is Playco available on?",
                a: "Playco is available as a cross-platform Mobile App (Android & iOS) and Web App.",
              },
            ].map((faq, i) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-white/10 bg-zinc-900/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-bold text-white hover:text-purple-400 transition-colors"
                >
                  {faq.q}
                  <span className="text-lg">{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-purple-950/30 to-zinc-900 p-8 sm:p-16 text-center">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[100px]" />
            </div>

            <div className="relative space-y-5">
              {/* <SectionBadge color="violet">Ready to Play?</SectionBadge> */}
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl mx-auto max-w-2xl" style={{ fontFamily: "var(--font-display)" }}>
                Get Playco for Your Next Party
              </h2>
              <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                Download Playco or get in touch for custom branded event editions and corporate party builds.
              </p>

              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-amber-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Contact Us / Get Demo
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-xs text-zinc-400">
                <Link href="/privacy-policy" className="hover:text-purple-300 underline transition-colors">
                  Playco Privacy Policy
                </Link>
                <span className="text-zinc-600">•</span>
                <Link href="/terms-and-conditions" className="hover:text-purple-300 underline transition-colors">
                  Playco Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
