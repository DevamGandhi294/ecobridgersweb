"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/navLinks";
import { FooterBrand } from "@/components/Footerbrand";

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
                <div key={link.href} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((o) => !o)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50 md:text-base ${
                      isParentActive ? "bg-emerald-500/15 text-emerald-300" : "text-zinc-300"
                    }`}
                  >
                    {link.label}
                    <svg
                      className={`h-3.5 w-3.5 text-zinc-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown panel */}
                  {dropdownOpen && (
                    <div className="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-emerald-500/20 bg-zinc-900/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
                      {/* Arrow tip */}
                      <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-emerald-500/20 bg-zinc-900" />

                      <div className="p-2">
                        {/* View all link */}
                        <Link
                          href="/services"
                          onClick={() => setDropdownOpen(false)}
                          className="mb-1 flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-400 transition-all hover:bg-emerald-500/10"
                        >
                          All Services
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </Link>

                        {/* Divider */}
                        <div className="mx-3 mb-2 h-px bg-white/10" />

                        {/* Service items */}
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setDropdownOpen(false)}
                            className={`group/item flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-white/[0.07] ${
                              pathname === child.href ? "bg-emerald-500/10" : ""
                            }`}
                          >
                            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-white/5 text-lg transition-all group-hover/item:border-emerald-500/30 group-hover/item:bg-emerald-500/10 ${
                              pathname === child.href ? "border-emerald-500/30" : "border-white/10"
                            }`}>
                              {child.icon}
                            </span>
                            <span className={`text-sm font-medium transition-colors group-hover/item:text-white ${
                              pathname === child.href ? "text-emerald-300" : "text-zinc-300"
                            }`}>
                              {child.label}
                            </span>
                          </Link>
                        ))}
                      </div>

                      {/* Bottom gradient */}
                      <div className="h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0" />
                    </div>
                  )}
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
                            <span className="text-base">{child.icon}</span>
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