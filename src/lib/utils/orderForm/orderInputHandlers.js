// Returns a blur handler that trims and normalizes spaces.
export const createCleanedValue = setValue => field => e => {
	const cleaned = e.target.value.trim().replace(/\s+/g, ' ')
	setValue(field, cleaned)
}

const DEFAULT_COUNTRY = 'Norway'

// Formats order form data (from server object or single field update) using field-specific formatters,
// and ensures a default country is set if missing
export function formatOrderFormData(dataOrKey, valueOrFormatters, maybeFormatters) {
	// mode: format the whole object
	if (typeof dataOrKey === 'object') {
		const data = dataOrKey
		const formatters = valueOrFormatters || {}

		// setting default country
		const formatted = { country: DEFAULT_COUNTRY, ...data }

		for (const key in formatted) {
			if (formatters[key]) {
				formatted[key] = formatters[key](formatted[key] || '')
			}
		}
		return formatted
	}

	// mode: format one field
	if (typeof dataOrKey === 'string') {
		const key = dataOrKey
		const value = valueOrFormatters
		const formatters = maybeFormatters || {}

		// setting default country
		if (key === 'country' && !value) {
			return DEFAULT_COUNTRY
		}
		return formatters[key] ? formatters[key](value || '') : value
	}

	return dataOrKey
}
