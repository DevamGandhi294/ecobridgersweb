"use client";
import { useState, useEffect, useRef } from "react";
import {
  useInView, SectionBadge, ServiceHero, OfferingCard,
  ProcessCard, UseCaseCard, TechBadge, InquiryForm, FormCard, ServiceCTA,
} from "@/components/ServicePageShell";

const ACCENT = "#06b6d4";
const ACCENT_GRAD = "from-cyan-500 to-blue-600";
const GRID_COLOR = "rgba(6,182,212,0.7)";

const offerings = [
  { icon: "📊", title: "Admin Dashboards", desc: "control panels that actually make sense — manage devices, users, and live data without opening a spreadsheet." },
  { icon: "📈", title: "Real-Time Visualization", desc: "live charts, graphs, and data feeds that update as things happen. no refresh button required." },
  { icon: "☁️", title: "Cloud Backend Architecture", desc: "scalable, secure infrastructure that doesn't fall over when things get real. Firebase, Node.js, SQL — picked for your use case, not ours." },
  { icon: "🔗", title: "REST & Realtime APIs", desc: "clean API design that plays nicely with your IoT devices, mobile apps, and whatever third-party thing you need to hook up." },
  { icon: "🗄️", title: "Database Design", desc: "schemas built for your data — whether that's Firebase, PostgreSQL, MySQL, or time-series feeds from hardware." },
  { icon: "🔐", title: "Auth & Role Management", desc: "secure login, multi-role access, session management. the stuff that sounds boring until it gets breached." },
];

const useCases = [
  { icon: "📡", label: "IoT Monitoring Dashboards" },
  { icon: "📋", label: "Data Logging & Reporting" },
  { icon: "🖥️", label: "Admin Control Panels" },
  { icon: "🗂️", label: "Management Portals" },
  { icon: "🏢", label: "Multi-Tenant SaaS Platforms" },
  { icon: "⚙️", label: "API-First Backends" },
];

const process = [
  { step: "01", title: "Discovery & Scoping", desc: "nail down who uses it, what data flows where, and what \"done\" actually looks like." },
  { step: "02", title: "Architecture Design", desc: "pick the right stack, design the database schema, plan the API — before writing a single line." },
  { step: "03", title: "Backend Development", desc: "build the APIs, business logic, auth, and database layer. the stuff users never see but always feel." },
  { step: "04", title: "Frontend Development", desc: "responsive dashboards and UI in Next.js / React. fast, clean, and doesn't look like a 2015 admin template." },
  { step: "05", title: "Integration & Testing", desc: "wire everything together — IoT feeds, mobile apps, third-party services. test until it breaks, then fix it." },
  { step: "06", title: "Deployment & Handover", desc: "deploy to cloud, set up monitoring, document everything. you get the keys and actually know how to use them." },
];

