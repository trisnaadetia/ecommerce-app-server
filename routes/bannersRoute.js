const express = require('express')
const router = express.Router()
const BannerController = require('../controllers/bannerController')


router.post('/', BannerController.postBanner)

router.get('/:id', BannerController.getBannerById)

router.put('/:id', BannerController.updatedBanner)

router.delete('/:id', BannerController.deleteBanner)

module.exports = router