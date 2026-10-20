/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Pin tracing to this app so Hostinger's parent lockfile is not treated as the workspace root.
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
