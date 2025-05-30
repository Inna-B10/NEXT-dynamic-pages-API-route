export function NavHeader({ isCollapsed, toggleSidebar }) {
	return (
		<div className='flex justify-between items-center h-26 px-8'>
			{!isCollapsed && <h2 className='text-2xl'>SiteName</h2>}
			<button onClick={toggleSidebar}>{isCollapsed ? 'Open' : 'Close'}</button>
		</div>
	)
}
