
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true }, // must be set to false because we are using static generation
}

module.exports = nextConfig
