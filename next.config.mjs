// run in terminal: ANALYZE=true npm run build (!!! not in PowerShell)
//output in .next/analyze
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true'
})

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

export default withBundleAnalyzer(nextConfig)
