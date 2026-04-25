"use client";

const achievements = [
    "Completed 5+ combined team projects",
    "Delivered multiple solo and featured projects",
    "Worked on real-world monitoring, automation, and software systems",
    "Participated in hackathons, research, and innovation programs",
] as const;

const config = [
    {
        glowColor: "rgba(52,211,153,0.9)",
        glowShadow: "0 0 16px 4px rgba(52,211,153,0.5)",
        oneSideBorder: "rgba(52,211,153,1)",
        sprayClass: "from-emerald-500/70 via-emerald-500/20 to-transparent",
        cardHoverBorder: "rgba(52,211,153,0.35)",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(52,211,153,1)" strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round"
                style={{ width: 20, height: 20, display: "block", flexShrink: 0 }}>
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
        ),
    },
    {
        glowColor: "rgba(34,211,238,0.9)",
        glowShadow: "0 0 16px 4px rgba(34,211,238,0.5)",
        oneSideBorder: "rgba(34,211,238,1)",
        sprayClass: "from-cyan-500/70 via-cyan-500/20 to-transparent",
        cardHoverBorder: "rgba(34,211,238,0.35)",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(34,211,238,1)" strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round"
                style={{ width: 20, height: 20, display: "block", flexShrink: 0 }}>
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        glowColor: "rgba(167,139,250,0.9)",
        glowShadow: "0 0 16px 4px rgba(167,139,250,0.5)",
        oneSideBorder: "rgba(167,139,250,1)",
        sprayClass: "from-violet-500/70 via-violet-500/20 to-transparent",
        cardHoverBorder: "rgba(167,139,250,0.35)",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(167,139,250,1)" strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round"
                style={{ width: 20, height: 20, display: "block", flexShrink: 0 }}>
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
    },
    {
        glowColor: "rgba(251,113,133,0.9)",
        glowShadow: "0 0 16px 4px rgba(251,113,133,0.5)",
        oneSideBorder: "rgba(251,113,133,1)",
        sprayClass: "from-rose-500/70 via-rose-500/20 to-transparent",
        cardHoverBorder: "rgba(251,113,133,0.35)",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(251,113,133,1)" strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round"
                style={{ width: 20, height: 20, display: "block", flexShrink: 0 }}>
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
    },
] as const;

export function ExperienceSection() {
    return (
        <section className="space-y-6">
            <div>
                <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    Our Experience
                </div>
                <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                    Learning by Building
                </h2>
                <p className="mt-2 text-zinc-400">Over the past year, our team has:</p>
            </div>

            <div className="space-y-3">
                {achievements.map((achievement, idx) => {
                    const c = config[idx];
                    return (
                        <div
                            key={achievement}
                            className="group relative flex items-center gap-4 overflow-hidden cursor-default rounded-full border border-white/[0.08] bg-[#0d0f14] px-4 py-3 transition-all duration-500"
                            onMouseEnter={e => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.borderColor = c.cardHoverBorder;
                                el.style.boxShadow = `0 0 0 1px ${c.cardHoverBorder}`;
                            }}
                            onMouseLeave={e => {
                                const el = e.currentTarget as HTMLDivElement;
                                el.style.borderColor = "";
                                el.style.boxShadow = "";
                            }}
                        >
                            {/* Color spray — left ~50% only, fades to transparent */}
                            <div
                                className={`absolute inset-y-0 left-0 pointer-events-none bg-gradient-to-r ${c.sprayClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                style={{ width: "50%", borderRadius: "inherit" }}
                            />

                            {/*
                                ── Icon circle: one-sided bold highlight ──
                                Technique: outer wrapper has a conic-gradient background
                                that is bright on the top-left arc and near-invisible on
                                the bottom-right arc — exactly like the reference image.
                                A 2.5px padding gap between the gradient ring and the
                                dark inner circle creates the border illusion.
                            */}
                            <div
                                className="relative z-10 shrink-0 rounded-full transition-all duration-500"
                                style={{
                                    width: 52,
                                    height: 52,
                                    padding: "2.5px",
                                    background: `conic-gradient(
                                        from 210deg,
                                        rgba(255,255,255,0.05) 0deg,
                                        rgba(255,255,255,0.05) 150deg,
                                        ${c.oneSideBorder}    195deg,
                                        ${c.oneSideBorder}    255deg,
                                        rgba(255,255,255,0.05) 300deg,
                                        rgba(255,255,255,0.05) 360deg
                                    )`,
                                }}
                                onMouseEnter={e => {
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = c.glowShadow;
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                                }}
                            >
                                {/* Inner dark circle — fills the padded area */}
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "50%",
                                        background: "#111318",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {c.icon}
                                </div>
                            </div>

                            {/* Achievement text */}
                            <p className="relative z-10 flex-1 text-sm font-medium text-white/80 opacity-100 sm:opacity-0 transition-all duration-300 group-hover:opacity-100 sm:text-base">
                                {achievement}
                            </p>

                            {/* Arrow removed */}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}