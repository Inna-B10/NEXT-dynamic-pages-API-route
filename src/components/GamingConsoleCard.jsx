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
					className='group flex flex-col h-full justify-between rounded-md border border-border bg-bgSecondary font-bold bp480:text-sm tracking-wide md:text-base lg:text-lg lg:tracking-normal'
				>
					<div>
						<div className='relative w-full aspect-[268/201] bg-white rounded-t-md'>
							<Image
								src={item['Picture URL']}
								alt={`Image of camera model: ${title}`}
								fill
								//[TODO] change sizes for adaptive layout
								sizes='(max-width: 768px) 100vw, 268px'
								className='object-contain rounded-t-lg transition'
								priority
							/>
							<div className='absolute inset-0 pointer-events-none rounded-t-md shadow-[inset_0_0_60px_#2C343B] group-hover:shadow-none'></div>
						</div>
						<p className='text-blue p-4 bg-bgSecondary'>{title}</p>
					</div>
					<div className='flex flex-col p-4 pt-0 bg-bgSecondary rounded-b-md'>
						{item['Brand'] && (
							<p className='text-dark-gray group-hover:text-light-gray'>Brand: {item['Brand']}</p>
						)}
						<p className='text-dark-gray group-hover:text-light-gray'>
							Price: <span className='font-nanum'>5995,-</span>
						</p>
					</div>
				</m.div>
			</Link>
		</>
	)
}
