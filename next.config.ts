import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "substack-post-media.s3.amazonaws.com",
        pathname: "/public/images/**",
      },
      {
        protocol: "https",
        hostname: "substackcdn.com",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "kxralsptwtcrzwkmbppt.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
