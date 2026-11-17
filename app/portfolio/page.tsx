import type { Metadata } from "next";
import Link from "next/link";
import {
  PORTFOLIO_URL,
  PORTFOLIO_UPDATED,
  SITE_URL,
  partnershipModels,
  portfolioFaqs,
  processSteps,
  products,
  services,
} from "./portfolio-data";
import { details } from "./portfolio-details";

const TITLE = "Portfolio for Partners: Products & Services";
const DESCRIPTION =
  "EcoBridgers partner portfolio: 8 products, including CafeBridge for street food and cafes, Playco desi party games, Machine Counter for knitting units and the Water Tank LoRa controller, plus 5 services across IoT, SaaS, apps and cloud. Reseller, white-label and co-development models.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PORTFOLIO_URL },
  keywords: [
    "EcoBridgers portfolio",
    "EcoBridgers products",
    "partner with EcoBridgers",
    "IoT company partnership India",
    "white label SaaS India",
    "SaaS reseller program India",
    "smart water tank controller",
    "LoRa water level controller",
    "restaurant POS and KDS",
    "textile ERP software",
    "turf booking software",
    "AI schematic generator EasyEDA",
    "prompt to PCB schematic",
    "Photoshop textile outline plugin",
    "Magic Outline Photoshop plugin",
    "circular knitting machine counter",
    "street food billing app",
    "desi party games app",
    "IoT development company Surat",
    "embedded systems partner Gujarat",
  ],
  openGraph: {
    type: "website",
    url: PORTFOLIO_URL,
    siteName: "EcoBridgers",
    locale: "en_IN",
    title: "EcoBridgers Portfolio: Products & Services for Partners",
    description: DESCRIPTION,
    images: [{ url: "/logo.png", width: 749, height: 749, alt: "EcoBridgers partner portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoBridgers Portfolio: Products & Services for Partners",
    description: DESCRIPTION,
    images: ["/logo.png"],
  },
};

const ORG_ID = `${SITE_URL}/#organization`;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PORTFOLIO_URL}#webpage`,
    url: PORTFOLIO_URL,
    name: "EcoBridgers Portfolio: Products & Services for Partners",
    description: DESCRIPTION,
    inLanguage: "en-IN",
    dateModified: PORTFOLIO_UPDATED,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    audience: { "@type": "BusinessAudience", audienceType: "Partners, resellers, distributors and collaborators" },
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["#portfolio-summary", "#faq"] },
    mainEntity: { "@id": `${PORTFOLIO_URL}#products` },
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${PORTFOLIO_URL}#products`,
    name: "EcoBridgers products",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "SoftwareApplication",
        "@id": `${PORTFOLIO_URL}#${p.id}`,
        name: p.name,
        description: p.summary,
        applicationCategory: p.schemaCategory,
        operatingSystem: p.platforms,
        url: details[p.id] ? `${PORTFOLIO_URL}/${p.id}` : p.href ? `${SITE_URL}${p.href}` : `${PORTFOLIO_URL}#${p.id}`,
        ...(p.externalUrl ? { downloadUrl: p.externalUrl, sameAs: [p.externalUrl] } : {}),
        featureList: p.features,
        audience: { "@type": "Audience", audienceType: p.audience },
        creator: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${PORTFOLIO_URL}#services`,
    name: "EcoBridgers services",
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        "@id": `${PORTFOLIO_URL}#${s.id}`,
        name: s.name,
        description: s.summary,
        url: `${SITE_URL}${s.href}`,
        serviceOutput: s.deliverables.join(", "),
        provider: { "@id": ORG_ID },
        areaServed: [{ "@type": "Country", name: "India" }, "Worldwide"],
      },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "EcoBridgers",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: "ecobridgers.tech@gmail.com",
    telephone: "+91-78629-49437",
    address: { "@type": "PostalAddress", addressLocality: "Surat", addressRegion: "Gujarat", addressCountry: "IN" },
    knowsAbout: ["IoT", "Embedded systems", "LoRa", "ESP32", "SaaS", "Flutter", "Next.js", "Firebase", "MQTT"],
    makesOffer: partnershipModels.map((m) => ({
      "@type": "Offer",
      name: `${m.title} partnership`,
      description: m.text,
      businessFunction: "http://purl.org/goodrelations/v1#ProvideService",
    })),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "partnerships",
      email: "ecobridgers.tech@gmail.com",
      telephone: "+91-78629-49437",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${PORTFOLIO_URL}#faq`,
    mainEntity: portfolioFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: PORTFOLIO_URL },
    ],
  },
];

