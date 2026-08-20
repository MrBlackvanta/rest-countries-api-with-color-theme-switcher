import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: { root: import.meta.dirname },
  experimental: {
    staleTimes: { dynamic: 300 },
    dynamicOnHover: true,
  },
  // Workers runs no Next image optimizer, so the flags are served straight from
  // flagcdn. `priority` still emits its preload, which is what the LCP work relied on.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
