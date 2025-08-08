import { z } from 'zod'

//NB variant 1: Supported countries (whitelist):
// const supportedCountries = ['Norway', 'Sweden', 'Denmark', 'Finland']
// const countrySchema = z.enum(supportedCountries)

//NB variant 2: Validates country names:
// - Allows letters (including ÆØÅ), spaces, apostrophes ('), dots (.) and dashes (-)
// - No double punctuation (--, .. , '') or double spaces)
// - punctuation must be between letter groups, not leading/trailing
// const countryRegex = /^(?!.*[-'.]{2,})(?!.*\s{2,})[A-Za-zÆØÅæøå]+([-' .][A-Za-zÆØÅæøå]+)*$/

// Validates personal and city names:
// - Allows letters (including ÆØÅ), spaces, dashes (-), apostrophes (')
// - No double punctuation (--, '',) or double spaces
// - Dashes and apostrophes must be between letter groups, not leading/trailing
const namesRegex = /^(?!.*[-']{2,})(?!.*\s{2,})[A-Za-zÆØÅæøå]+([-' ][A-Za-zÆØÅæøå]+)*$/

// Validates street addresses:
// - Allows letters (including ÆØÅ), digits, spaces, dashes (-), apostrophes ('), dots (.), and commas (,)
// - Dashes, apostrophes and dots must be between words, not leading/trailing
// - Commas must be followed by a space and a word and not leading/trailing ("Storgata, 2B")
// - No double punctuation (--, '', .., ,,) or double spaces
const streetRegex =
	/^(?!.*[-'.,]{2,})(?!.*\s{2,})[A-Za-zÆØÅæøå0-9]+([-'. ]?[A-Za-zÆØÅæøå0-9]+|(?:[,] )?[A-Za-zÆØÅæøå0-9]+)*$/

export const addressSchema = z.object({
	first_name: z
		.string()
		.min(2, 'Name is too short')
		.regex(namesRegex, 'Invalid name format')
		.transform(val => val.trim().replace(/\s+/g, ' ')),

	last_name: z
		.string()
		.min(2, 'Name is too short')
		.regex(namesRegex, 'Invalid name format')
		.transform(val => val.trim().replace(/\s+/g, ' ')),

	phone: z
		.string()
		.regex(/^\d{2} \d{2} \d{2} \d{2}$/, 'Phone must be in format xx xx xx xx')
		.transform(val => val.replace(/\s/g, '')),

	street: z
		.string()
		.min(2, 'Street is too short')
		.regex(streetRegex, 'Invalid street format')
		.transform(val => val.replace(/\s/g, '')),

	city: z
		.string()
		.min(2, 'City is too short')
		.regex(namesRegex, 'Invalid city format')
		.transform(val => val.replace(/\s/g, '')),

	zip: z.string().regex(/^\d{4}$/, 'ZIP must be 4 digits'),

	// NB variant 1:
	// country: countrySchema

	// NB variant 2:
	// country: z
	// 	.string()
	// 	.min(2, 'Country too short')
	// 	.regex(countryRegex, 'Invalid country format')
	// 	.transform(val => val.replace(/\s/g, ''))

	country: z.literal('Norway')
})
