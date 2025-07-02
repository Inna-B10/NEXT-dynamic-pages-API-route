export const PUB_PAGES = {
	HOME: '/',
	CAMERAS: (path = '') => `/cameras${path ? `/${path}` : ''}`,
	GAMING_CONSOLES: (path = '') => `/gaming_consoles${path ? `/${path}` : ''}`,
	SEARCH: searchTerms => `/search?term=${searchTerms}`,
	CONTACT: '/contact'
}

export const USER_PAGES = {}
