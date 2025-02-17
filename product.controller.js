const Products = require('./product.model')

const Product = {
	list: async (req, res) => {
		const Product = await Products.find()
		res.status(200).send(Product)
	},
	search: async (req, res) => {
		const { id } = req.params
		const Product = await Products.findOne({ _id: id })
		res.status(200).send(Product)
	},
	create: async (req, res) => {
		const product = new Products(req.body)
		await product.save()
		res.status(201).send('producto creado')
	},
	update: async (req, res) => {
		res.status(204).send('producto actulizado')
	},
	destroy: async (req, res) => {
		const { id } = req.params
		const product = await Products.findOne({ _id: id })
    	await product.deleteOne()
		res.status(204).send('producto eliminado')
	}
}

module.exports = Product


