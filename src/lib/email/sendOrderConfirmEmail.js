import formData from 'form-data'
import Mailgun from 'mailgun.js'
import { FormatPrice } from '../utils/formatPrice'

const mailgun = new Mailgun(formData)
const mg = mailgun.client({
	username: 'api',
	key: process.env.MAILGUN_API_KEY
})
export async function sendOrderConfirmEmail({ toEmail, orderId, items, totalPrice, address }) {
	const itemsList = items
		.map(item => `<li> ${item.productName} — ${item.quantity} x ${item.price} kr</li>`)
		.join('')
	//[TODO] ? react-email Checkout component
	const html = `
			<h1>Thank you for your order!</h1>
		  <h2>Here's your order summary:</h2>
			<p><strong>Order ID:</strong> ${orderId}</p>
		  <ul>${itemsList}</ul>
			<p><strong>Total:</strong> ${FormatPrice(totalPrice)}</p>
			<p><strong>Shipping to:</strong> ${address.first_name} ${address.last_name}, ${address.street}, ${address.city}, ${address.zip}, ${address.country}</p>
		`
	try {
		await mg.messages.create(process.env.MAILGUN_DOMAIN, {
			from: `Nextron-webstore <${process.env.MAILGUN_SAND_EMAIL}>`,
			to: [toEmail],
			subject: `Order Confirmation: ${orderId}`,
			html
		})
	} catch (error) {
		if (isDev()) console.error('Failed to send confirmation email:', error)
	}
}