// ─── TECH STACK TABS ────────────────────────────────────────────────────────
const techTabs = [
  {
    id: "iot",
    label: "IoT",
    icon: "📡",
    color: "#10b981",
    grad: "from-emerald-500 to-teal-600",
    description: "Hardware-to-cloud connectivity. From sensor firmware to MQTT brokers and realtime ingestion pipelines.",
    tools: [
      { name: "MQTT", desc: "Lightweight pub/sub protocol for constrained IoT devices" },
      { name: "ESP32 / Arduino", desc: "Microcontroller firmware and embedded C/C++" },
      { name: "WebSockets", desc: "Persistent bidirectional streams for realtime data" },
      { name: "Firebase RTDB", desc: "Realtime database with sub-second sync to clients" },
      { name: "Node-RED", desc: "Visual flow-based IoT data wiring" },
      { name: "MQTT Broker (Mosquitto)", desc: "Message broker handling device pub/sub at scale" },
      { name: "InfluxDB", desc: "Time-series database optimised for sensor data" },
      { name: "Grafana", desc: "IoT metric dashboards and alerting" },
    ],
  },
  {
    id: "web",
    label: "Web",
    icon: "🌐",
    color: "#06b6d4",
    grad: "from-cyan-500 to-blue-600",
    description: "Full-stack web platforms — from pixel-perfect dashboards to REST APIs and cloud deployments.",
    tools: [
      { name: "Next.js", desc: "React framework with SSR, SSG, and App Router" },
      { name: "React", desc: "Component-based UI with hooks and context" },
      { name: "TypeScript", desc: "Type-safe JavaScript across the entire codebase" },
      { name: "Node.js", desc: "Scalable backend runtime for APIs and services" },
      { name: "Tailwind CSS", desc: "Utility-first CSS for rapid, consistent UI" },
      { name: "REST API", desc: "Clean, versioned HTTP endpoints with OpenAPI docs" },
      { name: "Vercel", desc: "Edge deployment with zero-config CI/CD" },
      { name: "Docker", desc: "Containerised services for consistent environments" },
    ],
  },
  {
    id: "app",
    label: "App",
    icon: "📱",
    color: "#8b5cf6",
    grad: "from-violet-500 to-purple-600",
    description: "Cross-platform mobile apps wired to your backend — React Native for iOS and Android from one codebase.",
    tools: [
      { name: "React Native", desc: "Cross-platform iOS & Android from one codebase" },
      { name: "Expo", desc: "Managed workflow with OTA updates and easy builds" },
      { name: "React Navigation", desc: "Stack, tab, and drawer navigation patterns" },
      { name: "Zustand", desc: "Lightweight global state management" },
      { name: "Firebase Auth", desc: "Social login, OTP, and session management" },
      { name: "Push Notifications", desc: "FCM / APNs integration for real-time alerts" },
      { name: "Axios / React Query", desc: "Data fetching, caching, and sync" },
      { name: "EAS Build", desc: "Cloud build and submit pipeline for app stores" },
    ],
  },
  {
    id: "database",
    label: "Database & Cloud",
    icon: "🗄️",
    color: "#f59e0b",
    grad: "from-amber-500 to-orange-500",
    description: "The persistence layer — relational, document, realtime, and time-series. Picked for the data shape, not the hype.",
    tools: [
      { name: "PostgreSQL", desc: "Battle-tested relational DB for complex queries" },
      { name: "MySQL", desc: "Reliable relational database for structured data" },
      { name: "Firebase Firestore", desc: "Scalable NoSQL with real-time listeners" },
      { name: "Firebase RTDB", desc: "JSON tree synced in milliseconds across clients" },
      { name: "InfluxDB", desc: "Time-series store for sensor and metric data" },
      { name: "Redis", desc: "In-memory cache and pub/sub for speed-critical ops" },
      { name: "AWS / GCP", desc: "Cloud infrastructure for compute, storage, and scale" },
      { name: "Supabase", desc: "Open-source Firebase alternative on Postgres" },
    ],
  },
];

// ─── ANIMATED ARCHITECTURE FLOW ─────────────────────────────────────────────
const archNodes = [
  {
    id: "device",
    label: "IoT Device",
    sublabel: "ESP32 / Arduino",
    icon: "🔧",
    color: "#10b981",
    x: 0,
  },
  {
    id: "mqtt",
    label: "MQTT Broker",
    sublabel: "Mosquitto",
    icon: "📡",
    color: "#06b6d4",
    x: 1,
  },
  {
    id: "server",
    label: "Backend Server",
    sublabel: "Node.js / API",
    icon: "⚙️",
    color: "#6366f1",
    x: 2,
  },
  {
    id: "db",
    label: "Database",
    sublabel: "Firebase / SQL",
    icon: "🗄️",
    color: "#f59e0b",
    x: 3,
  },
  {
    id: "clients",
    label: "Web & App",
    sublabel: "Next.js / React Native",
    icon: "🖥️",
    color: "#ec4899",
    x: 4,
  },
];

const archLabels = [
  { from: 0, to: 1, label: "MQTT publish", sublabel: "TCP/TLS" },
  { from: 1, to: 2, label: "subscribe + parse", sublabel: "event stream" },
  { from: 2, to: 3, label: "read / write", sublabel: "SQL / NoSQL" },
  { from: 3, to: 4, label: "REST / WebSocket", sublabel: "realtime sync" },
];

