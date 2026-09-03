import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // redirect ecobridgers.site → ecobridgers.com
        source: '/:path*',
        has: [{ type: 'host', value: 'ecobridgers.site' }],
        destination: 'https://ecobridgers.com/:path*',
        permanent: true,
      },
      {
        // redirect www.ecobridgers.com → ecobridgers.com
        source: '/:path*',
        has: [{ type: 'host', value: 'www.ecobridgers.com' }],
        destination: 'https://ecobridgers.com/:path*',
        permanent: true,
      },
      {
        // /services/mobile duplicated /services/app and had no internal links — merge into it
        source: '/services/mobile',
        destination: '/services/app',
        permanent: true,
      },
    ]
  },
}

export default nextConfig