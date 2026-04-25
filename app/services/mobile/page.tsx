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
  { icon:"📱", title:"Cross-Platform Apps",       desc:"Single codebase for Android & iOS using Flutter — native performance, half the time." },
  { icon:"🎛️", title:"Real-Time Device Control",  desc:"Control IoT hardware and systems directly from your mobile device, anywhere." },
  { icon:"📊", title:"Live Data Monitoring",      desc:"Real-time dashboards, live charts, and push notifications for critical alerts." },
  { icon:"🔐", title:"Secure Authentication",     desc:"Email, Google, OTP-based login with role-based access control built in." },
  { icon:"🔗", title:"IoT & Cloud Integration",   desc:"Seamless connection to your cloud backend, MQTT brokers, and REST APIs." },
  { icon:"🎨", title:"Clean UI/UX Design",        desc:"Intuitive, beautiful interfaces that are easy to use for any type of user." },
];
const useCases = [
  { icon:"🔌", label:"IoT Control Apps",           desc: "Take full remote control over connected hardware interfaces from your phone." },
  { icon:"🔔", label:"Monitoring & Alert Systems", desc: "Receive mission-critical push notifications immediately when thresholds breach." },
  { icon:"🏭", label:"Industrial Companion Apps",  desc: "Empower factory workers with intuitive tablets directly tracking machine health." },
  { icon:"💼", label:"Custom Business Apps",       desc: "Internal workflow applications optimizing specific operational bottlenecks seamlessly." },
  { icon:"🗺️", label:"Field Operations Apps",      desc: "Equip off-site teams with live geo-tracked routing and offline sync capabilities." },
  { icon:"📋", label:"Data Collection Apps",       desc: "Digitize complex pen-and-paper surveys into lightning-fast native mobile forms." },
];
const process = [
  { step:"01", title:"UX Planning",         desc:"Map user journeys, screens, and interaction flows before writing code." },
  { step:"02", title:"UI Design",           desc:"Design pixel-perfect screens with your brand identity and color system." },
  { step:"03", title:"App Development",     desc:"Build with Flutter — clean code, reusable components, and state management." },
  { step:"04", title:"Backend Integration", desc:"Connect to your cloud, IoT backend, or existing APIs." },
  { step:"05", title:"Testing",             desc:"Test on real devices for both Android and iOS before any release." },
  { step:"06", title:"Deployment & Support",desc:"Publish to Play Store / App Store and hand over with full documentation." },
];
const techStack = ["Flutter","Dart","Firebase","REST API","MQTT","Provider","Riverpod","GetX","Google Play","App Store","FCM","BLE"];

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
        pretitle1="Pocket intelligence"
        title1={<>Smart<br/>Apps</>}
        subtitle1="We develop cross-platform mobile applications that allow users to monitor, control, and analyze systems in real time."
        pretitle2="Seamless experiences"
        title2={<>Users to<br/>Systems</>}
        subtitle2="Tightly integrated with IoT and cloud backends to deliver native performance and beautiful interfaces."
      />

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">

        <section ref={offerRef.ref} className="space-y-10">
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
          ref={caseRef.ref}
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

        <section ref={procRef.ref} className="relative space-y-8 transition-all duration-700"
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

        <section ref={techRef.ref} className="space-y-6 transition-all duration-700" style={{ opacity:techRef.visible?1:0, transform:techRef.visible?"translateY(0)":"translateY(28px)" }}>
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