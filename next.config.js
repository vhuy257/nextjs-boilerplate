/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate-plugin");

const nextConfig = nextTranslate({
    webpack: (config, { isServer, webpack }) => {
        return config;
    },    
    env: {
        NEXTAUTH_URL: "http://localhost:4000",
        NEXTAUTH_SECRET: "kkowHC0+WwAEvsQr7NKRBwdKvAKMUIMjmWPDYWjOe4w="
    }    
});

module.exports = nextConfig;
