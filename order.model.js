const mongoose = require('mongoose') 


const Orders = mongoose.model('order', {
	user_id: { type: String, required: true, minLength: 3 },
	body: { type: Array, required: true, minLength: 3 },
	total_cost: { type: Number, required: true, minLength: 1 }
})

module.exports = Orders

