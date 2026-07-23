"use client";

import {
  useInView, SectionBadge, OfferShowcaseCard, PlatformBenefitsGrid,
  CreationProcessTimeline, TechMarquee, ServiceCTA,
} from "@/components/ServicePageShell";
import { ScrollToggleHero } from "@/components/ScrollToggleHero";

const ACCENT      = "#8b5cf6";
const ACCENT_GRAD = "from-violet-500 to-purple-600";
const GRID_COLOR  = "rgba(139,92,246,0.7)";

const offerings = [
  { icon:"📱", title:"Flutter Cross-Platform Apps", desc:"One codebase that runs natively on both Android and iOS. Same performance, same UI, half the development time compared to building two separate native apps." },
  { icon:"🔌", title:"IoT Companion Apps", desc:"Mobile apps that connect directly to your IoT hardware. Real-time sensor data, device controls, alert management and live charts that do not freeze when you need them most." },
  { icon:"💼", title:"B2B Operations Tools", desc:"Internal apps for field teams, supervisors and operations staff. Offline-ready, role-based access and real-time sync with your backend — built for daily use in demanding environments." },
  { icon:"🛒", title:"Customer-Facing Apps", desc:"Consumer products, ordering apps, booking platforms and service apps — designed for users who have no patience for slow or confusing interfaces. UX-first, always." },
  { icon:"🚀", title:"App Store & Play Store Submission", desc:"We handle the complete submission process for both stores — assets, descriptions, compliance review and resubmissions if required. You focus on your business, not the paperwork." },
  { icon:"🔗", title:"Backend Integration", desc:"We integrate your app with any backend — REST APIs, Firebase, custom Node.js servers or your existing systems. The app always has the data it needs, when it needs it." },
];
const useCases = [
  { icon:"🔌", label:"IoT Control & Monitoring Apps", desc: "Control and monitor connected devices remotely — real-time data, device alerts and full management from any Android or iOS device." },
  { icon:"🎟️", label:"Booking & Slot Management", desc: "Player-facing and owner-facing apps for sports venues, service businesses and any operation that takes time-based bookings from real users." },
  { icon:"🏭", label:"Production & Inventory Apps", desc: "Mobile tools for factory floors and warehouse teams — real-time data entry, role-based access and offline capability for areas with poor or no connectivity." },
  { icon:"☕", label:"Customer Ordering Apps", desc: "QR-based or standalone ordering apps for cafes, cloud kitchens and retail — browse, order and pay from the customer's own phone." },
  { icon:"📍", label:"Field Operations Apps", desc: "Mobile tools for teams working outside the office — job assignments, status updates, location tracking and photo documentation from anywhere." },
];
const process = [
  { step:"01", title:"UX Design & Wireframes", desc:"Every screen and user flow mapped before any code is written. UX signed off first." },
  { step:"02", title:"UI Design", desc:"Visual design that matches your brand and feels native on both Android and iOS." },
  { step:"03", title:"Development", desc:"Flutter development — clean, modular code with Git version control throughout." },
  { step:"04", title:"Backend Integration", desc:"API integration, real-time data sync and authentication configured and tested." },
  { step:"05", title:"Testing", desc:"Device testing across Android and iOS, edge case handling and performance testing before submission." },
  { step:"06", title:"Launch & Support", desc:"Store submission, launch support and ongoing maintenance and feature updates after launch." },
];
const techStack = ["Flutter", "Dart", "Firebase", "REST APIs", "WebSocket", "Node.js", "PostgreSQL", "MongoDB", "BLE", "MQTT", "Google Play", "App Store", "Figma"];

const platformBenefits = useCases.map((u) => ({ title: u.label, desc: u.desc }));

export default function MobileServicePage() {
  const offerRef = useInView();
  const caseRef  = useInView();
  const procRef  = useInView();
  const techRef  = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ScrollToggleHero
        accentGradient={ACCENT_GRAD}
        accentColor={ACCENT}
        badge="Mobile Applications"
        badgeColor="violet"
        icon="📱"
        gridColor={GRID_COLOR}
        pretitle1="Mobile Applications"
        title1={<>Android &amp; iOS</>}
        subtitle1="Android and iOS apps built for real users — not demos that look good in a pitch and break in production on day one."
        pretitle2="One codebase."
        title2={<>Both platforms.</>}
        subtitle2="Flutter apps that connect your users to your hardware, your platform or your business — polished enough that it does not embarrass the rest of what you built."
      />

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">

        <section ref={offerRef.targetRef} className="space-y-10">
          <div className="space-y-3 transition-all duration-700" style={{ opacity:offerRef.visible?1:0, transform:offerRef.visible?"translateY(0)":"translateY(32px)" }}>
            <SectionBadge color="violet">What We Offer</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>Our Mobile Capabilities</h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>From design to deployment — complete cross-platform app development.</p>
          </div>
          <div className="transition-all duration-700" style={{ opacity: offerRef.visible ? 1 : 0, transform: offerRef.visible ? "translateY(0)" : "translateY(28px)", transitionDelay: "120ms" }}>
            <OfferShowcaseCard
              items={offerings}
              accentColor={ACCENT}
              imageSrc="/images/photo-1512941937669-90a1b58e7e9c.jpg"
              imageAlt="Mobile app UI on smartphone"
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
          <SectionBadge color="violet">Use Cases</SectionBadge>
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
            <SectionBadge color="violet">Our Process</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>How We Deliver</h2>
          </div>
          <div className="relative">
            <CreationProcessTimeline steps={process} accentColor={ACCENT} />
          </div>
        </section>

        {/* (removed old duplicate benefits section) */}

        <section ref={techRef.targetRef} className="space-y-6 transition-all duration-700" style={{ opacity:techRef.visible?1:0, transform:techRef.visible?"translateY(0)":"translateY(28px)" }}>
          <SectionBadge color="violet">Technologies</SectionBadge>
          <h2 className="font-bold text-white text-2xl" style={{ fontFamily:"var(--font-display)" }}>Technologies We Use</h2>
          <TechMarquee items={techStack} accentColor={ACCENT} />
        </section>

        <ServiceCTA accentGradient={ACCENT_GRAD} accentColor={ACCENT} badgeColor="violet"
          title="Ready to Build Your App?"
          subtitle="Android, iOS, or both — let's design and build your mobile app from scratch. Beautiful UI, powerful backend, delivered on time."
          ctaText="Start the Conversation" />
      </div>
    </div>
  );
}