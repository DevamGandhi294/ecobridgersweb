import type { Metadata } from 'next';
import TextileBridgeClient from './TextileBridgeClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://ecobridgers.com/work/textilebridge',
  },
  title: 'TextileBridge — Production & Inventory Management for Textile Units',
  description: 'End-to-end production tracking, yarn & fabric inventory, order management and real-time reporting built specifically for small and mid-size textile manufacturing units.',
};

export default function TextileBridgePage() {
  return <TextileBridgeClient />;
}
