/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["tapedeck.org", "www.tapedeck.org"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
