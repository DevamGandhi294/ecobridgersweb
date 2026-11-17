// Single source of truth for the /portfolio page: the visible content and the
// JSON-LD structured data are both generated from these arrays, so they never drift.

export const SITE_URL = "https://ecobridgers.com";
export const PORTFOLIO_URL = `${SITE_URL}/portfolio`;
export const PORTFOLIO_UPDATED = "2026-11-17";

export type PortfolioProduct = {
  id: string; // used as the on-page anchor (#id) and the JSON-LD @id fragment
  name: string;
  icon: string;
  category: string;
  schemaCategory: string; // schema.org applicationCategory
  platforms: string;
  summary: string; // one-sentence, answer-first definition (quoted by answer engines)
  audience: string;
  features: string[];
  tech: string[];
  partnerModels: string[];
  href?: string; // dedicated product page, when one exists
  externalUrl?: string;
  externalLabel?: string;
  accent: string;
};

export type PortfolioService = {
  id: string;
  name: string;
  icon: string;
  summary: string;
  deliverables: string[];
  href: string;
  accent: string;
};

export const products: PortfolioProduct[] = [
  {
    id: "machine-counter",
    name: "Machine Counter",
    icon: "🧶",
    category: "IoT · Textile & Production",
    schemaCategory: "BusinessApplication",
    platforms: "Counter device + management software · ₹3,000–5,000 per device",
    summary:
      "Machine Counter counts every roll from each circular knitting machine and turns it into a daily production report, with management software for owners. ₹3,000–5,000 one-time per device, then ₹100–200 per device per year. PCB ready and in phase-2 testing with partners.",
    audience: "Circular knitting units and textile production businesses",
    features: [
      "Counts every roll on each circular knitting machine",
      "Daily production report per machine",
      "Management software for owners and supervisors",
      "Data on EcoBridgers' own server",
    ],
    tech: ["Machine counters", "Own server + SQL", "Production reports"],
    partnerModels: ["Clients: knitting units with circular machines", "Sales partners", "Existing installation partners"],
    accent: "#2dd4bf",
  },
  {
    id: "water-tank",
    name: "Water Tank",
    icon: "💧",
    category: "IoT · Smart Water",
    schemaCategory: "UtilitiesApplication",
    platforms: "ESP32 hardware + mobile app · Prototype",
    summary:
      "Water Tank is a smart water-level controller: an ultrasonic sensor on the tank sends encrypted long-range LoRa readings to an ESP32 pump unit that you control from a mobile app. About ₹4,000–5,000 one-time with a 1-year warranty; no plumber or electrician needed.",
    audience: "Homes, housing societies, farms, schools and facility managers",
    features: [
      "Wireless ultrasonic tank level over LoRa 433 MHz, no cable to the roof",
      "AES-128 encrypted, paired sender-to-pump link",
      "Pump ON/OFF from the app or two physical buttons",
      "Auto cut-off at full tank and max-runtime safety limit",
      "Live status: working, sensor down, link fault",
      "Wi-Fi setup portal and over-the-air firmware updates",
    ],
    tech: ["ESP32", "LoRa SX1278", "MQTT over TLS", "OTA updates", "Own server + SQL", "Mobile app"],
    partnerModels: ["Distributors (main need)", "Sales partners", "Marketing co-founder"],
    accent: "#22d3ee",
  },
  {
    id: "cafebridge",
    name: "CafeBridge",
    icon: "☕",
    category: "SaaS · Street Food, Cafes & Restaurants",
    schemaCategory: "BusinessApplication",
    platforms: "Phone, tablet & desktop · from ₹300/month",
    summary:
      "CafeBridge is one app for India's food sellers, built first for street food: billing on your phone in ten seconds, cash and UPI tracking, daily expenses and real profit, plus a kitchen display, QR ordering and inventory for cafes and restaurants.",
    audience: "Street food stalls and carts, small shops, cafes and restaurants",
    features: [
      "Quick orders: tap items, mark cash or UPI",
      "Bulk entry of end-of-day counts on busy days",
      "Daily profit after rent, gas and other expenses",
      "QR menu and menu PDF with UPI ID; print once, update forever",
      "KOT kitchen display, QR table ordering, inventory, staff logins",
      "Just your phone, no billing machine; unlimited orders",
    ],
    tech: ["Flutter", "Own server + SQL", "Razorpay", "QR menu"],
    partnerModels: ["Field sales & referral partners", "Food market associations", "Restaurant website bundles (Max)"],
    href: "/work/cafebridge",
    accent: "#f59e0b",
  },
  {
    id: "playco",
    name: "Playco",
    icon: "🎮",
    category: "Mobile Games · Social",
    schemaCategory: "GameApplication",
    platforms: "Android (Google Play) · Free",
    summary:
      "Playco is a free app of desi party games for friends and family, live on Google Play, with three games: Imposter (find the faker with clues and votes), Colour Colour (race to snap a real object of the colour) and Chor Police (a live-location chase in teams).",
    audience: "College and hostel friends, families, office teams and society groups",
    features: [
      "Imposter: clues, bluffing and votes, online or pass and play",
      "Colour Colour: snap a real object, the app checks the match",
      "Chor Police: live play area, QR catch, team voice messages",
      "Desi word packs: Bollywood, cricket, food, festivals",
      "Friends, match history and leaderboards",
      "Starts in under a minute",
    ],
    tech: ["Flutter", "Own server + SQL", "Real-time rooms", "Camera & location play"],
    partnerModels: ["Creator & influencer collaborations", "Brand-sponsored word packs", "Campus & community events"],
    href: "/work/playco",
    externalUrl: "https://play.google.com/store/apps/details?id=com.ecobridgers.playco",
    externalLabel: "Get it on Google Play",
    accent: "#a78bfa",
  },
  {
    id: "magic-outline",
    name: "Magic Outline",
    icon: "✂️",
    category: "Design Tool · Textile",
    schemaCategory: "DesignApplication",
    platforms: "Adobe Photoshop plugin · Testing phase",
    summary:
      "Magic Outline is a Photoshop plugin that extracts clean outlines from any design, layer by layer, saving designers hours of manual tracing. It supports digital printing today, with embroidery next, and is in testing.",
    audience: "Textile designers and mills",
    features: [
      "Outlines from any design, layer by layer",
      "Runs inside Adobe Photoshop",
      "Digital printing today, embroidery next",
      "Saves hours of manual tracing",
    ],
    tech: ["Photoshop plugin", "Image processing", "Own server + SQL"],
    partnerModels: ["Designers and mills as early users", "Sales co-founder", "Textile CAD integrations"],
    accent: "#f472b6",
  },
  {
    id: "pcb-design-extension",
    name: "PCB Design Extension",
    icon: "📐",
    category: "AI · Electronics Design",
    schemaCategory: "DesignApplication",
    platforms: "EasyEDA extension · Prototype",
    summary:
      "PCB Design Extension is an EasyEDA extension that draws a circuit schematic from a plain-language prompt. You bring your own AI tool; we provide the drawing tool and prompt enhancement. It is a prototype.",
    audience: "Hardware startups, embedded engineers, students and electronics hobbyists",
    features: [
      "Prompt-to-schematic inside EasyEDA",
      "Works with your own AI tool",
      "Prompt enhancement for precise results",
      "Components and wires placed automatically",
      "Editable like any EasyEDA schematic",
    ],
    tech: ["EasyEDA", "Bring your own AI", "Prompt enhancement", "No database"],
    partnerModels: ["Electronics distributors & PCB fabs", "Colleges & maker labs", "EDA tool integrations"],
    accent: "#38bdf8",
  },
  {
    id: "textilebridge",
    name: "TextileBridge",
    icon: "🧵",
    category: "SaaS · Textile Manufacturing",
    schemaCategory: "BusinessApplication",
    platforms: "Web & mobile · On hold",
    summary:
      "TextileBridge is production and inventory management software for small and mid-size textile units, tracking yarn, fabric, orders and production in real time.",
    audience: "Weaving, knitting and processing units, traders and job-workers",
    features: [
      "Production order tracking",
      "Yarn and fabric inventory",
      "Supplier and buyer management",
      "Real-time dashboards and reports",
    ],
    tech: ["SaaS", "Firebase", "Cloud dashboard", "Multi-user roles"],
    partnerModels: ["Industry association tie-ups", "Implementation partners", "Reseller in textile clusters"],
    href: "/work/textilebridge",
    accent: "#10b981",
  },
  {
    id: "turfbridge",
    name: "TurfBridge",
    icon: "🏏",
    category: "SaaS · Sports Venues",
    schemaCategory: "BusinessApplication",
    platforms: "Web & mobile · On hold",
    summary:
      "TurfBridge is a booking and management platform for box cricket and sports turf venues, covering slot bookings, payments, members and daily revenue reports.",
    audience: "Box cricket grounds, turf owners and sports complexes",
    features: [
      "Online slot booking and calendar",
      "UPI and cash payment tracking",
      "Member and loyalty management",
      "Daily revenue reports",
    ],
    tech: ["SaaS", "Firebase", "Booking engine", "Payments"],
    partnerModels: ["Venue network partners", "Sports brand collaborations", "Referral programme"],
    href: "/work/turfbridge",
    accent: "#c084fc",
  },
];

