"use client";

import {
  useInView, SectionBadge, OfferShowcaseCard,
  ProcessCard, UseCaseCard, TechBadge, PlatformBenefitsGrid, CreationProcessTimeline, InquiryForm, FormCard, ServiceCTA,
} from "@/components/ServicePageShell";
import { ScrollToggleHero } from "@/components/ScrollToggleHero";

const ACCENT      = "#10b981";
const ACCENT_GRAD = "from-emerald-500 to-teal-500";
const GRID_COLOR  = "rgba(52,211,153,0.7)";

const offerings = [
  { icon:"🌡️", title:"Sensor Integration",      desc:"temperature, vibration, energy, humidity, motion — wired or wireless, any protocol. if it measures something, we can read it." },
  { icon:"🖥️", title:"Microcontroller Systems",  desc:"ESP32, ESP8266, Arduino, Raspberry Pi — firmware that handles OTA updates, low-power modes, and doesn't crash at 2am." },
  { icon:"📡", title:"Wireless Communication",   desc:"Wi-Fi, GSM/4G, LoRa, MQTT, BLE — right protocol for your range, power budget, and bandwidth. not just whatever's default." },
  { icon:"⚡", title:"Real-Time Monitoring",     desc:"live data acquisition, configurable alerts, automated control loops. your system reacts before you even notice something changed." },
  { icon:"🧩", title:"Edge Processing",          desc:"local decision-making at device level — cuts latency, saves bandwidth, keeps running even when cloud goes dark." },
  { icon:"☁️", title:"Cloud Connectivity",       desc:"encrypted pipelines from device to dashboard with retry logic and buffering. data arrives. always." },
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
  { step:"01", title:"Requirement Gathering", desc:"understand the environment, sensors, data goals, and power constraints — before touching hardware." },
  { step:"02", title:"System Architecture",   desc:"design the full hardware-to-cloud stack and communication protocol. no surprises later." },
  { step:"03", title:"Hardware Prototyping",  desc:"build and test with real sensor data and real edge cases — not just happy-path lab conditions." },
  { step:"04", title:"Firmware Development",  desc:"reliable embedded code with error handling, watchdog timers, and OTA update support baked in." },
  { step:"05", title:"Cloud Integration",     desc:"connect device data to your dashboard, API, or storage. secure, tested, monitored." },
  { step:"06", title:"Deployment & Handover", desc:"on-site deployment, full documentation, team training, live monitoring. you're not left figuring it out alone." },
];

const techStack = ["ESP32","ESP8266","Arduino","Raspberry Pi","MQTT","LoRa","Firebase","Node.js","Python","C/C++","FreeRTOS","WebSockets"];

const platformBenefits = useCases.map((u) => ({ title: u.label }));

