class PublicPages {
	HOME = '/'
	CAMERAS(path) {
		return `/cameras${path ? `/${path}` : ''}`
	}
	GAMING_CONSOLES(path) {
		return `/gaming_consoles${path ? `/${path}` : ''}`
	}
	SEARCH(searchTerms) {
		return `/search?term=${searchTerms}`
	}
	CONTACT = '/contact'
}

export const PUB_PAGES = new PublicPages()
