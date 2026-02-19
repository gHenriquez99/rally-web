import type { NextConfig } from "next";

const INVITE_CACHE_CONTROL = "public, s-maxage=300, stale-while-revalidate=86400";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/e/:token",
        headers: [
          {
            key: "Cache-Control",
            value: INVITE_CACHE_CONTROL,
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
