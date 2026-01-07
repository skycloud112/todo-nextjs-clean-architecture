import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/entities', '@repo/gateways', '@repo/utils'],
};

export default nextConfig;
