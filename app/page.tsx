import Link from "next/link";
import { TypingHeadline } from "@/components/TypingHeadline";
import { WorkflowDiagram } from "@/components/WorkflowDiagram";
import { ExpertiseCards } from "../components/Expertisecards";

export default function Home() {
  const stats = [
    { value: "1+", label: "Years Experience" },
    { value: "5+", label: "Team Projects" },
    { value: "Multiple", label: "Featured Works" },
    { value: "One", label: "Optimized Stack" },
  ] as const;

  const processSteps = [
    {
      title: "Discussion & Understanding",
      desc: "Understand your idea, users, and constraints.",
    },
    {
      title: "System Architecture",
      desc: "Plan the full system and technology stack.",
    },
    {
      title: "Parallel Development",
      desc: "Build hardware, cloud, and apps together.",
    },
    {
      title: "Testing & Iteration",
      desc: "Test in real conditions and refine.",
    },
    {
      title: "Deployment & Handover",
      desc: "Deploy, document, and hand over clearly.",
    },
  ] as const;

  const processIcons = ["💬", "📐", "⚙️", "🧪", "🚀"] as const;

  const whyChoose = [
    "Clear bridge between vision and execution",
    "Budget-friendly without compromising quality",
    "Strong hardware + software integration",
    "One proven tech stack for reliability",
    "Team-based structured workflows",
    "Built for startups, institutions & industries",
  ] as const;

  const clientTypes = [
    "Startups & Innovators",
    "Educational Institutions",
    "Industrial Monitoring",
    "Research & Prototypes",
    "Custom IoT Solutions",
    "Full-Stack Development",
  ] as const;

  return (
    <div className="space-y-24">

      {/* ── Hero Section ── */}
      <section className="relative -mt-10 -mx-4 overflow-hidden border border-emerald-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/30 px-4 py-10 sm:-mx-6 sm:px-6 sm:py-16 lg:-mx-10 lg:px-10 xl:-mx-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-20 top-0 h-72 w-72 animate-pulse rounded-full bg-emerald-500/10 blur-[100px]" />
          <div className="absolute -right-20 top-1/3 h-96 w-96 animate-pulse rounded-full bg-cyan-500/10 blur-[120px] [animation-delay:1s]" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 animate-pulse rounded-full bg-emerald-400/5 blur-[100px] [animation-delay:2s]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(52, 211, 153) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(52, 211, 153) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl text-center">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Built for Practical Delivery
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.1] tracking-tight sm:text-7xl">
            <span className="bg-gradient-to-r from-white via-white to-emerald-300 bg-clip-text text-transparent">
              Bridging Ideas to Real-World Technology{" "}
            </span>
            <TypingHeadline
              className="bg-gradient-to-r from-emerald-300 to-cyan-400 bg-clip-text text-transparent"
              minWidthCh={16}
            />
          </h1>

          <p className="mt-6 mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-zinc-300 sm:text-xl">
            EcoBridges is a project-based technology team building IoT systems, web platforms,
            mobile applications, and cloud solutions using a fast, reliable, and scalable tech stack.
          </p>

          <p className="mt-4 mx-auto max-w-2xl text-base leading-relaxed text-zinc-400">
            We act as the bridge between your idea and a working, deployable product — from concept to execution.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
            >
              Let's discuss your project
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              Explore Our Services
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-white/[0.08]"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl transition-all group-hover:bg-emerald-500/10" />
                <div className="relative">
                  <div className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</div>
                  <div className="mt-2 text-xs font-medium text-zinc-400 sm:text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why EcoBridges ── */}
      <section className="space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Why Choose Us
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Why EcoBridges?
          </h2>
          <p className="max-w-3xl text-lg text-zinc-400">
            At EcoBridges, we don't just build projects — we build solutions that actually work
            in real environments. Our focus is simple: practical, scalable, and maintainable systems.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((item, idx) => (
            <div
              key={item}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-zinc-900/80"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent blur-2xl transition-all group-hover:scale-150" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-sm font-bold text-emerald-400">
                  {idx + 1}
                </div>
                <p className="text-sm leading-relaxed text-zinc-300">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

        {/* ── System Flow Visualization ── */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/90 to-zinc-900/40 p-8 backdrop-blur-sm sm:p-12">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Full-Stack Integration
          </div>
          <h3 className="text-2xl font-bold text-white sm:text-3xl">From Device to Dashboard</h3>
          <p className="mx-auto max-w-2xl text-sm text-zinc-400">
            Hardware • Firmware • API • Cloud • UI
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-5">
          {["Device", "Gateway", "API", "Cloud", "Dashboard"].map((node, idx) => (
            <div key={node} className="relative">
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-transparent text-xl font-bold text-emerald-400 backdrop-blur-sm">
                  {idx + 1}
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-white">{node}</div>
                </div>
              </div>
              {idx < 4 && (
                <div className="absolute left-[calc(50%+2rem)] top-8 hidden h-0.5 w-[calc(100%-2rem)] bg-gradient-to-r from-emerald-500/50 to-transparent sm:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── What We Build (ExpertiseCards) ── */}
      <ExpertiseCards />

    

      {/* ── How We Work (WorkflowDiagram) ── */}
      <section className="space-y-8">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Our Workflow
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            How We Work
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-zinc-400 sm:text-base">
            Five clear steps from first discussion to final deployment.
          </p>
        </div>
        <WorkflowDiagram processSteps={processSteps} processIcons={processIcons} />
      </section>


      {/* ── Who We Work With ── */}
      <section className="space-y-8">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
            Our Clients
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Who We Work With
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            We provide project-based services and product-oriented development for:
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clientTypes.map((type, idx) => (
            <div
              key={type}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 text-center backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-zinc-900/80"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 text-lg font-bold text-emerald-400">
                  {idx + 1}
                </div>
                <div className="text-sm font-semibold text-white">{type}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-emerald-950/20 to-zinc-900 p-8 backdrop-blur-sm sm:p-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <div className="relative space-y-6 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Have an Idea or Problem to Solve?
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-zinc-300">
            Whether it's an IoT system, a web platform, a mobile app, or a complete end-to-end
            solution —{" "}
            <span className="font-bold text-emerald-400">EcoBridges is ready to build it with you.</span>
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/60"
            >
              Contact EcoBridges
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}