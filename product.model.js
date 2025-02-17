const mongoose = require('mongoose') 


const Products = mongoose.model('Product', {
	image: { type: String, required: true, minLength: 3 },
	name: { type: String, required: true, minLength: 3 },
	price: { type: Number, required: true, minLength: 1 },
	type: { type: String, required: true, minLength: 3 },
})

module.exports = Products

