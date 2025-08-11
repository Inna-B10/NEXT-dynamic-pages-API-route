// sends value to react-hook-form after trimming and normalizing spaces.
export const createCleanedValue = setValue => field => e => {
	const cleaned = e.target.value.replace(/\s+/g, ' ').trim()
	setValue(field, cleaned)
}

const DEFAULT_COUNTRY = 'Norway'

/**
 * Formats order form data.
 * - Can handle either a full data object (e.g. from server) or a single field/value pair.
 * - Applies provided field-specific formatters.
 * - Ensures default country is set if missing.
 *
 * @param {object|string} dataOrField - Data object (server) or a single field name.
 * @param {object} formatters - Map of field names to formatter functions.
 * @param {string} [fieldValue] - Value for the single field case.
 */
export function formatOrderFormData(dataOrField, formatters, fieldValue) {
	// mode: format the whole object
	if (typeof dataOrField === 'object') {
		const data = { country: DEFAULT_COUNTRY, ...dataOrField }

		if (formatters) {
			for (const key in data) {
				if (formatters[key]) {
					data[key] = formatters[key](data[key] || '')
				}
			}
		}
		return data
	}

	// mode: format one field
	if (typeof dataOrField === 'string') {
		const field = dataOrField

		// setting default country
		if (field === 'country' && !fieldValue) {
			return DEFAULT_COUNTRY
		}

		const formatter = formatters[field]
		return formatter ? formatter(fieldValue || '') : fieldValue
	}

	return dataOrField
}
