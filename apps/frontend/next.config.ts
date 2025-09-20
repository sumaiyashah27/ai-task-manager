import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Add your config options here
  outputFileTracingRoot: path.resolve(__dirname, "../.."),
};

export default nextConfig;
