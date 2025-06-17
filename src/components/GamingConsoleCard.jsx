import Image from 'next/image'
import Link from 'next/link'
import * as m from 'framer-motion/m'

export function GamingConsoleCard({ item }) {
	const title = item['Product Name']
		? item['Product Name']
		: item['Alternate names']
			? item['Alternate names']
			: item['Brand'] && item['Model']
				? item['Brand'] + ' ' + item['Model']
				: 'No Product name'
	return (
		<>
			<Link
				href={`/gaming_consoles/${item._id}`}
				title={title}
				aria-label={`${title} - open product's page`}
			>
				<m.div
					whileHover={{ scale: 1.03 }}
					transition={{ type: 'tween', stiffness: 300, damping: 100 }}
					className='group flex flex-col justify-between h-full rounded-md border border-border bg-bgSecondary'
				>
					<div>
						<div className='relative'>
							<Image
								src={item['Picture URL']}
								alt={`Image of camera model: ${title}`}
								//[TODO] change sizes for adaptive layout
								width={268}
								height={201}
								className='w-full h-auto max-h-[201px] rounded-t-md transition'
								priority
							/>
							<div className='absolute inset-0 pointer-events-none rounded-t-md shadow-[inset_0_0_60px_#2C343B] group-hover:shadow-none'></div>
						</div>
						<p className='text-blue text-lg p-4 bg-bgSecondary'>{title}</p>
					</div>
					<div className='flex flex-col p-4 pt-0 bg-bgSecondary rounded-b-md'>
						{item['Brand'] && (
							<p className='text-dark-gray font-bold group-hover:text-light-gray'>
								Brand: {item['Brand']}
							</p>
						)}
						<p className='text-dark-gray font-bold group-hover:text-light-gray'>
							Price: <span className='font-[family-name:var(--font-nanum)]'>5995,-</span>
						</p>
					</div>
				</m.div>
			</Link>
		</>
	)
}
