import type { Metadata } from 'next';
import AppServiceClient from './AppServiceClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://ecobridgers.com/services/app',
  },
  title: 'Mobile App Development — Android & iOS with Flutter',
  description: 'Cross-platform Android and iOS apps built with Flutter — IoT companion apps, field worker tools, customer ordering and booking apps, one codebase, both platforms.',
};

export default function AppServicePage() {
  return <AppServiceClient />;
}
