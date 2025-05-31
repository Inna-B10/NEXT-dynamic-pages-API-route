import { LazyMotion, domAnimation } from 'framer-motion'
import { SidebarProvider } from './SidebarProvider'

export function Providers({ children }) {
	return (
		<LazyMotion features={domAnimation}>
			<SidebarProvider>{children}</SidebarProvider>
		</LazyMotion>
	)
}
