import { Content } from './Content'
import { HeaderDynWrapper } from './HeaderDynWrapper'
import { Sidebar } from './sidebar/Sidebar'

export function Layout({ children }) {
	return (
		<main className='flex min-h-screen max-w-screen ml-[56px] lg:ml-0'>
			<Sidebar />
			<div className='flex flex-col w-full'>
				<HeaderDynWrapper />
				<Content>{children}</Content>
			</div>
		</main>
	)
}
