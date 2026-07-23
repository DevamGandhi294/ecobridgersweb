export const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/saas", label: "SaaS Products",           icon: "💡" },
      { href: "/services/iot",  label: "IoT & Embedded Systems",  icon: "🔌" },
      { href: "/services/app",  label: "App Solutions",           icon: "📱" },
      { href: "/services/web",  label: "Web & Cloud Platforms",   icon: "🌐" },
    ],
  },
  {
    href: "/work",
    label: "Products",
    children: [
      { href: "/work/textilebridge", label: "TextileBridge", icon: "🧵" },
      { href: "/work/biotsense", label: "BIoTSense", icon: "⚙️" },
      { href: "/work/turfbridge", label: "TurfBridge", icon: "🏏" },
      { href: "/work/cafebridge", label: "CafeBridge", icon: "☕" },
      { href: "/work/underground-rover", label: "Underground Rover", icon: "🤖" },
    ],
  },
  { href: "/about",   label: "About"    },
  { href: "/contact", label: "Contact"  },
] as const;

export type NavChild = { href: string; label: string; icon: string };
export type NavLink  = { href: string; label: string; children?: readonly NavChild[] };