export const services: PortfolioService[] = [
  {
    id: "biotsense",
    name: "BIoTSense: Machine Health Monitoring",
    icon: "⚙️",
    summary:
      "We attach vibration, temperature and current sensors to your machines and stream them to a live dashboard that flags anomalies before a breakdown.",
    deliverables: ["Sensor nodes and installation", "Live telemetry dashboard", "Anomaly and fault alerts", "Multi-machine, multi-site setup"],
    href: "/work/biotsense",
    accent: "#34d399",
  },
  {
    id: "saas-development",
    name: "SaaS Product Development",
    icon: "💡",
    summary:
      "We design and build multi-tenant SaaS products, from MVP to production, with billing, roles and analytics.",
    deliverables: ["Product discovery & MVP", "Multi-tenant architecture", "Subscriptions & billing", "Admin & analytics"],
    href: "/services/saas",
    accent: "#10b981",
  },
  {
    id: "iot-embedded",
    name: "IoT & Embedded Systems",
    icon: "🔌",
    summary:
      "We build connected hardware end to end: ESP32/STM32 firmware, sensors, LoRa and MQTT connectivity, OTA updates and real-time dashboards.",
    deliverables: ["Firmware (ESP32, STM32)", "Sensor & radio integration", "MQTT / cloud backend", "Prototype to pilot batch"],
    href: "/services/iot",
    accent: "#22d3ee",
  },
  {
    id: "app-development",
    name: "Mobile App Development",
    icon: "📱",
    summary:
      "We ship Android and iOS apps in Flutter and React Native, including apps that control and monitor IoT devices.",
    deliverables: ["Flutter & React Native", "Firebase / custom backend", "IoT companion apps", "Play Store & App Store release"],
    href: "/services/app",
    accent: "#a78bfa",
  },
  {
    id: "web-cloud",
    name: "Web & Cloud Platforms",
    icon: "🌐",
    summary:
      "We build fast, SEO-ready web platforms and cloud backends with Next.js, React, Node.js, Supabase and AWS.",
    deliverables: ["Next.js & React web apps", "APIs & databases", "Cloud hosting on AWS", "SEO & performance"],
    href: "/services/web",
    accent: "#f59e0b",
  },
];

