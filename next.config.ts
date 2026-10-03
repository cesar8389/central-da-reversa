import type { NextConfig } from "next";

// Demonstração estática (GitHub Pages): NEXT_PUBLIC_DEMO=1 gera a pasta "out" com dados fictícios.
const demo = process.env.NEXT_PUBLIC_DEMO === "1";

const nextConfig: NextConfig = {
  ...(demo && {
    output: "export",
    trailingSlash: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
    images: { unoptimized: true },
  }),
  ...(!demo && {
    images: {
      remotePatterns: [
        { protocol: "https", hostname: "firebasestorage.googleapis.com" },
        { protocol: "https", hostname: "**.googleapis.com" },
      ],
    },
  }),
};

export default nextConfig;
