import type { Metadata } from 'next';
import PlaycoClient from './PlaycoClient';
import { PLAY_STORE_URL, playcoFaqs } from './playco-data';

const PAGE_URL = 'https://ecobridgers.com/work/playco';
const DESCRIPTION =
  'Download Playco on Google Play — a free social party game for 3–10 players. Play Imposter, a hidden-role word deduction game of bluffing (Crew, Clone, Faker). Pass & Play offline or online via room code.';

export const metadata: Metadata = {
  alternates: {
    canonical: PAGE_URL,
  },
  title: 'Playco — Imposter Party Game App for Android | Download Free',
  description: DESCRIPTION,
  keywords: [
    'Playco',
    'Playco app',
    'Imposter game',
    'imposter word game',
    'social deduction game',
    'party game app',
    'pass and play game',
    'offline party game',
    'multiplayer word game',
    'Spyfall alternative',
    'Undercover game',
    'hidden role game',
    'party games for friends India',
  ],
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    siteName: 'EcoBridgers',
    title: 'Playco — Imposter Party Game | Get it on Google Play',
    description: DESCRIPTION,
    images: [{ url: '/logo.png', width: 749, height: 749, alt: 'Playco Imposter party game by EcoBridgers' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Playco — Imposter Party Game | Get it on Google Play',
    description: DESCRIPTION,
    images: ['/logo.png'],
  },
  other: {
    'google-play-app': 'app-id=com.ecobridgers.playco',
  },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': ['MobileApplication', 'VideoGame'],
    '@id': `${PAGE_URL}#app`,
    name: 'Playco',
    alternateName: 'Playco — Imposter',
    url: PAGE_URL,
    downloadUrl: PLAY_STORE_URL,
    installUrl: PLAY_STORE_URL,
    sameAs: [PLAY_STORE_URL],
    description: DESCRIPTION,
    operatingSystem: 'Android',
    applicationCategory: 'GameApplication',
    applicationSubCategory: 'Party, Word, Social Deduction',
    genre: ['Party', 'Social Deduction', 'Word Game'],
    gamePlatform: 'Android',
    playMode: ['MultiPlayer', 'CoOp'],
    numberOfPlayers: { '@type': 'QuantitativeValue', minValue: 3, maxValue: 10 },
    inLanguage: 'en',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
    author: { '@id': 'https://ecobridgers.com/#organization' },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://ecobridgers.com/#organization',
      name: 'EcoBridgers',
      url: 'https://ecobridgers.com',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to play Imposter in Playco',
    step: [
      { '@type': 'HowToStep', name: 'Category & Setup', text: 'Host chooses a word category, sets role counts (Crew/Clone/Faker), and picks the voting style.' },
      { '@type': 'HowToStep', name: 'Identity Reveal', text: 'Each player privately checks their role card — pass the phone offline or use their own screen online.' },
      { '@type': 'HowToStep', name: 'Clues & Discussion', text: 'Players take turns giving clues about their word and try to spot who is bluffing.' },
      { '@type': 'HowToStep', name: 'Voting & Elimination', text: 'The group votes to eliminate a suspect, revealing their role and word.' },
      { '@type': 'HowToStep', name: 'Win Check', text: 'Crew wins if the Faker is caught; Faker wins by surviving to the final 2; Clone wins by surviving or guessing the Crew word.' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: playcoFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ecobridgers.com' },
      { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://ecobridgers.com/work' },
      { '@type': 'ListItem', position: 3, name: 'Playco', item: PAGE_URL },
    ],
  },
];

export default function PlaycoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PlaycoClient />
    </>
  );
}
