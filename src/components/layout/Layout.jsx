import { Content } from './Content'
import { Footer } from './Footer'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function Layout({ children }) {
	return (
		<main>
			<Sidebar />
			<Header />
			<Content>{children}</Content>
			<Footer />
		</main>
	)
}
