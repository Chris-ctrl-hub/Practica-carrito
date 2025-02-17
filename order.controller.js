const Orders = require('./order.model');
const Product = require('./product.controller');
const { list, search } = require('./product.controller')

const Order = {
	list: async (req, res) => {
        const { userId } = req.params;
        try {
            const order = await Orders.find({ user_id: userId });
            if (!order || order.length === 0) {
                return res.status(404).send({ message: "No hay ordens" });
            }
            res.status(200).send(order)
        } catch (error) {
            console.error("Error fetching order:", error);
            res.status(500).send({ message: "Error al obtener Ordens" });
        }
	},
	create: async (req, res) => {
		console.log(req.body)
		const order = new Orders(req.body)
		await order.save()
		res.status(201).send('Orden añadida')
	},
	update: async (req, res) => {
        const { id } = req.params
        const order = await Orders.findOne({_id: id})
        Object.assign(order, req.body)
        await order.save()
        res.status(204).send("actualizado")
    },
	destroy: async (req, res) => {
		console.log(req.params)
		const { id } = req.params
		const order = await Orders.findOne({ _id: id })
    	await order.deleteOne()
		res.status(204).send('eliminando')
	},
	destroyAll: async (req, res) => {
        const { id } = req.params;
		console.log(req.params)
		console.log(id)
        try {
            const order = await Orders.find({ user_id: id });
            if (!order || order.length === 0) {
                return res.status(404).send({ message: "No hay Ordenes" });
            }
            else {
				await Orders.deleteMany({ user_id: id })
				res.status(204).send('eliminando')
			}
        } catch (error) {
            console.error("Error fetching order:", error);
            res.status(500).send({ message: "Error al obtener la orden" });
        }
	},
	search: async (req, res) => {
		const { userId, productId } = req.params;
		const order = await Orders.findOne({
		  user_id: userId,
		  product_id: productId,
		});
	  
		if (!order) {
		  return res.status(404).send({ message: "No hay Orden" });
		}
	  
		res.status(200).send(order);
	}
}

module.exports = Order


