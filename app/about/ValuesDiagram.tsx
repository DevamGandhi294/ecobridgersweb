"use client";

import { useEffect, useRef, useState } from "react";

export function ValuesDiagram() {
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
        <div
            ref={sectionRef}
            className="relative rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-12 transition-all duration-1000 ease-out"
            style={{
                opacity: triggered ? 1 : 0,
                transform: triggered ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
            }}
        >
            {/* Decorative Floating Texts in empty space */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
                {/* Left side */}
                <div className="absolute left-6 top-16 animate-float opacity-60 [animation-delay:0ms] hidden md:block">
                    <span className="text-lg font-bold tracking-wider text-emerald-600/40 uppercase">INNOVATION</span>
                </div>
                <div className="absolute left-12 bottom-16 animate-float opacity-60 [animation-delay:1500ms] hidden md:block">
                    <span className="text-2xl font-black tracking-widest text-zinc-300 uppercase">AUTOMATION</span>
                </div>

                {/* Right side */}
                <div className="absolute right-16 top-20 animate-float opacity-60 [animation-delay:700ms] hidden md:block">
                    <span className="text-3xl font-black tracking-widest text-cyan-600/30 uppercase">SCALABILITY</span>
                </div>
                <div className="absolute right-6 bottom-12 animate-float opacity-60 [animation-delay:2200ms] hidden md:block">
                    <span className="text-4xl font-black tracking-widest text-zinc-200 uppercase">INTEGRATION</span>
                </div>
            </div>

            <img
                src="/values_edited (2).svg"
                alt="Our Values diagram"
                className="relative z-10 mx-auto block w-full max-w-lg lg:max-w-xl"
            />
        </div>
    );
}
