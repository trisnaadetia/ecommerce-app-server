const { Cart, CartProduct, Product } = require('../models')
const { verifyToken } = require('../helpers/jwt')

class CartController{
    static getCarts(req, res, next) {
        const { access_token } = req.headers
        const decoded = verifyToken(access_token)

        Cart.findOne({
            where: {
                UserId: decoded.id,
                status: 'unpaid'
            },
            include: [ Product ]
        })
        .then((cart) => {
            res.status(200).json(cart)
        })
        .catch((error) => {
            next(error)
        })
    }

    static postCart(req, res, next) {
        const { access_token } = req.headers
        const { ProductId } = req.body
        const decoded = verifyToken(access_token)
        let cartId = 0
        let stock = 0
        let productName = ''

        Product.findOne({
            where: {
                id: +ProductId
            }
        })
        .then((product) => {
            stock = product.stock
            productName = product.name
            return Cart.findOne({
                where: { 
                    UserId: decoded.id,
                    status: 'unpaid'
                }
            })
        })
        .then((cart) => {
            if(!cart && stock > 0) {
                return Cart.create({
                    UserId: decoded.id
                })
                .then((cart) => {
                    cartId = cart.id
                    return CartProduct.create({
                        CartId: cartId,
                        UserId: decoded.id,
                        ProductId: +ProductId
                    })
                })
                .then((result) => {
                    res.status(201).json({ productName })
                })
                .catch((error) => {
                    next(error)
                })
            } else {
                CartProduct.findOne({
                    where: { 
                        ProductId: +ProductId
                    }
                })
                .then((cartProduct) => {
                    if(cartProduct) {
                        if (cartProduct.quantity < stock) {
                            return CartProduct.update({
                                quantity: cartProduct.quantity + 1,
                            }, { where: { ProductId: +ProductId }, returning: true })
                        } else {
                            next({ name: 'out off stock' })
                        }
                    } else {
                        if (stock > 0) {
                            return CartProduct.create({
                                CartId: cart.id,
                                ProductId: +ProductId,
                            })
                        } else {
                            next({ name: 'out off stock' })
                        }
                    }
                })
                .then((result) => {
                    if(result[0] === 1) {
                        res.status(201).json({ productName })
                    } else {
                        res.status(200).json({ productName })
                    }
                })
                .catch((error) => {
                    next(error)
                })
            }
        })
        .catch((error) => {
            next(error)
        })
    }

    static patchCart(req, res, next) {
        const { access_token } = req.headers
        const decoded = verifyToken(access_token)

        Cart.findOne({
            where: {
                UserId: decoded.id,
                status: 'unpaid'
            },
            include: [ Product ]
        })
        .then((cart) => {
            if (cart) {
                cart.Products.forEach(element => {
                    if (element.stock >= element.CartProduct.quantity) {
                        Product.update({
                            stock: element.stock - element.CartProduct.quantity
                        }, { where: { id: element.id } })
                        .then(() => {
                            CartProduct.update({
                                quantity: element.CartProduct.quantity
                            }, { where: { ProductId: element.id } })
                            .then(() => {
                                Cart.update({
                                    status: 'paid',
                                }, { where: { UserId: decoded.id } })
                                .then(() => {
                                    res.status(200).json({ message: 'cart success paid'})
                                })
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    } else {
                        next({ name: 'out off stock' })
                    }
                })
            }
        })
        .catch((error) => {
            console.log(error)
        })

    }

    static deleteCart(req, res, next) {
        const { CartId, ProductId } = req.body

        CartProduct.destroy({
            where: { CartId, ProductId },
            returning: true
        })
        .then((result) => {
            if (result === 0) {
                next({ name: 'error not found' })
            } else {
                res.status(200).json({ message: 'cart success deleted' })
            } 
        })
        .catch((error) => {
            next(error)
        })
    }
}

module.exports = CartController