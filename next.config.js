/** @type {import('next').NextConfig} */

let clientUrl = process.env.CLIENT_URL;
let apiUrl = process.env.API_URL;
if(process.env.MODE == "dev") {
  clientUrl = "http://localhost";
  apiUrl = "http://localhost";
  clientUrl = `${clientUrl}:${process.env.CLIENT_PORT}`;
  apiUrl = `${apiUrl}:${process.env.API_PORT}`;
}

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
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      }
    ]
  }
};
