"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   CustomCursor — Emerald Trail Particles
   
   Drop this into: components/CustomCursor.tsx
   Then add to:    app/layout.tsx
   
   <CustomCursor />
   
   It hides the native cursor via inline style
   on mount, so it works even if globals.css
   cursor:none is missing on some pages.
───────────────────────────────────────── */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    /* ── Force cursor:none everywhere on mount ── */
    const styleTag = document.createElement("style");
    styleTag.id = "__custom-cursor-style";
    styleTag.textContent = `
      html, body, *, *::before, *::after {
        cursor: none !important;
      }
      @media (pointer: coarse) {
        html, body, *, *::before, *::after {
          cursor: auto !important;
        }
        #__custom-cursor-dot { display: none !important; }
      }
    `;
    document.head.appendChild(styleTag);

    /* ── Bail on touch devices ── */
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = 0, mouseY = 0;
    let lastX  = 0, lastY  = 0;

    /* Particle color palette */
    const COLORS = [
      "rgba(52,211,153,",   // emerald
      "rgba(34,211,238,",   // cyan
      "rgba(16,185,129,",   // deep emerald
      "rgba(110,231,183,",  // light emerald
      "rgba(255,255,255,",  // white spark
    ];

    /* DOM pool — reuse to avoid GC */
    const POOL_SIZE = 40;
    const pool: HTMLDivElement[] = [];

    for (let i = 0; i < POOL_SIZE; i++) {
      const p = document.createElement("div");
      p.style.cssText = [
        "position:fixed",
        "border-radius:50%",
        "pointer-events:none",
        "z-index:2147483646",          // just below dot
        "transform:translate(-50%,-50%)",
        "will-change:transform,opacity",
        "display:none",
      ].join(";");
      document.body.appendChild(p);
      pool.push(p);
    }

    let poolIdx = 0;

    function spawnParticle(x: number, y: number, burst = false) {
      const p     = pool[poolIdx % POOL_SIZE];
      poolIdx++;

      const size  = burst ? Math.random() * 5 + 3 : Math.random() * 4 + 2;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const angle = burst
        ? Math.random() * Math.PI * 2
        : Math.atan2(mouseY - lastY, mouseX - lastX) + (Math.random() - 0.5) * 1.2;
      const speed = burst ? Math.random() * 80 + 40 : Math.random() * 30 + 10;
      const life  = burst ? Math.random() * 400 + 300 : Math.random() * 500 + 300;

      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;

      p.style.display    = "block";
      p.style.width      = `${size}px`;
      p.style.height     = `${size}px`;
      p.style.left       = `${x}px`;
      p.style.top        = `${y}px`;
      p.style.background = `${color}1)`;
      p.style.boxShadow  = `0 0 ${size * 2}px ${color}0.6)`;
      p.style.opacity    = "1";

      const start = performance.now();

      (function tick(now: number) {
        const progress = Math.min((now - start) / life, 1);
        p.style.left    = `${x + dx * progress}px`;
        p.style.top     = `${y + dy * progress}px`;
        p.style.opacity = `${(1 - progress) * (burst ? 0.9 : 0.7)}`;
        p.style.width   = `${size * (1 - progress * 0.5)}px`;
        p.style.height  = `${size * (1 - progress * 0.5)}px`;
        if (progress < 1) requestAnimationFrame(tick);
        else p.style.display = "none";
      })(performance.now());
    }

    let distAccum  = 0;
    const TRAIL_PX = 6;

    /* ── Mouse move ── */
    const onMove = (e: MouseEvent) => {
      lastX  = mouseX;
      lastY  = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.left = `${mouseX}px`;
      dot.style.top  = `${mouseY}px`;

      const dist  = Math.hypot(mouseX - lastX, mouseY - lastY);
      distAccum  += dist;

      if (distAccum > TRAIL_PX) {
        const count = Math.min(Math.floor(dist / TRAIL_PX) + 1, 3);
        for (let i = 0; i < count; i++) {
          const t = i / count;
          spawnParticle(
            lastX + (mouseX - lastX) * t,
            lastY + (mouseY - lastY) * t,
          );
        }
        distAccum = 0;
      }
    };

    /* ── Click burst ── */
    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 10; i++) spawnParticle(e.clientX, e.clientY, true);
      dot.style.transform = "translate(-50%,-50%) scale(0.5)";
      setTimeout(() => { dot.style.transform = "translate(-50%,-50%) scale(1)"; }, 120);
    };

    /* ── Hover: dot morphs on interactive elements ── */
    const onEnter = () => {
      dot.style.width      = "16px";
      dot.style.height     = "16px";
      dot.style.background = "rgba(6,182,212,0.9)";
      dot.style.boxShadow  = "0 0 12px rgba(6,182,212,0.8),0 0 24px rgba(6,182,212,0.4)";
    };
    const onLeave = () => {
      dot.style.width      = "8px";
      dot.style.height     = "8px";
      dot.style.background = "rgba(52,211,153,0.95)";
      dot.style.boxShadow  = "0 0 8px rgba(52,211,153,0.8),0 0 16px rgba(52,211,153,0.4)";
    };

    /* Attach hover listeners — and re-scan whenever DOM changes */
    const attachHover = () => {
      document.querySelectorAll("a,button,[role='button'],input,select,textarea,label").forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attachHover();

    /* Re-attach on DOM mutations (route changes add new links) */
    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("click",     onClick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click",     onClick);
      observer.disconnect();
      pool.forEach(p => { if (document.body.contains(p)) document.body.removeChild(p); });
      const st = document.getElementById("__custom-cursor-style");
      if (st) document.head.removeChild(st);
    };
  }, []);

  return (
    <div
      id="__custom-cursor-dot"
      ref={dotRef}
      style={{
        position:      "fixed",
        width:         "8px",
        height:        "8px",
        borderRadius:  "50%",
        background:    "rgba(52,211,153,0.95)",
        boxShadow:     "0 0 8px rgba(52,211,153,0.8),0 0 16px rgba(52,211,153,0.4)",
        pointerEvents: "none",
        zIndex:        2147483647,           // max z-index
        transform:     "translate(-50%,-50%)",
        transition:    "width .2s ease,height .2s ease,background .2s ease,box-shadow .2s ease,transform .12s ease",
        willChange:    "left,top",
        mixBlendMode:  "screen",
        top:           "-100px",             // start off-screen
        left:          "-100px",
      }}
    />
  );
}