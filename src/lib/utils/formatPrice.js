/**
 * Formats price to display(marketing) or more official style
 *
 * @param {number} price - the number to be formatted
 * @param {'official'|'display'} [style='official'] - the style of the formatted price
 * @returns {string} - the formatted price
 */

export function FormatPrice(price, style = 'official') {
	// Marketing format: 8 499,-
	if (style === 'display') {
		const formattedPrice =
			new Intl.NumberFormat('no-NO', {
				minimumFractionDigits: 0 //no decimals
			}).format(price) + ',-'
		return formattedPrice
	}

	// official format for receipts/details: 8 499 kr
	const formattedPrice = new Intl.NumberFormat('no-NO', {
		style: 'currency',
		currency: 'NOK',
		minimumFractionDigits: 2 //no decimals
	}).format(price)
	return formattedPrice
}
