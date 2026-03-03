"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface Step {
  title: string;
  desc: string;
}

interface Props {
  processSteps: readonly Step[];
  processIcons: readonly string[];
}

interface ArrowLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface ElbowRight {
  startX: number;
  startY: number;
  cornerX: number;
  rocketY: number;
  rocketLeftX: number;
}

interface ElbowLeft {
  rocketLeftX: number;
  rocketY: number;
  leftWallX: number;
  discussionLeftX: number;
  discussionCY: number;
}

interface Paths {
  topArrows: ArrowLine[];
  elbowRight: ElbowRight | null;
  elbowLeft: ElbowLeft | null;
}

const ICON_SIZE = 88;
const ROCKET_SIZE = 88;
const ROCKET_RADIUS = ROCKET_SIZE / 2;
const STEP_DURATION = 3000;
const TOTAL_STEPS = 6;

export function WorkflowDiagram({ processSteps, processIcons }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const rocketCircleRef = useRef<HTMLDivElement | null>(null);

  const [paths, setPaths] = useState<Paths>({
    topArrows: [],
    elbowRight: null,
    elbowLeft: null,
  });
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % TOTAL_STEPS);
    }, STEP_DURATION);
    return () => clearInterval(interval);
  }, []);

  const recalc = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cRect = container.getBoundingClientRect();
    setSvgSize({ w: cRect.width, h: cRect.height });

    const iconRects = iconRefs.current.map((el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        left:  r.left  - cRect.left,
        right: r.right - cRect.left,
        cx:    r.left  - cRect.left + r.width  / 2,
        cy:    r.top   - cRect.top  + r.height / 2,
      };
    });

    const rocketEl = rocketCircleRef.current;
    if (!rocketEl) return;
    const rr = rocketEl.getBoundingClientRect();
    const rocketCX = rr.left - cRect.left + rr.width  / 2;
    const rocketCY = rr.top  - cRect.top  + rr.height / 2;
    const rocketTrueLeft = rocketCX - ROCKET_RADIUS;

    const topArrows: ArrowLine[] = [];
    for (let i = 0; i < 3; i++) {
      const from = iconRects[i];
      const to   = iconRects[i + 1];
      if (!from || !to) continue;
      topArrows.push({ x1: from.right, y1: from.cy, x2: to.left, y2: to.cy });
    }

    const step3 = iconRects[3];
    const elbowRight: ElbowRight | null = step3
      ? {
          startX: step3.right,
          startY: step3.cy,
          cornerX: cRect.width - 2,
          rocketY: rocketCY,
          rocketLeftX: rocketTrueLeft,
        }
      : null;

    const step0 = iconRects[0];
    const elbowLeft: ElbowLeft | null = step0
      ? {
          rocketLeftX: rocketTrueLeft,
          rocketY: rocketCY,
          leftWallX: 2,
          discussionLeftX: step0.left,
          discussionCY: step0.cy,
        }
      : null;

    setPaths({ topArrows, elbowRight, elbowLeft });
  }, []);

  useEffect(() => {
    const timer = setTimeout(recalc, 50);
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => { clearTimeout(timer); ro.disconnect(); };
  }, [recalc]);

  const isLineActive       = (i: number) => activeStep === i;
  const isRightElbowActive = activeStep === 3;
  const isLeftElbowActive  = activeStep === 4 || activeStep === 5;
  const isNodeActive       = (i: number) => activeStep === i;
  const isRocketActive     = activeStep === 4;

  const activeColor   = "rgba(16,185,129,1)";
  const inactiveColor = "rgba(16,185,129,0.35)";
  const sc = (a: boolean) => (a ? activeColor : inactiveColor);
  const sw = (a: boolean) => (a ? "3" : "2");

  // Arrow marker IDs
  const activeMarkerId   = "arrow-active";
  const inactiveMarkerId = "arrow-inactive";

  return (
    <div
      ref={containerRef}
      className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-900/60 p-8 backdrop-blur-sm sm:p-10"
      style={{ overflow: "visible" }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />

      {svgSize.w > 0 && (
        <svg
          className="pointer-events-none absolute inset-0 z-0"
          width={svgSize.w}
          height={svgSize.h}
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Active arrowhead */}
            <marker
              id={activeMarkerId}
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill={activeColor}
              />
            </marker>
            {/* Inactive arrowhead */}
            <marker
              id={inactiveMarkerId}
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill={inactiveColor}
              />
            </marker>
          </defs>

          {/* Top row straight lines with arrowheads */}
          {paths.topArrows.map((a, i) => {
            const active = isLineActive(i);
            return (
              <line
                key={i}
                x1={a.x1} y1={a.y1}
                x2={a.x2} y2={a.y2}
                stroke={sc(active)}
                strokeWidth={sw(active)}
                markerEnd={`url(#${active ? activeMarkerId : inactiveMarkerId})`}
                style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
              />
            );
          })}

          {/* RIGHT elbow with arrowhead at end */}
          {paths.elbowRight && (() => {
            const { startX, startY, cornerX, rocketY, rocketLeftX } = paths.elbowRight!;
            const active = isRightElbowActive;
            // Split into 3 segments; put arrow only on last segment pointing into rocket
            return (
              <>
                {/* Segment 1: horizontal right */}
                <line
                  x1={startX} y1={startY}
                  x2={cornerX} y2={startY}
                  stroke={sc(active)}
                  strokeWidth={sw(active)}
                  style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
                />
                {/* Segment 2: vertical down */}
                <line
                  x1={cornerX} y1={startY}
                  x2={cornerX} y2={rocketY}
                  stroke={sc(active)}
                  strokeWidth={sw(active)}
                  style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
                />
                {/* Segment 3: horizontal left → rocket with arrowhead */}
                <line
                  x1={cornerX} y1={rocketY}
                  x2={rocketLeftX} y2={rocketY}
                  stroke={sc(active)}
                  strokeWidth={sw(active)}
                  markerEnd={`url(#${active ? activeMarkerId : inactiveMarkerId})`}
                  style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
                />
              </>
            );
          })()}

          {/* LEFT elbow with arrowhead at end */}
          {paths.elbowLeft && (() => {
            const { rocketLeftX, rocketY, leftWallX, discussionLeftX, discussionCY } = paths.elbowLeft!;
            const active = isLeftElbowActive;
            return (
              <>
                {/* Segment 1: horizontal left from rocket */}
                <line
                  x1={rocketLeftX} y1={rocketY}
                  x2={leftWallX} y2={rocketY}
                  stroke={sc(active)}
                  strokeWidth={sw(active)}
                  style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
                />
                {/* Segment 2: vertical up */}
                <line
                  x1={leftWallX} y1={rocketY}
                  x2={leftWallX} y2={discussionCY}
                  stroke={sc(active)}
                  strokeWidth={sw(active)}
                  style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
                />
                {/* Segment 3: horizontal right → discussion node with arrowhead */}
                <line
                  x1={leftWallX} y1={discussionCY}
                  x2={discussionLeftX} y2={discussionCY}
                  stroke={sc(active)}
                  strokeWidth={sw(active)}
                  markerEnd={`url(#${active ? activeMarkerId : inactiveMarkerId})`}
                  style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
                />
              </>
            );
          })()}
        </svg>
      )}

      {/* TOP ROW — 4 step icon boxes */}
      <div className="relative z-10 grid grid-cols-4">
        {processSteps.slice(0, 4).map((step, idx) => {
          const active = isNodeActive(idx);
          return (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div
                ref={(el) => { iconRefs.current[idx] = el; }}
                style={{
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  transition: "box-shadow 0.4s, transform 0.4s",
                  boxShadow: active
                    ? "0 0 0 3px rgba(16,185,129,0.6), 0 0 32px rgba(16,185,129,0.5)"
                    : "none",
                  transform: active ? "translateY(-6px) scale(1.08)" : "none",
                }}
                className={`flex items-center justify-center rounded-2xl border-2 text-4xl ${
                  active
                    ? "border-emerald-400 bg-gradient-to-br from-emerald-700/80 to-emerald-600/50"
                    : "border-emerald-500/40 bg-gradient-to-br from-emerald-900/70 to-emerald-800/30"
                }`}
              >
                <span aria-hidden="true">{processIcons[idx]}</span>
              </div>
              <p
                className="mt-3 text-[12px] font-bold leading-snug"
                style={{
                  color: active ? "rgb(52,211,153)" : "rgb(212,212,216)",
                  transition: "color 0.4s",
                }}
              >
                {step.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* BOTTOM ROW — Rocket centred */}
      <div className="relative z-10 mt-14 flex justify-center">
        <div className="flex flex-col items-center text-center">
          <div
            ref={rocketCircleRef}
            style={{
              width: ROCKET_SIZE,
              height: ROCKET_SIZE,
              transition: "box-shadow 0.4s, transform 0.4s",
              boxShadow: isRocketActive
                ? "0 0 0 4px rgba(16,185,129,0.5), 0 0 40px rgba(16,185,129,0.6)"
                : "0 0 28px rgba(16,185,129,0.25)",
              transform: isRocketActive ? "translateY(-6px) scale(1.08)" : "none",
            }}
            className={`flex items-center justify-center rounded-full border-2 text-4xl ${
              isRocketActive
                ? "border-emerald-300 bg-gradient-to-br from-emerald-800/60 to-zinc-800"
                : "border-emerald-400 bg-gradient-to-br from-zinc-900 to-zinc-800"
            }`}
          >
            <span aria-hidden="true">🚀</span>
          </div>
          <p
            className="mt-3 text-[13px] font-bold leading-tight"
            style={{
              color: isRocketActive ? "rgb(110,231,183)" : "rgb(52,211,153)",
              transition: "color 0.4s",
            }}
          >
            {processSteps[4].title}
          </p>
        </div>
      </div>
    </div>
  );
}

export default WorkflowDiagram;