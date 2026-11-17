import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PORTFOLIO_URL, PORTFOLIO_UPDATED, SITE_URL, products } from "../portfolio-data";
import { PHASES, details } from "../portfolio-details";

type Params = { id: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.filter((p) => details[p.id]).map((p) => ({ id: p.id }));
}

function load(id: string) {
  const product = products.find((p) => p.id === id);
  const detail = details[id];
  if (!product || !detail) return null;
  return { product, detail };
}

// "₹4,000–5,000 one-time" -> { low: 4000, high: 5000 }
function priceRange(text: string) {
  const nums = (text.match(/\d[\d,]*/g) ?? []).map((n) => Number(n.replace(/,/g, "")));
  if (!nums.length) return null;
  const isRange = /\d\s*[–-]\s*\d/.test(text);
  return { low: nums[0], high: isRange ? nums[1] : nums[0] };
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  const data = load(id);
  if (!data) return {};
  const { product, detail } = data;
  const url = `${PORTFOLIO_URL}/${id}`;
  const title = `${product.name}: Product, Pricing & Business Model`;
  const description = `${product.name} by EcoBridgers. ${detail.tagline} Phase: ${detail.phase}. Pricing: ${detail.business.pricing}`.slice(0, 300);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, siteName: "EcoBridgers", locale: "en_IN", title, description, images: [{ url: "/logo.png", width: 749, height: 749, alt: product.name }] },
    twitter: { card: "summary_large_image", title, description, images: ["/logo.png"] },
  };
}

const Arrow = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

const card = "rounded-2xl border border-white/10 bg-[#080c18] p-6 sm:p-8";

function H2({ id, eyebrow, children, accent }: { id: string; eyebrow: string; children: React.ReactNode; accent: string }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>{eyebrow}</p>
      <h2 id={id} className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
        {children}
      </h2>
    </div>
  );
}

