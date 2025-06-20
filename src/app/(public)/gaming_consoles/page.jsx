import { LIMIT } from '@/constants/constants'
import GamingConsolesCategoryClient from './GamingConsolesClientPage'
import { gaming_consolesService } from '@/services/client/gaming_consoles.service'

export default async function GamingConsolesCategoryPage() {
	const firstPage = await gaming_consolesService.getAllGaming_consoles({
		type: 'page',
		limit: LIMIT
	})

	return <GamingConsolesCategoryClient initialData={firstPage} />
}
