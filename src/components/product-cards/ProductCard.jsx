import Image from 'next/image'
import Link from 'next/link'
import { motion as m } from 'framer-motion'

export function ProductCard({ href, title, imageSrc, brand, price = '5995,-' }) {
	return (
		<Link
			href={href}
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
							src={imageSrc}
							alt={`Image of product: ${title}`}
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
					{brand && <p className='text-dark-gray group-hover:text-light-gray'>Brand: {brand}</p>}
					<p className='text-dark-gray group-hover:text-light-gray'>
						Price: <span className='font-nanum'>{price}</span>
					</p>
				</div>
			</m.div>
		</Link>
	)
}