function Dots({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2 text-sm text-zinc-300">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default async function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const data = load(id);
  if (!data) notFound();
  const { product: p, detail: d } = data;
  const url = `${PORTFOLIO_URL}/${p.id}`;
  const phaseIndex = (PHASES as readonly string[]).indexOf(d.phase);
  const others = products.filter((o) => o.id !== p.id && details[o.id]);

  const sections = [
    { id: "what", label: "What it does" },
    ...(d.showcase ? [{ id: "showcase", label: d.showcase.eyebrow }] : []),
    { id: "phase", label: "Phase" },
    { id: "tech", label: "Tech stack" },
    { id: "business", label: "Pricing & model" },
    { id: "market", label: "Market" },
    ...(d.cofounder ? [{ id: "cofounder", label: d.cofounder.heading ? "Clients" : "Co-founder" }] : []),
  ];

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${url}#product`,
      name: p.name,
      url,
      description: `${p.summary} ${d.solution}`,
      applicationCategory: p.schemaCategory,
      operatingSystem: p.platforms,
      featureList: p.features,
      audience: { "@type": "Audience", audienceType: p.audience },
      creator: { "@id": `${SITE_URL}/#organization` },
      ...(p.externalUrl ? { downloadUrl: p.externalUrl, sameAs: [p.externalUrl] } : {}),
      ...(d.plans
        ? {
            offers: d.plans.rows.map((r) => {
              const pr = priceRange(r.price);
              const base = { name: `${p.name} ${r.name}`, description: `${r.bestFor}: ${r.price} (${r.platforms})`, priceCurrency: "INR" };
              if (!pr) return { "@type": "Offer", ...base };
              return pr.low === pr.high
                ? { "@type": "Offer", ...base, price: pr.low }
                : { "@type": "AggregateOffer", ...base, lowPrice: pr.low, highPrice: pr.high };
            }),
          }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: `${p.name}: product, pricing and business model`,
      dateModified: PORTFOLIO_UPDATED,
      inLanguage: "en-IN",
      about: { "@id": `${url}#product` },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    ...(d.cofounder && !d.cofounder.heading
      ? [
          {
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: d.cofounder.role,
            description: `${d.cofounder.why} Skills: ${d.cofounder.skills.join(", ")}. Responsibilities: ${d.cofounder.responsibilities.join(", ")}. ${d.cofounder.offer}`,
            datePosted: PORTFOLIO_UPDATED,
            employmentType: "OTHER",
            hiringOrganization: { "@type": "Organization", name: "EcoBridgers", sameAs: SITE_URL },
            jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Surat", addressRegion: "Gujarat", addressCountry: "IN" } },
          },
        ]
      : []),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Portfolio", item: PORTFOLIO_URL },
        { "@type": "ListItem", position: 3, name: p.name, item: url },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="mx-auto max-w-screen-xl space-y-16 px-4 pb-24 pt-10 sm:px-6 lg:px-10 xl:px-16">
        <nav aria-label="Breadcrumb" className="text-xs text-zinc-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-emerald-400">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/portfolio" className="hover:text-emerald-400">Portfolio</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-zinc-300">{p.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="relative -mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-25 blur-[110px]" style={{ background: p.accent }} aria-hidden="true" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-5xl" aria-hidden="true">{p.icon}</span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: p.accent }}>{p.category}</p>
              <h1 className="mt-1 text-4xl font-black tracking-tight text-white sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>{p.name}</h1>
              <p className="mt-3 max-w-3xl text-lg text-zinc-300">{d.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full border px-3 py-1 font-semibold" style={{ borderColor: `${p.accent}66`, color: p.accent }}>Phase: {d.phase}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-zinc-400">{p.platforms}</span>
                {d.cofounder && (
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-semibold text-emerald-400">
                    {d.cofounder.heading ? "Looking for clients" : "Open to a co-founder"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Section nav */}
        <nav aria-label="On this page" className="-mt-8 flex flex-wrap gap-2">
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:border-emerald-500/40 hover:text-emerald-400">
              {s.label}
            </a>
          ))}
        </nav>

        {/* What it does */}
        <section id="what" aria-labelledby="what-h" className="scroll-mt-28">
          <H2 id="what-h" eyebrow="01 · Overview" accent={p.accent}>What exactly it does</H2>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className={card}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-rose-400">The problem</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{d.problem}</p>
            </div>
            <div className={card}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">Our solution</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{d.solution}</p>
            </div>
          </div>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.howItWorks.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <span className="text-xs font-bold" style={{ color: p.accent }}>Step {i + 1}</span>
                <h3 className="mt-1 font-bold text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className={`${card} mt-5`}>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Key features · Built for {p.audience}</p>
            <div className="grid gap-x-6 sm:grid-cols-2"><Dots items={p.features} accent={p.accent} /></div>
          </div>
        </section>

        {/* Showcase (deck-style deep dive) */}
        {d.showcase && (
          <section id="showcase" aria-labelledby="showcase-h" className="scroll-mt-28">
            <H2 id="showcase-h" eyebrow={d.showcase.eyebrow} accent={p.accent}>{d.showcase.title}</H2>
            {d.showcase.intro && <p className="-mt-2 mb-6 max-w-3xl text-sm leading-relaxed text-zinc-400">{d.showcase.intro}</p>}
            <div className={`grid gap-5 ${d.showcase.items.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
              {d.showcase.items.map((it) => (
                <article key={it.name} className="flex flex-col rounded-2xl border border-white/10 bg-[#080c18] p-6">
                  <span className="text-4xl" aria-hidden="true">{it.icon}</span>
                  <h3 className="mt-3 text-xl font-bold text-white">{it.name}</h3>
                  <p className="mt-1 text-sm" style={{ color: p.accent }}>{it.tagline}</p>
                  <ol className="mt-4 space-y-2.5">
                    {it.steps.map((st, i) => (
                      <li key={st} className="flex gap-3 text-sm text-zinc-300">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-black" style={{ background: p.accent }}>{i + 1}</span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ol>
                  {it.note && <p className="mt-auto pt-4 text-xs text-zinc-500">{it.note}</p>}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Phase */}
        <section id="phase" aria-labelledby="phase-h" className="scroll-mt-28">
          <H2 id="phase-h" eyebrow="02 · Where we are" accent={p.accent}>Current phase: {d.phase}</H2>
          <div className={card}>
            <ol className="grid grid-cols-5 gap-2">
              {PHASES.map((ph, i) => {
                const done = phaseIndex >= 0 && i < phaseIndex;
                const now = i === phaseIndex;
                return (
                  <li key={ph} className="text-center">
                    <div className="h-2 rounded-full" style={{ background: done || now ? p.accent : "rgba(255,255,255,0.08)", opacity: done ? 0.55 : 1 }} />
                    <p className={`mt-2 text-[11px] sm:text-xs ${now ? "font-bold text-white" : "text-zinc-500"}`}>{ph}</p>
                  </li>
                );
              })}
            </ol>
            {phaseIndex < 0 && (
              <p className="mt-6 inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">On hold</p>
            )}
            <p className="mt-4 text-sm text-zinc-300">{d.phaseNote}</p>
            <div className={`mt-6 grid gap-6 ${d.builtAlready ? "md:grid-cols-2" : ""}`}>
              {d.builtAlready && (
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-emerald-400">Built already</p>
                  <ul className="space-y-2">
                    {d.builtAlready.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-zinc-300">
                        <span className="text-emerald-400" aria-hidden="true">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Next on the roadmap</p>
                <Dots items={d.next} accent={p.accent} />
              </div>
            </div>
          </div>
        </section>

        {/* Tech */}
        <section id="tech" aria-labelledby="tech-h" className="scroll-mt-28">
          <H2 id="tech-h" eyebrow="03 · Technology" accent={p.accent}>Tech stack</H2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.stack.map((l) => (
              <div key={l.layer} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: p.accent }}>{l.layer}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {l.items.map((t) => (
                    <span key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-zinc-300">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Business */}
        <section id="business" aria-labelledby="business-h" className="scroll-mt-28">
          <H2 id="business-h" eyebrow="04 · How it makes money" accent={p.accent}>Pricing &amp; business model</H2>
          <p className="mb-5 text-sm text-zinc-400"><span className="font-semibold text-zinc-200">Customers:</span> {d.business.customers}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {d.business.revenue.map((r) => (
              <div key={r.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="font-bold text-white">{r.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{r.text}</p>
              </div>
            ))}
          </div>
          {d.plans && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <caption className="sr-only">{p.name} plans and prices</caption>
                  <thead className="bg-white/[0.04] text-[11px] uppercase tracking-widest text-zinc-500">
                    <tr>
                      <th scope="col" className="px-5 py-3">Plan</th>
                      <th scope="col" className="px-5 py-3">Best for</th>
                      <th scope="col" className="px-5 py-3">Price</th>
                      <th scope="col" className="px-5 py-3">Includes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {d.plans.rows.map((r) => (
                      <tr key={r.name}>
                        <th scope="row" className="px-5 py-4 font-bold text-white">{r.name}</th>
                        <td className="px-5 py-4 text-zinc-300">{r.bestFor}</td>
                        <td className="px-5 py-4 font-semibold" style={{ color: p.accent }}>{r.price}</td>
                        <td className="px-5 py-4 text-zinc-400">{r.platforms}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t border-white/10 bg-white/[0.02] p-5"><Dots items={d.plans.notes} accent={p.accent} /></div>
            </div>
          )}
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className={card}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Pricing</p>
              <p className="mt-2 text-sm text-zinc-200">{d.business.pricing}</p>
            </div>
            <div className={card}>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Sales channels</p>
              <Dots items={d.business.channels} accent={p.accent} />
            </div>
          </div>
        </section>

        {/* Market */}
        <section id="market" aria-labelledby="market-h" className="scroll-mt-28">
          <H2 id="market-h" eyebrow="05 · Opportunity" accent={p.accent}>Market</H2>
          <div className={card}>
            <p className="text-sm leading-relaxed text-zinc-300"><span className="font-semibold text-white">Target segment:</span> {d.market.segment}</p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Why now</p>
                <Dots items={d.market.whyNow} accent={p.accent} />
              </div>
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">What people use today</p>
                <p className="text-sm text-zinc-300">{d.market.alternatives}</p>
              </div>
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Our edge</p>
                <Dots items={d.market.edge} accent={p.accent} />
              </div>
            </div>
          </div>
          {d.market.moments && (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {d.market.moments.map((m) => (
                <div key={m.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <h3 className="font-bold text-white">{m.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{m.text}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {d.getStarted && (
          <section aria-labelledby="start-h" className="-mt-4">
            <h2 id="start-h" className="mb-4 text-[11px] font-bold uppercase tracking-widest text-zinc-500">How customers get started</h2>
            <ol className="grid gap-4 sm:grid-cols-3">
              {d.getStarted.map((g, i) => (
                <li key={g.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                  <span className="text-xs font-bold" style={{ color: p.accent }}>Step {i + 1}</span>
                  <h3 className="mt-1 font-bold text-white">{g.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{g.text}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Co-founder / clients */}
        {d.cofounder && (() => {
          const c = d.cofounder;
          const clients = Boolean(c.heading);
          return (
            <section id="cofounder" aria-labelledby="cofounder-h" className="scroll-mt-28">
              <H2 id="cofounder-h" eyebrow="06 · Join us" accent={p.accent}>{c.heading ?? "Co-founder we're looking for"}</H2>
              <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 via-zinc-900 to-zinc-950 p-8 sm:p-10">
                <h3 className="text-2xl font-bold text-white">{c.role}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-300">{c.why}</p>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-emerald-400">{clients ? "Is this you?" : "You bring"}</p>
                    <Dots items={c.skills} accent="#10b981" />
                  </div>
                  <div>
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-emerald-400">{clients ? "How it works" : "You will own"}</p>
                    <Dots items={c.responsibilities} accent="#10b981" />
                  </div>
                </div>
                <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-300">
                  <span className="font-semibold text-white">{clients ? "Price: " : "What we offer: "}</span>{c.offer}
                </p>
                {!clients && <p className="mt-4 text-sm text-zinc-400">We bring: product design, hardware, firmware, apps and cloud engineering.</p>}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`mailto:ecobridgers.tech@gmail.com?subject=${encodeURIComponent(`${clients ? "Enquiry" : "Co-founder"}: ${p.name}`)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25"
                  >
                    {c.cta ?? `Talk to us about ${p.name}`} <Arrow />
                  </a>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-emerald-500/40">
                    Contact form
                  </Link>
                </div>
              </div>
            </section>
          );
        })()}

        {/* Links + other products */}
        <section aria-label="More" className="space-y-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/portfolio" className="text-zinc-400 hover:text-white">← Back to portfolio</Link>
            {p.href && <Link href={p.href} className="text-zinc-400 hover:text-white">Product page →</Link>}
            {p.externalUrl && <a href={p.externalUrl} target="_blank" rel="noopener" className="text-zinc-400 hover:text-white">{p.externalLabel} ↗</a>}
          </div>
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Other products</p>
            <div className="flex flex-wrap gap-2">
              {others.map((o) => (
                <Link key={o.id} href={`/portfolio/${o.id}`} className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-400">
                  {o.icon} {o.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
