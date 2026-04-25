"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SectionBadge, ServiceCTA, useInView } from "@/components/ServicePageShell";
import { ScrollToggleHero } from "@/components/ScrollToggleHero";

const OVERVIEW_ACCENT = "#d6dd57";
const OVERVIEW_GRAD = "from-lime-400 to-yellow-500";
const GRID_COLOR = "rgba(214,221,87,0.68)";

const services = [
  {
    href: "/services/iot",
    badge: "IoT & Embedded",
    color: "#34d399",
    title: "Build connected products that survive the real world",
    who: "Founders and teams shipping hardware, sensors, or field devices.",
    bullets: ["Firmware + edge logic", "Connectivity + OTA pipelines", "Hardware-cloud integration"],
  },
  {
    href: "/services/web",
    badge: "Web & Cloud",
    color: "#22d3ee",
    title: "Turn raw data into useful software people actually use",
    who: "Teams needing dashboards, admin tools, APIs, and scalable backend.",
    bullets: ["Admin and operator dashboards", "Clean API architecture", "Secure cloud deployment"],
  },
  {
    href: "/services/mobile",
    badge: "Mobile Apps",
    color: "#a78bfa",
    title: "Launch mobile experiences tightly synced with your platform",
    who: "Products that need a polished user app plus reliable backend sync.",
    bullets: ["Cross-platform delivery", "Realtime updates + push", "Store-ready release pipeline"],
  },
  {
    href: "/services/ai",
    badge: "AI-Assisted Solutions",
    color: "#fb7185",
    title: "Automate repetitive ops and unlock decisions from your data",
    who: "Teams ready to embed intelligence into existing product workflows.",
    bullets: ["Prediction and anomaly workflows", "Ops automation copilots", "AI integrated into your stack"],
  },
] as const;

const chooseGuides = [
  {
    label: "Choose IoT & Embedded if...",
    points: ["You have devices, sensors, or hardware in the loop.", "Reliability in field conditions matters more than flashy UI."],
  },
  {
    label: "Choose Web & Cloud if...",
    points: ["You need dashboards, APIs, and role-based business workflows.", "Your core bottleneck is platform architecture and scale."],
  },
  {
    label: "Choose Mobile Apps if...",
    points: ["Your users primarily operate through iOS/Android apps.", "You need offline-ready flows and realtime user notifications."],
  },
  {
    label: "Choose AI Solutions if...",
    points: ["You already collect data and want smarter decisions/actions.", "You want automation outcomes, not just model demos."],
  },
] as const;

const pillVisuals = [
  { bg: "#89e78f", text: "#111111", border: "#7fd186", ring: "#0a0a0a", ringStroke: "#7fd186" },
  { bg: "#d6dd57", text: "#111111", border: "#c7ce50", ring: "#0a0a0a", ringStroke: "#d6dd57" },
  { bg: "#5f63ea", text: "#101014", border: "#6e72ff", ring: "#0a0a0a", ringStroke: "#6e72ff" },
  { bg: "#a78bfa", text: "#101014", border: "#9f84ef", ring: "#0a0a0a", ringStroke: "#a78bfa" },
] as const;

const pillPositions = [
  "left-[38%] top-[1%]",
  "left-[22%] top-[55%]",
  "right-[14%] top-[26%]",
  "left-[6%] top-[26%]",
] as const;

const flowNodes = [
  { id: "device", label: "IoT Device", sublabel: "ESP32 / Arduino", icon: "🔧", color: "#10b981" },
  { id: "broker", label: "MQTT Broker", sublabel: "Mosquitto", icon: "📡", color: "#22d3ee" },
  { id: "api", label: "Backend API", sublabel: "Node.js", icon: "⚙️", color: "#6366f1" },
  { id: "db", label: "Database", sublabel: "SQL / NoSQL", icon: "🗄️", color: "#f59e0b" },
  { id: "client", label: "Web & Mobile", sublabel: "App + Dashboard", icon: "📱", color: "#ec4899" },
] as const;

const flowLinks = [
  { label: "publish", sublabel: "MQTT/TLS" },
  { label: "ingest", sublabel: "event stream" },
  { label: "store", sublabel: "read/write" },
  { label: "serve", sublabel: "REST/WebSocket" },
] as const;

