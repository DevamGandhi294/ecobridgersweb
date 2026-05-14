"use client";

import { useState, useRef, useEffect, useId } from "react";
import Link from "next/link";
import Image from "next/image";
import FeaturedWorkShowcase from "@/components/FeaturedWorkShowcase";

import { iotProjects } from "./work-data/iot-projects";
import { webProjects } from "./work-data/web-projects";
import { mobileProjects } from "./work-data/mobile-projects";
import { aiProjects } from "./work-data/ai-projects";

// ─── Own Products ─────────────────────────────────────────────────────────────
const ownProducts = [
    {
        title: "TextileBridge",
        category: "SaaS · Textile",
        tagline: "Production & inventory management for textile units",
        price: "₹500–1,000/month",
        priceType: "subscription",
        icon: "🧵",
        image: null,
        description:
            "End-to-end production tracking, yarn & fabric inventory, order management, and real-time reporting — built specifically for small and mid-size textile manufacturing units.",
        features: ["Production order tracking", "Raw material & fabric inventory", "Supplier & buyer management", "Real-time dashboards & reports"],
    },
    {
        title: "BIoTSense",
        category: "IoT · Manufacturing",
        tagline: "Machine health monitoring & predictive maintenance",
        price: "Under ₹300/device/month",
        priceType: "subscription",
        icon: "⚙️",
        image: null,
        description:
            "Attach sensors to any machine and get live vibration, temperature, and current data. BIoTSense flags anomalies before breakdowns happen — reducing downtime and maintenance costs.",
        features: ["Live sensor dashboard", "Anomaly & fault detection", "Predictive maintenance alerts", "Multi-machine & multi-site support"],
    },
    {
        title: "TurfBridge",
        category: "SaaS · Sports",
        tagline: "Booking & management platform for box cricket venues",
        price: "₹500/month",
        priceType: "subscription",
        icon: "🏏",
        image: null,
        description:
            "A complete venue management solution for box cricket grounds — handle slot bookings, payments, member management, and daily reports all from one dashboard.",
        features: ["Online slot booking & calendar", "UPI / cash payment tracking", "Member & loyalty management", "Daily revenue reports"],
    },
    {
        title: "CafeBridge",
        category: "SaaS · F&B",
        tagline: "Billing & ordering system for cafes & cloud kitchens",
        price: "One-time ₹20,000",
        priceType: "one-time",
        icon: "☕",
        image: null,
        description:
            "A lightweight POS and order management system designed for cafes and cloud kitchens. Pay once, own it forever — no monthly fees, no hidden charges.",
        features: ["Table & counter billing", "KOT (kitchen order ticket)", "Menu & item management", "Sales & GST reports"],
    },
    {
        title: "Underground Rover",
        category: "IoT · Defence · R&D",
        tagline: "Underground surveillance rover — Government Granted",
        price: "R&D Project",
        priceType: "rd",
        icon: "🤖",
        image: null,
        description:
            "A remotely operated rover designed for underground tunnel and pipeline surveillance. Developed under a government R&D grant — uses onboard cameras, gas sensors, and obstacle detection to operate in hazardous environments where humans cannot safely go.",
        features: ["Remote operation via RF/Wi-Fi", "Onboard camera & gas sensing", "Obstacle detection & avoidance", "Government R&D backed"],
    },
];

// ─── Client projects ──────────────────────────────────────────────────────────
const clientProjects = [
    ...webProjects,
    ...mobileProjects,
    ...aiProjects,
    ...iotProjects,
];

const clientServices = [
    { id: "all", label: "All services" },
    { id: "web", label: "Web & Cloud" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "ai", label: "AI Solutions" },
    { id: "iot", label: "IoT & Embedded" },
];

