"use client";

import { useEffect, useRef, useState } from "react";

const differentiators = [
    {
        title: "System Design Focus",
        desc: "Strong emphasis on architecture and planning before development begins — ensuring every solution is built on solid ground.",
        number: "01",
    },
    {
        title: "Optimized Tech Stack",
        desc: "One proven, battle-tested stack for faster delivery and more stable, maintainable systems over the long term.",
        number: "02",
    },
    {
        title: "Parallel Development",
        desc: "Hardware and software built simultaneously — cutting timelines without sacrificing quality or coordination.",
        number: "03",
    },
    {
        title: "Transparent Communication",
        desc: "Clear documentation, structured updates, and no surprises — you're always in the loop at every stage.",
        number: "04",
    },
    {
        title: "Budget-Conscious",
        desc: "Smart planning and efficient execution that consistently delivers quality solutions within your budget constraints.",
        number: "05",
    },
    {
        title: "Working Systems",
        desc: "We deliver complete, functional solutions ready for real-world use — not just code that needs further assembly.",
        number: "06",
    },
] as const;

export function HowWeDifferSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [triggered, setTriggered] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !triggered) {
                    setTriggered(true);
                }
            },
            { threshold: 0.2 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [triggered]);

    return (
        <section ref={sectionRef} className="space-y-10">
            {/* Left-aligned header */}
            <div>
                <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-4">
                    Our Edge
                </div>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">How We Differ</h2>
                <p className="mt-2 text-lg text-zinc-400">What Sets Us Apart</p>
            </div>

            {/* Cards grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {differentiators.map((item, i) => (
                    <div
                        key={item.title}
                        className="group relative flex flex-col justify-between rounded-2xl bg-white p-7 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
                        style={{
                            transform: triggered
                                ? "translateX(0) translateY(0) rotate(0deg)"
                                : "translateX(-120px) translateY(40px) rotate(-6deg)",
                            opacity: triggered ? 1 : 0,
                            transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 80}ms, opacity 0.5s ease ${i * 80}ms`,
                        }}
                    >
                        {/* Top: number */}
                        <div className="mb-6 text-xs font-bold tracking-widest text-slate-300 select-none">
                            {item.number}
                        </div>

                        {/* Middle: content */}
                        <div className="flex-1 space-y-3">
                            <h3 className="text-lg font-bold leading-snug text-slate-800">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-500">{item.desc}</p>
                        </div>

                        {/* Bottom: accent bar */}
                        <div className="mt-8 h-0.5 w-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" />
                    </div>
                ))}
            </div>

            {/* Bottom callout */}
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6 text-center">
                <p className="text-lg font-semibold text-white">
                    We don't just deliver code —{" "}
                    <span className="text-cyan-400">we deliver working systems</span>.
                </p>
            </div>
        </section>
    );
}