/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/discovery',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
