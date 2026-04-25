import Link from "next/link";
import type { Metadata } from 'next';
import { VisionPills } from "./VisionPills";
import { ExperienceSection } from "./ExperienceSection";
import { HowWeDifferSection } from "./HowWeDifferSection";
import { ValuesDiagram } from "./ValuesDiagram";

export const metadata: Metadata = {
    alternates: {
        canonical: 'https://www.ecobridgers.site/services',
    },
    title: 'About Us — Engineering Team in Surat, India',
    description: 'Meet the EcoBridgers team — multi-disciplinary engineers specialising in IoT, cloud, and full-stack development. Based in Surat, Gujarat.',
}

export default function AboutPage() {
    const differentiators = [
        {
            title: "System Design Focus",
            desc: "Strong emphasis on architecture and planning before development",
            icon: "🎯",
        },
        {
            title: "Optimized Tech Stack",
            desc: "One proven stack for faster and more stable development",
            icon: "⚡",
        },
        {
            title: "Parallel Development",
            desc: "Hardware and software built simultaneously to save time",
            icon: "🔄",
        },
        {
            title: "Transparent Communication",
            desc: "Clear documentation and regular progress updates",
            icon: "💬",
        },
        {
            title: "Budget-Conscious",
            desc: "Smart planning that delivers quality within budget constraints",
            icon: "💰",
        },
        {
            title: "Working Systems",
            desc: "We deliver complete, functional solutions, not just code",
            icon: "✅",
        },
    ] as const;

    const values = [
        { icon: "🎯", title: "Clarity", desc: "Clear requirements and communication at every step" },
        { icon: "🛡️", title: "Reliability", desc: "Systems that work as expected in real environments" },
        { icon: "⚡", title: "Efficiency", desc: "Smart use of time, tools, and resources" },
        { icon: "🤝", title: "Collaboration", desc: "Working closely with clients and partners" },
        { icon: "📈", title: "Growth", desc: "Continuous learning and improvement" },
    ] as const;

    return (
        <div className="mx-auto max-w-screen-xl px-6 py-12 lg:px-10 xl:px-16">
            <div className="space-y-20">

                {/* ── HERO: The Team ── */}
                <section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/20 min-h-[420px]">
                    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                        <div className="absolute -left-20 top-0 h-72 w-72 animate-pulse rounded-full bg-emerald-500/10 blur-[100px]" />
                        <div className="absolute -right-20 bottom-0 h-72 w-72 animate-pulse rounded-full bg-cyan-500/10 blur-[100px] [animation-delay:1s]" />
                    </div>

                    <div className="relative flex flex-col lg:flex-row items-center gap-12 p-8 sm:p-12">
                        {/* LEFT — Title & description */}
                        <div className="flex-1 space-y-5">
                            <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                                The Team
                            </div>
                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                                A Collaborative,{" "}
                                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                    Multi-Disciplinary Team
                                </span>
                            </h1>
                            <p className="text-base leading-relaxed text-zinc-300">
                                Recent graduates and engineers with hands-on experience across hardware, software, and cloud.
                            </p>
                            <p className="text-sm leading-relaxed text-zinc-400">
                                Each member contributes specialized skills, allowing us to deliver well-rounded and reliable solutions.
                            </p>
                        </div>

                        {/* RIGHT — Big pill with two portrait circles */}
                        <div className="flex-shrink-0 flex justify-end">
                            <div
                                className="relative inline-flex items-center gap-4 sm:gap-6 rounded-[140px] border p-5 sm:p-8 shadow-2xl shadow-black/50"
                                style={{ background: "#89e78f", borderColor: "#7fd186" }}
                            >
                                <div className="absolute inset-0 rounded-[140px] bg-gradient-to-br from-white/20 via-transparent to-emerald-600/20 pointer-events-none" />

                                {/* Person 1 */}
                                <div className="relative">
                                    <div className="h-32 w-32 sm:h-44 sm:w-44 md:h-52 md:w-52 rounded-full overflow-hidden ring-4 ring-white shadow-2xl bg-white">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="/images/IMG-20260118-WA0020(1).jpg.jpeg"
                                            alt="Team member"
                                            className="w-full h-full object-cover object-top"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[#111318] px-4 py-1 text-xs font-semibold text-white shadow-lg">
                                        Devam Gandhi
                                    </div>
                                </div>

                                {/* Person 2 */}
                                <div className="relative">
                                    <div className="h-32 w-32 sm:h-44 sm:w-44 md:h-52 md:w-52 rounded-full overflow-hidden ring-4 ring-white shadow-2xl bg-white">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="/images/motion_photo_2805121201872873388.jpg.jpeg"
                                            alt="Team member"
                                            className="w-full h-full object-cover object-top"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[#111318] px-4 py-1 text-xs font-semibold text-white shadow-lg">
                                        Arpi Patel
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Vision */}
                <section className="space-y-8">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                            Our Vision
                        </div>
                        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                            Technology That Makes Sense
                        </h2>
                        <p className="mt-3 text-zinc-400">Our vision is to build technology that:</p>
                    </div>

                    <VisionPills />

                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
                        <p className="text-sm leading-relaxed text-zinc-300">
                            We aim to contribute toward smarter systems, better monitoring, and efficient automation
                            across industries and institutions.
                        </p>
                    </div>
                </section>

                {/* Our Experience — client component (needs onMouseEnter/Leave) */}
                <ExperienceSection />

                {/* How We Differ */}
                <HowWeDifferSection />

                {/* Our Values */}
                <section className="space-y-8">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                            Core Values
                        </div>
                        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Our Values</h2>
                    </div>

                    <ValuesDiagram />
                </section>
                {/* CTA Section */}
                <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-emerald-950/20 to-zinc-900 p-8 backdrop-blur-sm sm:p-16">
                    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                        <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
                        <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
                    </div>
                    <div className="relative space-y-6 text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            Let's Build Together
                        </h2>
                        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-zinc-300">
                            Whether you are an innovator, startup, institution, or organization, EcoBridges is
                            ready to collaborate and build meaningful technology solutions.
                        </p>
                        <p className="text-base font-medium text-emerald-400">From Idea to Impact</p>
                        <div className="pt-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                            >
                                Contact EcoBridges
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}