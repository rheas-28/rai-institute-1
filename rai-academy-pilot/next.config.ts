import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This app lives in a subfolder of a repo with its own root lockfile.
  outputFileTracingRoot: __dirname,
  // Policy uploads (PDF, DOCX, Markdown) are sent to server actions; limit is 10 MB.
  experimental: { serverActions: { bodySizeLimit: "11mb" } },
  serverExternalPackages: ["unpdf", "mammoth"],
};

export default nextConfig;
