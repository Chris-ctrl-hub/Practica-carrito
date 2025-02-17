const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const app = express()
const Cart = require('./cart.controller')
const Product = require('./product.controller')
const port = 3000
const {isAuthenticated, auth} = require("./Auth.controller");
const Order = require('./order.controller')

mongoose.connect("mongodb+srv://chrisyer3008:PruebasCerrada@cluster0.prlwf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.use(express.json())

app.post('/order', isAuthenticated,Order.create)
app.get('/order/:userId/:productId', isAuthenticated,Order.search)
app.get('/order/:userId/', isAuthenticated,Order.list)
app.put('/order/:id', isAuthenticated,Order.update)
app.patch('/order/:id', isAuthenticated,Order.update)
app.delete('/order/:id', isAuthenticated,Order.destroy)
app.delete('/order/user/:id', isAuthenticated,Order.destroyAll)

app.post('/cart', isAuthenticated,Cart.create)
app.get('/cart/:userId/:productId',Cart.search)
app.get('/cart/:userId/',Cart.list)
app.put('/cart/:id', isAuthenticated,Cart.update)
app.patch('/cart/:id', isAuthenticated,Cart.update)
app.delete('/cart/:id', isAuthenticated,Cart.destroy)
app.delete('/cart/user/:id', isAuthenticated,Cart.destroyAll)

app.post('/product', isAuthenticated,Product.create)
app.get('/product', Product.list)
app.get('/product/:id', Product.search)
app.put('/product/:id', isAuthenticated,Product.update)
app.patch('/product/:id', isAuthenticated,Product.update)
app.delete('/product/:id', isAuthenticated,Product.destroy)

app.post('/login', auth.login)
app.post('/register', auth.register)

app.use(express.static(__dirname + '/app'));


app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})
app.get('*', (req, res) => {
	res.status(404).send('Esta página no existe :(')
})

app.listen(port, () => {
	console.log('Arrancando la aplicación!')
})
