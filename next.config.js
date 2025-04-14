/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/autoflex-fe',
  assetPrefix: '/autoflex-fe',
  trailingSlash: true,
  output: 'standalone',
  publicRuntimeConfig: {
    basePath: '/autoflex-fe',
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/autoflex-fe'
  },  
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
