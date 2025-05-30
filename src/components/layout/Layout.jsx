import { Content } from './Content'
import { Footer } from './Footer'
import { Header } from './Header'
import { Sidebar } from './sidebar/Sidebar'

export function Layout({ children }) {
	return (
		<main className='flex min-h-screen'>
			<Sidebar />
			<div className='flex flex-col w-full justify-between'>
				<Header />
				<Content>{children}</Content>
				<Footer />
			</div>
		</main>
	)
}
