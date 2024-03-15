/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'image.tmdb.org',
        port: '',
      },
    ],
  },
};

export default nextConfig;
