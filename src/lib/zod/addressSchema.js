import { z } from 'zod'

const wordRegex = /[A-Za-zÆØÅæøå]+/

export const addressSchema = z.object({
	first_name: z
		.string()
		.min(2, 'Name too short')
		.regex(wordRegex, 'Must contain at least one letter'),
	last_name: z
		.string()
		.min(2, 'Name too short')
		.regex(wordRegex, 'Must contain at least one letter'),
	phone: z
		.string()
		.regex(/^\d{2} \d{2} \d{2} \d{2}$/, 'Phone must be in format xx xx xx xx')
		.transform(val => val.replace(/\s/g, '')),
	street: z
		.string()
		.min(2, 'Street too short')
		.regex(wordRegex, 'Must contain at least one letter'),
	city: z.string().min(2, 'City too short').regex(wordRegex, 'Must contain at least one letter'),
	zip: z.string().regex(/^\d{4}$/, 'ZIP must be 4 digits'),
	// country: z.string()
	// 	.min(2, 'Country too short').regex(wordRegex, 'Must contain at least one letter'),
	country: z.literal('Norway')
})
