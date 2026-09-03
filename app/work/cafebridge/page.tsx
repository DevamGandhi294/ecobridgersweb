import type { Metadata } from 'next';
import CafeBridgeClient from './CafeBridgeClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://ecobridgers.com/work/cafebridge',
  },
  title: 'CafeBridge — Billing & Ordering System for Cafes & Cloud Kitchens',
  description: 'POS, QR ordering, digital menu and WhatsApp billing for cafes and cloud kitchens — one-time ₹20,000, no monthly fees, first 3 months free.',
};

export default function CafeBridgePage() {
  return <CafeBridgeClient />;
}
