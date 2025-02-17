const Carts = require('./cart.model');
const Product = require('./product.controller');
const { list, search } = require('./product.controller')

const Cart = {
	list: async (req, res) => {
        const { userId } = req.params;
        try {
            const cart = await Carts.find({ user_id: userId });
            if (!cart || cart.length === 0) {
                return res.status(404).send({ message: "No hay artículos en el carrito" });
            }
            let totalPrice = 0;
            cart.forEach(cart => {
                totalPrice += cart.product_price * cart.quantity;
            });
            res.status(200).send({
                item: cart,
                totalPrice: totalPrice
            });
			console.log(cart)
			console.log(totalPrice)
        } catch (error) {
            console.error("Error fetching cart:", error);
            res.status(500).send({ message: "Error al obtener el carrito" });
        }
	},
	create: async (req, res) => {
		console.log(req.body)
		const cart = new Carts(req.body)
		await cart.save()
		res.status(201).send('Añadido al carro')
	},
	update: async (req, res) => {
        const { id } = req.params
        const cart = await Carts.findOne({_id: id})
        Object.assign(cart, req.body)
        await cart.save()
        res.status(204).send("actualizado")
    },
	destroy: async (req, res) => {
		console.log(req.params)
		const { id } = req.params
		const cart = await Carts.findOne({ _id: id })
    	await cart.deleteOne()
		res.status(204).send('eliminando')
	},
	destroyAll: async (req, res) => {
        const { id } = req.params;
		console.log(req.params)
		console.log(id)
        try {
            const cart = await Carts.find({ user_id: id });
            if (!cart || cart.length === 0) {
                return res.status(404).send({ message: "No hay artículos en el carrito" });
            }
            else {
				await Carts.deleteMany({ user_id: id })
				res.status(204).send('eliminando')
			}
        } catch (error) {
            console.error("Error fetching cart:", error);
            res.status(500).send({ message: "Error al obtener el carrito" });
        }
	},
	search: async (req, res) => {
		const { userId, productId } = req.params;
		const cart = await Carts.findOne({
		  user_id: userId,
		  product_id: productId,
		});
	  
		if (!cart) {
		  return res.status(404).send({ message: "No hay articulos" });
		}
	  
		res.status(200).send(cart);
	}
}

module.exports = Cart


