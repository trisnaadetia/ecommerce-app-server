const express = require('express')
const router = express.Router()
const { Category, Product } = require('../models')
const UserController = require('../controllers/userController')
const ProductController = require('../controllers/productController')
const productsRoute = require('./productsRoute')
const cartsRoute = require('./cartsRoute')
const bannersRoute = require('./bannersRoute')
const authentication = require('../middlewares/authentication')
const { authorizeAdmin, authorizeCustomer } = require('../middlewares/authorization')
const BannerController = require('../controllers/bannerController')

router.post('/register', UserController.register)
router.post('/loginAdmin', UserController.login)
router.post('/login', UserController.login)

router.get('/categories', authentication, (req, res, next) => {
    Category.findAll({
        include: Product
    })
    .then(category => {
        res.status(200).json(category)
    })
    .catch(error => {
        next(error)
    })
})

router.get('/products', ProductController.getProducts)
router.get('/products/:id', authentication, ProductController.getProductById)
router.use('/products', authentication, authorizeAdmin, productsRoute)

router.use('/carts', authentication, authorizeCustomer, cartsRoute)

router.get('/banners', BannerController.getBanners)
router.use('/banners', authentication, authorizeAdmin, bannersRoute)

module.exports = router