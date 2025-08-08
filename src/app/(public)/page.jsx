import { Footer } from '@/components/layout/Footer'
import { SITE_NAME } from '@/constants/seo.constants'
import { PUB_PAGES } from '@/lib/routes/public-pages'

export const metadata = {
	title: 'Home',
	description: 'Browse our latest products',
	alternates: {
		canonical: PUB_PAGES.HOME
	},
	openGraph: {
		type: 'website',
		url: PUB_PAGES.HOME,
		title: `${SITE_NAME}`
	}
}

export default function HomePage() {
	return (
		<>
			<div className='font-[family-name:var(--font-geist-sans)] h-full flex flex-col justify-between'>
				<p>this is home page</p>
				<Footer />
			</div>
		</>
	)
}
