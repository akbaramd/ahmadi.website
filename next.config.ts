import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produces a self-contained output directory for Docker deployment.
  // The .next/standalone folder includes the server, and .next/static + public
  // are copied in separately by the Dockerfile.
  output: "standalone",
};

export default nextConfig;
