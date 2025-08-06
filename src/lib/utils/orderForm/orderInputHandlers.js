//Returns a change handler that applies a formatter if provided, then updates the field.
export const createHandleChange = (setValue, formatters) => field => e => {
	const rawValue = e.target.value
	const formatter = formatters?.[field]
	const formatted = formatter ? formatter(rawValue) : rawValue
	setValue(field, formatted)
}

// Returns a blur handler that trims and normalizes spaces.
export const createCleanedValue = setValue => field => e => {
	const cleaned = e.target.value.trim().replace(/\s+/g, ' ')
	setValue(field, cleaned)
}
