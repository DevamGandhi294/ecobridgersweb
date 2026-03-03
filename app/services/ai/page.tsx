"use client";

import Link from "next/link";
import { useState } from "react";

const offerings = [
  { icon: "📉", title: "Data Analysis & Trend Detection", desc: "Identify patterns, anomalies, and trends from time-series sensor or operational data." },
  { icon: "⚠️", title: "Predictive Indicators", desc: "Early fault signals and threshold models that warn before failures happen." },
  { icon: "🤖", title: "Rule-Based Automation", desc: "Smart automation using configurable rules combined with ML-assisted triggers." },
  { icon: "📆", title: "Basic Forecasting Models", desc: "Lightweight forecasting for consumption, demand, or system behaviour." },
  { icon: "🔔", title: "Intelligent Alerts", desc: "Context-aware notifications and recommendations based on data conditions." },
  { icon: "📊", title: "Smart Analytics Dashboards", desc: "Visualize insights with AI-annotated charts, summaries, and data highlights." },
];

const useCases = [
  { label: "Predictive Maintenance", icon: "🔧" },
  { label: "Anomaly Detection", icon: "🔍" },
  { label: "Smart Analytics Dashboards", icon: "📊" },
  { label: "Data-Driven Decision Support", icon: "🧭" },
  { label: "Energy Optimization", icon: "⚡" },
  { label: "Quality Control Monitoring", icon: "✅" },
];

const process = [
  { step: "01", title: "Data Assessment", desc: "Understand your existing data sources, format, and quality." },
  { step: "02", title: "Goal Definition", desc: "Define what insight or automation outcome you need from the data." },
  { step: "03", title: "Model Selection", desc: "Choose rule-based, statistical, or lightweight ML approach that fits your data." },
  { step: "04", title: "Integration", desc: "Embed the intelligence layer into your existing dashboard or system." },
  { step: "05", title: "Validation & Tuning", desc: "Test against real data, tune thresholds, and minimize false positives." },
  { step: "06", title: "Handover & Monitoring", desc: "Document the model, train your team, and set up performance monitoring." },
];

const techStack = ["Python", "Pandas", "Scikit-learn", "TensorFlow Lite", "Firebase ML", "Node.js", "Chart.js", "Recharts", "REST API"];

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
        <input type="text" placeholder="Full Name *" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30" />
        <input type="email" placeholder="Email Address *" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input type="tel" placeholder="Phone Number" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30" />
        <input type="text" placeholder="Company Name" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30" />
      </div>
      <select className="w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-zinc-300 backdrop-blur-sm transition-all focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30">
        <option value="">Select Service *</option>
        <option>IoT & Embedded Systems</option>
        <option>Web & Cloud Platforms</option>
        <option>Mobile Applications</option>
        <option>AI-Assisted Solutions</option>
        <option>Prototyping & POC</option>
        <option>Industrial & Custom Solutions</option>
      </select>
      <textarea rows={4} placeholder="Describe your project or requirements *" className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-pink-500/50 focus:outline-none focus:ring-1 focus:ring-pink-500/30" />
      <button onClick={() => setSubmitted(true)} className={`w-full rounded-xl bg-gradient-to-r ${accent} py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]`}>
        Submit Request →
      </button>
    </div>
  );
}

export default function AIServicePage() {
  return (
    <div className="space-y-20">

      <section className="relative overflow-hidden rounded-3xl border border-pink-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-pink-950/30">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-20 top-0 h-80 w-80 animate-pulse rounded-full bg-pink-500/10 blur-[120px]" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 animate-pulse rounded-full bg-rose-500/10 blur-[120px] [animation-delay:1s]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(to right, rgb(236,72,153) 1px, transparent 1px), linear-gradient(to bottom, rgb(236,72,153) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>
        <div className="relative grid gap-0 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-pink-500/20 bg-pink-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-400">AI-Assisted Solutions</div>
            <div className="mt-6 text-7xl">🧠</div>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Intelligent Insights from{" "}
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">Real-Time Data</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-400">
              We apply AI/ML techniques to enhance monitoring systems with smarter insights, predictive alerts, and intelligent automation — making your data work harder for you.
            </p>
            <div className="mt-8">
              <Link href="/services" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">All Services</Link>
            </div>
          </div>
          <div className="border-t border-white/10 bg-zinc-900/60 p-8 backdrop-blur-sm sm:p-10 lg:border-l lg:border-t-0 lg:rounded-r-3xl">
            <h2 className="mb-1 text-xl font-bold text-white">Request a Free Quote</h2>
            <p className="mb-6 text-sm text-zinc-400">Tell us about your project — we'll respond within 24 hours.</p>
            <InquiryForm accent="from-pink-500 to-rose-500" />
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg border border-pink-500/20 bg-pink-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-400">What We Offer</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Our AI Capabilities</h2>
          <p className="max-w-2xl text-zinc-400">Practical AI that works with your real-world data — not just demos.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((item) => (
            <div key={item.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm transition-all hover:border-pink-500/30 hover:bg-zinc-900/90">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-pink-500/5 blur-2xl transition-all group-hover:bg-pink-500/15" />
              <div className="relative">
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-400">Use Cases</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Where We Apply It</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => (
            <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/50 p-5 backdrop-blur-sm transition-all hover:border-pink-500/20">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 text-2xl">{item.icon}</div>
              <span className="text-sm font-semibold text-zinc-200">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-pink-950/20 p-8 backdrop-blur-sm sm:p-12">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg border border-pink-500/20 bg-pink-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-400">Our Process</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">How We Deliver</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((item) => (
            <div key={item.step} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-pink-500/30 hover:bg-white/[0.06]">
              <div className="text-5xl font-black text-pink-500/10 transition-all group-hover:text-pink-500/20">{item.step}</div>
              <h3 className="mt-2 text-base font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Technologies We Use</h2>
        <div className="flex flex-wrap gap-3">
          {techStack.map((tech) => (
            <span key={tech} className="rounded-xl border border-pink-500/20 bg-pink-500/5 px-4 py-2 text-sm font-semibold text-pink-300 backdrop-blur-sm">{tech}</span>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-pink-950/20 to-zinc-900 p-8 text-center sm:p-16">
        <div className="pointer-events-none absolute inset-0"><div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-pink-500/10 blur-[120px]" /><div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-rose-500/10 blur-[120px]" /></div>
        <div className="relative space-y-5">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Add Intelligence to Your System?</h2>
          <p className="mx-auto max-w-2xl text-zinc-300">Let's analyze your data and build the AI layer that makes it actionable.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-pink-500/25 transition-all hover:shadow-pink-500/40">
            Get in Touch
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </Link>
        </div>
      </section>

    </div>
  );
}