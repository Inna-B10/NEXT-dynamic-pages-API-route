import { useUser } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { isDev } from '@/lib/utils/isDev'
import { ordersService } from '@/services/client/orders.service'

export function OrdersPage() {
	const { isLoaded, user } = useUser()

	const {
		data: orders = [],
		isLoading
		// refetch
	} = useQuery({
		queryKey: ['orders', user?.id],
		queryFn: () => (user?.id ? ordersService.getOrdersByUserId(user.id).then(res => res.data) : []),
		enabled: isLoaded && !!user?.id,
		onError: error => {
			toast.error('Error loading orders')
			if (isDev()) console.error('Error fetching orders:', error)
		},
		refetchOnWindowFocus: true //auto-refresh on returning to tab
	})
	console.log(orders)
	return (
		<>
			<h1>My Orders</h1>
			{!isLoading &&
				(!orders.length ? (
					<div>No orders</div>
				) : (
					orders.map(order => {
						const date = new Date(order.createdAt)
						return (
							<div
								key={order._id}
								className='w-full flex flex-col border rounded mb-4 p-4 gap-y-4'
							>
								<div className='flex justify-between items-center gap-4'>
									<span>Order ID: {order._id}</span>
									<span>Status: {order.status || 'Unknown'}</span>
								</div>
								<div className='flex justify-between items-center gap-4'>
									<span>Order Date: {date.toLocaleDateString()}</span>
									<span>Items count: {order.items.length}</span>
									<span>Total Price: {order.totalPrice}</span>
								</div>
							</div>
						)
					})
				))}
		</>
	)
}
