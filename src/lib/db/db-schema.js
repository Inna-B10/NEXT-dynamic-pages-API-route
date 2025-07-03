/* ------------------------ Collection Configuration ------------------------ */

export const dbCollections = [
	{
		name: 'users',
		indexes: [
			{
				key: { userId: 1, email: 1 },
				options: { unique: true, name: 'user_email_unique' }
			},
			{ key: { createdAt: -1 }, options: { name: 'createdAt_desc' } }
		]
	},
	{
		name: 'favorites',
		indexes: [
			{
				key: { userId: 1, productId: 1 },
				options: { unique: true, name: 'user_product_unique' }
			},
			{ key: { addedAt: -1 }, options: { name: 'addedAt_desc' } }
		]
	},
	{
		name: 'shoppingCart',
		indexes: [
			{
				key: { userId: 1, productId: 1 },
				options: { unique: true, name: 'cart_user_product_unique' }
			},
			{ key: { addedAt: -1 }, options: { name: 'cart_addedAt_desc' } }
		]
	},
	{
		name: 'orders',
		indexes: [
			{ key: { userId: 1 }, options: { name: 'order_user' } },
			{ key: { createdAt: -1 }, options: { name: 'order_createdAt_desc' } }
		]
	},
	{
		name: 'addresses',
		indexes: [
			{ key: { userId: 1 }, options: { name: 'address_user' } },
			{ key: { createdAt: -1 }, options: { name: 'address_createdAt_desc' } }
		]
	}
]
