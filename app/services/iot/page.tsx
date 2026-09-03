import type { Metadata } from 'next';
import IotServiceClient from './IotServiceClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://ecobridgers.com/services/iot',
  },
  title: 'IoT & Embedded Systems Development — Sensors to Dashboard',
  description: 'Embedded firmware, sensor integration, cloud connectivity, real-time WhatsApp alerts and dashboards. Predictive machine maintenance and industrial monitoring for factories, built from Surat, India.',
};

export default function IotServicePage() {
  return <IotServiceClient />;
}
