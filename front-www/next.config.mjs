/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', // Allow any hostname
          port: '',
          pathname: '/**', // Allow any path
        },
      ],
    },
  };
  
  export default nextConfig; // Use module.exports if in CommonJS format
  
