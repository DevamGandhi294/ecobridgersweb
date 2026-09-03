import type { Metadata } from 'next';
import BiotsenseClient from './BiotsenseClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://ecobridgers.com/work/biotsense',
  },
  title: 'BIoTSense — Machine Health Monitoring & Predictive Maintenance',
  description: 'Attach sensors to any machine and get live vibration, temperature and current data. BIoTSense flags anomalies before breakdowns happen — under ₹300/device/month.',
};

export default function BiotsensePage() {
  return <BiotsenseClient />;
}
