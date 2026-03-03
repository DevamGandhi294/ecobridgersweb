"use client";

const highlights = [
  {
    icon: "🔌",
    title: "IoT & Embedded Systems",
    desc: "Smart systems using sensors, microcontrollers, and edge devices with real-time monitoring and control.",
    accent: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.15)",
    tag: "Hardware",
    href: "/services#iot",
  },
  {
    icon: "🌐",
    title: "Web & Cloud Platforms",
    desc: "Admin dashboards, control panels, APIs, and real-time cloud connectivity using modern technologies.",
    accent: "from-cyan-500 to-blue-600",
    glow: "rgba(6,182,212,0.18)",
    tag: "Cloud",
    href: "/services#web",
  },
  {
    icon: "📱",
    title: "Mobile Applications",
    desc: "Cross-platform apps for monitoring, control, and analytics — tightly integrated with IoT systems.",
    accent: "from-violet-500 to-purple-500",
    glow: "rgba(139,92,246,0.15)",
    tag: "Mobile",
    href: "/services#mobile",
  },
  {
    icon: "🧠",
    title: "AI-Assisted Solutions",
    desc: "Data-driven insights, predictive indicators, and intelligent automation using AI/ML techniques.",
    accent: "from-pink-500 to-rose-500",
    glow: "rgba(236,72,153,0.15)",
    tag: "AI / ML",
    href: "/services#ai",
  },
] as const;

export function ExpertiseCards() {
  return (
    <section className="space-y-8">
      <style>{`
        @keyframes scaleBreath {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(0.95); }
        }
        .scale-breath-1 {
          animation: scaleBreath 6s ease-in-out infinite;
        }
        .scale-breath-2 {
          animation: scaleBreath 6s ease-in-out infinite;
          animation-delay: 3s;
        }
      `}</style>

      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
          Core Expertise
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          What We Build
        </h2>
      </div>

      {/* 4-card grid */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:items-stretch">
        {highlights.map((item, idx) => {
          const isMiddle = idx === 1 || idx === 2;
          const animClass = idx === 1 ? "scale-breath-1" : idx === 2 ? "scale-breath-2" : "";

          return (
            <div
              key={item.title}
              className={animClass}
              style={{ willChange: isMiddle ? "transform" : undefined }}
            >
              <div
                style={{ boxShadow: `0 0 48px 0 ${item.glow}` }}
                className={[
                  "group relative overflow-hidden rounded-3xl border backdrop-blur-sm transition-colors duration-500 flex flex-col p-8 h-full",
                  isMiddle
                    ? "border-white/10 bg-zinc-900/50 hover:border-white/20"
                    : "border-white/15 bg-gradient-to-br from-zinc-800/80 to-zinc-900/60 hover:border-white/25",
                  "min-h-[320px]",
                ].join(" ")}
              >
                {/* Glow orb */}
                <div
                  className={`absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl bg-gradient-to-br ${item.accent} transition-opacity duration-500 ${isMiddle ? "opacity-10 group-hover:opacity-20" : "opacity-20 group-hover:opacity-30"}`}
                />

                {/* Tag pill */}
                <div className={`mb-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r ${item.accent} px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                  {item.tag}
                </div>

                {/* Icon */}
                <div className="text-5xl leading-none">{item.icon}</div>

                {/* Text */}
                <h3 className="mt-5 text-xl font-bold leading-snug text-white">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{item.desc}</p>

                {/* View button */}
                <a
                  href={item.href}
                  className={`mt-6 inline-flex items-center gap-2 self-start rounded-xl border bg-gradient-to-r ${item.accent} bg-clip-text px-4 py-2 text-xs font-semibold text-transparent border-current transition-all duration-300 group-hover:shadow-md`}
                  style={{ borderImage: "none", border: "1px solid", borderColor: "rgba(255,255,255,0.15)" }}
                >
                  <span className={`bg-gradient-to-r ${item.accent} bg-clip-text text-transparent font-bold`}>
                    View More
                  </span>
                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Bottom accent bar */}
                <div className={`absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r ${item.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                {/* Watermark emoji */}
                <div className="pointer-events-none absolute -bottom-4 -right-4 text-[7rem] leading-none opacity-[0.04] group-hover:scale-110 group-hover:opacity-[0.08] transition-all duration-500">
                  {item.icon}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}