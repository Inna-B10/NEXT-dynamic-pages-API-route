import { useEffect, useState } from 'react'
import Spinner from '@/components/ui/Spinner'
import { OrderDetailsRow } from './OrderDetailsRow'
import { FormatPrice } from '@/lib/utils/formatPrice'
import { ordersService } from '@/services/client/orders.service'

export function OrderDetailsPage({ orderId }) {
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		async function fetchData() {
			const res = await ordersService.getOrderById(orderId)
			if (res) setData(res.data)
			setIsLoading(false)
		}
		fetchData()
	}, [orderId])
	/* --------------------------------- Spinner -------------------------------- */
	if (isLoading)
		return (
			<Spinner
				size={60}
				message='Loading...'
			/>
		)
	/* --------------------------------- No Data -------------------------------- */
	if (!isLoading && data === null) return <p className='text-red-500'>Failed to load order.</p>

	return (
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

					{/* --------------------------------- Address -------------------------------- */}
					<div className='flex flex-col justify-between pr-2 text-nowrap'>
						<span className='font-semibold text-white'>Delivery address:</span>

						{Object.entries(data.deliveryAddress)
							.filter(([key]) => key !== 'phone')
							.map(([key, value]) => (
								<span
									key={key}
									className='text-sm italic'
								>
									{value}
								</span>
							))}
					</div>
				</div>

				{/* -------------------------------- Products -------------------------------- */}
				<div className='mt-20 space-y-8'>
					{data.items?.map(item => (
						<OrderDetailsRow
							key={item.productId}
							item={item}
						/>
					))}
				</div>
			</div>
		)
	)
}
