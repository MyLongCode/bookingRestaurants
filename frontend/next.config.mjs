/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: process.env.API_NAME,
                port: process.env.API_PORT,
                pathname: "/media/images/**"
            }
        ]
    },
    env: {
        API_URL: process.env.API_URL,
    }
};

export default nextConfig;
