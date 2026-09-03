import type { Metadata } from 'next';
import WebServiceClient from './WebServiceClient';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://ecobridgers.com/services/web',
  },
  title: 'Web Development & Database Architecture — Next.js, SaaS Dashboards',
  description: 'Business websites, SaaS dashboards, admin panels and full-stack web apps built with Next.js. Database architecture, optimisation and REST APIs designed to scale without a rewrite.',
};

export default function WebServicePage() {
  return <WebServiceClient />;
}
