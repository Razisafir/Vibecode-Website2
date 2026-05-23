import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Vibecode-Website2',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
