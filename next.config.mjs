/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	poweredByHeader: false,

	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: '**.gadgets360cdn.com' },
			{ protocol: 'https', hostname: 'gadgets.ndtv.com' }
		]
	}
}

export default nextConfig
