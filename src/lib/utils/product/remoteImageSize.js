export function withoutDownsize(url) {
	const [base, query] = url.split('?')
	if (!query) return url

	const params = query.split('&')

	const filteredParams = params.filter(param => !param.startsWith('downsize='))

	const newQuery = filteredParams.join('&')

	return newQuery ? `${base}?${newQuery}` : base
}

export function newDownsize(url, newSize = 640) {
	const [base, query] = url.split('?')
	if (!query) return url

	const params = query.split('&').map(param => {
		if (param.startsWith('downsize=')) {
			return `downsize=*:${newSize}`
		}
		return param
	})

	const newQuery = params.join('&')
	return `${base}?${newQuery}`
}
