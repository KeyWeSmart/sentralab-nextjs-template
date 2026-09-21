import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  redirects() {
    return [{ source: "/", destination: "/ko", permanent: false }];
  },
};

export default nextConfig;
