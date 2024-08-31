/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      FLASK_SERVER: process.env.NEXT_PUBLIC_FLASK_SERVER
    }
  };
  
  module.exports = nextConfig;