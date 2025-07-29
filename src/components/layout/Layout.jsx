import { Content } from './Content'
import { Header } from './header/Header'
import { Sidebar } from './sidebar/Sidebar'

export function Layout({ children }) {
	return (
		<main className='flex min-h-screen max-w-screen ml-[56px] lg:ml-0'>
			<Sidebar />
			<div className='flex flex-col w-full'>
				<Header />
				<Content>{children}</Content>
			</div>
		</main>
	)
}
