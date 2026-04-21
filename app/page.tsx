import type { Metadata } from 'next'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.ecobridgers.site',
  },
  title: 'EcoBridgers | IoT & Embedded Systems Development Company | Surat, India',
  description: 'EcoBridgers delivers end-to-end IoT, cloud, and mobile development. From sensor to dashboard, prototype to production. No over-engineering, just real solutions.',
  keywords: ['IoT development', 'embedded systems', 'cloud development', 'mobile apps', 'hardware development', 'Surat India', 'AWS', 'React', 'Node.js'],
  openGraph: {
    title: 'EcoBridgers | IoT & Embedded Systems Development',
    description: 'End-to-end IoT, cloud, and mobile development. From sensor to dashboard.',
    url: 'https://www.ecobridgers.site',
    siteName: 'EcoBridgers',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoBridgers | IoT & Embedded Systems Development',
    description: 'End-to-end IoT, cloud, and mobile development. From sensor to dashboard.',
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
  url: 'https://www.ecobridgers.site',
  logo: 'https://www.ecobridgers.site/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-XXXXXXXXXX',
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
