import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Header } from "@/components/Header";
import { navLinks } from "@/lib/navLinks";
import { CustomCursor } from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "EcoBridgers - Bridging Ideas to Real-World Technology",
  description: "Bridging Ideas to Real-World Technology.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-950 text-zinc-50 overflow-x-hidden">
        {/* ── Custom cursor — renders on every page globally ── */}
        <CustomCursor />

        <div className="min-h-screen overflow-x-hidden">
          <Header />

          <main className="w-full">
            {children}
          </main>

          {/* Footer */}
          <footer className="relative border-t border-emerald-500/20 bg-zinc-950/50 backdrop-blur-sm">
            <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            <div className="mx-auto max-w-6xl px-6 py-12">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <div className="text-base font-bold text-white">EcoBridgers</div>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    Practical delivery for real-world systems. Building IoT, web, mobile, and cloud solutions.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-white">Quick Links</h3>
                  <ul className="space-y-2">
                    {navLinks.slice(0, 4).map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-sm text-zinc-400 transition-colors hover:text-emerald-400">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-white">Services</h3>
                  <ul className="space-y-2 text-sm text-zinc-400">
                    <li>IoT &amp; Embedded Systems</li>
                    <li>Web &amp; Cloud Platforms</li>
                    <li>Mobile Applications</li>
                    <li>AI-Assisted Solutions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-white">Get Started</h3>
                  <p className="mb-4 text-sm text-zinc-400">Ready to bridge your idea to reality?</p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 backdrop-blur-sm transition-all hover:bg-emerald-500/20"
                  >
                    Contact Us
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                <div>© {new Date().getFullYear()} EcoBridgers. All rights reserved.</div>
                <div className="flex gap-6 text-xs">
                  <Link href="/privacy" className="transition-colors hover:text-emerald-400">Privacy Policy</Link>
                  <Link href="/terms" className="transition-colors hover:text-emerald-400">Terms of Service</Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}