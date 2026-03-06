"use client";

import {
  useInView, SectionBadge, ServiceHero, OfferingCard,
  ProcessCard, UseCaseCard, TechBadge, InquiryForm, FormCard, ServiceCTA,
} from "@/components/ServicePageShell";

const ACCENT      = "#10b981";
const ACCENT_GRAD = "from-emerald-500 to-teal-500";
const GRID_COLOR  = "rgba(52,211,153,0.7)";

const offerings = [
  { icon:"🌡️", title:"Sensor Integration",       desc:"Temperature, vibration, energy, motion, humidity and more — wired or wireless, any protocol." },
  { icon:"🖥️", title:"Microcontroller Systems",   desc:"ESP32, ESP8266, Arduino, Raspberry Pi firmware design, OTA updates, and low-power modes." },
  { icon:"📡", title:"Wireless Communication",    desc:"Wi-Fi, GSM/4G, LoRa, MQTT, BLE — the right protocol for your range, power, and bandwidth." },
  { icon:"⚡", title:"Real-Time Monitoring",      desc:"Live data acquisition, configurable threshold alerts, and automated control loops." },
  { icon:"🧩", title:"Edge Processing",           desc:"Local decision-making and pre-processing at device level to reduce latency and bandwidth." },
  { icon:"☁️", title:"Cloud Connectivity",        desc:"Secure, encrypted data pipelines from device to cloud dashboard with retry and buffering." },
];
const useCases = [
  { icon:"📊", label:"Smart Monitoring Systems"        },
  { icon:"⚙️", label:"Automation & Control"            },
  { icon:"🏭", label:"Industrial Equipment Monitoring" },
  { icon:"🌿", label:"Environmental Monitoring"        },
  { icon:"🏗️", label:"Infrastructure Sensing"          },
  { icon:"🔬", label:"Research & Prototypes"           },
];
const process = [
  { step:"01", title:"Requirement Gathering", desc:"Understand environment, sensors, data goals, and power constraints." },
  { step:"02", title:"System Architecture",   desc:"Design the full hardware-to-cloud architecture and communication stack." },
  { step:"03", title:"Hardware Prototyping",  desc:"Build and test the physical device with real sensor data and edge cases." },
  { step:"04", title:"Firmware Development",  desc:"Write reliable embedded code with error handling and OTA update support." },
  { step:"05", title:"Cloud Integration",     desc:"Connect device data to your dashboard, API, or storage backend securely." },
  { step:"06", title:"Deployment & Handover", desc:"Deploy on-site, document everything, train your team, monitor live." },
];
const techStack = ["ESP32","ESP8266","Arduino","Raspberry Pi","MQTT","LoRa","Firebase","Node.js","Python","C/C++","FreeRTOS","WebSockets"];

export default function IoTServicePage() {
  const offerRef = useInView();
  const caseRef  = useInView();
  const procRef  = useInView();
  const techRef  = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <ServiceHero
        accent={ACCENT_GRAD} accentColor={ACCENT} badge="IoT & Embedded Systems"
        badgeColor="emerald" icon="🔌" gridColor={GRID_COLOR}
        title={<>Smart Hardware,{" "}<span style={{ background:"linear-gradient(135deg,#34d399,#10b981,#06b6d4)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Intelligent Cloud</span></>}
        subtitle="We design complete IoT systems — from sensor-level integration to real-time cloud monitoring. From a simple sensor node to full industrial automation, EcoBridges builds it reliably."
      >
        <FormCard accentColor={ACCENT}>
          <InquiryForm accentGradient={ACCENT_GRAD} accentColor={ACCENT} focusColor="#10b981" serviceDefault="IoT & Embedded Systems" />
        </FormCard>
      </ServiceHero>

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pt-20 pb-24 sm:px-6 lg:px-10 xl:px-16">

        <section ref={offerRef.ref} className="space-y-10">
          <div className="space-y-3 transition-all duration-700" style={{ opacity:offerRef.visible?1:0, transform:offerRef.visible?"translateY(0)":"translateY(32px)" }}>
            <SectionBadge color="emerald">What We Offer</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>Our IoT Capabilities</h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>End-to-end embedded and IoT development — from the chip to the cloud.</p>
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
            <SectionBadge color="teal">Use Cases</SectionBadge>
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
          style={{ opacity:procRef.visible?1:0, transform:procRef.visible?"translateY(0)":"translateY(36px)", background:"linear-gradient(135deg,#050709,#071209,#040810)" }}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full blur-[100px]" style={{ background:`${ACCENT}14` }} />
            <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full blur-[80px]" style={{ background:`${ACCENT}0e` }} />
          </div>
          <div className="relative space-y-3 text-center mb-10">
            <SectionBadge color="emerald">Our Process</SectionBadge>
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
          <SectionBadge color="emerald">Technologies</SectionBadge>
          <h2 className="font-bold text-white text-2xl" style={{ fontFamily:"var(--font-display)" }}>Technologies We Use</h2>
          <div className="flex flex-wrap gap-3">{techStack.map(t => <TechBadge key={t} label={t} accentColor={ACCENT} />)}</div>
        </section>

        <ServiceCTA accentGradient={ACCENT_GRAD} accentColor={ACCENT}
          title="Ready to Build Your IoT System?"
          subtitle="Tell us your idea and we'll design the full system — hardware, firmware, cloud, and dashboard. One team, end to end."
          ctaText="Start the Conversation" />
      </div>
    </div>
  );
}