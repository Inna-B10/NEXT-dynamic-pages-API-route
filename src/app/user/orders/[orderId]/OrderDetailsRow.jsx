import Image from 'next/image'
import Link from 'next/link'
import { FormatPrice } from '@/lib/utils/formatPrice'

export function OrderDetailsRow({ item }) {
	return (
		<Link
			href={`/${item.categorySlug}/${item.productId}`}
			title={`${item.productName} - open product's page`}
			aria-label={`${item.productName} - open product's page`}
			className='flex w-full text-sm font-semibold border rounded-md group border-border bg-bgSecondary md:text-base lg:text-lg'
		>
			<div className='relative min-w-[50px] p-2 content-center bg-white rounded-l-md'>
				<Image
					src={item.imageUrl || '/images/default-image.png'}
					alt={`Image of product: ${item.productName}`}
					width={100}
					height={100}
					className='object-contain transition rounded-l-lg'
					priority
				/>
				<div className='absolute inset-0 pointer-events-none rounded-l-md shadow-[inset_0_0_60px_#2C343B] group-hover:shadow-none'></div>
			</div>
			<div className='flex flex-col w-full gap-2 p-4 justify-evenly'>
				<p className='text-lg font-semibold text-accentSecondary'>{item.productName}</p>
				<div className='flex justify-between'>
					<p>{FormatPrice(item.price, 'display')}</p>
					<p>x {item.quantity}</p>
					<p>{FormatPrice(item.price * item.quantity)}</p>
				</div>
			</div>
		</Link>
	)
}
