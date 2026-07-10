/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // form data, not the audio files (those go direct-to-blob)
    },
  },
};

module.exports = nextConfig;
