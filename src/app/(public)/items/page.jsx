import { itemService } from '@/services/client/item.service'

export default async function page() {
	const data = await itemService.getAllItems()
	console.log(data)

	return <div>page</div>
}
