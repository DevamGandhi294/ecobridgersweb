"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionBadge, ParallaxOrbs } from "@/components/ServicePageShell";

gsap.registerPlugin(ScrollTrigger);

interface ScrollToggleHeroProps {
  accentGradient: string;
  accentColor: string;
  badge: string;
  badgeColor?: "emerald" | "cyan" | "violet" | "pink" | "amber" | "teal" | "blue" | "rose";
  icon: string;
  gridColor: string;
  
  // State 1
  pretitle1: string;
  title1: React.ReactNode;
  subtitle1: string;

  // State 2
  pretitle2: string;
  title2: React.ReactNode;
  subtitle2: string;
}

export function ScrollToggleHero({
  accentColor,
  badge,
  badgeColor = "emerald",
  gridColor,
  pretitle1,
  title1,
  subtitle1,
  pretitle2,
  title2,
  subtitle2,
}: ScrollToggleHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const state1LayerRef = useRef<HTMLDivElement>(null);
  const state2LayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const pillEl = pillRef.current;
      const knobEl = knobRef.current;
      const state1El = state1LayerRef.current;
      const state2El = state2LayerRef.current;

      if (!pillEl || !knobEl || !state1El || !state2El || !containerRef.current) return;

      // Compute distances from real DOM sizes so the two tracks stay perfectly synchronized.
      const pillStyles = window.getComputedStyle(pillEl);
      const padTop = parseFloat(pillStyles.paddingTop) || 0;
      const padBottom = parseFloat(pillStyles.paddingBottom) || 0;
      const knobTravel = Math.max(0, pillEl.clientHeight - padTop - padBottom - knobEl.offsetHeight);

      gsap.set(state1El, { y: 0, autoAlpha: 1, filter: "blur(0px)" });
      gsap.set(state2El, { y: 92, autoAlpha: 0, filter: "blur(6px)" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=170%",
          scrub: 0.45,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // A short dead-zone at start + stronger hold at end gives a closer
      // "13g-like" first-section behavior while preserving scrub precision.
      tl.to({}, { duration: 0.08 }, 0)
        .to(knobEl, { y: knobTravel, duration: 0.72 }, 0.08)
        .to(arrowRef.current, { rotation: 35, duration: 0.72 }, 0.08)
        .to(state1El, { y: -110, autoAlpha: 0, filter: "blur(6px)", ease: "power2.inOut", duration: 0.68 }, 0.12)
        .to(state2El, { y: 0, autoAlpha: 1, filter: "blur(0px)", ease: "power2.inOut", duration: 0.68 }, 0.12)
        .to({}, { duration: 0.2 }, 0.8);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full relative">
      <section ref={containerRef} className="relative flex min-h-screen w-full items-center justify-center overflow-hidden border-b border-white/10 pt-20" style={{ background:"#050709" }}>
      {/* Background from ServiceHero */}
      <div style={{ position:"absolute",inset:0,zIndex:0 }}>
        <div style={{
          position:"absolute",inset:0,
          background:`radial-gradient(ellipse 80% 60% at 20% 40%,${accentColor}22 0%,transparent 60%),
                      radial-gradient(ellipse 60% 50% at 80% 70%,${accentColor}14 0%,transparent 55%),
                      linear-gradient(135deg,#050709 0%,#080e0b 50%,#040810 100%)`,
          animation:"hero-bg-pulse 8s ease-in-out infinite",
        }} />
      </div>
      <div style={{ position:"absolute",inset:0,zIndex:1,background:"rgba(4,6,9,0.55)",backdropFilter:"blur(2px)" }} />
      <div style={{ position:"absolute",inset:0,zIndex:2,opacity:0.022,pointerEvents:"none",
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
      }} />
      <div style={{ position:"absolute",inset:0,zIndex:3,opacity:0.03,pointerEvents:"none",
        backgroundImage:`linear-gradient(to right,${gridColor} 1px,transparent 1px),linear-gradient(to bottom,${gridColor} 1px,transparent 1px)`,
        backgroundSize:"68px 68px"
      }} />
      <div className="hero-scan-line" style={{ "--scan-color": gridColor } as React.CSSProperties} />
      <ParallaxOrbs color1={`${accentColor}28`} color2={`${accentColor}18`} color3={`${accentColor}10`} />

      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-10 xl:px-16" style={{ height: "100%" }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-center justify-items-center h-full min-h-[600px]">
          
          {/* Toggle Graphic (Left Side) */}
          <div className="md:col-span-4 lg:col-span-5 flex justify-center w-full">
            <div 
              ref={pillRef}
              className="relative p-[12px] flex-shrink-0"
              style={{
                width: "180px",
                height: "420px",
                background: `linear-gradient(155deg, ${accentColor}f0, ${accentColor}7a)`,
                transform: "rotate(-29deg)",
                borderRadius: "999px",
                boxShadow: `inset 0 8px 22px rgba(0,0,0,0.2), 0 0 34px ${accentColor}50`,
                border: "4px solid rgba(255,255,255,0.06)"
              }}
            >
              <div 
                className="absolute inset-0 rounded-full pointer-events-none" 
                style={{
                  background: `linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)`,
                }} 
              />
              
              <div className="relative w-full h-full">
                {/* The Knob */}
                <div 
                  ref={knobRef}
                  className="absolute top-0 left-0 right-0 h-[160px] rounded-full bg-[#111111] flex items-center justify-center"
                  style={{
                    boxShadow: "0 10px 30px rgba(0,0,0,0.8), inset 0 2px 10px rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div 
                    ref={arrowRef}
                    className="flex justify-center items-center text-white" 
                    style={{ transform: "rotate(-10deg)" }}
                  >
                    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12h16"></path>
                      <path d="M13 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content (Right Side) */}
          <div className="md:col-span-8 lg:col-span-7 flex flex-col justify-center w-full min-h-[300px]">
            <div className="mb-4">
               <SectionBadge color={badgeColor}>{badge}</SectionBadge>
            </div>

            <div className="relative h-[255px] w-full overflow-hidden" style={{ maskImage: "linear-gradient(to bottom, black 84%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 84%, transparent 100%)" }}>
              {/* State 1 */}
              <div ref={state1LayerRef} className="absolute inset-0 h-[255px] flex flex-col justify-start pt-5 will-change-transform">
                  <p className="text-sm md:text-lg font-medium mb-3" style={{ fontFamily: "var(--font-display)", color: accentColor }}>
                    {pretitle1}
                  </p>
                  <h1 className="font-medium leading-[1.05] tracking-tight text-white mb-6" style={{ fontSize: "clamp(2.5rem,5vw,5rem)", fontFamily: "var(--font-display)" }}>
                    {title1}
                  </h1>
                  <p className="text-base text-zinc-300 sm:text-lg max-w-xl" style={{ fontFamily: "var(--font-body)" }}>
                    {subtitle1}
                  </p>
              </div>

              {/* State 2 */}
              <div ref={state2LayerRef} className="absolute inset-0 h-[255px] flex flex-col justify-start pt-5 will-change-transform">
                  <p className="text-sm md:text-lg font-medium mb-3" style={{ fontFamily: "var(--font-display)", color: accentColor }}>
                    {pretitle2}
                  </p>
                  <h1 className="font-medium leading-[1.05] tracking-tight text-white mb-6" style={{ fontSize: "clamp(2.5rem,5vw,5rem)", fontFamily: "var(--font-display)" }}>
                    {title2}
                  </h1>
                  <p className="text-base text-zinc-300 sm:text-lg max-w-xl" style={{ fontFamily: "var(--font-body)" }}>
                    {subtitle2}
                  </p>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-8 border-t border-white/10 pt-8" style={{ fontFamily: "var(--font-body)" }}>
              <div className="flex-1 text-sm leading-relaxed text-zinc-400">
                We support companies in their growth stages in order to shape their future prospects.
              </div>
              <div className="flex-1 text-sm leading-relaxed text-zinc-400">
                100% creative brand design agency: branding, strategy, website and web app, visual identities.
              </div>
            </div>

          </div>

        </div>
      </div>
      </section>
    </div>
  );
}
