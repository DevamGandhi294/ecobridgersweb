"use client";

import { useState, useRef, useEffect, useId } from "react";
import Link from "next/link";
import Image from "next/image";
import FeaturedWorkShowcase from "@/components/FeaturedWorkShowcase";

// Import project data for each category
import { iotProjects } from "./work-data/iot-projects";
import { webProjects } from "./work-data/web-projects";
import { mobileProjects } from "./work-data/mobile-projects";
import { aiProjects } from "./work-data/ai-projects";

const services = [
    { id: "all", label: "All services" },
    { id: "web", label: "Web & Cloud" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "ai", label: "AI Solutions" },
    { id: "iot", label: "IoT & Embedded" },
];

export default function WorkPage() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [servicesOpen, setServicesOpen] = useState(true);
    const [industriesOpen, setIndustriesOpen] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    // ─── KEY CHANGE: scrollPanelRef is now overflow:hidden, we control its
    //     scrollTop manually from the window wheel listener.
    //     innerScrollTop tracks where we are inside the panel.
    const scrollPanelRef = useRef<HTMLDivElement>(null);
    const innerScrollTop = useRef(0);
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    // Detect when the sticky title is actually pinned (for visual style change)
    useEffect(() => {
        const PINNED_TOP = 80;
        const onScroll = () => {
            if (!titleRef.current) return;
            const rect = titleRef.current.getBoundingClientRect();
            setIsPinned(Math.round(rect.top) <= PINNED_TOP);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ─── CORE FIX: Single scroll context via window wheel listener ───────────
    //
    // The right panel has overflow:hidden. We track innerScrollTop manually.
    // The wheel listener decides:
    //   • If the section isn't in the "pinned zone"  → do nothing (normal page scroll)
    //   • If the panel still has room to scroll       → advance innerScrollTop + preventDefault
    //   • If the panel is exhausted (top or bottom)  → do nothing (page scroll takes over)
    //
    // Because the panel has overflow:hidden, the browser NEVER gives it scroll
    // events itself — there is only one scroll context (the page).
    // ─────────────────────────────────────────────────────────────────────────
    useEffect(() => {
        const panel = scrollPanelRef.current;
        const section = sectionRef.current;
        if (!panel || !section) return;

        const HEADER_H = 80;

        const onWheel = (e: WheelEvent) => {
            const rect = section.getBoundingClientRect();
            const pinned = rect.top <= HEADER_H && rect.bottom > HEADER_H + 10;

            if (!pinned) return; // section not in view → let page scroll normally

            const maxScroll = panel.scrollHeight - panel.clientHeight;
            const cur = innerScrollTop.current;
            const atBottom = cur >= maxScroll - 1;
            const atTop = cur <= 0;

            if (e.deltaY > 0 && atBottom) return; // panel exhausted downward  → page scrolls to CTA
            if (e.deltaY < 0 && atTop) return; // panel exhausted upward    → page scrolls up

            // Panel still has room → consume this wheel event
            e.preventDefault();
            const next = Math.min(Math.max(cur + e.deltaY, 0), maxScroll);
            innerScrollTop.current = next;
            panel.scrollTop = next; // ← direct DOM write, no React re-render
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        return () => window.removeEventListener("wheel", onWheel);
    }, []);

    // Reset inner scroll position when filter changes so panel starts at top
    useEffect(() => {
        const panel = scrollPanelRef.current;
        if (!panel) return;
        innerScrollTop.current = 0;
        panel.scrollTop = 0;
    }, [activeFilter]);

    const allProjects = [
        ...webProjects,
        ...mobileProjects,
        ...aiProjects,
        ...iotProjects,
    ];

    const displayProjects =
        activeFilter === "all"
            ? allProjects
            : activeFilter === "web"
                ? webProjects
                : activeFilter === "mobile"
                    ? mobileProjects
                    : activeFilter === "ai"
                        ? aiProjects
                        : iotProjects;

    return (
        <div className="space-y-12">

            {/* Featured Work Showcase Card */}
            <FeaturedWorkShowcase />

            {/* ── Sidebar + Grid Layout ── */}
            <section ref={sectionRef} id="projects-grid" className="relative">
                {/* Section Title — sticky */}
                <div
                    ref={titleRef}
                    className={`sticky top-20 z-30 max-w-5xl mx-auto mb-6 py-3 backdrop-blur-sm transition-all duration-300
                        ${isPinned
                            ? 'bg-[#05070f]/95 border-b border-white/10 shadow-lg shadow-black/30'
                            : 'bg-transparent'
                        }`}
                >
                    {/* Title row */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-white sm:text-4xl">Recent Works</h2>
                            <p className="mt-1 text-zinc-400 text-sm">
                                {displayProjects.length} project{displayProjects.length !== 1 ? "s" : ""} &middot; {services.find(s => s.id === activeFilter)?.label}
                            </p>
                        </div>

                        {/* Mobile filter button — only visible below lg */}
                        <button
                            onClick={() => setMobileFilterOpen(o => !o)}
                            className="lg:hidden flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10"
                            aria-label="Filter projects"
                        >
                            <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                            </svg>
                            <span className="text-xs">{services.find(s => s.id === activeFilter)?.label}</span>
                            <svg className={`h-3 w-3 transition-transform duration-200 ${mobileFilterOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile filter dropdown */}
                    {mobileFilterOpen && (
                        <div className="lg:hidden mt-3 rounded-2xl border border-white/10 bg-[#080c18]/95 backdrop-blur-sm p-2.5 flex flex-wrap gap-1.5">
                            {services.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => { setActiveFilter(s.id); setMobileFilterOpen(false); }}
                                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200
                                        ${activeFilter === s.id
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                            : 'text-white/60 border border-white/10 hover:text-white hover:border-white/30'
                                        }`}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Fixed-height container: sidebar stays, right panel scrolls */}
                <div className="flex gap-8 items-start h-[80vh] lg:h-[78vh] max-w-5xl mx-auto">

                    {/* ── LEFT: Sidebar (never moves) ── */}
                    <aside className="hidden lg:block w-[270px] flex-shrink-0 h-full pl-2">
                        <div className="relative rounded-2xl border border-white/15 bg-[#080c18] p-6 shadow-xl shadow-black/40 h-full flex flex-col">

                            {/* INDUSTRIES accordion */}
                            <button
                                onClick={() => setIndustriesOpen(!industriesOpen)}
                                className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                            >
                                Industries
                                <svg
                                    className={`h-4 w-4 transition-transform duration-200 ${industriesOpen ? "rotate-180" : ""}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {industriesOpen && (
                                <div className="mt-3 space-y-1 pl-1">
                                    {["Healthcare", "FinTech", "EdTech", "Manufacturing", "Retail"].map(ind => (
                                        <p key={ind} className="text-sm text-zinc-400 py-1 hover:text-white cursor-pointer transition-colors">{ind}</p>
                                    ))}
                                </div>
                            )}

                            {/* Divider */}
                            <div className="my-4 border-t border-white/10" />

                            {/* SERVICES accordion */}
                            <button
                                onClick={() => setServicesOpen(!servicesOpen)}
                                className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                            >
                                Services
                                <svg
                                    className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {servicesOpen && (
                                <ul className="mt-3 space-y-1">
                                    {services.map((s) => (
                                        <li key={s.id}>
                                            <button
                                                onClick={() => setActiveFilter(s.id)}
                                                className={`relative flex w-full items-center rounded-lg px-3 py-2 text-sm transition-all text-left ${activeFilter === s.id
                                                        ? "text-emerald-400 font-semibold"
                                                        : "text-zinc-400 hover:text-white"
                                                    }`}
                                            >
                                                {/* Active indicator bar */}
                                                {activeFilter === s.id && (
                                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[3px] rounded-full bg-emerald-400" />
                                                )}
                                                <span className={activeFilter === s.id ? "pl-3" : ""}>
                                                    {s.label}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Spacer pushes CTA to bottom */}
                            <div className="flex-1" />

                            {/* CTA Button */}
                            <Link
                                href="/contact"
                                className="flex items-center justify-between w-full rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-lg hover:shadow-emerald-500/30 transition-all"
                            >
                                HAVE A PROJECT?
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                    </aside>

                    {/* ── RIGHT: overflow:hidden — scrollTop driven by wheel listener ── */}
                    {/*
                        CRITICAL: overflow-y is now "hidden" (was "auto").
                        This removes the browser's native scroll context from this div,
                        so wheel events are never captured by it. Our window listener
                        has full, uncontested control of when and how it scrolls.
                    */}
                    <div
                        ref={scrollPanelRef}
                        className="flex-1 min-w-0 h-full overflow-y-hidden px-3 pb-4 hide-scrollbar"
                    >
                        {displayProjects.length > 0 ? (
                            <div className="grid gap-4 grid-cols-2 max-w-2xl mx-auto">
                                {displayProjects.map((project, index) => (
                                    <FolderCard key={index} project={project} />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-12 text-center">
                                <p className="text-lg text-zinc-400">No projects in this category yet.</p>
                            </div>
                        )}
                    </div>
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
                        Let's Discuss Your Project
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-zinc-300">
                        Have an idea or requirement? Let's build something amazing together.
                    </p>
                    <div className="pt-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/40"
                        >
                            Let's discuss your project
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

/* ── Folder-Tab shaped Project Card ── image clipped to exact shape via SVG clipPath ── */
function FolderCard({ project }: { project: any }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ w: 300, h: 220 });
    const rawId = useId();
    const uid = rawId.replace(/:/g, '');

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            setSize({ w: entry.contentRect.width, h: entry.contentRect.height });
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const { w: W, h: H } = size;
    const TAB_H = 32;        // tab height in px
    const TAB_W = W * 0.48;  // 48% of card width
    const scX = TAB_W - 2; // S-curve start x (matches SVG left: calc(48%-2px))
    const R = 14;        // corner radius

    // Full folder-tab outline path (clockwise)
    const shape = W > 10 ? [
        `M ${R} 0`,
        `Q 0 0 0 ${R}`,
        `L 0 ${H - R}`,
        `Q 0 ${H} ${R} ${H}`,
        `L ${W - R} ${H}`,
        `Q ${W} ${H} ${W} ${H - R}`,
        `L ${W} ${TAB_H + R}`,
        `Q ${W} ${TAB_H} ${W - R} ${TAB_H}`,
        `L ${scX + 34} ${TAB_H}`,
        // S-curve bezier: control points mirror the inline SVG path
        `C ${scX + 22} ${TAB_H} ${scX + 12} 0 ${scX} 0`,
        `L ${R} 0 Z`,
    ].join(' ') : '';

    return (
        <div
            ref={containerRef}
            className="group relative h-[220px] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
            {/* Hidden SVG defs — defines the clip shape */}
            {shape && (
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <clipPath id={`fc-${uid}`} clipPathUnits="userSpaceOnUse">
                            <path d={shape} />
                        </clipPath>
                    </defs>
                </svg>
            )}

            {/* Image + overlays — clipped to exact folder-tab shape */}
            <div
                className="absolute inset-0"
                style={{ clipPath: shape ? `url(#fc-${uid})` : undefined }}
            >
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-900/40 to-zinc-800">
                        <span className="text-5xl">{project.icon || '🎨'}</span>
                    </div>
                )}
                {/* Dark gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                {/* Category + title pinned at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                        {project.category}
                    </span>
                    <h3 className="mt-1 text-sm font-bold text-white leading-snug line-clamp-2 drop-shadow-lg">
                        {project.title}
                    </h3>
                </div>
            </div>

            {/* Border SVG — drawn along the same path, sits on top */}
            {shape && (
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                    viewBox={`0 0 ${W} ${H}`}
                    preserveAspectRatio="none"
                >
                    <path
                        d={shape}
                        fill="none"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                        className="transition-all duration-300 group-hover:stroke-emerald-500/40"
                    />
                </svg>
            )}

            {/* Bottom emerald accent on hover */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full z-30" />
        </div>
    );
}