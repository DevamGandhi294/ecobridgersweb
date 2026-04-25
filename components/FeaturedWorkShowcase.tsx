"use client";

import { useState, useEffect } from "react";

/* ============================================================
   Showcase Project Data
   ============================================================ */
const showcaseProjects = [
  {
    id: "ecommerce",
    type: "web" as const,
    category: "WEB & CLOUD PLATFORM",
    title: "E-Commerce Platform",
    description:
      "Digital transformation of online retail — Full-featured platform with payment integration and real-time inventory dashboard",
    flag: "🛒",
  },
  {
    id: "iot-app",
    type: "mobile" as const,
    category: "MOBILE APPLICATION",
    title: "IoT Control App",
    description:
      "Smart device management — Cross-platform app for monitoring and controlling IoT devices with live analytics",
    flag: "📱",
  },
];

const SLIDE_DURATION = 7000; // 7 seconds per slide

/* Pre-computed chart values (avoids Math calls in render) */
const chartBars = [40, 65, 45, 80, 55, 70, 90, 60, 75, 50];
const waveBars = Array.from({ length: 20 }, (_, i) =>
  Math.round(20 + Math.sin(i * 0.8) * 30 + 30),
);

/* ============================================================
   WebScreencast — animated browser mockup
   ============================================================ */
