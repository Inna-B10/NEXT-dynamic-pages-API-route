import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export function Header() {
	return (
		<section className='flex justify-between items-center h-30 border-b border-border mx-4'>
			<div>
				<input
					type='search'
					placeholder='search'
					className='w-100 outline-0 border border-blue text-xs italic p-2 rounded ml-4'
				/>
			</div>
			<div className='flex items-center gap-2 p-4'>
				<SignedOut>
					<SignInButton />
					<SignUpButton />
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</section>
	)
	// return (
	// 	<section className='flex justify-between items-center h-30 border-b border-border mx-4'>
	// 		<h1 className='text-4xl inline text-blue'>Products Catalog</h1>
	// 		<div>
	// 			<input
	// 				type='search'
	// 				placeholder='search'
	// 				className='w-100 outline-0 border border-blue text-xs italic p-2 rounded'
	// 			/>
	// 		</div>
	// 	</section>
	// )
}
