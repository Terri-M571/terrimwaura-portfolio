/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    localPatterns: [
      {
        pathname: '/assets/**',
        search: '',
      },
    ],
  },
}

module.exports = nextConfig