function WebScreencast() {
  return (
    <div className="absolute inset-0 bg-[#1a1a2e] overflow-hidden">
      {/* ── Browser Chrome ── */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#16162a] border-b border-white/5">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 mx-3 h-5 rounded-md bg-white/5 flex items-center px-2.5">
          <svg className="w-2.5 h-2.5 text-zinc-600 mr-1.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-[7px] text-zinc-500 font-mono">ecobridgers.site/shop</span>
        </div>
        <div className="flex gap-1">
          <span className="w-3.5 h-3.5 rounded bg-white/5" />
          <span className="w-3.5 h-3.5 rounded bg-white/5" />
        </div>
      </div>

      {/* ── Scrolling Website Content ── */}
      <div className="p-3 space-y-2.5 animate-[mockup-scroll_14s_ease-in-out_infinite]">
        {/* Navbar */}
        <div className="flex items-center justify-between px-2 py-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-emerald-500/40" />
            <div className="w-14 h-2 rounded bg-white/20" />
          </div>
          <div className="flex gap-3">
            {["w-8", "w-10", "w-6", "w-8"].map((w, i) => (
              <div key={i} className={`${w} h-1.5 rounded bg-zinc-600/40`} />
            ))}
          </div>
          <div className="w-14 h-5 rounded-full bg-emerald-500/30 flex items-center justify-center">
            <div className="w-8 h-1.5 rounded bg-white/30" />
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-lg overflow-hidden bg-gradient-to-r from-emerald-900/40 via-emerald-800/30 to-cyan-900/40 p-4">
          <div
            className="absolute inset-0 animate-[shimmer_3s_linear_infinite]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
              backgroundSize: "200% 100%",
            }}
          />
          <div className="relative space-y-2">
            <div className="w-3/4 h-3.5 rounded bg-white/25" />
            <div className="w-1/2 h-2.5 rounded bg-white/15" />
            <div className="w-1/3 h-2 rounded bg-white/10 mt-1" />
            <div className="flex gap-2 mt-3">
              <div className="w-16 h-5 rounded-full bg-emerald-500/40" />
              <div className="w-16 h-5 rounded-full border border-white/10" />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-2 px-1">
          {[
            { gradient: "from-violet-500/20 to-purple-500/20", barW: 55 },
            { gradient: "from-emerald-500/20 to-green-500/20", barW: 70 },
            { gradient: "from-amber-500/20 to-orange-500/20", barW: 40 },
            { gradient: "from-cyan-500/20 to-blue-500/20", barW: 85 },
          ].map((s, i) => (
            <div
              key={i}
              className={`flex-1 rounded-lg bg-gradient-to-br ${s.gradient} p-2 space-y-1`}
            >
              <div className="w-5 h-1 rounded bg-white/15" />
              <div className="w-8 h-2.5 rounded bg-white/20" />
              <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white/20 animate-pulse"
                  style={{ width: `${s.barW}%`, animationDelay: `${i * 300}ms` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <div className="px-1">
          <div className="flex items-center justify-between mb-2">
            <div className="w-20 h-2 rounded bg-white/15" />
            <div className="w-12 h-1.5 rounded bg-emerald-500/20" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg bg-white/5 p-1.5 space-y-1.5"
              >
                <div
                  className="h-14 rounded bg-gradient-to-br from-zinc-700/30 to-zinc-800/30 animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
                <div className="w-3/4 h-1.5 rounded bg-white/10" />
                <div className="flex items-center justify-between">
                  <div className="w-8 h-1.5 rounded bg-emerald-400/25" />
                  <div className="w-3 h-3 rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="px-1 space-y-2">
          <div className="w-28 h-2.5 rounded bg-white/15 mx-auto" />
          <div className="grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg bg-white/[0.03] border border-white/5 p-2 space-y-1"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 mb-1" />
                <div className="w-3/4 h-2 rounded bg-white/15" />
                <div className="w-full h-1 rounded bg-white/5" />
                <div className="w-2/3 h-1 rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer snippet */}
        <div className="flex items-center justify-between px-2 py-2 mt-2 border-t border-white/5">
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-6 h-1 rounded bg-white/10" />
            ))}
          </div>
          <div className="w-16 h-1 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MobileScreencast — animated phone mockup
   ============================================================ */
function MobileScreencast() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center overflow-hidden">
      {/* Decorative ambient */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-emerald-500/[0.06] blur-[50px] animate-pulse pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-cyan-500/[0.06] blur-[40px] animate-pulse pointer-events-none"
        style={{ animationDelay: "1.2s" }}
      />

      {/* ── Phone Frame ── */}
      <div className="relative w-[150px] sm:w-[170px] aspect-[9/19.2] rounded-[22px] border-2 border-zinc-600/40 bg-[#0a0a1a] shadow-2xl shadow-black/50 overflow-hidden">
        {/* Dynamic Island */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-[14px] bg-black rounded-full z-20" />

        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-7 z-10 flex items-end justify-between px-3.5 pb-0.5">
          <span className="text-[6px] text-white/40 font-mono font-semibold">
            9:41
          </span>
          <div className="flex items-center gap-1">
            <svg className="w-2 h-2 text-white/30" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <div className="w-3.5 h-[7px] rounded-[2px] border border-white/25 relative">
              <div className="absolute inset-[1px] right-[2px] rounded-[1px] bg-emerald-400/50" />
            </div>
          </div>
        </div>

        {/* ── Screen Content ── */}
        <div className="absolute inset-0 pt-8 px-2 pb-2 space-y-2 overflow-hidden animate-[mockup-scroll-mobile_16s_ease-in-out_infinite]">
          {/* App Header */}
          <div className="flex items-center justify-between px-0.5">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-emerald-500/30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400/50" />
              </div>
              <div className="w-11 h-1.5 rounded bg-white/25" />
            </div>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded-lg bg-white/5 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-400/40 animate-pulse" />
              </div>
              <div className="w-4 h-4 rounded-lg bg-white/5" />
            </div>
          </div>

          {/* Dashboard Card */}
          <div className="rounded-xl bg-gradient-to-r from-emerald-600/20 to-cyan-600/20 border border-emerald-500/10 p-2 space-y-1.5">
            <div className="flex justify-between items-center">
              <div className="w-10 h-1 rounded bg-white/20" />
              <div className="w-6 h-1 rounded bg-emerald-400/30" />
            </div>
            <div className="w-14 h-3 rounded bg-white/20" />
            {/* Animated Chart Bars */}
            <div className="flex items-end gap-[2px] h-8 mt-1">
              {chartBars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all duration-1000"
                  style={{
                    height: `${h}%`,
                    background:
                      i === 6
                        ? "rgba(52,211,153,0.6)"
                        : "rgba(52,211,153,0.25)",
                    animation: `bar-pulse 2.5s ease-in-out ${i * 150}ms infinite alternate`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Section Title */}
          <div className="flex items-center justify-between px-0.5 pt-0.5">
            <div className="w-12 h-1.5 rounded bg-white/15" />
            <div className="w-8 h-1 rounded bg-emerald-400/20" />
          </div>

          {/* Device Cards */}
          {[
            { icon: "💡", active: true },
            { icon: "🌡️", active: true },
            { icon: "💧", active: false },
          ].map((device, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 p-1.5 rounded-xl bg-white/[0.03] border border-white/5"
            >
              <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-[9px]">
                {device.icon}
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="w-10 h-1 rounded bg-white/20" />
                <div className="w-7 h-[3px] rounded bg-white/[0.08]" />
              </div>
              {/* Toggle Switch */}
              <div
                className={`w-6 h-3 rounded-full p-[2px] ${
                  device.active ? "bg-emerald-500/40" : "bg-zinc-700/40"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full bg-white/70 transition-transform ${
                    device.active ? "translate-x-2.5" : "translate-x-0"
                  }`}
                  style={{
                    animation: i === 2 ? "toggle-anim 4s ease-in-out infinite" : undefined,
                  }}
                />
              </div>
            </div>
          ))}

          {/* Activity Line Chart */}
          <div className="rounded-xl bg-white/[0.03] border border-white/5 p-2 space-y-1">
            <div className="flex justify-between items-center">
              <div className="w-10 h-1 rounded bg-white/15" />
              <div className="flex gap-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/30" />
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/30" />
              </div>
            </div>
            <div className="h-10 flex items-end gap-px">
              {waveBars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-[1px] animate-pulse"
                  style={{
                    height: `${h}%`,
                    background:
                      i % 2 === 0
                        ? "rgba(52,211,153,0.20)"
                        : "rgba(34,211,238,0.15)",
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-1 pt-0.5">
            {["⚡", "🔔", "📊", "⚙️"].map((icon, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg bg-white/[0.03]"
              >
                <span className="text-[9px]">{icon}</span>
                <div className="w-5 h-[3px] rounded bg-white/10" />
              </div>
            ))}
          </div>

          {/* Bottom spacer for scroll */}
          <div className="h-6" />
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-9 h-[3px] rounded-full bg-white/20 z-20" />
      </div>
    </div>
  );
}

/* ============================================================
   FeaturedWorkShowcase — main component
   ============================================================ */
export default function FeaturedWorkShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState<number[]>([0, 0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /* ── Auto-rotation Timer ── */
  useEffect(() => {
    if (isTransitioning) return;

    const startTime = Date.now();
    const TICK_MS = 40;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);

      setProgress((prev) => {
        const next = [...prev];
        next[activeIndex] = pct;
        return next;
      });

      if (pct >= 100) {
        clearInterval(interval);
        setIsTransitioning(true);

        setTimeout(() => {
          const nextIdx =
            (activeIndex + 1) % showcaseProjects.length;
          setProgress(() => {
            if (nextIdx === 0) return [0, 0];
            const n = new Array(showcaseProjects.length).fill(0);
            // Keep completed bars at 100
            for (let j = 0; j < nextIdx; j++) n[j] = 100;
            return n;
          });
          setActiveIndex(nextIdx);
          setIsTransitioning(false);
        }, 500);
      }
    }, TICK_MS);

    return () => clearInterval(interval);
  }, [activeIndex, isTransitioning]);

  const currentProject = showcaseProjects[activeIndex];

  return (
    <section className="relative w-full max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16" id="featured-showcase">
      {/* Container Drop shadow allows composite shapes to cast shadow cleanly on desktop, standard shadows on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 lg:drop-shadow-[0_20px_25px_rgba(0,0,0,0.5)]">
        {/* ─────────────────────────────────────────
            LEFT PANEL — "OUR BEST WORKS"
        ───────────────────────────────────────── */}
        <div className="relative p-6 pt-[72px] sm:p-10 sm:pt-[76px] lg:p-14 lg:pt-[80px] flex flex-col justify-between min-h-[380px] lg:min-h-[520px] drop-shadow-2xl lg:drop-shadow-none">
          {/* ── Universal Tab Shapes ── */}
          {/* Lower Main Box */}
          <div className="absolute top-[40px] inset-x-0 bottom-0 bg-[#080c18] border border-white/25 rounded-b-3xl rounded-tl-3xl z-0" />
          
          {/* Tab Box (Top Right) */}
          <div className="absolute top-0 right-0 w-[50%] h-[41px] bg-[#080c18] border-t border-r border-white/25 rounded-tr-3xl z-10" />
          
          {/* Slant connecting them (SVG for pixel-perfect curve without jutting artifacts) */}
          <svg 
            className="absolute top-0 z-10" 
            style={{ left: 'calc(50% - 34px)', width: '34px', height: '41px' }} 
            viewBox="0 0 34 41" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Fill covers horizontal borders beneath it safely */}
            <path d="M 0 40.5 C 12 40.5, 22 0.5, 34 0.5 L 34 41 L 0 41 Z" fill="#080c18" />
            <path d="M 0 40.5 C 12 40.5, 22 0.5, 34 0.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>

          {/* Ambient glow */}
          <div className="absolute top-8 left-8 w-44 h-44 rounded-full bg-emerald-500/[0.04] blur-[70px] pointer-events-none" />

          {/* Heading */}
          <div className="relative z-10">
            <h2
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black text-white leading-[0.90] tracking-tighter"
              style={{ fontFamily: "var(--font-display)" }}
            >
              OUR
              <br />
              BEST
              <br />
              WORKS
            </h2>
          </div>

          {/* Stats + CTA */}
          <div className="relative z-10 flex flex-wrap items-end justify-between gap-4 mt-auto pt-10">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-amber-200/90">
                500+
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 leading-tight font-semibold">
                PROJECTS
                <br />
                DONE
              </span>
            </div>

            <button
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.02] px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white/80 transition-all hover:border-emerald-400/30 hover:text-white hover:bg-white/[0.04]"
              onClick={() =>
                document
                  .getElementById("projects-grid")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-emerald-400/40 group-hover:text-emerald-400">
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </span>
              ALL CASES
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────
            RIGHT PANEL — Video Showcase
        ───────────────────────────────────────── */}
        <div className="relative p-4 pt-[60px] sm:p-6 sm:pt-[64px] lg:p-6 lg:pt-[56px] flex flex-col min-h-[380px] drop-shadow-2xl lg:drop-shadow-none">
          {/* ── Universal Tab Shapes ── */}
          {/* Lower Main Box */}
          <div className="absolute top-[40px] inset-x-0 bottom-0 bg-[#faf9f7] border border-[#e5e5e5] rounded-b-3xl rounded-tr-3xl z-0" />
          
          {/* Tab Box (Top Left) */}
          <div className="absolute top-0 left-0 w-[50%] h-[41px] bg-[#faf9f7] border-t border-l border-[#e5e5e5] rounded-tl-3xl z-10" />
          
          {/* Slant connecting them (SVG for pixel-perfect curve) */}
          <svg 
            className="absolute top-0 z-10" 
            style={{ left: '50%', width: '34px', height: '41px' }} 
            viewBox="0 0 34 41" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Fill covers horizontal borders beneath it safely */}
            <path d="M 0 0.5 C 12 0.5, 22 40.5, 34 40.5 L 34 41 L 0 41 Z" fill="#faf9f7" />
            <path d="M 0 0.5 C 12 0.5, 22 40.5, 34 40.5" stroke="#e5e5e5" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </svg>

          <div className="relative z-20 flex-1 flex flex-col w-full">
            {/* Video / Animated Mockup Container */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-zinc-900 shadow-lg">
            <div
              className={`absolute inset-0 transition-all duration-500 ease-out ${
                isTransitioning
                  ? "opacity-0 scale-[0.96] translate-x-6"
                  : "opacity-100 scale-100 translate-x-0"
              }`}
            >
              {currentProject.type === "web" ? (
                <WebScreencast />
              ) : (
                <MobileScreencast />
              )}
            </div>

            {/* "LIVE" badge */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 rounded-lg bg-black/50 px-2.5 py-1 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/80">
                Live
              </span>
            </div>
          </div>

          {/* Project Info */}
          <div className="flex-1 flex flex-col px-1.5 sm:px-2.5 pt-3">
            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900 leading-tight">
              {currentProject.title}
            </h3>

            {/* Category + Flag */}
            <div className="flex items-center gap-2 pt-1.5">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                {currentProject.category}
              </span>
              <span className="text-xs text-zinc-300">|</span>
              <span className="text-sm">{currentProject.flag}</span>
            </div>

            {/* Description */}
            <p className="pt-1.5 text-[13px] sm:text-sm text-zinc-600 leading-relaxed max-w-lg">
              {currentProject.description}
            </p>

            {/* Timeline Progress Bars */}
            <div className="flex gap-2.5 pt-4 mt-auto pb-1">
              {showcaseProjects.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-[3px] rounded-full overflow-hidden"
                  style={{ background: "rgba(0,0,0,0.06)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress[i]}%`,
                      background:
                        i === 0
                          ? "linear-gradient(90deg, #6366f1, #8b5cf6)"
                          : "linear-gradient(90deg, #0ea5e9, #06b6d4)",
                      transition: "width 80ms linear",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
