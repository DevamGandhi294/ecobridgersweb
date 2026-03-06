"use client";

import {
  useInView, SectionBadge, ServiceHero, OfferingCard,
  ProcessCard, UseCaseCard, TechBadge, InquiryForm, FormCard, ServiceCTA,
} from "@/components/ServicePageShell";

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
  { icon:"🔌", label:"IoT Control Apps"            },
  { icon:"🔔", label:"Monitoring & Alert Systems"  },
  { icon:"🏭", label:"Industrial Companion Apps"   },
  { icon:"💼", label:"Custom Business Apps"        },
  { icon:"🗺️", label:"Field Operations Apps"       },
  { icon:"📋", label:"Data Collection Apps"        },
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

export default function MobileServicePage() {
  const offerRef = useInView();
  const caseRef  = useInView();
  const procRef  = useInView();
  const techRef  = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ServiceHero
        accent={ACCENT_GRAD} accentColor={ACCENT} badge="Mobile Applications"
        badgeColor="violet" icon="📱" gridColor={GRID_COLOR}
        title={<>Smart Apps that Connect{" "}<span style={{ background:"linear-gradient(135deg,#a78bfa,#8b5cf6,#7c3aed)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Users to Systems</span></>}
        subtitle="We develop cross-platform mobile applications that allow users to monitor, control, and analyze systems in real time — tightly integrated with IoT and cloud backends."
      >
        <FormCard accentColor={ACCENT}>
          <InquiryForm accentGradient={ACCENT_GRAD} accentColor={ACCENT} focusColor="#8b5cf6" serviceDefault="Mobile Applications" />
        </FormCard>
      </ServiceHero>

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">

        <section ref={offerRef.ref} className="space-y-10">
          <div className="space-y-3 transition-all duration-700" style={{ opacity:offerRef.visible?1:0, transform:offerRef.visible?"translateY(0)":"translateY(32px)" }}>
            <SectionBadge color="violet">What We Offer</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>Our Mobile Capabilities</h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>From design to deployment — complete cross-platform app development.</p>
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
            <SectionBadge color="violet">Use Cases</SectionBadge>
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
          style={{ opacity:procRef.visible?1:0, transform:procRef.visible?"translateY(0)":"translateY(36px)", background:"linear-gradient(135deg,#070509,#0a0710,#060408)" }}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full blur-[100px]" style={{ background:`${ACCENT}14` }} />
            <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full blur-[80px]" style={{ background:`${ACCENT}0e` }} />
          </div>
          <div className="relative space-y-3 text-center mb-10">
            <SectionBadge color="violet">Our Process</SectionBadge>
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
          <SectionBadge color="violet">Technologies</SectionBadge>
          <h2 className="font-bold text-white text-2xl" style={{ fontFamily:"var(--font-display)" }}>Technologies We Use</h2>
          <div className="flex flex-wrap gap-3">{techStack.map(t => <TechBadge key={t} label={t} accentColor={ACCENT} />)}</div>
        </section>

        <ServiceCTA accentGradient={ACCENT_GRAD} accentColor={ACCENT}
          title="Ready to Build Your App?"
          subtitle="Android, iOS, or both — let's design and build your mobile app from scratch. Beautiful UI, powerful backend, delivered on time."
          ctaText="Start the Conversation" />
      </div>
    </div>
  );
}