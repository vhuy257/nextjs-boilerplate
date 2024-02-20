/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer, webpack }) => {
        return config;
    },  
};

export default nextConfig;
