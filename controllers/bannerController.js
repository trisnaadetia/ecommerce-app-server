const { Banner } = require('../models')

class BannerController {
    static getBanners(req, res, next) {
        Banner.findAll({
            order: [
                [ 'createdAt', 'DESC']
            ]
        })
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            next(error)
        })
    }

    static postBanner(req, res, next) {
        const { title, image_url, status } = req.body
        Banner.create({
            title,
            image_url,
            status
        })
        .then((result) => {
            res.status(201).json(result)
        })
        .catch((error) => {
            next(error)
        })
    }

    static updatedBanner(req, res, next) {
        const id = +req.params.id
        const { title, image_url, status } = req.body
        Banner.update({
            title,
            image_url,
            status
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

    static deleteBanner(req, res, next) {
        const id = +req.params.id
        Banner.destroy({
            where: { id },
            returning: true
        })
        .then((result) => {
            if (result[0] === 0) {
                next({ name: 'error not found' })
            } else {
                res.status(200).json({ message: 'banner success deleted' })
            }            
        })
        .catch((error) => {
            next(error)
        })
    }

    static getBannerById(req, res, next) {
        const id = +req.params.id
        Banner.findByPk(id)
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
}

module.exports = BannerController