function CityDataShowcase() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-zinc-900/80 backdrop-blur-sm" style={{ padding:"0" }}>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-sm">🛰️</div>
          <div>
            <div className="text-xs font-bold text-white" style={{ fontFamily:"var(--font-display)" }}>live city environment monitor</div>
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              streaming from govt API + IoT nodes
            </div>
          </div>
        </div>
        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400" style={{ fontFamily:"var(--font-display)" }}>LIVE</div>
      </div>
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label:"cities monitored", value:"12",   unit:"nodes",    accent:"#34d399" },
            { label:"avg AQI today",    value:"87",   unit:"moderate", accent:"#f59e0b" },
            { label:"data points/hr",   value:"2.4k", unit:"readings", accent:"#22d3ee" },
          ].map((m) => (
            <div key={m.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-3">
              <div className="text-xl font-extrabold" style={{ fontFamily:"var(--font-display)", color:m.accent }}>{m.value}</div>
              <div className="text-[10px] font-semibold text-zinc-400" style={{ fontFamily:"var(--font-display)" }}>{m.unit}</div>
              <div className="mt-0.5 text-[9px] text-zinc-600" style={{ fontFamily:"var(--font-body)" }}>{m.label}</div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {[
            { city:"Mumbai",    temp:34, aqi:142, humidity:78, status:"unhealthy", statusColor:"#ef4444", aqiColor:"#ef4444" },
            { city:"Delhi",     temp:38, aqi:189, humidity:45, status:"very high", statusColor:"#dc2626", aqiColor:"#dc2626" },
            { city:"Bangalore", temp:26, aqi:62,  humidity:65, status:"good",      statusColor:"#34d399", aqiColor:"#34d399" },
            { city:"Chennai",   temp:35, aqi:95,  humidity:82, status:"moderate",  statusColor:"#f59e0b", aqiColor:"#f59e0b" },
            { city:"Pune",      temp:29, aqi:74,  humidity:60, status:"moderate",  statusColor:"#f59e0b", aqiColor:"#f59e0b" },
            { city:"Surat",     temp:33, aqi:88,  humidity:70, status:"moderate",  statusColor:"#f59e0b", aqiColor:"#f59e0b" },
          ].map((c) => (
            <div key={c.city} className="group flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:border-emerald-500/25 hover:bg-white/[0.04]">
              <div className="w-20 shrink-0 text-xs font-bold text-white" style={{ fontFamily:"var(--font-display)" }}>{c.city}</div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-sm font-bold text-orange-400" style={{ fontFamily:"var(--font-display)" }}>{c.temp}</span>
                <span className="text-[9px] text-zinc-600">°C</span>
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width:`${Math.min((c.aqi/300)*100,100)}%`, background:c.aqiColor, opacity:0.8 }} />
                </div>
                <span className="w-8 text-right text-[11px] font-bold" style={{ color:c.aqiColor, fontFamily:"var(--font-display)" }}>{c.aqi}</span>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-[11px] font-semibold text-cyan-400" style={{ fontFamily:"var(--font-display)" }}>{c.humidity}%</span>
                <span className="text-[9px] text-zinc-600">rh</span>
              </div>
              <div className="hidden shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider sm:block"
                style={{ background:`${c.statusColor}18`, color:c.statusColor, border:`1px solid ${c.statusColor}30`, fontFamily:"var(--font-display)" }}>
                {c.status}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 border-t border-white/8 pt-3">
          {[
            { label:"temperature", color:"#fb923c" },
            { label:"AQI index",   color:"#ef4444" },
            { label:"humidity",    color:"#22d3ee" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full" style={{ background:l.color }} />
              <span className="text-[10px] text-zinc-500" style={{ fontFamily:"var(--font-body)" }}>{l.label}</span>
            </div>
          ))}
          <div className="ml-auto text-[10px] text-zinc-600" style={{ fontFamily:"var(--font-body)" }}>data: CPCB + MPCB API · refreshes every 60s</div>
        </div>
      </div>
    </div>
  );
}

export default function IoTServicePage() {
  const offerRef    = useInView();
  const showcaseRef = useInView();
  const caseRef     = useInView();
  const procRef     = useInView();
  const techRef     = useInView();
  const formRef     = useInView();

  return (
    <div className="flex flex-col overflow-x-hidden">

      {/* HERO */}
      <ScrollToggleHero
        accentGradient={ACCENT_GRAD}
        accentColor={ACCENT}
        badge="IoT & Embedded Systems"
        badgeColor="emerald"
        icon="🔌"
        gridColor={GRID_COLOR}
        pretitle1="Hardware that survives"
        title1={<>The real<br/>world</>}
        subtitle1="we build connected hardware for where things actually get rough — dust, vibration, -20°C to +60°C, internet that ghosts for hours."
        pretitle2="Edge intelligence"
        title2={<>Smarter<br/>nodes</>}
        subtitle2="from a single sensor node to full industrial automation with offline capabilities, we build it to last."
      />

      <div className="mx-auto w-full max-w-screen-xl space-y-24 px-4 pb-24 sm:px-6 lg:px-10 xl:px-16">

        {/* OFFERINGS */}
        <section ref={offerRef.ref} className="space-y-10">
          <div className="space-y-3 transition-all duration-700" style={{ opacity:offerRef.visible?1:0, transform:offerRef.visible?"translateY(0)":"translateY(32px)" }}>
            <SectionBadge color="emerald">what we build</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>from chip to cloud.</h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>end-to-end embedded and IoT development — every layer, one team, no gaps.</p>
          </div>
          <div className="transition-all duration-700" style={{ opacity: offerRef.visible ? 1 : 0, transform: offerRef.visible ? "translateY(0)" : "translateY(28px)", transitionDelay: "120ms" }}>
            <OfferShowcaseCard
              items={offerings}
              accentColor={ACCENT}
              imageSrc="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
              imageAlt="IoT hardware and embedded electronics"
              isActive={offerRef.visible}
            />
          </div>
        </section>

        {/* LIVE DATA SHOWCASE */}
        <section ref={showcaseRef.ref} className="space-y-8">
          <div className="space-y-3 transition-all duration-700" style={{ opacity:showcaseRef.visible?1:0, transform:showcaseRef.visible?"translateY(0)":"translateY(32px)" }}>
            <SectionBadge color="teal">real-world example</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>
              city-level env monitoring.{" "}
              <span style={{ background:"linear-gradient(90deg,#34d399,#22d3ee)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>live.</span>
            </h2>
            <p className="max-w-2xl text-base text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>
              this is exactly what we build — IoT nodes feeding real-time data from government APIs (CPCB, MPCB) into a unified dashboard. temperature, AQI, humidity, all cities, all streaming.
            </p>
          </div>
          <div className="transition-all duration-700" style={{ opacity:showcaseRef.visible?1:0, transform:showcaseRef.visible?"translateY(0)":"translateY(28px)", transitionDelay:"150ms" }}>
            <CityDataShowcase />
          </div>
          <div className="grid gap-4 sm:grid-cols-3 transition-all duration-700" style={{ opacity:showcaseRef.visible?1:0, transform:showcaseRef.visible?"translateY(0)":"translateY(24px)", transitionDelay:"250ms" }}>
            {[
              { icon:"📡", title:"data sources", desc:"CPCB & MPCB govt APIs, IoT sensor nodes, weather station feeds — all normalized into one stream.", accent:"#34d399" },
              { icon:"⚡", title:"edge + cloud",  desc:"local nodes pre-process and buffer. cloud aggregates, stores, and serves. works even offline.",      accent:"#22d3ee" },
              { icon:"🔔", title:"smart alerts",  desc:"AQI spikes, temp anomalies, sensor dropouts — alerts fire via push, SMS, or webhook. zero missed events.", accent:"#a78bfa" },
            ].map((c) => (
              <div key={c.title} className="group rounded-2xl border border-white/10 bg-zinc-900/60 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=`${c.accent}40`; (e.currentTarget as HTMLElement).style.boxShadow=`0 16px 40px -8px ${c.accent}20`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor=""; (e.currentTarget as HTMLElement).style.boxShadow=""; }}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-xl" style={{ background:`${c.accent}15`, border:`1px solid ${c.accent}25` }}>{c.icon}</div>
                <div className="text-sm font-bold text-white mb-1.5" style={{ fontFamily:"var(--font-display)" }}>{c.title}</div>
                <div className="text-xs leading-relaxed text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* WHERE WE APPLY IT (now 13g-style grid) */}
        <section
          ref={caseRef.ref}
          className="space-y-6 transition-all duration-700"
          style={{ opacity: caseRef.visible ? 1 : 0, transform: caseRef.visible ? "translateY(0)" : "translateY(32px)" }}
        >
          <SectionBadge color="teal">use cases</SectionBadge>
          <PlatformBenefitsGrid
            title="where we apply it."
            subtitle="real deployments. not just proof-of-concepts that never left the lab."
            items={platformBenefits}
            accentColor={ACCENT}
          />
        </section>

        {/* PROCESS */}
        <section ref={procRef.ref} className="relative overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-12 transition-all duration-700"
          style={{ opacity:procRef.visible?1:0, transform:procRef.visible?"translateY(0)":"translateY(36px)", background:"linear-gradient(135deg,#050709,#071209,#040810)" }}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full blur-[100px]" style={{ background:`${ACCENT}14` }} />
            <div className="absolute -right-20 bottom-0 h-48 w-48 rounded-full blur-[80px]" style={{ background:`${ACCENT}0e` }} />
          </div>
          <div className="relative space-y-3 text-center mb-10">
            <SectionBadge color="emerald">how it happens</SectionBadge>
            <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>six steps. no surprises.</h2>
            <p className="mx-auto max-w-xl text-sm text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>from first conversation to on-site deployment — you know exactly what's happening at every step.</p>
          </div>
          <div className="relative">
            <CreationProcessTimeline steps={process} accentColor={ACCENT} />
          </div>
        </section>

        {/* (removed old duplicate benefits section) */}

        {/* TECH STACK */}
        <section ref={techRef.ref} className="space-y-6 transition-all duration-700" style={{ opacity:techRef.visible?1:0, transform:techRef.visible?"translateY(0)":"translateY(28px)" }}>
          <SectionBadge color="emerald">the stack</SectionBadge>
          <h2 className="font-bold text-white text-2xl" style={{ fontFamily:"var(--font-display)" }}>tools we actually know, not just list on a spec sheet.</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map(t => <TechBadge key={t} label={t} accentColor={ACCENT} />)}
          </div>
        </section>

        {/* FORM — standalone, no ServiceHero wrapper, no min-height */}
        <section
          ref={formRef.ref}
          id="inquiry"
          className="transition-all duration-700"
          style={{ opacity:formRef.visible?1:0, transform:formRef.visible?"translateY(0)":"translateY(32px)" }}
        >
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 space-y-2">
              <SectionBadge color="emerald">get in touch</SectionBadge>
              <h2 className="font-extrabold tracking-tight text-white" style={{ fontSize:"clamp(1.9rem,4.5vw,3rem)", fontFamily:"var(--font-display)" }}>
                got hardware to build?
              </h2>
              <p className="text-base text-zinc-400" style={{ fontFamily:"var(--font-body)" }}>
                napkin sketch, half-baked idea, or full spec — bring it. we'll design the full system: hardware, firmware, cloud, and dashboard.
              </p>
            </div>
            <FormCard accentColor={ACCENT}>
              <InquiryForm accentGradient={ACCENT_GRAD} accentColor={ACCENT} focusColor="#10b981" serviceDefault="IoT & Embedded Systems" />
            </FormCard>
          </div>
        </section>

      </div>
    </div>
  );
}