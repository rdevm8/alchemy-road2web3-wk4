/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        alchemy: {
            apiKey: "GUARONRVTJB0ixcJl1ERHvi0rVplxDOZ",
            baseUrl: "https://eth-mainnet.g.alchemy.com/v2",
        },
    },
}

module.exports = nextConfig
