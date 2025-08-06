export const formatLabel = field => {
	return (field[0].toUpperCase() + field.slice(1)).replace('_', ' ')
}

export const formatPhone = val => {
	const digits = val.replace(/\D/g, '').slice(0, 8)
	return digits.replace(/(\d{2})(?=\d)/g, '$1 ').trim()
}

export const formatZip = val => val.replace(/\D/g, '').slice(0, 4)

export const formatCardNumber = val => {
	const digits = val.replace(/\D/g, '').slice(0, 16)
	return digits.replace(/(.{4})(?=.)/g, '$1 ').replace(/ $/, '')
}

export const formatExpiry = val => {
	const digits = val.replace(/\D/g, '').slice(0, 4)
	return digits.replace(/(\d{2})(?=\d)/g, '$1/').trim()
}

export const formatCvc = val => val.replace(/\D/g, '').slice(0, 3)
