"use client";

import {
  useInView, SectionBadge, ServiceHero, OfferingCard,
  ProcessCard, UseCaseCard, TechBadge, InquiryForm, FormCard, ServiceCTA,
} from "@/components/ServicePageShell";

const ACCENT      = "#ec4899";
const ACCENT_GRAD = "from-pink-500 to-rose-500";
const GRID_COLOR  = "rgba(236,72,153,0.7)";

const offerings = [
  { icon:"📉", title:"Data Analysis & Trend Detection", desc:"Identify patterns, anomalies, and trends from time-series sensor or operational data." },
  { icon:"⚠️", title:"Predictive Indicators",          desc:"Early fault signals and threshold models that warn before failures happen." },
  { icon:"🤖", title:"Rule-Based Automation",          desc:"Smart automation using configurable rules combined with ML-assisted triggers." },
  { icon:"📆", title:"Basic Forecasting Models",       desc:"Lightweight forecasting for consumption, demand, or system behaviour patterns." },
  { icon:"🔔", title:"Intelligent Alerts",             desc:"Context-aware notifications and recommendations based on live data conditions." },
  { icon:"📊", title:"Smart Analytics Dashboards",     desc:"Visualize insights with AI-annotated charts, summaries, and data highlights." },
];
const useCases = [
  { icon:"🔧", label:"Predictive Maintenance"       },
  { icon:"🔍", label:"Anomaly Detection"            },
  { icon:"📊", label:"Smart Analytics Dashboards"   },
  { icon:"🧭", label:"Data-Driven Decision Support" },
  { icon:"⚡", label:"Energy Optimization"          },
  { icon:"✅", label:"Quality Control Monitoring"   },
];
const process = [
  { step:"01", title:"Data Assessment",       desc:"Understand your existing data sources, format, and quality." },
  { step:"02", title:"Goal Definition",       desc:"Define what insight or automation outcome you need from the data." },
  { step:"03", title:"Model Selection",       desc:"Choose rule-based, statistical, or lightweight ML approach that fits." },
  { step:"04", title:"Integration",           desc:"Embed the intelligence layer into your existing dashboard or system." },
  { step:"05", title:"Validation & Tuning",   desc:"Test against real data, tune thresholds, minimize false positives." },
  { step:"06", title:"Handover & Monitoring", desc:"Document the model, train your team, and set up performance monitoring." },
];
const techStack = ["Python","Pandas","Scikit-learn","TensorFlow Lite","Firebase ML","Node.js","Chart.js","Recharts","REST API","FastAPI","NumPy"];

export default function AIServicePage() {
  const offerRef = useInView();
  const caseRef  = useInView();
  const procRef  = useInView();
  const techRef  = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ServiceHero
        accent={ACCENT_GRAD} accentColor={ACCENT} badge="AI-Assisted Solutions"
        badgeColor="pink" icon="🧠" gridColor={GRID_COLOR}
        title={<>Intelligent Insights from{" "}<span style={{ background:"linear-gradient(135deg,#f472b6,#ec4899,#f43f5e)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Real-Time Data</span></>}
        subtitle="We apply AI/ML techniques to enhance monitoring systems with smarter insights, predictive alerts, and intelligent automation — making your data work harder for you."
      >
        <FormCard accentColor={ACCENT}>
          <InquiryForm accentGradient={ACCENT_GRAD} accentColor={ACCENT} focusColor="#ec4899" serviceDefault="AI-Assisted Solutions" />
        </FormCard>
      </ServiceHero>

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">

        <section ref={offerRef.ref} className="space-y-10">
          <div className="space-y-3 transition-all duration-700" style={{ opacity:offerRef.visible?1:0, transform:offerRef.visible?"translateY(0)":"translateY(32px)" }}>
            <SectionBadge color="pink">What We Offer</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>Our AI Capabilities</h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>Practical AI that works with your real-world data — not just demos.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item, i) => (
              <div key={item.title} className="transition-all duration-700" style={{ opacity:offerRef.visible?1:0, transform:offerRef.visible?"translateY(0)":"translateY(28px)", transitionDelay:`${i*70}ms` }}>
                <OfferingCard {...item} accentColor={ACCENT} borderColor={ACCENT} />
              </div>
            ))}
          </div>
        </section>

        <section ref={caseRef.ref} className="space-y-10">
          <div className="space-y-3 transition-all duration-700" style={{ opacity:caseRef.visible?1:0, transform:caseRef.visible?"translateY(0)":"translateY(32px)" }}>
            <SectionBadge color="rose">Use Cases</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>Where We Apply It</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((item, i) => (
              <div key={item.label} className="transition-all duration-700" style={{ opacity:caseRef.visible?1:0, transform:caseRef.visible?"translateY(0)":"translateY(24px)", transitionDelay:`${i*60}ms` }}>
                <UseCaseCard {...item} accentColor={ACCENT} />
              </div>
            ))}
          </div>
        </section>

        <section ref={procRef.ref} className="relative overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-12 transition-all duration-700"
          style={{ opacity:procRef.visible?1:0, transform:procRef.visible?"translateY(0)":"translateY(36px)", background:"linear-gradient(135deg,#090508,#0d050a,#080408)" }}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full blur-[100px]" style={{ background:`${ACCENT}14` }} />
            <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full blur-[80px]" style={{ background:`${ACCENT}0e` }} />
          </div>
          <div className="relative space-y-3 text-center mb-10">
            <SectionBadge color="pink">Our Process</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>How We Deliver</h2>
          </div>
          <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((item, i) => (
              <div key={item.step} className="transition-all duration-700" style={{ opacity:procRef.visible?1:0, transform:procRef.visible?"translateY(0)":"translateY(24px)", transitionDelay:`${i*80}ms` }}>
                <ProcessCard {...item} accentColor={ACCENT} />
              </div>
            ))}
          </div>
        </section>

        <section ref={techRef.ref} className="space-y-6 transition-all duration-700" style={{ opacity:techRef.visible?1:0, transform:techRef.visible?"translateY(0)":"translateY(28px)" }}>
          <SectionBadge color="pink">Technologies</SectionBadge>
          <h2 className="font-bold text-white text-2xl" style={{ fontFamily:"var(--font-display)" }}>Technologies We Use</h2>
          <div className="flex flex-wrap gap-3">{techStack.map(t => <TechBadge key={t} label={t} accentColor={ACCENT} />)}</div>
        </section>

        <ServiceCTA accentGradient={ACCENT_GRAD} accentColor={ACCENT}
          title="Ready to Add Intelligence to Your System?"
          subtitle="Let's analyze your data and build the AI layer that makes it actionable — smarter alerts, better decisions, less downtime."
          ctaText="Start the Conversation" />
      </div>
    </div>
  );
}