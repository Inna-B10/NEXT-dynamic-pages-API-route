import { LIMIT } from '@/constants/constants'
import GamingConsolesCategoryClient from './GamingConsolesClientPage'
import { productsService } from '@/services/client/products.service'

export default async function GamingConsolesCategoryPage() {
	const firstPage = await productsService.getAllProducts({
		page: 1,
		limit: LIMIT,
		category: 'gaming_consoles'
	})

	return <GamingConsolesCategoryClient initialData={firstPage} />
}
