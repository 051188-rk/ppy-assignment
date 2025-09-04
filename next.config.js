/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the crucial line that creates the 'out' folder.
  output: 'export',

  // This part is recommended for static exports to avoid errors with the Image component.
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;