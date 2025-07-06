export const PUB_PAGES = {
	HOME: '/',
	CATEGORY: (category, path = '') => `/${category}${path ? `/${path}` : ''}`,
	SEARCH: searchTerms => `/search?term=${searchTerms}`,
	CONTACT: '/contact'
}

export const USER_PAGES = {}
