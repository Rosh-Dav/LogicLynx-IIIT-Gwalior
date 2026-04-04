import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Some versions put it under experimental, some top level. The log says top level.
  },
  // @ts-ignore
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
};

export default nextConfig;