function ArchitectureFlow() {
  const [activePacket, setActivePacket] = useState(0);
  const [packetPos, setPacketPos] = useState(0); // 0-1 within each segment
  const animRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const SEGMENT_MS = 900;

  useEffect(() => {
    let seg = 0;
    let segStart: number | null = null;

    const tick = (ts: number) => {
      if (segStart === null) segStart = ts;
      const elapsed = ts - segStart;
      const progress = Math.min(elapsed / SEGMENT_MS, 1);
      setActivePacket(seg);
      setPacketPos(progress);
      if (progress >= 1) {
        seg = (seg + 1) % archLabels.length;
        segStart = ts;
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  // ease in-out
  const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  return (
    <div className="w-full overflow-x-auto pb-4">
      {/* ── Desktop SVG (md+) ── */}
      <div className="hidden md:block">
        <svg
          viewBox="0 0 900 220"
          className="w-full"
          style={{ minWidth: 640 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Connection lines */}
          {archLabels.map((seg, i) => {
            const x1 = 90 + i * 180;
            const x2 = x1 + 180;
            const y = 90;
            return (
              <g key={i}>
                <line
                  x1={x1} y1={y} x2={x2} y2={y}
                  stroke="rgba(255,255,255,0.08)" strokeWidth="2"
                />
                <line
                  x1={x1} y1={y} x2={x2} y2={y}
                  stroke={activePacket === i ? archNodes[i].color : "rgba(255,255,255,0.04)"}
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  style={{ transition: "stroke 0.3s" }}
                />
                {/* Label above line */}
                <text x={(x1 + x2) / 2} y={y - 18} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">
                  {seg.label}
                </text>
                <text x={(x1 + x2) / 2} y={y - 6} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="monospace">
                  {seg.sublabel}
                </text>
              </g>
            );
          })}

          {/* Animated packet dot */}
          {(() => {
            const seg = activePacket;
            const t = ease(packetPos);
            const x1 = 90 + seg * 180;
            const x2 = x1 + 180;
            const cx = x1 + (x2 - x1) * t;
            const cy = 90;
            const col = archNodes[seg].color;
            return (
              <g filter="url(#glow)">
                <circle cx={cx} cy={cy} r={7} fill={col} opacity={0.9} />
                <circle cx={cx} cy={cy} r={12} fill={col} opacity={0.2} />
              </g>
            );
          })()}

          {/* Nodes */}
          {archNodes.map((node, i) => {
            const cx = 90 + i * 180;
            const cy = 90;
            const isActive = activePacket === i || activePacket === i - 1;
            return (
              <g key={node.id}>
                {/* Outer glow ring */}
                <circle cx={cx} cy={cy} r={38} fill="none"
                  stroke={node.color}
                  strokeWidth={isActive ? 1.5 : 0}
                  opacity={isActive ? 0.4 : 0}
                  style={{ transition: "all 0.4s" }}
                />
                {/* Node circle */}
                <circle cx={cx} cy={cy} r={28}
                  fill={`${node.color}18`}
                  stroke={node.color}
                  strokeWidth={isActive ? 2 : 1}
                  style={{ transition: "all 0.3s" }}
                />
                {/* Emoji icon */}
                <text x={cx} y={cy + 6} textAnchor="middle" fontSize="18">{node.icon}</text>
                {/* Label below */}
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

      {/* ── Mobile: vertical flow ── */}
      <div className="md:hidden flex flex-col items-center gap-0">
        {archNodes.map((node, i) => (
          <div key={node.id} className="flex flex-col items-center">
            <div
              className="flex items-center gap-3 rounded-2xl border px-5 py-3 w-72"
              style={{
                borderColor: `${node.color}40`,
                background: `${node.color}10`,
              }}
            >
              <span className="text-2xl">{node.icon}</span>
              <div>
                <div className="text-sm font-bold text-white">{node.label}</div>
                <div className="text-xs text-zinc-500 font-mono">{node.sublabel}</div>
              </div>
            </div>
            {i < archNodes.length - 1 && (
              <div className="flex flex-col items-center my-1">
                <div className="text-[10px] font-mono text-zinc-500">{archLabels[i].label}</div>
                <div
                  className="h-8 w-px"
                  style={{ background: `linear-gradient(to bottom, ${archNodes[i].color}, ${archNodes[i + 1].color})` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── TECH STACK TABS COMPONENT ───────────────────────────────────────────────
function TechStackTabs() {
  const [active, setActive] = useState("web");
  const tab = techTabs.find(t => t.id === active)!;

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2">
        {techTabs.map(t => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className="relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300"
              style={{
                background: isActive ? `${t.color}20` : "rgba(255,255,255,0.04)",
                border: `1px solid ${isActive ? t.color + "60" : "rgba(255,255,255,0.08)"}`,
                color: isActive ? t.color : "rgba(255,255,255,0.45)",
              }}
            >
              <span>{t.icon}</span>
              {t.label}
              {isActive && (
                <span
                  className="absolute -bottom-px left-4 right-4 h-px rounded-full"
                  style={{ background: t.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div
        key={active}
        className="rounded-2xl border p-6 sm:p-8 space-y-6"
        style={{
          borderColor: `${tab.color}25`,
          background: `linear-gradient(135deg, ${tab.color}08, transparent)`,
          animation: "fadeSlideIn 0.35s ease forwards",
        }}
      >
        <style>{`
          @keyframes fadeSlideIn {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <p className="text-sm text-zinc-400 max-w-2xl" style={{ fontFamily: "var(--font-body)" }}>
          {tab.description}
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tab.tools.map(tool => (
            <div
              key={tool.name}
              className="group rounded-xl border p-4 transition-all duration-300 hover:scale-[1.02]"
              style={{
                borderColor: `${tab.color}20`,
                background: "rgba(255,255,255,0.03)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${tab.color}50`;
                (e.currentTarget as HTMLElement).style.background = `${tab.color}10`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = `${tab.color}20`;
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
              }}
            >
              <div
                className="mb-2 text-xs font-bold uppercase tracking-widest"
                style={{ color: tab.color }}
              >
                {tool.name}
              </div>
              <div className="text-xs text-zinc-500 leading-relaxed">
                {tool.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function WebServicePage() {
  const offerRef = useInView();
  const caseRef = useInView();
  const procRef = useInView();
  const techRef = useInView();
  const archRef = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ServiceHero
        accent={ACCENT_GRAD} accentColor={ACCENT} badge="Web & Cloud Platforms"
        badgeColor="cyan" icon="🌐" gridColor={GRID_COLOR}
        title={
          <>
            the software layer your{" "}
            <span style={{ background: "linear-gradient(135deg,#22d3ee,#06b6d4,#3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              hardware deserves
            </span>
          </>
        }
        subtitle="dashboards, APIs, real-time streams — we build the web and cloud layer that turns raw data into something people can actually use. wired to your IoT stack or standalone. built to scale from day one."
      />

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">

        {/* OFFERINGS */}
        <section ref={offerRef.ref} className="space-y-10">
          <div className="space-y-3 transition-all duration-700" style={{ opacity: offerRef.visible ? 1 : 0, transform: offerRef.visible ? "translateY(0)" : "translateY(32px)" }}>
            <SectionBadge color="cyan">what we build</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
              full-stack, front to back.
            </h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              database to dashboard, API to auth — we handle the whole web and cloud layer so you don't have to stitch it together yourself.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item, i) => (
              <div key={item.title} className="transition-all duration-700" style={{ opacity: offerRef.visible ? 1 : 0, transform: offerRef.visible ? "translateY(0)" : "translateY(28px)", transitionDelay: `${i * 70}ms` }}>
                <OfferingCard {...item} accentColor={ACCENT} borderColor={ACCENT} />
              </div>
            ))}
          </div>
        </section>

        {/* USE CASES */}
        <section ref={caseRef.ref} className="space-y-10">
          <div className="space-y-3 transition-all duration-700" style={{ opacity: caseRef.visible ? 1 : 0, transform: caseRef.visible ? "translateY(0)" : "translateY(32px)" }}>
            <SectionBadge color="blue">use cases</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
              where we apply it.
            </h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              real environments, real use cases. not just sandbox demos.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item, i) => (
              <div key={item.label} className="transition-all duration-700" style={{ opacity: caseRef.visible ? 1 : 0, transform: caseRef.visible ? "translateY(0)" : "translateY(24px)", transitionDelay: `${i * 60}ms` }}>
                <UseCaseCard {...item} accentColor={ACCENT} />
              </div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section ref={procRef.ref} className="relative overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-12 transition-all duration-700"
          style={{ opacity: procRef.visible ? 1 : 0, transform: procRef.visible ? "translateY(0)" : "translateY(36px)", background: "linear-gradient(135deg,#050709,#060b10,#040810)" }}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full blur-[100px]" style={{ background: `${ACCENT}14` }} />
            <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full blur-[80px]" style={{ background: `${ACCENT}0e` }} />
          </div>
          <div className="relative space-y-3 text-center mb-10">
            <SectionBadge color="cyan">how it happens</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}>
              six steps. no surprises.
            </h2>
            <p className="mx-auto max-w-xl text-sm text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              from first conversation to live deployment — you know what's happening at every step.
            </p>
          </div>
          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((item, i) => (
              <div key={item.step} className="transition-all duration-700" style={{ opacity: procRef.visible ? 1 : 0, transform: procRef.visible ? "translateY(0)" : "translateY(24px)", transitionDelay: `${i * 80}ms` }}>
                <ProcessCard {...item} accentColor={ACCENT} />
              </div>
            ))}
          </div>
        </section>

        {/* ── TECH STACK (TABBED) ── */}
        <section
          ref={techRef.ref}
          className="space-y-8 transition-all duration-700"
          style={{ opacity: techRef.visible ? 1 : 0, transform: techRef.visible ? "translateY(0)" : "translateY(32px)" }}
        >
          <div className="space-y-3">
            <SectionBadge color="cyan">technology</SectionBadge>
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
            >
              the stack behind every layer.
            </h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              tools we've actually shipped with — not just listed on a slide deck. pick a layer to explore.
            </p>
          </div>
          <TechStackTabs />
        </section>

        {/* ── ARCHITECTURE / DATA FLOW ── */}
        <section
          ref={archRef.ref}
          className="relative overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-12 space-y-8 transition-all duration-700"
          style={{
            opacity: archRef.visible ? 1 : 0,
            transform: archRef.visible ? "translateY(0)" : "translateY(36px)",
            background: "linear-gradient(135deg,#04080f,#060b12,#050709)",
          }}
        >
          {/* Ambient glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-10 h-72 w-72 rounded-full blur-[120px]" style={{ background: "rgba(16,185,129,0.07)" }} />
            <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full blur-[100px]" style={{ background: "rgba(6,182,212,0.06)" }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full blur-[80px]" style={{ background: "rgba(99,102,241,0.06)" }} />
          </div>

          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative space-y-3 text-center">
            <SectionBadge color="cyan">architecture</SectionBadge>
            <h2
              className="font-extrabold tracking-tight text-white"
              style={{ fontSize: "clamp(1.9rem,4.5vw,3rem)", fontFamily: "var(--font-display)" }}
            >
              how data moves end-to-end.
            </h2>
            <p className="mx-auto max-w-xl text-sm text-zinc-400" style={{ fontFamily: "var(--font-body)" }}>
              from a sensor pulse on a microcontroller to a live chart in your browser — every hop in the stack, animated.
            </p>
          </div>

          <div className="relative">
            <ArchitectureFlow />
          </div>

          {/* Legend / detail cards */}
          <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-5 pt-2">
            {archNodes.map(node => (
              <div
                key={node.id}
                className="rounded-xl border p-4 space-y-1"
                style={{
                  borderColor: `${node.color}25`,
                  background: `${node.color}08`,
                }}
              >
                <div className="text-xl">{node.icon}</div>
                <div className="text-xs font-bold text-white">{node.label}</div>
                <div className="text-[11px] text-zinc-500 font-mono">{node.sublabel}</div>
              </div>
            ))}
          </div>

          {/* Connection labels row */}
          <div className="relative hidden lg:grid grid-cols-4 gap-3">
            {archLabels.map((seg, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3 text-center"
              >
                <div className="text-[11px] font-semibold text-zinc-300 font-mono">{seg.label}</div>
                <div className="text-[10px] text-zinc-600 font-mono mt-0.5">{seg.sublabel}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <ServiceCTA
          accentGradient={ACCENT_GRAD}
          accentColor={ACCENT}
          title="got a platform to build?"
          subtitle="rough idea or full spec — bring it. we'll architect the right solution, build it clean, and hand it over with documentation that doesn't suck."
          ctaText="let's build it →"
        />
        <FormCard accentColor={ACCENT}>
          <InquiryForm accentGradient={ACCENT_GRAD} accentColor={ACCENT} focusColor="#06b6d4" serviceDefault="Web & Cloud Platforms" />
        </FormCard>

      </div>
    </div>
  );
}
