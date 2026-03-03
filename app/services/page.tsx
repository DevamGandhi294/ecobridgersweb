import Link from "next/link";

export default function ServicesPage() {
    const mainServices = [
        {
            icon: "🔌",
            title: "IoT & Embedded Systems",
            desc: "Smart systems using sensors, microcontrollers, and edge devices with real-time monitoring and control.",
            accent: "from-emerald-500 to-teal-500",
            accentBorder: "hover:border-emerald-500/40",
            accentGlow: "rgba(16,185,129,0.12)",
            tag: "Hardware",
            href: "/services/iot",
        },
        {
            icon: "🌐",
            title: "Web & Cloud Platforms",
            desc: "Admin dashboards, control panels, APIs, and real-time cloud connectivity using modern technologies.",
            accent: "from-cyan-500 to-blue-600",
            accentBorder: "hover:border-cyan-500/40",
            accentGlow: "rgba(6,182,212,0.12)",
            tag: "Cloud",
            href: "/services/web",
        },
        {
            icon: "📱",
            title: "Mobile Applications",
            desc: "Cross-platform apps for monitoring, control, and analytics — tightly integrated with IoT systems.",
            accent: "from-violet-500 to-purple-500",
            accentBorder: "hover:border-violet-500/40",
            accentGlow: "rgba(139,92,246,0.12)",
            tag: "Mobile",
            href: "/services/mobile",
        },
        {
            icon: "🧠",
            title: "AI-Assisted Solutions",
            desc: "Data-driven insights, predictive indicators, and intelligent automation using AI/ML techniques.",
            accent: "from-pink-500 to-rose-500",
            accentBorder: "hover:border-pink-500/40",
            accentGlow: "rgba(236,72,153,0.12)",
            tag: "AI / ML",
            href: "/services/ai",
        },
        {
            icon: "🧪",
            title: "Prototyping & POC",
            desc: "Rapid prototyping and proof-of-concept development for startups, research, and idea validation.",
            accent: "from-amber-500 to-orange-500",
            accentBorder: "hover:border-amber-500/40",
            accentGlow: "rgba(245,158,11,0.12)",
            tag: "Prototype",
            href: "/contact",
        },
        {
            icon: "🏭",
            title: "Industrial & Custom Solutions",
            desc: "Tailored hardware-software systems designed around your exact industrial or business requirements.",
            accent: "from-zinc-400 to-slate-400",
            accentBorder: "hover:border-zinc-400/40",
            accentGlow: "rgba(148,163,184,0.10)",
            tag: "Custom",
            href: "/contact",
        },
    ] as const;

    const serviceApproach = [
        { icon: "💬", label: "Discussion" },
        { icon: "📐", label: "Architecture" },
        { icon: "⚙️", label: "Development" },
        { icon: "🧪", label: "Testing" },
        { icon: "🚀", label: "Deployment" },
    ] as const;

    return (
        <div className="space-y-20">

            {/* ── Hero ── */}
            <section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/20 p-8 sm:p-16">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute -left-20 top-0 h-72 w-72 animate-pulse rounded-full bg-emerald-500/10 blur-[100px]" />
                    <div className="absolute -right-20 bottom-0 h-72 w-72 animate-pulse rounded-full bg-cyan-500/10 blur-[100px] [animation-delay:1s]" />
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgb(52,211,153) 1px, transparent 1px), linear-gradient(to bottom, rgb(52,211,153) 1px, transparent 1px)`,
                            backgroundSize: "60px 60px",
                        }}
                    />
                </div>

                <div className="relative max-w-3xl">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        Our Services
                    </div>
                    <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
                        Technology Solutions Built for{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Real-World Use
                        </span>
                    </h1>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400">
                        End-to-end IoT, software, and cloud services — built to be reliable, scalable, and easy to maintain.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40"
                        >
                            Let's discuss your project
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        <Link
                            href="/process"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                        >
                            Our Process
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Service Cards Grid ── */}
            <section className="space-y-6">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        What We Do
                    </div>
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Services</h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {mainServices.map((service) => (
                        <div
                            key={service.title}
                            style={{ boxShadow: `0 0 40px 0 ${service.accentGlow}` }}
                            className={[
                                "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-7 backdrop-blur-sm transition-all duration-300",
                                service.accentBorder,
                                "hover:bg-zinc-900/90",
                            ].join(" ")}
                        >
                            {/* Glow orb */}
                            <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${service.accent} opacity-10 blur-2xl transition-all duration-300 group-hover:opacity-20`} />

                            {/* Tag pill */}
                            <div className={`mb-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r ${service.accent} px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white`}>
                                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                                {service.tag}
                            </div>

                            {/* Icon */}
                            <div className="text-5xl leading-none">{service.icon}</div>

                            {/* Text */}
                            <h3 className="mt-4 text-lg font-bold text-white">{service.title}</h3>
                            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{service.desc}</p>

                            {/* Read More button */}
                            <Link
                                href={service.href}
                                className={`mt-6 inline-flex items-center gap-2 self-start rounded-xl bg-gradient-to-r ${service.accent} px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95`}
                            >
                                Read More
                                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>

                            {/* Bottom accent bar */}
                            <div className={`absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r ${service.accent} transition-all duration-500 group-hover:w-full`} />

                            {/* Watermark */}
                            <div className="pointer-events-none absolute -bottom-3 -right-3 text-[6rem] leading-none opacity-[0.04] transition-all duration-500 group-hover:opacity-[0.08] group-hover:scale-110">
                                {service.icon}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Process Strip ── */}
            <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-emerald-950/10 p-8 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Our Process</p>
                        <h3 className="mt-1 text-xl font-bold text-white">How We Deliver</h3>
                    </div>

                    {/* Steps inline */}
                    <div className="flex flex-wrap items-center gap-2">
                        {serviceApproach.map((step, idx) => (
                            <div key={step.label} className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-300">
                                    <span>{step.icon}</span>
                                    <span>{step.label}</span>
                                </div>
                                {idx < serviceApproach.length - 1 && (
                                    <svg className="h-3 w-3 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>

                    <Link
                        href="/process"
                        className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-400 transition-all hover:bg-emerald-500/20"
                    >
                        See Full Process
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* ── View Our Work Section ── */}
            <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-cyan-950/10 p-8 backdrop-blur-sm sm:p-12">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                        Our Portfolio
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
                        See What We've Built
                    </h2>
                    <p className="mt-4 text-base text-zinc-400">
                        Explore our recent projects across IoT, web, mobile, and AI solutions
                    </p>
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/work"
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-white/10"
                    >
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🎯</span>
                            <div className="text-left">
                                <div className="text-sm font-bold text-white">View All Projects</div>
                                <div className="text-xs text-zinc-400">Explore our complete portfolio</div>
                            </div>
                            <svg className="h-5 w-5 text-cyan-400 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </Link>

                    <Link
                        href="/work"
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-white/10"
                    >
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🔌</span>
                            <div className="text-left">
                                <div className="text-sm font-bold text-white">IoT Projects</div>
                                <div className="text-xs text-zinc-400">Smart hardware solutions</div>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/work"
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-white/10"
                    >
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🌐</span>
                            <div className="text-left">
                                <div className="text-sm font-bold text-white">Web Projects</div>
                                <div className="text-xs text-zinc-400">Cloud platforms & dashboards</div>
                            </div>
                        </div>
                    </Link>

                    <Link
                        href="/work"
                        className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-sm transition-all hover:border-violet-500/30 hover:bg-white/10"
                    >
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">📱</span>
                            <div className="text-left">
                                <div className="text-sm font-bold text-white">Mobile Apps</div>
                                <div className="text-xs text-zinc-400">Cross-platform applications</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-emerald-950/20 to-zinc-900 p-8 text-center backdrop-blur-sm sm:p-16">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
                    <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
                </div>
                <div className="relative space-y-5">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Let's Build Together</h2>
                    <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-300">
                        Whether you need a complete IoT system, a web platform, or a working prototype — EcoBridges is ready.
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40"
                        >
                            Let's discuss your project
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}