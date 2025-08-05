import { z } from 'zod'

export const paymentSchema = z.object({
	card_number: z.string().regex(/^(\d{4}-){3}\d{4}$/, 'Card number must be xxxx-xxxx-xxxx-xxxx'),
	expiry: z
		.string()
		.regex(/^\d{2}\/\d{2}$/, 'Use MM/YY format')
		.refine(val => {
			const [mm, yy] = val.split('/').map(Number)
			if (mm < 1 || mm > 12) return false

			const now = new Date()
			const currentMonth = now.getMonth() + 1
			const currentYear = now.getFullYear() % 100 // YY format

			// date later than current?
			return yy > currentYear || (yy === currentYear && mm >= currentMonth)
		}, 'Card expired'),
	cvc: z.string().regex(/^\d{3}$/, 'CVC must be 3 digits')
})
