import { Facebook, Linkedin, Mail, Send, Twitter } from 'react-feather'

export const SOCIAL_MEDIA = [
	{
		icon: Facebook,
		label: 'Facebook',
		link: (url, title) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
	},
	{
		icon: Twitter,
		label: 'Twitter',
		link: (url, title) =>
			`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
	},
	{
		icon: Linkedin,
		label: 'LinkedIn',
		link: (url, title) =>
			`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
	},
	{
		icon: Send, // Telegram
		label: 'Telegram',
		link: (url, title) =>
			`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
	},
	{
		icon: Mail,
		label: 'Email',
		link: (url, title) =>
			`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
	}
]
