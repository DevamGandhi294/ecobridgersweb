export const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/iot",    label: "IoT & Embedded Systems",  icon: "🔌" },
      { href: "/services/web",    label: "Web & Cloud Platforms",   icon: "🌐" },
      { href: "/services/mobile", label: "Mobile Applications",     icon: "📱" },
      { href: "/services/ai",     label: "AI-Assisted Solutions",   icon: "🧠" },
    ],
  },
  { href: "/work", label: "Work"  },
  { href: "/about",   label: "About"    },
  { href: "/contact", label: "Contact"  },
] as const;

export type NavChild = { href: string; label: string; icon: string };
export type NavLink  = { href: string; label: string; children?: readonly NavChild[] };