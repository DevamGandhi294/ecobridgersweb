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
    image: 'https://ecobridgers.com/og-image.jpg',
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
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What services does EcoBridgers provide?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'EcoBridgers offers end-to-end software and hardware development services, including SaaS product engineering, custom web application development using Next.js and React, mobile app development (iOS & Android), IoT microcontroller programming (ESP32, STM32), and cloud infrastructure management on AWS and Supabase.',
        },
      },
      {
        '@type': 'Question',
        name: 'What proprietary SaaS and IoT products has EcoBridgers built?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'EcoBridgers has built 6 flagship products tailored for Indian SMEs: Playco (a social party deduction mobile game), TextileBridge (textile manufacturing & yarn inventory management), CafeBridge (cafe POS & WhatsApp order billing), TurfBridge (sports venue & box cricket booking), BIoTSense (industrial machine vibration & heat telemetry), and Underground Rover (R&D hazardous tunnel surveillance).',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is EcoBridgers located and how can I hire the team?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'EcoBridgers is headquartered in Surat, Gujarat, India. You can hire our team for project-based custom software development, SaaS white-labeling, or IoT hardware builds by filling out our contact form at ecobridgers.com/contact or emailing ecobridgers.tech@gmail.com.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does EcoBridgers build IoT hardware and cloud systems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We handle the complete IoT lifecycle: designing custom circuit schematics, prototyping sensor modules (vibration, temperature, current, gas), writing firmware in C/C++, connecting hardware to MQTT brokers, and building real-time web & mobile dashboards powered by cloud infrastructure.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are EcoBridgers SaaS products customizable for individual business needs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Every EcoBridgers product is built with modular, multi-tenant software architecture. We can customize workflows, database schemas, user roles, third-party API integrations, and branding to fit your specific operational requirements.',
        },
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
