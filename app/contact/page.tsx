import Link from "next/link";
import type { Metadata } from 'next'
import { Mail, Smartphone, Globe } from "lucide-react";

export const metadata: Metadata = {
    alternates: {
        canonical: 'https://www.ecobridgers.com/contact',
    },
    title: 'Contact EcoBridgers — Start Your Project',
    description: 'Tell us what you\'re building. We respond within 24 hours. IoT, web, mobile, and cloud development from Surat, India.',
}

export default function ContactPage() {
    const contactMethods = [
        {
            Icon: Mail,
            title: "Email",
            value: "ecobridgers.tech@gmail.com",
            description: "For project inquiries",
            action: "mailto:ecobridgers.tech@gmail.com",
            actionText: "Send Email",
        },
        {
            Icon: Smartphone,
            title: "WhatsApp",
            value: "+91 7862949437",
            description: "Quick responses",
            action: "https://wa.me/917862949437",
            actionText: "Chat on WhatsApp",
        },
        {
            Icon: Globe,
            title: "Location",
            value: "India",
            description: "Remote work available",
            action: null,
            actionText: null,
        },
    ] as const;

    const projectTypes = [
        "IoT System",
        "Web Application",
        "Mobile Application",
        "Prototype / POC",
        "Full-Stack Solution",
        "Other",
    ] as const;

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white pl-6 pr-2 py-6 shadow-sm sm:pl-16 sm:pr-6 sm:py-8 lg:pl-24 lg:pr-8 lg:py-10">
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="absolute -left-20 top-0 h-72 w-72 animate-pulse rounded-full bg-emerald-500/20 blur-[100px]" />
                    <div className="absolute -right-20 bottom-0 h-72 w-72 animate-pulse rounded-full bg-cyan-500/20 blur-[100px] [animation-delay:1s]" />
                </div>

                <div className="relative grid items-center gap-12 lg:grid-cols-2">
                    {/* Left: Text Content */}
                    <div className="space-y-15 text-center lg:text-left animate-fade-right">
                        <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
                            Let's Build Something<br className="hidden sm:block" />
                            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                                Together
                            </span>
                        </h1>
                        <p className="text-lg text-zinc-600">
                            Have a project idea? Get in touch with us.
                        </p>
                    </div>

                    {/* Right: 3D Mobile Image */}
                    <div className="flex justify-center lg:justify-end translate-x-8 sm:translate-x-12 lg:translate-x-0">
                        <img
                            src="/download.webp"
                            alt="3D Mobile App Render"
                            className="w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] drop-shadow-[0_20px_40px_rgba(52,211,153,0.25)] animate-float"
                        />
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="mx-auto max-w-5xl">
                <div className="grid gap-6 md:grid-cols-3">
                    {contactMethods.map((method) => (
                        <div
                            key={method.title}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 p-6 backdrop-blur-sm transition-all hover:border-emerald-500/30"
                        >
                            <div className="absolute -right-8 -top-8 text-zinc-500 opacity-5 transition-all duration-500 group-hover:scale-110 group-hover:opacity-10">
                                <method.Icon className="h-40 w-40" strokeWidth={1} />
                            </div>

                            <div className="relative">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.1)]">
                                    <method.Icon className="h-6 w-6" strokeWidth={2} />
                                </div>
                                <h3 className="text-lg font-bold text-white">{method.title}</h3>
                                <p className="mt-2 text-base font-medium text-emerald-400">{method.value}</p>
                                <p className="mt-2 text-sm text-zinc-400">{method.description}</p>

                                {method.action && (
                                    <a
                                        href={method.action}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 backdrop-blur-sm transition-all hover:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                                    >
                                        {method.actionText}
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                )}
                            </div>

                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Form */}
            <section className="mx-auto max-w-4xl">
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 p-8 backdrop-blur-sm">
                    <h2 className="text-2xl font-bold text-white">
                        Send Us a Message
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400">
                        Fill out the form and we'll get back to you soon
                    </p>

                    <form className="mt-6 space-y-5">
                        {/* Name and Email Row */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className="grid gap-2">
                                <span className="text-sm font-medium text-zinc-300">Full Name *</span>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-emerald-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/20"
                                    placeholder="Your name"
                                />
                            </label>

                            <label className="grid gap-2">
                                <span className="text-sm font-medium text-zinc-300">Email Address *</span>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-emerald-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/20"
                                    placeholder="you@company.com"
                                />
                            </label>
                        </div>

                        {/* Contact Number */}
                        <label className="grid gap-2">
                            <span className="text-sm font-medium text-zinc-300">Contact Number</span>
                            <input
                                type="tel"
                                name="phone"
                                className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-emerald-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="+91 1234567890"
                            />
                        </label>

                        {/* Project Type */}
                        <label className="grid gap-2">
                            <span className="text-sm font-medium text-zinc-300">Project Type *</span>
                            <select
                                name="projectType"
                                required
                                className="h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-all focus:border-emerald-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/20"
                            >
                                <option value="" className="bg-zinc-900">Select project type</option>
                                {projectTypes.map((type) => (
                                    <option key={type} value={type} className="bg-zinc-900">
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </label>

                        {/* Project Description */}
                        <label className="grid gap-2">
                            <span className="text-sm font-medium text-zinc-300">Project Description *</span>
                            <textarea
                                name="description"
                                rows={5}
                                required
                                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-emerald-500/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/20"
                                placeholder="Tell us about your project..."
                            />
                        </label>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
                            >
                                Send Message
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
