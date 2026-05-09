"use client";

import {
  useInView, SectionBadge, OfferShowcaseCard, PlatformBenefitsGrid,
  CreationProcessTimeline, TechMarquee, ServiceCTA,
} from "@/components/ServicePageShell";
import { ScrollToggleHero } from "@/components/ScrollToggleHero";

const ACCENT      = "#a78bfa";
const ACCENT_GRAD = "from-violet-500 to-indigo-600";
const GRID_COLOR  = "rgba(167,139,250,0.7)";

const offerings = [
  { icon:"📱", title:"Cross-Platform Apps",       desc:"Single codebase app development for Android and iOS with polished UX." },
  { icon:"🎛️", title:"Real-Time Control",        desc:"Live dashboards and device controls that keep users connected to their systems." },
  { icon:"🔐", title:"Secure Authentication",     desc:"Login flows, role-based access, and secure authorization baked into every app." },
  { icon:"🔔", title:"Push & Notifications",      desc:"Context-aware alerts and activity updates that keep users moving." },
  { icon:"🔗", title:"Backend Integration",       desc:"Connected apps with cloud APIs, IoT feeds, and business systems at the backend." },
  { icon:"🎨", title:"Clean UI/UX",               desc:"Intuitive interfaces designed around the user’s actual day-to-day workflow." },
];
const useCases = [
  { icon:"📱", label:"Field Worker Apps",         desc: "Field teams can inspect, report, and collaborate from a single mobile app." },
  { icon:"🏭", label:"IoT Companion Apps",        desc: "Control connected hardware, view live metrics, and take action instantly." },
  { icon:"💼", label:"Customer Experience Apps",  desc: "Mobile tools that simplify ordering, tracking, and customer communication." },
  { icon:"🚚", label:"Logistics & Ops Apps",       desc: "Route planning, status tracking, and on-the-go approvals for operations teams." },
  { icon:"📊", label:"Analytics Apps",            desc: "Embedded dashboards and quick insights inside the same app experience." },
  { icon:"🛠️", label:"Internal Productivity Apps", desc: "Custom apps that make internal workflows faster and easier to use." },
];
const process = [
  { step:"01", title:"User Research",         desc:"Understand who uses the app and what they need moment to moment." },
  { step:"02", title:"Design & Prototyping", desc:"Build app flows, wireframes, and interactive prototypes before coding." },
  { step:"03", title:"App Development",      desc:"Develop with Flutter for reliable cross-platform performance." },
  { step:"04", title:"Backend Sync",         desc:"Connect apps to APIs, real-time services, and cloud databases." },
  { step:"05", title:"Testing & QA",         desc:"Test on actual devices, across platforms, and multiple network conditions." },
  { step:"06", title:"Launch & Support",     desc:"Deploy to the App Store and Play Store, then keep it running smoothly." },
];
const techStack = ["Flutter","Dart","Firebase","REST API","MQTT","Provider","Riverpod","App Store","Play Store","FCM","TypeScript","Node.js"];

const platformBenefits = useCases.map((u) => ({ title: u.label, desc: u.desc }));

export default function AppServicePage() {
  const offerRef = useInView();
  const caseRef  = useInView();
  const procRef  = useInView();
  const techRef  = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ScrollToggleHero
        accentGradient={ACCENT_GRAD}
        accentColor={ACCENT}
        badge="App Solutions"
        badgeColor="violet"
        icon="📱"
        gridColor={GRID_COLOR}
        pretitle1="Pocket-first products"
        title1={<>App<br/>Experiences</>}
        subtitle1="We build user-friendly mobile and tablet apps that connect people to operations, products, and data." 
        pretitle2="Connected systems"
        title2={<>Apps that<br/>talk to the cloud</>}
        subtitle2="Native experiences that are integrated with your backend, IoT systems, and web services." 
      />

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">
        <section ref={offerRef.ref} className="space-y-10">
          <div className="space-y-3 transition-all duration-700" style={{ opacity:offerRef.visible?1:0, transform:offerRef.visible?"translateY(0)":"translateY(32px)" }}>
            <SectionBadge color="violet">What We Offer</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>App Products Built Right</h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>Build apps that are fast, reliable, and designed around the real needs of customers and teams.</p>
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

        <section ref={techRef.ref} className="space-y-6 transition-all duration-700" style={{ opacity:techRef.visible?1:0, transform:techRef.visible?"translateY(0)":"translateY(28px)" }}>
          <SectionBadge color="violet">Technologies</SectionBadge>
          <h2 className="font-bold text-white text-2xl" style={{ fontFamily:"var(--font-display)" }}>Technologies We Use</h2>
          <TechMarquee items={techStack} accentColor={ACCENT} />
        </section>

        <ServiceCTA accentGradient={ACCENT_GRAD} accentColor={ACCENT} badgeColor="violet"
          title="Ready to build your app?"
          subtitle="We design and develop apps that connect people to your business and your data with speed and polish."
          ctaText="Start the Conversation" />
      </div>
    </div>
  );
}
