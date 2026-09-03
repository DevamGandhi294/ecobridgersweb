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
  { icon:"🌐", title:"Business Websites", desc:"Professional, fast, mobile-responsive websites built with Next.js — SEO-ready from the first line of code, not added as an afterthought when rankings do not come." },
  { icon:"📊", title:"SaaS Dashboards & Admin Panels", desc:"Operator dashboards, management portals and admin interfaces for SaaS products — real-time data, clean UI and role-based access that keeps each user seeing exactly what they should." },
  { icon:"🚀", title:"Full-Stack Web Applications", desc:"Complete web platforms with frontend, backend, database and API layer — scoped, built and deployed as one integrated project by one team." },
  { icon:"🗄️", title:"Database Architecture & Design", desc:"Schemas designed for the queries your system actually runs. Correctly structured from the start so you avoid the expensive rewrite when your data grows past what the original design can handle." },
  { icon:"⚡", title:"Database Optimisation", desc:"Slow queries, missing indexes, poor schema design — we audit your existing database, find the bottlenecks and fix them. Most systems see significant performance improvement after a proper optimisation pass." },
  { icon:"🔗", title:"API Development", desc:"REST APIs built with Node.js — documented, versioned and tested. For connecting your web platform to mobile apps, IoT devices or any third-party service that your business uses." },
];
const useCases = [
  { icon:"💻", label:"SaaS Product Web Layer", desc: "The web frontend and backend for your SaaS product — multi-tenant architecture, Razorpay subscription management and role-based access built in from the start." },
  { icon:"📡", label:"IoT Monitoring Dashboards", desc: "Real-time dashboards showing live sensor data, device status, alert history and machine logs — built for factory managers and operations teams who need clarity, not complexity." },
  { icon:"🛒", label:"E-Commerce Platforms", desc: "Online stores with Razorpay payment integration, inventory management, order tracking and a custom admin panel your team can use without training." },
  { icon:"🏪", label:"Business & Service Websites", desc: "Professional websites for local businesses and service companies — fast, SEO-optimised and built to turn visitors into enquiries." },
  { icon:"⚙️", label:"Admin & Operations Portals", desc: "Internal web tools for managing teams, inventory, bookings, reports and operations — role-based, database-driven and built for people who use it every single day." },
];
const process = [
  { step:"01", title:"Discovery & Scoping", desc:"Requirements, user flows and technical architecture defined before development starts." },
  { step:"02", title:"Database Design", desc:"Schema and data architecture designed first — because everything else depends on it being right from the beginning." },
  { step:"03", title:"Backend Development", desc:"API development, authentication, business logic and database integration." },
  { step:"04", title:"Frontend Development", desc:"Next.js UI built against the API — fast, clean and responsive on every screen size." },
  { step:"05", title:"QA & Performance Testing", desc:"Load testing, query performance, cross-browser testing and security review before deployment." },
  { step:"06", title:"Deployment & Support", desc:"Production deployment, monitoring setup and ongoing maintenance after launch." },
];
const techStack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "MongoDB", "Prisma", "Redis", "Docker", "Vercel", "AWS", "Razorpay", "REST APIs"];

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
        badge="Web & Database"
        badgeColor="cyan"
        icon="🌐"
        gridColor={GRID_COLOR}
        pretitle1="Web & Database"
        title1={<>Reliable<br/>Platforms</>}
        subtitle1="Fast web platforms and the data architecture that makes them reliable — built to handle real load without expensive rewrites six months after you launch."
        pretitle2="Clean frontend."
        title2={<>Solid backend.</>}
        subtitle2="SaaS dashboards, admin panels, business websites and full-stack web apps — with databases designed correctly from day one."
      />

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">

        <section ref={offerRef.targetRef} className="space-y-10">
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
          ref={caseRef.targetRef}
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

        <section ref={procRef.targetRef} className="relative space-y-8 transition-all duration-700"
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

        <section ref={techRef.targetRef} className="space-y-6 transition-all duration-700" style={{ opacity:techRef.visible?1:0, transform:techRef.visible?"translateY(0)":"translateY(28px)" }}>
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