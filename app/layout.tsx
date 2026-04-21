import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import TextPressure from '@/components/TextPressure';
import { Header } from "@/components/Header";
import { navLinks } from "@/lib/navLinks";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.ecobridgers.site',
  },
  metadataBase: new URL('https://www.ecobridgers.site'),
  title: {
    default: 'EcoBridgers | IoT & Embedded Systems Development, Surat',
    template: '%s | EcoBridgers',
  },
  description: 'EcoBridgers builds IoT systems, web platforms, and mobile apps for startups, factories, and research labs. Based in Surat, India.',
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.ecobridgers.site',
    siteName: 'EcoBridgers',
    title: 'EcoBridgers | IoT & Embedded Systems Development',
    description: 'End-to-end IoT, cloud, and mobile development. Sensor to dashboard.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EcoBridgers — IoT and software development team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoBridgers | IoT & Embedded Systems Development',
    description: 'End-to-end IoT, cloud, and mobile development.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-950 text-zinc-50 overflow-x-hidden">
        <CustomCursor />

        <div className="min-h-screen overflow-x-hidden">
          <Header />

          <main className="w-full pt-[var(--site-header-offset)]">
            {children}
          </main>

          {/* ── Footer ── */}
          <footer className="relative bg-zinc-950 overflow-hidden">
            {/* Top border glow line */}
            <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

            {/* Subtle grid pattern overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(16,185,129,1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />

            {/* Ambient glow blobs */}
            <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full blur-[120px] pointer-events-none" style={{ background: "rgba(16,185,129,0.07)" }} />
            <div className="absolute top-10 right-0 h-64 w-64 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(6,182,212,0.06)" }} />

            {/* ── Main footer content ── */}
            <div className="relative mx-auto max-w-screen-xl px-6 pt-16 pb-10 lg:px-10 xl:px-16">
              <div className="grid gap-10 lg:grid-cols-[minmax(220px,300px)_auto_auto_auto] lg:justify-between xl:gap-12">

                {/* LEFT — CTA block */}
                <div className="flex flex-col justify-between gap-8">
                  <div className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500/70">
                      Hello! We&apos;re listening
                    </p>
                    <h2
                      className="text-4xl font-black leading-tight tracking-tight text-white xl:text-5xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      Let&apos;s Build
                      <br />
                      <span
                        style={{
                          background:
                            "linear-gradient(135deg,#10b981,#34d399,#22d3ee)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        Your Idea.
                      </span>
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-400 transition-colors hover:text-emerald-300"
                    >
                      Sound good? Let&apos;s connect!
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>

                    {/* Logo mark */}
                    <div className="inline-flex items-center gap-3 pt-2">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/30 bg-white/5 backdrop-blur-sm overflow-hidden">
                        <Image
                          src="/logo.png"
                          alt="EcoBridgers Logo"
                          width={24}
                          height={24}
                          className="object-contain rounded-md"
                        />
                      </span>
                      <span className="text-base font-bold text-white">EcoBridgers</span>
                    </div>
                  </div>
                </div>

                {/* CENTER-LEFT — Connect with us */}
                <div className="space-y-5">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Connect with us
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="mailto:ecobridgers.tech@gmail.com"
                        className="group flex items-center gap-3 text-sm text-zinc-300 transition-colors hover:text-emerald-400"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-emerald-400 transition-colors group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </span>
                        ecobridgers.tech@gmail.com
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+917862949437"
                        className="group flex items-center gap-3 text-sm text-zinc-300 transition-colors hover:text-emerald-400"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-emerald-400 transition-colors group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </span>
                        +91 78629 49437
                      </a>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-zinc-400">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-emerald-400">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </span>
                      <span>Surat, Gujarat, India</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-zinc-400">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-emerald-400">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      Mon – Sat, 10am to 7pm
                    </li>
                  </ul>
                </div>

                {/* CENTER-RIGHT — Quick Links */}
                <div className="space-y-5">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Quick Links
                  </h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    {navLinks.slice(0, 6).map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-sm text-zinc-400 transition-colors hover:text-emerald-400"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="pt-2 space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                      Services
                    </h3>
                    <ul className="space-y-1.5 text-sm text-zinc-400">
                      <li className="hover:text-emerald-400 transition-colors cursor-default">IoT &amp; Embedded Systems</li>
                      <li className="hover:text-emerald-400 transition-colors cursor-default">Web &amp; Cloud Platforms</li>
                      <li className="hover:text-emerald-400 transition-colors cursor-default">Mobile Applications</li>
                      <li className="hover:text-emerald-400 transition-colors cursor-default">AI-Assisted Solutions</li>
                    </ul>
                  </div>
                </div>

                {/* RIGHT — Follow us */}
                <div className="space-y-5">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Follow us
                  </h3>
                  <ul className="space-y-2">
                    {[
                      { label: "LinkedIn", href: "#" },
                      { label: "Twitter", href: "#" },
                      { label: "Instagram", href: "#" },
                      { label: "GitHub", href: "#" },
                    ].map(({ label, href }) => (
                      <li key={label}>
                        <a
                          href={href}
                          className="group flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-emerald-400"
                        >
                          <span className="h-px w-4 bg-zinc-700 transition-all group-hover:w-6 group-hover:bg-emerald-500" />
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Divider */}
              <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Copyright */}
              <p className="mt-6 text-center text-xs text-zinc-600">
                © {new Date().getFullYear()} EcoBridgers. All rights reserved.
              </p>
            </div>

            {/* ── Big brand watermark ── */}
            <div
              className="relative w-full select-none overflow-hidden"
              aria-hidden="true"
              style={{ height: "clamp(120px, 16vw, 240px)" }}
            >
              {/* Fade from footer bg at the top */}
              <div
                className="absolute inset-x-0 top-0 z-10 h-16 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, #09090b, transparent)" }}
              />

              {/* TextPressure fills the entire watermark zone */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.4,
                }}
              >
                <TextPressure
                  text="EcoBridgers"
                  flex
                  alpha
                  stroke={false}
                  width
                  weight
                  italic
                  textColor="#10b981"
                  strokeColor="#5227FF"
                  minFontSize={36}
                />
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}