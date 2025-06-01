import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from '@/providers/Providers'
import { SITE_NAME } from '@/constants/constants'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata = {
	icons: {
		icon: '/images/logo.svg',
		shortcut: '/images/logo.svg',
		apple: '/images/256.png',
		other: {
			rel: 'touch-icons',
			url: '/images/256.png',
			sizes: '256x256',
			type: 'image/png'
		}
	},
	title: {
		absolute: `${SITE_NAME}`,
		template: `%s | ${SITE_NAME}`
	},
	description:
		'A modern Next.js application featuring dynamic routing, API integration, and a scalable architecture.',
	openGraph: {
		type: 'website',
		siteName: `${SITE_NAME}`,
		emails: [`info@example.com`],
		images: [
			{
				url: '/images/og.jpg',
				width: 925,
				height: 500,
				alt: `${SITE_NAME}`,
				type: 'image/jpg'
			}
		],
		title: `${SITE_NAME}`,
		description:
			'A modern Next.js application featuring dynamic routing, API integration, and a scalable architecture.'
		// url: '',
	},
	// manifest: '/manifest.json',
	metadataBase: new URL(SITE_URL),
	applicationName: `${SITE_NAME}`,
	formatDetection: {
		telephone: false
	}
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
