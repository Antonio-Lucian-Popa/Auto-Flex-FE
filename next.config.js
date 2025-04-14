/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/autoflex-fe',
  assetPrefix: '/autoflex-fe',
  trailingSlash: true,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
