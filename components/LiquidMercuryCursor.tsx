"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   LiquidMercuryCursor — Metallic morphing blob

   Drop this into: components/LiquidMercuryCursor.tsx
   Then add to:    app/layout.tsx

   <LiquidMercuryCursor />

   How it works:
   · A single metallic SVG blob tracks the cursor with
     slight spring lag — feels heavy and fluid.
   · The blob continuously morphs its border-radius in
     a non-repeating organic pattern using Lissajous math.
   · On click → splits into two smaller drops that fly
     apart, then a new blob reforms at cursor position.
   · On hover over interactive elements → blob flattens
     and turns into a pill underline beneath the element.
   · Color shifts subtly as you move (cool → warm).
───────────────────────────────────────── */
export function LiquidMercuryCursor() {
  const blobRef = useRef<HTMLDivElement>(null);
  const drop1Ref = useRef<HTMLDivElement>(null);
  const drop2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob  = blobRef.current;
    const drop1 = drop1Ref.current;
    const drop2 = drop2Ref.current;
    if (!blob || !drop1 || !drop2) return;

    const blobEl = blob as HTMLDivElement;
    const drop1El = drop1 as HTMLDivElement;
    const drop2El = drop2 as HTMLDivElement;

    /* ── Hide native cursor ── */
    const styleTag = document.createElement("style");
    styleTag.id = "__mercury-cursor-style";
    styleTag.textContent = `
      html, body, *, *::before, *::after { cursor: none !important; }
      @media (pointer: coarse) {
        html, body, *, *::before, *::after { cursor: auto !important; }
        #__mercury-blob,
        #__mercury-drop1,
        #__mercury-drop2 { display: none !important; }
      }
    `;
    document.head.appendChild(styleTag);

    if (window.matchMedia("(pointer: coarse)").matches) return;

    /* ── State ── */
    let mouseX = -200, mouseY = -200;
    let blobX  = -200, blobY  = -200;
    let velX = 0, velY = 0;
    let rafId: number;
    let t = 0;
    let isHovering  = false;
    let isSplitting = false;

    /* Spring constants — heavier than magnetic, more inertia */
    const STIFFNESS = 0.09;
    const DAMPING   = 0.72;

    /* ── Morph engine ──
       Generates 8-corner border-radius string using
       two sine waves at different frequencies per axis.
       Result is organic and never perfectly repeats.
    */
    function morphRadius(time: number): string {
      const s = (f: number, p: number) =>
        Math.round(50 + 22 * Math.sin(time * f + p));

      const tl  = s(1.3,  0.0);
      const tr  = s(1.7,  1.1);
      const br  = s(1.1,  2.3);
      const bl  = s(1.9,  3.4);
      const tl2 = s(1.5,  0.7);
      const tr2 = s(1.2,  1.8);
      const br2 = s(1.6,  2.9);
      const bl2 = s(1.4,  4.0);

      return `${tl}% ${100 - tl}% ${br}% ${100 - br}% / ${tl2}% ${tr2}% ${bl2}% ${br2}%`;
    }

    /* ── Color shift based on velocity ── */
    function velocityColor(vx: number, vy: number): string {
      const speed = Math.sqrt(vx * vx + vy * vy);
      const t = Math.min(speed / 12, 1);
      /* slow = silver-blue (#b8c8e0), fast = silver-warm (#e0d8c8) */
      const r = Math.round(184 + t * 40);
      const g = Math.round(200 - t * 8);
      const b = Math.round(224 - t * 56);
      return `rgb(${r},${g},${b})`;
    }

    /* ── Main animation loop ── */
    function tick() {
      t += 0.018;

      if (!isSplitting) {
        /* Spring physics */
        const dx = mouseX - blobX;
        const dy = mouseY - blobY;
        velX = velX * DAMPING + dx * STIFFNESS;
        velY = velY * DAMPING + dy * STIFFNESS;
        blobX += velX;
        blobY += velY;

        blobEl.style.left = `${blobX}px`;
        blobEl.style.top  = `${blobY}px`;

        if (!isHovering) {
          blobEl.style.borderRadius = morphRadius(t);
          blobEl.style.background   = velocityColor(velX, velY);
          /* Subtle squish in movement direction */
          const speed  = Math.sqrt(velX * velX + velY * velY);
          const squish = Math.min(speed / 40, 0.25);
          const angle  = Math.atan2(velY, velX) * (180 / Math.PI);
          const sx     = 1 + squish;
          const sy     = 1 - squish * 0.5;
          blobEl.style.transform = `translate(-50%,-50%) rotate(${angle}deg) scale(${sx},${sy})`;
        }
      }

      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    /* ── Mouse move ── */
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    /* ── Click → split into two drops ── */
    const onClick = (e: MouseEvent) => {
      if (isSplitting) return;
      isSplitting = true;

      blobEl.style.opacity = "0";

      const x = e.clientX;
      const y = e.clientY;

      /* Position drops at cursor */
      [drop1El, drop2El].forEach(d => {
        d.style.left    = `${x}px`;
        d.style.top     = `${y}px`;
        d.style.opacity = "1";
        d.style.width   = "14px";
        d.style.height  = "14px";
      });

      /* Fly apart */
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = angle1 + Math.PI + (Math.random() - 0.5) * 0.8;
      const dist   = 28 + Math.random() * 16;

      drop1El.style.transition = "left .3s cubic-bezier(.2,1.6,.4,1), top .3s cubic-bezier(.2,1.6,.4,1), opacity .25s ease .25s, width .25s ease .25s, height .25s ease .25s";
      drop2El.style.transition = drop1El.style.transition;

      requestAnimationFrame(() => {
        drop1El.style.left    = `${x + Math.cos(angle1) * dist}px`;
        drop1El.style.top     = `${y + Math.sin(angle1) * dist}px`;
        drop2El.style.left    = `${x + Math.cos(angle2) * dist}px`;
        drop2El.style.top     = `${y + Math.sin(angle2) * dist}px`;
        drop1El.style.width   = "8px";
        drop1El.style.height  = "8px";
        drop2El.style.width   = "8px";
        drop2El.style.height  = "8px";
      });

      /* Fade drops out, snap blob back */
      setTimeout(() => {
        drop1El.style.opacity = "0";
        drop2El.style.opacity = "0";
      }, 260);

      setTimeout(() => {
        drop1El.style.transition = "";
        drop2El.style.transition = "";
        /* Snap blob to current mouse without physics */
        blobX = mouseX;
        blobY = mouseY;
        velX  = 0;
        velY  = 0;
        blobEl.style.left    = `${blobX}px`;
        blobEl.style.top     = `${blobY}px`;
        blobEl.style.opacity = "1";
        isSplitting        = false;
      }, 420);
    };

    /* ── Hover: flatten into underline pill ── */
    const onEnter = (e: MouseEvent) => {
      isHovering = true;
      const target = e.currentTarget as HTMLElement;
      const rect   = target.getBoundingClientRect();

      blobEl.style.transition    = "width .25s ease, height .25s ease, border-radius .25s ease, background .25s ease, transform .25s ease";
      blobEl.style.width         = `${Math.min(rect.width, 80)}px`;
      blobEl.style.height        = "4px";
      blobEl.style.borderRadius  = "2px";
      blobEl.style.background    = "rgba(210,225,240,0.95)";
      blobEl.style.transform     = "translate(-50%, 0)";

      /* Snap to element bottom center */
      mouseX = rect.left + rect.width / 2;
      mouseY = rect.bottom + 6;
    };

    const onLeave = () => {
      isHovering = false;
      blobEl.style.transition   = "width .25s ease, height .25s ease, border-radius .25s ease, background .25s ease, transform .25s ease";
      blobEl.style.width        = "28px";
      blobEl.style.height       = "28px";
      blobEl.style.borderRadius = "50%";
      blobEl.style.transform    = "translate(-50%,-50%)";
      setTimeout(() => { blobEl.style.transition = ""; }, 260);
    };

    const attachHover = () => {
      document.querySelectorAll("a,button,[role='button'],input,select,textarea,label").forEach(el => {
        el.removeEventListener("mouseenter", onEnter as EventListener);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter as EventListener);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attachHover();

    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click",     onClick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click",     onClick);
      observer.disconnect();
      const st = document.getElementById("__mercury-cursor-style");
      if (st) document.head.removeChild(st);
    };
  }, []);

  const base: React.CSSProperties = {
    position:      "fixed",
    borderRadius:  "50%",
    pointerEvents: "none",
    zIndex:        2147483647,
    transform:     "translate(-50%,-50%)",
    top:           "-200px",
    left:          "-200px",
  };

  /* Shared metallic sheen via pseudo — we fake it with a radial highlight overlay */
  const metallic: React.CSSProperties = {
    background:  "rgb(200,215,230)",
    boxShadow:   "inset -3px -3px 6px rgba(0,0,0,0.25), inset 3px 3px 8px rgba(255,255,255,0.55), 0 2px 12px rgba(160,180,200,0.35)",
    willChange:  "left, top, border-radius, width, height",
  };

  return (
    <>
      {/* Main blob */}
      <div
        id="__mercury-blob"
        ref={blobRef}
        style={{
          ...base,
          ...metallic,
          width:  "28px",
          height: "28px",
        }}
      />

      {/* Split drop 1 */}
      <div
        id="__mercury-drop1"
        ref={drop1Ref}
        style={{
          ...base,
          ...metallic,
          width:   "14px",
          height:  "14px",
          opacity: 0,
          zIndex:  2147483646,
        }}
      />

      {/* Split drop 2 */}
      <div
        id="__mercury-drop2"
        ref={drop2Ref}
        style={{
          ...base,
          ...metallic,
          width:   "14px",
          height:  "14px",
          opacity: 0,
          zIndex:  2147483646,
        }}
      />
    </>
  );
}