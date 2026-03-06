"use client";

import {
  useInView, SectionBadge, ServiceHero, OfferingCard,
  ProcessCard, UseCaseCard, TechBadge, InquiryForm, FormCard, ServiceCTA,
} from "@/components/ServicePageShell";

const ACCENT      = "#06b6d4";
const ACCENT_GRAD = "from-cyan-500 to-blue-600";
const GRID_COLOR  = "rgba(6,182,212,0.7)";

const offerings = [
  { icon:"📊", title:"Admin Dashboards",          desc:"Custom control panels for managing devices, users, and live data in real time." },
  { icon:"📈", title:"Real-Time Visualization",   desc:"Live charts, graphs, and data feeds powered by WebSockets and streaming APIs." },
  { icon:"☁️", title:"Cloud Backend Architecture",desc:"Scalable, secure server infrastructure using Firebase, Node.js, and SQL databases." },
  { icon:"🔗", title:"REST & Realtime APIs",      desc:"Clean API design for integrating with IoT devices, mobile apps, and third parties." },
  { icon:"🗄️", title:"Database Design",           desc:"Optimized schema design for Firebase, PostgreSQL, MySQL and time-series data." },
  { icon:"🔐", title:"Auth & Role Management",    desc:"Secure login, multi-role access control, and session management built in." },
];
const useCases = [
  { icon:"📡", label:"IoT Monitoring Dashboards"   },
  { icon:"📋", label:"Data Logging & Reporting"    },
  { icon:"🖥️", label:"Admin Control Panels"        },
  { icon:"🗂️", label:"Management Portals"          },
  { icon:"🏢", label:"Multi-Tenant SaaS Platforms" },
  { icon:"⚙️", label:"API-First Backends"          },
];
const process = [
  { step:"01", title:"Discovery & Scoping",   desc:"Define user roles, data flows, and platform requirements." },
  { step:"02", title:"Architecture Design",   desc:"Plan the tech stack, database schema, and API structure." },
  { step:"03", title:"Backend Development",   desc:"Build APIs, business logic, authentication and database layer." },
  { step:"04", title:"Frontend Development",  desc:"Build responsive dashboards and UI with Next.js / React." },
  { step:"05", title:"Integration & Testing", desc:"Connect all parts — IoT feeds, mobile apps, third-party services." },
  { step:"06", title:"Deployment & Handover", desc:"Deploy to cloud, set up monitoring, document everything." },
];
const techStack = ["Next.js","React","Node.js","Firebase","PostgreSQL","MySQL","REST API","WebSockets","Tailwind CSS","Vercel","Docker","TypeScript"];

export default function WebServicePage() {
  const offerRef = useInView();
  const caseRef  = useInView();
  const procRef  = useInView();
  const techRef  = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ServiceHero
        accent={ACCENT_GRAD} accentColor={ACCENT} badge="Web & Cloud Platforms"
        badgeColor="cyan" icon="🌐" gridColor={GRID_COLOR}
        title={<>Scalable Platforms for{" "}<span style={{ background:"linear-gradient(135deg,#22d3ee,#06b6d4,#3b82f6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Control & Analytics</span></>}
        subtitle="We build secure and scalable web platforms that act as the control center for IoT systems and applications — from real-time dashboards to full cloud backends."
      >
        <FormCard accentColor={ACCENT}>
          <InquiryForm accentGradient={ACCENT_GRAD} accentColor={ACCENT} focusColor="#06b6d4" serviceDefault="Web & Cloud Platforms" />
        </FormCard>
      </ServiceHero>

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">

        <section ref={offerRef.ref} className="space-y-10">
          <div className="space-y-3 transition-all duration-700" style={{ opacity:offerRef.visible?1:0, transform:offerRef.visible?"translateY(0)":"translateY(32px)" }}>
            <SectionBadge color="cyan">What We Offer</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>Our Web &amp; Cloud Capabilities</h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>Full-stack web development from database to dashboard.</p>
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
            <SectionBadge color="blue">Use Cases</SectionBadge>
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
          style={{ opacity:procRef.visible?1:0, transform:procRef.visible?"translateY(0)":"translateY(36px)", background:"linear-gradient(135deg,#050709,#060b10,#040810)" }}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full blur-[100px]" style={{ background:`${ACCENT}14` }} />
            <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full blur-[80px]" style={{ background:`${ACCENT}0e` }} />
          </div>
          <div className="relative space-y-3 text-center mb-10">
            <SectionBadge color="cyan">Our Process</SectionBadge>
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
          <SectionBadge color="cyan">Technologies</SectionBadge>
          <h2 className="font-bold text-white text-2xl" style={{ fontFamily:"var(--font-display)" }}>Technologies We Use</h2>
          <div className="flex flex-wrap gap-3">{techStack.map(t => <TechBadge key={t} label={t} accentColor={ACCENT} />)}</div>
        </section>

        <ServiceCTA accentGradient={ACCENT_GRAD} accentColor={ACCENT}
          title="Ready to Build Your Platform?"
          subtitle="From dashboard to deployment — let's build your web platform together. Reliable, scalable, beautifully designed."
          ctaText="Start the Conversation" />
      </div>
    </div>
  );
}