export const partnershipModels = [
  {
    icon: "🤝",
    title: "Reseller & referral",
    text: "Sell our products to your customers and earn a recurring share. We handle onboarding and support.",
  },
  {
    icon: "🏷️",
    title: "White-label",
    text: "Offer the Water Tank controller under your own brand.",
  },
  {
    icon: "🛠️",
    title: "Co-development",
    text: "Bring the domain knowledge or the customers. We bring hardware, firmware, apps and cloud.",
  },
  {
    icon: "🏭",
    title: "Hardware & distribution",
    text: "Manufacture, stock or install our IoT devices in your region.",
  },
  {
    icon: "🧪",
    title: "Pilot deployments",
    text: "Run a time-boxed pilot at your site before you commit to a rollout.",
  },
  {
    icon: "🎓",
    title: "Research & academia",
    text: "Joint IoT and embedded research projects, internships and lab collaborations.",
  },
];

export const processSteps = [
  { n: "01", title: "Intro call", text: "Tell us who you serve and what you want to offer. 30 minutes, no cost." },
  { n: "02", title: "Pick a model", text: "We agree on a model: reseller, white-label, co-development or a pilot." },
  { n: "03", title: "Pilot", text: "A small, measurable rollout with your first customers or at your site." },
  { n: "04", title: "Scale", text: "Shared roadmap, training for your team and ongoing technical support." },
];

