import type { Metadata } from 'next';
import PlaycoClient from './PlaycoClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://ecobridgers.com/work/playco',
  },
  title: 'Playco — Social Party & Multiplayer Deduction Games (Imposter)',
  description: 'Playco is a social party gaming platform for 3–10 players featuring Imposter — a secret identity deduction game of bluffing, hidden roles (Crew, Clone, Faker), and group deception. Play Pass & Play offline or online via room code.',
};

export default function PlaycoPage() {
  return <PlaycoClient />;
}
