import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FormatPrice } from '@/lib/utils/formatPrice'
import { ordersService } from '@/services/client/orders.service'

export function OrderDetailsPage({ orderId }) {
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		async function fetchData() {
			const { data } = await ordersService.getOrderById(orderId)
			setData(data)
			setIsLoading(false)
		}
		fetchData()
	}, [orderId])

	return (
		!isLoading &&
		data && (
			<div className='w-full max-w-[980px] '>
				<h1>Order Details</h1>
				<div className='flex flex-col gap-6 overflow-y-auto sm:flex-row sm:justify-between'>
					<div className='flex flex-col justify-between w-fit'>
						<p>
							<span className='font-semibold text-white'>Order ID:</span>
							<br />
							{data._id}
						</p>
						<p className='text-nowrap'>
							<span className='font-semibold text-white'>Status: </span>
							{data.status}
						</p>
						<p className='text-nowrap'>
							<span className='font-semibold text-white'>Data: </span>
							{new Date(data.createdAt).toLocaleDateString('no-NO')}
						</p>
						<p className='text-nowrap'>
							<span className='font-semibold text-white'>Total sum: </span>
							{FormatPrice(data.totalPrice)}
						</p>
					</div>
					<div className='flex flex-col justify-between pr-2 text-nowrap'>
						<span className='font-semibold text-white'>Delivery address:</span>

						{Object.entries(data.deliveryAddress).map(([key, value]) =>
							key === 'phone' ? (
								''
							) : (
								<span
									key={key}
									className='text-sm italic'
								>
									{value}
								</span>
							)
						)}
					</div>
				</div>
				<div className='mt-20 space-y-8'>
					{data.items.map(item => (
						<div
							className='flex w-full text-sm font-semibold border rounded-md group border-border bg-bgSecondary md:text-base lg:text-lg'
							key={item.productId}
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
									<p>{item.quantity}</p>
									<p>{FormatPrice(item.price * item.quantity)}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	)
}
