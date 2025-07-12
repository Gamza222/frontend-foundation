/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // SCSS configuration for modules and shared styles
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/shared/styles')],
    prependData: `@import 'design-tokens'; @import 'mixins';`,
  },

  // Custom webpack config (rarely needed)
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Example: Add a custom webpack plugin if needed
    // config.plugins.push(new MyPlugin())

    return config;
  },

  // Image domains for next/image
  images: {
    domains: ['example.com'],
  },

  // Environment variables
  env: {
    customKey: 'customValue',
  },

  // API routes configuration
  async rewrites() {
    return [
      // Example: Proxy API requests
      // {
      //   source: '/api/:path*',
      //   destination: 'https://api.example.com/:path*',
      // },
    ];
  },

  poweredByHeader: false,
  typescript: {
    // Report build-time type checking errors
    ignoreBuildErrors: false,
  },
  eslint: {
    // Report build-time eslint errors
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
