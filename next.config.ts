/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "192.168.21.105", "crc-fe-j9dc.vercel.app"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  webpack: (config: any) => {
    config.infrastructureLogging = {
      level: "error",
    };
    return config;
  },
};

export default nextConfig;
