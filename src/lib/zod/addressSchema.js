import { z } from 'zod'

// Validates personal names:
// - Only letters (including ÆØÅ)
// - No double dashes (--), double apostrophes (''),or double spaces
// - Allows single dashes (-), spaces, or one apostrophe (') between letter groups
// - Cannot start or end with a dash, space, or apostrophe
const nameRegex = /^(?!.*[\-'\s]{2,})[A-Za-zÆØÅæøå]+([-' ][A-Za-zÆØÅæøå]+)*$/

// Validates street addresses:
// - Allows letters (including ÆØÅ), digits, spaces, dashes (-), apostrophes ('), dots (.), and commas (,)
// - Dashes and apostrophes must be between words, not repeated or leading/trailing
// - Dots and commas must be followed by a space and a word (e.g. "4. etg", "Storgata, 2B")
// - No double punctuation (--, '', .., ,,) or double spaces
const streetRegex =
	/^(?!.*[-'.,]{2,})(?!.*\s{2,})[A-Za-zÆØÅæøå0-9]+([\-']?[A-Za-zÆØÅæøå0-9]+|[.,] [A-Za-zÆØÅæøå0-9]+)*$/

// Validates city names:
// - Allows letters (including ÆØÅ), spaces, dashes (-), and apostrophes (')
// - Dashes and apostrophes must appear between words, not repeated or leading/trailing
// - No digits, punctuation like dots or commas, or double spaces
const cityRegex = /^(?!.*[-']{2,})(?!.*\s{2,})[A-Za-zÆØÅæøå]+([-' ][A-Za-zÆØÅæøå]+)*$/

export const addressSchema = z.object({
	first_name: z
		.string()
		.min(2, 'Name too short')
		.regex(nameRegex, 'Invalid name format')
		.transform(val => val.trim().replace(/\s+/g, ' ')),

	last_name: z
		.string()
		.min(2, 'Name too short')
		.regex(nameRegex, 'Invalid name format')
		.transform(val => val.trim().replace(/\s+/g, ' ')),

	phone: z
		.string()
		.regex(/^\d{2} \d{2} \d{2} \d{2}$/, 'Phone must be in format xx xx xx xx')
		.transform(val => val.replace(/\s/g, '')),

	street: z
		.string()
		.min(2, 'Street too short')
		.regex(streetRegex, 'Invalid street format')
		.transform(val => val.replace(/\s/g, '')),

	city: z
		.string()
		.min(2, 'City too short')
		.regex(cityRegex, 'Invalid city format')
		.transform(val => val.replace(/\s/g, '')),

	zip: z.string().regex(/^\d{4}$/, 'ZIP must be 4 digits'),

	// country: z.string()
	// 	.min(2, 'Country too short').regex(wordRegex, 'Must contain at least one letter'),
	country: z.literal('Norway')
})
