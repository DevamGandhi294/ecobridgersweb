"use client";

import { useState, useEffect } from "react";

const visionPills = [
    {
        icon: "🎯",
        label: "Solves real problems",
        color: "#34d399",
        bg: "#89e78f",
        text: "#111111",
        border: "#7fd186",
        desc: "We build systems tested against real-world conditions, not just demos. Every project starts with deeply understanding the actual problem.",
    },
    {
        icon: "🛡️",
        label: "Works reliably in real environments",
        color: "#22d3ee",
        bg: "#d6dd57",
        text: "#111111",
        border: "#c7ce50",
        desc: "Field-tested hardware and robust cloud backends that perform under load, network issues, and edge cases — not just ideal conditions.",
    },
    {
        icon: "📈",
        label: "Scales with future needs",
        color: "#a78bfa",
        bg: "#5f63ea",
        text: "#ffffff",
        border: "#6e72ff",
        desc: "Modular architecture designed to grow with your product. Adding new sensors, users, or features should never require a full rewrite.",
    },
    {
        icon: "💰",
        label: "Remains budget-friendly",
        color: "#fb7185",
        bg: "#a78bfa",
        text: "#111111",
        border: "#9f84ef",
        desc: "Clean code, clear documentation, and smart component choices keep ongoing costs low and handovers smooth — no vendor lock-in.",
    },
];

export function VisionPills() {
    const [groupExpanded, setGroupExpanded] = useState(false); // desktop hover
    const [mobileOpen, setMobileOpen] = useState<number | null>(null); // mobile tap
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 639px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            onMouseEnter={() => { if (!isMobile) setGroupExpanded(true); }}
            onMouseLeave={() => { if (!isMobile) setGroupExpanded(false); }}
        >
            {visionPills.map((pill, idx) => {
                const isExpanded = isMobile ? mobileOpen === idx : groupExpanded;

                return (
                    <div
                        key={pill.label}
                        className="overflow-hidden border w-full cursor-pointer"
                        onClick={() => {
                            if (isMobile) setMobileOpen(mobileOpen === idx ? null : idx);
                        }}
                        style={{
                            minHeight: isExpanded ? 160 : 68,
                            borderRadius: isExpanded ? 28 : 999,
                            background: pill.bg,
                            color: pill.text,
                            borderColor: isExpanded ? `${pill.color}88` : pill.border,
                            boxShadow: isExpanded ? `0 16px 40px -16px ${pill.color}70` : "none",
                            transition: "all 350ms cubic-bezier(0.4,0,0.2,1)",
                        }}
                    >
                        {/* Pill header — always visible */}
                        <div className="flex h-[68px] items-center px-5 gap-4">
                            <span
                                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg"
                                style={{
                                    background: "#0a0a0a",
                                    borderColor: isExpanded ? `${pill.color}88` : pill.border,
                                    transition: "border-color 350ms ease",
                                }}
                            >
                                {pill.icon}
                            </span>
                            <span className="flex-1 text-sm font-bold leading-snug tracking-tight">
                                {pill.label}
                            </span>
                            {/* Mobile chevron */}
                            {isMobile && (
                                <svg
                                    className="h-4 w-4 shrink-0 transition-transform duration-300"
                                    style={{
                                        color: pill.text,
                                        opacity: 0.6,
                                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                                    }}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                        </div>

                        {/* Expanded description */}
                        <div
                            style={{
                                maxHeight: isExpanded ? 120 : 0,
                                opacity: isExpanded ? 1 : 0,
                                overflow: "hidden",
                                transition: "max-height 320ms ease, opacity 250ms ease",
                            }}
                        >
                            <div className="px-5 pb-5">
                                <div className="h-px w-full mb-3" style={{ background: `${pill.color}50` }} />
                                <p className="text-sm leading-relaxed" style={{ opacity: 0.85 }}>
                                    {pill.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
