/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: '**' },
    ],
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    NEXT_PUBLIC_OPENAI_KEY: process.env.NEXT_PUBLIC_OPENAI_KEY,
  },
  typescript: {
    // Don't fail the build on type errors — let warnings through
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
