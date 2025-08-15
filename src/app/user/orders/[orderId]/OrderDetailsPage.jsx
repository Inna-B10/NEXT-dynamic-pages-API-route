import { useEffect, useState } from 'react'
import { ordersService } from '@/services/client/orders.service'

export function OrderDetailsPage({ orderId }) {
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		async function fetchData() {
			const data = await ordersService.getOrderById(orderId)
			setData(data)
			setIsLoading(false)
		}
		fetchData()
	}, [orderId])

	console.log('data', data)
	return <>{!isLoading && data && <pre>{JSON.stringify(data, null, 2)}</pre>}</>
}
