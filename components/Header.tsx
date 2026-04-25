"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Cpu, Globe, Smartphone, Brain } from "lucide-react";
import { navLinks } from "@/lib/navLinks";

export function Header() {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef                     = useRef<HTMLDivElement>(null);
  const mobileMenuRef                   = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isRouteActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-b bg-zinc-950/90 backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? "border-emerald-500/40 shadow-lg shadow-black/40" : "border-emerald-500/20"
      }`}
    >
      <div
        className={`flex w-full items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-16 ${
          isScrolled ? "py-2" : "py-4"
        } transition-all duration-300`}
      >
        {/* Logo */}
        <Link href="/" className="group inline-flex items-center gap-3">
          <span
            aria-hidden
            className={`relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-white/5 backdrop-blur-sm transition-all duration-300 overflow-hidden ${
              isScrolled
                ? "border-emerald-500/50"
                : "border-emerald-500/30 group-hover:border-emerald-500/50 group-hover:scale-105"
            }`}
          >
            <Image
              src="/logo.png"
              alt="EcoBridgers Logo"
              width={32}
              height={32}
              className="object-contain rounded-lg transition-transform duration-300 group-hover:scale-110"
            />
          </span>
          <div className="leading-tight">
            <div className="text-lg font-bold tracking-tight text-white transition-colors sm:text-xl group-hover:text-emerald-400">
              EcoBridgers
            </div>
            <div className="text-[11px] font-medium text-zinc-400 sm:text-xs md:text-sm">
              IoT • Web • Mobile • Cloud
            </div>
          </div>
        </Link>

        {/* ── Desktop Navigation ── */}
        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => {
            // Link with dropdown
            if ("children" in link && link.children) {
              const isParentActive = pathname === link.href || link.children.some((child) => pathname === child.href);
              return (
                <div key={link.href} className="relative group" ref={dropdownRef}>
                  <Link
                    href={link.href}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 md:text-base ${
                      isParentActive ? "bg-emerald-500/15 text-emerald-300" : "text-zinc-300"
                    }`}
                  >
                    {link.label}
                    <svg
                      className="h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 group-hover:rotate-180"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <div className="absolute left-1/2 top-[calc(100%+8px)] w-[880px] -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="rounded-2xl border border-white/10 bg-[#0e0e11]/95 p-3 shadow-2xl backdrop-blur-xl">
                      <div className="mb-3 flex items-center justify-between px-2 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500" style={{ fontFamily: "var(--font-display)" }}>All Services</span>
                        <Link href="/services" className="group/link flex items-center gap-1 text-[13px] font-bold text-emerald-500 hover:text-emerald-400 transition-colors">
                          View Everything
                          <svg className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </Link>
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        {link.children.map((child) => {
                          const getStyles = (href: string) => {
                            if (href.includes("iot")) return { bg: "bg-[#94e48b]", text: "text-[#0d1f10]", desc: "Hardware & edge tracking" };
                            if (href.includes("web")) return { bg: "bg-[#22d3ee]", text: "text-[#083344]", desc: "Dashboards & scalable SaaS" };
                            if (href.includes("mobile")) return { bg: "bg-[#6c78fb]", text: "text-white", desc: "iOS & Android solutions" };
                            if (href.includes("ai")) return { bg: "bg-[#ff6fb5]", text: "text-[#2e091b]", desc: "Machine Learning & predictive" };
                            return { bg: "bg-zinc-800", text: "text-white", desc: "Explore our offerings" };
                          };
                          const s = getStyles(child.href);
                          return (
                            <Link href={child.href} key={child.href} className={`group/card relative flex h-[160px] flex-col justify-between overflow-hidden rounded-xl p-4 transition-all hover:scale-[1.02] hover:shadow-lg ${s.bg}`}>
                              <div className="space-y-1">
                                <h3 className={`text-lg font-semibold leading-tight tracking-tight ${s.text}`} style={{ fontFamily: "var(--font-display)" }}>
                                  {child.label}
                                </h3>
                                <p className={`text-[11px] opacity-75 font-medium ${s.text} max-w-[90%] leading-relaxed`}>
                                  {s.desc}
                                </p>
                              </div>
                              
                              <div className="flex w-full items-end justify-between">
                                <div className="text-[#1a1a1a] opacity-90">
                                  {child.href.includes("iot") && <Cpu size={28} strokeWidth={1.5} />}
                                  {child.href.includes("web") && <Globe size={28} strokeWidth={1.5} />}
                                  {child.href.includes("mobile") && <Smartphone size={28} strokeWidth={1.5} />}
                                  {child.href.includes("ai") && <Brain size={28} strokeWidth={1.5} />}
                                </div>
                                <div className={`flex h-8 w-8 items-center justify-center rounded-lg border opacity-40 transition-all group-hover/card:opacity-100 border-current ${s.text}`}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/card:-rotate-45">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                  </svg>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Regular link
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400/50 md:text-base ${
                  isRouteActive(link.href)
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "text-zinc-300 hover:bg-white/[0.08] hover:text-white"
                }`}
                aria-current={isRouteActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="ml-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-xl hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 md:text-base"
          >
            Let's discuss your project
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </nav>

        {/* ── Mobile Navigation ── */}
        <div className="relative sm:hidden" ref={mobileMenuRef}>
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-base font-medium text-zinc-100 backdrop-blur-sm transition-all hover:bg-emerald-500/10"
          >
            Menu
            <svg
              className={`h-4 w-4 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {mobileMenuOpen && (
            <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-emerald-500/20 bg-zinc-900/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
            <div className="p-2">
              {navLinks.map((link) => {
                if ("children" in link && link.children) {
                  return (
                    <div key={link.href}>
                      {/* Services heading */}
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-xl px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-white/[0.08]"
                      >
                        {link.label}
                      </Link>
                      {/* Child links indented */}
                      <div className="mb-1 ml-2 space-y-0.5 border-l border-emerald-500/20 pl-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-all hover:bg-white/[0.06] hover:text-white ${
                              pathname === child.href ? "bg-emerald-500/10 text-emerald-300" : "text-zinc-400"
                            }`}
                          >
                            <span className="flex items-center text-zinc-300">
                              {child.href.includes("iot") && <Cpu size={18} strokeWidth={2} />}
                              {child.href.includes("web") && <Globe size={18} strokeWidth={2} />}
                              {child.href.includes("mobile") && <Smartphone size={18} strokeWidth={2} />}
                              {child.href.includes("ai") && <Brain size={18} strokeWidth={2} />}
                            </span>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all hover:bg-white/[0.08] hover:text-white ${
                      isRouteActive(link.href) ? "bg-emerald-500/15 text-emerald-300" : "text-zinc-300"
                    }`}
                    aria-current={isRouteActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Start a project
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Thin gradient line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </header>
  );
}