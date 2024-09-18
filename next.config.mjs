/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "assets.sorare.com" }],
  },
};

export default nextConfig;
