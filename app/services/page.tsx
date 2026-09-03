import type { Metadata } from 'next';
import ServicesOverviewClient from './ServicesOverviewClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://ecobridgers.com/services',
  },
  title: 'Our Services — SaaS, IoT, App & Web Development',
  description: 'SaaS products, IoT & embedded systems, mobile apps, and web & cloud platforms — one team covering every layer, built for Indian SMEs from Surat.',
};

export default function ServicesPage() {
  return <ServicesOverviewClient />;
}
