import { Geist, Nanum_Myeongjo } from 'next/font/google'
import { DynamicWrapperNoChildren } from '@/components/DynamicWrapperNoChildren'
import ProvidersDynWrapper from '@/providers/ProvidersDynWrapper'
import { SITE_NAME } from '@/constants/seo.constants'
import './globals.css'

export const fetchCache = 'default-cache'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const nanum = Nanum_Myeongjo({
	variable: '--font-nanum',
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
	preload: false
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
		'Next-level electronics and accessories. Shop now and get the best deals on the latest products in electronics and accessories.',
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
			'Next-level electronics and accessories. Shop now and get the best deals on the latest products in electronics and accessories.',
		url: 'https://nextron-eight.vercel.app/'
	}
	//[TODO] add manifest
	// manifest: '/manifest.json',
	// metadataBase: new URL('https://nextron-eight.vercel.app/'),
	// applicationName: `${SITE_NAME}`,
	// formatDetection: {
	// 	telephone: false
	// }
}

export const viewport = {
	themeColor: 'var(--color-bg)'
}

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} antialiased`}>
				<ProvidersDynWrapper>
					{children}
					<DynamicWrapperNoChildren
						componentKey='onboarding'
						exportName='OnboardingPage'
					/>
				</ProvidersDynWrapper>
			</body>
		</html>
	)
}
