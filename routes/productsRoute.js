const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/productController')

router.post('/', ProductController.postProduct)

router.put('/:id', ProductController.updatedProduct)

router.delete('/:id', ProductController.deleteProduct)

module.exports = router