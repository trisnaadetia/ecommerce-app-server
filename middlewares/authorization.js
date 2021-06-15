const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

function authorizeAdmin(req, res, next) {
    let { access_token } = req.headers
    let decoded = verifyToken(access_token)
    User.findOne({
        where: {
            email: decoded.email
        }
    })
    .then((result) => {
        if(result) {
            if(result.role === 'admin'){
                next()
            } else {
                next({ name: 'unauthorized' })
            }
        } else {
            next({ name: 'error not found' })
        }
    })
    .catch((error) => {
        next(error)
    })

}

function authorizeCustomer(req, res, next) {
    let { access_token } = req.headers
    let decoded = verifyToken(access_token)
    User.findOne({
        where: {
            email: decoded.email
        }
    })
    .then((result) => {
        if(result) {
            if(result.role === 'customer'){
                next()
            } else {
                next({ name: 'unauthorized' })
            }
        } else {
            next({ name: 'error not found' })
        }
    })
    .catch((error) => {
        next(error)
    })

}


module.exports = { authorizeAdmin, authorizeCustomer }