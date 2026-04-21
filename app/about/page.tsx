import Link from "next/link";
import type { Metadata } from 'next'
// import TextPressure from '@/components/TextPressure';

export const metadata: Metadata = {
    alternates: {
        canonical: 'https://www.ecobridgers.site/services',
    },
    title: 'About Us — Engineering Team in Surat, India',
    description: 'Meet the EcoBridgers team — multi-disciplinary engineers specialising in IoT, cloud, and full-stack development. Based in Surat, Gujarat.',
}

export default function AboutPage() {
    const stats = [
        { value: "1+", label: "Year Experience", icon: "📅" },
        { value: "5+", label: "Team Projects", icon: "🚀" },
        { value: "Multiple", label: "Featured Works", icon: "⭐" },
        { value: "One", label: "Optimized Stack", icon: "⚡" },
    ] as const;

    const services = [
        "IoT & Embedded Systems",
        "Web & Cloud Platforms",
        "Mobile Applications",
        "Monitoring & Automation",
        "AI-assisted Data Insights",
    ] as const;

    const teamSkills = [
        "Embedded systems & IoT",
        "Cloud and backend development",
        "Web & mobile application development",
        "System architecture & integration",
    ] as const;

    const achievements = [
        "Completed 5+ combined team projects",
        "Delivered multiple solo and featured projects",
        "Worked on real-world monitoring, automation, and software systems",
        "Participated in hackathons, research, and innovation programs",
    ] as const;

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
        {
            icon: "🎯",
            title: "Clarity",
            desc: "Clear requirements and communication at every step",
        },
        {
            icon: "🛡️",
            title: "Reliability",
            desc: "Systems that work as expected in real environments",
        },
        {
            icon: "⚡",
            title: "Efficiency",
            desc: "Smart use of time, tools, and resources",
        },
        {
            icon: "🤝",
            title: "Collaboration",
            desc: "Working closely with clients and partners",
        },
        {
            icon: "📈",
            title: "Growth",
            desc: "Continuous learning and improvement",
        },
    ] as const;

    const visionPoints = [
        "Solves real problems",
        "Works reliably in real environments",
        "Scales with future needs",
        "Remains budget-friendly and maintainable",
    ] as const;

    return (
        <div className="space-y-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/20 p-8 sm:p-16">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute -left-20 top-0 h-72 w-72 animate-pulse rounded-full bg-emerald-500/10 blur-[100px]" />
                    <div className="absolute -right-20 bottom-0 h-72 w-72 animate-pulse rounded-full bg-cyan-500/10 blur-[100px] [animation-delay:1s]" />
                </div>

                <div className="relative">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        About Us
                    </div>

                    <h1 className="mt-6 max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
                        Building the Bridge Between{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Ideas and Technology
                        </span>
                    </h1>
                    {/* <div style={{position: 'relative', height: '300px'}}>
                    <TextPressure
                        text="EcoBridgers"
                        flex
                        alpha
                        stroke={false}
                        width
                        weight 
                        italic
                        textColor="#378b6f"
                        strokeColor="#5227FF"
                        minFontSize={36}
                    />
                    </div> */}
                    <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
                        EcoBridges is a project-based technology team focused on designing and developing IoT
                        systems, software platforms, and cloud-connected applications that solve real-world problems.
                    </p>

                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-400">
                        We work at the intersection of hardware, software, and data, helping ideas move from
                        concept to functional, deployable solutions.
                    </p>

                    <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                        <p className="text-base font-medium leading-relaxed text-zinc-300">
                            Our team believes that technology should be <span className="text-emerald-400">practical</span>,
                            <span className="text-emerald-400"> scalable</span>, and <span className="text-emerald-400">accessible</span> —
                            not over-complicated or out of reach.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((stat, idx) => (
                    <div
                        key={stat.label}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-white/[0.08]"
                    >
                        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl transition-all group-hover:scale-150 group-hover:bg-emerald-500/10" />
                        <div className="relative">
                            <div className="text-3xl">{stat.icon}</div>
                            <div className="mt-3 text-3xl font-bold text-white sm:text-4xl">{stat.value}</div>
                            <div className="mt-2 text-xs font-medium text-zinc-400 sm:text-sm">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Why EcoBridges - Name Philosophy */}
            <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 p-8 backdrop-blur-sm sm:p-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        Why EcoBridges?
                    </h2>
                    <p className="mt-2 text-zinc-400">The Idea Behind the Name</p>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8">
                        <div className="text-5xl">🌱</div>
                        <h3 className="mt-4 text-2xl font-bold text-white">Eco</h3>
                        <p className="mt-3 text-base leading-relaxed text-zinc-300">
                            Smart, efficient, and sustainable use of technology
                        </p>
                    </div>

                    <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-8">
                        <div className="text-5xl">🌉</div>
                        <h3 className="mt-4 text-2xl font-bold text-white">Bridges</h3>
                        <p className="mt-3 text-base leading-relaxed text-zinc-300">
                            Connecting ideas, systems, and people through technology
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-lg font-medium text-zinc-300">
                        We act as the <span className="text-emerald-400">bridge between vision and execution</span>,
                        ensuring that every project moves smoothly from idea to reality.
                    </p>
                </div>
            </section>

            {/* Our Vision */}
            <section className="space-y-8">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        Our Vision
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                        Technology That Makes Sense
                    </h2>
                    <p className="mt-3 text-zinc-400">Our vision is to build technology that:</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {visionPoints.map((point) => (
                        <div
                            key={point}
                            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-emerald-500/30 hover:bg-white/[0.06]"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
                                <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-sm font-medium text-zinc-300">{point}</p>
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
                    <p className="text-sm leading-relaxed text-zinc-300">
                        We aim to contribute toward smarter systems, better monitoring, and efficient automation
                        across industries and institutions.
                    </p>
                </div>
            </section>

            {/* What We Do */}
            <section className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-sm sm:p-12">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">What We Do</h2>
                <p className="mt-2 text-zinc-400">
                    We provide project-based services and product-oriented development in:
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div
                            key={service}
                            className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-medium text-zinc-300 transition-all hover:border-emerald-500/30 hover:bg-white/[0.06]"
                        >
                            {service}
                        </div>
                    ))}
                </div>

                <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
                    <p className="text-base font-medium leading-relaxed text-zinc-300">
                        💡 Our strength lies in <span className="text-cyan-400">end-to-end system development</span>,
                        where hardware, software, and cloud components work together seamlessly.
                    </p>
                </div>
            </section>

            {/* Our Team */}
            <section className="space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        Our Team
                    </h2>
                    <p className="mt-2 text-lg text-zinc-400">
                        A Collaborative, Multi-Disciplinary Team
                    </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 p-8 backdrop-blur-sm sm:p-12">
                    <p className="text-center text-base leading-relaxed text-zinc-300">
                        EcoBridges is powered by a team of recent graduates and final-year engineers with hands-on experience in:
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {teamSkills.map((skill) => (
                            <div
                                key={skill}
                                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5"
                            >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
                                    <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-zinc-300">{skill}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-zinc-400">
                            Each member contributes specialized skills, allowing us to deliver well-rounded and reliable solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Experience */}
            <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-950/20 via-zinc-900 to-cyan-950/20 p-8 backdrop-blur-sm sm:p-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        Our Experience
                    </h2>
                    <p className="mt-2 text-lg text-emerald-400">Learning by Building</p>
                    <p className="mt-4 text-base text-zinc-400">Over the past year, our team has:</p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {achievements.map((achievement, idx) => (
                        <div
                            key={achievement}
                            className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-emerald-500/30 hover:bg-white/[0.06]"
                        >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-sm font-bold text-emerald-400">
                                {idx + 1}
                            </div>
                            <p className="text-sm leading-relaxed text-zinc-300">{achievement}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
                    <p className="text-base font-medium leading-relaxed text-zinc-300">
                        Our experience comes from <span className="text-emerald-400">building, testing, and deploying real systems</span>,
                        not just theoretical knowledge.
                    </p>
                </div>
            </section>

            {/* How We Differ */}
            <section className="space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        How We Differ
                    </h2>
                    <p className="mt-2 text-lg text-zinc-400">What Sets Us Apart</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {differentiators.map((item) => (
                        <div
                            key={item.title}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-zinc-900/80"
                        >
                            <div className="absolute -right-8 -top-8 text-7xl opacity-5 transition-all group-hover:scale-110 group-hover:opacity-10">
                                {item.icon}
                            </div>

                            <div className="relative">
                                <div className="text-4xl">{item.icon}</div>
                                <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
                            </div>

                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                        </div>
                    ))}
                </div>

                <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-center">
                    <p className="text-lg font-semibold text-white">
                        We don't just deliver code — we deliver <span className="text-cyan-400">working systems</span>.
                    </p>
                </div>
            </section>

            {/* Our Values */}
            <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-emerald-950/20 p-8 backdrop-blur-sm sm:p-12">
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        Core Values
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                        Our Values
                    </h2>
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {values.map((value) => (
                        <div
                            key={value.title}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 text-center backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-white/[0.08]"
                        >
                            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl transition-all group-hover:bg-emerald-500/10" />
                            <div className="relative">
                                <div className="text-4xl">{value.icon}</div>
                                <h3 className="mt-4 text-base font-bold text-white">{value.title}</h3>
                                <p className="mt-2 text-xs leading-relaxed text-zinc-400">{value.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
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
                    <p className="text-base font-medium text-emerald-400">
                        From Idea to Impact
                    </p>
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
    );
}