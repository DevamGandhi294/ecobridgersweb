"use client";

import {
  useInView, SectionBadge, OfferShowcaseCard, PlatformBenefitsGrid,
  CreationProcessTimeline, TechMarquee, ServiceCTA,
} from "@/components/ServicePageShell";
import { ScrollToggleHero } from "@/components/ScrollToggleHero";

const ACCENT      = "#34d399";
const ACCENT_GRAD = "from-emerald-500 to-lime-500";
const GRID_COLOR  = "rgba(52,211,153,0.7)";

const offerings = [
  { icon:"📊", title:"Industry Dashboards",          desc:"Custom SaaS dashboards for your team, operations, and market-facing product." },
  { icon:"🧠", title:"Intelligent Workflows",         desc:"Automate recurring business processes with rules, notifications, and approvals." },
  { icon:"💳", title:"Subscription & Billing",       desc:"Built-in pricing, usage tracking, and payment flows for recurring products." },
  { icon:"🔐", title:"Role-Based Access",           desc:"Secure user permissions and multi-tenant data separation for customers." },
  { icon:"⚡", title:"Fast Data Architecture",        desc:"Performance-focused backends with PostgreSQL, caching, and scalable APIs." },
  { icon:"📱", title:"Web + App Experiences",        desc:"Web portals and companion apps designed to work together seamlessly." },
];
const useCases = [
  { icon:"🏢", label:"Textile Production Management",           desc: "Metre-by-metre fabric tracking, worker accountability, production reporting — built for Surat's textile units." },
  { icon:"🛒", label:"Factory & Industrial Monitoring",             desc: "Machine health monitoring with real-time alerts before breakdowns happen — not after they cost you money."},
  { icon:"📦", label:"Sports Venue Management",        desc: "Slot booking, player listing, revenue tracking and a 'Need-a-Player' request system for box cricket venues." },
  { icon:"📈", label:"Cafe & Cloud Kitchen Management",       desc: "Billing, QR ordering, daily reports and custom branding per outlet — one-time cost, zero monthly subscription." },
  { icon:"🔧", label:"Custom Domain SaaS",           desc: "Your industry has a gap none of our existing products cover. We scope, design and build it from scratch." },
  { icon:"🗂️", label:"Enterprise SaaS",         desc: "Multi-branch architecture, advanced access controls, API integrations with existing systems and custom reporting for larger organisations." },
];
const process = [
  { step:"01", title:"Discovery & Scoping",     desc:"We understand your industry, your workflow and your exact requirements before writing any code." },
  { step:"02", title:"Product Mapping",         desc:"We map your requirements to an existing product or define the architecture for a custom build." },
  { step:"03", title:"Architecture & Database Design",           desc:"Schemas, data flows and system architecture designed correctly from the start." },
  { step:"04", title:"Development & Integration",   desc:"Full-stack development — mobile, web, backend, hardware integration if required." },
  { step:"05", title:"QA & Launch",            desc:"Device testing, edge case testing, performance testing and deployment to production." },
  { step:"06", title:"Support & Iteration",      desc:"Ongoing maintenance, feature updates and technical support. We stay available." },
];
const techStack = ["Next.js","React","Node.js","Prisma","PostgreSQL","Flutter ","MongoDB","Docker","Vercel","TypeScript","Firebase","Supabase"];

const platformBenefits = useCases.map((u) => ({ title: u.label, desc: u.desc }));

export default function SaaSServicePage() {
  const offerRef = useInView();
  const caseRef  = useInView();
  const procRef  = useInView();
  const techRef  = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ScrollToggleHero
        accentGradient={ACCENT_GRAD}
        accentColor={ACCENT}
        badge="SaaS Products"
        badgeColor="emerald"
        icon="💡"
        gridColor={GRID_COLOR}
        pretitle1="Product-first companies"
        title1={<>SaaS<br/>Platforms</>}
        subtitle1="We build industry-specific SaaS products that solve real operational problems, not just generic admin panels."
        pretitle2="From launch to scale"
        title2={<>Build once,<br/>grow forever</>}
        subtitle2="Launch faster with a product that already includes workflows, roles, and subscription-ready architecture."
      />

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">
        <section ref={offerRef.targetRef} className="space-y-10">
          <div className="space-y-3 transition-all duration-700" style={{ opacity:offerRef.visible?1:0, transform:offerRef.visible?"translateY(0)":"translateY(32px)" }}>
            <SectionBadge color="emerald">What We Offer</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>SaaS Products That Work</h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>Product-led software with the right controls, billing and workflows already built in.</p>
          </div>
          <div className="transition-all duration-700" style={{ opacity: offerRef.visible ? 1 : 0, transform: offerRef.visible ? "translateY(0)" : "translateY(28px)", transitionDelay: "120ms" }}>
            <OfferShowcaseCard
              items={offerings}
              accentColor={ACCENT}
              imageSrc="/images/photo-1531497865144-0468b7a26d3a.jpg"
              imageAlt="SaaS dashboard and business workflow overview"
              isActive={offerRef.visible}
            />
          </div>
        </section>

        <section
          ref={caseRef.targetRef}
          className="space-y-6 transition-all duration-700"
          style={{ opacity: caseRef.visible ? 1 : 0, transform: caseRef.visible ? "translateY(0)" : "translateY(32px)" }}
        >
          <SectionBadge color="emerald">Use Cases</SectionBadge>
          <PlatformBenefitsGrid
            title="Where We Apply It"
            items={platformBenefits}
            accentColor={ACCENT}
          />
        </section>

        <section ref={procRef.targetRef} className="relative space-y-8 transition-all duration-700"
          style={{ opacity:procRef.visible?1:0, transform:procRef.visible?"translateY(0)":"translateY(36px)" }}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full blur-[100px]" style={{ background:`${ACCENT}14` }} />
            <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full blur-[80px]" style={{ background:`${ACCENT}0e` }} />
          </div>
          <div className="relative mb-10 flex flex-col items-start space-y-3 text-left">
            <SectionBadge color="emerald">Our Process</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>How We Deliver</h2>
          </div>
          <div className="relative">
            <CreationProcessTimeline steps={process} accentColor={ACCENT} />
          </div>
        </section>

        <section ref={techRef.targetRef} className="space-y-6 transition-all duration-700" style={{ opacity:techRef.visible?1:0, transform:techRef.visible?"translateY(0)":"translateY(28px)" }}>
          <SectionBadge color="emerald">Technologies</SectionBadge>
          <h2 className="font-bold text-white text-2xl" style={{ fontFamily:"var(--font-display)" }}>Technologies We Use</h2>
          <TechMarquee items={techStack} accentColor={ACCENT} />
        </section>

        <ServiceCTA accentGradient={ACCENT_GRAD} accentColor={ACCENT} badgeColor="emerald"
          title="Ready to launch your SaaS product?"
          subtitle="We can take your idea from concept to a live, revenue-ready software platform." 
          ctaText="Start the Conversation" />
      </div>
    </div>
  );
}
