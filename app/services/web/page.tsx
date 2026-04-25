"use client";

import {
  useInView, SectionBadge, OfferShowcaseCard, PlatformBenefitsGrid,
  CreationProcessTimeline, TechMarquee, ServiceCTA,
} from "@/components/ServicePageShell";
import { ScrollToggleHero } from "@/components/ScrollToggleHero";

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
  { icon:"📡", label:"IoT Monitoring Dashboards",   desc: "Unify hundreds of edge device streams into a sleek, real-time command center." },
  { icon:"📋", label:"Data Logging & Reporting",    desc: "Export automated pdf/csv compliance reports mapped directly from raw databases." },
  { icon:"🖥️", label:"Admin Control Panels",        desc: "Granular UI panels for configuring fleets, remote updates, and alarm limits." },
  { icon:"🗂️", label:"Management Portals",          desc: "Secure internal apps handling deep hierarchical business and operational structures." },
  { icon:"🏢", label:"Multi-Tenant SaaS Platforms", desc: "Partition architecture securely so clients only access their own slice of the network." },
  { icon:"⚙️", label:"API-First Backends",          desc: "Headless servers designed aggressively for raw low-latency data consumption." },
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

const platformBenefits = useCases.map((u) => ({ title: u.label, desc: u.desc }));

export default function WebServicePage() {
  const offerRef = useInView();
  const caseRef  = useInView();
  const procRef  = useInView();
  const techRef  = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ScrollToggleHero
        accentGradient={ACCENT_GRAD}
        accentColor={ACCENT}
        badge="Web & Cloud Platforms"
        badgeColor="cyan"
        icon="🌐"
        gridColor={GRID_COLOR}
        pretitle1="Control your devices"
        title1={<>Scalable<br/>Platforms</>}
        subtitle1="We build secure and scalable web platforms that act as the control center for IoT systems and applications."
        pretitle2="Actionable insights"
        title2={<>Control &<br/>Analytics</>}
        subtitle2="From real-time custom dashboards to full cloud backends, completely integrated."
      />

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">

        <section ref={offerRef.ref} className="space-y-10">
          <div className="space-y-3 transition-all duration-700" style={{ opacity:offerRef.visible?1:0, transform:offerRef.visible?"translateY(0)":"translateY(32px)" }}>
            <SectionBadge color="cyan">What We Offer</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>Our Web &amp; Cloud Capabilities</h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>Full-stack web development from database to dashboard.</p>
          </div>
          <div className="transition-all duration-700" style={{ opacity: offerRef.visible ? 1 : 0, transform: offerRef.visible ? "translateY(0)" : "translateY(28px)", transitionDelay: "120ms" }}>
            <OfferShowcaseCard
              items={offerings}
              accentColor={ACCENT}
              imageSrc="/images/photo-1460925895917-afdab827c52f.jpg"
              imageAlt="Web analytics dashboard on laptop"
              isActive={offerRef.visible}
            />
          </div>
        </section>

        {/* WHERE WE APPLY IT (now 13g-style grid) */}
        <section
          ref={caseRef.ref}
          className="space-y-6 transition-all duration-700"
          style={{ opacity: caseRef.visible ? 1 : 0, transform: caseRef.visible ? "translateY(0)" : "translateY(32px)" }}
        >
          <SectionBadge color="blue">Use Cases</SectionBadge>
          <PlatformBenefitsGrid
            title="Where We Apply It"
            items={platformBenefits}
            accentColor={ACCENT}
          />
        </section>

        <section ref={procRef.ref} className="relative space-y-8 transition-all duration-700"
          style={{ opacity:procRef.visible?1:0, transform:procRef.visible?"translateY(0)":"translateY(36px)" }}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full blur-[100px]" style={{ background:`${ACCENT}14` }} />
            <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full blur-[80px]" style={{ background:`${ACCENT}0e` }} />
          </div>
          <div className="relative mb-10 flex flex-col items-start space-y-3 text-left">
            <SectionBadge color="cyan">Our Process</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>How We Deliver</h2>
          </div>
          <div className="relative">
            <CreationProcessTimeline steps={process} accentColor={ACCENT} />
          </div>
        </section>

        {/* (removed old duplicate benefits section) */}

        <section ref={techRef.ref} className="space-y-6 transition-all duration-700" style={{ opacity:techRef.visible?1:0, transform:techRef.visible?"translateY(0)":"translateY(28px)" }}>
          <SectionBadge color="cyan">Technologies</SectionBadge>
          <h2 className="font-bold text-white text-2xl" style={{ fontFamily:"var(--font-display)" }}>Technologies We Use</h2>
          <TechMarquee items={techStack} accentColor={ACCENT} />
        </section>

        <ServiceCTA accentGradient={ACCENT_GRAD} accentColor={ACCENT} badgeColor="cyan"
          title="Ready to Build Your Platform?"
          subtitle="From dashboard to deployment — let's build your web platform together. Reliable, scalable, beautifully designed."
          ctaText="Start the Conversation" />
      </div>
    </div>
  );
}