import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assurehomes.org',
        port: '',
        pathname: '/assurehomes/public/storage/**',
      },
    ],
  },
}

export default nextConfig
