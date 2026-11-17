// Deep-dive content for each product's /portfolio/[id] page.
// Keyed by the product id in portfolio-data.ts. Edit the text here; the pages
// and their JSON-LD are generated from it.
//
// Playco and CafeBridge content comes from the founders' own decks.
// Other co-founder and market notes are drafts: check before publishing.

export const PHASES = ["Idea", "Prototype", "Testing / Pilot", "Launched", "Scaling"] as const;
export type Phase = (typeof PHASES)[number] | "On hold";

export type ProductDetail = {
  tagline: string;
  problem: string;
  solution: string;
  howItWorks: { title: string; text: string }[];
  phase: Phase;
  phaseNote: string;
  next: string[]; // what happens next on the roadmap
  // Who we are looking for. Omit for products that are on hold.
  cofounder?: {
    heading?: string; // defaults to "Co-founder we're looking for"
    role: string;
    why: string;
    skills: string[];
    responsibilities: string[];
    offer: string;
    cta?: string;
  };
  stack: { layer: string; items: string[] }[];
  business: {
    customers: string;
    revenue: { title: string; text: string }[];
    pricing: string;
    channels: string[];
  };
  market: {
    segment: string;
    whyNow: string[];
    alternatives: string;
    edge: string[];
    moments?: { title: string; text: string }[]; // shareable / use moments
  };
  // Optional deck-style blocks
  builtAlready?: string[];
  showcase?: {
    eyebrow: string;
    title: string;
    intro?: string;
    items: { icon: string; name: string; tagline: string; steps: string[]; note?: string }[];
  };
  plans?: {
    rows: { name: string; bestFor: string; price: string; platforms: string }[];
    notes: string[];
  };
  getStarted?: { title: string; text: string }[];
};

const COFOUNDER_OFFER =
  "Equity partnership with a defined vesting schedule, plus product ownership. Terms are agreed one-to-one after a trial collaboration.";