export const portfolioFaqs = [
  {
    q: "What products does EcoBridgers offer?",
    a: "EcoBridgers builds eight products: Machine Counter (roll counting and daily production reports for circular knitting machines, ₹3,000–5,000 per device), Water Tank (a LoRa smart water-level and pump controller, about ₹4,000–5,000 one-time), CafeBridge (billing and profit app for street food stalls, cafes and restaurants, from ₹300/month), Playco (desi party games on Google Play), Magic Outline (a Photoshop plugin that extracts outlines layer by layer for digital printing), PCB Design Extension (a prototype EasyEDA extension that turns a prompt into a schematic), and two products on hold: TextileBridge and TurfBridge.",
  },
  {
    q: "What services does EcoBridgers provide?",
    a: "EcoBridgers provides BIoTSense machine health monitoring, SaaS product development, IoT and embedded systems engineering, mobile app development, and web and cloud platform development.",
  },
  {
    q: "How can I partner or collaborate with EcoBridgers?",
    a: "You can partner as a reseller or referral partner, white-label our products under your brand, co-develop a new product with us, distribute or install our IoT hardware, run a pilot deployment, or start a research collaboration. Write to ecobridgers.tech@gmail.com or use the contact form at ecobridgers.com/contact.",
  },
  {
    q: "Can EcoBridgers products be white-labelled?",
    a: "Yes. The Water Tank controller can be offered under a partner's brand, with custom branding, domain and pricing.",
  },
  {
    q: "Where is EcoBridgers based and which regions do you serve?",
    a: "EcoBridgers is based in Surat, Gujarat, India. We work with partners across India and remotely with partners worldwide.",
  },
  {
    q: "What technology does EcoBridgers use?",
    a: "Our IoT products use ESP32 and STM32 microcontrollers, LoRa and MQTT over TLS with over-the-air updates. Our apps use Flutter. Playco, CafeBridge, Machine Counter, Magic Outline and Water Tank store data on our own servers in SQL databases, while TextileBridge and TurfBridge use Firebase. Our web platforms use Next.js, React, Node.js, Supabase and AWS.",
  },
  {
    q: "How does EcoBridgers build IoT hardware and cloud systems?",
    a: "We handle the complete IoT lifecycle: circuit schematics, sensor modules (vibration, temperature, current, gas, ultrasonic level), firmware in C/C++, LoRa or Wi-Fi links to MQTT brokers, over-the-air updates, and real-time web and mobile dashboards on the cloud.",
  },
  {
    q: "Can EcoBridgers products be customised for a partner's customers?",
    a: "Yes. Our products use a modular, multi-tenant architecture, so we can customise workflows, user roles, integrations, branding and pricing for a partner or a specific customer segment.",
  },
];
