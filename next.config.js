
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true }, // must be set to false because we are using static generation
  swcMinify: true // can be set to false for debug purpose
}

module.exports = nextConfig
