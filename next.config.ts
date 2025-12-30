import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "departments.ssus.ac.in",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
