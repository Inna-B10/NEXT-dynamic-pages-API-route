import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'
import { OrderRow } from './OrderRow'
import { FormatPrice } from '@/lib/utils/formatPrice'
import { isDev } from '@/lib/utils/isDev'
import { ordersService } from '@/services/client/orders.service'

export function OrdersPage() {
	const { isLoaded, user } = useUser()

	const { data: orders = [], isLoading } = useQuery({
		queryKey: ['orders', user?.id],
		queryFn: () => (user?.id ? ordersService.getOrdersByUserId(user.id).then(res => res.data) : []),
		enabled: isLoaded && !!user?.id,
		onError: error => {
			toast.error('Error loading orders')
			if (isDev()) console.error('Error fetching orders:', error)
		},
		staleTime: 1000 * 60 * 2, //2 minutes cache
		refetchOnWindowFocus: true //auto-refresh on returning to tab
	})

	return (
		<div className='w-full max-w-[980px] '>
			<h1>My Orders</h1>
			{!isLoading &&
				(!orders?.length ? (
					<div>No orders</div>
				) : (
					orders.map(order => {
						const date = new Date(order.createdAt).toLocaleDateString('no-NO')
						const isActive = order.status === 'processing'
						return (
							<Link
								href={`/user/orders/${order._id}`}
								title='View order details'
								aria-label='View order details'
								key={order._id}
								className={twMerge(
									'flex flex-col sm:flex-row sm:justify-between gap-y-4 p-4 mb-8 border border-border rounded-md transition-all bg-bgSecondary text-sm md:text-base lg:text-lg hover:translate-x-1 duration-500 ease-in-out overflow-y-auto',
									!isActive && 'opacity-70 hover:opacity-90'
								)}
							>
								<div className='flex flex-col gap-3'>
									<OrderRow
										isActive={isActive}
										label='Order ID: '
										value={order._id}
									/>
									<OrderRow
										isActive={isActive}
										label='Order Date: '
										value={date}
									/>
								</div>
								<div className='flex flex-col gap-3 sm:items-end sm:flex-col-reverse'>
									<OrderRow
										isActive={isActive}
										label='Total sum: '
										value={FormatPrice(order.totalPrice)}
									/>
									<OrderRow
										isActive={isActive}
										label='Status: '
									>
										<span className={isActive ? 'text-green-500' : 'text-muted'}>
											{order.status || 'Unknown'}
										</span>
									</OrderRow>
								</div>
							</Link>
						)
					})
				))}
		</div>
	)
}
