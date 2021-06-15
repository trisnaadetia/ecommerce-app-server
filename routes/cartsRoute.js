const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cartController')

router.get('/', CartController.getCarts)
router.post('/', CartController.postCart)
router.patch('/', CartController.patchCart)
router.delete('/', CartController.deleteCart)

module.exports = router