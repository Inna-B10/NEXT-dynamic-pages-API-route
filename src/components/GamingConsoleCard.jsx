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
				// href={`/cameras/${index}-${item.modelName}`}
				href='#'
				title={title}
				aria-label={`${title} - open product's page`}
			>
				<m.div
					whileHover={{ scale: 1.03 }}
					transition={{ type: 'tween', stiffness: 300, damping: 100 }}
					className='group flex flex-col h-full rounded-md border border-border bg-bgSecondary'
				>
					<div className='relative'>
						<Image
							src={item['Picture URL']}
							alt={`Image of camera model: ${title}`}
							width={268}
							height={180}
							className='w-full h-auto max-h-[218px] rounded-t-md transition aspect-67/45'
							priority
						/>
						<div className='absolute inset-0 pointer-events-none rounded-t-md shadow-[inset_0_0_60px_#2C343B] group-hover:shadow-none'></div>
					</div>
					<div className='flex flex-col justify-between h-full p-4 bg-bgSecondary rounded-b-md'>
						<p className='text-blue text-lg'>{title}</p>
						<p className='text-secondary font-bold group-hover:text-primary '>
							Brand: {item['Brand']}
						</p>
					</div>
				</m.div>
			</Link>
		</>
	)
}
