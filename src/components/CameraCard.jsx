import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function CameraCard({ item, index }) {
	return (
		<>
			<Link
				href={`/cameras/${index}-${item.modelName}`}
				title={item.modelName}
			>
				<motion.div
					whileHover={{ scale: 1.03 }}
					transition={{ type: 'tween', stiffness: 300, damping: 100 }}
					className='group flex flex-col h-full rounded-md border border-border bg-bgSecondary'
				>
					<div className='relative'>
						<Image
							src={item.image}
							alt={item.modelName}
							width={268}
							height={180}
							className='w-full h-auto max-h-[218px] rounded-t-md transition'
							priority
						/>
						<div className='absolute inset-0 pointer-events-none rounded-t-md shadow-[inset_0_0_60px_#161A1D] group-hover:shadow-none'></div>
					</div>
					<div className='flex flex-col justify-between h-full p-4 bg-bgSecondary rounded-b-md'>
						<p className='text-blue text-lg'>{item.productName ? item.productName : item.model}</p>
						<p className='text-secondary font-bold group-hover:text-primary '>
							Brand: {item.brand}
						</p>
					</div>
				</motion.div>
			</Link>
		</>
	)
}
