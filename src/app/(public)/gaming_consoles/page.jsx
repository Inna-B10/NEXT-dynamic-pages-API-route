import { LIMIT } from '@/constants/constants'
import GamingConsolesClientPage from './GamingConsolesClientPage'
import { gaming_consolesService } from '@/services/client/gaming_consoles.service'

export default async function page() {
	const firstPage = await gaming_consolesService.getAllGaming_consoles({
		type: 'page',
		limit: LIMIT
	})

	return <GamingConsolesClientPage initialData={firstPage} />
}
