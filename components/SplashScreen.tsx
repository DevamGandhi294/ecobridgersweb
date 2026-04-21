"use client";

import { useEffect, useState, memo } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onComplete: () => void;
  minDuration?: number; // ms — minimum time splash shows
}

export const SplashScreen = memo(function SplashScreen({
  onComplete,
  minDuration = 2500,
}: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    // Phase 1: entrance animation (600ms)
    const t1 = setTimeout(() => setPhase("hold"), 600);
    // Phase 2: hold, then start exit
    const t2 = setTimeout(() => setPhase("exit"), minDuration);
    // Phase 3: after exit animation completes, unmount
    const t3 = setTimeout(() => onComplete(), minDuration + 700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [minDuration, onComplete]);

  return (
    <>
      <style>{`
        @keyframes splash-logo-in {
          from { opacity: 0; transform: scale(0.7) translateY(20px); }
          to   { opacity: 1; transform: scale(1)   translateY(0);    }
        }
        @keyframes splash-text-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes splash-bar {
          from { width: 0%;    }
          to   { width: 100%;  }
        }
        @keyframes splash-dot-pulse {
          0%,100% { opacity: 0.3; transform: scale(0.8); }
          50%     { opacity: 1;   transform: scale(1.2); }
        }
        @keyframes splash-bg-shift {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        @keyframes splash-ring-spin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes splash-ring-counter {
          from { transform: rotate(0deg);    }
          to   { transform: rotate(-360deg); }
        }
        @keyframes splash-orb1 {
          0%,100% { transform: translate(0,0)       scale(1);    }
          50%     { transform: translate(40px,-30px) scale(1.15); }
        }
        @keyframes splash-orb2 {
          0%,100% { transform: translate(0,0)        scale(1);    }
          50%     { transform: translate(-50px,25px) scale(0.9);  }
        }
        @keyframes splash-fade-out {
          from { opacity: 1; transform: scale(1);    }
          to   { opacity: 0; transform: scale(1.04); }
        }

        .splash-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #030a06;
          overflow: hidden;
        }
        .splash-root.exiting {
          animation: splash-fade-out 0.7s cubic-bezier(.4,0,.2,1) forwards;
          pointer-events: none;
        }

        /* Animated gradient mesh bg */
        .splash-mesh {
          position: absolute;
          inset: -20%;
          background: radial-gradient(ellipse 60% 50% at 30% 40%,
              rgba(16,185,129,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 70% 60%,
              rgba(6,182,212,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 20%,
              rgba(52,211,153,0.10) 0%, transparent 60%);
          background-size: 200% 200%;
          animation: splash-bg-shift 6s ease infinite;
        }

        /* Floating orbs */
        .splash-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }
        .splash-orb-1 {
          width: 380px; height: 380px;
          top: -80px; left: -80px;
          background: radial-gradient(circle, rgba(16,185,129,.22) 0%, transparent 70%);
          animation: splash-orb1 7s ease-in-out infinite;
        }
        .splash-orb-2 {
          width: 300px; height: 300px;
          bottom: -60px; right: -60px;
          background: radial-gradient(circle, rgba(6,182,212,.18) 0%, transparent 70%);
          animation: splash-orb2 9s ease-in-out infinite;
          animation-delay: -3s;
        }

        /* Grid texture */
        .splash-grid {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image:
            linear-gradient(to right, rgba(52,211,153,.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(52,211,153,.8) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        /* Content wrapper */
        .splash-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* Spinning rings around logo */
        .splash-rings {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: splash-logo-in 0.6s cubic-bezier(.2,.8,.4,1) forwards;
        }
        .splash-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid transparent;
        }
        .splash-ring-1 {
          width: 110px; height: 110px;
          border-top-color:  rgba(52,211,153,0.6);
          border-right-color: rgba(52,211,153,0.2);
          animation: splash-ring-spin 3s linear infinite;
        }
        .splash-ring-2 {
          width: 90px; height: 90px;
          border-bottom-color: rgba(6,182,212,0.5);
          border-left-color:   rgba(6,182,212,0.15);
          animation: splash-ring-counter 4s linear infinite;
        }
        .splash-ring-3 {
          width: 70px; height: 70px;
          border-top-color:  rgba(52,211,153,0.3);
          border-right-color: rgba(52,211,153,0.1);
          animation: splash-ring-spin 6s linear infinite;
        }

        /* Logo icon */
        .splash-logo-icon {
          width: 80px;
          height: 80px;
          border-radius: 28px;
          background: rgba(16,185,129,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 1px rgba(52,211,153,0.2),
                      0 0 40px rgba(16,185,129,0.2),
                      0 0 80px rgba(16,185,129,0.1);
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        /* Brand name */
        .splash-brand {
          margin-top: 24px;
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #fff;
          background: linear-gradient(135deg, #fff 0%, #e2fdf3 50%, #34d399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: splash-text-in 0.6s cubic-bezier(.2,.8,.4,1) 0.3s both;
        }

        /* Tagline */
        .splash-tagline {
          margin-top: 6px;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(52,211,153,0.6);
          animation: splash-text-in 0.6s cubic-bezier(.2,.8,.4,1) 0.45s both;
        }

        /* Progress bar */
        .splash-bar-track {
          margin-top: 40px;
          width: 180px;
          height: 2px;
          border-radius: 99px;
          background: rgba(255,255,255,0.08);
          overflow: hidden;
          animation: splash-text-in 0.4s ease 0.5s both;
        }
        .splash-bar-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(to right, #10b981, #06b6d4);
          box-shadow: 0 0 8px rgba(16,185,129,0.6);
          animation: splash-bar 2s cubic-bezier(.4,0,.2,1) 0.6s both;
        }

        /* Loading dots */
        .splash-dots {
          display: flex;
          gap: 6px;
          margin-top: 20px;
          animation: splash-text-in 0.4s ease 0.7s both;
        }
        .splash-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(52,211,153,0.5);
          animation: splash-dot-pulse 1.2s ease-in-out infinite;
        }
        .splash-dot:nth-child(2) { animation-delay: 0.2s; }
        .splash-dot:nth-child(3) { animation-delay: 0.4s; }

        /* Bottom tag */
        .splash-bottom {
          position: absolute;
          bottom: 28px;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.15);
          text-transform: uppercase;
          animation: splash-text-in 0.5s ease 0.8s both;
        }

        @media (prefers-reduced-motion: reduce) {
          .splash-ring-1, .splash-ring-2, .splash-ring-3,
          .splash-orb-1, .splash-orb-2, .splash-mesh {
            animation: none !important;
          }
        }
      `}</style>

      <div className={`splash-root${phase === "exit" ? " exiting" : ""}`}>
        {/* Animated bg layers */}
        <div className="splash-mesh" />
        <div className="splash-orb splash-orb-1" />
        <div className="splash-orb splash-orb-2" />
        <div className="splash-grid" />

        {/* Main content */}
        <div className="splash-content">
          {/* Logo with spinning rings */}
          <div className="splash-rings">
            <div className="splash-ring splash-ring-1" />
            <div className="splash-ring splash-ring-2" />
            <div className="splash-ring splash-ring-3" />
            <div className="splash-logo-icon">
              <Image
                src="/logo.png"
                alt="EcoBridgers Logo"
                width={60}
                height={60}
                className="object-contain rounded-[18px]"
                priority
              />
            </div>
          </div>

          {/* Brand */}
          <div className="splash-brand">EcoBridges</div>
          <div className="splash-tagline">IoT · Web · Mobile · Cloud</div>

          {/* Progress */}
          <div className="splash-bar-track">
            <div className="splash-bar-fill" />
          </div>

          {/* Dots */}
          <div className="splash-dots">
            <div className="splash-dot" />
            <div className="splash-dot" />
            <div className="splash-dot" />
          </div>
        </div>

        {/* Bottom label */}
        <div className="splash-bottom">Initialising systems</div>
      </div>
    </>
  );
});

export default SplashScreen;