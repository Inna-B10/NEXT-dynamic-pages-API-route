import { Content } from './Content'
import { Footer } from './Footer'
import { Header } from './Header'
import { Sidebar } from './sidebar/Sidebar'

export function Layout({ children }) {
	return (
		<main className='flex'>
			<Sidebar />
			<div className='flex flex-col justify-between min-h-screen'>
				<Header />
				<Content>{children}</Content>
				<Footer />
			</div>
		</main>
	)
}
