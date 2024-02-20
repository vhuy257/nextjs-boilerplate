/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate-plugin");

const nextConfig = nextTranslate({
    webpack: (config, { isServer, webpack }) => {
        return config;
    },  
});

module.exports = nextConfig;
