/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.cache = false; // Disable caching for debugging
    return config;
  },
};

export default nextConfig;
