import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.ecobridgers.com',
  },
  title: 'EcoBridgers | SaaS & IoT Solutions for Indian SMEs | Surat, India',
  description: 'EcoBridgers builds practical SaaS products and IoT systems for small and mid-size businesses in Surat, Gujarat and across India. Affordable, industry-specific, market-ready.',
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
  openGraph: {
    title: 'EcoBridgers | SaaS, IoT & Embedded Systems Development',
    description: 'End-to-end SaaS, IoT, and embedded systems development. From sensor to dashboard.',
    url: 'https://www.ecobridgers.com',
    siteName: 'EcoBridgers',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoBridgers | SaaS, IoT & Embedded Systems Development',
    description: 'End-to-end SaaS, IoT, and embedded systems development. From sensor to dashboard.',
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
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EcoBridgers',
  description: 'End-to-end IoT, embedded systems, cloud and mobile development company based in Surat, India.',
  url: 'https://www.ecobridgers.com',
  logo: 'https://www.ecobridgers.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91 7862949437',
    contactType: 'customer service',
    availableLanguage: ['English'],
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
  services: [
    'SaaS Development',
    'IoT Development',
    'Embedded Systems',
    'Cloud Development',
    'Mobile App Development',
    'Hardware Development',
    'AWS Services',
    'React Development',
    'Node.js Development',
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageClient />
    </>
  )
}
