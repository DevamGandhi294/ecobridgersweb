import type { Metadata } from 'next';
import WorkOverviewClient from './WorkOverviewClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://ecobridgers.com/work',
  },
  title: 'Our Products — TextileBridge, BIoTSense, TurfBridge, CafeBridge',
  description: 'Industry-specific SaaS and IoT products built by EcoBridgers: TextileBridge, BIoTSense, TurfBridge, CafeBridge and the Underground Rover — deployable, affordable, and market-ready.',
};

export default function WorkPage() {
  return <WorkOverviewClient />;
}
