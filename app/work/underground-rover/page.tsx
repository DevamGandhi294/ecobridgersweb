"use client";

import Link from "next/link";
import {
  useInView, SectionBadge, PlatformBenefitsGrid,
  CreationProcessTimeline, TechMarquee,
} from "@/components/ServicePageShell";
import { ScrollToggleHero } from "@/components/ScrollToggleHero";

const ACCENT = "#f97316";
const ACCENT_GRAD = "from-orange-500 to-red-500";
const GRID_COLOR = "rgba(249,115,22,0.7)";

const features = [
  { icon: "🎮", title: "Remote Operation", desc: "Control from a safe distance via RF/Wi-Fi" },
  { icon: "📷", title: "Onboard Camera", desc: "Live video feed from the rover" },
  { icon: "🔬", title: "Gas Sensing", desc: "Detect hazardous gases in the environment" },
  { icon: "🚧", title: "Obstacle Detection", desc: "Avoid obstacles autonomously" },
  { icon: "🤖", title: "Government R&D Backed", desc: "Developed with government funding" },
  { icon: "🔒", title: "Safe & Reliable", desc: "Built for hazardous environments" },
];

const steps = [
  { step: "01", title: "Discovery & Scoping", desc: "We understand your surveillance requirements and environment." },
  { step: "02", title: "System Configuration", desc: "We configure the rover and sensors for your specific use case." },
  { step: "03", title: "Deployment & Training", desc: "We deploy the rover and train your team to operate it safely." },
  { step: "04", title: "Ongoing Support", desc: "We provide continuous support, updates, and maintenance." },
];

const techStack = ["IoT Sensors", "Embedded Systems", "RF/Wi-Fi", "Camera Modules", "Gas Sensors", "Obstacle Detection", "Remote Control", "Data Processing"];

const platformBenefits = features.map((f) => ({ title: f.title, desc: f.desc }));

export default function UndergroundRoverPage() {
  const offerRef = useInView();
  const caseRef = useInView();
  const procRef = useInView();
  const techRef = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ScrollToggleHero
        accentGradient={ACCENT_GRAD}
        accentColor={ACCENT}
        badge="Defence & R&D"
        badgeColor="amber"
        icon="🤖"
        gridColor={GRID_COLOR}
        pretitle1="For surveillance"
        title1={<>Underground<br/>Rover</>}
        subtitle1="Underground surveillance rover — Government Granted. Designed for tunnels, pipelines, and hazardous environments where humans cannot safely go."
        pretitle2="Safe & reliable"
        title2={<>Explore,<br/>monitor, secure</>}
        subtitle2="A remotely operated rover with onboard cameras, gas sensors, and obstacle detection — developed under a government R&D grant."
      />

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">
        {/* Back to Work Link */}
        <div>
          <Link 
            href="/work#products-section"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-orange-400 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Work
          </Link>
        </div>

        {/* ── THE QUESTIONS ── */}
        <section className="text-center">
          <SectionBadge color="amber">Before we show you anything</SectionBadge>
          <h2 className="mt-3 font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
            Safe underground surveillance
          </h2>
          <p className="mt-2 text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
            Answer: scroll down. It's all here.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Need to inspect hazardous underground environments?",
              "Looking for a safe way to monitor tunnels?",
              "Want to reduce risk to human workers?",
              "Need government-grade surveillance technology?"
            ].map((q, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-5 text-left hover:border-orange-500/25 hover:bg-orange-500/5 transition-all duration-200"
              >
                <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-xs font-bold text-orange-400">
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
            <SectionBadge color="amber">How it operates</SectionBadge>
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
            <SectionBadge color="amber">Key capabilities</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
              Advanced features for hazardous environments
            </h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              Designed for underground tunnel and pipeline surveillance
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 transition-all duration-700" style={{ opacity: offerRef.visible ? 1 : 0, transform: offerRef.visible ? "translateY(0)" : "translateY(28px)", transitionDelay: "120ms" }}>
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 transition-all duration-200 hover:border-orange-500/30 hover:bg-orange-500/5 group"
              >
                <span className="text-3xl">{f.icon}</span>
                <p className="mt-4 font-semibold text-white group-hover:text-orange-400 transition-colors">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-orange-950/20 to-zinc-900 p-8 sm:p-16 text-center">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[100px]" />
            </div>

            <div className="relative space-y-5">
              <SectionBadge color="amber">Interested in collaboration?</SectionBadge>
              <h2 className="text-3xl font-bold text-white sm:text-4xl mx-auto max-w-2xl">
                Get in touch for Underground Rover
              </h2>
              <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                Contact us to learn more about this R&amp;D project and potential collaboration opportunities.
              </p>

              <div className="flex flex-wrap gap-4 justify-center pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:shadow-xl hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]"
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