const gradientText = {
  background: "linear-gradient(135deg,#10b981,#34d399,#22d3ee)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const Arrow = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 sm:text-base";
const ghostBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 sm:text-base";

function SectionHeading({ eyebrow, title, text, id }: { eyebrow: string; title: string; text?: string; id: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500/80">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
      {text && <p className="mt-3 text-base leading-relaxed text-zinc-400">{text}</p>}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="mx-auto max-w-screen-xl space-y-24 px-4 pb-24 pt-10 sm:px-6 lg:px-10 xl:px-16">
        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="text-xs text-zinc-500">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-emerald-400">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-zinc-300">Portfolio</li>
          </ol>
        </nav>

        {/* ── Hero ── */}
        <header className="relative -mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-emerald-950/20 to-zinc-900 p-8 sm:p-14">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
            <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
          </div>
          <div className="relative max-w-4xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-400">
              For partners &amp; collaborators
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
              EcoBridgers <span style={gradientText}>Portfolio</span>
            </h1>
            <p id="portfolio-summary" className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-300">
              EcoBridgers is an IoT, embedded systems and SaaS company in Surat, India. We build and own{" "}
              <strong className="text-white">{products.length} products</strong>: {products.map((p) => p.name).join(", ")}. We also deliver <strong className="text-white">{services.length} services</strong>:
              BIoTSense machine monitoring, SaaS, IoT &amp; embedded, mobile apps and web &amp; cloud. Partners can resell,
              white-label, distribute or co-develop with us.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className={primaryBtn}>
                Become a partner <Arrow className="h-5 w-5" />
              </Link>
              <a href="#products" className={ghostBtn}>Explore products</a>
            </div>
          </div>

          <dl className="relative mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { k: "Products", v: String(products.length) },
              { k: "Services", v: String(services.length) },
              { k: "Partner models", v: String(partnershipModels.length) },
              { k: "Based in", v: "Surat, IN" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <dt className="text-[11px] uppercase tracking-widest text-zinc-500">{s.k}</dt>
                <dd className="mt-1 text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{s.v}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* ── In-page nav ── */}
        <nav aria-label="Portfolio sections" className="-mt-12 flex flex-wrap gap-2">
          {[
            ...products.map((p) => ({ id: p.id, label: `${p.icon} ${p.name}` })),
            { id: "services", label: "🧩 Services" },
            { id: "partner-models", label: "🤝 Partner models" },
            { id: "faq", label: "❓ FAQ" },
          ].map((l) => (
            <a key={l.id} href={`#${l.id}`} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:border-emerald-500/40 hover:text-emerald-400">
              {l.label}
            </a>
          ))}
        </nav>

        {/* ── Products ── */}
        <section id="products" aria-labelledby="products-heading" className="scroll-mt-28">
          <SectionHeading
            id="products-heading"
            eyebrow="Our own IP"
            title="Products"
            text="Designed, built and run by our team. Every product below is open to reseller, white-label or distribution partnerships."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {products.map((p) => (
              <article
                key={p.id}
                id={p.id}
                aria-labelledby={`${p.id}-title`}
                className="group relative flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#080c18] p-6 transition-all hover:border-white/20 sm:p-8"
              >
                <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-20 blur-[80px] transition-opacity group-hover:opacity-30" style={{ background: p.accent }} aria-hidden="true" />
                <div className="relative flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl" aria-hidden="true">{p.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: p.accent }}>{p.category}</p>
                    <h3 id={`${p.id}-title`} className="mt-1 text-2xl font-bold text-white">{p.name}</h3>
                    <p className="text-xs text-zinc-500">{p.platforms}</p>
                    {details[p.id] && (
                      <p className="mt-1.5 inline-flex rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-semibold text-zinc-300">Phase: {details[p.id].phase}</p>
                    )}
                  </div>
                </div>

                <p className="relative mt-5 text-sm leading-relaxed text-zinc-300">{p.summary}</p>
                <p className="relative mt-3 text-sm text-zinc-400"><span className="font-semibold text-zinc-300">Built for:</span> {p.audience}</p>

                <ul className="relative mt-5 grid gap-2 sm:grid-cols-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-5 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] text-zinc-400">{t}</span>
                  ))}
                </div>

                <div className="relative mt-6 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">Partner opportunities</p>
                  <p className="mt-1 text-sm text-zinc-300">{p.partnerModels.join(" · ")}</p>
                </div>

                <div className="relative mt-6 flex flex-1 flex-wrap items-end gap-3">
                  {details[p.id] && (
                    <Link
                      href={`/portfolio/${p.id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40"
                    >
                      View full details <Arrow />
                    </Link>
                  )}
                  <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 transition-colors hover:text-emerald-300">
                    Partner on {p.name} <Arrow />
                  </Link>
                  {p.href && (
                    <Link href={p.href} className="ml-auto inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white">
                      Product page <Arrow className="h-3.5 w-3.5" />
                    </Link>
                  )}
                  {p.externalUrl && (
                    <a href={p.externalUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white">
                      {p.externalLabel} ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Services ── */}
        <section id="services" aria-labelledby="services-heading" className="scroll-mt-28">
          <SectionHeading
            id="services-heading"
            eyebrow="What we deliver"
            title="Services"
            text="Engineering we offer to partners and clients, from a single sensor to a full product."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.id} id={s.id} className="flex scroll-mt-28 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-white/20 hover:bg-white/[0.05]">
                <span className="text-3xl" aria-hidden="true">{s.icon}</span>
                <h3 className="mt-4 text-lg font-bold text-white">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.summary}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: s.accent }} />
                      {d}
                    </li>
                  ))}
                </ul>
                <Link href={s.href} className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-emerald-400 hover:text-emerald-300">
                  Learn more <Arrow className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* ── Partnership models ── */}
        <section id="partner-models" aria-labelledby="partner-heading" className="scroll-mt-28">
          <SectionHeading
            id="partner-heading"
            eyebrow="Ways to work together"
            title="Partnership models"
            text="Pick the model that fits your business. Most partners start with a pilot."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {partnershipModels.map((m) => (
              <div key={m.title} className="rounded-2xl border border-white/10 bg-[#080c18] p-6">
                <span className="text-2xl" aria-hidden="true">{m.icon}</span>
                <h3 className="mt-3 text-lg font-bold text-white">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{m.text}</p>
              </div>
            ))}
          </div>

          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s) => (
              <li key={s.n} className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <span className="text-3xl font-black" style={{ ...gradientText, fontFamily: "var(--font-display)" }}>{s.n}</span>
                <h3 className="mt-2 font-bold text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-28">
          <SectionHeading id="faq-heading" eyebrow="Quick answers" title="Partner FAQ" />
          <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
            {portfolioFaqs.map((f, i) => (
              <details key={f.q} className="group px-6 py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-white">
                  <h3 className="text-base">{f.q}</h3>
                  <span className="text-emerald-400 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-4 text-xs text-zinc-600">
            Last updated <time dateTime={PORTFOLIO_UPDATED}>17 November 2026</time>
          </p>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-emerald-950/20 to-zinc-900 p-8 text-center sm:p-16">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
            <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
          </div>
          <div className="relative space-y-6">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
              Let&apos;s build <span style={gradientText}>together</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-300">
              Tell us who you serve and which product or service interests you. We reply within one working day.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              <Link href="/contact" className={primaryBtn}>Start a partnership <Arrow className="h-5 w-5" /></Link>
              <a href="mailto:ecobridgers.tech@gmail.com?subject=Partnership%20enquiry" className={ghostBtn}>ecobridgers.tech@gmail.com</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
