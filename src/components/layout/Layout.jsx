import { Content } from './Content'
import { Header } from './Header'
import { Sidebar } from './sidebar/Sidebar'

export function Layout({ children }) {
	return (
		<main className='flex min-h-screen'>
			<Sidebar />
			<div className='flex flex-col w-full'>
				<Header />
				<Content>{children}</Content>
			</div>
		</main>
	)
}
