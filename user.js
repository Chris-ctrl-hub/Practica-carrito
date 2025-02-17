const mongoose = require('mongoose') 


const User = mongoose.model('User', {
	email: { type: String, required: true, minLength: 3 },
	password: { type: String, required: true, minLength: 3 },
	salt: { type: String, required: true, minLength: 3 },
})

module.exports = User

