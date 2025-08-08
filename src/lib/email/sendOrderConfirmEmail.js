import { Resend } from 'resend'
import { getUserEmail } from '@/lib/api/clerk/getUserEmail'

const resend = new Resend(process.env.RESEND_API_KEY)
//[TODO] remove in production
const resendEmail = process.env.RESEND_EMAIL

export async function sendOrderConfirmEmail({ userId, items, totalPrice, address, orderId }) {
	const email = await getUserEmail(userId)
	if (!email) {
		console.warn('Email not found. Skipping confirmation email.')
		return
	}

	const itemsList = items
		.map(item => `• ${item.productName} — ${item.quantity} x ${item.price} kr`)
		.join('\n')

	const result = await resend.emails.send({
		from: 'Webstore <onboarding@resend.dev>',
		//[TODO] change for production
		// to: email,
		to: resendEmail,
		subject: `Order Confirmation: ${orderId}`,
		html: `
			<h1>Thank you for your order!</h1>
		  <h2>Here's your order summary:</h2>
			<p><strong>Order ID:</strong> ${orderId}</p>
		  <pre>${itemsList}</pre>
			<p><strong>Total:</strong> ${totalPrice} kr</p>
			<p><strong>Shipping to:</strong> ${address.first_name} ${address.last_name}, ${address.street}, ${address.city}, ${address.zip}, ${address.country}</p>
		`
	})

	if (result.error) {
		if (isDev()) console.error('Failed to send confirmation email:', result.error)
	}
}
