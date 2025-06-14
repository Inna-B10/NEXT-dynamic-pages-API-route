import Image from 'next/image'
import Link from 'next/link'
import * as m from 'framer-motion/m'

export function CameraCard({ item, index }) {
	return (
		<>
			<Link
				// href={`/cameras/${index}-${item.modelName}`}
				href=''
				title={item.modelName}
				aria-label={`${item.modelName} - open product's page`}
			>
				<m.div
					whileHover={{ scale: 1.03 }}
					transition={{ type: 'tween', stiffness: 300, damping: 100 }}
					className='group flex flex-col h-full rounded-md border border-border bg-bgSecondary'
				>
					<div className='relative'>
						<Image
							src={item.image}
							alt={`Image of camera model: ${item.modelName}`}
							width={268}
							height={180}
							className='w-full h-auto max-h-[218px] rounded-t-md transition aspect-67/45'
							priority
						/>
						<div className='absolute inset-0 pointer-events-none rounded-t-md shadow-[inset_0_0_60px_#2C343B] group-hover:shadow-none'></div>
					</div>
					<div className='flex flex-col justify-between h-full p-4 bg-bgSecondary rounded-b-md'>
						<p className='text-blue text-lg'>{item.productName ? item.productName : item.model}</p>
						<p className='text-dark-gray font-bold group-hover:text-light-gray '>
							Brand: {item.brand}
						</p>
					</div>
				</m.div>
			</Link>
		</>
	)
}
