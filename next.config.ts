import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Enables `next export`
  images: {
    unoptimized: true, // Required if you're using <Image> component
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
