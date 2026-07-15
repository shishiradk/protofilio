/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The site serves a single local profile image; disabling the optimizer
    // removes the /_next/image endpoint (DoS surface, GHSA-h64f-5h5j-jqjh).
    unoptimized: true,
  },
};

export default nextConfig;