export const details: Record<string, ProductDetail> = {
  "water-tank": {
    tagline: "Know your tank level and run your pump from your phone. No wire to the roof, no plumber, no electrician.",
    problem:
      "Overhead tanks overflow or run dry because someone has to remember to switch the pump on and off. Wired float switches break, and running a cable from the roof to the pump room is costly and messy.",
    solution:
      "A wireless ultrasonic sensor on the tank sends its level over encrypted long-range LoRa radio to a pump controller. The controller switches the pump automatically and reports to a mobile app. It is a one-time purchase with a 1-year warranty and no major setup cost: the owner can fit it without a plumber or electrician.",
    howItWorks: [
      { title: "Sense", text: "An ESP32 with an ultrasonic sensor measures the water level on the tank." },
      { title: "Send", text: "Readings travel over LoRa 433 MHz, AES-128-GCM encrypted and paired to one pump unit." },
      { title: "Switch", text: "The pump unit turns the motor on and off, with auto cut-off at full and a max-runtime safety limit." },
      { title: "See", text: "The app shows live level and health; firmware updates arrive over the air." },
    ],
    phase: "Prototype",
    phaseNote: "Working modules. We are testing LoRa range and firmware now; next comes custom PCB design and production. The app is ready to publish on the Play Store.",
    next: ["Finish range and firmware testing", "Custom PCB design and printing", "Publish the app on the Play Store", "Build a distributor network"],
    cofounder: {
      role: "Marketing & sales co-founder, and distributors",
      why: "The product is built and EcoBridgers covers every hardware and software cost. What it needs now is people who can sell it: a marketer with strong ideas, a sales person, and above all distributors.",
      skills: ["Fresh marketing ideas for home and farm products", "Sales to homes, societies and farms", "Distributor and dealer networks", "Any city or region in India"],
      responsibilities: ["Plan launch and marketing campaigns", "Sell kits directly and through dealers", "Sign up distributors region by region", "Bring customer feedback to the team"],
      offer: "Co-founder (equity) for marketing or sales, or a distributor margin. EcoBridgers pays for all hardware and software.",
    },
    stack: [
      { layer: "Hardware", items: ["ESP32", "Ultrasonic sensor", "LoRa SX1278 (433 MHz)", "Relay pump board with buttons & buzzer", "Custom PCB (next)"] },
      { layer: "Firmware", items: ["C/C++", "AES-128-GCM link encryption", "OTA updates", "WiFiManager setup portal"] },
      { layer: "Cloud", items: ["MQTT over TLS", "EcoBridgers' own server", "SQL database"] },
      { layer: "App", items: ["Mobile app (Play Store release pending)"] },
    ],
    business: {
      customers: "Home owners, housing societies, schools, farms and facility managers.",
      revenue: [
        { title: "One-time sale", text: "Kit at about ₹4,000–5,000, with a 1-year warranty." },
        { title: "Distributors", text: "Distributors buy at trade price and sell in their region." },
        { title: "No extra fees", text: "No major setup cost and no plumber or electrician needed." },
      ],
      pricing: "About ₹4,000–5,000 one-time, including a 1-year warranty.",
      channels: ["Distributors (main channel)", "Direct sales", "Online marketplaces", "Marketing campaigns"],
    },
    market: {
      segment: "Homes, societies, schools and farms in India with overhead tanks and manually switched pumps.",
      whyNow: ["Water shortages make overflow waste visible", "Low-cost ESP32 and LoRa make wireless control affordable", "Everyone expects to control things from their phone"],
      alternatives: "Manual switching, wired float switches and wired level controllers that need an electrician.",
      edge: ["No wire to the roof", "Fit it yourself, no plumber or electrician", "Encrypted, paired link", "One-time price with 1-year warranty"],
    },
    plans: {
      rows: [{ name: "Water Tank kit", bestFor: "Homes, societies, schools and farms", price: "₹4,000–5,000 one-time", platforms: "Sensor + pump controller + app, 1-year warranty" }],
      notes: ["No major setup cost.", "No plumber or electrician needed.", "Distributor pricing on request."],
    },
  },

  "pcb-design-extension": {
    tagline: "Give a prompt, get a schematic, inside EasyEDA.",
    problem:
      "Drawing a schematic from scratch is slow, and beginners do not know which parts to pick or how to wire them. Even experienced engineers redraw the same circuits again and again.",
    solution:
      "An EasyEDA extension: describe the circuit and the schematic is drawn for you. You use your own AI tool; we provide the drawing tool that places parts and wires on the canvas, and prompt enhancement that turns a rough idea into a precise request.",
    howItWorks: [
      { title: "Prompt", text: "Describe the circuit, for example a 5 V regulator feeding an ESP32 with a status LED." },
      { title: "Enhance", text: "Our prompt enhancement turns it into a precise, structured request." },
      { title: "Your AI", text: "Your own AI tool works out the parts and connections." },
      { title: "Draw", text: "Our drawing tool places an editable schematic on the EasyEDA canvas." },
    ],
    phase: "Prototype",
    phaseNote: "Prototype only. Not yet public, and it stores no user data.",
    next: ["Finish the drawing tool", "Improve prompt enhancement", "Public release and pricing"],
    cofounder: {
      role: "Developer-tools growth co-founder",
      why: "When it goes public, users will come from engineering and maker communities. It needs someone who can grow that community.",
      skills: ["Developer or maker community growth", "Content and tutorials", "Product-led growth and pricing", "Electronics background is a plus"],
      responsibilities: ["Plan the public launch", "Grow users in maker, student and engineering communities", "Set pricing", "Collect feedback into the roadmap"],
      offer: COFOUNDER_OFFER,
    },
    stack: [
      { layer: "Platform", items: ["EasyEDA extension"] },
      { layer: "AI", items: ["Bring your own AI tool", "Prompt enhancement"] },
      { layer: "Drawing", items: ["Component placement", "Auto wiring"] },
      { layer: "Data", items: ["No database: nothing is stored"] },
    ],
    business: {
      customers: "Hardware startups, embedded engineers, students and hobbyists.",
      revenue: [
        { title: "To be decided", text: "Pricing will be set before the public release." },
      ],
      pricing: "Not decided yet.",
      channels: ["EasyEDA extension listing", "Maker and engineering communities", "College workshops"],
    },
    market: {
      segment: "Electronics design tools for students, hobbyists and small hardware teams.",
      whyNow: ["AI tools can now reason about circuits", "More students and startups build hardware", "Browser EDA tools like EasyEDA are widely used"],
      alternatives: "Drawing schematics by hand, reference designs and copying from datasheets.",
      edge: ["Works inside EasyEDA", "Use any AI tool you already have", "Output is fully editable"],
    },
  },

  cafebridge: {
    tagline: "One app for India's food sellers. Built first for street food.",
    problem:
      "Most street food stalls run on memory and a notebook. Owners guess their profit at the end of the day, lose track of cash versus UPI, leave rent and gas out of the numbers, and are told to buy billing machines they don't need.",
    solution:
      "CafeBridge turns the phone the seller already has into a billing and profit system. One sale takes about ten seconds, expenses are counted every day, and at night the owner sees real profit. Cafes and restaurants get the same app with a kitchen display, QR table ordering, inventory and staff logins.",
    howItWorks: [
      { title: "Tap the order", text: "Ravi orders a plate of pani puri. Tap the items on your phone and the total shows instantly." },
      { title: "Mark it paid", text: "Tap Paid Cash or Paid UPI. The order is saved. No notebook, no mental maths." },
      { title: "Rush hour?", text: "Skip the tapping and enter the day's counts at closing, like Aloo Puri x20." },
      { title: "See your profit", text: "At night: sales, expenses and best sellers, all ready." },
    ],
    phase: "Testing / Pilot",
    phaseNote: "The product is built and ready for launch. Sign-up takes 2 minutes and sellers take their first order the same day.",
    next: ["Launch for street food stalls", "Sales and marketing push city by city", "Grow the cafe and restaurant plans"],
    cofounder: {
      role: "Sales & marketing co-founder",
      why: "CafeBridge is ready to launch and EcoBridgers covers every development and server cost. What it needs now is sales and marketing to sign up food sellers.",
      skills: ["Field sales with stall, cafe and restaurant owners", "Local marketing ideas: WhatsApp, Instagram, on-ground", "Food, hospitality or retail network", "Hindi / Gujarati / local language"],
      responsibilities: ["Run demos and sign up sellers", "Plan and run marketing campaigns", "Build a local sales team", "Bring seller feedback to the team"],
      offer: "Equity-based co-founder role for sales and marketing. EcoBridgers pays for all development and running costs.",
    },
    stack: [
      { layer: "Apps", items: ["Flutter (Android, iOS, tablet)", "Desktop app (Pro, Max)", "Own website (Max)"] },
      { layer: "Backend", items: ["EcoBridgers' own server", "SQL database"] },
      { layer: "Payments", items: ["Razorpay (UPI & card)", "Autopay subscriptions"] },
      { layer: "Outputs", items: ["QR menu", "Menu PDF", "Profit dashboard", "KOT kitchen display"] },
    ],
    business: {
      customers: "Street food stalls, carts and small shops first; then cafes and restaurants.",
      revenue: [
        { title: "Monthly or yearly plans", text: "Lite ₹300, Pro ₹500 and Max ₹1,000 a month, or 10 months' price for a full year. Unlimited orders on every plan." },
        { title: "Website (Max)", text: "Max includes the cafe or restaurant's own website." },
        { title: "Add-ons", text: "Saving customers' mobile numbers is available at extra cost." },
      ],
      pricing: "From ₹300/month or ₹3,000/year. Lite is about ₹10 a day, less than one plate of pani puri. Pay by UPI or card through Razorpay, monthly, yearly or on autopay; cancel anytime.",
      channels: ["WhatsApp (reply within 24 hours)", "Free demo on the seller's own phone", "Word of mouth between stalls", "QR posters on carts that customers see"],
    },
    market: {
      segment: "India's food sellers: millions of street food stalls and carts, plus cafes and restaurants, most of whom still bill from memory or a notebook.",
      whyNow: ["UPI has made every stall a digital-payment business", "Every seller already owns a smartphone", "Rising rent and gas costs make profit tracking urgent"],
      alternatives: "Notebooks and memory, billing machines, and restaurant POS software priced for big outlets.",
      edge: ["Built street-food first", "Just your phone, no billing machine", "Real profit, including rent and gas", "Print the QR once, update the menu forever"],
    },
    builtAlready: [
      "Quick Orders: tap items, mark cash or UPI",
      "Bulk Entry: end-of-day counts on busy days",
      "QR Menu and Menu PDF with timings and UPI ID",
      "Expense tracking: rent and gas daily, plus one-time costs",
      "Profit dashboard by day, week or month",
      "For cafes: KOT display, QR table ordering, inventory and staff logins",
    ],
    showcase: {
      eyebrow: "QR menu",
      title: "Print once. Works forever.",
      intro: "Your menu on every customer's phone. Changed a price? Update the menu and the same printed QR opens the new one.",
      items: [
        { icon: "📝", name: "Make your menu", tagline: "In the app", steps: ["Add items and prices", "Pick your colour", "Add timings and phone", "Add your UPI ID"] },
        { icon: "🔳", name: "Get your QR", tagline: "One tap", steps: ["Tap Request QR", "Our team approves it", "The QR opens your menu PDF"] },
        { icon: "🖨️", name: "Print the poster", tagline: "Print once", steps: ["Shop name, QR and UPI ID", "Stick it on your cart", "No reprinting, ever"] },
      ],
    },
    plans: {
      rows: [
        { name: "Lite", bestFor: "Street food stalls and small shops", price: "₹300/month · ₹3,000/year", platforms: "Mobile app" },
        { name: "Pro", bestFor: "Cafes and restaurants", price: "₹500/month · ₹5,000/year", platforms: "Mobile + Desktop" },
        { name: "Max", bestFor: "Cafes and restaurants + own website", price: "₹1,000/month · ₹10,000/year", platforms: "Mobile + Desktop + Website + QR" },
      ],
      notes: [
        "Every plan has unlimited orders. Yearly plans cost the same as 10 months.",
        "Saving customers' mobile numbers is available at extra cost.",
        "Pay by UPI or card through Razorpay. Monthly, yearly or autopay; cancel anytime and your plan stays active till the period ends.",
        "Your data is yours: delete your account anytime and your shop data goes with it.",
      ],
    },
    getStarted: [
      { title: "WhatsApp us", text: "Get a response within 24 hours." },
      { title: "Free demo", text: "We show you the app on your own phone." },
      { title: "Go live", text: "Take your first order the same day." },
    ],
  },

  playco: {
    tagline: "Desi party games. One app. Endless masti.",
    problem:
      "Every gathering hits the same moment: \"Ab kya karein?\" Everyone is together, but everyone is on their own phone. Card games need setup, and most party games aren't made for desi groups.",
    solution:
      "Playco turns your phones into the party. Pick a game, invite the gang and start in under a minute. Three games today, Imposter, Colour Colour and Chor Police, with desi word packs like Bollywood, cricket, food and festivals.",
    howItWorks: [
      { title: "Pick a game", text: "Imposter, Colour Colour or Chor Police." },
      { title: "Invite the gang", text: "Play online on everyone's phone, or pass and play on one phone." },
      { title: "Play", text: "Bluff, run, snap or chase. Every round takes minutes." },
      { title: "Brag", text: "Friends, match history and leaderboards keep score." },
    ],
    phase: "Launched",
    phaseNote: "Live on Google Play, free to play, with ads switched on as the first revenue.",
    next: ["More games", "In-app purchases: premium word packs, ad-free play, special themes", "Creator-led growth on Instagram"],
    cofounder: {
      role: "Content creator & marketing co-founder",
      why: "The games are built and live. Growth now comes from content and marketing: Playco's moments are made for reels, and we need someone who creates them and markets the app.",
      skills: ["Makes Instagram reels, posts and stories", "Fresh ideas for viral and creator content", "Understands college and youth audiences", "Collaborations with creators"],
      responsibilities: ["Own Playco's Instagram and content calendar", "Run creator challenges (creators vs followers, hostel vs hostel)", "Grow installs through content", "Shape new games and themes with the team"],
      offer: "Equity-based co-founder role. Terms are agreed one-to-one.",
    },
    stack: [
      { layer: "App", items: ["Flutter (Android)", "Google Play"] },
      { layer: "Backend", items: ["EcoBridgers' own server", "SQL database", "Real-time online rooms"] },
      { layer: "Game tech", items: ["Camera colour matching", "Live location play area", "QR catch", "Team voice messages"] },
      { layer: "Revenue", items: ["Ads at natural breaks", "In-app purchases (planned)"] },
    ],
    business: {
      customers: "Players are free users; revenue comes from ads now and in-app purchases next.",
      revenue: [
        { title: "Ad revenue (live)", text: "Short ads at natural breaks, like after voting. Games stay free, so more friends join." },
        { title: "In-app purchases (future)", text: "Premium word packs, ad-free play, new games and special themes." },
      ],
      pricing: "Free to play on Google Play.",
      channels: ["Google Play", "Instagram reels and stories", "Creator collaborations", "Friends inviting friends to rooms"],
    },
    market: {
      segment: "Desi groups who play together: college and hostel friends, families on Diwali, Holi and wedding nights, office teams, cousins and society groups.",
      whyNow: ["Everyone carries a phone to every gathering", "Short-form video rewards funny group moments", "Few party games are made for Indian groups"],
      alternatives: "Card games that need setup, and global party apps that aren't made for desi groups.",
      edge: ["Desi word packs and games", "Starts in under a minute", "Online or one-phone pass and play", "Made for content"],
      moments: [
        { title: "Shareable moments", text: "The big reveal, the colour scramble, the outdoor chase and family face-offs. Made for reels and stories." },
        { title: "Creator hooks", text: "Creators vs followers, couple vs couple, hostel vs hostel. The content writes itself." },
      ],
    },
    builtAlready: [
      "Live on Google Play",
      "Three working games, with more planned",
      "Friends, history and leaderboards",
      "Ads switched on as the first revenue",
    ],
    showcase: {
      eyebrow: "The games",
      title: "Three games for friends and family",
      items: [
        {
          icon: "🕵️",
          name: "Imposter",
          tagline: "Find the faker with clues, bluffing and votes.",
          steps: [
            "Get your word. Most players share it; the imposter gets nothing, or a sneaky look-alike.",
            "Drop a clue. One hint each, clever but not obvious.",
            "Discuss and vote. Who's acting sus?",
            "Win. The crew catches the imposter, or the imposter fools everyone.",
          ],
          note: "Play online on everyone's phone, or pass and play on one phone.",
        },
        {
          icon: "🎨",
          name: "Colour Colour",
          tagline: "Race to snap a real object that matches the colour.",
          steps: [
            "See the colour. Everyone gets the same one at the same time, like RED.",
            "Run! Find a real object of that colour around you.",
            "Snap it in the app. Playco checks the match.",
            "Survive. The slowest player is out. Last one standing wins.",
          ],
          note: "Fair play: photos of a screen can be reported by the group.",
        },
        {
          icon: "🚓",
          name: "Chor Police",
          tagline: "The childhood chase, now with a live play area and teams.",
          steps: [
            "The host draws the play area. Teams are picked at random.",
            "Chor get a head start to hide. Police wait.",
            "Every few minutes, police see where the chor are. Scan a chor's QR code to catch them.",
            "Send quick voice messages to your own team only.",
          ],
          note: "Police win by catching every chor; chor win if even one stays free. Location is shared only during a match, then deleted.",
        },
      ],
    },
  },

  textilebridge: {
    tagline: "Production and inventory control for textile units.",
    problem:
      "Many small textile units track yarn, fabric and orders in registers or spreadsheets, which leads to stock mismatches, missed deadlines and no clear view of production.",
    solution:
      "TextileBridge is a cloud system that tracks production orders, yarn and fabric stock, suppliers and buyers in real time, with dashboards for owners.",
    howItWorks: [
      { title: "Record", text: "Log yarn and fabric in and out of stock." },
      { title: "Plan", text: "Create production orders and assign them to machines or job-workers." },
      { title: "Track", text: "Follow each order through its stages." },
      { title: "Report", text: "See dashboards for stock, orders and buyers." },
    ],
    phase: "On hold",
    phaseNote: "A side project, not our current focus. We will pick it up again after our main products are rolled out.",
    next: ["Resume after the main products launch", "Pilot units in the Surat textile cluster"],
    stack: [
      { layer: "Web & mobile", items: ["Cloud dashboard", "Mobile access"] },
      { layer: "Backend", items: ["Firebase", "Multi-tenant SaaS", "Multi-user roles"] },
      { layer: "Data", items: ["Real-time inventory", "Reports"] },
    ],
    business: {
      customers: "Weaving, knitting and processing units, traders and job-workers.",
      revenue: [
        { title: "Monthly subscription", text: "Per-unit SaaS plan by users or modules." },
        { title: "Implementation", text: "Setup, data migration and training." },
        { title: "Custom modules", text: "Paid workflow changes for larger units." },
      ],
      pricing: "Basic ₹500/mo and Pro ₹1,000/mo, plus optional implementation.",
      channels: ["Direct sales in textile clusters", "Industry associations", "Implementation partners", "Referrals"],
    },
    market: {
      segment: "Small and mid-size textile manufacturers and traders, starting with Surat, one of India's largest textile hubs.",
      whyNow: ["Pressure to cut waste and meet delivery dates", "GST and digital records push units off paper", "Owners now use smartphones daily"],
      alternatives: "Registers, spreadsheets, generic accounting software and costly ERP suites.",
      edge: ["Built for textile workflows", "Affordable for small units", "Built locally in Surat"],
    },
  },

  turfbridge: {
    tagline: "Bookings, payments and members for sports turfs.",
    problem:
      "Turf owners take bookings over phone calls and WhatsApp, which causes double bookings, missed payments and no clear revenue records.",
    solution:
      "TurfBridge gives venues an online booking calendar, payment tracking, member management and daily revenue reports in one place.",
    howItWorks: [
      { title: "Book", text: "Players book open slots online." },
      { title: "Pay", text: "UPI and cash payments are tracked against each booking." },
      { title: "Retain", text: "Members and loyalty keep regular teams coming back." },
      { title: "Report", text: "Owners see daily revenue and occupancy." },
    ],
    phase: "On hold",
    phaseNote: "A side project, not our current focus. We will pick it up again after our main products are rolled out.",
    next: ["Resume after the main products launch", "Pilot venues"],
    stack: [
      { layer: "Web & mobile", items: ["Booking web app", "Owner dashboard"] },
      { layer: "Backend", items: ["Firebase", "Booking engine", "Payments tracking", "SaaS multi-venue"] },
    ],
    business: {
      customers: "Box cricket grounds, turf owners and sports complexes.",
      revenue: [
        { title: "Venue subscription", text: "₹500/mo per venue after a 3-month free trial." },
        { title: "Booking fee", text: "Small fee on online bookings." },
        { title: "Sponsorships", text: "Brand tie-ups and tournaments." },
      ],
      pricing: "₹500/mo per venue after a 3-month free trial.",
      channels: ["Direct venue sales", "Player word of mouth", "Sports brands", "Referrals"],
    },
    market: {
      segment: "Box cricket and multi-sport turf venues in Indian cities.",
      whyNow: ["Rapid growth of turf venues in cities", "Players expect to book online", "UPI makes digital payment easy"],
      alternatives: "Phone and WhatsApp bookings, registers and generic booking apps.",
      edge: ["Made for turf workflows", "Simple for owners", "Revenue reports built in"],
    },
  },

  "machine-counter": {
    tagline: "Every roll from every circular knitting machine, counted, with a daily production report.",
    problem:
      "Knitting units track rolls by hand: operators note counts on paper, owners can't see what each machine produced, and losses from idle machines and wrong counts go unnoticed until the month ends.",
    solution:
      "Machine Counter fits a counter device to each circular knitting machine that counts every roll automatically. The data goes to our management software, which gives owners a daily production report for every machine.",
    howItWorks: [
      { title: "Fit", text: "A counter device is installed on each circular knitting machine." },
      { title: "Count", text: "Every roll the machine produces is counted automatically." },
      { title: "Collect", text: "Counts go to EcoBridgers' own server and SQL database." },
      { title: "Report", text: "Owners get a daily production report and management software." },
    ],
    phase: "Testing / Pilot",
    phaseNote: "The PCB is ready and we are in the second phase of testing on 1–2 machines with partners. Partners are in place; now we are looking for clients to scale.",
    next: ["Finish phase-2 testing", "Sign the first client units", "Scale to more knitting units"],
    cofounder: {
      heading: "Clients we're looking for",
      role: "Knitting units with circular machines",
      why: "We already have many partners. To scale, we need clients: units that run circular knitting machines and want an exact daily count of every roll.",
      skills: ["You run circular knitting machines", "You want daily roll counts per machine", "You want reports without paperwork", "You are in Surat, Gujarat or anywhere in India"],
      responsibilities: ["Tell us how many machines you run", "We handle setup and installation with our partners", "You get daily production reports", "One-time device price, then a small yearly fee"],
      offer: "₹3,000–5,000 one-time per device, then ₹100–200 per device per year from the second year. Setup and installation are handled by us and our partners.",
      cta: "Get Machine Counter for your unit",
    },
    stack: [
      { layer: "Hardware", items: ["Counter device per machine", "Custom PCB (ready)"] },
      { layer: "Backend", items: ["EcoBridgers' own server", "SQL database"] },
      { layer: "Software", items: ["Management software", "Daily production reports"] },
    ],
    business: {
      customers: "Knitting units and textile production businesses that run circular knitting machines.",
      revenue: [
        { title: "One-time device", text: "₹3,000–5,000 per machine." },
        { title: "Yearly subscription", text: "₹100–200 per device per year, from the second year." },
        { title: "Partner network", text: "Partners help with setup, installation and reaching units." },
      ],
      pricing: "₹3,000–5,000 one-time per device, then ₹100–200 per device per year after the first year.",
      channels: ["Our website", "Existing partners", "Direct visits to knitting units", "Referrals from running units"],
    },
    market: {
      segment: "Units with circular knitting machines in India's textile clusters, starting with Surat and Gujarat.",
      whyNow: ["Tight margins push owners to measure every roll", "Low-cost electronics make per-machine counting affordable", "Owners want reports on their phone"],
      alternatives: "Manual roll tallies on paper and operator-reported counts.",
      edge: ["Counts every roll automatically", "Low one-time price, tiny yearly fee", "Strong partner network for installation", "Data on our own secure server"],
    },
    plans: {
      rows: [
        { name: "Counter device", bestFor: "Each circular knitting machine", price: "₹3,000–5,000 one-time", platforms: "Device + management software + daily reports" },
        { name: "Yearly renewal", bestFor: "From the second year", price: "₹100–200 / device / year", platforms: "Software, reports and support" },
      ],
      notes: ["Setup and installation are handled by us and our partners.", "Price depends on the number of machines."],
    },
    builtAlready: ["Counter PCB ready", "Phase-2 testing on 1–2 machines with partners", "Daily production reports", "Management software", "Partner network in place"],
  },

  "magic-outline": {
    tagline: "Clean production outlines from any design, inside Photoshop. Hours of tracing, done in minutes.",
    problem:
      "Textile designers spend hours manually tracing outlines from artwork before it can go to production.",
    solution:
      "Magic Outline is a Photoshop plugin that extracts clean outlines from any design, layer by layer. Today it is built for digital printing; embroidery support comes next.",
    howItWorks: [
      { title: "Open", text: "Open the design in Adobe Photoshop." },
      { title: "Select", text: "Choose the layers to process." },
      { title: "Extract", text: "The plugin generates outlines for each layer." },
      { title: "Print", text: "Send the outlines to digital printing." },
    ],
    phase: "Testing / Pilot",
    phaseNote: "Prototype in testing. The product website is ready.",
    next: ["Finish testing with designers", "Add embroidery support", "Set pricing and launch"],
    cofounder: {
      role: "Textile design & sales co-founder",
      why: "Buyers are designers and mills. It needs someone who knows their workflow and can sell to them.",
      skills: ["Textile or print design experience", "Adobe Photoshop expertise", "Network of designers and mills", "Sales to studios"],
      responsibilities: ["Run tests with designers", "Shape the embroidery version", "Sell to designers and mills", "Create tutorials"],
      offer: COFOUNDER_OFFER,
    },
    stack: [
      { layer: "Platform", items: ["Adobe Photoshop plugin"] },
      { layer: "Processing", items: ["Image processing", "Layer-by-layer outline extraction"] },
      { layer: "Backend", items: ["EcoBridgers' own server", "SQL database"] },
      { layer: "Output", items: ["Digital printing (now)", "Embroidery (next)"] },
    ],
    business: {
      customers: "Textile designers and mills.",
      revenue: [
        { title: "To be decided", text: "Pricing will be set after testing." },
      ],
      pricing: "Not decided yet. Contact us for early access.",
      channels: ["Product website", "Direct sales to designers and mills", "Textile hubs like Surat"],
    },
    market: {
      segment: "Textile designers and mills that prepare designs for digital printing, and later embroidery.",
      whyNow: ["Faster design cycles in fashion and textiles", "Photoshop is the standard tool in studios", "Manual tracing is a known bottleneck"],
      alternatives: "Manual tracing and expensive textile CAD software.",
      edge: ["Saves hours per design", "Works inside Photoshop", "Layer by layer"],
    },
  },
};
