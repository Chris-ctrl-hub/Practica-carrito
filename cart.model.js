const mongoose = require('mongoose') 


const Carts = mongoose.model('Cart', {
	user_id: { type: String, required: true, minLength: 3 },
	product_name: { type: String, required: true, minLength: 3 },
	product_id: { type: String, required: true, minLength: 3 },
	product_price: { type: Number, required: true, minLength: 1 },
	product_image: { type: String, required: true, minLength: 1 },
	quantity: { type: Number, required: true, minLength: 1 },
})

module.exports = Carts

