"use client";

import { memo } from "react";

/**
 * HeroBg — CSS-only plasma-like animated background
 *
 * Replaces the WebGL Plasma component with pure CSS animations.
 * Runs entirely on the compositor thread — zero JS, zero GPU shader cost.
 * Looks nearly identical: flowing green organic blobs with depth and movement.
 *
 * Usage: drop-in replacement for <Plasma /> inside the hero section.
 * No props needed — just render <HeroBg />
 */
export const HeroBg = memo(function HeroBg() {
  return (
    <>
      <style>{`
        /* ── Blob keyframes — each blob moves in a unique organic path ── */

        @keyframes blob1 {
          0%   { transform: translate(0px, 0px)    scale(1);    }
          20%  { transform: translate(80px, -60px) scale(1.12); }
          40%  { transform: translate(-40px, 80px) scale(0.95); }
          60%  { transform: translate(100px, 40px) scale(1.08); }
          80%  { transform: translate(-60px,-40px) scale(1.04); }
          100% { transform: translate(0px, 0px)    scale(1);    }
        }

        @keyframes blob2 {
          0%   { transform: translate(0px, 0px)     scale(1);    }
          25%  { transform: translate(-100px, 60px) scale(1.15); }
          50%  { transform: translate(60px, -80px)  scale(0.92); }
          75%  { transform: translate(-40px, 100px) scale(1.1);  }
          100% { transform: translate(0px, 0px)     scale(1);    }
        }

        @keyframes blob3 {
          0%   { transform: translate(0px, 0px)    scale(1);    }
          30%  { transform: translate(60px, 80px)  scale(1.2);  }
          60%  { transform: translate(-80px,-60px) scale(0.88); }
          100% { transform: translate(0px, 0px)    scale(1);    }
        }

        @keyframes blob4 {
          0%   { transform: translate(0px, 0px)      scale(1);    }
          35%  { transform: translate(-70px, -90px)  scale(1.18); }
          70%  { transform: translate(90px,  50px)   scale(0.9);  }
          100% { transform: translate(0px, 0px)      scale(1);    }
        }

        @keyframes blob5 {
          0%   { transform: translate(0px, 0px)    scale(1);    }
          40%  { transform: translate(50px,-100px) scale(1.25); }
          80%  { transform: translate(-90px, 30px) scale(0.85); }
          100% { transform: translate(0px, 0px)    scale(1);    }
        }

        /* ── Slow rotating conic sweep — gives the "wave" feel ── */
        @keyframes conicSpin {
          0%   { transform: rotate(0deg)   scale(1.4); }
          100% { transform: rotate(360deg) scale(1.4); }
        }

        /* ── Subtle pulse on the whole bg ── */
        @keyframes bgPulse {
          0%,100% { opacity: 0.85; }
          50%     { opacity: 1;    }
        }

        .hero-bg-root {
          position: absolute;
          inset: 0;
          overflow: hidden;
          /* Entire effect runs on compositor — no JS needed */
          will-change: auto;
          animation: bgPulse 8s ease-in-out infinite;
        }

        /* Base dark background matching Plasma */
        .hero-bg-base {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 120% 80% at 50% 0%,
            #071a12 0%, #050d0a 50%, #030808 100%);
        }

        /* Blob shared styles */
        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(72px);
          mix-blend-mode: screen;
          pointer-events: none;
        }

        /* ── Blob 1: large primary green — top-left ── */
        .hero-blob-1 {
          width: clamp(420px, 55vw, 760px);
          height: clamp(420px, 55vw, 760px);
          top: -15%;
          left: -10%;
          background: radial-gradient(circle,
            rgba(16,185,129, 0.55) 0%,
            rgba(5,150,105,  0.30) 40%,
            transparent 70%);
          animation: blob1 18s ease-in-out infinite;
        }

        /* ── Blob 2: secondary teal — bottom-right ── */
        .hero-blob-2 {
          width: clamp(360px, 48vw, 680px);
          height: clamp(360px, 48vw, 680px);
          bottom: -10%;
          right: -8%;
          background: radial-gradient(circle,
            rgba(20,184,166, 0.45) 0%,
            rgba(6,182,212,  0.25) 45%,
            transparent 70%);
          animation: blob2 22s ease-in-out infinite;
          animation-delay: -7s;
        }

        /* ── Blob 3: cyan accent — top-right ── */
        .hero-blob-3 {
          width: clamp(280px, 36vw, 520px);
          height: clamp(280px, 36vw, 520px);
          top: 5%;
          right: 5%;
          background: radial-gradient(circle,
            rgba(6,182,212, 0.35) 0%,
            rgba(14,165,233,0.18) 50%,
            transparent 70%);
          animation: blob3 26s ease-in-out infinite;
          animation-delay: -12s;
        }

        /* ── Blob 4: deep emerald — centre ── */
        .hero-blob-4 {
          width: clamp(300px, 40vw, 580px);
          height: clamp(300px, 40vw, 580px);
          top: 30%;
          left: 30%;
          background: radial-gradient(circle,
            rgba(52,211,153, 0.28) 0%,
            rgba(16,185,129, 0.12) 55%,
            transparent 70%);
          animation: blob4 20s ease-in-out infinite;
          animation-delay: -4s;
        }

        /* ── Blob 5: warm green highlight ── */
        .hero-blob-5 {
          width: clamp(200px, 28vw, 400px);
          height: clamp(200px, 28vw, 400px);
          bottom: 20%;
          left: 10%;
          background: radial-gradient(circle,
            rgba(74,222,128, 0.22) 0%,
            rgba(34,197,94,  0.10) 55%,
            transparent 70%);
          animation: blob5 30s ease-in-out infinite;
          animation-delay: -18s;
        }

        /* ── Conic sweep — the "flowing wave" from Plasma ── */
        .hero-conic {
          position: absolute;
          inset: -40%;
          background: conic-gradient(
            from 0deg at 50% 45%,
            transparent       0deg,
            rgba(16,185,129, 0.06) 40deg,
            rgba(6,182,212,  0.04) 80deg,
            transparent      120deg,
            rgba(52,211,153, 0.05) 200deg,
            transparent      240deg,
            rgba(20,184,166, 0.04) 300deg,
            transparent      360deg
          );
          animation: conicSpin 40s linear infinite;
          mix-blend-mode: screen;
          pointer-events: none;
        }

        /* ── Fine noise grain texture overlay ── */
        .hero-grain {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        /* ── Reduce motion: freeze all blobs ── */
        @media (prefers-reduced-motion: reduce) {
          .hero-blob,
          .hero-conic {
            animation: none !important;
          }
        }

        /* ── Mobile: smaller blurs, lighter opacity for battery ── */
        @media (max-width: 768px) {
          .hero-blob   { filter: blur(48px); }
          .hero-blob-1 { opacity: 0.75; }
          .hero-blob-2 { opacity: 0.65; }
          .hero-blob-3 { opacity: 0.55; }
          .hero-blob-4 { opacity: 0.45; }
          .hero-blob-5 { opacity: 0.40; }
          .hero-conic  { animation-duration: 60s; }
        }
      `}</style>

      <div className="hero-bg-root" aria-hidden>
        <div className="hero-bg-base" />
        <div className="hero-conic"  />
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="hero-blob hero-blob-4" />
        <div className="hero-blob hero-blob-5" />
        <div className="hero-grain" />
      </div>
    </>
  );
});

export default HeroBg;