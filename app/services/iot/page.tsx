"use client";

import Link from "next/link";
import { useState } from "react";

const offerings = [
  { icon: "🌡️", title: "Sensor Integration", desc: "Temperature, vibration, energy, motion, humidity and more — wired or wireless." },
  { icon: "🖥️", title: "Microcontroller Systems", desc: "ESP32, ESP8266, Arduino, Raspberry Pi firmware design and programming." },
  { icon: "📡", title: "Wireless Communication", desc: "Wi-Fi, GSM, LoRa, MQTT, Bluetooth — choose the right protocol for your use case." },
  { icon: "⚡", title: "Real-Time Monitoring", desc: "Live data acquisition, threshold alerts, and automated control loops." },
  { icon: "🧩", title: "Edge Processing", desc: "Local decision-making and pre-processing at the device level to reduce latency." },
  { icon: "☁️", title: "Cloud Connectivity", desc: "Secure, encrypted data pipelines from device to cloud dashboard." },
];

const useCases = [
  { label: "Smart Monitoring Systems", icon: "📊" },
  { label: "Automation & Control", icon: "⚙️" },
  { label: "Industrial Equipment Monitoring", icon: "🏭" },
  { label: "Environmental Monitoring", icon: "🌿" },
  { label: "Infrastructure Sensing", icon: "🏗️" },
  { label: "Research & Prototypes", icon: "🔬" },
];

const process = [
  { step: "01", title: "Requirement Gathering", desc: "Understand your environment, sensors needed, and data goals." },
  { step: "02", title: "System Architecture", desc: "Design the full hardware-to-cloud architecture and communication stack." },
  { step: "03", title: "Hardware Prototyping", desc: "Build and test the physical device with real sensor data." },
  { step: "04", title: "Firmware Development", desc: "Write reliable embedded code with error handling and OTA support." },
  { step: "05", title: "Cloud Integration", desc: "Connect device data to your dashboard, API, or storage backend." },
  { step: "06", title: "Deployment & Handover", desc: "Deploy on-site, document everything, and train your team." },
];

const techStack = ["ESP32", "ESP8266", "Arduino", "Raspberry Pi", "MQTT", "LoRa", "Firebase", "Node.js", "Python", "C/C++"];

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
        <input
          type="text"
          placeholder="Full Name *"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
        />
        <input
          type="email"
          placeholder="Email Address *"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
        />
        <input
          type="text"
          placeholder="Company Name"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
        />
      </div>
      <select className="w-full rounded-xl border border-white/10 bg-zinc-800 px-4 py-3 text-sm text-zinc-300 backdrop-blur-sm transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30">
        <option value="">Select Service *</option>
        <option>IoT & Embedded Systems</option>
        <option>Web & Cloud Platforms</option>
        <option>Mobile Applications</option>
        <option>AI-Assisted Solutions</option>
        <option>Prototyping & POC</option>
        <option>Industrial & Custom Solutions</option>
      </select>
      <textarea
        rows={4}
        placeholder="Describe your project or requirements *"
        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 backdrop-blur-sm transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
      />
      <button
        onClick={() => setSubmitted(true)}
        className={`w-full rounded-xl bg-gradient-to-r ${accent} py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]`}
      >
        Submit Request →
      </button>
    </div>
  );
}

export default function IoTServicePage() {
  return (
    <div className="space-y-20">

      {/* ── Hero with Inquiry Form ── */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/30">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-20 top-0 h-80 w-80 animate-pulse rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 animate-pulse rounded-full bg-teal-500/10 blur-[120px] [animation-delay:1s]" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(to right, rgb(52,211,153) 1px, transparent 1px), linear-gradient(to bottom, rgb(52,211,153) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative grid gap-0 lg:grid-cols-2">
          {/* Left — Service Info */}
          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              IoT & Embedded Systems
            </div>
            <div className="mt-6 text-7xl">🔌</div>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Smart Hardware Integrated with{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Cloud Intelligence
              </span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-400">
              We design and develop complete IoT systems — from sensor-level integration to real-time cloud monitoring. Whether you need a simple sensor node or a full industrial automation setup, EcoBridges builds it reliably.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/services" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10">
                All Services
              </Link>
            </div>
          </div>

          {/* Right — Inquiry Form */}
          <div className="border-t border-white/10 bg-zinc-900/60 p-8 backdrop-blur-sm sm:p-10 lg:border-l lg:border-t-0 lg:rounded-r-3xl">
            <h2 className="mb-1 text-xl font-bold text-white">Request a Free Quote</h2>
            <p className="mb-6 text-sm text-zinc-400">Tell us about your project — we'll respond within 24 hours.</p>
            <InquiryForm accent="from-emerald-500 to-teal-500" />
          </div>
        </div>
      </section>

      {/* ── What We Offer ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">What We Offer</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Our IoT Capabilities</h2>
          <p className="max-w-2xl text-zinc-400">End-to-end embedded and IoT development — from the chip to the cloud.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((item) => (
            <div key={item.title} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-zinc-900/90">
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl transition-all group-hover:bg-emerald-500/15" />
              <div className="relative">
                <div className="text-3xl">{item.icon}</div>
                <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg border border-teal-500/20 bg-teal-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-400">Use Cases</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Where We Apply It</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item) => (
            <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/50 p-5 backdrop-blur-sm transition-all hover:border-emerald-500/20">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 text-2xl">{item.icon}</div>
              <span className="text-sm font-semibold text-zinc-200">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-emerald-950/20 p-8 backdrop-blur-sm sm:p-12">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">Our Process</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">How We Deliver</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((item) => (
            <div key={item.step} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-emerald-500/30 hover:bg-white/[0.06]">
              <div className="text-5xl font-black text-emerald-500/10 transition-all group-hover:text-emerald-500/20">{item.step}</div>
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
            <span key={tech} className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-sm font-semibold text-emerald-300 backdrop-blur-sm">{tech}</span>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-emerald-950/20 to-zinc-900 p-8 text-center sm:p-16">
        <div className="pointer-events-none absolute inset-0"><div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" /><div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-teal-500/10 blur-[120px]" /></div>
        <div className="relative space-y-5">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Build Your IoT System?</h2>
          <p className="mx-auto max-w-2xl text-zinc-300">Tell us your idea and we'll design the full system — hardware, firmware, cloud, and dashboard.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40">
            Get in Touch
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </Link>
        </div>
      </section>

    </div>
  );
}