/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  // experimental: {
  //   largePageDataBytes: 256 * 1000,
  // },
};

module.exports = nextConfig;
