const { Product, Cart, Category } = require('../models')

class ProductController {
    static getProducts(req, res, next) {
        Product.findAll({
            order: [
                [ 'createdAt', 'DESC']
            ],
            include: [ Category, Cart ]
        })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            next(error)
        })
    }

    static getProductById(req, res, next) {
        const id = +req.params.id
        Product.findByPk(id)
        .then((result) => {
            if(!result) {
                next({ name: 'error not found' })
            } else {
                res.status(200).json(result)
            }
        })
        .catch((error) => {
            next(error)
        })
    }

    static postProduct(req, res, next) {
        const { name, image_url, price, stock, CategoryId } = req.body
        Product.create({
            name,
            image_url,
            price,
            stock,
            CategoryId
        })
        .then((result) => {
            res.status(201).json(result)
        })
        .catch((error) => {
            next(error)
        })
    }

    static updatedProduct(req, res, next) {
        const id = +req.params.id
        const { name, image_url, price, stock, CategoryId } = req.body
        Product.update({
            name,
            image_url,
            price,
            stock,
            CategoryId
        }, {
            where: { id },
            returning: true
        })
        .then((result) => {
            if (result[0] === 0) {
                next({ name: 'error not found' })
            } else {
                res.status(200).json(result[1])
            }            
        })
        .catch((error) => {
            next(error)
        })
    }

    static deleteProduct(req, res, next) {
        const id = +req.params.id
        Product.destroy({
            where: { id },
            returning: true
        })
        .then((result) => {
            if (result[0] === 0) {
                next({ name: 'error not found' })
            } else {
                res.status(200).json({ message: 'product success deleted' })
            }            
        })
        .catch((error) => {
            next(error)
        })
    }
}

module.exports = ProductController