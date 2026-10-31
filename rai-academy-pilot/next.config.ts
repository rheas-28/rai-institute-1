import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app lives in a subfolder of a repo with its own root lockfile.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
