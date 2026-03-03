"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Import project data for each category
import { iotProjects } from "./work-data/iot-projects";
import { webProjects } from "./work-data/web-projects";
import { mobileProjects } from "./work-data/mobile-projects";
import { aiProjects } from "./work-data/ai-projects";

export default function WorkPage() {
    const [activeTab, setActiveTab] = useState("all");

    const tabs = [
    { id: "all", label: "All Projects" },
        { id: "iot", label: "IoT & Embedded"},
        { id: "web", label: "Web & Cloud" },
        { id: "mobile", label: "Mobile Apps" },
        { id: "ai", label: "AI Solutions" },
    ];

    // Combine all projects
    const allProjects = [
        ...iotProjects,
        ...webProjects,
        ...mobileProjects,
        ...aiProjects,
    ];

    // Get projects based on active tab
    const getActiveProjects = () => {
        switch (activeTab) {
            case "all":
                return allProjects;
            case "iot":
                return iotProjects;
            case "web":
                return webProjects;
            case "mobile":
                return mobileProjects;
            case "ai":
                return aiProjects;
            default:
                return allProjects;
        }
    };

    const displayProjects = getActiveProjects();

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/20 p-8 sm:p-16">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute -left-20 top-0 h-72 w-72 animate-pulse rounded-full bg-emerald-500/10 blur-[100px]" />
                    <div className="absolute -right-20 bottom-0 h-72 w-72 animate-pulse rounded-full bg-cyan-500/10 blur-[100px] [animation-delay:1s]" />
                </div>

                <div className="relative text-center">
                    <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                        Our Works
                    </div>

                    <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                        Driven By Results, Defined By{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Innovation
                        </span>
                    </h1>

                    <p className="mt-4 text-lg text-zinc-300">
                        Explore our recent projects and solutions
                    </p>
                </div>
            </section>

            {/* Tabs Section */}
            <section className="space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-white sm:text-4xl">
                        Explore Recent Works
                    </h2>
                    <p className="mt-2 text-zinc-400">
                        Filter by category to see specific projects
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-3">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
                                activeTab === tab.id
                                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25"
                                    : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {displayProjects.length > 0 ? (
                        displayProjects.map((project, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-sm transition-all hover:border-emerald-500/30"
                            >
                                {/* Project Image */}
                                <div className="relative aspect-video overflow-hidden bg-zinc-800">
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center text-6xl">
                                            {project.icon || "🎨"}
                                        </div>
                                    )}
                                    
                                    {/* Category Badge */}
                                    <div className="absolute left-3 top-3 rounded-lg bg-black/60 px-3 py-1 text-xs font-semibold text-emerald-400 backdrop-blur-sm">
                                        {project.category}
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white">
                                        {project.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Technologies */}
                                    {project.technologies && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {project.technologies.slice(0, 3).map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="rounded-lg bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className="rounded-lg bg-zinc-700/50 px-2 py-1 text-xs font-medium text-zinc-400">
                                                    +{project.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* View Project Link */}
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition-all hover:gap-3"
                                        >
                                            View Project
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </a>
                                    )}
                                </div>

                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full rounded-2xl border border-white/10 bg-zinc-900/50 p-12 text-center">
                            <p className="text-lg text-zinc-400">
                                No projects available in this category yet.
                            </p>
                        </div>
                    )}
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
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
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