class PublicPages {
	HOME = '/'
	CAMERAS(path) {
		return `/cameras${path ? `/${path}` : ''}`
	}
	ITEMS(path) {
		return `/items${path ? `/${path}` : ''}`
	}
	SEARCH(searchTerms) {
		return `/search?term=${searchTerms}`
	}
	CONTACT = '/contact'
}

export const PUB_PAGES = new PublicPages()