function ArchitectureFlow() {
  const [activeSegment, setActiveSegment] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const SEGMENT_MS = 900;

  useEffect(() => {
    let segment = 0;
    let segmentStart: number | null = null;

    const tick = (ts: number) => {
      if (segmentStart === null) segmentStart = ts;
      const elapsed = ts - segmentStart;
      const progress = Math.min(elapsed / SEGMENT_MS, 1);

      setActiveSegment(segment);
      setSegmentProgress(progress);

      if (progress >= 1) {
        segment = (segment + 1) % flowLinks.length;
        segmentStart = ts;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="hidden md:block">
        <svg viewBox="0 0 900 220" className="w-full" style={{ minWidth: 680 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="flowGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {flowLinks.map((seg, i) => {
            const x1 = 90 + i * 180;
            const x2 = x1 + 180;
            const y = 92;
            return (
              <g key={seg.label}>
                <line x1={x1} y1={y} x2={x2} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                <line
                  x1={x1}
                  y1={y}
                  x2={x2}
                  y2={y}
                  stroke={activeSegment === i ? flowNodes[i].color : "rgba(255,255,255,0.04)"}
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <text x={(x1 + x2) / 2} y={y - 18} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">
                  {seg.label}
                </text>
                <text x={(x1 + x2) / 2} y={y - 6} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="monospace">
                  {seg.sublabel}
                </text>
              </g>
            );
          })}

          {(() => {
            const t = easeInOut(segmentProgress);
            const x1 = 90 + activeSegment * 180;
            const x2 = x1 + 180;
            const cx = x1 + (x2 - x1) * t;
            const cy = 92;
            const color = flowNodes[activeSegment].color;
            return (
              <g filter="url(#flowGlow)">
                <circle cx={cx} cy={cy} r={7} fill={color} opacity={0.92} />
                <circle cx={cx} cy={cy} r={12} fill={color} opacity={0.25} />
              </g>
            );
          })()}

          {flowNodes.map((node, i) => {
            const cx = 90 + i * 180;
            const cy = 92;
            const isActive = activeSegment === i || activeSegment === i - 1;
            return (
              <g key={node.id}>
                <circle cx={cx} cy={cy} r={38} fill="none" stroke={node.color} strokeWidth={isActive ? 1.5 : 0} opacity={isActive ? 0.4 : 0} />
                <circle cx={cx} cy={cy} r={28} fill={`${node.color}18`} stroke={node.color} strokeWidth={isActive ? 2 : 1} />
                <text x={cx} y={cy + 6} textAnchor="middle" fontSize="18">
                  {node.icon}
                </text>
                <text x={cx} y={cy + 52} textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="sans-serif">
                  {node.label}
                </text>
                <text x={cx} y={cy + 66} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">
                  {node.sublabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="space-y-2 md:hidden">
        {flowNodes.map((node, i) => (
          <div key={node.id} className="space-y-1.5">
            <div className="flex items-center gap-2 rounded-xl border px-4 py-3" style={{ borderColor: `${node.color}45`, background: `${node.color}12` }}>
              <span className="text-xl">{node.icon}</span>
              <div>
                <div className="text-sm font-semibold text-white">{node.label}</div>
                <div className="text-xs text-zinc-500">{node.sublabel}</div>
              </div>
            </div>
            {i < flowLinks.length && (
              <div className="pl-2 text-[11px] text-zinc-500" style={{ fontFamily: "var(--font-body)" }}>
                {flowLinks[i].label} - {flowLinks[i].sublabel}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServicesOverviewPage() {
  const listRef = useInView();
  const mapRef = useInView();
  const chooseRef = useInView();
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ScrollToggleHero
        accentGradient={OVERVIEW_GRAD}
        accentColor={OVERVIEW_ACCENT}
        badge="All Services"
        badgeColor="amber"
        icon="🧭"
        gridColor={GRID_COLOR}
        pretitle1="Service navigator"
        title1={
          <>
            choose your
            <br />
            build lane
          </>
        }
        subtitle1="pick the service that matches your current bottleneck. no fluff, no overlap, just the lane you need right now."
        pretitle2="One team, connected layers"
        title2={
          <>
            from device
            <br />
            to product
          </>
        }
        subtitle2="start with one lane and expand across IoT, cloud, web, mobile, and AI when your product is ready for the next step."
      />

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">
        <section ref={listRef.ref} className="space-y-8">
          <div className="space-y-3" style={{ opacity: listRef.visible ? 1 : 0, transform: listRef.visible ? "translateY(0)" : "translateY(28px)", transition: "all 600ms ease" }}>
            <SectionBadge color="amber">service navigator</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
              what each service owns.
            </h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              short overview only. deep implementation details live inside each dedicated service page.
            </p>
          </div>

          <div
            className="relative hidden h-[560px] lg:block"
            style={{
              opacity: listRef.visible ? 1 : 0,
              transform: listRef.visible ? "translateY(0)" : "translateY(26px)",
              transition: "all 650ms ease",
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `linear-gradient(to right,${GRID_COLOR} 1px,transparent 1px),linear-gradient(to bottom,${GRID_COLOR} 1px,transparent 1px)`, backgroundSize: "58px 58px" }} />

            {services.map((service, idx) => {
              const visual = pillVisuals[idx];
              const isActive = activeService === idx;
              return (
                <div
                  key={service.href}
                  className={`absolute ${pillPositions[idx]}`}
                  style={{ zIndex: isActive ? 60 : 20 }}
                  onMouseEnter={() => setActiveService(idx)}
                  onMouseLeave={() => setActiveService((prev) => (prev === idx ? null : prev))}
                >
                  <article
                    className="overflow-hidden border backdrop-blur-md transition-all duration-350"
                    style={{
                      width: isActive ? 430 : 360,
                      minHeight: isActive ? 280 : 84,
                      borderRadius: isActive ? 28 : 999,
                      background: visual.bg,
                      color: visual.text,
                      borderColor: isActive ? `${service.color}55` : visual.border,
                      boxShadow: isActive ? `0 24px 60px -28px ${service.color}80` : "none",
                    }}
                  >
                    <div className="flex h-[84px] items-center px-5">
                      <span
                        className="mr-4 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border text-white"
                        style={{ background: visual.ring, borderColor: isActive ? `${service.color}66` : visual.ringStroke }}
                      >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 12h16" />
                          <path d="M13 5l7 7-7 7" />
                        </svg>
                      </span>
                      <span className="flex-1 whitespace-nowrap text-left leading-none tracking-tight" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 2vw, 1.2rem)" }}>
                        {service.badge}
                      </span>
                    </div>

                    <div
                      className="px-6 pb-6"
                      style={{
                        maxHeight: isActive ? 260 : 0,
                        opacity: isActive ? 1 : 0,
                        overflow: "hidden",
                        transition: "max-height 300ms ease, opacity 220ms ease",
                      }}
                    >
                      <h3 className="mt-2 text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: "#111111" }}>
                        {service.title}
                      </h3>

                      <p className="mt-3 text-sm" style={{ fontFamily: "var(--font-body)", color: "rgba(17,17,17,0.9)" }}>
                        <span className="font-semibold" style={{ color: "#111111" }}>Best for: </span>
                        {service.who}
                      </p>

                      <ul className="mt-4 space-y-2 text-sm" style={{ fontFamily: "var(--font-body)", color: "rgba(17,17,17,0.85)" }}>
                        {service.bullets.map((point) => (
                          <li key={point}>- {point}</li>
                        ))}
                      </ul>

                      <Link
                        href={service.href}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                        style={{ color: service.color }}
                      >
                        Explore service
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          <div className="grid gap-5 lg:hidden md:grid-cols-2">
            {services.map((service, idx) => (
              <article
                key={service.href}
                className="rounded-2xl border border-white/10 bg-zinc-900/45 p-6 backdrop-blur-sm"
                style={{
                  opacity: listRef.visible ? 1 : 0,
                  transform: listRef.visible ? "translateY(0)" : "translateY(22px)",
                  transition: "all 500ms ease",
                  transitionDelay: `${idx * 70}ms`,
                }}
              >
                <div className="inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider" style={{ borderColor: `${service.color}4f`, color: service.color }}>
                  {service.badge}
                </div>
                <h3 className="mt-4 text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{service.title}</h3>
                <p className="mt-3 text-sm text-zinc-300" style={{ fontFamily: "var(--font-body)" }}><span className="font-semibold text-zinc-100">Best for: </span>{service.who}</p>
                <ul className="mt-4 space-y-2 text-sm text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
                  {service.bullets.map((point) => (
                    <li key={point}>- {point}</li>
                  ))}
                </ul>
                <Link href={service.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: service.color }}>
                  Explore service <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section
          ref={mapRef.ref}
          className="rounded-3xl border border-white/10 bg-zinc-900/35 p-7 sm:p-10"
          style={{ opacity: mapRef.visible ? 1 : 0, transform: mapRef.visible ? "translateY(0)" : "translateY(28px)", transition: "all 650ms ease" }}
        >
          <div className="space-y-3">
            <SectionBadge color="amber">how they connect</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.5rem,3.6vw,2.2rem)", fontFamily: "var(--font-display)" }}>
              one product, multiple layers.
            </h2>
          </div>

          <div className="mt-6">
            <ArchitectureFlow />
          </div>

          <p className="mt-5 max-w-3xl text-sm text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
            start with the layer where your current bottleneck lives. we can then extend into adjacent layers without forcing you to re-platform everything.
          </p>
        </section>

        <section ref={chooseRef.ref} className="space-y-6">
          <div className="space-y-3" style={{ opacity: chooseRef.visible ? 1 : 0, transform: chooseRef.visible ? "translateY(0)" : "translateY(24px)", transition: "all 600ms ease" }}>
            <SectionBadge color="amber">quick decision guide</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.5rem,3.6vw,2.2rem)", fontFamily: "var(--font-display)" }}>
              not sure what to pick? start here.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {chooseGuides.map((guide, idx) => (
              <div
                key={guide.label}
                className="relative border border-black/5 bg-[#f3f4f6] p-6 sm:p-7"
                style={{
                  opacity: chooseRef.visible ? 1 : 0,
                  transform: chooseRef.visible ? "translateY(0)" : "translateY(20px)",
                  transition: "all 500ms ease",
                  transitionDelay: `${idx * 70}ms`,
                  clipPath: "polygon(0 0, calc(100% - 62px) 0, calc(100% - 54px) 4px, calc(100% - 4px) 54px, 100% 62px, 100% 100%, 0 100%)",
                  borderRadius: "28px",
                }}
              >
                <span
                  className="inline-flex rounded-full border border-[#d6d8dd] bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#b5445a]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {guide.label}
                </span>

                <h3 className="mt-4 text-[clamp(1.35rem,2.4vw,1.95rem)] font-semibold leading-tight text-[#0f172a]" style={{ fontFamily: "var(--font-display)" }}>
                  not sure what fits? choose this lane.
                </h3>

                <ul className="mt-4 space-y-2 text-[15px] text-[#4b5563]" style={{ fontFamily: "var(--font-body)" }}>
                  {guide.points.map((point) => (
                    <li key={point}>- {point}</li>
                  ))}
                </ul>

                <div className="mt-6 h-px w-full bg-[#d7d9de]" />
                <div className="mt-4 flex items-end gap-3">
                  <div className="text-[44px] font-bold leading-none text-[#0f172a]" style={{ fontFamily: "var(--font-display)" }}>
                    {(idx + 1) * 10}%
                  </div>
                  <div className="pb-1 text-[13px] font-medium uppercase tracking-wide text-[#374151]" style={{ fontFamily: "var(--font-display)" }}>
                    better service-match clarity
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ServiceCTA
          accentGradient={OVERVIEW_GRAD}
          accentColor={OVERVIEW_ACCENT}
          badgeColor="amber"
          title="not sure where your project fits?"
          subtitle="book a short discovery call. we will map your current stage, recommend the right first lane, and give you a practical next step."
          ctaText="book discovery call →"
        />
      </div>
    </div>
  );
}
