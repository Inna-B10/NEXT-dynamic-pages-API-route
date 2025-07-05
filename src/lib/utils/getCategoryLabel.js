import { CATEGORIES } from '@/constants/categories'

export function getCategoryLabel(slug) {
	const category = CATEGORIES.find(cat => cat.slug === slug)
	return category ? category.label : null
}
