import axios from 'axios'

export const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
})
