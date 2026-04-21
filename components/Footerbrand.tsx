"use client";

export function FooterBrand() {
  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{ marginBottom: "-4px" }}
    >
      {/* Gradient fade top */}
      <div
        className="absolute inset-x-0 top-0 z-10 h-16 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, #09090b, transparent)",
        }}
      />

      {/* The big text */}
      <div
        className="relative flex items-end justify-center w-full"
        style={{ lineHeight: 0.82 }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(72px, 18vw, 220px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            whiteSpace: "nowrap",

            /* Emerald → teal gradient fill matching the site accent */
            background:
              "linear-gradient(135deg, #059669 0%, #10b981 30%, #34d399 55%, #22d3ee 80%, #06b6d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",

            /* Subtle glow */
            filter: "drop-shadow(0 0 40px rgba(16,185,129,0.18))",

            opacity: 0.18,
          }}
        >
          EcoBridgers
        </span>
      </div>
    </div>
  );
}