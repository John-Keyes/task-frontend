/** @type {import('next').NextConfig} */

module.exports = {
	reactStrictMode: true,
	output: "standalone",
	publicRuntimeConfig: {
		mode: process.env.MODE,
    clientUrl: `${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}`,
    apiUrl: `${process.env.API_URL}:${process.env.API_PORT}`
	},
	images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ]
  },
  rewrites: async () => {
    return [
      {
        source: `/api/:path*`,
        destination: `${process.env.API_URL}:${process.env.API_PORT}/:path*`,
      }
    ]
  }
};
