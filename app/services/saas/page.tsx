import type { Metadata } from 'next';
import SaasServiceClient from './SaasServiceClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://ecobridgers.com/services/saas',
  },
  title: 'SaaS Product Development — TextileBridge, CafeBridge, TurfBridge',
  description: 'Ready-built, industry-specific SaaS products deployable in weeks — TextileBridge for textile units, CafeBridge for cafes, TurfBridge for sports venues. Built for Indian SMEs.',
};

export default function SaasServicePage() {
  return <SaasServiceClient />;
}
