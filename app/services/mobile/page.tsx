"use client";

import Link from "next/link";
import { useState } from "react";

const offerings = [
  { icon: "📱", title: "Cross-Platform Apps", desc: "Single codebase for Android & iOS using Flutter — native performance, half the time." },
  { icon: "🎛️", title: "Real-Time Device Control", desc: "Control IoT hardware and systems directly from your mobile device." },
  { icon: "📊", title: "Live Data Monitoring", desc: "Real-time dashboards, live charts, and push notifications for critical alerts." },
  { icon: "🔐", title: "Secure Authentication", desc: "Email, Google, OTP-based login with role-based access control." },
  { icon: "🔗", title: "IoT & Cloud Integration", desc: "Seamless connection to your cloud backend, MQTT brokers, and REST APIs." },
  { icon: "🎨", title: "Clean UI/UX Design", desc: "Intuitive, beautiful interfaces that are easy to use for any user type." },
];

const useCases = [
  { label: "IoT Control Apps", icon: "🔌" },
  { label: "Monitoring & Alert Systems", icon: "🔔" },
  { label: "Industrial Companion Apps", icon: "🏭" },
  { label: "Custom Business Apps", icon: "💼" },
  { label: "Field Operations Apps", icon: "🗺️" },
  { label: "Data Collection Apps", icon: "📋" },
];

const process = [
  { step: "01", title: "UX Planning", desc: "Map user journeys, screens, and interaction flows before writing code." },
  { step: "02", title: "UI Design", desc: "Design pixel-perfect screens with your brand identity and color system." },
  { step: "03", title: "App Development", desc: "Build with Flutter — clean code, reusable components, and state management." },
  { step: "04", title: "Backend Integration", desc: "Connect to your cloud, IoT backend, or existing APIs." },
  { step: "05", title: "Testing", desc: "Test on real devices for both Android and iOS before release." },
  { step: "06", title: "Deployment & Support", desc: "Publish to Play Store / App Store and hand over with documentation." },
];

const techStack = ["Flutter", "Dart", "Firebase", "REST API", "MQTT", "Provider", "Riverpod", "Google Play", "App Store"];

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
        <input type="text" placeholder="Full Name *" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30" />
        <input type="email" placeholder="Email Address *" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input type="tel" placeholder="Phone Number" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30" />
        <input type="text" placeholder="Company Name" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30" />
      </div>
      <select className="w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-zinc-300 backdrop-blur-sm transition-all focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30">
        <option value="">Select Service *</option>
        <option>IoT & Embedded Systems</option>
        <option>Web & Cloud Platforms</option>
        <option>Mobile Applications</option>
        <option>AI-Assisted Solutions</option>
        <option>Prototyping & POC</option>
        <option>Industrial & Custom Solutions</option>
      </select>
      <textarea rows={4} placeholder="Describe your project or requirements *" className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30" />
      <button onClick={() => setSubmitted(true)} className={`w-full rounded-xl bg-gradient-to-r ${accent} py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]`}>
        Submit Request →
      </button>
    </div>
  );
}

export default function MobileServicePage() {
  return (
    <div className="space-y-20">

      <section className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-violet-950/30">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-20 top-0 h-80 w-80 animate-pulse rounded-full bg-violet-500/10 blur-[120px]" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 animate-pulse rounded-full bg-purple-500/10 blur-[120px] [animation-delay:1s]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(to right, rgb(139,92,246) 1px, transparent 1px), linear-gradient(to bottom, rgb(139,92,246) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>
        <div className="relative grid gap-0 lg:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-violet-500/20 bg-violet-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-400">Mobile Applications</div>
            <div className="mt-6 text-7xl">📱</div>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Smart Apps That Connect{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Users to Systems</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-400">
              We develop cross-platform mobile applications that allow users to monitor, control, and analyze systems in real time — tightly integrated with IoT and cloud backends.
            </p>
            <div className="mt-8">
              <Link href="/services" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">All Services</Link>
            </div>
          </div>
          <div className="border-t border-white/10 bg-zinc-900/60 p-8 backdrop-blur-sm sm:p-10 lg:border-l lg:border-t-0 lg:rounded-r-3xl">
            <h2 className="mb-1 text-xl font-bold text-white">Request a Free Quote</h2>
            <p className="mb-6 text-sm text-zinc-400">Tell us about your project — we'll respond within 24 hours.</p>
            <InquiryForm accent="from-violet-500 to-purple-500" />
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg border border-violet-500/20 bg-violet-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-400">What We Offer</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Our Mobile Capabilities</h2>
          <p className="max-w-2xl text-zinc-400">From design to deployment — complete cross-platform app development.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((item) => (
            <div key={item.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm transition-all hover:border-violet-500/30 hover:bg-zinc-900/90">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-500/5 blur-2xl transition-all group-hover:bg-violet-500/15" />
              <div className="relative">
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-400">Use Cases</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Where We Apply It</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => (
            <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/50 p-5 backdrop-blur-sm transition-all hover:border-violet-500/20">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 text-2xl">{item.icon}</div>
              <span className="text-sm font-semibold text-zinc-200">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-violet-950/20 p-8 backdrop-blur-sm sm:p-12">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg border border-violet-500/20 bg-violet-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-400">Our Process</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">How We Deliver</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((item) => (
            <div key={item.step} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-violet-500/30 hover:bg-white/[0.06]">
              <div className="text-5xl font-black text-violet-500/10 transition-all group-hover:text-violet-500/20">{item.step}</div>
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
            <span key={tech} className="rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-2 text-sm font-semibold text-violet-300 backdrop-blur-sm">{tech}</span>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-violet-950/20 to-zinc-900 p-8 text-center sm:p-16">
        <div className="pointer-events-none absolute inset-0"><div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[120px]" /><div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px]" /></div>
        <div className="relative space-y-5">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Build Your App?</h2>
          <p className="mx-auto max-w-2xl text-zinc-300">Android, iOS, or both — let's design and build your mobile app from scratch.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-violet-500/40">
            Get in Touch
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </Link>
        </div>
      </section>

    </div>
  );
}