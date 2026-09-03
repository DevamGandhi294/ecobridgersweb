import type { Metadata } from 'next';
import TurfBridgeClient from './TurfBridgeClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://ecobridgers.com/work/turfbridge',
  },
  title: 'TurfBridge — Booking & Management Platform for Box Cricket Venues',
  description: 'Slot bookings, payments, member management and daily reports for box cricket grounds and sports venues — all from one dashboard, ₹500/month.',
};

export default function TurfBridgePage() {
  return <TurfBridgeClient />;
}