// ═════════════════════════════════════════════════════════════════════════════
export default function WorkPage() {
    return (
        <div className="space-y-12">
            <FeaturedWorkShowcase />

            {/* PARTITION 1 — Products We Built */}
            <ProductsSection />

            {/* PARTITION 2 — Client Projects */}
            <ClientProjectsSection />

            {/* CTA */}
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
                        <Link href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/40">
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

// ═════════════════════════════════════════════════════════════════════════════
// PARTITION 1 — Products We Built
// Left sidebar = product nav list  |  Right = product detail card
// ═════════════════════════════════════════════════════════════════════════════
function ProductsSection() {
    const [activeProduct, setActiveProduct] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const titleRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const PINNED_TOP = 80;
        const onScroll = () => {
            if (!titleRef.current) return;
            setIsPinned(Math.round(titleRef.current.getBoundingClientRect().top) <= PINNED_TOP);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const product = ownProducts[activeProduct];

    return (
        <section ref={sectionRef} id="products-section" className="relative">
            {/* Sticky heading */}
            <div
                ref={titleRef}
                className={`sticky top-20 z-30 max-w-5xl mx-auto mb-6 py-3 backdrop-blur-sm transition-all duration-300
                    ${isPinned ? 'bg-[#05070f]/95 border-b border-white/10 shadow-lg shadow-black/30' : 'bg-transparent'}`}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">Products We Built</h2>
                        <p className="mt-1 text-zinc-400 text-sm">
                            Our own IP — designed, built and brought to market by our team.
                        </p>
                    </div>
                    {/* Mobile selector */}
                    <button
                        onClick={() => setMobileMenuOpen(o => !o)}
                        className="lg:hidden flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10"
                    >
                        <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                        </svg>
                        <span className="text-xs">{product.title}</span>
                        <svg className={`h-3 w-3 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                {mobileMenuOpen && (
                    <div className="lg:hidden mt-3 rounded-2xl border border-white/10 bg-[#080c18]/95 backdrop-blur-sm p-2.5 flex flex-wrap gap-1.5">
                        {ownProducts.map((p, i) => (
                            <button key={i} onClick={() => { setActiveProduct(i); setMobileMenuOpen(false); }}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200
                                    ${activeProduct === i ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-white/60 border border-white/10 hover:text-white hover:border-white/30'}`}>
                                {p.title}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Same fixed-height two-column layout as original */}
            <div className="flex gap-8 items-start h-[80vh] lg:h-[78vh] max-w-5xl mx-auto">

                {/* LEFT sidebar — product list, mirrors original sidebar exactly */}
                <aside className="hidden lg:block w-[270px] flex-shrink-0 h-full pl-2">
                    <div className="relative rounded-2xl border border-white/15 bg-[#080c18] p-6 shadow-xl shadow-black/40 h-full flex flex-col">

                        <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3">
                            Our Products
                        </p>

                        <ul className="space-y-1">
                            {ownProducts.map((p, i) => (
                                <li key={i}>
                                    <button
                                        onClick={() => setActiveProduct(i)}
                                        className={`relative flex w-full items-center rounded-lg px-3 py-2 text-sm transition-all text-left
                                            ${activeProduct === i ? "text-emerald-400 font-semibold" : "text-zinc-400 hover:text-white"}`}
                                    >
                                        {activeProduct === i && (
                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[3px] rounded-full bg-emerald-400" />
                                        )}
                                        <span className={activeProduct === i ? "pl-3" : ""}>{p.title}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="flex-1" />

                        <Link href="/contact"
                            className="flex items-center justify-between w-full rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-lg hover:shadow-emerald-500/30 transition-all">
                            HAVE A PROJECT?
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </aside>

                {/* RIGHT — product detail card, scrollable */}
                <div className="flex-1 min-w-0 h-full overflow-y-auto px-3 pb-4 hide-scrollbar">
                    <ProductDetailCard product={product} />
                </div>
            </div>
        </section>
    );
}

// ─── Product detail card ──────────────────────────────────────────────────────
function ProductDetailCard({ product }: { product: typeof ownProducts[0] }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#080c18] overflow-hidden flex flex-col">
            {/* Hero — large icon on gradient bg, matches FolderCard aesthetic */}
            <div className="relative flex items-center justify-center bg-gradient-to-br from-emerald-900/30 to-zinc-800/60 h-52 flex-shrink-0">
                <span className="text-8xl select-none">{product.icon}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c18] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-black/40 backdrop-blur-sm border border-emerald-500/20 rounded-full px-3 py-1">
                        {product.category}
                    </span>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col p-6 gap-5">
                <div>
                    <h3 className="text-2xl font-bold text-white">{product.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">{product.tagline}</p>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">{product.description}</p>

                {/* Feature list */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                            {f}
                        </li>
                    ))}
                </ul>

                {/* Price + CTA */}
                <div className="flex items-center justify-between gap-4 pt-5 border-t border-white/10">
                    <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-widest mb-0.5">Pricing</p>
                        <p className="text-lg font-bold text-white">{product.price}</p>
                        {product.priceType === "subscription" && (
                            <p className="text-[11px] text-zinc-500 mt-0.5">billed monthly</p>
                        )}
                        {product.priceType === "one-time" && (
                            <p className="text-[11px] text-emerald-400 mt-0.5">zero monthly fee</p>
                        )}
                        {product.priceType === "rd" && (
                            <p className="text-[11px] text-cyan-400 mt-0.5">Government Granted</p>
                        )}
                    </div>

                    <div className="flex gap-3 flex-shrink-0">
                        {product.priceType !== "rd" ? (
                            <>
                                <Link href="/contact"
                                    className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10">
                                    Enquire
                                </Link>
                                <Link href="/contact"
                                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-emerald-500/30 transition-all">
                                    Get Started
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </>
                        ) : (
                            <Link href="/contact"
                                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-emerald-500/30 transition-all">
                                Enquire / Collaborate
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ═════════════════════════════════════════════════════════════════════════════
// PARTITION 2 — Client Projects  (original layout, completely unchanged)
// ═════════════════════════════════════════════════════════════════════════════
function ClientProjectsSection() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [servicesOpen, setServicesOpen] = useState(true);
    const [industriesOpen, setIndustriesOpen] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const scrollPanelRef = useRef<HTMLDivElement>(null);
    const innerScrollTop = useRef(0);
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const panel = scrollPanelRef.current;
        const section = sectionRef.current;
        if (!panel || !section) return;
        const HEADER_H = 80;
        const onWheel = (e: WheelEvent) => {
            const rect = section.getBoundingClientRect();
            const pinned = rect.top <= HEADER_H && rect.bottom > HEADER_H + 10;
            if (!pinned) return;
            const maxScroll = panel.scrollHeight - panel.clientHeight;
            const cur = innerScrollTop.current;
            if (e.deltaY > 0 && cur >= maxScroll - 1) return;
            if (e.deltaY < 0 && cur <= 0) return;
            e.preventDefault();
            const next = Math.min(Math.max(cur + e.deltaY, 0), maxScroll);
            innerScrollTop.current = next;
            panel.scrollTop = next;
        };
        window.addEventListener("wheel", onWheel, { passive: false });
        return () => window.removeEventListener("wheel", onWheel);
    }, []);

    useEffect(() => {
        const panel = scrollPanelRef.current;
        if (!panel) return;
        innerScrollTop.current = 0;
        panel.scrollTop = 0;
    }, [activeFilter]);

    const displayProjects =
        activeFilter === "all" ? clientProjects
            : activeFilter === "web" ? webProjects
                : activeFilter === "mobile" ? mobileProjects
                    : activeFilter === "ai" ? aiProjects
                        : iotProjects;

    return (
        <section ref={sectionRef} id="projects-grid" className="relative">
            {/* Sticky heading — identical to original */}
            <div
                ref={titleRef}
                className={`sticky top-20 z-30 max-w-5xl mx-auto mb-6 py-3 backdrop-blur-sm transition-all duration-300
                    ${isPinned ? 'bg-[#05070f]/95 border-b border-white/10 shadow-lg shadow-black/30' : 'bg-transparent'}`}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">Client Projects</h2>
                        <p className="mt-1 text-zinc-400 text-sm">
                            {displayProjects.length} project{displayProjects.length !== 1 ? "s" : ""} &middot; {clientServices.find(s => s.id === activeFilter)?.label}
                        </p>
                    </div>
                    <button
                        onClick={() => setMobileFilterOpen(o => !o)}
                        className="lg:hidden flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10"
                        aria-label="Filter projects"
                    >
                        <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                        </svg>
                        <span className="text-xs">{clientServices.find(s => s.id === activeFilter)?.label}</span>
                        <svg className={`h-3 w-3 transition-transform duration-200 ${mobileFilterOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                {mobileFilterOpen && (
                    <div className="lg:hidden mt-3 rounded-2xl border border-white/10 bg-[#080c18]/95 backdrop-blur-sm p-2.5 flex flex-wrap gap-1.5">
                        {clientServices.map(s => (
                            <button key={s.id} onClick={() => { setActiveFilter(s.id); setMobileFilterOpen(false); }}
                                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200
                                    ${activeFilter === s.id ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-white/60 border border-white/10 hover:text-white hover:border-white/30'}`}>
                                {s.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Fixed-height two-column layout — identical to original */}
            <div className="flex gap-8 items-start h-[80vh] lg:h-[78vh] max-w-5xl mx-auto">

                {/* LEFT sidebar — identical to original */}
                <aside className="hidden lg:block w-[270px] flex-shrink-0 h-full pl-2">
                    <div className="relative rounded-2xl border border-white/15 bg-[#080c18] p-6 shadow-xl shadow-black/40 h-full flex flex-col">
                        <button onClick={() => setIndustriesOpen(!industriesOpen)}
                            className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                            Industries
                            <svg className={`h-4 w-4 transition-transform duration-200 ${industriesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        <div className="my-4 border-t border-white/10" />
                        <button onClick={() => setServicesOpen(!servicesOpen)}
                            className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                            Services
                            <svg className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {servicesOpen && (
                            <ul className="mt-3 space-y-1">
                                {clientServices.map((s) => (
                                    <li key={s.id}>
                                        <button onClick={() => setActiveFilter(s.id)}
                                            className={`relative flex w-full items-center rounded-lg px-3 py-2 text-sm transition-all text-left
                                                ${activeFilter === s.id ? "text-emerald-400 font-semibold" : "text-zinc-400 hover:text-white"}`}>
                                            {activeFilter === s.id && (
                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-[3px] rounded-full bg-emerald-400" />
                                            )}
                                            <span className={activeFilter === s.id ? "pl-3" : ""}>{s.label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="flex-1" />
                        <Link href="/contact"
                            className="flex items-center justify-between w-full rounded-full bg-gradient-to-r from-emerald-600 to-cyan-600 px-5 py-3 text-sm font-bold text-white shadow-lg hover:shadow-emerald-500/30 transition-all">
                            HAVE A PROJECT?
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </aside>

                {/* RIGHT — project cards, overflow:hidden + wheel-driven (original behaviour) */}
                <div ref={scrollPanelRef} className="flex-1 min-w-0 h-full overflow-y-hidden px-3 pb-4 hide-scrollbar">
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
    );
}

/* ── FolderCard — original, completely untouched ── */
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
    const TAB_H = 32;
    const TAB_W = W * 0.48;
    const scX = TAB_W - 2;
    const R = 14;

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
        `C ${scX + 22} ${TAB_H} ${scX + 12} 0 ${scX} 0`,
        `L ${R} 0 Z`,
    ].join(' ') : '';

    return (
        <div ref={containerRef} className="group relative h-[220px] transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            {shape && (
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <clipPath id={`fc-${uid}`} clipPathUnits="userSpaceOnUse">
                            <path d={shape} />
                        </clipPath>
                    </defs>
                </svg>
            )}
            <div className="absolute inset-0" style={{ clipPath: shape ? `url(#fc-${uid})` : undefined }}>
                {project.image ? (
                    <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-900/40 to-zinc-800">
                        <span className="text-5xl">{project.icon || '🎨'}</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{project.category}</span>
                    <h3 className="mt-1 text-sm font-bold text-white leading-snug line-clamp-2 drop-shadow-lg">{project.title}</h3>
                </div>
            </div>
            {shape && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
                    <path d={shape} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" vectorEffect="non-scaling-stroke"
                        className="transition-all duration-300 group-hover:stroke-emerald-500/40" />
                </svg>
            )}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full z-30" />
        </div>
    );
}