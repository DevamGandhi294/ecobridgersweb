import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://ecobridgers.com',
  },
  title: 'EcoBridgers | SaaS & IoT Solutions for Indian SMEs | Surat, India',
  description:
    'EcoBridgers builds practical SaaS products, IoT hardware, and custom software for SMEs in Surat & across India. Scalable, market-ready, affordable.',
  keywords: [
    'SaaS development company Surat',
    'IoT development company Surat',
    'mobile app development Surat',
    'software development agency Gujarat',
    'embedded systems company India',
    'web design Surat',
    'database management Gujarat',
    'EcoBridgers',
    'SaaS development',
    'IoT development',
    'embedded systems',
    'mobile apps',
    'hardware development',
    'Surat India',
    'AWS',
    'React',
    'Node.js',
  ],
  other: {
    'article:published_time': '2025-01-01T00:00:00Z',
    'article:modified_time': '2026-09-16T00:00:00Z',
  },
  openGraph: {
    title: 'EcoBridgers | SaaS, IoT & Embedded Systems Development',
    description:
      'EcoBridgers builds practical SaaS products, IoT hardware, and custom software for SMEs in Surat & across India. Scalable, market-ready, affordable.',
    url: 'https://ecobridgers.com',
    siteName: 'EcoBridgers',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://ecobridgers.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EcoBridgers SaaS & IoT Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoBridgers | SaaS, IoT & Embedded Systems Development',
    description:
      'EcoBridgers builds practical SaaS products, IoT hardware, and custom software for SMEs in Surat & across India. Scalable, market-ready, affordable.',
    images: ['https://ecobridgers.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://ecobridgers.com/#organization',
    name: 'EcoBridgers',
    description:
      'End-to-end IoT, embedded systems, SaaS products, cloud and mobile development company based in Surat, India.',
    url: 'https://ecobridgers.com',
    logo: 'https://ecobridgers.com/logo.png',
    image: 'https://ecobridgers.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91 7862949437',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi', 'Gujarati'],
      email: 'ecobridgers.tech@gmail.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Surat',
      addressRegion: 'Gujarat',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://www.linkedin.com/company/ecobridgers',
      'https://twitter.com/ecobridgers',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://ecobridgers.com/#website',
    url: 'https://ecobridgers.com',
    name: 'EcoBridgers',
    description:
      'SaaS product development and IoT embedded engineering for SMEs in Surat, Gujarat & India.',
    publisher: {
      '@id': 'https://ecobridgers.com/#organization',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ecobridgers.com',
      },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageClient />
    </>
  );
}
