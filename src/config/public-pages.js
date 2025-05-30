class PublicPages {
	HOME = '/'
	CAMERAS(path) {
		return `/cameras${path ? `/${path}` : ''}`
	}
	SEARCH(searchTerms) {
		return `/search?term=${searchTerms}`
	}
	ABOUT = '/about'
}

export const PUB_PAGES = new PublicPages()
