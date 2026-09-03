import type { Metadata } from 'next';
import UndergroundRoverClient from './UndergroundRoverClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://ecobridgers.com/work/underground-rover',
  },
  title: 'Underground Rover — Surveillance Robotics for Tunnels & Pipelines',
  description: 'Government-granted underground surveillance rover designed for tunnels, pipelines and hazardous environments where humans cannot safely go.',
};

export default function UndergroundRoverPage() {
  return <UndergroundRoverClient />;
}
