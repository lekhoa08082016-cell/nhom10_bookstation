import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGithubActions ? "export" : undefined,
  basePath: isGithubActions ? "/nhom10_bookstation" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? "/nhom10_bookstation" : "",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
