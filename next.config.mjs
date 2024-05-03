/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**'
      }
    ]
  },
  env: {
    MS_SIMULATION_API: process.env.MS_SIMULATION_API,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY
  }
}

export default nextConfig
