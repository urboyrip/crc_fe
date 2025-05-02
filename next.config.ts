/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  webpack: (config: any) => {
    config.infrastructureLogging = {
      level: "error",
    };
    return config;
  },
};
