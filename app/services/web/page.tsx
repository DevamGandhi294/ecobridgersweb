"use client";

import Link from "next/link";
import { useState } from "react";

const offerings = [
  { icon: "📊", title: "Admin Dashboards", desc: "Custom control panels for managing devices, users, and data in real time." },
  { icon: "📈", title: "Real-Time Visualization", desc: "Live charts, graphs, and data feeds powered by WebSockets and streaming APIs." },
  { icon: "☁️", title: "Cloud Backend Architecture", desc: "Scalable, secure server infrastructure using Firebase, Node.js, and SQL databases." },
  { icon: "🔗", title: "REST & Realtime APIs", desc: "Clean API design for integrating with IoT devices, mobile apps, and third parties." },
  { icon: "🗄️", title: "Database Design", desc: "Optimized schema design for Firebase, PostgreSQL, MySQL and time-series data." },
  { icon: "🔐", title: "Auth & Role Management", desc: "Secure login, multi-role access control, and session management." },
];

const useCases = [
  { label: "IoT Monitoring Dashboards", icon: "📡" },
  { label: "Data Logging & Reporting", icon: "📋" },
  { label: "Admin Control Panels", icon: "🖥️" },
  { label: "Management Portals", icon: "🗂️" },
  { label: "Multi-Tenant SaaS Platforms", icon: "🏢" },
  { label: "API-First Backends", icon: "⚙️" },
];

const process = [
  { step: "01", title: "Discovery & Scoping", desc: "Define user roles, data flows, and platform requirements." },
  { step: "02", title: "Architecture Design", desc: "Plan the tech stack, database schema, and API structure." },
  { step: "03", title: "Backend Development", desc: "Build APIs, business logic, authentication and database layer." },
  { step: "04", title: "Frontend Development", desc: "Build responsive dashboards and UI with Next.js / React." },
  { step: "05", title: "Integration & Testing", desc: "Connect all parts — IoT feeds, mobile apps, third-party services." },
  { step: "06", title: "Deployment & Handover", desc: "Deploy to cloud, set up monitoring, document everything." },
];

const techStack = ["Next.js", "React", "Node.js", "Firebase", "PostgreSQL", "MySQL", "REST API", "WebSockets", "Tailwind CSS", "Vercel", "Docker"];

function InquiryForm({ accent }: { accent: string }) {
  const [submitted, setSubmitted] = useState(false);
  return submitted ? (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="text-5xl">✅</div>
      <h3 className="text-xl font-bold text-white">Request Sent!</h3>
      <p className="text-sm text-zinc-400">We'll get back to you within 24 hours.</p>
    </div>
  ) : (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <input type="text" placeholder="Full Name *" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30" />
        <input type="email" placeholder="Email Address *" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input type="tel" placeholder="Phone Number" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30" />
        <input type="text" placeholder="Company Name" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30" />
      </div>
      <select className="w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-zinc-300 backdrop-blur-sm transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30">
        <option value="">Select Service *</option>
        <option>IoT & Embedded Systems</option>
        <option>Web & Cloud Platforms</option>
        <option>Mobile Applications</option>
        <option>AI-Assisted Solutions</option>
        <option>Prototyping & POC</option>
        <option>Industrial & Custom Solutions</option>
      </select>
      <textarea rows={4} placeholder="Describe your project or requirements *" className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30" />
      <button onClick={() => setSubmitted(true)} className={`w-full rounded-xl bg-gradient-to-r ${accent} py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]`}>
        Submit Request →
      </button>
    </div>
  );
}

export default function WebServicePage() {
  return (
    <div className="space-y-20">

      {/* ── Hero with Inquiry Form ── */}
      <section className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-cyan-950/30">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-20 top-0 h-80 w-80 animate-pulse rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 animate-pulse rounded-full bg-blue-500/10 blur-[120px] [animation-delay:1s]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(to right, rgb(6,182,212) 1px, transparent 1px), linear-gradient(to bottom, rgb(6,182,212) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>
        <div className="relative grid gap-0 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">Web & Cloud Platforms</div>
            <div className="mt-6 text-7xl">🌐</div>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Scalable Platforms for{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Monitoring, Control & Analytics</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-400">
              We build secure and scalable web platforms that act as the control center for IoT systems and software applications — from real-time dashboards to full cloud backends.
            </p>
            <div className="mt-8">
              <Link href="/services" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">All Services</Link>
            </div>
          </div>
          <div className="border-t border-white/10 bg-zinc-900/60 p-8 backdrop-blur-sm sm:p-10 lg:border-l lg:border-t-0 lg:rounded-r-3xl">
            <h2 className="mb-1 text-xl font-bold text-white">Request a Free Quote</h2>
            <p className="mb-6 text-sm text-zinc-400">Tell us about your project — we'll respond within 24 hours.</p>
            <InquiryForm accent="from-cyan-500 to-blue-600" />
          </div>
        </div>
      </section>

      {/* ── What We Offer ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">What We Offer</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Web & Cloud Capabilities</h2>
          <p className="max-w-2xl text-zinc-400">Full-stack web development from database to dashboard.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((item) => (
            <div key={item.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-zinc-900/90">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-500/5 blur-2xl transition-all group-hover:bg-cyan-500/15" />
              <div className="relative">
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400">Use Cases</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Where We Apply It</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => (
            <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/50 p-5 backdrop-blur-sm transition-all hover:border-cyan-500/20">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 text-2xl">{item.icon}</div>
              <span className="text-sm font-semibold text-zinc-200">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-cyan-950/20 p-8 backdrop-blur-sm sm:p-12">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">Our Process</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">How We Deliver</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((item) => (
            <div key={item.step} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-cyan-500/30 hover:bg-white/[0.06]">
              <div className="text-5xl font-black text-cyan-500/10 transition-all group-hover:text-cyan-500/20">{item.step}</div>
              <h3 className="mt-2 text-base font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Technologies We Use</h2>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech) => (
            <span key={tech} className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-sm">{tech}</span>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-cyan-950/20 to-zinc-900 p-8 text-center sm:p-16">
        <div className="pointer-events-none absolute inset-0"><div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" /><div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" /></div>
        <div className="relative space-y-5">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Build Your Platform?</h2>
          <p className="mx-auto max-w-2xl text-zinc-300">From dashboard to deployment — let's build your web platform together.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40">
            Get in Touch
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </Link>
        </div>
      </section>

    </div>
  );
}