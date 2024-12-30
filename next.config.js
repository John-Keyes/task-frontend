/** @type {import('next').NextConfig} */

let clientUrl = process.env.CLIENT_URL;
let apiUrl = process.env.API_URL;

module.exports = {
	reactStrictMode: true,
	output: "standalone",
	publicRuntimeConfig: {
		mode: process.env.MODE,
    clientUrl,
    apiUrl
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
        destination: `${apiUrl}/:path*`,
      }
    ]
  }
};
